const part1 = async input => {
    for (let i = 4; i < input.length; i++) {
        if (new Set(input.slice(i - 4, i).split('')).size == 4) return i;
    }
    return 0;
}

const part2 = async input => {
    for (let i = 14; i < input.length; i++) {
        if (new Set(input.slice(i - 14, i).split('')).size == 14) return i;
    }
}

export { part1, part2 };