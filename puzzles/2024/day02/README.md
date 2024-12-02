# Advent of Code 2024 - Day 2: [Red-Nosed Reports](https://adventofcode.com/2024/day/2)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day02)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 670 | 700 |
| **Time (in ms)** | 1.15 | 2.34 |

%%%

Leaderboard Positions - **Part 1**: 1781, **Part 2**: 1152

Hello all! In this puzzle, we are checking if a list of numbers is safe or not according to a these rules:

- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.

In part 1, we are given a list of lists, and we need to see how many are safe. A simple check between numbers for both difference and the increasing/decreasing bit holds for that. In part 2, we are given a little buffer and we can remove one element to try and make the list safe. Because the lists given are already short, we can just go through all possible lists and check if any of the are safe; if one is, then we can consider the entire list safe.