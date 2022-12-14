let opcodes = {
    cpy: (cpu, args) => {
        let arg0;
        if (args[0].match(/[abcd]/g)) arg0 = cpu.registers[args[0]];
        else arg0 = parseInt(args[0]);

        cpu.registers[args[1]] = arg0;
        cpu.programCounter++;
    },
    inc: (cpu, args) => {
        cpu.registers[args[0]]++;
        cpu.programCounter++;
    },
    dec: (cpu, args) => {
        cpu.registers[args[0]]--;
        cpu.programCounter++;
    },
    jnz: (cpu, args) => {
        let arg0, arg1;
        if (args[0].match(/[abcd]/g)) arg0 = cpu.registers[args[0]];
        else arg0 = parseInt(args[0]);

        if (args[1].match(/[abcd]/g)) arg1 = cpu.registers[args[1]];
        else arg1 = parseInt(args[1]);

        if (arg0 != 0) cpu.programCounter += arg1;
        else cpu.programCounter++;
    },
    out: (cpu, args) => {
        let arg0;
        if (args[0].match(/[abcd]/g)) arg0 = cpu.registers[args[0]];
        else arg0 = parseInt(args[0]);

        cpu.output.push(arg0);
        cpu.programCounter++;
    }
}

const part1 = async input => {
    let runAssembunny = value => {
        let cpu = {
            registers: { a: value, b: 0, c: 0, d: 0 },
            program: input.split('\n').map(line => {
                let tokens = line.split(' ');
                return { op: tokens[0], args: tokens.slice(1) };
            }),
            programCounter: 0,
            output: []
        };

        while (cpu.output.length < 10) {
            let instruction = cpu.program[cpu.programCounter];
            opcodes[instruction.op](cpu, instruction.args);
        }

        return cpu.output;
    }

    let i = 0;
    while (true) {
        let output = runAssembunny(i), valid = true;
        for (let i = 0; i < output.length; i++) if (i % 2 != output[i]) valid = false;
        if (valid) break;
        i++;
    }

    return i;
}

const part2 = async input => {
    return '2016 DONE!';
}

export { part1, part2 };