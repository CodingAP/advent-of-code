const part1 = async input => {
    let rows = input.split('\n');
    
    let visible = 0;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (x == 0 || y == 0 || x == rows[y].length - 1 || y == rows.length - 1) {
                visible++;
                continue;
            }

            let isVisible = true;
            for (let i = 0; i < x; i++) {
                if (rows[y][i] >= rows[y][x]) isVisible = false;
            }
            if (isVisible) {
                visible++;
                continue;
            }

            isVisible = true;
            for (let i = x + 1; i < rows[y].length; i++) {
                if (rows[y][i] >= rows[y][x]) isVisible = false;
            }
            if (isVisible) {
                visible++;
                continue;
            }

            isVisible = true;
            for (let i = 0; i < y; i++) {
                if (rows[i][x] >= rows[y][x]) isVisible = false;
            }
            if (isVisible) {
                visible++;
                continue;
            }

            isVisible = true;
            for (let i = y + 1; i < rows.length; i++) {
                if (rows[i][x] >= rows[y][x]) isVisible = false;
            }
            if (isVisible) {
                visible++;
                continue;
            }
        }
    }
    return visible;
}

const part2 = async input => {
    let rows = input.split('\n');

    let highest = -Infinity;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            let left = 0;
            for (let i = x - 1; i >= 0; i--) {
                left++;
                if (rows[y][i] >= rows[y][x]) break;
            }

            let right = 0;
            for (let i = x + 1; i < rows[y].length; i++) {
                right++;
                if (rows[y][i] >= rows[y][x]) break;
            }

            let top = 0;
            for (let i = y - 1; i >= 0; i--) {
                top++;
                if (rows[i][x] >= rows[y][x]) break;
            }

            let bottom = 0;
            for (let i = y + 1; i < rows.length; i++) {
                bottom++;
                if (rows[i][x] >= rows[y][x]) break;
            }
            
            let score = left * right * top * bottom;
            highest = Math.max(score, highest);
        }
    }
    return highest;
}

export { part1, part2 };