const common = require('../../../scripts/common');

let opcodes = {};

opcodes[1] = args => {
    return {
        disassemble: `ADD ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[1].type == 0 ? '$' : '#'}${args[1].value} $${args[2].value}`,
        offset: 4
    };
};

opcodes[2] = args => {
    return {
        disassemble: `MULT ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[1].type == 0 ? '$' : '#'}${args[1].value} $${args[2].value}`,
        offset: 4
    };
};

opcodes[3] = args => {
    return {
        disassemble: `IN $${args[0].value}`,
        offset: 2
    };
};

opcodes[4] = args => {
    return {
        disassemble: `OUT ${args[0].type == 0 ? '$' : '#'}${args[0].value}`,
        offset: 2
    };
};

opcodes[5] = args => {
    return {
        disassemble: `JPT ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[0].type == 0 ? '$' : '#'}${args[1].value}`,
        offset: 3
    };
};

opcodes[6] = args => {
    return {
        disassemble: `JPF ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[0].type == 0 ? '$' : '#'}${args[1].value}`,
        offset: 3
    };
};

opcodes[7] = args => {
    return {
        disassemble: `LES ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[1].type == 0 ? '$' : '#'}${args[1].value} $${args[2].value}`,
        offset: 4
    };
};

opcodes[8] = args => {
    return {
        disassemble: `EQL ${args[0].type == 0 ? '$' : '#'}${args[0].value} ${args[1].type == 0 ? '$' : '#'}${args[1].value} $${args[2].value}`,
        offset: 4
    };
};

opcodes[99] = args => {
    return {
        disassemble: `HALT`,
        offset: 1
    };
};

let intcode = common.parseListToInt(common.readInput(7, 2019), ',');
console.log(intcode);
let index = 0;
while (index < intcode.length) {
    let args = [];

    let opcode = intcode[index];
    for (let i = 0; i < 3; i++) {
        let parameterMode = Math.floor(opcode / Math.pow(10, i + 2)) % 10;
        args.push({
            value: intcode[index + i + 1],
            type: parameterMode
        });
    }

    if (opcodes[opcode % 100]) {
        let result = opcodes[opcode % 100](args);
        console.log(index + ': ' + result.disassemble);
        index += result.offset;
    } else {
        index++;
    }
}