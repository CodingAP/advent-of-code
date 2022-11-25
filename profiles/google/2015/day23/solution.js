const part1 = async input => {
    const instructions = input.split('\n');
    let registers = { a: 0, b: 0 };

    let programCounter = 0;
    while (programCounter >= 0 && programCounter < instructions.length) {
        let tokens = instructions[programCounter].replace(',', '').split(' ');
        switch (tokens[0]) {
            case 'hlf':
                registers[tokens[1]] = Math.floor(registers[tokens[1]] / 2);
                programCounter++;
                break;
            case 'tpl':
                registers[tokens[1]] *= 3;
                programCounter++;
                break;
            case 'inc':
                registers[tokens[1]]++;
                programCounter++;
                break;
            case 'jmp':
                programCounter += parseInt(tokens[1]);
                break;
            case 'jie':
                programCounter += (registers[tokens[1]] % 2 == 0) ? parseInt(tokens[2]) : 1;
                break;
            case 'jio':
                programCounter += (registers[tokens[1]] == 1) ? parseInt(tokens[2]) : 1;
                break;
        }
    }

    return registers.b;
}

const part2 = async input => {
    const instructions = input.split('\n');
    let registers = { a: 1, b: 0 };

    let programCounter = 0;
    while (programCounter >= 0 && programCounter < instructions.length) {
        let tokens = instructions[programCounter].replace(',', '').split(' ');
        switch (tokens[0]) {
            case 'hlf':
                registers[tokens[1]] = Math.floor(registers[tokens[1]] / 2);
                programCounter++;
                break;
            case 'tpl':
                registers[tokens[1]] *= 3;
                programCounter++;
                break;
            case 'inc':
                registers[tokens[1]]++;
                programCounter++;
                break;
            case 'jmp':
                programCounter += parseInt(tokens[1]);
                break;
            case 'jie':
                programCounter += (registers[tokens[1]] % 2 == 0) ? parseInt(tokens[2]) : 1;
                break;
            case 'jio':
                programCounter += (registers[tokens[1]] == 1) ? parseInt(tokens[2]) : 1;
                break;
        }
    }

    return registers.b;
}

export { part1, part2 }; 