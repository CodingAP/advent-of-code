const part1 = async input => {
    let codes = input.split('\n');

    let word = '';
    for (let i = 0; i < codes[0].length; i++) {
        let characters = {};
        for (let j = 0; j < codes.length; j++) {
            let character = codes[j][i];
            if (characters[character] == null) characters[character] = 0;
            characters[character]++;
        }

        let entries = Object.entries(characters);
        word += entries.reduce((highest, character) => {
            if (character[1] > highest[1]) return character;
            return highest;
        }, entries[0])[0];
    }
    return word;
}

const part2 = async input => {
    let codes = input.split('\n');

    let word = '';
    for (let i = 0; i < codes[0].length; i++) {
        let characters = {};
        for (let j = 0; j < codes.length; j++) {
            let character = codes[j][i];
            if (characters[character] == null) characters[character] = 0;
            characters[character]++;
        }

        let entries = Object.entries(characters);
        word += entries.reduce((lowest, character) => {
            if (character[1] < lowest[1]) return character;
            return lowest;
        }, entries[0])[0];
    }
    return word;
}

export { part1, part2 };