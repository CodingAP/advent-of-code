const part1 = async input => {
    return input.split('\n').reduce((acc, line) => {
        let [id, checksum] = line.split(/[\[\]]/g);

        let idStrings = id.split('-');
        let num = parseInt(idStrings[idStrings.length - 1]);
        let letters = idStrings.slice(0, idStrings.length - 1).join('');

        let frequencies = Object.entries(letters.split('').reduce((obj, letter) => {
            if (obj[letter] == null) obj[letter] = 0;
            obj[letter]++;
            return obj;
        }, {})).sort((a, b) => {
            if (a[1] == b[1]) return a[0].localeCompare(b[0]);
            return b[1] - a[1];
        });

        if (checksum == frequencies.slice(0, 5).reduce((string, frequency) => string += frequency[0], '')) acc += num;
        return acc;
    }, 0);
}

const part2 = async input => {
    let rooms = input.split('\n').map(line => {
        let [id, checksum] = line.split(/[\[\]]/g);

        let idStrings = id.split('-');
        let num = parseInt(idStrings[idStrings.length - 1]);
        let letters = idStrings.slice(0, idStrings.length - 1).join('');

        let frequencies = Object.entries(letters.split('').reduce((obj, letter) => {
            if (obj[letter] == null) obj[letter] = 0;
            obj[letter]++;
            return obj;
        }, {})).sort((a, b) => {
            if (a[1] == b[1]) return a[0].localeCompare(b[0]);
            return b[1] - a[1];
        });

        if (checksum == frequencies.slice(0, 5).reduce((string, frequency) => string += frequency[0], '')) {
            let phrase = idStrings.slice(0, idStrings.length - 1).join(' ').split('');
            for (let i = 0; i < phrase.length; i++) {
                if (phrase[i] == ' ') continue;

                phrase[i] = String.fromCharCode((((phrase[i].charCodeAt(0) - 'a'.charCodeAt(0)) + num) % 26) + 'a'.charCodeAt(0));
            }
            return { phrase: phrase.join(''), id: num };
        } else {
            return { phrase: 'decoy' };
        }
    });

    return rooms.find(room => room.phrase.includes('north')).id;
}

export { part1, part2 };