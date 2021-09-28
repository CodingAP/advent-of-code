module.exports = input => {
    let size = 1000;
    let grid = [];
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            grid[y * size + x] = false;
        }
    }

    let instructions = input.split('\n');
    for (let i = 0; i < instructions.length; i++) {
        let parts = instructions[i].split(' ');
        if (parts.length == 5) {
            let start = { x: parseInt(parts[2].split(',')[0]), y: parseInt(parts[2].split(',')[1]) };
            let end = { x: parseInt(parts[4].split(',')[0]), y: parseInt(parts[4].split(',')[1]) };
            let mode = parts[1] == 'on';
            for (let y = start.y; y <= end.y; y++) {
                for (let x = start.x; x <= end.x; x++) {
                    grid[y * size + x] = mode;
                }
            }
        } else {
            let start = { x: parseInt(parts[1].split(',')[0]), y: parseInt(parts[1].split(',')[1]) };
            let end = { x: parseInt(parts[3].split(',')[0]), y: parseInt(parts[3].split(',')[1]) };
            for (let y = start.y; y <= end.y; y++) {
                for (let x = start.x; x <= end.x; x++) {
                    grid[y * size + x] = !grid[y * size + x];
                }
            }
        }
    }

    let lights = 0;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (grid[y * size + x]) lights++;
        }
    }
    return lights;
}