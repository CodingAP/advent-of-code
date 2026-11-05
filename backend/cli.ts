/**
 * backend/cli.ts
 *
 * command line interface for the advent of code manager
 *
 * by alex prosser
 */

import { currentAocYear, daysInYear, FIRST_YEAR, isPart, isValidDay, type Part, VERSION } from './src/config.ts';
import { bulkDownload } from './src/bulk.ts';
import { DEBUG_PORT } from './src/debug.ts';
import { scaffoldPuzzle } from './src/puzzles.ts';
import { runPuzzle } from './src/runner.ts';
import { getSessionInfo, LOCAL_CONFIG_PATH, setSession } from './src/session.ts';
import { submitAnswer } from './src/submit.ts';

interface CommandArguments {
    day: string;
    year: string;
    part: string;
    iterations: string;
    fake: string;
    port: string;
    missing: string;
    token: string;
    clear: string;
    input: string;
    debug: string;
}

interface CommandInfo {
    aliases: string[];
    description: string;
    arguments: (keyof CommandArguments)[];
    command: (args: CommandArguments) => Promise<void>;
}

interface ArgumentInfo {
    aliases: string[];
    description: string;
    default: string;
    expects?: string[]; // omitted = any value
}

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const log = (message: string) => console.log(`${RED}manager: ${GREEN}${message}${RESET}`);
const fail = (message: string) => console.log(`${RED}manager: error - ${message}${RESET}`);
const hl = (value: unknown) => `${YELLOW}${value}${GREEN}`;
const where = (args: CommandArguments) => `day ${hl(args.day)}, year ${hl(args.year)}`;

const toNumbers = (args: CommandArguments) => {
    const year = Number(args.year), day = Number(args.day);
    if (!isValidDay(year, day)) throw new Error(`${year} only has ${daysInYear(year)} days`);
    return { year, day };
};

const printRun = (results: { part1?: { answer: string; timeMs: number }; part2?: { answer: string; timeMs: number } }) => {
    for (const part of ['part1', 'part2'] as const) {
        const result = results[part];
        if (result) log(`${part.replace('part', 'part ')} - ${hl(result.answer)} (${hl(result.timeMs.toFixed(2) + ' ms')})`);
    }
};

const years = Array.from({ length: currentAocYear() - FIRST_YEAR + 1 }, (_, i) => String(FIRST_YEAR + i));

