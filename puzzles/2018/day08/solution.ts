// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2018/day08/solution.ts
 *
 * ~~ Memory Maneuver ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

const parseData = data => {
    let node = { children: [], metadata: [] };
    let nodeCount = data[0];
    let metaDataCount = data[1];
    let forward = 2;

    let childrenNodes = data.slice(forward);
    while (nodeCount != 0) {
        let child = parseData(childrenNodes);
        forward += child.forward;
        childrenNodes = childrenNodes.slice(child.forward);

        node.children.push(child.node);
        nodeCount--;
    }

    node.metadata = data.slice(forward, forward + metaDataCount)
    forward += metaDataCount;

    return { node, forward };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let data = input.split(' ').map(num => parseInt(num));
    
    const addUpEntries = node => {
        let sum = node.metadata.reduce((acc, num) => acc + num, 0);
        node.children.forEach(child => {
            sum += addUpEntries(child);
        });
        return sum;
    }

    return addUpEntries(parseData(data).node);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let data = input.split(' ').map(num => parseInt(num));

    let findValue = node => {
        if (node.children.length == 0) return node.metadata.reduce((acc, num) => acc + num, 0);
    
        return node.metadata.reduce((acc, data) => {
            if ((data - 1) >= node.children.length) acc += 0;
            else acc += findValue(node.children[data - 1]);
            return acc;
        }, 0);
    }

    return findValue(parseData(data).node);
};

export { part1, part2 };
