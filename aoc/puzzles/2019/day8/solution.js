const part1 = async input => {
    let width = 25, height = 6, layers = input.length / (width * height);

    let needed = { zeros: Infinity, output: 0 };
    for (let layer = 0; layer < layers; layer++) {
        let count = [0, 0, 0];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (layer * (width * height) + y * width + x);
                count[parseInt(input[index])]++;
            }
        }
        if (count[0] < needed.zeros) needed = { zeros: count[0], output: count[1] * count[2] };
    }
    return needed.output;
}

const part2 = async input => {
    let width = 25, height = 6, layers = input.length / (width * height);

    let image = '';
    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            for (let layer = 0; layer < layers; layer++) {
                let index = (layer * (width * height) + y * width + x);
                if (input[index] == '0') row += ' ';
                if (input[index] == '1') row += '#';
                if (input[index] != '2') break;
            }
        }
        image += row + '\n';
    }
    console.log(image);
    return 'LEGJY';
}

export { part1, part2 };