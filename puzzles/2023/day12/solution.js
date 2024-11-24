/**
 * aoc/puzzles/2023/day12/solution.js
 * 
 * ~~ Hot Springs ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/11/2023
 */

/**
 * recursively counts all valid states and caches them to speed shit up
 * 
 * @param {{ state: string, groups: number[] }} arrangement current arrangement 
 * @param {{ current: number, groupIndex: number, groupCount: number }} state current state of recursion
 * @returns {number}
 */
const countStates = (arrangement, state, memoization) => {
    // check if we have seen this before
    if (memoization[`${state.current},${state.groupIndex},${state.groupCount}`] != null) return memoization[`${state.current},${state.groupIndex},${state.groupCount}`];

    // else count all possible
    let count = 0;

    // if we have reached the end of current arrangement state
    if (state.current == arrangement.state.length) {
        // if we have accounted all groups with no mistakes, it is valid
        if (arrangement.groups.length == state.groupIndex && state.groupCount == 0) count = 1;

        // if we are currently in the last group with no mistakes, it is valid
        else if (arrangement.groups.length - 1 == state.groupIndex && state.groupCount == arrangement.groups[state.groupIndex]) count = 1;

        memoization[`${state.current},${state.groupIndex},${state.groupCount}`] = count;
        return count;
    }

    // check the '.' cases (put '.' for '?' for now)
    if (arrangement.state[state.current] == '.' || arrangement.state[state.current] == '?') {
        if (state.groupCount == 0) {
            // we haven't started a new group yet, continue
            count += countStates(arrangement, { current: state.current + 1, groupIndex: state.groupIndex, groupCount: 0 }, memoization);
        } else if (state.groupIndex < arrangement.groups.length && state.groupCount == arrangement.groups[state.groupIndex]) {
            // we just finished a group and it matches expected group count from input
            count += countStates(arrangement, { current: state.current + 1, groupIndex: state.groupIndex + 1, groupCount: 0 }, memoization);
        }
        // stop checking '.' if these conditions aren't met
    }

    // check the '#' cases (put '#' for '?' for now)
    if (arrangement.state[state.current] == '#' || arrangement.state[state.current] == '?') {
        // add one to group count and continue search ('.' cases reset the state if needed)
        count += countStates(arrangement, { current: state.current + 1, groupIndex: state.groupIndex, groupCount: state.groupCount + 1 }, memoization);
    }

    memoization[`${state.current},${state.groupIndex},${state.groupCount}`] = count;
    return count;
}

/**
 * original code for part 1 of the advent of code puzzle when i solved it that night
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const originalPart1 = async input => {
    let arrangments = input.split(/\n/g).map(line => {
        let [state, groups] = line.split(/ /g);
        return { state, groups: groups.split(/,/g).map(num => parseInt(num)) };
    });

    return arrangments.reduce((sum, arrangement) => {
        console.log(ar)
        let allPossible = [];
        
        let unknown = [];
        for (let i = 0; i < arrangement.state.length; i++) {
            if (arrangement.state[i] == '?') unknown.push(i);
        }

        for (let i = 0; i < Math.pow(2, unknown.length); i++) {
            let newArrangement = arrangement.state.split('');
            const number = i.toString(2).padStart(unknown.length, '0');
            
            for (let j = 0; j < number.length; j++) {
                newArrangement[unknown[j]] = (number[j] == '0') ? '.' : '#';
            }
            allPossible.push(newArrangement.join(''));
        }

        for (let i = 0; i < allPossible.length; i++) {
            let groups = [];
            let current = 0;
            for (let j = 0; j < allPossible[i].length; j++) {
                if (allPossible[i][j] == '#') {
                    current++;
                } else if (current != 0) {
                    groups.push(current);
                    current = 0;
                }
            }
            if (current != 0) groups.push(current);

            if (JSON.stringify(groups) == JSON.stringify(arrangement.groups)) sum++;
        }

        return sum;
    }, 0);
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse input
    const arrangements = input.split(/\n/g).map(line => {
        let [state, groups] = line.split(/ /g);
        return { state, groups: groups.split(/,/g).map(num => parseInt(num)) };
    });

    // add all counts up
    return arrangements.reduce((sum, arrangement) => sum + countStates(arrangement, { current: 0, groupIndex: 0, groupCount: 0 }, {}), 0);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    // parse input
    const count = 5;
    const arrangements = input.split(/\n/g).map(line => {
        let [state, groups] = line.split(/ /g);
        return { state: new Array(count).fill(state).join('?'), groups: new Array(count).fill(0).map(_ => { return groups.split(/,/g).map(num => parseInt(num)); }).flat() };
    });

    // add all counts up
    return arrangements.reduce((sum, arrangement) => sum + countStates(arrangement, { current: 0, groupIndex: 0, groupCount: 0 }, {}), 0);
}

export { part1, part2 };