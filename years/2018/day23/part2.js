module.exports = input => {
    let nanobots = [];
    input.split(/\r\n/).forEach(value => {
        let position = value.split(' ')[0].split(/[<>]/)[1].split(',').map(value => parseInt(value));
        let radius = parseInt(value.split(' ')[1].split('=')[1]);

        nanobots.push({ position: { x: position[0], y: position[1], z: position[2] }, radius });
    });
}