const input = require('fs').readFileSync('./years/2018/day16/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let instructions = {
        addi: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] + args[1];
            return newRegisters;
        },
        addr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] + registers[args[1]];
            return newRegisters;
        },
        muli: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] * args[1];
            return newRegisters;
        },
        mulr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] * registers[args[1]];
            return newRegisters;
        },
        bani: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] & args[1];
            return newRegisters;
        },
        banr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] & registers[args[1]];
            return newRegisters;
        },
        bori: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] | args[1];
            return newRegisters;
        },
        borr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]] | registers[args[1]];
            return newRegisters;
        },
        seti: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = args[0];
            return newRegisters;
        },
        setr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = registers[args[0]];
            return newRegisters;
        },
        gtir: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (args[0] > registers[args[1]]) ? 1 : 0;
            return newRegisters;
        },
        gtri: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (registers[args[0]] > args[1]) ? 1 : 0;
            return newRegisters;
        },
        gtrr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (registers[args[0]] > registers[args[1]]) ? 1 : 0;
            return newRegisters;
        },
        eqir: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (args[0] == registers[args[1]]) ? 1 : 0;
            return newRegisters;
        },
        eqri: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (registers[args[0]] == args[1]) ? 1 : 0;
            return newRegisters;
        },
        eqrr: (registers, args) => {
            let newRegisters = common.copy(registers);
            newRegisters[args[2]] = (registers[args[0]] == registers[args[1]]) ? 1 : 0;
            return newRegisters;
        }
    }

    let tests = [];
    let program = [];
    let spaceCount = 0;
    let mode = 0;
    let current = '';

    input.split(/\r\n/).forEach(value => {
        if (value == '') spaceCount++;
        else spaceCount = 0;

        if (spaceCount == 3) mode++;

        if (mode == 0) {
            if (spaceCount == 1) {
                tests.push(current);
                current = '';
            } else current += value + '\n';
        } else if (mode == 1) {
            if (value == '') return;
            program.push(value);
        }
    });

    let opcodeMatch = {};
    let keys = Object.keys(instructions);
    for (let i = 0; i < tests.length; i++) {
        let [before, opcode, after] = tests[i].split(/\n/g);
        before = before.split(/[\[\]]/g)[1].split(/,/g).map(value => parseInt(value));
        opcode = opcode.split(/\s/g).map(value => parseInt(value));
        after = after.split(/[\[\]]/g)[1].split(/,/g).map(value => parseInt(value));

        let equals = [];
        keys.forEach(value => {
            let opAfter = instructions[value](before, opcode.slice(1));
            if (common.arrayEquals(after, opAfter)) equals.push(value);
        });
        
        Object.values(opcodeMatch).forEach(value => {
            if (equals.includes(value)) equals.splice(equals.indexOf(value), 1);
        });
        
        if (equals.length == 1) opcodeMatch[opcode[0]] = equals[0];
    }
    
    let registers = [0, 0, 0, 0];
    for (let i = 0; i < program.length; i++) {
        let opcode = program[i].split(/\s/g).map(value => parseInt(value));
        registers = instructions[opcodeMatch[opcode[0]]](registers, opcode.slice(1));
    }
    return registers[0];
}