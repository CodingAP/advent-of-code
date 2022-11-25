const part1 = async input => {
    let depths = input.split('\n').map(number => parseInt(number));

    let increases = 0;
    for (let i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i - 1]) increases++;
    }
    return increases;
}

const part2 = async input => {
    let depths = input.split('\n').map(number => parseInt(number));

    let increases = 0;
    for (let i = 1; i < depths.length - 2; i++) {
        let sumA = depths[i - 1] + depths[i] + depths[i + 1];
        let sumB = depths[i] + depths[i + 1] + depths[i + 2];
        if (sumB > sumA) increases++;
    }
    return increases;
}

export { part1, part2 }; 