/**
 * backend/src/submit.ts
 *
 * runs a puzzle and submits the answers, remembering every verdict so nothing is resubmitted by accident
 *
 * by alex prosser
 */

import { postAnswer } from './aoc-client.ts';
import type { Part } from './config.ts';
import { findAnswer, insertAnswer } from './db.ts';
import { runPuzzle } from './runner.ts';

export interface SubmitOutcome {
    part1?: { answer: string; message: string; correct: boolean | null };
    part2?: { answer: string; message: string; correct: boolean | null };
}

/** adventofcode.com rejects a second submission within a few seconds of the first */
const SUBMISSION_DELAY_MS = 5000;

const submitPart = async (year: number, day: number, part: '1' | '2', answer: string, fake: boolean) => {
    const previous = findAnswer(year, day, part, answer);
    if (previous) {
        return previous.result === 1
            ? { answer, correct: true, message: "🎉 resubmission successful: that's the right answer!" }
            : { answer, correct: false, message: "❌ resubmission failed: that's not the right answer." };
    }

    if (fake) {
        insertAnswer(year, day, part, answer, true);
        return { answer, correct: true, message: 'fake submission: this better be right!' };
    }

    const outcome = await postAnswer(year, day, part, answer);
    let correct: boolean | null = null;
    let message: string;
    switch (outcome) {
        case 'correct':
            correct = true;
            message = "🎉 submission successful: that's the right answer!";
            break;
        case 'incorrect':
            correct = false;
            message = "❌ submission failed: that's not the right answer.";
            break;
        case 'too-soon':
            message = '⏳ submission failed: you are submitting too quickly.';
            break;
        case 'already-solved':
            message = '❓ submission failed: already solved.';
            break;
        default:
            message = '⚠️ submission failed: unknown response from server.';
    }

    // only definite verdicts are worth remembering
    if (correct !== null) insertAnswer(year, day, part, answer, correct);

    return { answer, correct, message };
};

/**
 * computes and submits the requested part(s)
 */
export const submitAnswer = async (year: number, day: number, part: Part = 'both', fake = false): Promise<SubmitOutcome> => {
    const run = await runPuzzle(year, day, { part, iterations: 1 });
    if (!run.success) throw new Error(`solution failed, nothing submitted: ${run.error}`);

    const outcome: SubmitOutcome = {};

    if ((part === '1' || part === 'both') && run.results.part1) {
        outcome.part1 = await submitPart(year, day, '1', run.results.part1.answer, fake);
    }

    if (part === 'both' && outcome.part1 && !fake) {
        await new Promise((resolve) => setTimeout(resolve, SUBMISSION_DELAY_MS));
    }

    if ((part === '2' || part === 'both') && run.results.part2) {
        outcome.part2 = await submitPart(year, day, '2', run.results.part2.answer, fake);
    }

    return outcome;
};
