module.exports = input => {
    let instructions = input.split('\n');
    let registers = {};
    let highest = -Infinity;
    for (let i = 0; i < instructions.length; i++) {
        let tokens = instructions[i].split(' ');
        if (!registers[tokens[0]]) registers[tokens[0]] = 0;
        if (!registers[tokens[4]]) registers[tokens[4]] = 0;
        if (eval(`${registers[tokens[4]]} ${tokens[5]} ${parseInt(tokens[6])}`)) {
            let newValue = registers[tokens[0]] + parseInt(tokens[2]) * ((tokens[1] == 'inc') ? 1 : -1);
            if (newValue > highest) highest = newValue;
            registers[tokens[0]] = newValue;
        }
    }

    return highest;
}