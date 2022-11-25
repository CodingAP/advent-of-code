const part1 = async input => {
    const strings = input.split('\n');

    let stringLength = 0;
    let byteLength = 0;
    strings.forEach(string => {
        byteLength += string.length;

        for (let i = 1; i < string.length - 1; i++) {
            if (string[i] == '\\') {
                if (string[i + 1] == '"' || string[i + 1] == '\\') i++;
                else if (string[i + 1] == 'x') i += 3;
            }
            stringLength++;
        }
    });

    return byteLength - stringLength;
}

const part2 = async input => {
    const strings = input.split('\n');

    let stringLength = 0;
    let byteLength = 0;
    strings.forEach(string => {
        byteLength += string.length;

        for (let i = 0; i < string.length; i++) {
            if (string[i] == '"' || string[i] == '\\') stringLength++;
            stringLength++;
        }
        stringLength += 2;
    });

    return stringLength - byteLength;
}

export { part1, part2 }; 