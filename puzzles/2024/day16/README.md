# Advent of Code 2024 - Day 16: [Reindeer Maze](https://adventofcode.com/2024/day/16)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day16)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 83432 | 467 |
| **Time (in ms)** | 242.30 | 277.51 |

%%%

Leaderboard Positions - **Part 1**: 2681, **Part 2**: 4725

No video replay as I am traveling...

Hello all! In this puzzle, we are trying to find the optimal path for the Reindeer Olympics. We are given a grid with walls, a starting point, and a ending point. Each movement forward gives 1 score while each 90 degree rotation gives 1000 points. In part 1, we need to find the shortest path from the start to the end. This is just a simple Dijkstra's algorithm to search the grid for the fastest path. In part 2, we need to find all unique tiles that are on the best path. The best way that I could find is to all the distances between the starting node to any given node, and then that given node to the end. If the weights of both searches equal the shortest path, then we know it is on a best path, regardless of which path it is in.