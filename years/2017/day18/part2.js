const common = require('../../../scripts/common');

module.exports = input => {
    let sum = 0;
    let program = input.split('\n');
    let programs = [
        {
            registers: { p: 0 },
            programCounter: 0,
            queue: [],
            last: []
        },
        {
            registers: { p: 1 },
            programCounter: 0,
            queue: [],
            last: []
        }
    ];

    let instructions = {
        snd: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            programs[1 - id].queue.push(programs[id].registers[args[0]]);
            programs[id].programCounter++;

            if (id == 1) sum++;
        },
        set: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!programs[id].registers[args[1]]) programs[id].registers[args[1]] = 0;
                value = programs[id].registers[args[1]];
            }
            else value = parseInt(args[1]);
            programs[id].registers[args[0]] = value;
            programs[id].programCounter++;
        },
        add: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!programs[id].registers[args[1]]) programs[id].registers[args[1]] = 0;
                value = programs[id].registers[args[1]];
            }
            else value = parseInt(args[1]);

            programs[id].registers[args[0]] += value;

            programs[id].programCounter++;
        },
        mul: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!programs[id].registers[args[1]]) programs[id].registers[args[1]] = 0;
                value = programs[id].registers[args[1]];
            }
            else value = parseInt(args[1]);

            programs[id].registers[args[0]] *= value;

            programs[id].programCounter++;
        },
        mod: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            let value = null;
            if (args[1].match(/[a-z]/)) {
                if (!programs[id].registers[args[1]]) programs[id].registers[args[1]] = 0;
                value = programs[id].registers[args[1]];
            }
            else value = parseInt(args[1]);

            programs[id].registers[args[0]] %= value;

            programs[id].programCounter++;
        },
        rcv: (id, args) => {
            if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
            if (programs[id].queue.length > 0) {
                programs[id].registers[args[0]] = programs[id].queue.shift();
                programs[id].programCounter++;
            }
        },
        jgz: (id, args) => {
            let value1 = null;
            if (args[0].match(/[a-z]/)) {
                if (!programs[id].registers[args[0]]) programs[id].registers[args[0]] = 0;
                value1 = programs[id].registers[args[0]];
            }
            else value1 = parseInt(args[0]);
            let value2 = null;
            if (args[1].match(/[a-z]/)) {
                if (!programs[id].registers[args[1]]) programs[id].registers[args[1]] = 0;
                value2 = programs[id].registers[args[1]];
            }
            else value2 = parseInt(args[1]);

            if (value1 > 0) programs[id].programCounter += value2;
            else programs[id].programCounter++;
        }
    }

    while (true) {
        let stalled = true;
        for (let i = 0; i < 2; i++) {
            let tokens = program[programs[i].programCounter].split(' ');

            instructions[tokens[0]](i, tokens.slice(1));
            if (programs[i].last.length > 10) programs[i].last.shift();
            programs[i].last.push(programs[i].programCounter);

            let check = common.copy(programs[i].last).sort();
            if (check[0] != check[check.length - 1] || check.length <= 1) stalled = false;
        }
        if (stalled) break;
    }

    return sum;
}