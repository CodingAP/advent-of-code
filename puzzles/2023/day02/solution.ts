/**
 * puzzles/2023/day02/solution.ts
 * 
 * ~~ Cube Conundrum ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/1/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 */
const part1 = (input: string) => {
    // parse input
    const games = input.split(/\n/g).map(line => {
        return line.split(/: /g)[1].split(/;/g).reduce((array, sets) => {
            array.push(sets.trim().split(/, /).reduce((obj, colors) => {
                let [amount, color] = colors.split(/ /g);
                obj[color] = parseInt(amount);
                return obj;
            }, {}));
            return array;
        }, [] as { [key: string]: number }[]);
    });

    // if any set shows more than the limit, don't add to sum
    let limit = { red: 12, green: 13, blue: 14 };
    return games.reduce((sum, game, index) => {
        let possible = true;

        for (let i = 0; i < game.length; i++) {
            Object.keys(limit).forEach(color => {
                if (game[i][color] && game[i][color] > limit[color]) possible = false;
            });
        }

        if (possible) sum += index + 1;
        return sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 */
const part2 = (input: string) => {
    /**
     * parsed input to get a list of games
     * 
     * @type {{ red?: number, green?: number, blue?: number }[][]}
     */
    const games = input.split(/\n/g).map(line => {
        return line.split(/: /g)[1].split(/;/g).reduce((array, sets) => {
            array.push(sets.trim().split(/, /).reduce((obj, colors) => {
                let [amount, color] = colors.split(/ /g);
                obj[color] = parseInt(amount);
                return obj;
            }, {}));
            return array;
        }, [] as { [key: string]: number }[]);
    });

    // find the max that was pulled out, multiply them together, and sum all of them up
    return games.reduce((sum, game) => {
        let max = { red: -Infinity, green: -Infinity, blue: -Infinity };

        for (let i = 0; i < game.length; i++) {
            Object.keys(max).forEach(color => {
                if (game[i][color]) max[color] = Math.max(max[color], game[i][color]);
            });
        }

        sum += max.red * max.green * max.blue;
        return sum;
    }, 0);
}

export { part1, part2 };