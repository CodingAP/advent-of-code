const part1 = async input => {
    let cpu = {
        program: input.split(',').map(element => parseInt(element)),
        programCounter: 0,
        halted: false,
        inputs: []
    };

    let opcodes = {
        1: cpu => { // ADD
            cpu.program[cpu.program[cpu.programCounter + 3]] = cpu.program[cpu.program[cpu.programCounter + 1]] + cpu.program[cpu.program[cpu.programCounter + 2]];
            cpu.programCounter += 4;
        },
        2: cpu => { // MULT
            cpu.program[cpu.program[cpu.programCounter + 3]] = cpu.program[cpu.program[cpu.programCounter + 1]] * cpu.program[cpu.program[cpu.programCounter + 2]];
            cpu.programCounter += 4;
        },
        3: cpu => { // INPUT
            cpu.program[cpu.program[cpu.programCounter + 1]] = cpu.inputs.unshift();
            cpu.programCounter += 2;
        },
        4: cpu => { // INPUT
            console.log('OUTPUT: ', cpu.program[cpu.program[cpu.programCounter + 1]])
            cpu.programCounter += 2;
        }
    }

    while (!halted) {
        switch (program[programCounter]) {
            case 1:
                program[program[programCounter + 3]] = program[program[programCounter + 1]] + program[program[programCounter + 2]];
                programCounter += 4;
                break;
            case 2:
                program[program[programCounter + 3]] = program[program[programCounter + 1]] * program[program[programCounter + 2]];
                programCounter += 4;
                break;
            case 99:
                halted = true;
                programCounter++;
                break;
        }
    }

    return program[0];
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };