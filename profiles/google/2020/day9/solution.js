const part1 = async input => {
    const numbers = input.split('\n').map(element => parseInt(element));
    let current = 25;
    while (current < numbers.length) {
        let needed = numbers[current];
        let preamble = numbers.slice(current - 25, current);

        let hasSum = false;
        for (let i = 0; i < preamble.length; i++) {
            if (preamble.includes(needed - preamble[i])) hasSum = true;
        }
        if (!hasSum) return numbers[current];
        current++;
    }
}

const part2 = async input => {
    const numbers = input.split('\n').map(element => parseInt(element));
    let needed = await part1(input);

    for (let size = 2; size < numbers.length; size++) {
        for (let i = 0; i < numbers.length - size; i++) {
            let array = numbers.slice(i, i + size).sort((a, b) => a - b);
            if (array.reduce((acc, num) => acc + num, 0) == needed) return array[0] + array[array.length - 1];
        }
    }
}

export { part1, part2 };