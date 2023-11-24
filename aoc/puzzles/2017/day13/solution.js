const part1 = async input => {
    return input.split('\n').reduce((acc, element) => {
        let [position, depth] = element.split(': ').map(num => parseInt(num));
        if (position % (2 * (depth - 1)) == 0) acc += position * depth;
        return acc;
    }, 0);
}

const part2 = async input => {
    let depths = input.split('\n').map(line => {
        let [position, depth] = line.split(': ').map(num => parseInt(num));
        return { position, depth };
    });
    
    let delay = 0, caught = true;
    while (caught) {
        caught = false;
        for (let i = 0; i < depths.length; i++) {
            if ((depths[i].position + delay) % (2 * (depths[i].depth - 1)) == 0) {
                caught = true;
                break;
            }
        }

        if (caught) delay++;
    };
    return delay;
}

export { part1, part2 };