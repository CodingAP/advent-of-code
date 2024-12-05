/**
 * puzzles/2018/day15/solution.ts
 *
 * ~~ Beverage Bandits ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

// ordered by reading order already to prevent any needs for sorting
const DIRECTIONS = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];

interface Entity {
    x: number;
    y: number;
    type: string;
    health: number;
    power: number;
}

/**
 * simple bfs to count how many steps it takes to move from start to end
 * 
 * @param grid grid from input
 * @param start starting position
 * @param end ending position
 * @returns how many steps to get from start to end
 */
const bfs = (grid: string[][], entities: Entity[], start: { x: number, y: number }, end: { x: number, y: number }) => {
    const width = grid[0].length, height = grid.length;
    const queue: { x: number, y: number, steps: number }[] = [{ ...start, steps: 0 }];
    const visited = new Set();
    visited.add(`${start.x},${start.y}`);

    while (queue.length !== 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (current.x === end.x && current.y === end.y) return current.steps;

        DIRECTIONS.forEach(direction => {
            const position = { x: current.x + direction.x, y: current.y + direction.y };
            if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#' || visited.has(`${position.x},${position.y}`)) return;
            for (let i = 0; i < entities.length; i++) {
                if (entities[i].health === 0) continue;
                if (position.x === entities[i].x && position.y === entities[i].y) return;
            }

            queue.push({ ...position, steps: current.steps + 1 });
            visited.add(`${position.x},${position.y}`);
        });
    }

    return Infinity;
}

const simulateFight = (grid: string[][], elfPower: number): { healths: { G: number, E: number }, rounds: number, elfDeath: boolean } => {
    const width = grid[0].length, height = grid.length;

    const entities: Entity[] = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x].match(/[GE]/)) {
                entities.push({ x, y, type: grid[y][x], health: 200, power: (grid[y][x] === 'E' ? elfPower : 3) });
                grid[y][x] = '.';
            }
        }
    }

    let rounds = 0, elfDeath = false;
    while (true) {
        for (let i = 0; i < entities.length; i++) {
            // don't process dead entities
            if (entities[i].health === 0) continue;

            // check to see if attack immediately or move
            let inRange: Entity[] = [];
            DIRECTIONS.forEach(direction => {
                const position = { x: entities[i].x + direction.x, y: entities[i].y + direction.y };
                if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#') return;
                
                for (let j = 0; j < entities.length; j++) {
                    if (entities[i].type === entities[j].type || entities[j].health === 0) continue;
                    if (entities[j].x === position.x && entities[j].y === position.y) inRange.push(entities[j]);
                }
            });
            
            if (inRange.length !== 0) { // we are attacking immediately
                inRange.sort((a, b) => {
                    if (a.health === b.health) {
                        if (a.y === b.y) return a.x - a.y;
                        return a.y - b.y;
                    }
                    return a.health - b.health;
                });

                // deal damage to weakest unit; also check for elf deaths
                inRange[0].health = Math.max(inRange[0].health - entities[i].power, 0);
                if (inRange[0].health === 0 && inRange[0].type === 'E') elfDeath = true;
            } else { // we are moving
                // find closest square
                let closest: { x: number, y: number } = { x: -1, y: -1 }, dist = Infinity;
                for (let j = 0; j < entities.length; j++) {
                    if (entities[i].type === entities[j].type || entities[j].health === 0) continue;

                    // try all directions
                    DIRECTIONS.forEach(direction => {
                        const position = { x: entities[j].x + direction.x, y: entities[j].y + direction.y };

                        // don't go out of bounds, into a wall, or into another alive entity
                        if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#') return;
                        for (let k = 0; k < entities.length; k++) {
                            if (entities[k].health === 0) continue;
                            if (position.x === entities[k].x && position.y === entities[k].y) return;
                        }
                        
                        const d = bfs(grid, entities, { x: entities[i].x, y: entities[i].y }, position);
                        if (d < dist) {
                            closest = position;
                            dist = d;
                        }
                    });
                }

                // if target can move, move as close as possible
                if (dist !== Infinity) {
                    // see how far each immediate step away is
                    let step: { x: number, y: number } = { x: 0, y: 0 }, min = Infinity;
                    DIRECTIONS.forEach(direction => {
                        const position = { x: entities[i].x + direction.x, y: entities[i].y + direction.y };

                        // don't go out of bounds, into a wall, or into alive another entity
                        if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#') return;
                        for (let k = 0; k < entities.length; k++) {
                            if (entities[k].health === 0) continue;
                            if (position.x === entities[k].x && position.y === entities[k].y) return;
                        }
                        
                        const d = bfs(grid, entities, position, closest);
                        if (d < min) {
                            step = direction;
                            min = d;
                        }
                    });

                    // move entity
                    entities[i].x += step.x;
                    entities[i].y += step.y;
                }

                // start attack
                inRange = [];
                DIRECTIONS.forEach(direction => {
                    const position = { x: entities[i].x + direction.x, y: entities[i].y + direction.y };
                    if (position.x < 0 || position.x >= width || position.y < 0 || position.y >= height || grid[position.y][position.x] === '#') return;
                    
                    for (let j = 0; j < entities.length; j++) {
                        if (entities[i].type === entities[j].type || entities[j].health === 0) continue;
                        if (entities[j].x === position.x && entities[j].y === position.y) inRange.push(entities[j]);
                    }
                });
                
                inRange.sort((a, b) => {
                    if (a.health === b.health) {
                        if (a.y === b.y) return a.x - a.y;
                        return a.y - b.y;
                    }
                    return a.health - b.health;
                });

                // deal damage to weakest unit; also check for elf deaths
                if (inRange.length !== 0) {
                    inRange[0].health = Math.max(inRange[0].health - entities[i].power, 0);
                    if (inRange[0].health === 0 && inRange[0].type === 'E') elfDeath = true;
                } 
            }
        }

        // prioritize topmost, then leftmost
        entities.sort((a, b) => (a.y === b.y) ? a.x - b.x : a.y - b.y);

        // this may not work as some rounds end prematurely and some don't
        // may have to fiddle with +/- 1 on the rounds

        rounds++;
        const healths: { G: number, E: number } = { G: 0, E: 0 };
        for (let i = 0; i < entities.length; i++) healths[entities[i].type as 'G' | 'E'] += entities[i].health;

        if (healths.G === 0 || healths.E === 0) return { healths, rounds: rounds, elfDeath };
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const results = simulateFight(grid, 3);
    return results.healths.G * (results.rounds - 1);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const grid = input.trim().split('\n').map(line => line.split(''));

    let power = 4;
    while (true) {
        const results = simulateFight(structuredClone(grid), power);
        if (!results.elfDeath) return results.healths.E * (results.rounds - 1);
        power++;
    }
};

export { part1, part2 };
