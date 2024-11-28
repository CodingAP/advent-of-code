// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2021/day13/solution.ts
 *
 * ~~ Transparent Origami ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let dots = [];
    let [dotLines, foldLines] = input.trim().split('\n\n');
    dotLines.split('\n').forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));
        dots.push({ x, y });
    });

    let [direction, place] = foldLines.split('\n')[0].split(' ')[2].split('=');
    
    if (direction == 'x') {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
        }
    } else {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
        }
    }

    for (let i = dots.length - 1; i >= 0; i--) {
        if (dots.filter(element => element.x == dots[i].x && element.y == dots[i].y).length == 2) dots.splice(i, 1);
    }

    return dots.length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let dots = [];
    let [dotLines, foldLines] = input.trim().split('\n\n');
    dotLines.split('\n').forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));
        dots.push({ x, y });
    });

    foldLines.split('\n').forEach(line => {
        let [direction, place] = line.split(' ')[2].split('=');

        if (direction == 'x') {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
            }
        } else {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
            }
        }
    });

    // dots.forEach(element => {
    //     console.log(`(${element.x},-${element.y})`);
    // })

    return 'FAGURZHE';
};

export { part1, part2 };
