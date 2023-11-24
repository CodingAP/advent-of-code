const part1 = async input => {
    let vowelRegex = /[aeiou]/g;
    let disallowedRegex = /ab|cd|pq|xy/g;

    let niceStrings = 0;
    let strings = input.split('\n');
    for (let i = 0; i < strings.length; i++) {
        let vowels = 0, double = false;
        if (strings[i].match(disallowedRegex)) continue;
        for (let j = 0; j < strings[i].length; j++) {
            let current = strings[i].charAt(j);
            let next = strings[i].charAt(j + 1) || '';
            if (current == next) double = true;
            if (current.match(vowelRegex)) vowels++;
        }
        if (vowels >= 3 && double) niceStrings++;
    }
    return niceStrings;
}

const part2 = async input => {
    let niceStrings = 0;
    let strings = input.split('\n');
    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let mirrorLetters = false, twoPair = false, currentPairs = {};
        for (let j = 0; j < string.length; j++) {
            let next = string.charAt(j + 1) || '';
            let current = string.charAt(j);
            let last = string.charAt(j - 1) || '';
            if (next == last) mirrorLetters = true;
            if (!(last == current && current == next) && (last + current).length == 2) {
                let pair = last + current;
                if (currentPairs[pair] == null) currentPairs[pair] = 0;
                currentPairs[pair]++;
                if (currentPairs[pair] >= 2) twoPair = true;
            }
        }
        if (mirrorLetters && twoPair) niceStrings++;
    }
    return niceStrings;
}

export { part1, part2 };