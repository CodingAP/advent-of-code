/**
 * backend/src/api/routes.ts
 *
 * the json api used by the frontend (and anything else that wants to drive the manager remotely)
 *
 * by alex prosser
 */

import { daysInYear, isPart, isValidDay, isValidYear, VERSION } from '../config.ts';
import {
    getPuzzleDetail,
    listYear,
    listYears,
    PuzzleNotGeneratedError,
    readInput,
    readReadme,
    readSolution,
    scaffoldPuzzle,
    updateInput,
    writeReadme,
    writeSolution,
} from '../puzzles.ts';
import { runPuzzle } from '../runner.ts';
import { getBulkStatus, startBulkDownload } from '../bulk.ts';
import { fetchDescription, readDescription } from '../description.ts';
import { readExamples, sanitizeExamples, writeExamples } from '../examples.ts';
import { getSessionInfo, setSession } from '../session.ts';
import { getDebugSession, proxyInspector } from '../debug.ts';
import { submitAnswer } from '../submit.ts';
import { authEnabled } from './auth.ts';
import { HttpError, json, type Params, readJson, Router, text } from './router.ts';

const parseYear = (params: Params): number => {
    const year = Number(params.year);
    if (!isValidYear(year)) throw new HttpError(400, `invalid year '${params.year}'`);
    return year;
};

const parsePuzzle = (params: Params) => {
    const year = parseYear(params);
    const day = Number(params.day);
    if (!isValidDay(year, day)) throw new HttpError(400, `invalid day '${params.day}' for ${year} (1-${daysInYear(year)})`);
    return { year, day };
};

const optionalNumber = (value: unknown, name: string): number | undefined => {
    if (value === undefined || value === null || value === '') return undefined;
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) throw new HttpError(400, `${name} must be a positive number`);
    return number;
};

