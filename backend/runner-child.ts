/**
 * backend/runner-child.ts
 *
 * executed in a subprocess by src/runner.ts: imports a solution, runs the requested parts, and prints one json line to stdout.
 * anything the solution logs goes to stderr so stdout stays machine readable.
 *
 * usage: deno run --allow-read runner-child.ts <solution.ts> <input.txt> <1|2|both> <iterations>
 *
 * by alex prosser
 */

import { toFileUrl } from './src/fs.ts';

interface PartResult {
    answer: string;
    timeMs: number;
}

const [solutionPath, inputPath, part, iterationsArg] = Deno.args;
const iterations = Math.max(1, Number(iterationsArg) || 1);

const encoder = new TextEncoder();
const emit = (payload: unknown) => Deno.stdout.writeSync(encoder.encode(JSON.stringify(payload) + '\n'));

// keep stdout for the result only
console.log = console.error;
console.info = console.error;
console.debug = console.error;

try {
    const solution = await import(toFileUrl(solutionPath).href);
    const input = (await Deno.readTextFile(inputPath)).replace(/\r/g, '');

    const results: { part1?: PartResult; part2?: PartResult } = {};
    const parts: ('1' | '2')[] = part === 'both' ? ['1', '2'] : [part as '1' | '2'];

    for (const current of parts) {
        const fn = solution[`part${current}`];
        if (typeof fn !== 'function') throw new Error(`solution does not export part${current}`);

        let answer: unknown;
        let total = 0;
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            answer = await fn(input);
            total += performance.now() - start;
        }

        results[`part${current}`] = { answer: String(answer), timeMs: total / iterations };
    }

    emit({ results });
} catch (error) {
    emit({ error: error instanceof Error ? (error.stack ?? error.message) : String(error) });
    Deno.exit(1);
}
