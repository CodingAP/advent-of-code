import { IntcodeComputer } from '../../../../scripts/intcode.js';
import { permutation } from '../../../../scripts/common.js'; 

const part1 = async input => {
    let program = input.split(',').map(num => parseInt(num));
    return permutation([0, 1, 2, 3, 4]).reduce((highest, settings) => {
        let output = 0;
        for (let i = 0; i < settings.length; i++) {
            let computer = new IntcodeComputer([...program]);
            computer.inputs = [settings[i], output];
            computer.run();
            output = computer.outputs[0];
        }
        return Math.max(highest, output);
    }, -Infinity);
}

const part2 = async input => {
    let program = input.split(',').map(num => parseInt(num));
    return permutation([5, 6, 7, 8, 9]).reduce((highest, settings) => {
        let computers = new Array(5).fill(0).map((element, index) => {
            let computer = new IntcodeComputer([...program]);
            computer.inputs = [settings[index]];
            computer.runInstruction();
            return computer;
        });

        let currentComputer = 0;
        computers[currentComputer].inputs.push(0);
        while (!computers.reduce((allHalted, computer) => (!computer.halted) ? false : allHalted, true)) {
            while (computers[currentComputer].outputs.length == 0 && !computers[currentComputer].halted) computers[currentComputer].runInstruction();

            if (computers[currentComputer].outputs.length > 0) {
                computers[(currentComputer + 1) % computers.length].inputs.push(computers[currentComputer].outputs[0]);
                computers[currentComputer].outputs = [];
            }

            currentComputer = (currentComputer + 1) % computers.length;
        }
        return Math.max(highest, computers[0].inputs[0]);
    }, -Infinity);
}

export { part1, part2 };