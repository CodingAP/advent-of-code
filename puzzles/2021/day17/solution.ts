/**
 * puzzles/2021/day17/solution.ts
 *
 * ~~ Trick Shot ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const tokens = input.split(' ');
    const xRange = tokens[2].replace(',', '').split('=')[1].split('..').map(num => parseInt(num));
    const yRange = tokens[3].replace(',', '').split('=')[1].split('..').map(num => parseInt(num));
    const targetArea = { startX: xRange[0], endX: xRange[1], startY: yRange[0], endY: yRange[1] };

    let bestY = -Infinity;

    for (let y = 1; y <= 500; y++) {
        for (let x = 1; x <= 500; x++) {
            const position = { x: 0, y: 0 };
            const velocity = { x: x, y: y };

            let inTarget = false;

            for (let i = 0; i < 1000; i++) {
                position.x += velocity.x;
                position.y += velocity.y;

                if (position.x >= targetArea.startX && position.x <= targetArea.endX && position.y >= targetArea.startY && position.y <= targetArea.endY) inTarget = true;

                velocity.x += -Math.sign(velocity.x);
                velocity.y--;
            }

            if (inTarget) bestY = Math.max(bestY, y);
        }
    }

    return bestY * (bestY + 1) / 2;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const tokens = input.split(' ');
    const xRange = tokens[2].replace(',', '').split('=')[1].split('..').map(element => parseInt(element));
    const yRange = tokens[3].replace(',', '').split('=')[1].split('..').map(element => parseInt(element));
    const targetArea = { startX: xRange[0], endX: xRange[1], startY: yRange[0], endY: yRange[1] };

    let distinct = 0;

    for (let y = -500; y <= 500; y++) {
        for (let x = -500; x <= 500; x++) {
            const position = { x: 0, y: 0 };
            const velocity = { x: x, y: y };

            let inTarget = false;

            for (let i = 0; i < 1000; i++) {
                position.x += velocity.x;
                position.y += velocity.y;

                if (position.x >= targetArea.startX && position.x <= targetArea.endX && position.y >= targetArea.startY && position.y <= targetArea.endY) inTarget = true;

                velocity.x += -Math.sign(velocity.x);
                velocity.y--;
            }

            if (inTarget) distinct++;
        }
    }

    return distinct;
};

export { part1, part2 };
