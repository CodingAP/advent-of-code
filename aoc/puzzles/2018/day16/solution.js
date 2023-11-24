const instructions = {
    addr: (registers, args) => {
        registers[args[2]] = registers[args[0]] + registers[args[1]];
        return registers;
    },
    addi: (registers, args) => {
        registers[args[2]] = registers[args[0]] + args[1];
        return registers;
    },
    mulr: (registers, args) => {
        registers[args[2]] = registers[args[0]] * registers[args[1]];
        return registers;
    },
    muli: (registers, args) => {
        registers[args[2]] = registers[args[0]] * args[1];
        return registers;
    },
    banr: (registers, args) => {
        registers[args[2]] = registers[args[0]] & registers[args[1]];
        return registers;
    },
    bani: (registers, args) => {
        registers[args[2]] = registers[args[0]] & args[1];
        return registers;
    },
    borr: (registers, args) => {
        registers[args[2]] = registers[args[0]] | registers[args[1]];
        return registers;
    },
    bori: (registers, args) => {
        registers[args[2]] = registers[args[0]] | args[1];
        return registers;
    },
    setr: (registers, args) => {
        registers[args[2]] = registers[args[0]];
        return registers;
    },
    seti: (registers, args) => {
        registers[args[2]] = args[0];
        return registers;
    },
    gtir: (registers, args) => {
        registers[args[2]] = (args[0] > registers[args[1]]) ? 1 : 0;
        return registers;
    },
    gtri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > args[1]) ? 1 : 0;
        return registers;
    },
    gtrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] > registers[args[1]]) ? 1 : 0;
        return registers;
    },
    eqir: (registers, args) => {
        registers[args[2]] = (args[0] == registers[args[1]]) ? 1 : 0;
        return registers;
    },
    eqri: (registers, args) => {
        registers[args[2]] = (registers[args[0]] == args[1]) ? 1 : 0;
        return registers;
    },
    eqrr: (registers, args) => {
        registers[args[2]] = (registers[args[0]] == registers[args[1]]) ? 1 : 0;
        return registers;
    }
}

const part1 = async input => {
    let [diagnose, program] = input.split('\n\n\n\n');

    return diagnose.split('\n\n').reduce((acc, lines) => {
        let [before, instruction, after] = lines.split('\n');

        before = JSON.parse(before.split(': ')[1]);
        after = JSON.parse(after.split(':  ')[1]);
        instruction = instruction.split(' ').map(num => parseInt(num));

        if (Object.keys(instructions).reduce((sum, name) => {
            let newRegisters = instructions[name]([...before], instruction.slice(1));
            return sum + (JSON.stringify(newRegisters) == JSON.stringify(after) ? 1 : 0);
        }, 0) >= 3) acc++;
        return acc;
    }, 0);
}

const part2 = async input => {
    let [tests, program] = input.split('\n\n\n\n');
    let opcodes = [];

    tests.split('\n\n').forEach(test => {
        let [before, instruction, after] = test.split('\n');

        before = JSON.parse(before.split(': ')[1]);
        after = JSON.parse(after.split(':  ')[1]);
        instruction = instruction.split(' ').map(num => parseInt(num));

        let possible = Object.keys(instructions).reduce((array, name) => {
            let newRegisters = instructions[name]([...before], instruction.slice(1));
            if (JSON.stringify(newRegisters) == JSON.stringify(after)) array.push(name);
            return array;
        }, []).filter(element => !opcodes.includes(element));

        if (possible.length == 1) opcodes[instruction[0]] = possible[0];
    });

    let registers = [0, 0, 0, 0];
    program.split('\n').map(instruction => instruction.split(' ').map(num => parseInt(num))).forEach(instruction => {
        registers = instructions[opcodes[instruction[0]]]([...registers], instruction.slice(1));
    });
    return registers[0];
}

export { part1, part2 };