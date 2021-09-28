module.exports = input => {
    let programCounter = 0;
    let program = [];
    let registers = [0, 0, 0, 0, 0, 0];

    let instructions = {
        addi: args => {
            registers[args[2]] = registers[args[0]] + args[1];
        },
        addr: args => {
            registers[args[2]] = registers[args[0]] + registers[args[1]];
        },
        muli: args => {
            registers[args[2]] = registers[args[0]] * args[1];
        },
        mulr: args => {
            registers[args[2]] = registers[args[0]] * registers[args[1]];
        },
        bani: args => {
            registers[args[2]] = registers[args[0]] & args[1];
        },
        banr: args => {
            registers[args[2]] = registers[args[0]] & registers[args[1]];
        },
        bori: args => {
            registers[args[2]] = registers[args[0]] | args[1];
        },
        borr: args => {
            registers[args[2]] = registers[args[0]] | registers[args[1]];
        },
        seti: args => {
            registers[args[2]] = args[0];
        },
        setr: args => {
            registers[args[2]] = registers[args[0]];
        },
        gtir: args => {
            registers[args[2]] = (args[0] > registers[args[1]]) ? 1 : 0;
        },
        gtri: args => {
            registers[args[2]] = (registers[args[0]] > args[1]) ? 1 : 0;
        },
        gtrr: args => {
            registers[args[2]] = (registers[args[0]] > registers[args[1]]) ? 1 : 0;
        },
        eqir: args => {
            registers[args[2]] = (args[0] == registers[args[1]]) ? 1 : 0;
        },
        eqri: args => {
            registers[args[2]] = (registers[args[0]] == args[1]) ? 1 : 0;
        },
        eqrr: args => {
            registers[args[2]] = (registers[args[0]] == registers[args[1]]) ? 1 : 0;
        }
    }

    input.split(/\r\n/).forEach(value => {
        if (value.startsWith('#')) programCounter = parseInt(value.split(' ')[1]);
        else program.push(value);
    });

    for (let i = 0; i < 1000000; i++) {
        let count = 0;
        registers = [i, 0, 0, 0, 0, 0];
        console.log(i);
        while (true) {
            let tokens = program[registers[programCounter]].split(' ');
            instructions[tokens[0]](tokens.slice(1).map(value => parseInt(value)));
            registers[programCounter]++;

            if (registers[programCounter] < 0 || registers[programCounter] >= program.length) break;
            count++;
            if (count > 10000) break;
        }
        if (count < 10000) return registers[0];
    }
}