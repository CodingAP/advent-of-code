const part1 = async input => {
    let uncompressed = '';

    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') {
            let other = i;
            while (input.charAt(other) != ')') other++;
            let info = input.substring(i + 1, other).split('x').map(value => parseInt(value));
            let newString = '';
            for (let j = 0; j < info[1]; j++) {
                newString += input.substring(other + 1, other + info[0] + 1);
            }
            uncompressed += newString;
            i += other - i + info[0];
        } else {
            uncompressed += input.charAt(i);
        }
    }

    return uncompressed.length;
}

const part2 = async input => {
    let findCompression = string => {
        let length = 0;

        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) == '(') {
                let other = i;
                while (string.charAt(other) != ')') other++;
                let info = string.substring(i + 1, other).split('x').map(value => parseInt(value));
                let stringRange = string.substring(other + 1, other + info[0] + 1);

                length += info[1] * findCompression(stringRange);

                i += other - i + info[0];
            } else length++;
        }

        return length;
    }

    return findCompression(input);
}

export { part1, part2 };