const part1 = async input => {
    // ADDED TO FIX
    let inputBytes = new TextEncoder().encode(input);

    let code = 0, length = 0;

    let bytes = [];
    for (let i = 0; i < inputBytes.length; i++) {
        if (i == inputBytes.length - 1) {
            bytes.push(inputBytes[i]);
            code += bytes.length;
            bytes = [];
        } else {
            if (inputBytes[i] != ('\n').charCodeAt(0)) {
                bytes.push(inputBytes[i]);
            } else {
                code += bytes.length;
                bytes = [];
            }
        }
    }

    let split = input.split('\n');
    for (let i = 0; i < split.length; i++) {
        let actualString = '';
        for (let j = 0; j < split[i].length; j++) {
            if (split[i].charAt(j) == '\\') {
                if (split[i].charAt(j + 1) == '"') {
                    actualString += '"';
                    j++;
                } else if (split[i].charAt(j + 1) == '\\') {
                    actualString += '\\';
                    j++;
                } else if (split[i].charAt(j + 1) == 'x') {
                    actualString += String.fromCharCode(parseInt(split[i].charAt(j + 2) + split[i].charAt(j + 3), 16));
                    j += 3;
                }
            } else {
                actualString += split[i].charAt(j);
            }
        }
        length += actualString.length - 2;
    }
    return code - length;
}

const part2 = async input => {
    // ADDED TO FIX
    let inputBytes = new TextEncoder().encode(input);

    let code = 0, length = 0;

    let bytes = [];
    for (let i = 0; i < inputBytes.length; i++) {
        if (i == inputBytes.length - 1) {
            bytes.push(inputBytes[i]);
            code += bytes.length;
            bytes = [];
        } else {
            if (inputBytes[i] != ('\n').charCodeAt(0)) {
                bytes.push(inputBytes[i]);
            } else {
                code += bytes.length;
                bytes = [];
            }
        }
    }

    let split = input.split('\n');
    for (let i = 0; i < split.length; i++) {
        let extendedString = '';
        for (let j = 0; j < split[i].length; j++) {
            if (split[i].charAt(j) == '\\') {
                extendedString += '\\\\';
            } else if (split[i].charAt(j) == '"') {
                extendedString += '\\"';
            } else {
                extendedString += split[i].charAt(j);
            }
        }
        length += extendedString.length + 2;
    }
    return length - code;
}

export { part1, part2 };