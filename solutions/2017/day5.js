const input = require('fs').readFileSync('inputs/2017/5.in').toString().trim();

module.exports = {
    part1: () => {
        let memory = input.split('\n').map(value => parseInt(value));
        let programCounter = 0;
        let steps = 0;

        while (true) {
            let jump = memory[programCounter];
            memory[programCounter]++;
            programCounter += jump;
            steps++;

            if (programCounter < 0 || programCounter >= memory.length) return steps;
        }
    },
    part2: () => {
        let memory = input.split('\n').map(value => parseInt(value));
        let programCounter = 0;
        let steps = 0;

        while (true) {
            let jump = memory[programCounter];
            if (jump >= 3) memory[programCounter]--;
            else memory[programCounter]++;
            programCounter += jump;
            steps++;

            if (programCounter < 0 || programCounter >= memory.length) return steps;
        }
    }
}