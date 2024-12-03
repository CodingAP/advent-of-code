/**
 * puzzles/2018/day14/solution.ts
 *
 * ~~ Chocolate Charts ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/3/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // setup array with 3, 7 and elves at both spots
    const number = parseInt(input);
    let recipes = '37';
    let elf1 = 0, elf2 = 1;

    // keep going until enough recipes are made
    while (recipes.length < number + 10) {
        const sum = parseInt(recipes[elf1]) + parseInt(recipes[elf2]);

        if (sum >= 10) recipes += '1';
        recipes += (sum % 10).toString();

        elf1 = (elf1 + 1 + parseInt(recipes[elf1])) % recipes.length;
        elf2 = (elf2 + 1 + parseInt(recipes[elf2])) % recipes.length;
    }

    // get last 10 recipes
    return recipes.slice(number, number + 10);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // setup array with 3, 7 and elves at both spots
    let recipes = '37';
    let elf1 = 0, elf2 = 1;

    // keep going until enough recipes are made to see input
    while (true) {
        const sum = parseInt(recipes[elf1]) + parseInt(recipes[elf2]);

        if (sum >= 10) recipes += '1';
        recipes += (sum % 10).toString();

        elf1 = (elf1 + 1 + parseInt(recipes[elf1])) % recipes.length;
        elf2 = (elf2 + 1 + parseInt(recipes[elf2])) % recipes.length;
    
        const end = recipes.slice(-7) 
        if (end.includes(input)) return recipes.length + end.indexOf(input);
        if (recipes.length % 1000 === 0) console.log(recipes.length);
    }
};

export { part1, part2 };
