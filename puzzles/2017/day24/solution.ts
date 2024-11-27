// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2017/day24/solution.ts
 *
 * ~~ Electromagnetic Moat ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let ports = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split('/').map(num => parseInt(num));
        array.push({ left, right });
        return array;
    }, []);

    let generateBridge = (start, portsLeft) => {
        let allPorts = [];
        for (let i = 0; i < portsLeft.length; i++) {
            if (portsLeft[i].left != start && portsLeft[i].right != start) continue;
            
            allPorts.push([portsLeft[i]]);
            let copy = JSON.parse(JSON.stringify(portsLeft));
            copy.splice(i, 1);

            let bridge = (portsLeft[i].left == start) ? generateBridge(portsLeft[i].right, copy) : generateBridge(portsLeft[i].left, copy); 
            bridge.forEach(element => {
                allPorts.push([portsLeft[i], ...element]);
            });
        }
        return allPorts;
    }

    let allPorts = generateBridge(0, ports);
    return allPorts.reduce((highest, array) => {
        return Math.max(highest, array.reduce((acc, port) => acc + port.left + port.right, 0));
    }, -Infinity);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let ports = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split('/').map(num => parseInt(num));
        array.push({ left, right });
        return array;
    }, []);

    let generateBridge = (start, portsLeft) => {
        let allPorts = [];
        for (let i = 0; i < portsLeft.length; i++) {
            if (portsLeft[i].left != start && portsLeft[i].right != start) continue;

            allPorts.push([portsLeft[i]]);
            let copy = JSON.parse(JSON.stringify(portsLeft));
            copy.splice(i, 1);

            let bridge = (portsLeft[i].left == start) ? generateBridge(portsLeft[i].right, copy) : generateBridge(portsLeft[i].left, copy);
            bridge.forEach(element => {
                allPorts.push([portsLeft[i], ...element]);
            });
        }
        return allPorts;
    }

    let allPorts = generateBridge(0, ports);
    let longestLength = allPorts.reduce((length, array) => {
        return Math.max(length, array.length);
    }, -Infinity);

    return allPorts.filter(array => array.length == longestLength).reduce((highest, array) => {
        return Math.max(highest, array.reduce((acc, port) => acc + port.left + port.right, 0));
    }, -Infinity)
};

export { part1, part2 };
