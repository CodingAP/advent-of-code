// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day05/solution.ts
 * 
 * ~~ If You Give A Seed A Fertilizer ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/6/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // seperate each group for parsing
    let groups = input.split(/\n\n/g);

    /**
     * seed numbers from input
     * 
     * @type {number[]}
     */
    let seeds = groups[0].split(/: /)[1].split(/ /g).map(num => parseInt(num));

    /**
     * mapping between ids
     * 
     * @type {Record<string, { destStart: number, sourceStart: number, range: number }[]>}
     */
    const maps = groups.slice(1).reduce((obj, map) => {
        let [name, ...locations] = map.split(/\n/g);
        obj[name.split(/ /)[0]] = locations.map(numbers => {
            let [destStart, sourceStart, range] = numbers.split(/ /g).map(num => parseInt(num));
            return { destStart, sourceStart, range }
        });
        return obj;
    }, {});

    // map each seed number to the mapping defined in the input
    Object.values(maps).forEach(mapping => {
        seeds = seeds.map(seed => {
            for (let i = 0; i < mapping.length; i++) {
                if (seed >= mapping[i].sourceStart && seed <= mapping[i].sourceStart + mapping[i].range) {
                    return (seed - mapping[i].sourceStart) + mapping[i].destStart;
                }
            }
            return seed;
        });
    });

    // find the smallest seed number after all the mappings
    return seeds.reduce((min, num) => Math.min(min, num), Infinity);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // seperate each group for parsing
    let groups = input.split(/\n\n/g);

    /**
     * seed numbers from input
     * 
     * @type {number[]}
     */
    let seeds = groups[0].split(/: /)[1].split(/ /g).map(num => parseInt(num));

    /**
     * mapping between ids
     * 
     * @type {Record<string, { destStart: number, sourceStart: number, range: number }[]>}
     */
    const maps = groups.slice(1).reduce((obj, map) => {
        let [name, ...locations] = map.split(/\n/g);
        obj[name.split(/ /)[0]] = locations.map(numbers => {
            let [destStart, sourceStart, range] = numbers.split(/ /g).map(num => parseInt(num));
            return { destStart, sourceStart, range }
        });
        return obj;
    }, {});

    /**
     * find the smallest id of the entire range using range intersectioms
     * 
     * @param {{ start: number, end: number }} range the range to be mapped
     */
    const findMinimum = range => {
        let unmapped = [structuredClone(range)], mapped = [];

        // go through all mappings to map the entire range
        Object.values(maps).forEach(mapping => {
            // go through mappings first, then map each range
            // putting mapped ranges in 'mapped' and unmapped in 'unmapped' to keep attempting to map
            for (let i = 0; i < mapping.length; i++) {
                let mappingRange = { start: mapping[i].sourceStart, end: mapping[i].sourceStart + mapping[i].range };
                let newUnmapped = [];
                unmapped.map(range => {
                    // check for range collision
                    if (range.start <= mappingRange.end && range.end >= mappingRange.start) {
                        // cutoff starting overlap if there
                        if (range.start < mappingRange.start) {
                            newUnmapped.push({ start: range.start, end: mappingRange.start - 1 });
                        }

                        // cutoff ending overlap if there
                        if (range.end > mappingRange.end) {
                            newUnmapped.push({ start: mappingRange.end, end: range.end - 1 });
                        }

                        // map the rest of the range
                        let mappedStart = (Math.max(range.start, mappingRange.start) - mapping[i].sourceStart) + mapping[i].destStart;
                        let mappedEnd = (Math.min(range.end, mappingRange.end) - mapping[i].sourceStart) + mapping[i].destStart;
                        mapped.push({ start: mappedStart, end: mappedEnd });
                    } else {
                        newUnmapped.push(structuredClone(range));
                    }
                });

                // set unmapped to all the created ones
                unmapped = structuredClone(newUnmapped);
            }

            // reset mapped and unmapped
            unmapped = [...structuredClone(mapped), ...structuredClone(unmapped)];
            mapped = [];
        });

        return unmapped.reduce((min, range) => Math.min(min, range.start), Infinity);
    }

    // find the smallest of all the ranges
    let min = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
        min = Math.min(min, findMinimum({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1 }));
    }
    return min;
}

export { part1, part2 };