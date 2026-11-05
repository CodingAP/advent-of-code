/**
 * backend/src/runner.ts
 *
 * runs and times puzzle solutions in an isolated subprocess, streaming their console output, and records the results
 *
 * by alex prosser
 */

import { env, type Part, repoRoot, rootConfigPath, runnerChildPath } from './config.ts';
import { insertRun } from './db.ts';
import { clearDebugSession, DEBUG_PORT, disconnectDebugSession, newDebugToken, registerDebugSession } from './debug.ts';
import { type GitOutcome, publishPuzzle } from './git.ts';
import { getPuzzlePaths, getPuzzleStatus, getTitle, PuzzleNotGeneratedError, readReadme, writeReadme } from './puzzles.ts';
import { renderReadme } from './readme.ts';

export interface PartResult {
    answer: string;
    timeMs: number;
}

export interface RunResults {
    part1?: PartResult;
    part2?: PartResult;
}

export interface RunOutcome {
    success: boolean;
    error?: string;
    results: RunResults;
    /** the last LOG_KEEP_LINES of console output; everything is streamed live through onLog */
    logs: string;
    logLines: number;
    durationMs: number;
    iterations: number;
    readmeUpdated: boolean;
    cancelled: boolean;
    /** set when the run also committed/pushed the puzzle (profile with commit: true) */
    git?: GitOutcome;
}

export interface RunOptions {
    part?: Part;
    iterations?: number;
    timeoutMs?: number;
    updateReadme?: boolean;
    record?: boolean;
    /** run against this text instead of input.txt (example runs are never recorded and never touch the readme) */
    input?: string;
    /** start under the inspector, paused at the first line; no timeout applies */
    debug?: boolean;
    /** after a successful profile (updateReadme), commit the puzzle directory and push it */
    commit?: boolean;
}

export interface RunHandlers {
    onLog?: (line: string) => void;
    /** fires once the inspector is listening: the token selects the websocket proxy path /api/debug/ws/<token> */
    onInspector?: (info: { token: string }) => void;
    /** aborting kills the child (used when the browser cancels or disconnects) */
    signal?: AbortSignal;
}

/** how much console output is kept for the recorded outcome; the live stream carries all of it */
const LOG_KEEP_LINES = 2000;

/** a debugging session is interactive; still, don't let a forgotten one live forever */
const DEBUG_TIMEOUT_MS = 2 * 60 * 60 * 1000;

const INSPECTOR_NOISE = /^(Debugger listening on |Visit chrome:\/\/inspect|Deno is waiting for debugger|Debugger session (started|ended)|Debugger attached)/;

/**
 * caps a requested timeout to the server configured maximum
 */
export const clampTimeout = (requested?: number): number => {
    const max = env.runTimeoutMs();
    if (!requested || !Number.isFinite(requested) || requested <= 0) return max;
    return Math.min(requested, max);
};

/**
 * reads a byte stream line by line
 */
const readLines = async (stream: ReadableStream<Uint8Array>, onLine: (line: string) => void): Promise<void> => {
    const decoder = new TextDecoder();
    let buffer = '';
    for await (const chunk of stream) {
        buffer += decoder.decode(chunk, { stream: true });
        let index: number;
        while ((index = buffer.indexOf('\n')) !== -1) {
            onLine(buffer.slice(0, index).replace(/\r$/, ''));
            buffer = buffer.slice(index + 1);
        }
    }
    buffer += decoder.decode();
    if (buffer) onLine(buffer);
};

/**
 * runs the solution for a puzzle in a subprocess with a timeout, streaming its console output
 */
