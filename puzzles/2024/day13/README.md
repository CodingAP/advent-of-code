# Advent of Code 2024 - Day 13: [Claw Contraption](https://adventofcode.com/2024/day/13)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day13)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 28753 | 9144671599845478000 |
| **Time (in ms)** | 1.49 | 2.05 |

%%%

Leaderboard Positions - **Part 1**: 2316, **Part 2**: 679

[Video Replay](https://youtu.be/6QdOUQeiPCk)

Hello all! In this puzzle, we are trying to figure out the exact number of button presses to reach a goal in a crane machine. Each crane has two buttons labeled `A` and `B`, which both buttons advancing the crane arm a specific amount. We need to find how many of each button press will lead to the position being exactly the goal. In part 1, we try to find the amount, then add all the successful `A` and `B` numbers with this formula: `3 * A + B`. To prevent bruteforcing, we treat each button as a system of linear equations, which we can solve as there are two variables and two equation. I made a [Desmos](https://www.desmos.com/calculator/l1amw7m2rg) that calculates the `A` and `B` given the constants. To map the constant for completion sake:

```
c1: button a x
c2: button b x
c3: prize x
c4: button a y
c5: button b y
c6: prize y
```

For part 2, we need to add `10000000000000` to each of the prize positions, which with our current solution shouldn't be a problem. One thing to note is make sure to keep floating point inaccuracies down, so do as much integer arithetic as possible