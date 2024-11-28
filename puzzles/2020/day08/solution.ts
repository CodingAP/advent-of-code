// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2020/day08/solution.ts
 *
 * ~~ Handheld Halting ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let previousPosition = [];
    let accumulator = 0, programCounter = 0;
    let program = input.split('\n');

    while (true) {
        let tokens = program[programCounter].split(' ');
        if (tokens[0] == 'acc') {
            accumulator += parseInt(tokens[1]);
            programCounter++;
        } else if (tokens[0] == 'jmp') {
            programCounter += parseInt(tokens[1]);
        } else if (tokens[0] == 'nop') {
            programCounter++;
        }

        if (previousPosition.includes(programCounter)) {
            break;
        } else {
            previousPosition.push(programCounter);
        }
    }

    return accumulator;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let executeProgram = (program) => {
        let accumulator = 0, programCounter = 0;
        let tries = 0, limit = 500;

        while (true) {
            let tokens = program[programCounter].split(' ');
            if (tokens[0] == 'acc') {
                accumulator += parseInt(tokens[1]);
                programCounter++;
            } else if (tokens[0] == 'jmp') {
                programCounter += parseInt(tokens[1]);
            } else if (tokens[0] == 'nop') {
                programCounter++;
            }

            if (programCounter == program.length) break;
            tries++;
            if (tries == limit) return null;
        }

        return accumulator;
    }

    let program = input.trim().split('\n');

    for (let i = 0; i < program.length; i++) {
        let tokens = program[i].split(' ');
        if (tokens[0] == 'jmp') {
            let newProgram = [...program];
            newProgram[i] = 'nop ' + tokens[1];
            let result = executeProgram(newProgram);
            if (result != null) return result;
        } else if (tokens[0] == 'nop') {
            let newProgram = [...program];
            newProgram[i] = 'jmp ' + tokens[1];
            let result = executeProgram(newProgram);
            if (result != null) return result;
        }
    }
};

export { part1, part2 };
