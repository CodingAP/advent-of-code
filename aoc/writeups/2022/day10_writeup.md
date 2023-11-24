# Advent of Code 2022 - Day 10: [Cathode-Ray Tube](https://adventofcode.com/2022/day/10)
By Alex Prosser

Leaderboard: 898 (Part 1) / 420 (Part 2)

In this puzzle, we need to process a list of instructions that follow a signal that we don't know about until part 2. There are only two instructions, `noop` and `addx`. `noop` just waits a cycle while `addx` uses two cycles to add a number to `x`. `x` starts at 1, which gave me a hiccup on part 1. In part 1, we just need to keep track of `x` at certain cycles (20, 60, 100, 140, 180, 220). In part 2, we need to keep track of the cycles to draw a CRT-like signal to draw a string of letters. `x` is the position of the sprite, which is 3 wide. 