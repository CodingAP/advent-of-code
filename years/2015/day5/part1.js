module.exports = input => {
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