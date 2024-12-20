# Advent of Code 2024 - Day 20: [Race Condition](https://adventofcode.com/2024/day/20)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day20)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 1404 | 1010981 |
| **Time (in ms)** | 59106.51 | 59533.26 |

%%%

Leaderboard Positions - **Part 1**: 140, **Part 2**: 715

[Video Explanation](https://youtu.be/FzZwNryUiLE)

Hello all! In this puzzle, we are trying to cheat and find how much we can shorten the best path. A "cheat" is defined by skipping the walls and moving to a clear spot. For example, we can cheat by phasing through a wall like so...

```
#########
#S#...#E#
#.#.#.#.#
#..X#...#
#########

#########
#S#...#E#
#.#.#.#.#
#...X...#
#########

#########
#S#...#E#
#.#.#.#.#
#...#X..#
#########
```

This saves us 3 steps as we don't have to walk around the walls. In part 1, we need to find all cheats of at most distance 2 that save 100 steps. This can either be done by removing one wall at a time and seeing if the best path is shorter by at least 100, or by using the algorithm below.

1. Loop through all walkable spots
2. Find all walkable spots with manhattan radius 2 around current spot
3. See if traveling to it would save more than 100 steps, accounting for the time to walk to it
4. Add 1 if true

This works well for part 2 as well, where we need to check for all cheats with a distance of 20 or below.