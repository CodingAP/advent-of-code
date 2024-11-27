/**
 * puzzles/2017/day07/solution.ts
 *
 * ~~ Recursive Circus ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const tree = input.trim().split('\n').reduce<{ [key: string]: { weight: number, children: string[] }}>((obj, line) => {
        const [left, right] = line.split('->');
        const [name, weight] = left.replace(/[\(\)]/g, '').split(' ');

        let children: string[] = [];
        if (right !== undefined) {
            children = right.trim().split(', ');
        }

        obj[name] = { weight: parseInt(weight), children };
        return obj;
    }, {});

    const nodes = Object.keys(tree);
    for (let i = 0; i < nodes.length; i++) {
        let hasParent = false;
        for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;

            if (tree[nodes[j]].children.includes(nodes[i])) hasParent = true;
        }

        if (!hasParent) return nodes[i];
    }

    return '';
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const tree = input.trim().split('\n').reduce<{ [key: string]: { weight: number, children: string[] }}>((obj, line) => {
        const [left, right] = line.split('->');
        const [name, weight] = left.replace(/[\(\)]/g, '').split(' ');

        let children: string[] = [];
        if (right !== undefined) {
            children = right.trim().split(', ');
        }

        obj[name] = { weight: parseInt(weight), children };
        return obj;
    }, {});

    // recursively get the weight of the tree
    const getWeight = (node: string): number => {
        let weight = tree[node].weight;
        const childrenWeights = tree[node].children.map(node => getWeight(node));
        return weight + childrenWeights.reduce((sum, num) => sum + num, 0);
    }

    let fixedWeight = -1;
    const findDiscrepancy = (node: string): boolean => {
        const childrenWeights = tree[node].children.map(node => ({ node, weight:getWeight(node) }));
        const normal = childrenWeights[0].weight === childrenWeights[1].weight || childrenWeights[0].weight === childrenWeights[2].weight ? childrenWeights[0].weight : childrenWeights[1].weight;
        const oddOne = childrenWeights.find(child => child.weight !== normal);

        if (oddOne !== undefined) {
            // if child is discrepancy, return fix
            if (findDiscrepancy(oddOne.node)) fixedWeight = tree[oddOne.node].weight - (oddOne.weight - normal);
        } else {
            // if no discrepancy is found, current node has problem
            return true;
        }

        return false;
    }

    // search from the root
    findDiscrepancy(part1(input));
    return fixedWeight;
};

export { part1, part2 };
