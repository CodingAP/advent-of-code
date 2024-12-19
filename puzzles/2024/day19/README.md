# Advent of Code 2024 - Day 19: [Linen Layout](https://adventofcode.com/2024/day/19)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day19)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 296 | 619970556776002 |
| **Time (in ms)** | 73.39 | 73.83 |

%%%

Leaderboard Positions - **Part 1**: 712, **Part 2**: 1789

[Video Replay](https://youtu.be/j1JTPPcbe6c)

Hello all! In this puzzle, we are counting how many designs are possible. In the input, we are given a list of base strings that can be combined from left to right to create designs. For example, given `r`, `g`, and `b`, you can make `rg`, `br`, or `rgb`. We are also given a list of designs were must confirm if it is possible or not. In part 1, we need to find all possible designs from that list. I took a recursive approach where I searched the start of the string for a possible design. If it matches all the way until the end, then we know the design is possible and we return true. If not, we return false. Either way, it will get recursively called all the way back up to the original design, which works pretty fast. Here is an example with the sample input:

```
input:
r, wr, b, br

brwrr

process:
[br]wrr
|
+-[wr]r
| |
| +-[r]
|   |
|   +- found one
|
[b]rwrr
|
+-[r]wrr
  |
  +-wrr (memoized from above, returns true)
```

I also add memoization to allow already processed designs to be stored. For part 2, we now need to count all the possible ways to create the design. Thankfully, the recursive approach works here, as well as the memoization, as it is the only way to speed things up fast enough to run.