/**
 * puzzles/2024/day13/solution.ts
 *
 * ~~ Claw Contraption ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/12/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the constants out of each test
    const machines = input.trim().split('\n\n').map(lines => {
        const [buttonA, buttonB, prize] = lines.split('\n');
        const [c1, c4] = buttonA.split(': ')[1].split(', ').map(num => parseInt(num.split('+')[1]));
        const [c2, c5] = buttonB.split(': ')[1].split(', ').map(num => parseInt(num.split('+')[1]));
        const [c3, c6] = prize.split(': ')[1].split(', ').map(num => parseInt(num.split('=')[1]));
        return { c1, c2, c3, c4, c5, c6 };
    });

    return machines.reduce((sum, machine, i) => {
        // try to calculate a and b
        // c3 = c1 * a + c2 * b
        // c6 = c4 * a + c5 * b
        // https://www.desmos.com/calculator/l1amw7m2rg
        const b = (machine.c1 * machine.c6 - machine.c4 * machine.c3) / (machine.c1 * machine.c5 - machine.c4 * machine.c2);
        const a = (machine.c3 - machine.c2 * b) / machine.c1;

        // test is accepted when both numbers are integers
        return sum + ((a % 1 === 0 && b % 1 === 0) ? (a * 3 + b) : 0);
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse the constants out of each machine, add 10000000000000 to the prize position
    const machines = input.trim().split('\n\n').map(lines => {
        const [buttonA, buttonB, prize] = lines.split('\n');
        const [c1, c4] = buttonA.split(': ')[1].split(', ').map(num => parseInt(num.split('+')[1]));
        const [c2, c5] = buttonB.split(': ')[1].split(', ').map(num => parseInt(num.split('+')[1]));
        const [c3, c6] = prize.split(': ')[1].split(', ').map(num => parseInt(num.split('=')[1]) + 10000000000000);
        return { c1, c2, c3, c4, c5, c6 };
    });

    return machines.reduce((sum, machine) => {
        // try to calculate a and b
        // c3 = c1 * a + c2 * b
        // c6 = c4 * a + c5 * b
        // https://www.desmos.com/calculator/l1amw7m2rg
        const b = (machine.c1 * machine.c6 - machine.c4 * machine.c3) / (machine.c1 * machine.c5 - machine.c4 * machine.c2);
        const a = (machine.c3 - machine.c2 * b) / machine.c1;

        // test is accepted when both numbers are integers
        return sum + ((a % 1 === 0 && b % 1 === 0) ? (a * 3 + b) : 0);
    }, 0);
};

export { part1, part2 };
