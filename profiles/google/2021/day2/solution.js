const part1 = async input => {
    let position = { x: 0, y: 0 };
    input.split('\n').forEach(element => {
        let [instruction, amount] = element.split(' ');
        switch (instruction) {
            case 'forward':
                position.x += parseInt(amount);
                break;
            case 'up':
                position.y -= parseInt(amount);
                break;
            case 'down':
                position.y += parseInt(amount);
                break;
        } 
    })
    return position.x * position.y;
}

const part2 = async input => {
    let position = { x: 0, y: 0 };
    let aim = 0;
    input.split('\n').forEach(element => {
        let [instruction, amount] = element.split(' ');
        switch (instruction) {
            case 'forward':
                position.x += parseInt(amount);
                position.y += aim * parseInt(amount);
                break;
            case 'up':
                aim -= parseInt(amount);
                break;
            case 'down':
                aim += parseInt(amount);
                break;
        }
    })
    return position.x * position.y;
}

export { part1, part2 }; 