/**
 * puzzles/2018/day13/solution.ts
 *
 * ~~ Mine Cart Madness ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/3/2024
 */

const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

const DIRECTIONS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
];

const TURNS = [3, 0, 1];

const MOVEMENTS: { [key: string]: (cart: Cart) => void } = {
    '|': cart => {
        // doesn't change direction
        return;
    },
    '-': cart => {
        // doesn't change direction
        return;
    },
    '/': cart => {
        if (cart.direction === UP) cart.direction = RIGHT;
        else if (cart.direction === RIGHT) cart.direction = UP;
        else if (cart.direction === DOWN) cart.direction = LEFT;
        else if (cart.direction === LEFT) cart.direction = DOWN;
    },
    '\\': cart => {
        if (cart.direction === UP) cart.direction = LEFT;
        else if (cart.direction === RIGHT) cart.direction = DOWN;
        else if (cart.direction === DOWN) cart.direction = RIGHT;
        else if (cart.direction === LEFT) cart.direction = UP;
    },
    '+': cart => {
        cart.direction = (cart.direction + TURNS[cart.currentTurn]) % DIRECTIONS.length;
        cart.currentTurn = (cart.currentTurn + 1) % TURNS.length;
    }
}

interface Cart {
    x: number;
    y: number;
    direction: number;
    currentTurn: number;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find all carts and make sure track has no holes
    const carts: Cart[] = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '^') {
                carts.push({ x, y, direction: UP, currentTurn: 0 });
                grid[y][x] = '|';
            }
            if (grid[y][x] === '>') {
                carts.push({ x, y, direction: RIGHT, currentTurn: 0 });
                grid[y][x] = '-';
            }
            if (grid[y][x] === 'v') {
                carts.push({ x, y, direction: DOWN, currentTurn: 0 });
                grid[y][x] = '|';
            }
            if (grid[y][x] === '<') {
                carts.push({ x, y, direction: LEFT, currentTurn: 0 });
                grid[y][x] = '-';
            }
        }
    }

    while (true) {
        // simulate tick
        for (let i = 0; i < carts.length; i++) {
            carts[i].x += DIRECTIONS[carts[i].direction].x;
            carts[i].y += DIRECTIONS[carts[i].direction].y;

            MOVEMENTS[grid[carts[i].y][carts[i].x]](carts[i]);

            // check for collisions
            for (let j = 0; j < carts.length; j++) {
                if (i === j) continue;

                if (carts[i].x === carts[j].x && carts[i].y === carts[j].y) return `${carts[i].x},${carts[i].y}`;
            }
        }

        // sort in terms of cart order (prioritize topmost, then leftmost)
        carts.sort((a, b) => (a.y === b.y) ? a.x - b.x : a.y - b.y);
    }
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.split('\n').map(line => line.split(''));
    const width = grid[0].length, height = grid.length;

    // find all carts and make sure track has no holes
    let carts: (Cart | null)[] = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '^') {
                carts.push({ x, y, direction: UP, currentTurn: 0 });
                grid[y][x] = '|';
            }
            if (grid[y][x] === '>') {
                carts.push({ x, y, direction: RIGHT, currentTurn: 0 });
                grid[y][x] = '-';
            }
            if (grid[y][x] === 'v') {
                carts.push({ x, y, direction: DOWN, currentTurn: 0 });
                grid[y][x] = '|';
            }
            if (grid[y][x] === '<') {
                carts.push({ x, y, direction: LEFT, currentTurn: 0 });
                grid[y][x] = '-';
            }
        }
    }

    while (true) {
        // simulate tick
        for (let i = 0; i < carts.length; i++) {
            const cartA = carts[i];
            if (cartA === null) continue;

            cartA.x += DIRECTIONS[cartA.direction].x;
            cartA.y += DIRECTIONS[cartA.direction].y;

            MOVEMENTS[grid[cartA.y][cartA.x]](cartA);

            // check for collisions
            for (let j = 0; j < carts.length; j++) {
                if (i === j) continue;

                const cartB = carts[j];
                if (cartB === null) continue;

                if (cartA.x === cartB.x && cartA.y === cartB.y) {
                    carts[i] = null;
                    carts[j] = null;
                }
            }
        }

        // remove collided carts and sort in terms of cart order (prioritize topmost, then leftmost)
        carts = carts
            .filter(cart => cart !== null)
            .sort((a, b) => (a.y === b.y) ? a.x - b.x : a.y - b.y);

        if (carts.length === 1 && carts[0] !== null) return `${carts[0].x},${carts[0].y}`;
    }
};

export { part1, part2 };
