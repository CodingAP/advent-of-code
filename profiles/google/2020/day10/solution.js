const part1 = async input => {
    let adapters = input.split('\n').map(element => parseInt(element)).sort((a, b) => a - b);
    let one = 1, three = 1;
    for (let i = 1; i < adapters.length; i++) {
        if (adapters[i] - adapters[i - 1] == 1) one++;
        else three++;
    }
    console.log(one, three);
    return one * three;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };