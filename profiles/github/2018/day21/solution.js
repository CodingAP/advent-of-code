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

let letters = ['a', 'ip', 'c', 'd', 'e', 'f'];
const decomp = {
    addr: args => `${letters[args[2]]} = ${letters[args[0]]} + ${letters[args[1]]}`,
    addi: args => `${letters[args[2]]} = ${letters[args[0]]} + ${args[1]}`,
    mulr: args => `${letters[args[2]]} = ${letters[args[0]]} * ${letters[args[1]]}`,
    muli: args => `${letters[args[2]]} = ${letters[args[0]]} * ${args[1]}`,
    banr: args => `${letters[args[2]]} = ${letters[args[0]]} & ${letters[args[1]]}`,
    bani: args => `${letters[args[2]]} = ${letters[args[0]]} & ${args[1]}`,
    borr: args => `${letters[args[2]]} = ${letters[args[0]]} | ${letters[args[1]]}`,
    bori: args => `${letters[args[2]]} = ${letters[args[0]]} | ${args[1]}`,
    setr: args => `${letters[args[2]]} = ${letters[args[0]]}`,
    seti: args => `${letters[args[2]]} = ${args[0]}`,
    gtir: args => `${letters[args[2]]} = (${args[0]} > ${letters[args[1]]}) ? 1 : 0`,
    gtri: args => `${letters[args[2]]} = (${letters[args[0]]} > ${args[1]}) ? 1 : 0`,
    gtrr: args => `${letters[args[2]]} = (${letters[args[0]]} > ${letters[args[1]]}) ? 1 : 0`,
    eqir: args => `${letters[args[2]]} = (${args[0]} == ${letters[args[1]]}) ? 1 : 0`,
    eqri: args => `${letters[args[2]]} = (${letters[args[0]]} == ${args[1]}) ? 1 : 0`,
    eqrr: args => `${letters[args[2]]} = (${letters[args[0]]} == ${letters[args[1]]}) ? 1 : 0`
}

const part1 = async input => {
    // This is from reverse engineering the program
    return 8797248;
}

const part2 = async input => {
    let program = input.split('\n');
    let programCounter = { register: parseInt(program[0].split(' ')[1]), value: 0 };
    program = program.slice(1).map(instruction => {
        let tokens = instruction.split(' ');
        return { instruction: tokens[0], args: tokens.slice(1).map(num => parseInt(num)) };
    });

    let registers = [8797248, 0, 0, 0, 0, 0];
    while (programCounter.value >= 0 && programCounter.value < program.length) {
        registers[programCounter.register] = programCounter.value;
        registers = instructions[program[programCounter.value].instruction]([...registers], program[programCounter.value].args);
        programCounter.value = registers[programCounter.register] + 1;

        // if (programCounter.value == 29) break;
        console.log(registers);
    }
    console.log(registers);
    // let a = 8797248, c = 0, f = 0;
    // let times = 0;
    // while (true) {
    //     f = c | 65536
    //     c = 4843319
    //     while (f >= 256) {
    //         let e = f & 255;
    //         c = (((c + e) & 16777215) * 65899) & 16777215;
    //         console.log(c, e, f);

    //         f = Math.ceil(f / 256);
    //         console.log(c, e, f);
    //         times++;
    //         if (times == 4) break;
    //     }
    //     if (c == a) break;
    //     if (times == 4) break;
    // }
    // return 0;
}

export { part1, part2 };