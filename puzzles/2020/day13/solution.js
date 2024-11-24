/**
 * aoc/puzzles/2020/day13/solution.js
 * 
 * ~~ Shuttle Search ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/22/2023
 */

const extendedEuclid = (x, y) => {
    let q, x0 = 1, x1 = 0, y0 = 0, y1 = 1;
    while (y > 0) {
        let q = Math.floor(x / y);
        let temp = x % y;
        x = y;
        y = temp;

        temp = x0;
        x0 = x1;
        x1 = temp - q * x1;

        temp = y0;
        y0 = y1;
        y1 = temp - q * y1;
    }

    return { gcd: q, coeff1: x0, coeff2: y0 };
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const minutes = parseInt(input.split(/\n/g)[0]);
    const buses = input.split(/\n/g)[1].split(/,/g).map(bus => {
        if (bus != 'x') return parseInt(bus);
        return null;
    });

    // find smallest waiting time for all valid buses
    // multiply waiting time and bus id
    let smallest = Infinity, id = -1;
    buses.filter(bus => bus != null).forEach(bus => {
        // returns how many minutes to wait for next stop
        const waiting = bus - minutes % bus; 
        if (waiting < smallest) {
            smallest = waiting;
            id = bus;
        }
    });
    return smallest * id;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input and setup chinese remainder theorem
    let modulos = [], remainders = [];
    input.split(/\n/g)[1].split(/,/g).forEach((bus, index) => {
        if (bus != 'x') {
            bus = parseInt(bus);
            modulos.push(BigInt(bus));
            remainders.push(BigInt((bus - index) % bus));
        }
    });

    // do crt
    const product = modulos.reduce((mul, num) => mul * num, 1n);
    
    return modulos.reduce((sum, mod, i) => {
        const p = product / mod;
        
        // find multiplicative inverse
        let inverse = 1n;
        for (let i = 1n; i <= mod; i++) {
            if ((p * i) % mod == 1) inverse = i;
        }

        return sum + (remainders[i] * inverse * p);
    }, 0n) % product;
}

export { part1, part2 };