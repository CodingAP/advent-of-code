const part1 = async input => {
    const instructions = input.split('\n').map(element => {
        let [instruction, number] = element.split(' ');
        return { instruction, number: parseInt(number) }; 
    });

    let pastInstructions = [];
    let accumulator = 0, programCounter = 0;
    while (programCounter >= 0 && programCounter < instructions.length) {
        if (pastInstructions.includes(programCounter)) {
            return accumulator;
        } else pastInstructions.push(programCounter);

        switch (instructions[programCounter].instruction) {
            case 'acc':
                accumulator += instructions[programCounter].number;
                programCounter++;
                break;
            case 'jmp':
                programCounter += instructions[programCounter].number;
                break;
            case 'nop':
                programCounter++;
                break;
        }
    }
    return 'no overlap';
}

const part2 = async input => {
    const unalteredInstructions = input.split('\n').map(element => {
        let [instruction, number] = element.split(' ');
        return { instruction, number: parseInt(number) };
    });

    const runProgram = instructions => {
        let accumulator = 0, programCounter = 0, cycles = 0;
        while (programCounter >= 0 && programCounter < instructions.length) {
            switch (instructions[programCounter].instruction) {
                case 'acc':
                    accumulator += instructions[programCounter].number;
                    programCounter++;
                    break;
                case 'jmp':
                    programCounter += instructions[programCounter].number;
                    break;
                case 'nop':
                    programCounter++;
                    break;
            }

            if (++cycles >= 200) return null;
        }

        return accumulator;
    }

    for (let i = 0; i < unalteredInstructions.length; i++) {
        let newInstructions = JSON.parse(JSON.stringify(unalteredInstructions));

        if (newInstructions[i].instruction == 'jmp') newInstructions[i].instruction = 'nop';
        else if (newInstructions[i].instruction == 'nop') newInstructions[i].instruction = 'jmp';

        const accumulator = runProgram(newInstructions);
        if (accumulator != null) return accumulator;
    }
}

export { part1, part2 };