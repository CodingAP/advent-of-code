/**
 * puzzles/2024/day15/solution.ts
 *
 * ~~ Warehouse Woes ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/14/2024
 */

type Point = { x: number, y: number };

const DIRECTIONS: { [key: string]: Point } = {
    '^': { x: 0, y: -1 },
    '>': { x: 1, y: 0 },
    'v': { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
};

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const parts = input.trim().split('\n\n').map(lines => lines.split('\n'));
    const grid = parts[0].map(line => line.split(''));
    const instructions = parts[1].join('');
    const width = grid[0].length, height = grid.length;

    /**
     * recursively attempt to move all boxes, prevent any from moving if a wall prevents it 
     */
    const moveBox = (position: Point, direction: Point): boolean => {
        const next = { x: position.x + direction.x, y: position.y + direction.y };
    
        if (grid[next.y][next.x] === '.') {
            // if next spot is empty, swap positions
            let temp = grid[position.y][position.x];
            grid[position.y][position.x] = grid[next.y][next.x];
            grid[next.y][next.x] = temp;
            return true;
        } else if (grid[next.y][next.x] === '#') {
            // if next spot is a wall, stop all boxes from moving
            return false;
        } else {
            // only move the current box if the next box can move
            if (moveBox(next, direction)) {
                let temp = grid[position.y][position.x];
                grid[position.y][position.x] = grid[next.y][next.x];
                grid[next.y][next.x] = temp;
                return true;
            }
        }

        // this should never be reached
        return false;
    }

    // find the robot and clear it spaces
    let robot = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '@') {
                robot = { x, y };
                grid[y][x] = '.';
            }
        }
    }

    for (let i = 0; i < instructions.length; i++) {
        const direction = DIRECTIONS[instructions[i]];
        const position = { x: robot.x + direction.x, y: robot.y + direction.y };

        // if there is a wall, don't move
        if (grid[position.y][position.x] !== '#') {
            // if there is an emprt spot, move without moving boxes
            if (grid[position.y][position.x] === '.') robot = position;

            // if there is a box, try to move all the boxes, then move
            if (grid[position.y][position.x] === 'O' && moveBox(position, direction)) robot = position;
        }
    }

    // tally all the box positions
    let score = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 'O') score += y * 100 + x;
        }
    }

    return score;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const parts = input.trim().split('\n\n').map(lines => lines.split('\n'));
    const grid = parts[0].map(line => line.split(''));
    const instructions = parts[1].join('');
    const width = grid[0].length, height = grid.length;

    const walls = new Set<string>();
    const boxes: Point[] = [];
    let robot = { x: 0, y: 0 };
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === '@') robot = { x: x * 2, y };
            if (grid[y][x] === '#') {
                walls.add(`${x * 2},${y}`);
                walls.add(`${x * 2 + 1},${y}`);
            }
            if (grid[y][x] === 'O') boxes.push({ x: x * 2, y });
        }
    }

    /**
     * recursively try to move all boxes
     */
    const moveBox = (collidedBox: Point, direction: Point, movements: { box: Point, direction: Point}[] ): boolean => {
        // try both positions of the moved box
        const next = [
            { x: collidedBox.x + direction.x, y: collidedBox.y + direction.y },
            { x: collidedBox.x + 1 + direction.x, y: collidedBox.y + direction.y }
        ];
    
        // if collided with a wall, stop all movements
        for (let i = 0; i < next.length; i++) {
            if (walls.has(`${next[i].x},${next[i].y}`)) {
                return false;
            }
        }
    
        // find all boxes that are collided with
        const collidedBoxes = boxes.filter(box => {
            for (let i = 0; i < next.length; i++) {
                if (box.x === collidedBox.x && box.y === collidedBox.y) return false;
                if ((box.x === next[i].x || box.x + 1 === next[i].x) && box.y === next[i].y) return true;
            }
            return false;
        });
    
        // if there are no collided boxes, all movements are good
        if (collidedBoxes.length === 0) return true;
    
        // check for conflicts
        let conflicts = false;
        for (const box of collidedBoxes) {
            if (moveBox(box, direction, movements)) {
                // if box can move and we haven't already processed the movement, add to list of movements
                if (movements.map(movement => movement.box).find(b => b.x === box.x && b.y === box.y) === undefined) {
                    movements.push({
                        box, direction
                    });
                }
            } else {
                // if box can't move, prevent any movements from happening
                conflicts = true;
                break;
            }
        }
    
        return !conflicts;
    }

    for (let i = 0; i < instructions.length; i++) {
        const direction = DIRECTIONS[instructions[i]];
        const position = { x: robot.x + direction.x, y: robot.y + direction.y };

        // only try to move if no wall is in the way
        if (!walls.has(`${position.x},${position.y}`)) {
            const collidedBox = boxes.find(box => (box.x === position.x || box.x + 1 === position.x) && box.y === position.y);

            // if there is a collided box, try to move all affected
            if (collidedBox !== undefined) {
                let movements: { box: Point, direction: Point }[] = [];
                if (moveBox(collidedBox, direction, movements)) {
                    for (const movement of movements) {
                        movement.box.x += movement.direction.x;
                        movement.box.y += movement.direction.y;
                    }
                    collidedBox.x += direction.x;
                    collidedBox.y += direction.y;
                    robot = position;
                }
            } else robot = position; 
        }
    }

    let score = 0;

    for (const box of boxes) {
        score += box.y * 100 + box.x;
    }

    return score;
};

export { part1, part2 };
