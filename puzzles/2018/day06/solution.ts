/**
 * puzzles/2018/day06/solution.ts
 *
 * ~~ Chronal Coordinates ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse input
    const points = input.trim().split('\n').map(line => {
        const [x, y] = line.split(', ').map(num => parseInt(num));
        return { x, y };
    });

    // find maximum range
    const maxX = Math.max(...points.map(point => point.x));
    const maxY = Math.max(...points.map(point => point.y));

    // find the closest area for all in the range, exclude conflicts
    const grid: { [key: string]: number } = {};
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            let closest: number[] = [], distance = Infinity;
            for (let i = 0; i < points.length; i++) {
                const dist = Math.abs(x - points[i].x) + Math.abs(y - points[i].y);
                if (dist < distance) {
                    closest = [i];
                    distance = dist;
                } else if (dist === distance) {
                    closest.push(i);
                }
            }

            if (closest.length === 1) grid[`${x},${y}`] = closest[0];
        }
    }

    // find areas that are infinite (they touch the border)
    let infinite = new Set<number>();
    Object.entries(grid).forEach(([key, point]) => {
        const [x, y] = key.split(',').map(num => parseInt(num));
        if (x === 0 || x === maxX || y === 0 || y === maxY) infinite.add(point);
    });
    
    const filtered = Object.entries(grid).filter(([key, point]) => !infinite.has(point));
    
    // sum all the areas and find maximum
    return Math.max(...Object.values(filtered.reduce<{ [key: number]: number }>((obj, area) => {
        obj[area[1]] = (obj[area[1]] || 0) + 1;
        return obj;
    }, {})));
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse input
    const points = input.trim().split('\n').map(line => {
        const [x, y] = line.split(', ').map(num => parseInt(num));
        return { x, y };
    });

    // find maximum range
    const maxX = Math.max(...points.map(point => point.x));
    const maxY = Math.max(...points.map(point => point.y));

    // find the region size where all points are less than 10000 units away
    let regionSize = 0;
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            let distance = 0;
            for (let i = 0; i < points.length; i++) distance += Math.abs(x - points[i].x) + Math.abs(y - points[i].y);

            if (distance < 10000) regionSize++;
        }
    }
    return regionSize;
};

export { part1, part2 };
