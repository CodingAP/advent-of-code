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

// ~~~~~~~~~~~~~~~~~~ OLD CODE THAT RUNS PROGRAM ~~~~~~~~~~~~~~~~~~
// let program = input.split('\n');
// let programCounter = { register: parseInt(program[0].split(' ')[1]), value: 0 };
// program = program.slice(1).map(instruction => {
//     let tokens = instruction.split(' ');
//     return { instruction: tokens[0], args: tokens.slice(1).map(num => parseInt(num)) };
// });

// let registers = [0, 0, 0, 0, 0, 0];
// while (programCounter.value >= 0 && programCounter.value < program.length) {
//     registers[programCounter.register] = programCounter.value;
//     registers = instructions[program[programCounter.value].instruction]([...registers], program[programCounter.value].args);
//     programCounter.value = registers[programCounter.register] + 1;
// }

// NOTE: This program just calculates the sum of all the factors of a number. In part 1, the number is 920. In part 2, the number is 10551320

const part1 = async input => {
    let num = 920;
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i != 0) continue;

        let factor1 = i;
        let factor2 = num / i;
        if (factor1 == factor2) sum += factor1;
        else sum += factor1 + factor2;
    }

    return sum;
}

const part2 = async input => {
    let num = 10551320;
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i != 0) continue;

        let factor1 = i;
        let factor2 = num / i;
        if (factor1 == factor2) sum += factor1;
        else sum += factor1 + factor2;
    }

    return sum;
}

export { part1, part2 };