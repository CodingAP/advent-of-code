/**
 * puzzles/2024/day05/solution.ts
 *
 * ~~ Print Queue ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/4/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const [rules, pages] = input.trim().split('\n\n');

    // parse input into a graph that tells what numbers can come before
    const graph: { [key: number]: number[] } = {};
    rules.split('\n').forEach(line => {
        const [left, right] = line.split('|').map(num => parseInt(num));
        if (graph[right] === undefined) graph[right] = [];
        if (graph[left] === undefined) graph[left] = [];
        graph[right].push(left);  
    });

    return pages.split('\n').reduce((sum, line) => {
        const numbers = line.split(',').map(num => parseInt(num));
        
        // check if it is correct by seeing if there are disallowed pages before the page
        let correct = true;
        for (let i = 1; i < numbers.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (!graph[numbers[i]].includes(numbers[j])) correct = false;
            }
        }

        // add middle index to sum if correct
        return sum + (correct ? numbers[Math.floor(numbers.length / 2)] : 0);
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const [rules, pages] = input.trim().split('\n\n');

    // parse input into a graph that tells what numbers can come before
    const graph: { [key: number]: number[] } = {};
    rules.split('\n').forEach(line => {
        const [left, right] = line.split('|').map(num => parseInt(num));
        if (graph[right] === undefined) graph[right] = [];
        if (graph[left] === undefined) graph[left] = [];
        graph[right].push(left);  
    });

    return pages.split('\n').reduce((sum, line) => {
        const numbers = line.split(',').map(num => parseInt(num));
        
        // check if it is correct by seeing if there are disallowed pages before the page
        let correct = true;
        for (let i = 1; i < numbers.length; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (!graph[numbers[i]].includes(numbers[j])) correct = false;
            }
        }

        // if not correct, sort by page rule counts (only count page rules that affect current list)
        if (!correct) {
            numbers.sort((a, b) => graph[a].filter(num => numbers.includes(num)).length - graph[b].filter(num => numbers.includes(num)).length);
            sum += numbers[Math.floor(numbers.length / 2)];
        }

        return sum;
    }, 0);    
};

export { part1, part2 };