const commandLineInfo: { commands: Record<string, CommandInfo>; arguments: Record<keyof CommandArguments, ArgumentInfo> } = {
    commands: {
        fetch: {
            aliases: ['f'],
            description: 'gets the puzzle input and creates a new solution folder for the day.',
            arguments: ['day', 'year'],
            command: async (args) => {
                const { year, day } = toNumbers(args);
                const { createdSolution, inputError } = await scaffoldPuzzle(year, day);
                log(`${createdSolution ? 'generated solution.ts' : 'solution.ts already existed'} for ${where(args)}!`);
                if (inputError) fail(`input not downloaded: ${inputError}`);
                else log('input.txt downloaded!');
            },
        },
        run: {
            aliases: ['r'],
            description: 'runs the solution and outputs the results.',
            arguments: ['day', 'year', 'part', 'input', 'debug'],
            command: async (args) => {
                const { year, day } = toNumbers(args);
                const debug = args.debug === 'true';
                log(`running puzzle for ${where(args)}${args.input ? ` with input ${hl(args.input)}` : ''}${debug ? ' under the debugger' : ''}!`);
                const input = args.input ? await Deno.readTextFile(args.input) : undefined;
                const outcome = await runPuzzle(year, day, { part: args.part as Part, input, debug }, {
                    onLog: (line) => console.log(line),
                    onInspector: () => log(`debugger listening on ${hl(`127.0.0.1:${DEBUG_PORT}`)}: open ${hl('chrome://inspect')} and press resume`),
                });
                if (!outcome.success) return fail(outcome.error ?? 'unknown error');
                printRun(outcome.results);
            },
        },
        profile: {
            aliases: ['p'],
            description: 'times the puzzle over several iterations and writes the results table to the readme.',
            arguments: ['day', 'year', 'iterations'],
            command: async (args) => {
                const { year, day } = toNumbers(args);
                log(`profiling puzzle for ${where(args)} (${hl(args.iterations)} iterations)!`);
                const outcome = await runPuzzle(year, day, { part: 'both', iterations: Number(args.iterations), updateReadme: true });
                if (!outcome.success) return fail(outcome.error ?? 'unknown error');
                printRun(outcome.results);
                log(`profiling complete! results are in the ${hl('readme')} in the solution directory!`);
            },
        },
        submit: {
            aliases: ['s'],
            description: 'submits the answer of the puzzle specified.',
            arguments: ['day', 'year', 'part', 'fake'],
            command: async (args) => {
                const { year, day } = toNumbers(args);
                log(`submitting answers for ${where(args)}!`);
                const outcome = await submitAnswer(year, day, args.part as Part, args.fake === 'true');
                if (outcome.part1) log(`part 1 - ${hl(outcome.part1.answer)}: ${outcome.part1.message}`);
                if (outcome.part2) log(`part 2 - ${hl(outcome.part2.answer)}: ${outcome.part2.message}`);
            },
        },
        update: {
            aliases: ['u'],
            description: 'downloads inputs and puzzle text for every puzzle released so far (neither is stored in git).',
            arguments: ['missing'],
            command: async (args) => {
                let last = '';
                const result = await bulkDownload({ onlyMissing: args.missing === 'true' }, (status) => {
                    if (status.current && status.current !== last) {
                        last = status.current;
                        log(`[${hl(status.done + 1)}/${hl(status.total)}] ${status.current}`);
                    }
                });
                log(`done: ${hl(result.downloaded)} downloaded, ${hl(result.skipped)} skipped, ${hl(result.errors.length)} errors`);
                for (const error of result.errors) fail(error);
            },
        },
        session: {
            aliases: [],
            description: 'shows or stores the adventofcode.com session cookie (kept in backend/local.json, never in git).',
            arguments: ['token', 'clear'],
            command: async (args) => {
                const info = args.clear === 'true' ? await setSession(null) : args.token ? await setSession(args.token) : await getSessionInfo();
                if (args.clear === 'true') log('session cookie cleared.');
                else if (args.token) log(`session cookie stored in ${hl(LOCAL_CONFIG_PATH)}.`);
                if (info.configured) log(`active session: ${hl(info.preview)} (from ${hl(info.source)}${info.updated ? `, updated ${hl(info.updated)}` : ''})`);
                else fail('no session cookie configured. run `session --token=<cookie>` with the value of the session cookie from adventofcode.com.');
            },
        },
        serve: {
            aliases: ['api', 'web'],
            description: 'starts the api server that also hosts the web frontend.',
            arguments: ['port'],
            command: async (args) => {
                const { startServer } = await import('./server.ts');
                startServer(Number(args.port) || undefined);
            },
        },
    },
    arguments: {
        day: {
            aliases: ['d'],
            description: 'day of the puzzle to process.',
            default: String(new Date().getDate()),
            expects: Array.from({ length: 25 }, (_, i) => String(i + 1)),
        },
        year: {
            aliases: ['y'],
            description: 'year of the puzzle to process.',
            default: String(currentAocYear()),
            expects: years,
        },
        part: {
            aliases: ['p'],
            description: 'which part(s) of the puzzle to process.',
            default: 'both',
            expects: ['both', '1', '2'],
        },
        iterations: {
            aliases: ['i'],
            description: 'how many times to run each part for the profiler.',
            default: '10',
        },
        fake: {
            aliases: ['f'],
            description: 'record the answer as correct without sending it to the website.',
            default: 'false',
            expects: ['true', 'false'],
        },
        port: {
            aliases: [],
            description: 'port for the api server (defaults to $PORT or 8000).',
            default: '',
        },
        token: {
            aliases: ['t'],
            description: 'for session: the session cookie value from adventofcode.com.',
            default: '',
        },
        clear: {
            aliases: [],
            description: 'for session: forget the stored cookie.',
            default: 'false',
            expects: ['true', 'false'],
        },
        input: {
            aliases: [],
            description: 'for run: a file to use instead of input.txt (e.g. an example); such runs are not recorded.',
            default: '',
        },
        debug: {
            aliases: [],
            description: 'for run: pause under the inspector so chrome devtools can attach.',
            default: 'false',
            expects: ['true', 'false'],
        },
        missing: {
            aliases: ['m'],
            description: 'for update: only download files that are not on disk yet.',
            default: 'true',
            expects: ['true', 'false'],
        },
    },
};

