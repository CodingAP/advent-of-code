// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2022/day20/solution.ts
 * 
 * ~~ Grove Positioning System ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 11/24/2024
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    let numbers = input.split('\n').map(num => parseInt(num));

    let first = { index: 0, value: numbers[0], next: null, previous: null };
    let current = first;
    for (let i = 1; i < numbers.length; i++) {
        let node = { index: i, value: numbers[i], next: null, previous: current };
        current.next = node;
        current = node;
    }
    current.next = first;
    first.previous = current;
    current = current.next;

    for (let i = 0; i < numbers.length; i++) {
        let node = current;
        while (node.index != i) node = node.next;
        
        if (node.value > 0) {
            for (let move = 0; move < node.value; move++) {
                let index = node.index, value = node.value;
                node.index = node.next.index;
                node.value = node.next.value;
                node.next.index = index;
                node.next.value = value;
                node = node.next;
            }
        } else if (node.value < 0) {
            for (let move = 0; move < Math.abs(node.value); move++) {
                let index = node.index, value = node.value;
                node.index = node.previous.index;
                node.value = node.previous.value;
                node.previous.index = index;
                node.previous.value = value;
                node = node.previous;
            }
        }
    }

    let sum = 0;
    while (current.value != 0) current = current.next;
    for (let grove = 0; grove < 3; grove++) {
        for (let i = 0; i < 1000; i++) current = current.next;
        sum += current.value;
    }
    
    return sum;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    let numbers = input.split('\n').map(num => parseInt(num) * 811589153);

    let mixer = numbers.map((num, index) => {
        return { number: num, index };
    });

    for (let mixing = 0; mixing < 10; mixing++) {
        for (let i = 0; i < numbers.length; i++) {
            let index = mixer.findIndex(num => num.index == i);
            mixer.splice(index, 1);
            mixer.splice((index + numbers[i] + ((numbers[i] >= 0) ? 0 : mixer.length)) % mixer.length, 0, { number: numbers[i], index: i });
        }
    }

    let zeroIndex = mixer.findIndex(num => num.number == 0);
    return mixer[(zeroIndex + 1000) % mixer.length].number + mixer[(zeroIndex + 2000) % mixer.length].number + mixer[(zeroIndex + 3000) % mixer.length].number;
}

export { part1, part2 };