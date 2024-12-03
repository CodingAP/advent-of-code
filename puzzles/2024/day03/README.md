# Advent of Code 2024 - Day 3: [Mull It Over](https://adventofcode.com/2024/day/3)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day03)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 155955228 | 100189366 |
| **Time (in ms)** | 0.27 | 0.28 |

%%%

Leaderboard Positions - **Part 1**: 1835, **Part 2**: 609

[Video Replay](https://youtu.be/AO-lhCsKpZ0)

Hello all! In this puzzle, we are find different instructions in a block of characters. In part 1, we are finding all the `mul` instructions with proper formatting (ex: `mul(a, b)`, with a and b being numbers). I used a regular expression with two capture groups to find all `mul` strings, then add all the results to return the answer. In part 2, we must now also account for `do()` and `don't()`, which either allows or disallows the `mul` instruction. Again, I used a regex that also checks for the new instructions. I used a `.matchAll()`, which allows the regex to go in order. I have a flag that toggles between adding and not adding.