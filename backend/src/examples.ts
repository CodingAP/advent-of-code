/**
 * backend/src/examples.ts
 *
 * saved example inputs (with optional expected answers) for a puzzle, kept in examples.json next to the solution
 *
 * by alex prosser
 */

import { ensureDir, readTextOrNull } from './fs.ts';
import { getPuzzlePaths } from './puzzles.ts';

export interface Example {
    name: string;
    input: string;
    expected?: { part1?: string; part2?: string };
}

const MAX_EXAMPLES = 50;
const MAX_INPUT_LENGTH = 1_000_000;

export const readExamples = async (year: number, day: number): Promise<Example[]> => {
    const raw = await readTextOrNull(getPuzzlePaths(year, day).examples);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter(isExample) : [];
    } catch {
        return [];
    }
};

export const writeExamples = async (year: number, day: number, examples: Example[]): Promise<void> => {
    const paths = getPuzzlePaths(year, day);
    await ensureDir(paths.directory);
    await Deno.writeTextFile(paths.examples, JSON.stringify(examples, null, 4) + '\n');
};

const isExample = (value: unknown): value is Example => {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.name === 'string' && typeof candidate.input === 'string';
};

/**
 * validates a request body into a clean list of examples; throws a message suitable for a 400
 */
export const sanitizeExamples = (value: unknown): Example[] => {
    if (!Array.isArray(value)) throw new Error('examples must be an array');
    if (value.length > MAX_EXAMPLES) throw new Error(`at most ${MAX_EXAMPLES} examples per puzzle`);
    return value.map((entry, index) => {
        if (!isExample(entry)) throw new Error(`example ${index + 1} needs a name and an input`);
        if (entry.input.length > MAX_INPUT_LENGTH) throw new Error(`example ${index + 1} is too large`);
        const expected: Example['expected'] = {};
        const source = (entry.expected ?? {}) as Record<string, unknown>;
        for (const part of ['part1', 'part2'] as const) {
            const answer = source[part];
            if (answer !== undefined && answer !== null && String(answer).trim() !== '') expected[part] = String(answer).trim();
        }
        return { name: entry.name.trim() || `example ${index + 1}`, input: entry.input, ...(Object.keys(expected).length ? { expected } : {}) };
    });
};
