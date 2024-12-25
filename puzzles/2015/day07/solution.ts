/**
 * puzzles/2015/day07/solution.ts
 * 
 * ~~ Some Assembly Required ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/27/2023
 */

/**
 * tries to get the wire or number, null if no wire exists
 */
const checkWire = (wires: { [key: string]: number }, value: string) => {
    if (value.match(/[a-z]/g)) {
        if (wires[value] == null) return null;
        else return wires[value];
    } else {
        return parseInt(value);
    }
}

/**
 * all operations on the wires
 */
const GATES: { [key: string]: ( wires: { [key: string]: number }, args: string[], result: string) => boolean } = {
    SET: (wires, args, result) => {
        const a = checkWire(wires, args[0]);
        if (a == null) return false;

        wires[result] = a;
        return true;
    },
    AND: (wires, args, result) => {
        const a = checkWire(wires, args[0]);
        const b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a & b) & 0xffff;
        return true;
    },
    OR: (wires, args, result) => {
        const a = checkWire(wires, args[0]);
        const b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a | b) & 0xffff;
        return true;
    },
    NOT: (wires, args, result) => {
        const a = checkWire(wires, args[1]);

        if (a == null) return false;

        wires[result] = ~a & 0xffff;
        return true;
    },
    LSHIFT: (wires, args, result) => {
        const a = checkWire(wires, args[0]);
        const b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a << b) & 0xffff;
        return true;
    },
    RSHIFT: (wires, args, result) => {
        const a = checkWire(wires, args[0]);
        const b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a >> b) & 0xffff;
        return true;
    }
}

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    const wires: { [key: string]: number } = {};
    const instructions = input.split(/\n/g);
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let forRemoval = false;
            const [left, right] = instructions[i].split(' -> ');
            const args = left.split(' ');
            
            if (args.length == 1) {
                forRemoval = GATES.SET(wires, args, right);
            } else if (args.length == 2) {
                forRemoval = GATES.NOT(wires, args, right);
            } else {
                forRemoval = GATES[args[1]](wires, args, right);
            }

            if (forRemoval) instructions.splice(i, 1);
        }
    }

    return wires.a;
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    const value = part1(input);
    const wires: { [key: string]: number } = { b: value };
    const instructions = input.split(/\n/g);
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let forRemoval = false;
            const [left, right] = instructions[i].split(' -> ');
            const args = left.split(' ');
            
            if (args.length == 1) {
                forRemoval = GATES.SET(wires, args, right);
            } else if (args.length == 2) {
                forRemoval = GATES.NOT(wires, args, right);
            } else {
                forRemoval = GATES[args[1]](wires, args, right);
            }

            if (forRemoval) instructions.splice(i, 1);
        }
    }

    return wires.a;
}

export { part1, part2 };