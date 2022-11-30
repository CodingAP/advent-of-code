const part1 = async input => {
    let niceStrings = 0;
    const strings = input.split('\n');

    strings.forEach(element => {
        if (element.match(/ab|cd|pq|xy/g)) return;

        let double = false;
        let vowels = 0;
        for (let i = 0; i < element.length; i++) {
            if (element[i].match(/[aeiou]/g)) vowels++;
            if (i != element.length - 1 && element[i] == element[i + 1]) double = true;
        }

        if (double && vowels >= 3) niceStrings++;
    });
    return niceStrings;
}

const part2 = async input => {
    let niceStrings = 0;
    const strings = input.split('\n');

    strings.forEach(element => {
        let pairs = {};
        let xyxRule = false;

        for (let i = 0; i < element.length; i++) {
            if (pairs[element[i] + element[i + 1]] == null) pairs[element[i] + element[i + 1]] = 0;
            pairs[element[i] + element[i + 1]]++;
            if (element[i] == element[i + 1] && element[i] == element[i - 1]) pairs[element[i] + element[i + 1]]--;
            
            if (element[i - 1] == element[i + 1]) xyxRule = true;
        }

        if (xyxRule && Object.values(pairs).filter(element => element >= 2).length > 0) niceStrings++;
    });
    return niceStrings;
}

export { part1, part2 }; 