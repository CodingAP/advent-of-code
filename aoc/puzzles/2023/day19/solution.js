/**
 * aoc/puzzles/2023/day19/solution.js
 * 
 * ~~ Aplenty ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/18/2023
 */

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    // parse the workflows
    const workflows = input.split(/\n\n/g)[0].split(/\n/g).reduce((obj, line) => {
        let [name, rules] = line.replace(/[}]/g, '').split(/{/g);
        rules = rules.split(/,/);
        // turn all rules before the final one into iterable objects
        obj[name] = rules.slice(0, -1).map(rule => {
            let [condition, send] = rule.split(/:/g);
            if (condition.includes('<')) return { type: 'LESSTHAN', left: condition.split(/</g)[0], right: parseInt(condition.split(/</g)[1]), value: send }
            else return { type: 'GREATERTHAN', left: condition.split(/>/g)[0], right: parseInt(condition.split(/>/g)[1]), value: send }
        });
        obj[name].push({ type: 'FINAL', value: rules[rules.length - 1] });
        return obj;
    }, {});

    /**
     * recursive function that checks if the values are accepted or not through all the workflows it goes through
     * 
     * @param {{ x: number, m: number, a: number, s: number }} values values to check
     * @param {string} workflow current workflow
     * @returns {boolean}
     */
    const checkValues = (values, workflow) => {
        // go through all rules of workflow
        for (let i = 0; i < workflows[workflow].length; i++) {
            // if condition is [x|m|a|s]<[num]
            if (workflows[workflow][i].type == 'LESSTHAN') {
                if (values[workflows[workflow][i].left] < workflows[workflow][i].right) {
                    if (workflows[workflow][i].value.match(/[AR]/)) return (workflows[workflow][i].value == 'A');
                    else return checkValues(values, workflows[workflow][i].value);
                }
            // if condition is [x|m|a|s]>[num]
            } else if (workflows[workflow][i].type == 'GREATERTHAN') {
                if (values[workflows[workflow][i].left] > workflows[workflow][i].right) {
                    if (workflows[workflow][i].value.match(/[AR]/)) return (workflows[workflow][i].value == 'A');
                    else return checkValues(values, workflows[workflow][i].value);
                }
            // if no condition is met
            } else {
                if (workflows[workflow][i].value.match(/[AR]/)) return (workflows[workflow][i].value == 'A');
                else return checkValues(values, workflows[workflow][i].value);
            }
        }
    }

    // find all part numbers that work by trying worflow 'in'
    return input.split(/\n\n/g)[1].split(/\n/g).reduce((sum, line) => {
        let parts = 0;
        
        // turn input line to object
        let values = line.replace(/[{}]/g, '').split(/,/).reduce((obj, value) => {
            let [name, number] = value.split(/=/g);
            obj[name] = parseInt(number);
            parts += parseInt(number);
            return obj;
        }, {});

        // if values are accepted, add all parts to answer 
        if (checkValues(values, 'in')) sum += parts;
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
    // parse the workflows
    const workflows = input.split(/\n\n/g)[0].split(/\n/g).reduce((obj, line) => {
        let [name, rules] = line.replace(/[}]/g, '').split(/{/g);
        rules = rules.split(/,/);
        // turn all rules before the final one into iterable objects
        obj[name] = rules.slice(0, -1).map(rule => {
            let [condition, send] = rule.split(/:/g);
            if (condition.includes('<')) return { type: 'LESSTHAN', left: condition.split(/</g)[0], right: parseInt(condition.split(/</g)[1]), value: send }
            else return { type: 'GREATERTHAN', left: condition.split(/>/g)[0], right: parseInt(condition.split(/>/g)[1]), value: send }
        });
        obj[name].push({ type: 'FINAL', value: rules[rules.length - 1] });
        return obj;
    }, {});

    // do a depth first search to find all ranges that are accepted
    let accepted = [];
    let queue = [{ x: { start: 1, end: 4000 }, m: { start: 1, end: 4000 }, a: { start: 1, end: 4000 }, s: { start: 1, end: 4000 }, workflow: 'in' }];
    while (queue.length != 0) {
        let current = queue.shift();
        for (let rule of workflows[current.workflow]) {
            // split the range depending of the condition and add it back to queue
            // any ranges that end in acceptence gets added to seperate list
            if (rule.type == 'LESSTHAN') {
                let newState = structuredClone(current);
                newState[rule.left].end = rule.right - 1;
                current[rule.left].start = rule.right;
                newState.workflow = rule.value;
                
                if (rule.value == 'A') accepted.push(newState)
                else if (rule.value != 'R') queue.push(newState)
            } else if (rule.type == 'GREATERTHAN') {
                let newState = structuredClone(current);
                newState[rule.left].start = rule.right + 1;
                current[rule.left].end = rule.right;
                newState.workflow = rule.value;
                
                if (rule.value == 'A') accepted.push(newState)
                else if (rule.value != 'R') queue.push(newState)
            } else {
                let newState = structuredClone(current);
                newState.workflow = rule.value;
                
                if (rule.value == 'A') accepted.push(newState)
                else if (rule.value != 'R') queue.push(newState)
            }
        }
    }

    // multiply the ranges and add to find total ranges
    let sum = 0;
    for (let state of accepted) {
        sum += ['x', 'm', 'a', 's'].reduce((mul, value) => {
            mul *= state[value].end - state[value].start + 1;
            return mul;
        }, 1);
    }
    return sum;
}

export { part1, part2 };