const part1 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
    }
    return floor;
}

const part2 = async input => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == '(') floor++;
        if (input.charAt(i) == ')') floor--;
        if (floor < 0) return i + 1;
    }
    return -1;
}

export { part1, part2 };