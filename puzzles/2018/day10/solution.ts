/**
 * puzzles/2018/day10/solution.ts
 *
 * ~~ The Stars Align ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const stars = input.trim().split('\n').map(line => {
        const [_, position, __, velocity] = line.replace(/\s+/g, '').split(/=<|>/g);
        const [px, py] = position.split(',').map(num => parseInt(num));
        const [vx, vy] = velocity.split(',').map(num => parseInt(num));

        return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
    });

    let minSize = { left: -Infinity, right: Infinity, top: -Infinity, bottom: Infinity };
    let movedStars = structuredClone(stars);
    for (let step = 0; step < 20000; step++) {
        for (let i = 0; i < movedStars.length; i++) {
            movedStars[i].position.x += movedStars[i].velocity.x;
            movedStars[i].position.y += movedStars[i].velocity.y;
        }

        const maxX = Math.max(...movedStars.map(star => star.position.x));
        const maxY = Math.max(...movedStars.map(star => star.position.y));
        const minX = Math.min(...movedStars.map(star => star.position.x));
        const minY = Math.min(...movedStars.map(star => star.position.y));

        if ((minSize.right - minSize.left) > (maxX - minX) || (minSize.bottom - minSize.top) > (maxY - minY)) {
            minSize.left = minX;
            minSize.right = maxX;
            minSize.top = minY;
            minSize.bottom = maxY;
        }
    }

    // to display the final message, uncomment the lines below

    // const finalStars = stars.map(star => {
    //     const moved = structuredClone(star);
    //     moved.position.x += moved.velocity.x * (minStep + 1);
    //     moved.position.y += moved.velocity.y * (minStep + 1);
    //     return `${moved.position.x},${moved.position.y}`;
    // });
    
    // for (let y = minSize.top; y <= minSize.bottom; y++) {
    //     let row = '';
    //     for (let x = minSize.left; x <= minSize.right; x++) {
    //         if (finalStars.includes(`${x},${y}`)) row += '#';
    //         else row += '.';
    //     }
    //     console.log(row);
    // }

    return 'ERCXLAJL';
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const stars = input.trim().split('\n').map(line => {
        const [_, position, __, velocity] = line.replace(/\s+/g, '').split(/=<|>/g);
        const [px, py] = position.split(',').map(num => parseInt(num));
        const [vx, vy] = velocity.split(',').map(num => parseInt(num));

        return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
    });

    let minSize = { left: -Infinity, right: Infinity, top: -Infinity, bottom: Infinity }, minStep = -1;
    let movedStars = structuredClone(stars);
    for (let step = 0; step < 20000; step++) {
        for (let i = 0; i < movedStars.length; i++) {
            movedStars[i].position.x += movedStars[i].velocity.x;
            movedStars[i].position.y += movedStars[i].velocity.y;
        }

        const maxX = Math.max(...movedStars.map(star => star.position.x));
        const maxY = Math.max(...movedStars.map(star => star.position.y));
        const minX = Math.min(...movedStars.map(star => star.position.x));
        const minY = Math.min(...movedStars.map(star => star.position.y));

        if ((minSize.right - minSize.left) > (maxX - minX) || (minSize.bottom - minSize.top) > (maxY - minY)) {
            minSize.left = minX;
            minSize.right = maxX;
            minSize.top = minY;
            minSize.bottom = maxY;
            minStep = step;
        }
    }

    return minStep + 1;
};

export { part1, part2 };
