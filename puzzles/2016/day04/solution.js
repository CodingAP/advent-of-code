/**
 * aoc/puzzles/2016/day04/solution.js
 * 
 * ~~ Security Through Obscurity ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/6/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.replace(/\r/g, '').split('\n').reduce((sum, line) => {
        // parse all parts of line
        const [name, checksum] = line.replace(/\]/g, '').split('[');
        const tokens = name.split('-');
        const sectorID = tokens.pop();

        // get character count from tokens
        const characters = tokens.join('').split('').reduce((obj, ch) => {
            if (obj[ch] == null) obj[ch] = 0;
            obj[ch]++;
            return obj;
        }, {});

        // get most common 5 letters in alphabet order
        const neededChecksum = Object.keys(characters).sort((a, b) => {
            if (characters[b] == characters[a]) return a.charCodeAt(0) - b.charCodeAt(0);
            return characters[b] - characters[a];
        }).slice(0, 5).join('');

        // add only if checksums match
        return sum + ((checksum == neededChecksum) ? parseInt(sectorID) : 0);
    }, 0);
}

/**
 * decrypts a shift cipher
 * 
 * @param {string} word string to decrypt
 * @param {number} shift amount to shift
 */
const decrypt = (word, shift) => {
    let newWord = '';
    for (let i = 0; i < word.length; i++) {
        newWord += String.fromCharCode((((word.charCodeAt(i) - 'a'.charCodeAt(0)) + shift) % 26) + 'a'.charCodeAt(0));
    }
    return newWord;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const lines = input.replace(/\r/g, '').split('\n')
    
    for (let line of lines) {
        // parse all parts of line
        const [name, checksum] = line.replace(/\]/g, '').split('[');
        const tokens = name.split('-');
        const sectorID = tokens.pop();

        // get character count from tokens
        const characters = tokens.join('').split('').reduce((obj, ch) => {
            if (obj[ch] == null) obj[ch] = 0;
            obj[ch]++;
            return obj;
        }, {});

        // get most common 5 letters in alphabet order
        const neededChecksum = Object.keys(characters).sort((a, b) => {
            if (characters[b] == characters[a]) return a.charCodeAt(0) - b.charCodeAt(0);
            return characters[b] - characters[a];
        }).slice(0, 5).join('');

        // decrypt if checksums match
        if (checksum == neededChecksum) {
            const phrase = tokens.map(word => decrypt(word, parseInt(sectorID)));

            // we are looking for north pole objects
            if (phrase.includes('northpole')) return sectorID;
        }
    }

    return -1;
}

export { part1, part2 };