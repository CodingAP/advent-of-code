import { IntcodeComputer } from '../../../../scripts/intcode.js';

const part1 = async input => {
    let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
    computer.program[1] = 12;
    computer.program[2] = 2;
    computer.run();

    return computer.program[0];
}

const part2 = async input => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let computer = new IntcodeComputer(input.split(',').map(num => parseInt(num)));
            computer.program[1] = noun;
            computer.program[2] = verb;
            computer.run();

            if (computer.program[0] == 19690720) return noun * 100 + verb;
        }
    }

    return 'could not find noun/verb for this program';
}

export { part1, part2 };