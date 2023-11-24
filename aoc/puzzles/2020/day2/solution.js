const part1 = async input => {
    let passwords = input.split('\n');
    let valid = 0;

    for (let i = 0; i < passwords.length; i++) {
        let tokens = passwords[i].split(' ');
        let min = parseInt(tokens[0].split('-')[0]);
        let max = parseInt(tokens[0].split('-')[1]);
        let count = 0;
        let letter = tokens[1].replace(':', '');
        let password = tokens[2];
        for (let j = 0; j < password.length; j++) {
            if (password.charAt(j) == letter) count++;
        }

        if (count >= min && count <= max) valid++;
    }

    return valid;
}

const part2 = async input => {
    let passwords = input.split('\n');
    let valid = 0;

    for (let i = 0; i < passwords.length; i++) {
        let tokens = passwords[i].split(' ');
        let firstIndex = parseInt(tokens[0].split('-')[0]);
        let lastIndex = parseInt(tokens[0].split('-')[1]);
        let letter = tokens[1].replace(':', '');
        let password = tokens[2];

        if (((password.charAt(firstIndex - 1) == letter) & 0x1) ^ ((password.charAt(lastIndex - 1) == letter) & 0x1)) valid++;
    }

    return valid;
}

export { part1, part2 };