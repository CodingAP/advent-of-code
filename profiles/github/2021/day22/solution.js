const part1 = async input => {
    let cubes = input.split('\n').slice(0, 20).map(line => {
        let [instruction, dimensions] = line.split(' ');

        dimensions = dimensions.split(',').map(dimension => dimension.split('=')[1].split('..').map(num => parseInt(num)));
        let position = { x: dimensions[0][0], y: dimensions[1][0], z: dimensions[2][0] };
        let size = { l: Math.abs(dimensions[0][0] - dimensions[0][1]), w: Math.abs(dimensions[1][0] - dimensions[1][1]), h: Math.abs(dimensions[2][0] - dimensions[2][1]) }

        return {
            instruction,
            space: {
                position,
                size
            }
        }
    });

    console.log(cubes[0]);
    return 0;
}

const part2 = async input => {
    let cubes = input.split('\n').map(line => {
        let [instruction, dimensions] = line.split(' ');

        dimensions = dimensions.split(',').map(dimension => dimension.split('=')[1].split('..').map(num => parseInt(num)));
        let position = { x: dimensions[0][0], y: dimensions[1][0], z: dimensions[2][0] };
        let size = { l: Math.abs(dimensions[0][0] - dimensions[0][1]), w: Math.abs(dimensions[1][0] - dimensions[1][1]), h: Math.abs(dimensions[2][0] - dimensions[2][1]) }

        return {
            instruction,
            space: {
                position,
                size
            }
        }
    });

    let minX = cubes.reduce()
    return 0;
}

export { part1, part2 };