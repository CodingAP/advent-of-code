/**
 * backend/src/readme.ts
 *
 * renders the results header of a puzzle readme while preserving the writeup after the %%% marker
 *
 * by alex prosser
 */

/** separates the generated results header from the hand written writeup */
export const WRITEUP_MARKER = '%%%';

export interface ReadmeResults {
    part1?: { answer: string; timeMs: number };
    part2?: { answer: string; timeMs: number };
}

const cell = (part?: { answer: string; timeMs: number }, field: 'answer' | 'time' = 'answer') => {
    if (!part) return 'n/a';
    return field === 'answer' ? part.answer : part.timeMs.toFixed(2);
};

/**
 * builds the readme: generated header + results table, then whatever writeup the existing readme already had
 */
export const renderReadme = (year: number, day: number, title: string, results: ReadmeResults, existing?: string): string => {
    const header = `# Advent of Code ${year} - Day ${day}: [${title}](https://adventofcode.com/${year}/day/${day})

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | ${cell(results.part1)} | ${cell(results.part2)} |
| **Time (in ms)** | ${cell(results.part1, 'time')} | ${cell(results.part2, 'time')} |
`;

    if (existing) {
        const index = existing.indexOf(WRITEUP_MARKER);
        if (index !== -1) return `${header}\n${existing.slice(index).trimEnd()}\n`;
    }

    return header;
};
