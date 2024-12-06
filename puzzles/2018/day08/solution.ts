/**
 * puzzles/2018/day08/solution.ts
 *
 * ~~ Memory Maneuver ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/1/2024
 */

interface Node {
    children: Node[];
    metadata: number[];
}

const parseData = (data: number[]) => {
    const node: Node = { children: [], metadata: [] };
    let nodeCount = data[0];
    const metadataCount = data[1];
    let forward = 2;

    let childrenNodes = data.slice(forward);
    while (nodeCount != 0) {
        let child = parseData(childrenNodes);
        forward += child.forward;
        childrenNodes = childrenNodes.slice(child.forward);

        node.children.push(child.node);
        nodeCount--;
    }

    node.metadata = data.slice(forward, forward + metadataCount)
    forward += metadataCount;

    return { node, forward };
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const data = input.split(' ').map(num => parseInt(num));
    
    const countEntries = (node: Node): number => {
        const metadataSum = node.metadata.reduce((sum, num) => sum + num, 0);
        return node.children.reduce((sum, child) => sum + countEntries(child), metadataSum);
    }

    return countEntries(parseData(data).node);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let data = input.split(' ').map(num => parseInt(num));

    const findValue = (node: Node): number => {
        if (node.children.length == 0) return node.metadata.reduce((sum, num) => sum + num, 0);
        return node.metadata.reduce((sum, data) => sum + (((data - 1) >= node.children.length) ? 0 : findValue(node.children[data - 1])), 0);
    }

    return findValue(parseData(data).node);
};

export { part1, part2 };
