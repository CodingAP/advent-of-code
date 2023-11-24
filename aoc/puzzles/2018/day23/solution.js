const part1 = async input => {
    let nanobots = input.split('\n').reduce((array, line) => {
        let position = line.split(', ')[0].split(/[<>]/)[1].split(',').map(num => parseInt(num));
        let radius = parseInt(line.split(', ')[1].split('=')[1]);

        array.push({ position: { x: position[0], y: position[1], z: position[2] }, radius });
        return array;
    }, []);

    let largest = nanobots[nanobots.reduce((largest, nanobot, index) => {
        if (nanobot.radius > nanobots[largest].radius) return index;
        return largest;
    }, 0)];

    return nanobots.reduce((acc, nanobot) => {
        let distance = Math.abs(largest.position.x - nanobot.position.x) + Math.abs(largest.position.y - nanobot.position.y) + Math.abs(largest.position.z - nanobot.position.z);
        if (distance <= largest.radius) acc++;
        return acc;
    }, 0);
}

const part2 = async input => {
    let nanobots = input.split('\n').reduce((array, line) => {
        let position = line.split(', ')[0].split(/[<>]/)[1].split(',').map(num => parseInt(num));
        let radius = parseInt(line.split(', ')[1].split('=')[1]);

        array.push({ position: { x: position[0], y: position[1], z: position[2] }, radius });
        return array;
    }, []);
}

export { part1, part2 };