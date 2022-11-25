const part1 = async input => {
    let passwords = input.split('\n').map(element => {
        let [left, string] = element.split(': ');
        let [range, character] = left.split(' ');
        let [min, max] = range.split('-').map(element => parseInt(element));

        return { string, character, min, max };
    });

    let valid = 0;
    passwords.forEach(password => {
        let characters = password.string.split('').reduce((acc, element) => acc + ((element == password.character) ? 1 : 0), 0);

        if (characters >= password.min && characters <= password.max) valid++;
    });
    return valid;
}

const part2 = async input => {
    let passwords = input.split('\n').map(element => {
        let [left, string] = element.split(': ');
        let [range, character] = left.split(' ');
        let [position1, position2] = range.split('-').map(element => parseInt(element) - 1);

        return { string, character, position1, position2 };
    });

    let valid = 0;
    passwords.forEach(password => {
        if ((password.string[password.position1] == password.character && password.string[password.position2] != password.character) ||
            password.string[password.position2] == password.character && password.string[password.position1] != password.character) valid++;
    });
    return valid;
}

export { part1, part2 }; 