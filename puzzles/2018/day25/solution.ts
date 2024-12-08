/**
 * puzzles/2018/day25/solution.ts
 *
 * ~~ Four-Dimensional Adventure ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/8/2024
 */

/**
 * calculates the manhattan distance between two points
 */
const distance = (a: number[], b: number[]) => a.reduce((sum, _, i) => sum + Math.abs(a[i] - b[i]), 0);

/**
 * disjoint set class with weights to find the mst using kruskal's algorithm 
 */
class DisjointSet {
    parent: number[];
    constructor(size: number) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
    }
  
    /**
     * get the set's defined node
     */
    find(a: number) {
        if (this.parent[a] !== a) this.parent[a] = this.find(this.parent[a]);
        return this.parent[a];
    }
  
    /**
     * combines the nodes defined by the edge
     */
    union(a: number, b: number) {
        const rootA = this.find(a);
        const rootB = this.find(b);
  
        if (rootA !== rootB) {
            if (rootA > rootB) this.parent[rootA] = rootB;
            else this.parent[rootB] = rootA;
        }
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const constellations = input.trim().split('\n').map(line => line.split(',').map(num => parseInt(num)));
    const set = new DisjointSet(constellations.length);
    
    for (let i = 0; i < constellations.length; i++) {
        for (let j = 0; j < constellations.length; j++) {
            if (i === j) continue;

            if (distance(constellations[i], constellations[j]) <= 3) set.union(i, j);
        }
    }
    
    let sets = new Array(constellations.length).fill(0);
    for (let i = 0; i < sets.length; i++) sets[set.find(i)]++;
    return sets.filter(set => set !== 0).length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    return '2018 DONE!';
};

export { part1, part2 };
