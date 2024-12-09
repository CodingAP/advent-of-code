/**
 * puzzles/2021/day03/solution.ts
 *
 * ~~ Binary Diagnostic ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const binary = input.split('\n');
    
    // calculate gamma/epsilon from the most/least common digits in each column
    let gamma = '', epsilon = '';
    for (let j = 0; j < binary[0].length; j++) {
        let ones = 0, zeros = 0;
        
        for (let i = 0; i < binary.length; i++) {
            if (binary[i][j] === '1') ones++;
            else zeros++;
        }

        gamma += (ones > zeros) ? '1' : '0';
        epsilon += (ones > zeros) ? '0' : '1';
    }
    
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let oxygen = input.split('\n');
    for (let j = 0; j < oxygen[0].length; j++) {
        let ones = 0, zeros = 0;

        // find most common in column
        for (let i = 0; i < oxygen.length; i++) {
            if (oxygen[i][j] == '1') ones++;
            else zeros++;
        }

        // filter oxygen down until one is left
        if (ones >= zeros) oxygen = oxygen.filter(element => element[j] === '1');
        else oxygen = oxygen.filter(element => element[j] === '0');

        if (oxygen.length === 1) break;
    }

    let carbon = input.split('\n');;
    for (let j = 0; j < carbon[0].length; j++) {
        let ones = 0, zeros = 0;

        // find most common in column
        for (let i = 0; i < carbon.length; i++) {
            if (carbon[i][j] == '1') ones++;
            else zeros++;
        }

        // filter carbon down until one is left
        if (ones < zeros) carbon = carbon.filter(element => element[j] === '1');
        else carbon = carbon.filter(element => element[j] === '0');

        if (carbon.length == 1) break;
    }
    
    return parseInt(oxygen[0], 2) * parseInt(carbon[0], 2);
};

export { part1, part2 };
