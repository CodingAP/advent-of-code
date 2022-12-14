const part1 = async input => {
    let nodes = input.split('\n').slice(2).reduce((array, line) => {
        let tokens = line.split(' ').filter(value => value != '');

        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        array.push({ position, size, used });
        return array;
    }, []);

    let valid = 0;
    for (let a = 0; a < nodes.length; a++) {
        for (let b = 0; b < nodes.length; b++) {
            if (a == b) continue;

            if (nodes[a].used != 0 && (nodes[b].size - nodes[b].used) >= nodes[a].used) valid++;
        }
    }
    return valid;
}

const part2 = async input => {
    let nodes = input.split('\n').slice(2).reduce((array, line) => {
        let tokens = line.split(' ').filter(value => value != '');

        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        array.push({ position, size, used });
        return array;
    }, []);
}

export { part1, part2 };