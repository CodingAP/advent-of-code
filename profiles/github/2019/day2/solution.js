const part1 = async input => {
    let program = input.split(',').map(element => parseInt(element));
    program[1] = 12;
    program[2] = 2;

    let programCounter = 0, halted = false;
    while (!halted) {
        switch (program[programCounter]) {
            case 1:
                program[program[programCounter + 3]] = program[program[programCounter + 1]] + program[program[programCounter + 2]];
                break;
            case 2:
                program[program[programCounter + 3]] = program[program[programCounter + 1]] * program[program[programCounter + 2]];
                break;
            case 99:
                halted = true;
                break;
        }
        programCounter += 4;
    }

    return program[0];
}

const part2 = async input => {
    let program = input.split(',').map(element => parseInt(element));
    

    let runProgram = (program, noun, verb) => {
        program[1] = noun;
        program[2] = verb;

        let programCounter = 0, halted = false;
        while (!halted) {
            switch (program[programCounter]) {
                case 1:
                    program[program[programCounter + 3]] = program[program[programCounter + 1]] + program[program[programCounter + 2]];
                    break;
                case 2:
                    program[program[programCounter + 3]] = program[program[programCounter + 1]] * program[program[programCounter + 2]];
                    break;
                case 99:
                    halted = true;
                    break;
            }
            programCounter += 4;
        }

        return program[0];
    }

    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let output = runProgram([...program], noun, verb);
            if (output == 19690720) return noun * 100 + verb;
        }
    }

    return 'could not find noun/verb for this program';
}

export { part1, part2 };