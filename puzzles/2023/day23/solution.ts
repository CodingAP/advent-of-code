// @ts-nocheck previous years was written in javascript, so disable it here

/**
 * puzzles/2023/day23/solution.ts
 * 
 * ~~ A Long Walk ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/22/2023
 */

const findLongestPath = (graph, point, path, end) => {
    let max = -Infinity;

    // if we have reached the end, check the distance it took
    if (point == end) {
        let pointsInPath = Array.from(path);
        let distance = 0;
        for (let i = 0; i < pointsInPath.length - 1; i++) {
            distance += graph[pointsInPath[i]][pointsInPath[i + 1]];
        }
        max = Math.max(max, distance);
    }
    
    // search all neighbors for paths
    Object.keys(graph[point]).forEach(p => {
        if (!path.has(p)) max = Math.max(max, findLongestPath(graph, p, structuredClone(path).add(p), end));
    });
    
    return max;
}

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 1
 */
const part1 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));
    
    // create list of points and put starting and ending points in there
    const start = { x: grid[0].indexOf('.'), y: 0 };
    const end = { x: grid[grid.length - 1].indexOf('.'), y: grid.length - 1 };
    let points = [start, end];

    // find all points that are at crossroads
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') continue;

            // find all neighbors that is not '#' 
            let neighbors = 0;
            [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(neighbor => {
                if (x + neighbor.x >= 0 && x + neighbor.x < grid[y].length && y + neighbor.y >= 0 && y + neighbor.y < grid[y].length &&
                    grid[y + neighbor.y][x + neighbor.x] != '#') {
                    neighbors++;
                }
            });
            if (neighbors >= 3) points.push({ x, y });
        }
    }

    // initialize our reduced graph
    let graph = points.reduce((obj, point) => {
        obj[`${point.x},${point.y}`] = {};
        return obj;
    }, {});

    /**
     * does a dfs to find contract all edges to a single number for an easier dfs to search after
     * 
     * @param {{ x: number, y: number }} point current point to search
     * @param {Set<string>} path previously visited points
     * @returns {Record<string, number>}
     */
    const edgeContraction = (point, path) => {
        let distances = {};

        // if we have reached a graph point, stop and record distance
        if (path.size > 1 && graph[`${point.x},${point.y}`] != null) {
            distances[`${point.x},${point.y}`] = path.size - 1;
            return distances;
        }

        // search all neighbors, but don't allow to go up slope
        [{ x: 1, y: 0, bad: '<' }, { x: -1, y: 0, bad: '>' }, { x: 0, y: 1, bad: '^' }, { x: 0, y: -1, bad: 'v' }].forEach(neighbor => {
            let newX = point.x + neighbor.x;
            let newY = point.y + neighbor.y;
            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length &&
                grid[newY][newX] != '#' && grid[newY][newX] != neighbor.bad &&
                !path.has(`${newX},${newY}`)) {
                distances = { ...distances, ...edgeContraction({ x: newX, y: newY }, structuredClone(path).add(`${newX},${newY}`)) };
            }
        });

        return distances;
    }

    // do dfs for each point to find all connecting points
    points.forEach(point => {
        graph[`${point.x},${point.y}`] = edgeContraction(point, new Set([`${point.x},${point.y}`]));
    });

    // do another dfs to find the longest path in this contracted graph
    return findLongestPath(graph, `${start.x},${start.y}`, new Set([`${start.x},${start.y}`]), `${end.x},${end.y}`);
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {string | number} the result of part 2
 */
const part2 = input => {
    // parse input
    const grid = input.split(/\n/).map(line => line.split(''));

    // create list of points and put starting and ending points in there
    const start = { x: grid[0].indexOf('.'), y: 0 };
    const end = { x: grid[grid.length - 1].indexOf('.'), y: grid.length - 1 };
    let points = [start, end];

    // find all points that are at crossroads
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') continue;

            // find all neighbors that is not '#' 
            let neighbors = 0;
            [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(neighbor => {
                if (x + neighbor.x >= 0 && x + neighbor.x < grid[y].length && y + neighbor.y >= 0 && y + neighbor.y < grid[y].length &&
                    grid[y + neighbor.y][x + neighbor.x] != '#') {
                    neighbors++;
                }
            });
            if (neighbors >= 3) points.push({ x, y });
        }
    }

    // initialize our reduced graph
    let graph = points.reduce((obj, point) => {
        obj[`${point.x},${point.y}`] = {};
        return obj;
    }, {});

    /**
     * does a dfs to find contract all edges to a single number for an easier dfs to search after
     * 
     * @param {{ x: number, y: number }} point current point to search
     * @param {Set<string>} path previously visited points
     * @returns {Record<string, number>}
     */
    const edgeContraction = (point, path) => {
        let distances = {};

        // if we have reached a graph point, stop and record distance
        if (path.size > 1 && graph[`${point.x},${point.y}`] != null) {
            distances[`${point.x},${point.y}`] = path.size - 1;
            return distances;
        }

        // search all neighbors, ignoring slope
        [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(neighbor => {
            let newX = point.x + neighbor.x;
            let newY = point.y + neighbor.y;
            if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length &&
                grid[newY][newX] != '#' &&
                !path.has(`${newX},${newY}`)) {
                distances = { ...distances, ...edgeContraction({ x: newX, y: newY }, structuredClone(path).add(`${newX},${newY}`)) };
            }
        });

        return distances;
    }

    // do dfs for each point to find all connecting points
    points.forEach(point => {
        graph[`${point.x},${point.y}`] = edgeContraction(point, new Set([`${point.x},${point.y}`]));
    });

    // do another dfs to find the longest path in this contracted graph
    return findLongestPath(graph, `${start.x},${start.y}`, new Set([`${start.x},${start.y}`]), `${end.x},${end.y}`);
}

export { part1, part2 };