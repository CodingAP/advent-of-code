# Advent of Code 2024 - Day 18: [RAM Run](https://adventofcode.com/2024/day/18)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day18)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 404 | 27,60 |
| **Time (in ms)** | 5.92 | 4702.00 |

%%%

Leaderboard Positions - **Part 1**: 1541, **Part 2**: 1077

No video replay as I am traveling...

Hello all! In this puzzle, we are trying to find the shortest path through a bunch of corrupted bytes. Each corrupted byte is defined by `x,y`, and we need to go through a grid from `0` to `70` both width and height. In part 1, we need to find the shortest path while only placing the first `1024`. This is just a simple BFS, so nothing to crazy here. In part 2, we need to find the first corrupted byte that blocks the exit. While there could be many efficient ways to figure this out, I just kept running the BFS while adding a wall at a time and it finds the answer in a short amount of time.