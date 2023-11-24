const part1 = async input => {
    return input.split('\n').reduce((acc, line) => {
        let sides = line.split(/  +/g).slice(1).map(num => parseInt(num)).sort((a, b) => a - b);
        if (sides[0] + sides[1] > sides[2]) acc++;
        return acc;
    }, 0);
}

const part2 = async input => {
    let triangles = 0;
    let tempThree = [];
    input.split('\n').forEach(line => {
        tempThree.push(line.split(/  +/g).slice(1).map(num => parseInt(num)));

        if (tempThree.length == 3) {
            for (let i = 0; i < tempThree[0].length; i++) {
                let sides = [];
                for (let j = 0; j < tempThree.length; j++) {
                    sides.push(tempThree[j][i]);
                }
                sides.sort((a, b) => a - b);
                if (sides[0] + sides[1] > sides[2]) triangles++;
            }

            tempThree = [];
        }
    });

    return triangles;
}

export { part1, part2 };