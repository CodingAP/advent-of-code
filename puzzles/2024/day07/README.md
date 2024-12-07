# Advent of Code 2024 - Day 7: [Bridge Repair](https://adventofcode.com/2024/day/7)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day07)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 6231007345478 | 333027885676693 |
| **Time (in ms)** | 57.75 | 3780.37 |

%%%

Leaderboard Positions - **Part 1**: 1167, **Part 2**: 1096

[Video Replay](https://youtu.be/Oi8Dk8mbibM)

Hello all! In this puzzle, we need to find every set of numbers where if we place specific operations between them, we get the expect value. In the input, we are given two things: a value, and a list of numbers. If we can find a set of operations, then we add it to a sum. Note that order of operations does not matter here. In part 1, we need to use `+` and `*`. For example...

```
3267: 81 40 27

works for

81 * 40 + 27 = 3267
```

To find a set of operations that work, we can simulate every possible operation until we find a match. To make this somewhat efficient, we can use binary numbers as it will generate every possible combination of operations. If we generate each binary representation from `0 to 2^(list_len - 1)`, we can treat `0` as addition, and `1` as multiplication. In part 2, we do a similar thing except we need to add concatenation into the operator list. This bumps us from binary numbers to tenary numbers. However, because the list lengths are small enough (the biggest list size is 12, and `2^12 = 4096` and `3^12 = 531441`), we can use the same approach.