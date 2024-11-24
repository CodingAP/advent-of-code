/**
 * aoc/puzzles/2023/day25/solution.js
 * 
 * ~~ Snowverload ~~
 * this is my solution for this advent of code puzzle
 * 
 * by alex prosser
 * 12/24/2023
 */

import fs from 'node:fs';

/**
 * code for part 1 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 1
 */
const part1 = async input => {
    const GENERATE_CSV = false;
    // i used florish's network graph and csv files to find the 3 connections to remove
    // https://app.flourish.studio/
    // just import the csv and find the connections that split the two large groups
    const removedConnections = [['ptq', 'fxn'], ['fbd', 'lzd'], ['kcn', 'szl']];

    let pointsCSV = 'ID\n';
    let connectionsCSV = 'Source,Target\n';

    // parse input into a graph that doesn't connect the specified connections
    const connections = input.split(/\n/).reduce((obj, line) => {
        let [left, right] = line.split(/: /);
        right = right.split(/ /);

        for (let i = 0; i < right.length; i++) {
            if (GENERATE_CSV) connectionsCSV += `${left},${right[i]}\n`;

            let removed = false;
            for (let j = 0; j < removedConnections.length; j++) {
                if (removedConnections[j].includes(left) && removedConnections[j].includes(right[i])) removed = true;
            }

            if (!removed) {
                if (obj[left] == null) obj[left] = [];
                obj[left].push(right[i]);

                if (obj[right[i]] == null) obj[right[i]] = [];
                obj[right[i]].push(left);
            }
        }

        return obj;
    }, {});

    /**
     * searches all nodes and puts them in a set
     * 
     * @param {string} node current node to search 
     * @param {Set<string>} group current group of all nodes
     * @returns {Set<string>}
     */
    const getGroup = (node, group) => {
        for (let i = 0; i < connections[node].length; i++) {
            if (!group.has(connections[node][i])) {
                group.add(connections[node][i]);
                getGroup(connections[node][i], group);
            }
        }
        return group;
    }

    // the removed connections reside in each group, so we can use those to find the two group sizes 
    let group1 = getGroup(removedConnections[0][0], new Set([removedConnections[0][0]]));
    let group2 = getGroup(removedConnections[0][1], new Set([removedConnections[0][1]]));

    if (GENERATE_CSV) {
        pointsCSV += Object.keys(connections).join('\n');

        fs.writeFileSync('points.csv', pointsCSV);
        fs.writeFileSync('connections.csv', connectionsCSV);
    }

    return group1.size * group2.size;
}

/**
 * code for part 2 of the advent of code puzzle
 * 
 * @param {string} input 
 * @returns {Promise<string | number>} the result of part 2
 */
const part2 = async input => {
    return '2023 DONE!';
}

export { part1, part2 };