export const runPuzzle = async (year: number, day: number, options: RunOptions = {}, handlers: RunHandlers = {}): Promise<RunOutcome> => {
    const part = options.part ?? 'both';
    const iterations = Math.max(1, Math.floor(options.iterations ?? 1));
    const debug = options.debug === true;
    const timeoutMs = debug ? DEBUG_TIMEOUT_MS : clampTimeout(options.timeoutMs);
    const customInput = options.input !== undefined;
    const record = !customInput && !debug && (options.record ?? true);

    const paths = getPuzzlePaths(year, day);
    const status = await getPuzzleStatus(year, day);
    if (!status.hasSolution) throw new PuzzleNotGeneratedError(year, day);
    if (!customInput && !status.hasInput) throw new Error(`no input.txt for ${year} day ${day}! run 'fetch --day=${day} --year=${year}' to download it.`);

    // the child may only read inside the repository, so custom input goes into a temporary file next to the solution
    let inputPath = paths.input;
    if (customInput) {
        inputPath = await Deno.makeTempFile({ dir: paths.directory, prefix: '.run-', suffix: '.txt' });
        await Deno.writeTextFile(inputPath, options.input ?? '');
    }

    const debugToken = debug ? newDebugToken() : null;
    const args = [
        'run',
        // --quiet would also silence the "Debugger listening on" line we need
        ...(debug ? [] : ['--quiet']),
        '--no-prompt',
        `--v8-flags=--max-old-space-size=${env.runMaxMemoryMb()}`,
        `--allow-read=${repoRoot}`,
        `--config=${rootConfigPath}`,
        ...(debug ? [`--inspect-brk=127.0.0.1:${DEBUG_PORT}`] : []),
        runnerChildPath,
        paths.solution,
        inputPath,
        part,
        String(iterations),
    ];

    const started = performance.now();
    const child = new Deno.Command(Deno.execPath(), { args, cwd: repoRoot, stdin: 'null', stdout: 'piped', stderr: 'piped' }).spawn();

    let timedOut = false;
    let cancelled = false;
    const kill = () => {
        try {
            child.kill('SIGKILL');
        } catch {
            // already gone
        }
    };
    const timer = setTimeout(() => {
        timedOut = true;
        kill();
    }, timeoutMs);
    const onAbort = () => {
        cancelled = true;
        kill();
    };
    handlers.signal?.addEventListener('abort', onAbort, { once: true });

    const kept: string[] = [];
    let logLines = 0;
    const onLine = (line: string) => {
        if (debug) {
            const listening = line.match(/Debugger listening on (ws:\/\/\S+)/);
            if (listening && debugToken) {
                registerDebugSession({ token: debugToken, wsUrl: listening[1], year, day, startedAt: new Date().toISOString() });
                handlers.onInspector?.({ token: debugToken });
                return;
            }
            if (/^Waiting for the debugger to disconnect/.test(line)) {
                // the solution is done; let go of the attached debugger so the child can exit
                if (debugToken) disconnectDebugSession(debugToken);
                return;
            }
            if (INSPECTOR_NOISE.test(line)) return;
        }
        logLines++;
        kept.push(line);
        if (kept.length > LOG_KEEP_LINES) kept.shift();
        handlers.onLog?.(line);
    };

    let stdout = '';
    try {
        const [, out] = await Promise.all([
            readLines(child.stderr, onLine),
            new Response(child.stdout).text(),
        ]);
        stdout = out;
    } finally {
        clearTimeout(timer);
        handlers.signal?.removeEventListener('abort', onAbort);
        if (debugToken) clearDebugSession(debugToken);
        if (customInput) await Deno.remove(inputPath).catch(() => {});
    }
    const exit = await child.status;
    const durationMs = performance.now() - started;

    let parsed: { results?: RunResults; error?: string } = {};
    const lastLine = stdout.trim().split('\n').at(-1);
    if (lastLine) {
        try {
            parsed = JSON.parse(lastLine);
        } catch {
            parsed = {};
        }
    }

    const logs = (logLines > kept.length ? `… ${logLines - kept.length} earlier lines omitted …\n` : '') + kept.join('\n');

    let error: string | undefined;
    if (cancelled) {
        error = 'cancelled';
    } else if (timedOut && !parsed.results) {
        error = `timed out after ${timeoutMs} ms`;
    } else if (!exit.success && /out of memory|heap out of memory|OOM/i.test(logs)) {
        error = `ran out of memory (limit ${env.runMaxMemoryMb()} MB, RUN_MAX_MEMORY_MB to change)\n${kept.slice(-5).join('\n')}`;
    } else if (!exit.success) {
        error = parsed.error ?? (kept.slice(-30).join('\n') || `exited with code ${exit.code}`);
    }

    const results = parsed.results ?? {};
    const success = !error;

    if (record) {
        const parts: ('1' | '2')[] = part === 'both' ? ['1', '2'] : [part];
        for (const current of parts) {
            const result = results[`part${current}`];
            insertRun(year, day, {
                part: current,
                answer: result?.answer ?? null,
                timeMs: result?.timeMs ?? null,
                iterations,
                success: !!result,
                error: result ? null : (error ?? 'no result produced'),
            });
        }
    }

    let readmeUpdated = false;
    let git: GitOutcome | undefined;
    if (success && options.updateReadme && !customInput && !debug && results.part1 && results.part2) {
        const title = await getTitle(year, day);
        const existing = await readReadme(year, day);
        await writeReadme(year, day, renderReadme(year, day, title ?? 'untitled', results, existing ?? undefined));
        readmeUpdated = true;
        if (options.commit) {
            handlers.onLog?.('— committing and pushing the puzzle —');
            git = await publishPuzzle(year, day, title);
            handlers.onLog?.(`— ${git.message} —`);
        }
    }

    return { success, error, results, logs, logLines, durationMs, iterations, readmeUpdated, cancelled, git };
};
