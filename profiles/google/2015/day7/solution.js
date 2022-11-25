const part1 = async input => {
    let instructions = input.split('\n').map(element => {
        let [left, right] = element.split(' -> ');
        let tokens = left.split(' ');

        let op = '', args = [];
        if (tokens.length == 1) {
            op = 'SET';
            args = [tokens[0]];
        } else if (tokens.length == 2) {
            op = tokens[0];
            args = [tokens[1]];
        } else {
            op = tokens[1];
            args = [tokens[0], tokens[2]];
        }

        return { op, args, output: right };
    });

    let wires = {};
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let success = true;
            let instruction = instructions[i]; 
            let modified = instruction.args.map(element => {
                if (isNaN(parseInt(element))) {
                    if (wires[element] != null) return wires[element];
                    else success = false;
                } else {
                    return parseInt(element);
                }
            });
            if (!success) continue;

            let result;
            switch (instruction.op) {
                case 'SET':
                    result = modified[0];
                    break;
                case 'AND':                    
                    result = modified[0] & modified[1];
                    break;
                case 'OR':
                    result = modified[0] | modified[1];
                    break;
                case 'NOT':
                    result = ~modified[0] & 0xffff;
                    break;
                case 'LSHIFT':
                    result = (modified[0] << modified[1]) & 0xffff;
                    break;
                case 'RSHIFT':
                    result = (modified[0] >> modified[1]) & 0xffff;
                    break;
            }
            wires[instruction.output] = result;
            instructions.splice(i, 1);
        }
    }
    return wires.a;
}

const part2 = async input => {
    let instructions = input.split('\n').map(element => {
        let [left, right] = element.split(' -> ');
        let tokens = left.split(' ');

        let op = '', args = [];
        if (tokens.length == 1) {
            op = 'SET';
            args = [tokens[0]];
        } else if (tokens.length == 2) {
            op = tokens[0];
            args = [tokens[1]];
        } else {
            op = tokens[1];
            args = [tokens[0], tokens[2]];
        }

        return { op, args, output: right };
    });
    instructions[334] = { op: 'SET', args: ['46065'], output: 'b' };

    let wires = {};
    while (instructions.length > 0) {
        for (let i = instructions.length - 1; i >= 0; i--) {
            let success = true;
            let instruction = instructions[i];
            let modified = instruction.args.map(element => {
                if (isNaN(parseInt(element))) {
                    if (wires[element] != null) return wires[element];
                    else success = false;
                } else {
                    return parseInt(element);
                }
            });
            if (!success) continue;

            let result;
            switch (instruction.op) {
                case 'SET':
                    result = modified[0];
                    break;
                case 'AND':
                    result = modified[0] & modified[1];
                    break;
                case 'OR':
                    result = modified[0] | modified[1];
                    break;
                case 'NOT':
                    result = ~modified[0] & 0xffff;
                    break;
                case 'LSHIFT':
                    result = (modified[0] << modified[1]) & 0xffff;
                    break;
                case 'RSHIFT':
                    result = (modified[0] >> modified[1]) & 0xffff;
                    break;
            }
            wires[instruction.output] = result;
            instructions.splice(i, 1);
        }
    }
    return wires.a;
}

export { part1, part2 }; 