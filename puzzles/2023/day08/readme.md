# Advent of Code 2023 - Day 8: [Haunted Wasteland](https://adventofcode.com/2023/day/8)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day08)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 20777 | 13289612809129 |
| **Time (in ms)** | 3.02 | 8.46 |

%%%

Leaderboard Positions - **Part 1**: 8417, **Part 2**: 2728

I started this day 25 minutes later because I had an assignment due that I had not finished, so that is why my leaderboard spots are much higher than normal.

For this puzzle, we are given a map and a string of directions to go in. Each direction is either a `L` for left or a `R` for right. The map consists of lines of nodes that take this format...

```
name = (left, right)
```

If we run out of directions to go in, we just start from the beginning until we reach our target.

For part 1, we need to see how many steps we need to take to get from node `AAA` to node `ZZZ`. This is a very simple while loop that just takes the left or right node of the current node we are at until we get to `ZZZ`, counting how many steps we take in the process. For part 2, we need to check all paths that end with an `A` to see when all of them end on a path that ends with a `Z`. This could have been so much more complicated, but it seems that all the paths are a loop that starts with the `A` node and ends the the `Z` node. The means that we can check each path to see how long they go before they loop, then find the least common multiple of those numbers to find when the entire path will loop. I'm quite proud of myself for seeing that almost immediately, which saved a lot of time.

It seems the puzzles are maintaining the difficulty that the early puzzles should have, but I'm waiting for them to return to the same difficulty.