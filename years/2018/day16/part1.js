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
    
    let sum = 0;
    let keys = Object.keys(instructions);
    for (let i = 0; i < tests.length; i++) {
        let [before, opcode, after] = tests[i].split(/\n/g);
        before = before.split(/[\[\]]/g)[1].split(/,/g).map(value => parseInt(value));
        opcode = opcode.split(/\s/g).map(value => parseInt(value));
        after = after.split(/[\[\]]/g)[1].split(/,/g).map(value => parseInt(value));
        
        let equals = 0;
        keys.forEach(value => {
            let opAfter = instructions[value](before, opcode.slice(1));
            if (common.arrayEquals(after, opAfter)) equals++;
        });
        if (equals >= 3) sum++;
    }
    return sum;
}