const part1 = async input => {
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

const part2 = async input => {
    let sub = { x: 0, y: 0, aim: 0 };
    input.split('\n').forEach(element => {
        let [command, amount] = element.split(' ');

        if (command == 'forward') {
            sub.x += parseInt(amount);
            sub.y += parseInt(amount) * sub.aim;
        } else if (command == 'up') {
            sub.aim -= parseInt(amount);
        } else {
            sub.aim += parseInt(amount);
        }
    });
    return sub.x * sub.y;
}

export { part1, part2 };