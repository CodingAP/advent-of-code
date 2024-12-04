/**
 * puzzles/2018/day16/solution.ts
 *
 * ~~ Chronal Classification ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

const INSTRUCTIONS: { [key: string]: (registers: number[], args: number[]) => void } = {
    addr: (registers, args) => {
        registers[args[2]] = registers[args[0]] + registers[args[1]];
    },
    addi: (registers, args) => {
        registers[args[2]] = registers[args[0]] + args[1];
    },
    mulr: (registers, args) => {
        registers[args[2]] = registers[args[0]] * registers[args[1]];
    },
    muli: (registers, args) => {
        registers[args[2]] = registers[args[0]] * args[1];
    },
    banr: (registers, args) => {
        registers[args[2]] = registers[args[0]] & registers[args[1]];
    },
    bani: (registers, args) => {
        registers[args[2]] = registers[args[0]] & args[1];
    },
    bonr: (registers, args) => {
        registers[args[2]] = registers[args[0]] | registers[args[1]];
    },
    boni: (registers, args) => {
        registers[args[2]] = registers[args[0]] | args[1];
    },
    setr: (registers, args) => {
        registers[args[2]] = registers[args[0]]
    },
    seti: (registers, args) => {
        registers[args[2]] = args[0];
    },
    gtir: (registers, args) => {
        registers[args[2]] = (args[0] > registers[args[1]]) ? 1 : 0;
    },
    gtri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > args[1]) ? 1 : 0;
    },
    gtrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > registers[args[1]]) ? 1 : 0;
    },
    eqir: (registers, args) => {
        registers[args[2]] = (args[0] === registers[args[1]]) ? 1 : 0;
    },
    eqri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] === args[1]) ? 1 : 0;
    },
    eqrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] === registers[args[1]]) ? 1 : 0;
    },
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const tests = input.trim().split('\n\n\n\n')[0].split('\n\n');

    return tests.reduce((sum, test) => {
        const [before, instruction, after] = test.split('\n');
        const registers = JSON.parse(before.split(': ')[1]);

        let same = 0;
        Object.entries(INSTRUCTIONS).forEach(([name, callback]) => {
            callback(registers, instruction.split(/\s/g).map(num => parseInt(num)).slice(1));
            console.log(name, JSON.stringify(registers), after.split(/:\s+/g)[1].replace(/\s/g, ''));
            if (JSON.stringify(registers) === after.split(/:\s+/g)[1].replace(/\s/g, '')) same++;
        });

        return sum + (same >= 3 ? 1 : 0); 
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return 0;
};

export { part1, part2 };
