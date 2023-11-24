const part1 = async input => {
    return input.split('\n').reduce((acc, element) => {
        let firstHalf = element.slice(0, element.length / 2).split('');
        let secondHalf = element.slice(element.length / 2).split('');

        let common = [...new Set(firstHalf.filter(letter => secondHalf.includes(letter)))];
        acc += common.reduce((priority, letter) => {
            if (letter.toUpperCase() == letter) priority += 26;
            priority += letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            return priority;
        }, 0);
        return acc;
    }, 0);
}

const part2 = async input => {
    let lines = input.split('\n');
    let score = 0;
    for (let i = 0; i < lines.length; i += 3) {
        let firstString = lines[i].split('');
        let secondString = lines[i + 1].split('');
        let thirdString = lines[i + 2].split('');

        let common = [...new Set(firstString.filter(letter => secondString.includes(letter) && thirdString.includes(letter)))];
        score += common.reduce((acc, letter) => {
            if (letter.toUpperCase() == letter) acc += 26;
            acc += letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            return acc;
        }, 0);
    } 

    return score;
}

export { part1, part2 };