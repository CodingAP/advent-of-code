const part1 = async input => {
    let instructions = input.split('\n');
    let x = 1;
    let cycles = 0;

    return instructions.reduce((acc, line) => {
        let [instruction, number] = line.split(' ');

        cycles++;
        if (cycles % 40 == 20) acc += cycles * x;

        if (instruction == 'addx') {
            cycles++;
            if (cycles % 40 == 20) acc += cycles * x;
            x += parseInt(number);
        }
        return acc;
    }, 0);
}

const part2 = async input => {
    let instructions = input.split('\n');
    let sprite = 1;
    let cycles = 0;
    let picture = '';

    let drawSprite = () => {
        let position = cycles % 40;
        picture += (Math.abs(position - sprite) <= 1) ? '#' : ' ';

        cycles++;
        if (cycles % 40 == 0) picture += '\n';
    }

    instructions.forEach(line => {
        let [instruction, number] = line.split(' ');
        
        drawSprite();
        if (instruction == 'addx') {
            drawSprite();
            sprite += parseInt(number);
        }
    });
    
    console.log(picture);
    return 'ZRARLFZU';
}

export { part1, part2 };