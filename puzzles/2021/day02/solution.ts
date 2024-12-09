/**
 * puzzles/2021/day02/solution.ts
 *
 * ~~ Dive! ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const COMMANDS: { [key: string]: { x: number, y: number } } = {
        forward: { x: 1, y: 0 },
        down: { x: 0, y: 1 },
        up: { x: 0, y: -1 }
    }

    // control the sub using the commands above
    const sub = { x: 0, y: 0 };
    input.trim().split('\n').forEach(element => {
        const [command, amount] = element.split(' ');
        const vel = COMMANDS[command];
        sub.x += vel.x * parseInt(amount);
        sub.y += vel.y * parseInt(amount);
    });
    return sub.x * sub.y;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const sub = { x: 0, y: 0, aim: 0 };

    // control the subs with the command below as it is more involved
    input.trim().split('\n').forEach(element => {
        const [command, amount] = element.split(' ');
        
        if (command === 'forward') {
            sub.x += parseInt(amount);
            sub.y += parseInt(amount) * sub.aim;
        } else if (command === 'up') {
            sub.aim -= parseInt(amount);
        } else {
            sub.aim += parseInt(amount);
        }
    });
    
    return sub.x * sub.y;
};

export { part1, part2 };
