# Advent of Code 2024 - Day 24: [Crossed Wires](https://adventofcode.com/2024/day/24)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day24)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 42883464055378 | dqr,dtk,pfw,shh,vgs,z21,z33,z39 |
| **Time (in ms)** | 0.89 | 1.74 |

%%%

Leaderboard Positions - **Part 1**: 1142, **Part 2**: 138

[Video Replay](https://youtu.be/T4zVjb7CWZA)

Hello all! In this puzzle, we are analyzing a 45-bit full adder that has some gates swapped. We are given an initial set of wires that start with `x` and `y`, and we are also given a set of gates that tell the output using intermediate wires and `z` wires. In part 1, we needed to simulate the gates until all `z` wires produced a result. This was similar to [Day 7, 2015](https://adventofcode.com/2015/day/7) where we did a similar puzzle. This involves waiting for all the wires to be executed, then parsing the binary number afterwards. In part 2, we are given the fact that this entire circuit is a full-adder with 45 bits, and some of the gates' output have been swapped. Exactly `4` pairs, or `8` wires, have been swapped, and we must analyze the gates to find the incorrect ones. Thankfully, we don't have to switch them ourselves, but just output them in an alphabetical list separated by commas. I first did it manually after trying to remember what the full-adder circuit looked like, but then I extracted these rules that helped me. First, here is a diagram of a full-adder:

```
       _____
X-+---|     \        _____
  |   | XOR  |-+----|     \
Y---+-|_____/  |    | XOR  |-------Z
  | |          |  +-|_____/
  | |  _____   |  |
  +---|     \  |  | 
    | | AND  |-|--|-----------+   _____
    +-|_____/  |  |  _____    +--|     \
               +--|-|     \      | OR   |------Cout
                  | | AND  |-----|_____/
                  |-|_____/
                  |
                  |
Cin---------------+

(look up a diagram if you can't read it, i made this for fun)
```
Using this, we can pull some rules out that we can then check for all `x`, `y`, and `z` wires. Here are the rules that worked for my input:

- for my input, no carry flags were swapped
- each z must be connected to an XOR
- each AND must go to an OR (besides the first case as it starts the carry flag)
- each XOR must to go to XOR or AND
- each XOR must be connected to an x, y, or z

After checking for all these rules, I sent the incorrect ones to an array, and I found 8 that matched. Most of this was manual checks, I just did some automation to allow my work to be proved. This may not work for all cases.