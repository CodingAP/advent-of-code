/**
 * puzzles/2021/day12/solution.ts
 *
 * ~~ Passage Pathing ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * runs a bfs to find all paths while allowing small caves to be visited once, with part 2's addition as well
 */
const findAllPaths = (graph: { [key: string]: string[] }, part2: boolean) => {
    const queue: { node: string, visited: { [key: string]: number } }[] = [{ node: 'start', visited: { start: 1 } }];

    let paths = 0;
    while (queue.length != 0) {
        const current = queue.shift();
        if (current === undefined) break;

        if (current.node === 'end') {
            paths++;
            continue;
        }

        for (let i = 0; i < graph[current.node].length; i++) {
            const big = graph[current.node][i].match(/[A-Z]+/g);
            if (graph[current.node][i] === 'start') continue;

            const newVisited = { ...current.visited };
            if (big === null) newVisited[graph[current.node][i]] = (newVisited[graph[current.node][i]] || 0) + 1;
            if (Object.values(newVisited).filter(num => num >= 3).length > 0) continue;

            // disallow one or two small caves to be visited twice depending on part
            if (Object.values(newVisited).filter(num => num === 2).length > (part2 ? 1 : 0)) continue;

            queue.push({ node: graph[current.node][i], visited: newVisited });
        }
    }
    return paths;
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse graph
    const graph = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [start, end] = line.split('-');
        if (obj[start] === undefined) obj[start] = [];
        if (obj[end] === undefined) obj[end] = [];

        obj[start].push(end);
        obj[end].push(start);
        return obj;
    }, {});

    return findAllPaths(graph, false);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse graph
    const graph = input.trim().split('\n').reduce<{ [key: string]: string[] }>((obj, line) => {
        const [start, end] = line.split('-');
        if (obj[start] === undefined) obj[start] = [];
        if (obj[end] === undefined) obj[end] = [];

        obj[start].push(end);
        obj[end].push(start);
        return obj;
    }, {});

    return findAllPaths(graph, true);
};

export { part1, part2 };
