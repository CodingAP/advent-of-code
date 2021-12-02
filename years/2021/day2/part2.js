module.exports = input => {
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