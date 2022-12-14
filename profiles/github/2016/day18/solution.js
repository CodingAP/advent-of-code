const part1 = async input => {
    let total = input.split('').filter(element => element == '.').length;
    let line = input;
    let isTrap = ['^^.', '.^^', '^..', '..^'];

    for (let row = 0; row < (40 - 1); row++) {
        let newRow = '';
        for (let i = 0; i < line.length; i++) {
            let trap = (line[i - 1] || '.') + line[i] + (line[i + 1] || '.');
            newRow += (isTrap.includes(trap)) ? '^' : '.';
        }
        line = newRow;
        total += line.split('').filter(element => element == '.').length;
    }
    return total;
}

const part2 = async input => {
    let total = input.split('').filter(element => element == '.').length;
    let line = input;
    let isTrap = ['^^.', '.^^', '^..', '..^'];

    for (let row = 0; row < (400000 - 1); row++) {
        let newRow = '';
        for (let i = 0; i < line.length; i++) {
            let trap = (line[i - 1] || '.') + line[i] + (line[i + 1] || '.');
            newRow += (isTrap.includes(trap)) ? '^' : '.';
        }
        line = newRow;
        total += line.split('').filter(element => element == '.').length;
    }
    return total;
}

export { part1, part2 };