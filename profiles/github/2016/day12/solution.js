let opcodes = {
    cpy: (registers, args) => {
        let num;
        if (args[0].match(/[abcd]/g)) num = registers[args[0]];
        else num = parseInt(args[0]);
        registers[args[1]] = num;
        return 1;
    },
    inc: (registers, args) => {
        registers[args[0]]++;
        return 1;
    },
    dec: (registers, args) => {
        registers[args[0]]--;
        return 1;
    },
    jnz: (registers, args) => {
        if (registers[args[0]] != 0) return parseInt(args[1]);
        return 1;
    }
}

const part1 = async input => {
    let registers = { a: 0, b: 0, c: 0, d: 0 };
    let programCounter = 0;
    let program = input.split('\n').map(line => {
        let tokens = line.split(' ');
        return { instruction: tokens[0], args: tokens.slice(1) };
    });

    while (programCounter >= 0 && programCounter < program.length) {
        let instruction = program[programCounter];
        programCounter += opcodes[instruction.instruction](registers, instruction.args);
    }

    return registers.a;
}

const part2 = async input => {
    let registers = { a: 0, b: 0, c: 1, d: 0 };
    let programCounter = 0;
    let program = input.split('\n').map(line => {
        let tokens = line.split(' ');
        return { instruction: tokens[0], args: tokens.slice(1) };
    });

    while (programCounter >= 0 && programCounter < program.length) {
        let instruction = program[programCounter];
        programCounter += opcodes[instruction.instruction](registers, instruction.args);
    }

    return registers.a;
}

export { part1, part2 };