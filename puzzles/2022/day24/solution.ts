// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day24/solution.ts
 * 
 * ~~ Blizzard Basin ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

const bfs = (rows, states, starting, ending, startingTime) => {
    let queue = [{ position: { x: starting.x, y: starting.y }, minute: startingTime }];
    let visited = [`${starting.x},${starting.y},0`];
    while (queue.length > 0) {
        let current = queue.shift();

        let nextMove = [
            { x: current.position.x + 1, y: current.position.y },
            { x: current.position.x, y: current.position.y + 1 },
            { x: current.position.x - 1, y: current.position.y },
            { x: current.position.x, y: current.position.y - 1 },
            { x: current.position.x, y: current.position.y }
        ];

        for (let move of nextMove) {
            if (move.x == ending.x && move.y == ending.y) return current.minute + 1;

            if (move.x < 0 || move.x >= rows[0].length ||
                move.y < 0 || move.y >= rows.length ||
                states[(current.minute + 1) % (rows.length * rows[0].length)].has(`${move.x},${move.y}`) ||
                visited.includes(`${move.x},${move.y},${current.minute + 1}`) ||
                rows[move.y][move.x] == '#') {
                continue;
            }

            visited.push(`${move.x},${move.y},${current.minute + 1}`)
            queue.push({ position: move, minute: current.minute + 1 });
        }
    }
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let blizzards = [];
    let starting = { x: 0, y: 0 }, ending = { x: 0, y: 0 };
    let rows = input.split('\n');
    rows.forEach((line, y) => {
        line.split('').forEach((character, x) => {
            if (character.match(/[\^\<\>v]/g)) blizzards.push({ position: { x, y }, direction: ['^', '>', 'v', '<'].indexOf(character) })
            else if (character == '.' && y == 0) starting = { x, y };
            else if (character == '.' && y == rows.length - 1) ending = { x, y };
        });
    });

    // precompute all blizzards with periodic movement
    let states = [];
    let directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    for (let i = 0; i <= rows.length * rows[0].length; i++) {
        states[i] = blizzards.reduce((set, blizzard) => {
            set.add(`${blizzard.position.x},${blizzard.position.y}`);
            return set;
        }, new Set());

        blizzards = blizzards.map(blizzard => {
            let newPosition = { x: blizzard.position.x + directions[blizzard.direction].x, y: blizzard.position.y + directions[blizzard.direction].y };
            if (newPosition.x == 0) newPosition.x = rows[0].length - 2;
            else if (newPosition.x == rows[0].length - 1) newPosition.x = 1;
            else if (newPosition.y == 0) newPosition.y = rows.length - 2;
            else if (newPosition.y == rows.length - 1) newPosition.y = 1;

            return {
                position: newPosition,
                direction: blizzard.direction
            }
        });
    }

    return bfs(rows, states, starting, ending, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let blizzards = [];
    let starting = { x: 0, y: 0 }, ending = { x: 0, y: 0 };
    let rows = input.split('\n');
    rows.forEach((line, y) => {
        line.split('').forEach((character, x) => {
            if (character.match(/[\^\<\>v]/g)) blizzards.push({ position: { x, y }, direction: ['^', '>', 'v', '<'].indexOf(character) })
            else if (character == '.' && y == 0) starting = { x, y };
            else if (character == '.' && y == rows.length - 1) ending = { x, y };
        });
    });

    // precompute all blizzards with periodic movement
    let states = [];
    let directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
    for (let i = 0; i <= rows.length * rows[0].length; i++) {
        states[i] = blizzards.reduce((set, blizzard) => {
            set.add(`${blizzard.position.x},${blizzard.position.y}`);
            return set;
        }, new Set());

        blizzards = blizzards.map(blizzard => {
            let newPosition = { x: blizzard.position.x + directions[blizzard.direction].x, y: blizzard.position.y + directions[blizzard.direction].y };
            if (newPosition.x == 0) newPosition.x = rows[0].length - 2;
            else if (newPosition.x == rows[0].length - 1) newPosition.x = 1;
            else if (newPosition.y == 0) newPosition.y = rows.length - 2;
            else if (newPosition.y == rows.length - 1) newPosition.y = 1;

            return {
                position: newPosition,
                direction: blizzard.direction
            }
        });
    }

    let firstTrip = bfs(rows, states, starting, ending, 0);
    console.log(firstTrip);
    let secondTrip = bfs(rows, states, ending, starting, firstTrip);
    console.log(secondTrip);

    return bfs(rows, states, starting, ending, secondTrip);
}

export { part1, part2 };