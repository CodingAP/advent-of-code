const input = require('fs').readFileSync('./years/2015/day7/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
    let wires = {};
    let instructions = input.split(/\r\n/);
    
    while (true) {
        let finished = true;
        instructions.forEach((value, i) => {
            if (value == '') return;
            let tokens = value.split(' ');
            if (tokens.length == 3) {
                if (tokens[0].match(/[a-z]/)) {
                    if (wires[tokens[0]] == null) {
                        finished = false;
                        return;
                    } else {
                        wires[tokens[2]] = wires[tokens[0]];
                    }
                } else {
                    wires[tokens[2]] = parseInt(tokens[0]);
                }
            } else if (tokens.length == 4) {
                if (wires[tokens[1]] == null) {
                    finished = false;
                    return;
                } else {
                    wires[tokens[3]] = ~wires[tokens[1]] & 0xffff;
                }
            } else if (tokens.length == 5) {
                let value1 = null, value2 = null;
                if (tokens[0].match(/[a-z]/)) {
                    if (wires[tokens[0]] == null) {
                        finished = false;
                        return;
                    } else {
                        value1 = wires[tokens[0]];
                    }
                } else {
                    value1 = parseInt(tokens[0]);
                }
                
                if (tokens[2].match(/[a-z]/)) {
                    if (wires[tokens[2]] == null) {
                        finished = false;
                        return;
                    } else {
                        value2 = wires[tokens[2]];
                    }
                } else {
                    value2 = parseInt(tokens[2]);
                }
                
                if (tokens[1] == 'AND') {
                    wires[tokens[4]] = (value1 & value2) & 0xffff;
                } else if (tokens[1] == 'OR') {
                    wires[tokens[4]] = (value1 | value2) & 0xffff;
                } else if (tokens[1] == 'LSHIFT') {
                    wires[tokens[4]] = (value1 << value2) & 0xffff;
                } else if (tokens[1] == 'RSHIFT') {
                    wires[tokens[4]] = (value1 >> value2) & 0xffff;
                }
            }
            instructions[i] = '';
        });
        if (finished) break;
    }
    
    return wires.a;
}