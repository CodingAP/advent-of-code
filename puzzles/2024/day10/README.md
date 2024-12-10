# Advent of Code 2024 - Day 10: [Hoof It](https://adventofcode.com/2024/day/10)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day10)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 635 | 800 |
| **Time (in ms)** | 2.97 | 2.25 |

%%%

Leaderboard Positions - **Part 1**: 5114, **Part 2**: 3147

[Video Replay](https://youtu.be/LKCjL2le8WA)

Hello all! In this puzzle, we are finding the score and rating of different trailheads. A trail is a path starting at `0` (the trailhead) going to `9` (the trailtail) by only incrementing by 1 each step (ex. 0,1,2,3,4,5,6,7,8,9). In part 1, we need to find the score of each trailhead, which is how many trailtails it can access. In part 2, we need to find the rating, which is how many unique trails can be created from a trailhead. In both parts, we can use a graph traversal algorithm like BFS or DFS to find all valid paths. The only different is whether we prevent repeat searches or not.