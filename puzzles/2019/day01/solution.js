const part1 = async input => {
    return input.split('\n').reduce((acc, element) => acc + (Math.floor(parseInt(element) / 3) - 2), 0);
}

const part2 = async input => {
    return input.split('\n').reduce((acc, element) => {
        let fuel = 0, mass = parseInt(element);
        while (mass > 0) {
            mass = Math.max(Math.floor(mass / 3) - 2, 0);
            fuel += mass;
        }
        return acc + fuel;
    }, 0);
}

export { part1, part2 };