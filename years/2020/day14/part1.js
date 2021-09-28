const common = require('../../../scripts/common');

module.exports = input => {
    let instructions = input.split('\n');
    let memory = [];

    let mask = 0;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].startsWith('mask')) {
            mask = instructions[i].split('=')[1];
        } else {
            let address = parseInt(instructions[i].split(/[\[\]]/)[1]);
            let value = parseInt(instructions[i].split('=')[1]);

            let stringValue = value.toString(2).padStart(36, '0');

            for (let j = 0; j < stringValue.length; j++) {
                if (mask.charAt(j) != 'X') {
                    stringValue = stringValue.slice(0, j) + mask.charAt(j) + stringValue.slice(j + 1);
                }
            }

            memory[address] = parseInt(stringValue, 2);
        }
    }

    for (let i = 0; i < memory.length; i++) {
        if (!memory[i]) memory[i] = 0;
    }

    return common.addAll(memory);
}