export const createApiRouter = (): Router => {
    const router = new Router();

    router.get('/api/health', () => json({ ok: true, version: VERSION, auth: authEnabled() }));

    router.get('/api/session', async () => json(await getSessionInfo()));

    // stores the adventofcode.com session cookie (empty string clears it); the value itself is never returned
    router.put('/api/session', async (request) => {
        const body = await readJson<{ session?: unknown }>(request);
        if (typeof body.session !== 'string') throw new HttpError(400, 'body must be { session: string }');
        return json(await setSession(body.session));
    });

    router.get('/api/years', () => json(listYears()));

    router.get('/api/puzzles/:year', async (_request, params) => json(await listYear(parseYear(params))));

    router.get('/api/puzzles/:year/:day', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        return json(await getPuzzleDetail(year, day));
    });

    router.post('/api/puzzles/:year/:day/fetch', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<{ inputOnly?: boolean }>(request);
        if (body.inputOnly) {
            await updateInput(year, day);
            return json({ ok: true, createdSolution: false });
        }
        const result = await scaffoldPuzzle(year, day);
        return json({ ok: true, createdSolution: result.createdSolution, inputError: result.inputError });
    });

    router.get('/api/puzzles/:year/:day/solution', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        const code = await readSolution(year, day);
        if (code === null) throw new HttpError(404, 'no solution.ts for this puzzle');
        return json({ code });
    });

    router.put('/api/puzzles/:year/:day/solution', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<{ code?: unknown }>(request);
        if (typeof body.code !== 'string') throw new HttpError(400, 'body must be { code: string }');
        await writeSolution(year, day, body.code);
        return json({ ok: true });
    });

    router.get('/api/puzzles/:year/:day/description', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        const description = await readDescription(year, day);
        if (description === null) throw new HttpError(404, 'puzzle text has not been fetched yet');
        return json(description);
    });

    // (re)downloads the puzzle text, e.g. to pick up part two after solving part one
    router.post('/api/puzzles/:year/:day/description', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        const description = await fetchDescription(year, day);
        if (description === null) throw new HttpError(404, 'this puzzle is not available on adventofcode.com (yet)');
        return json(description);
    });

    router.get('/api/bulk', () => json(getBulkStatus()));

    // starts a background download of inputs and/or puzzle text for every released puzzle
    router.post('/api/bulk', async (request) => {
        const body = await readJson<{ onlyMissing?: unknown; inputs?: unknown; descriptions?: unknown }>(request);
        const started = startBulkDownload({
            onlyMissing: body.onlyMissing !== false,
            inputs: body.inputs !== false,
            descriptions: body.descriptions !== false,
        });
        if (!started) throw new HttpError(409, 'a bulk download is already running');
        return json(getBulkStatus(), 202);
    });

    router.get('/api/puzzles/:year/:day/input', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        const input = await readInput(year, day);
        if (input === null) throw new HttpError(404, 'no input.txt for this puzzle');
        return text(input);
    });

    router.get('/api/puzzles/:year/:day/readme', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        const readme = await readReadme(year, day);
        if (readme === null) throw new HttpError(404, 'no README.md for this puzzle');
        return text(readme);
    });

    router.put('/api/puzzles/:year/:day/readme', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<{ content?: unknown }>(request);
        if (typeof body.content !== 'string') throw new HttpError(400, 'body must be { content: string }');
        await writeReadme(year, day, body.content);
        return json({ ok: true });
    });

    // { stream: true } answers with server-sent events: start, log (per console line), inspector (debug runs), result | error
    router.post('/api/puzzles/:year/:day/run', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<
            { part?: unknown; iterations?: unknown; updateReadme?: unknown; timeoutMs?: unknown; input?: unknown; stream?: unknown; debug?: unknown }
        >(request);
        const part = body.part ?? 'both';
        if (!isPart(part)) throw new HttpError(400, "part must be '1', '2', or 'both'");
        if (body.input !== undefined && typeof body.input !== 'string') throw new HttpError(400, 'input must be a string');
        if (typeof body.input === 'string' && body.input.length > 1_000_000) throw new HttpError(400, 'input is too large');
        const debug = body.debug === true;
        if (debug && getDebugSession()) throw new HttpError(409, 'a debug session is already running; finish or cancel it first');

        const options = {
            part,
            iterations: optionalNumber(body.iterations, 'iterations'),
            timeoutMs: optionalNumber(body.timeoutMs, 'timeoutMs'),
            updateReadme: body.updateReadme === true,
            input: typeof body.input === 'string' ? body.input : undefined,
            debug,
        };

        if (body.stream !== true) return json(await runPuzzle(year, day, options));

        const encoder = new TextEncoder();
        let controller!: ReadableStreamDefaultController<Uint8Array>;
        const stream = new ReadableStream<Uint8Array>({ start: (c) => (controller = c) });
        const send = (event: string, data: unknown) => {
            try {
                controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
            } catch {
                // client went away
            }
        };
        const abort = new AbortController();
        request.signal.addEventListener('abort', () => abort.abort(), { once: true });

        (async () => {
            try {
                send('start', { year, day, part, debug });
                const outcome = await runPuzzle(year, day, options, {
                    signal: abort.signal,
                    onLog: (line) => send('log', { line }),
                    onInspector: (info) => send('inspector', info),
                });
                send('result', outcome);
            } catch (error) {
                send('error', { message: error instanceof Error ? error.message : String(error) });
            } finally {
                try {
                    controller.close();
                } catch {
                    // already closed
                }
            }
        })();

        return new Response(stream, {
            headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-cache', 'x-accel-buffering': 'no' },
        });
    });

    router.get('/api/debug', () => {
        const session = getDebugSession();
        return json(session ? { active: true, year: session.year, day: session.day, startedAt: session.startedAt } : { active: false });
    });

    // chrome devtools attaches here; the token in the path is the credential (devtools cannot send headers)
    router.get('/api/debug/ws/:token', (request, params) => proxyInspector(request, params.token));

    router.get('/api/puzzles/:year/:day/examples', async (_request, params) => {
        const { year, day } = parsePuzzle(params);
        return json(await readExamples(year, day));
    });

    router.put('/api/puzzles/:year/:day/examples', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<{ examples?: unknown }>(request);
        let examples;
        try {
            examples = sanitizeExamples(body.examples);
        } catch (error) {
            throw new HttpError(400, error instanceof Error ? error.message : String(error));
        }
        await writeExamples(year, day, examples);
        return json(examples);
    });

    router.post('/api/puzzles/:year/:day/submit', async (request, params) => {
        const { year, day } = parsePuzzle(params);
        const body = await readJson<{ part?: unknown; fake?: unknown }>(request);
        const part = body.part ?? 'both';
        if (!isPart(part)) throw new HttpError(400, "part must be '1', '2', or 'both'");
        return json(await submitAnswer(year, day, part, body.fake === true));
    });

    return router;
};

/**
 * turns thrown errors into json responses
 */
export const errorResponse = (error: unknown): Response => {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    if (error instanceof PuzzleNotGeneratedError) return json({ error: error.message }, 404);
    console.error(error);
    return json({ error: error instanceof Error ? error.message : 'internal error' }, 500);
};
