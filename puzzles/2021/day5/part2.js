module.exports = input => {
    let lines = [];
    input.split('\n').forEach(element => {
        let [start, end] = element.split(' -> ');
        lines.push({
            start: { x: parseInt(start.split(',')[0]), y: parseInt(start.split(',')[1]) },
            end: { x: parseInt(end.split(',')[0]), y: parseInt(end.split(',')[1]) }
        });
    });

    let grid = {};
    lines.forEach(element => {
        let start = {}, end = {};
        if (element.start.x < element.end.x) {
            start = element.start;
            end = element.end;
        } else {
            start = element.end;
            end = element.start;
        }

        if (element.start.x == element.end.x || element.start.y == element.end.y) {
            let startX = Math.min(element.start.x, element.end.x);
            let startY = Math.min(element.start.y, element.end.y);
            let endX = Math.max(element.start.x, element.end.x);
            let endY = Math.max(element.start.y, element.end.y);

            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    if (!grid[`${x},${y}`]) grid[`${x},${y}`] = 0;
                    grid[`${x},${y}`]++;
                }
            }
        } else {
            let movement = end.x - start.x;
            for (let i = 0; i <= movement; i++) {
                let x = start.x + i;
                let y = start.y + ((end.y > start.y) ? i : -i);
                if (!grid[`${x},${y}`]) grid[`${x},${y}`] = 0;
                grid[`${x},${y}`]++;
            }
        }
    });

    return Object.values(grid).filter(element => element >= 2).length;
}