/**
 * aoc/puzzles/2020/day14/solution.js
 * 
 * ~~ Docking Data ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/23/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    let memory = {};
    let mask = '';

    // go through input and bit mask the values, then store in memory
    // i have to use string manip because bit operators in js only go to 32 bits :(
    input.split(/\n/g).forEach(line => {
        let [left, right] = line.split(/ = /);
        if (left == 'mask') mask = right;
        else {
            let address = parseInt(left.replace(/[\]]/g, '').split(/\[/g)[1]);
            // expand value to 36 bits for masking
            let value = parseInt(right).toString(2).padStart(36, '0');
            
            // if mask[i] is 'X', we ignore; else we set the bit to the mask[i]
            for (let i = mask.length - 1; i >= 0; i--) {
                if (mask[i] == '0') value = value.substring(0, i) + '0' + value.substring(i + 1);
                else if (mask[i] == '1') value = value.substring(0, i) + '1' + value.substring(i + 1);
            }
            memory[address] = parseInt(value, 2);
        }
    });

    // add all memory up
    return Object.values(memory).reduce((sum, num) => sum + num, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    let memory = {};
    let mask = '', unknown = [];

    // go through input and bit mask the values, then store in all address in memory
    input.split(/\n/g).forEach(line => {
        let [left, right] = line.split(/ = /);
        if (left == 'mask') {
            mask = right;
            
            // if mask[i] is 'X', it can be '0' or '1', so mark it
            unknown = [];
            for (let i = mask.length - 1; i >= 0; i--) {
                if (mask[i] == 'X') unknown.push(i);
            }
        } else {
            // expand address to 36 bits for masking
            let address = parseInt(left.replace(/[\]]/g, '').split(/\[/g)[1]).toString(2).padStart(36, '0');
            let value = parseInt(right);

            // if mask[i] is '0', unchanged; if mask[i] is '1', turn to '1'
            for (let i = mask.length - 1; i >= 0; i--) {
                if (mask[i] == '1') address = address.substring(0, i) + '1' + address.substring(i + 1);
            }

            // go through all possible addresses from unknown bits (possible = 2^(# of unknown))
            for (let i = 0; i < Math.pow(2, unknown.length); i++) {
                let newAddress = address.split('');
                const number = i.toString(2).padStart(unknown.length, '0');

                for (let j = 0; j < number.length; j++) {
                    newAddress[unknown[j]] = number[j];
                }
                memory[parseInt(newAddress.join(''), 2)] = value;
            }
        }
    });

    // add all memory up
    return Object.values(memory).reduce((sum, num) => sum + num, 0);
}

export { part1, part2 };