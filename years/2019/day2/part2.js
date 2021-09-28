const common = require('../../../scripts/common');

module.exports = input => {
    let executeProgram = program => {
        let changedProgram = [...program];
        let programCounter = 0;

        while (true) {
            let op = changedProgram[programCounter];
            if (op == 1) {
                changedProgram[changedProgram[programCounter + 3]] = changedProgram[changedProgram[programCounter + 1]] + changedProgram[changedProgram[programCounter + 2]];
            } else if (op == 2) {
                changedProgram[changedProgram[programCounter + 3]] = changedProgram[changedProgram[programCounter + 1]] * changedProgram[changedProgram[programCounter + 2]];
            } else if (op == 99) {
                break;
            }
            programCounter += 4;
        }

        return changedProgram;
    }

    let program = common.parseListToInt(input, ',');

    for (let n = 0; n < 100; n++) {
        for (let v = 0; v < 100; v++) {
            let newProgram = [...program];
            newProgram[1] = n;
            newProgram[2] = v;
            if (executeProgram(newProgram)[0] == 19690720) return 100 * n + v;
        }
    }
}