const getPrompt = (): string => {
    let prompt = '\tcommands:\n';

    for (const [command, info] of Object.entries(commandLineInfo.commands)) {
        const args = info.arguments.map((arg) => `--${arg}=${arg}`).join(' ');
        prompt += `\t\t${GREEN}${command} ${RED}${args}\n`;
        prompt += `\t\t\t${YELLOW}aliases: ${RESET}${info.aliases.join(', ') || 'none'}\n`;
        prompt += `\t\t\t${YELLOW}description: ${RESET}${info.description}\n`;
    }

    prompt += '\targuments:\n';
    for (const [argument, info] of Object.entries(commandLineInfo.arguments)) {
        prompt += `\t\t${GREEN}--${argument}\n`;
        prompt += `\t\t\t${YELLOW}aliases: ${RESET}${info.aliases.map((alias) => `--${alias}`).join(', ') || 'none'}\n`;
        prompt += `\t\t\t${YELLOW}description: ${RESET}${info.description}\n`;
        prompt += `\t\t\t${YELLOW}expects: ${RESET}${info.expects ? info.expects.join(', ') : 'any'}\n`;
        prompt += `\t\t\t${YELLOW}default: ${RESET}${info.default || 'none'}\n`;
    }

    return prompt;
};

const handleCommandLine = async (args: string[]): Promise<void> => {
    console.log(`\n${YELLOW}~~~ ${GREEN}advent of code manager ${RED}v${VERSION} ${RESET}(created by alex prosser) ${YELLOW}~~~${RESET}\n`);

    if (args.length === 0) {
        console.log(getPrompt());
        return;
    }

    const commandName = args[0];
    const command = Object.values(commandLineInfo.commands).find((info, index) =>
        Object.keys(commandLineInfo.commands)[index] === commandName || info.aliases.includes(commandName)
    );

    if (!command) {
        console.log(`${RED}error: unknown command '${commandName}'${RESET}`);
        console.log(getPrompt());
        return;
    }

    const commandArgs: Partial<CommandArguments> = {};

    for (const arg of args.slice(1)) {
        if (!arg.startsWith('--')) continue;
        const [key, value = ''] = arg.slice(2).split('=');
        const found = Object.entries(commandLineInfo.arguments).find(([name, info]) => name === key || info.aliases.includes(key));

        if (!found) {
            console.log(`${RED}error: unknown argument '${key}'${RESET}`);
            console.log(getPrompt());
            return;
        }

        const [argKey, argInfo] = found;
        if (argInfo.expects && !argInfo.expects.includes(value)) {
            console.log(`${RED}error: invalid value '${value}' for argument '${key}'${RESET}`);
            console.log(getPrompt());
            return;
        }

        commandArgs[argKey as keyof CommandArguments] = value;
    }

    for (const arg of command.arguments) {
        if (commandArgs[arg] === undefined) commandArgs[arg] = commandLineInfo.arguments[arg].default;
    }

    if (commandArgs.part !== undefined && !isPart(commandArgs.part)) commandArgs.part = 'both';

    try {
        await command.command(commandArgs as CommandArguments);
    } catch (error) {
        fail(error instanceof Error ? error.message : String(error));
        Deno.exitCode = 1;
    }
};

if (import.meta.main) {
    await handleCommandLine(Deno.args);
}
