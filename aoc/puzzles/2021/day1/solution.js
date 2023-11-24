const common = { parseListToInt: (input, splitter) => input.split(splitter).map(element => parseInt(element)) };

const part1 = async input => {
    let count = 0;
    let numbers = common.parseListToInt(input, '\n');
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > numbers[i - 1]) count++;
    }
    return count;
}

const part2 = async input => {
    let count = 0;
    let numbers = common.parseListToInt(input, '\n');
    let last = numbers[0] + numbers[1] + numbers[2];
    for (let i = 1; i < numbers.length - 1; i++) {
        let next = numbers[i - 1] + numbers[i] + numbers[i + 1];
        if (next > last) count++;
        last = next;
    }
    return count;
}

export { part1, part2 };