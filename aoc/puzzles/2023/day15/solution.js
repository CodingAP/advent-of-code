/**
 * aoc/puzzles/2023/day15/solution.js
 * 
 * ~~ Lens Library ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/14/2023
 */

const hash = string => {
    return string.split('').reduce((hash, char) => {
        return ((hash + char.charCodeAt(0)) * 17) % 256
    }, 0)
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    return input.split(/,/g).reduce((sum, step) => sum + hash(step), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let boxes = new Array(256).fill(0).map(_ => new Array());
    input.split(/,/g).forEach(step => {
        if (step[step.length - 1] == '-') {
            let label = step.slice(0, -1);
            let index = hash(label);
            for (let i = boxes[index].length - 1; i >= 0; i--) {
                if (boxes[index][i].label == label) {
                    boxes[index].splice(i, 1);
                    break;
                }
            }
        } else {
            let [label, focal] = step.split(/=/g);
            let index = hash(label);
            let replaced = false;
            for (let i = boxes[index].length - 1; i >= 0; i--) {
                if (boxes[index][i].label == label) {
                    boxes[index][i].focal = focal;
                    replaced = true;
                    break;
                }
            }

            if (!replaced) boxes[index].push({ label, focal });
        }
    });

    return boxes.reduce((totalSum, array, boxNumber) => {
        return totalSum + array.reduce((sum, box, index) => {
            return sum + (boxNumber + 1) * (index + 1) * box.focal;
        }, 0)
    }, 0);
}

export { part1, part2 };