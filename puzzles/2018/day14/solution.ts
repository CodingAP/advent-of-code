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
 * circular linked list node
 */
interface Node {
    value: number;
    next?: Node;
}

/**
 * inserts a new node after the specified node
 * 
 * @param node node to insert after
 * @param value value of new node
 * @returns the new node created
 */
const insertAfter = (node: Node, value: number): Node => {
    const newNode: Node = { value, next: node.next };
    node.next = newNode;
    return newNode;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // setup array with 3, 7 and elves at both spots
    const number = parseInt(input);
    let start: Node = { value: 3 };
    let end: Node = { value: 7 };
    let size = 2;
    start.next = end;
    end.next = start;

    let elf1 = start, elf2 = end;

    // keep going until enough recipes are made
    while (size < number + 10) {
        const sum = elf1.value + elf2.value;

        if (sum >= 10) {
            end = insertAfter(end, 1);
            size++;
        }
        
        end = insertAfter(end, sum % 10);
        size++;

        const elf1Move = 1 + elf1.value;
        for (let i = 0; i < elf1Move; i++) if (elf1.next !== undefined) elf1 = elf1.next;
        
        const elf2Move = 1 + elf2.value;
        for (let i = 0; i < elf2Move; i++) if (elf2.next !== undefined) elf2 = elf2.next;
    }

    // move to last 10
    for (let i = 0; i < number; i++) if (start.next !== undefined) start = start.next;
    
    // get last 10
    let final = '';
    for (let i = 0; i < 10; i++) {
        if (start.next !== undefined) {
            final += start.value.toString();
            start = start.next;
        }
    } 
    return final;
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
