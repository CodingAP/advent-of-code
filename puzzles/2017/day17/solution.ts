/**
 * puzzles/2017/day17/solution.ts
 *
 * ~~ Spinlock ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

interface Node {
    value: number;
    next: Node | null;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // initialize circular linked list
    const list: Node = { value: 0, next: null };
    list.next = list;

    let current: Node = list;

    for (let i = 1; i <= 2017; i++) {
        for (let j = 0; j < parseInt(input); j++) {
            if (current.next !== null) current = current.next;
        }

        const newNext = { value: i, next: current.next };
        current.next = newNext;
        current = newNext;
    }

    // the current node will be 2017, so we get the next value
    return current.next?.value;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let next = -1;
    let current = 0;

    // we can now just keep track of what gets inserted at index 0
    for (let i = 1; i <= 50000000; i++) {
        current = (current + parseInt(input) + 1) % i;
        if (current === 0) {
            next = i;
        }
    }

    return next;
};

export { part1, part2 };
