const part1 = async input => {
    const dimensions = input.split('\n').map(element => element.split('x').map(number => parseInt(number)).sort((a, b) => a - b));
    let sqft = 0;
    dimensions.forEach(element => {
        sqft += (2 * element[0] * element[1]) + (2 * element[1] * element[2]) + (2 * element[0] * element[2]);
        sqft += element[0] * element[1];
    });
    return sqft;
}

const part2 = async input => {
    const dimensions = input.split('\n').map(element => element.split('x').map(number => parseInt(number)).sort((a, b) => a - b));
    let ribbon = 0;
    dimensions.forEach(element => {
        ribbon += element[0] * element[1] * element[2];
        ribbon += 2 * element[0] + 2 * element[1];
    });
    return ribbon;
}

export { part1, part2 }; 