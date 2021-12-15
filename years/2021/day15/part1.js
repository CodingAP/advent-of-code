const common = require('../../../scripts/common');

class NodeElement {

    constructor(row, col, difficulty, isWall, aStarInstance) {
        this.row = row
        this.col = col
        this.wall = isWall
        this.difficulty = difficulty
        this.through = ''
        this.heuristic = Infinity
        this.eucledianDistance = Infinity
        this.difficultySums = ''
        this.aStar = aStarInstance
        this.neighbours = []
    }



    heuristicCalculation(node) {
        this.eucledianDistance = this.aStar.eucledianDistance(this)
        let difficultySums
        difficultySums = this.difficulty + Number(node.difficultySums)
        if (this.difficultySums === '') {
            this.difficultySums = difficultySums
            this.through = node
        } else if (this.difficultySums > difficultySums) {
            this.difficultySums = difficultySums
            this.through = node
        } else {

        }


        return this.heuristic = this.eucledianDistance + this.difficultySums
    }

    neighboursCalculation(openQueue) {
        let neighbours = []
        let enqueuedNode
        let newNode

        if (this.row < this.aStar.rows - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row + 1 && node.col === this.col)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row + 1 && node.col === this.col))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.col < this.aStar.columns - 1) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col + 1)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col + 1))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.row > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row - 1 && node.col === this.col)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row - 1 && node.col === this.col))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        if (this.col > 0) {
            enqueuedNode = openQueue.find(node => node.row === this.row && node.col === this.col - 1)
            if (!enqueuedNode) {
                newNode = this.aStar.nodes.find(node => (node.row === this.row && node.col === this.col - 1))
                if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
                    newNode.heuristicCalculation(this)
                    neighbours.push(newNode)
                }
            } else {
                enqueuedNode.heuristicCalculation(this)
            }
        }
        return neighbours

    }
}

class AStar {
    constructor(start_str, end_str, grid) {
        let start = [parseInt(start_str.split('_')[0]), parseInt(start_str.split('_')[1])]
        let end = [parseInt(end_str.split('_')[0]), parseInt(end_str.split('_')[1])]


        this.grid = grid
        this.rows = this.grid.length
        this.columns = this.grid[0].length
        this.nodes = []
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (i === start[0] && j === start[1]) {
                    this.start = new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this)
                    this.nodes.push(this.start)
                } else if (i === end[0] && j === end[1]) {
                    this.end = new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this)
                    this.nodes.push(this.end)
                } else {
                    this.nodes.push(new NodeElement(i, j, grid[i][j].weight, grid[i][j].isWall, this))
                }
            }
        }
        this.openQueue = [this.start]
        this.alreadyChecked = []

        this.optimalPath = []
    }

    startAlgorithm() {
        this.openQueue[0].heuristicCalculation(this.openQueue[0])

        while (this.openQueue.length > 0) {
            if (this.openQueue[0] === this.end) {
                break
            }

            let neighbours = this.openQueue[0].neighboursCalculation(this.openQueue)
            let queue = this.openQueue
            this.alreadyChecked.push(queue.shift())
            let newQueue = queue.concat(neighbours)
            let sortedNeighbours = newQueue.sort(function (a, b) { return a.heuristic - b.heuristic })
            this.openQueue = sortedNeighbours
        }
        if (this.openQueue.length !== 0) { this.retrieveOptimalPath(this.openQueue[0]) }

        let optimalPath = this.optimalPath
        let alreadyChecked = this.alreadyChecked
        let path = optimalPath.map(node => { return `${node.row}_${node.col}` })
        let exploredNodes = alreadyChecked.map(node => { return `${node.row}_${node.col}` })
        if (path.length) {
            // experimental
            // console.log(this.end.row, this.end.col);
            exploredNodes.push(`${this.end.row}_${this.end.col}`)
        }
        path.reverse();

        return {
            path,
            exploredNodes
        }
    }


    retrieveOptimalPath(node) {
        this.optimalPath.push(node)
        if (node.through !== this.start) {
            this.retrieveOptimalPath(node.through)
        } else {
            this.optimalPath.push(this.start)
        }
    }



    eucledianDistance(node) {
        return Math.sqrt(Math.pow(Math.abs(node.row - this.end.row), 2) + Math.pow(Math.abs(node.col - this.end.col), 2))
    }
}

module.exports = input => {
    let rows = input.split('\n');
    let grid = common.create2DArray(rows[0].length, rows.length, (x, y) => {
        return parseInt(rows[y][x]);
    });
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x] = { weight: grid[y][x], isWall: false };
        }
    }

    let risk = 0;
    let path = new AStar('0_0', `${rows[0].length - 1}_${rows.length - 1}`, grid).startAlgorithm().path;

    path.slice(1).forEach(element => {
        let tokens = element.split('_');
        risk += grid[parseInt(tokens[0])][parseInt(tokens[1])].weight;
    });

    
    return risk;
}