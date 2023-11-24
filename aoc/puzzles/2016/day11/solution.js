const part1 = async input => {
    let items = input.split('\n').reduce((array, line) => {
        let items = line.split('contains ')[1].replace(/a /g, '').split(/ and |, /);
        if (items[0].includes('nothing')) items = [];
        array.push(items.length);
        return array;
    }, []);

    let steps = 0;
    for (let i = 0; i < items.length - 1; i++) {
        steps += 2 * (items[i] - 1) - 1;
        items[i + 1] += items[i];
        items[i] = 0;
    }

    return steps;
}

const part2 = async input => {
    let items = input.split('\n').reduce((array, line) => {
        let items = line.split('contains ')[1].replace(/a /g, '').split(/ and |, /);
        if (items[0].includes('nothing')) items = [];
        array.push(items.length);
        return array;
    }, []);
    items[0] += 4; // for the added items

    let steps = 0;
    for (let i = 0; i < items.length - 1; i++) {
        steps += 2 * (items[i] - 1) - 1;
        items[i + 1] += items[i];
        items[i] = 0;
    }

    return steps;
}

export { part1, part2 };