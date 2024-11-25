// @ts-nocheck previous years was written in javascript, so disable it here

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
 * 
 * @param {Record<string, number>} wires all current wires with signals  
 * @param {string} value string from instruction
 * @returns {number | null}
 */
const checkWire = (wires, value) => {
    if (isNaN(value)) {
        if (wires[value] == null) return null;
        else return wires[value];
    } else {
        return parseInt(value);
    }
}

/**
 * all operations on the wires
 */
const gates = {
    SET: (wires, args, result) => {
        let a = checkWire(wires, args[0]);
        if (a == null) return false;

        wires[result] = a;
        return true;
    },
    AND: (wires, args, result) => {
        let a = checkWire(wires, args[0]);
        let b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a & b) & 0xffff;
        return true;
    },
    OR: (wires, args, result) => {
        let a = checkWire(wires, args[0]);
        let b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a | b) & 0xffff;
        return true;
    },
    NOT: (wires, args, result) => {
        let a = checkWire(wires, args[1]);

        if (a == null) return false;

        wires[result] = ~a & 0xffff;
        return true;
    },
    LSHIFT: (wires, args, result) => {
        let a = checkWire(wires, args[0]);
        let b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a << b) & 0xffff;
        return true;
    },
    RSHIFT: (wires, args, result) => {
        let a = checkWire(wires, args[0]);
        let b = checkWire(wires, args[2]);

        if (a == null || b == null) return false;

        wires[result] = (a >> b) & 0xffff;
        return true;
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let wires = {};
    let instructions = input.split(/\n/g);
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let forRemoval = false;
            let [args, result] = instructions[i].split(' -> ');
            args = args.split(' ');
            
            if (args.length == 1) {
                forRemoval = gates.SET(wires, args, result);
            } else if (args.length == 2) {
                forRemoval = gates.NOT(wires, args, result);
            } else {
                forRemoval = gates[args[1]](wires, args, result);
            }

            if (forRemoval) instructions.splice(i, 1);
        }
    }

    return wires.a;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    const value = part1(input);
    const wires = { b: value };
    let instructions = input.split(/\n/g);
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let forRemoval = false;
            let [args, result] = instructions[i].split(' -> ');
            args = args.split(' ');

            if (args.length == 1) {
                forRemoval = gates.SET(wires, args, result);
            } else if (args.length == 2) {
                forRemoval = gates.NOT(wires, args, result);
            } else {
                forRemoval = gates[args[1]](wires, args, result);
            }

            if (forRemoval) instructions.splice(i, 1);
        }
    }

    return wires.a;
}

export { part1, part2 };