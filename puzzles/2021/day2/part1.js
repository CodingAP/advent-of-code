module.exports = input => {
    let commands = {
        forward: { x: 1, y: 0 },
        down: { x: 0, y: 1 },
        up: { x: 0, y: -1 }
    }

    let sub = { x: 0, y: 0 };
    input.split('\n').forEach(element => {
        let [command, amount] = element.split(' ');
        let vel = commands[command];
        sub.x += vel.x * parseInt(amount);
        sub.y += vel.y * parseInt(amount);
    });
    return sub.x * sub.y;
}