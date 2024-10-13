/**
 * aoc/puzzles/2020/day16/solution.js
 * 
 * ~~ Ticket Translation ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/24/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const ticketInfo = input.split(/\n\n/)[0].split(/\n/).reduce((obj, line) => {
        let [name, ranges] = line.split(/: /);
        let [range1, range2] = ranges.split(/ or /).map(range => range.split(/-/).map(num => parseInt(num)));
        obj[name] = [{ start: range1[0], end: range1[1] }, { start: range2[0], end: range2[1] }];
        return obj;
    }, {});

    const otherTickets = input.split(/\n\n/)[2].split(/\n/).slice(1).map(line => line.split(/,/).map(num => parseInt(num)));

    return otherTickets.reduce((sum, ticket) => {
        for (let i = 0; i < ticket.length; i++) {
            let valid = false;
            Object.values(ticketInfo).forEach(ranges => {
                ranges.forEach(range => {
                    if (range.start <= ticket[i] && range.end >= ticket[i]) valid = true;
                });
            });
            if (!valid) sum += ticket[i];
        }
        return sum;
    }, 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    const ticketInfo = input.split(/\n\n/)[0].split(/\n/).reduce((obj, line) => {
        let [name, ranges] = line.split(/: /);
        let [range1, range2] = ranges.split(/ or /).map(range => range.split(/-/).map(num => parseInt(num)));
        obj[name] = [{ start: range1[0], end: range1[1] }, { start: range2[0], end: range2[1] }];
        return obj;
    }, {});

    const myTicket = input.split(/\n\n/)[1].split(/\n/)[1].split(/,/).map(num => parseInt(num));
    const otherTickets = input.split(/\n\n/)[2].split(/\n/).slice(1).map(line => line.split(/,/).map(num => parseInt(num)));

    let attributes = Object.keys(ticketInfo);
    let validColumns = new Array(attributes.length);
    for (let col = 0; col < attributes.length; col++) {
        for (let attribute of attributes) {
            let valid = true;
            for (let i = 0; i < otherTickets.length; i++) {
                let inRanges = false;
                ticketInfo[attribute].forEach(range => {
                    if (range.start <= otherTickets[i][col] && range.end >= otherTickets[i][col]) inRanges = true;
                });
                if (!inRanges) valid = false;
            }

            if (valid) {
                if (validColumns[col] == null) validColumns[col] = [];
                validColumns[col].push(attribute);
            }
        }
    }

    console.log(validColumns);

    return 0;
}

export { part1, part2 };