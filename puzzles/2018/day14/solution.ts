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
 * doubly linked list node
 */
interface Node {
    value: number;
    next?: Node;
    previous?: Node;
}

/**
 * inserts a new node after the specified node
 * 
 * @param node node to insert after
 * @param value value of new node
 * @returns the new node created
 */
const insertAfter = (node: Node, value: number): Node => {
    const newNode: Node = { value, next: node.next, previous: node };

    if (node.next !== undefined) {
        node.next.previous = newNode;
        node.next = newNode;
    }

    return newNode;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // setup circular doubly linked list with 3 and 7
    const number = parseInt(input);
    let start: Node = { value: 3 };
    let end: Node = { value: 7 };
    let size = 2;
    start.next = end; start.previous = end;
    end.next = start; end.previous = start;

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
    // setup circular doubly linked list with 3 and 7
    let start: Node = { value: 3 };
    let end: Node = { value: 7 };
    let size = 2;
    start.next = end; start.previous = end;
    end.next = start; end.previous = start;

    let elf1 = start, elf2 = end;

    // keep going until enough recipes are made
    while (true) {
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

        // check if end of list has input
        let sliced = '';
        let check = end;
        for (let i = 0; i < input.length; i++) {
            if (check.previous !== undefined) {
                sliced = check.value.toString() + sliced;
                check = check.previous;
            }
        }

        if (sliced.includes(input.trim())) return size - input.length;
    }
};

export { part1, part2 };
