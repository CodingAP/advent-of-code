/**
 * puzzles/2017/day12/solution.ts
 *
 * ~~ Digital Plumber ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/26/2024
 */

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
    find(a: number): number {
        if (this.parent[a] !== a) this.parent[a] = this.find(this.parent[a]);
        return this.parent[a];
    }
  
    /**
     * combines the nodes defined by the edge
     */
    union(a: number, b: number) {
        a = this.find(a);
        b = this.find(b);
  
        if (a !== b) {
            if (a > b) this.parent[a] = b;
            else this.parent[b] = a;
        }
    }
  
    /**
     * returns if an edge is already connected in the set
     */
    connected(a: number, b: number) {
        return this.find(a) === this.find(b);
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse the input
    const connections = input.trim().split('\n').reduce<number[][]>((array, line) => {
        const [index, contains] = line.replace(/\s+/g, '').split('<->');
        array[parseInt(index)] = contains.split(',').map(num => parseInt(num));
        return array;
    }, []);

    // use a disjoint set to combine all the groups
    const set = new DisjointSet(connections.length);

    for (let i = 0; i < connections.length; i++) {
        for (let j = 0; j < connections[i].length; j++) {
            set.union(i, connections[i][j]);
        }
    }

    // find the sizes of all the groups
    const sizes = new Array(connections.length).fill(0);
    for (let i = 0; i < sizes.length; i++) sizes[set.find(i)]++;
    return sizes[0];
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse the input
    const connections = input.trim().split('\n').reduce<number[][]>((array, line) => {
        const [index, contains] = line.replace(/ /g, '').split('<->');
        array[parseInt(index)] = contains.split(',').map(num => parseInt(num));
        return array;
    }, []);

    // use a disjoint set to combine all the groups
    const set = new DisjointSet(connections.length);

    for (let i = 0; i < connections.length; i++) {
        for (let j = 0; j < connections[i].length; j++) {
            set.union(i, connections[i][j]);
        }
    }

    // find the sizes of all the groups
    const sizes = new Array(connections.length).fill(0);
    for (let i = 0; i < sizes.length; i++) sizes[set.find(i)]++;
    return sizes.filter(num => num !== 0).length;
};

export { part1, part2 };
