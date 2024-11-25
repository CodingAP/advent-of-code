const part1 = async input => {
    let pairs = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split(',').map(element => element.split('-').map(num => parseInt(num)));
        array.push({ left, right });
        return array;
    }, []);

    return pairs.reduce((acc, pairs) => {
        if ((pairs.left[0] >= pairs.right[0] && pairs.left[1] <= pairs.right[1]) ||
            pairs.right[0] >= pairs.left[0] && pairs.right[1] <= pairs.left[1]) acc++;
        return acc;
    }, 0);
}

const part2 = async input => {
    let pairs = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split(',').map(element => element.split('-').map(num => parseInt(num)));
        array.push({ left, right });
        return array;
    }, []);

    return pairs.reduce((acc, pairs) => {
        let collisions = {};
        for (let i = pairs.left[0]; i <= pairs.left[1]; i++) {
            if (collisions[i] == null) collisions[i] = 0;
            collisions[i]++; 
        }
        for (let i = pairs.right[0]; i <= pairs.right[1]; i++) {
            if (collisions[i] == null) collisions[i] = 0;
            collisions[i]++;
        }
        if (Object.values(collisions).filter(element => element == 2).length > 0) acc++;
        return acc;
    }, 0);
}

export { part1, part2 };