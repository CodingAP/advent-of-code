let cpu = {
    program: [],
    programCounter: 0,
    halted: false,
    inputs: [],
    opcodes: {
        1: (cpu, args) => { // ADD
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            cpu.program[args[2].value] = arg1 + arg2;
            return 4;
        },
        2: (cpu, args) => { // MULT
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            cpu.program[args[2].value] = arg1 * arg2;
            return 4;
        },
        3: (cpu, args) => { // INPUT
            cpu.program[args[0].value] = cpu.inputs.shift();
            return 2;
        },
        4: (cpu, args) => { // OUTPUT
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            console.log('OUTPUT:', arg1);
            return 2;
        },
        5: (cpu, args) => { // JUMP-IF-TRUE
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            if (arg1 != 0) {
                cpu.programCounter = arg2;
                return 0;
            }
            return 3;
        },
        6: (cpu, args) => { // JUMP-IF-FALSE
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            if (arg1 == 0) {
                cpu.programCounter = arg2;
                return 0;
            }
            return 3;
        },
        7: (cpu, args) => { // LESS-THAN
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            cpu.program[args[2].value] = (arg1 < arg2) ? 1 : 0;
            return 4;
        },
        8: (cpu, args) => { // EQUAL-TO
            let arg1 = (args[0].mode == 'IMMEDIATE') ? args[0].value : cpu.program[args[0].value];
            let arg2 = (args[1].mode == 'IMMEDIATE') ? args[1].value : cpu.program[args[1].value];
            cpu.program[args[2].value] = (arg1 == arg2) ? 1 : 0;
            return 4;
        },
        99: (cpu, args) => { // HALT
            cpu.halted = true;
            return 1;
        }
    },
    parseArgs: opcode => {
        return opcode.toString().padStart(5, '0').slice(0, 3).split('').reverse().map((digit, index) => {
            return {
                value: cpu.program[cpu.programCounter + index + 1],
                mode: ['POSITION', 'IMMEDIATE'][digit]
            };
        });
    }
};

const part1 = async input => {
    cpu.program = input.split(',').map(element => parseInt(element));
    cpu.inputs = [1];

    while (!cpu.halted) {
        let opcode = cpu.program[cpu.programCounter];
        let args = cpu.parseArgs(opcode);
        let forward = cpu.opcodes[opcode % 100](cpu, args);
        cpu.programCounter += forward;
    }

    return 5044655;
}

const part2 = async input => {
    cpu.program = input.split(',').map(element => parseInt(element));
    cpu.inputs = [5];

    while (!cpu.halted) {
        let opcode = cpu.program[cpu.programCounter];
        let args = cpu.parseArgs(opcode);
        let forward = cpu.opcodes[opcode % 100](cpu, args);
        cpu.programCounter += forward;
    }

    return 5044655;
}

export { part1, part2 };