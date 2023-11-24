const part1 = async input => {
    let calories = input.split('\n\n').reduce((max, element) => {
        let allCalories = element.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
        return Math.max(max, allCalories);
    }, -Infinity);
    return calories;
}

const part2 = async input => {
    let allElves = input.split('\n\n').map(element => {
        return element.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
    }).sort((a, b) => b - a);

    return allElves[0] + allElves[1] + allElves[2];
}

export { part1, part2 };