import crypto from 'crypto';

const part1 = async input => {
    let keys = [];
    let previousHashes = [];

    let getHash = (index) => {
        if (previousHashes[index]) return previousHashes[index];
        previousHashes[index] = crypto.createHash('md5').update(input + index).digest('hex');
        return previousHashes[index];
    }

    let find5Digits = (starting, digit) => {
        let findThis = digit.padStart(5, digit);

        for (let i = 1; i <= 1000; i++) {
            let hash = getHash(starting + i);
            if (hash.search(findThis) != -1) return true;
        }

        return false;
    }

    let index = 0;
    while (true) {
        let hash = getHash(index);
        let stringIndex = hash.search(/(.)\1\1/);
        if (stringIndex != -1 && find5Digits(index, hash.charAt(stringIndex))) keys.push(index);

        if (keys.length == 64) break;
        index++;
    }

    return keys[keys.length - 1];
}

const part2 = async input => {
    let keys = [];
    let previousHashes = [];

    let getHash = index => {
        if (previousHashes[index]) return previousHashes[index];
        let firstHash = crypto.createHash('md5').update(input + index).digest('hex');
        for (let i = 0; i < 2016; i++) firstHash = crypto.createHash('md5').update(firstHash).digest('hex');
        previousHashes[index] = firstHash;
        return previousHashes[index];
    }

    let find5Digits = (starting, digit) => {
        let findThis = digit.padStart(5, digit);

        for (let i = 1; i <= 1000; i++) {
            let hash = getHash(starting + i);
            if (hash.search(findThis) != -1) return true;
        }

        return false;
    }

    let index = 0;
    while (true) {
        let hash = getHash(index);
        let stringIndex = hash.search(/(.)\1\1/);
        if (stringIndex != -1 && find5Digits(index, hash.charAt(stringIndex))) keys.push(index);

        if (keys.length == 64) break;
        index++;
    }

    return keys[keys.length - 1];
}

export { part1, part2 };