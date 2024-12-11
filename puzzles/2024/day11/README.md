# Advent of Code 2024 - Day 11: [Plutonian Pebbles](https://adventofcode.com/2024/day/11)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day11)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 183484 | 218817038947400 |
| **Time (in ms)** | 2.94 | 110.60 |

%%%

Leaderboard Positions - **Part 1**: 5114, **Part 2**: 3147

[Video Replay](https://youtu.be/s-GlPVA5gyc)

Hello all! In this puzzle, we need to simulate the growth of stones. Each stone will change or duplicate depending on the current stone number. The rules that dictates this are:

1. If the stone number is 0, the next stone number is `1`
2. If the stone number's digit length is even, the stone turns into `2` and each half of the number is put on the stone
3. If no rules above apply, multiply the stone number by `2024`

This model will exponentially grow, so we must find a way to control it before it gets too bad. In part 1, we need to simulate 25 turns of this, which can be done with an array as there is a small amount. In part 2, we need to simulate 75 turns of this, which cannot be done with an array. To fix this, we can store the count of each stone number as the order of the stone number doesn't matter. This will allow us to count for all stones as groups rather than indivduals. This speeds the computation enough to allow the 75 turns