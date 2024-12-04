# Advent of Code 2024 - Day 4: [Ceres Search](https://adventofcode.com/2024/day/4)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day04)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 2591 | 1880 |
| **Time (in ms)** | 4.08 | 1.18 |

%%%

Leaderboard Positions - **Part 1**: 2153, **Part 2**: 1349

[Video Replay](https://youtu.be/idsHsnS_FLs)

Hello all! In this puzzle, we need to find the word `XMAS` in a grid of characters. In part 1, we need to find how many `XMAS` strings exist, like a word search. To begin, I treat each character as an independent search, where `X` is the middle. One optimization is I can skip searches on characters `M`, `A`, and `S`, which shrinks the search by 5 times. This also prevents the problem of overcounting as it will only consider one version of forward and backward for each axis. To consider how many words there are, you just branch out in each direction to see what word is made. For example, here is `8` words from one X... 

```
S  S  S
 A A A
  MMM
SAMXMAS
  MMM
 A A A
S  S  S
```

If you check these positions for every spot in the grid (with bounds checking), you can count every word with no overcounting. In part 2, a similar search is used to find `X-MAS`, which is two `MAS`'s in an X (you can do a similar optimization with only checking for `A`). There are only 4 possible combinations...

```
M M
 A
S S

S M
 A
S M

S S
 A
M M

M S
 A
M S
```

This can either be a simple check in all 4 positions, or a loop that combines the words in those positions. I believe that part 2 is actually easier than part 1 in this case.