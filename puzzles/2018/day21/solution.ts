/**
 * puzzles/2018/day21/solution.ts
 *
 * ~~ Chronal Conversion ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/5/2024
 */

const REGISTER_MAPPINGS = ['a', 'ip', 'c', 'd', 'e', 'f'];

const INSTRUCTIONS_DECOMPILED: { [key: string]: (args: number[]) => string } = {
    addr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} + ${REGISTER_MAPPINGS[args[1]]}`,
    addi: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} + ${args[1]}`,
    mulr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} * ${REGISTER_MAPPINGS[args[1]]}`,
    muli: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} * ${args[1]}`,
    banr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} & ${REGISTER_MAPPINGS[args[1]]}`,
    bani: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} & ${args[1]}`,
    borr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} | ${REGISTER_MAPPINGS[args[1]]}`,
    bori: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} | ${args[1]}`,
    setr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]}`,
    seti: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${args[0]}`,
    gtir: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${args[0]} > ${REGISTER_MAPPINGS[args[1]]}`,
    gtri: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} > ${args[1]}`,
    gtrr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} > ${REGISTER_MAPPINGS[args[1]]}`,
    eqir: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${args[0]} == ${REGISTER_MAPPINGS[args[1]]}`,
    eqri: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} == ${args[1]}`,
    eqrr: (args) => `${REGISTER_MAPPINGS[args[2]]} = ${REGISTER_MAPPINGS[args[0]]} == ${REGISTER_MAPPINGS[args[1]]}`
};

const decompile = (input: string) => {
    let content = '';
    input.trim().split('\n').slice(1).forEach((line, i) => {
        const [instruction, ...args] = line.split(' ');
        content += i.toString().padStart(2, ' ') + ': ' + INSTRUCTIONS_DECOMPILED[instruction](args.map(num => parseInt(num))) + '\n';
    });
    return content;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    console.log(decompile(input));
    // this is from reverse engineering the program
    // we take the first value that works
    let c = 4843319;
    let f = 65536;
    while (true) {
        let e = f & 0xff;
        c = (((c + e) & 16777215) * 65899) & 16777215

        if (f < 256) return c;
        f = Math.floor(f / 256); 
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // this is from reverse engineering the program
    // we take the last value that works, which requires going through all possivle
    let c = 4843319;
    let f = 65536;
    const previous: number[] = [];
    while (true) {
        let e = f & 0xff;
        c = (((c + e) & 16777215) * 65899) & 16777215;

        if (f < 256) {
            if (previous.includes(c)) return previous.at(-1);
            else previous.push(c);

            f = c | 65536;
            c = 4843319;
        } else {
            f = Math.floor(f / 256); 
        }
    }
};

export { part1, part2 };
