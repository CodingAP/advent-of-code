const part1 = async input => {
    let sum = 0;

    let dimensions = input.split('\n');
    for (let i = 0; i < dimensions.length; i++) {
        let numbers = dimensions[i].split('x');
        let length = parseInt(numbers[0]), width = parseInt(numbers[1]), height = parseInt(numbers[2]);

        let surfaceArea = (2 * length * width) + (2 * width * height) + (2 * length * height);
        let slack = Math.min(length * width, width * height, length * height);

        sum += surfaceArea + slack;
    }

    return sum;
}

const part2 = async input => {
    let sum = 0;

    let dimensions = input.split('\n');
    for (let i = 0; i < dimensions.length; i++) {
        let numbers = dimensions[i].split('x');
        let length = parseInt(numbers[0]), width = parseInt(numbers[1]), height = parseInt(numbers[2]);

        let volume = length * width * height;
        let decoration = (2 * length + 2 * width + 2 * height) - (Math.max(length, width, height) * 2);

        sum += volume + decoration;
    }

    return sum;
}

export { part1, part2 };