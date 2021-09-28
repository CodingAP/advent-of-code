module.exports = input => {
    let program = input.split('\n');
    let registers = {};
    let programCounter = 0;
    let sounds = [];
    let recoverTime = false;

    let instructions = {
        snd: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            sounds.push(registers[args[0]]);
            programCounter++;
        },
        set: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!registers[args[1]]) registers[args[1]] = 0;
                value = registers[args[1]];
            }
            else value = parseInt(args[1]);
            registers[args[0]] = value;
            programCounter++;
        },
        add: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!registers[args[1]]) registers[args[1]] = 0;
                value = registers[args[1]];
            }
            else value = parseInt(args[1]);

            registers[args[0]] += value;

            programCounter++;
        },
        mul: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!registers[args[1]]) registers[args[1]] = 0;
                value = registers[args[1]];
            }
            else value = parseInt(args[1]);

            registers[args[0]] *= value;

            programCounter++;
        },
        mod: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!registers[args[1]]) registers[args[1]] = 0;
                value = registers[args[1]];
            }
            else value = parseInt(args[1]);

            registers[args[0]] %= value;

            programCounter++;
        },
        rcv: args => {
            if (!registers[args[0]]) registers[args[0]] = 0;
            if (registers[args[0]] != 0) recoverTime = true;
            programCounter++;
        },
        jgz: args => {
            let value1 = null;
            if (args[0].match(/[a-z]/)) {
                if (!registers[args[0]]) registers[args[0]] = 0;
                value1 = registers[args[0]];
            }
            else value1 = parseInt(args[0]);
            let value2 = null;
            if (args[1].match(/[a-z]/)) {
                if (!registers[args[1]]) registers[args[1]] = 0;
                value2 = registers[args[1]];
            }
            else value2 = parseInt(args[1]);

            if (value1 > 0) programCounter += value2;
            else programCounter++;
        }
    }

    while (!recoverTime) {
        let tokens = program[programCounter].split(' ');

        instructions[tokens[0]](tokens.slice(1));
    }

    return sounds[sounds.length - 1];
}