/**
 * aoc/puzzles/2023/day24/solution.js
 * 
 * ~~ Never Tell Me The Odds ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/23/2023
 */

/**
 * gets all possible combinations of elements with length k
 * 
 * @param {any[]} array list of elements to combine
 * @param {number} k length of set
 * @returns {any[][]}
 */
const combination = (array, k) => {
    let result = [];

    const combRecursive = (_array, _k, _i, _current) => {
        if (_current.length == k) result.push(_current);
        if (_current.length == k || _i == _array.length) return;

        combRecursive(_array, _k, _i + 1, [_array[_i], ..._current]);
        combRecursive(_array, _k, _i + 1, [..._current]);
    }

    combRecursive(array, k, 0, []);
    return result;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input and create equations to solve
    let hail = input.split(/\n/).map(line => {
        const [position, velocity] = line.split(/ @ /g).map(line => line.split(/, /g).map(num => parseInt(num)));
        
        // create line in form of ax + by = c
        const a = velocity[1];
        const b = -velocity[0];
        const c = position[0] * a + position[1] * b;

        return { position, velocity, a, b, c };
    });

    let min = 200000000000000, max = 400000000000000;
    let intersections = 0;

    // check each pair of hail stones
    combination(hail, 2).forEach(([hailA, hailB]) => {
        // if paths are not parallel
        if (((hailA.a * hailB.b) - (hailB.a * hailA.b)) != 0) {
            // calculate the intersection point
            const x = ((hailA.c * hailB.b) - (hailB.c * hailA.b)) / ((hailA.a * hailB.b) - (hailB.a * hailA.b));
            const y = (hailA.c - hailA.a * x) / hailA.b;
            
            // if intersection point is in range
            if (min <= x && x <= max && min <= y && y <= max) {
                // and paths actually contain intersection point
                if (Math.sign(x - hailA.position[0]) == Math.sign(hailA.velocity[0]) &&
                    Math.sign(y - hailA.position[1]) == Math.sign(hailA.velocity[1]) &&
                    Math.sign(x - hailB.position[0]) == Math.sign(hailB.velocity[0]) &&
                    Math.sign(y - hailB.position[1]) == Math.sign(hailB.velocity[1])) intersections++;
            }
        }
    });

    return intersections;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // comes from https://www.reddit.com/r/adventofcode/comments/18pnycy/comment/keqf8uq/
    // i have no idea how to do this part, so i'll just try to explain this solution to myself
    
    // parse input
    let hail = input.split(/\n/).map(line => {
        const [position, velocity] = line.split(/ @ /g).map(line => line.split(/, /g).map(num => parseInt(num)));
        return { position: { x: position[0], y: position[1], z: position[2] }, velocity: { x: velocity[0], y: velocity[1], z: velocity[2] } };
    });

    // check each pair of hail stones to find the velocity
    // to find them, we need to find stones that have the same velocity
    // then we can calculate the velocity of the rock that will intersect at both hail
    // because they have the same velocity, that limits what lines can be shot through them
    // we do a set intersection after every pair to see all possible
    // this should filter it down to one possible velocity
    // for my input, it was 99, 240, 188

    let potential = { x: null, y: null, z: null };
    combination(hail, 2).forEach(([hailA, hailB]) => {
        ['x', 'y', 'z'].forEach(axis => {
            // if velocities are the same
            if (hailA.velocity[axis] == hailB.velocity[axis]) {
                let newSet = new Set();

                // try all velocities from -1000 to 1000 (no velocity in input goes over or under that)
                // check to see if collision with both
                const difference = hailB.position[axis] - hailA.position[axis];
                for (let i = -1000; i <= 1000; i++) {
                    if (i == hailA.velocity[axis]) continue;

                    if (difference % (i - hailA.velocity[axis]) == 0) newSet.add(i);
                }

                // set intersection
                if (potential[axis] == null) potential[axis] = newSet;
                else potential[axis] = new Set([...potential[axis]].filter(i => newSet.has(i)));
            }
        });
    });

    // take velocity and find position to intersect all hail
    let velocity = { x: Array.from(potential.x).pop(), y: Array.from(potential.y).pop(), z: Array.from(potential.z).pop() };

    // find the intersection of the two lines offsetted by rock's velocity
    // we can use any two hail here because all will collide with the line 
    // there can be some rounding errors due to js not having bigger floats
    // however, the second and first work for my input
    const slopeA = (hail[1].velocity.y - velocity.y) / (hail[1].velocity.x - velocity.x);
    const slopeB = (hail[0].velocity.y - velocity.y) / (hail[0].velocity.x - velocity.x);
    const interceptA = hail[1].position.y - (slopeA * hail[1].position.x);
    const interceptB = hail[0].position.y - (slopeB * hail[0].position.x);
    const x = parseInt((interceptB - interceptA) / (slopeA - slopeB))
    const y = parseInt(slopeA * x + interceptA)
    const t = Math.round((x - hail[1].position.x) / (hail[1].velocity.x - velocity.x));
    const z = hail[1].position.z + (hail[1].velocity.z - velocity.z) * t;

    return x + y + z;
}

export { part1, part2 };