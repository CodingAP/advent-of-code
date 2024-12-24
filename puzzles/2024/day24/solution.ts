/**
 * puzzles/2024/day24/solution.ts
 *
 * ~~ Crossed Wires ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/23/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const parts = input.trim().split('\n\n').map(lines => lines.split('\n'));
    const wires = parts[0].reduce<{ [key: string]: number }>((obj, line) => {
        const [left, right] = line.split(': ');
        obj[left] = parseInt(right);
        return obj;
    }, {});

    const instructions = parts[1].map(line => {
        const tokens = line.split(' ');
        return { a: tokens[0], b: tokens[2], c: tokens[4], operation: tokens[1], executed: false };
    });

    while (instructions.some(instruction => !instruction.executed)) {
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i].executed) continue;

            if (wires[instructions[i].a] !== undefined && wires[instructions[i].b] !== undefined) {
                if (instructions[i].operation === 'AND') wires[instructions[i].c] = wires[instructions[i].a] & wires[instructions[i].b];
                if (instructions[i].operation === 'OR') wires[instructions[i].c] = wires[instructions[i].a] | wires[instructions[i].b];
                if (instructions[i].operation === 'XOR') wires[instructions[i].c] = wires[instructions[i].a] ^ wires[instructions[i].b]; 

                instructions[i].executed = true;
            }
        }
    }

    const zWires = Object.keys(wires).filter(wire => wire[0] === 'z').sort().reverse().map(wire => wires[wire]).join('');
    return BigInt('0b' + zWires);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const instructions = input.trim().split('\n\n').map(lines => lines.split('\n'))[1].map(line => {
        const tokens = line.split(' ');
        return { a: tokens[0], b: tokens[2], c: tokens[4], operation: tokens[1] };
    });

    const BIT_LENGTH = 45;

    // for my input, no carry flags were swapped
    const incorrect: string[] = [];
    for (let i = 0; i < BIT_LENGTH; i++) {
        const id = i.toString().padStart(2, '0');
        const xor1 = instructions.find(instruction => ((instruction.a === `x${id}` && instruction.b === `y${id}`) || (instruction.a === `y${id}` && instruction.b === `x${id}`)) && instruction.operation === 'XOR');
        const and1 = instructions.find(instruction => ((instruction.a === `x${id}` && instruction.b === `y${id}`) || (instruction.a === `y${id}` && instruction.b === `x${id}`)) && instruction.operation === 'AND');
        const z = instructions.find(instruction => instruction.c === `z${id}`);

        if (xor1 === undefined || and1 === undefined || z === undefined) continue;

        // each z must be connected to an XOR
        if (z.operation !== 'XOR') incorrect.push(z.c);
        
        // each AND must go to an OR (besides the first case as it starts the carry flag)
        const or = instructions.find(instruction => instruction.a === and1.c || instruction.b === and1.c);
        if (or !== undefined && or.operation !== 'OR' && i > 0) incorrect.push(and1.c);

        // the first XOR must to go to XOR or AND
        const after = instructions.find(instruction => instruction.a === xor1.c || instruction.b === xor1.c);
        if (after !== undefined && after.operation === 'OR') incorrect.push(xor1.c);
    }

    // each XOR must be connected to an x, y, or z
    incorrect.push(...instructions.filter(instruction => !instruction.a[0].match(/[xy]/g) && !instruction.b[0].match(/[xy]/g) && !instruction.c[0].match(/[z]/g) && instruction.operation === 'XOR').map(instruction => instruction.c))

    return incorrect.sort().join(',');
};

export { part1, part2 };
