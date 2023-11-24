const part1 = async input => {
    let cubes = input.split('\n');

    let directions = [{ x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }];
    return cubes.map(cube => cube.split(',').map(num => parseInt(num))).reduce((area, cube) => {
        directions.forEach(direction => {
            if (!cubes.includes(`${cube[0] + direction.x},${cube[1] + direction.y},${cube[2] + direction.z}`)) area++;
        });
        return area;
    }, 0);
}

const part2 = async input => {
    let cubes = {};
    let inputS = input.split('\n');
    let coords = inputS.map(cube => cube.split(',').map(num => parseInt(num)));

    let minX = coords.reduce((min, cube) => Math.min(min, cube[0]), Infinity) - 1;
    let minY = coords.reduce((min, cube) => Math.min(min, cube[1]), Infinity) - 1;
    let minZ = coords.reduce((min, cube) => Math.min(min, cube[2]), Infinity) - 1;
    let maxX = coords.reduce((max, cube) => Math.max(max, cube[0]), -Infinity) + 1;
    let maxY = coords.reduce((max, cube) => Math.max(max, cube[1]), -Infinity) + 1;
    let maxZ = coords.reduce((max, cube) => Math.max(max, cube[2]), -Infinity) + 1;

    let directions = [{ x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }];

    for (let z = minZ; z <= maxZ; z++) {
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                cubes[`${x},${y},${z}`] = inputS.includes(`${x},${y},${z}`);
            }
        }
    }

    let floodDelete = position => {
        cubes[`${position.x},${position.y},${position.z}`] = null;

        if (cubes[`${position.x + 1},${position.y},${position.z}`] == false) floodDelete({ x: position.x + 1, y: position.y, z: position.z });
        if (cubes[`${position.x - 1},${position.y},${position.z}`] == false) floodDelete({ x: position.x - 1, y: position.y, z: position.z });
        if (cubes[`${position.x},${position.y + 1},${position.z}`] == false) floodDelete({ x: position.x, y: position.y + 1, z: position.z });
        if (cubes[`${position.x},${position.y - 1},${position.z}`] == false) floodDelete({ x: position.x, y: position.y - 1, z: position.z });
        if (cubes[`${position.x},${position.y},${position.z + 1}`] == false) floodDelete({ x: position.x, y: position.y, z: position.z + 1 });
        if (cubes[`${position.x},${position.y},${position.z - 1}`] == false) floodDelete({ x: position.x, y: position.y, z: position.z - 1 });
    }
    
    floodDelete({ x: minX, y: minY, z: minZ });

    return Object.keys(cubes).reduce((area, position) => {
        if (cubes[position] == null) return area;

        let cube = position.split(',').map(num => parseInt(num));
        directions.forEach(direction => {
            if (cubes[`${cube[0] + direction.x},${cube[1] + direction.y},${cube[2] + direction.z}`] == null) area++;
        });

        return area;
    }, 0);
}

export { part1, part2 };