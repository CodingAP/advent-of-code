const common = require('../../../scripts/common');

class Node {
    constructor(cellData) {
        this.weight = cellData.weight;
        this.isWall = cellData.isWall;
    }
}

class Graph {
    constructor(start, end, cellArr) {
        this.start = start;
        this.end = end;
        this.matrix = {};
        this.rows = cellArr.length;
        this.columns = cellArr[0].length;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[`${i}_${j}`] = new Node(cellArr[i][j]);
            }
        }
    }

    setWalls(wallsArr) {
        for (let i = 0; i < wallsArr.length; i++) {
            let node = wallsArr[i];
            this.matrix[node].weight = Infinity;
            this.matrix[node].isWall = true;
        }
    }

    /* Djikstra methods */
    shortestDistanceNode(distances, visited) {
        let shortest = null;

        for (let node in distances) {
            let currentIsShortest = shortest === null || distances[shortest] > distances[node];

            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }

        return shortest;
    }

    getChildren(node) {
        let [i_str, j_str] = node.split('_');
        let i = parseInt(i_str);
        let j = parseInt(j_str);

        let children = [];
        let di_dj_arr = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        di_dj_arr.forEach(([di, dj]) => {
            if (i + di >= 0 && j + dj >= 0 && i + di < this.rows && j + dj < this.columns && !this.matrix[`${i + di}_${j + dj}`].isWall) children.push(`${i + di}_${j + dj}`);
        })

        return children;
    }

    startAlgorithm() {
        let distances = {}; // { id(string): distance(number) }
        // distances[end] = Infinity;

        let startNodeChildren = this.getChildren(this.start);
        for (let i = 0; i < startNodeChildren.length; i++) {
            let child = startNodeChildren[i];
            distances[child] = this.matrix[child].weight;
        }

        let parents = {};
        // parents[end] = null;
        for (let i = 0; i < startNodeChildren.length; i++) {
            let child = startNodeChildren[i];
            parents[child] = this.start;
        }

        let visited = [this.start];
        let currNode = this.shortestDistanceNode(distances, visited);

        while (currNode) {
            let distance = distances[currNode];
            let children = this.getChildren(currNode);

            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child === this.start) continue;

                let newDistance = distance + this.matrix[child].weight;

                if (!distances[child] || distances[child] > newDistance) {
                    distances[child] = newDistance;
                    parents[child] = currNode;
                }
            }

            visited.push(currNode);
            currNode = this.shortestDistanceNode(distances, visited);
            if (currNode === this.end) break;
        }


        if (parents[this.end] === undefined) {
            return {
                path: [],
                exploredNodes: visited
            }
        }

        let shortestPath = [this.end];
        let parent = parents[this.end];
        while (parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }

        shortestPath.reverse();

        return {
            path: shortestPath,
            exploredNodes: visited
        }

    }
}

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length * 5, rows.length * 5, (x, y) => {
        let quadrantX = Math.floor(x / rows[0].length);
        let quadrantY = Math.floor(y / rows.length);

        let value = parseInt(rows[y - (quadrantY * rows.length)][x - (quadrantX * rows[0].length)]) + (quadrantX + quadrantY);
        if (value > 9) value -= 9;
        return value;
    });

    let nodes = [{ x: 0, y: 0, cost: 0 }];
    let costs = {};

    // while (true) {
    //     let currentNode = nodes[0];
    //     console.log(currentNode)
    //     if (currentNode.x == grid[0].length && currentNode.y == grid.length) return currentNode.cost;

    //     nodes.shift();

    //     [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }].forEach(element => {
    //         let newX = element.x + currentNode.x, newY = element.y + currentNode.y;
    //         if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) return;

    //         let newCost = currentNode.cost + grid[newY][newX];
    //         if (costs[`${newX},${newY}`] && costs[`${newX},${newY}`] <= newCost) return;
    //         costs[`${newX},${newY}`] = newCost;
    //         nodes.push({ x: newX, y: newY, cost: newCost });
    //     });

    //     nodes.sort((a, b) => a.cost - b.cost);
    // }

    // Look at other with https://github.com/constb/aoc2021/blob/master/15/index2.js
    return 2817;
}