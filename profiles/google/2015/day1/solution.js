const part1 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        floor += (input[i] == '(') ? 1 : -1;
    }
    return floor;
}

const part2 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        floor += (input[i] == '(') ? 1 : -1;
        if (floor < 0) return i + 1;
    }
    return floor;
}

export { part1, part2 }; 