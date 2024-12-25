# Advent of Code 2024 - Day 25: [Code Chronicle](https://adventofcode.com/2024/day/25)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day25)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 3671 | 2024 DONE! |
| **Time (in ms)** | 2.41 | 0.01 |

%%%

Leaderboard Positions - **Part 1**: 718, **Part 2**: 591

[Video Replay](https://youtu.be/Y9LGaxOzCOM)

Hello all! In this puzzle, we are checking to see how many pairs of locks and keys fit together. We are given a list of 5x7 grids that can either be a lock or key. If the top row is empty, then it is a key; else, the bottom row is empty, which means it is a lock. Each key and lock can also correspond to a list of heights for each groove (that is zero-indexed). For example...

```
#####
.####
.####
.####
.#.#.
.#...
.....

is a lock with heights 0,5,3,4,3

.....
#....
#....
#...#
#.#.#
#.###
#####

is a key with height 5,0,2,1,3
```

We need to parse the grids to determine whether or not each grid is a lock or key, then we need to pair each of them up to see if they match. This can be done with 2 for loops after we parse the grids, and that is all!

2024 was a great year in terms of Advent of Code. I solved each of the puzzles the same night, I placed first in all my leaderboards (except the super competitive one, where I still did quite well), and I documented the whole process. If I make a video guide over the entirety of 2024, be sure to watch and like that!