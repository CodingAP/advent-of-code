/**
 * puzzles/2024/day23/solution.ts
 *
 * ~~ LAN Party ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/22/2024
 */

// find all combinations of array with k entries
const combination = (array: string[], k: number) => {
    const result: string[][] = [];

    const helper = (_array: string[], _k: number, _i: number, _current: string[]) => {
        if (_current.length == k) result.push(_current);
        if (_current.length == k || _i == _array.length) return;

        helper(_array, _k, _i + 1, [_array[_i], ..._current]);
        helper(_array, _k, _i + 1, [..._current]);
    }

    helper(array, k, 0, []);
    return result;
}

// recursively find the set that can loop given a size time
// note: this function only works for size 3
const findTripleSet = (graph: { [key: string]: string[] }, path: string[]): string[][] => {
    const current = path.at(-1) as string;
    if (path.length === 4) {
        if (current === path[0]) return [path.slice(0, 3)];
        else return [];
    }

    // check for repeats
    if (new Set(path).size !== path.length) return [];

    const allSets: string[][] = [];
    for (let i = 0; i < graph[current].length; i++) {
        path.push(graph[current][i]);
        const sets = findTripleSet(graph, path);
        path.pop();

        if (sets.length > 0) allSets.push(...sets);
    }
    return allSets;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const graph = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [left, right] = line.split('-');
        if (obj[left] === undefined) obj[left] = [];
        if (obj[right] === undefined) obj[right] = [];

        obj[left].push(right);
        obj[right].push(left);
        return obj;
    }, {});

    let allSets = new Set<string>();
    Object.keys(graph).forEach(node => {
        allSets = allSets.union(new Set(findTripleSet(graph, [node]).map(set => set.sort().join(','))));
    });

    return Array.from(allSets).reduce((sum, set) => {
        if (set.split(',').find(node => node.startsWith('t')) !== undefined) sum++;
        return sum;
    }, 0);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const graph = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [left, right] = line.split('-');
        if (obj[left] === undefined) obj[left] = [];
        if (obj[right] === undefined) obj[right] = [];

        obj[left].push(right);
        obj[right].push(left);
        return obj;
    }, {});

    // the maximum connection size should be the one where all connections are connected to each other
    const MAX_LENGTH = Math.max(...Object.values(graph).map(array => array.length));

    // find the biggest set intersection between all connections
    let biggest: string[] = [];
    Object.keys(graph).forEach(node => {
        const possible = combination(graph[node].sort(), MAX_LENGTH - 1);
        for (let i = 0; i < possible.length; i++) {
            let common = new Set([node, ...graph[node]].sort());
            for (let j = 0; j < possible[i].length; j++) common = common.intersection(new Set([possible[i][j], ...graph[possible[i][j]]].sort()));
            if (common.size === MAX_LENGTH) biggest = Array.from(common);
        }
    });

    return biggest;
};

export { part1, part2 };
