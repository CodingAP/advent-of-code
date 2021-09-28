module.exports = input => {
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