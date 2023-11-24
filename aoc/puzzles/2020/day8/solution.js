const part1 = async input => {
    let previousPosition = [];
    let accumulator = 0, programCounter = 0;
    let program = input.split('\n');

    while (true) {
        let tokens = program[programCounter].split(' ');
        if (tokens[0] == 'acc') {
            accumulator += parseInt(tokens[1]);
            programCounter++;
        } else if (tokens[0] == 'jmp') {
            programCounter += parseInt(tokens[1]);
        } else if (tokens[0] == 'nop') {
            programCounter++;
        }

        if (previousPosition.includes(programCounter)) {
            break;
        } else {
            previousPosition.push(programCounter);
        }
    }

    return accumulator;
}

const part2 = async input => {
    let executeProgram = (program) => {
        let accumulator = 0, programCounter = 0;
        let tries = 0, limit = 500;

        while (true) {
            let tokens = program[programCounter].split(' ');
            if (tokens[0] == 'acc') {
                accumulator += parseInt(tokens[1]);
                programCounter++;
            } else if (tokens[0] == 'jmp') {
                programCounter += parseInt(tokens[1]);
            } else if (tokens[0] == 'nop') {
                programCounter++;
            }

            if (programCounter == program.length) break;
            tries++;
            if (tries == limit) return null;
        }

        return accumulator;
    }

    let program = input.split('\n');

    for (let i = 0; i < program.length; i++) {
        let tokens = program[i].split(' ');
        if (tokens[0] == 'jmp') {
            let newProgram = [...program];
            newProgram[i] = 'nop ' + tokens[1];
            let result = executeProgram(newProgram);
            if (result != null) return result;
        } else if (tokens[0] == 'nop') {
            let newProgram = [...program];
            newProgram[i] = 'jmp ' + tokens[1];
            let result = executeProgram(newProgram);
            if (result != null) return result;
        }
    }
}

export { part1, part2 };