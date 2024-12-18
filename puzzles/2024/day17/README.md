# Advent of Code 2024 - Day 17: [Chronospatial Computer](https://adventofcode.com/2024/day/17)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day17)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 5,1,3,4,3,7,2,1,7 | 216584205979245 |
| **Time (in ms)** | 0.10 | 1.41 |

%%%

Leaderboard Positions - **Part 1**: 6365, **Part 2**: 2241

No video replay as I am traveling...

Hello all! In this puzzle, we are given a program spec (which is similar to other Advent of Code virtual machines) and we need to run the program given. There are 8 instructions as most of the content centers around 3-bit numbers. Here is a summary of all the instructions (keep in mind that `adv`, `bdv`, and `cdv` do the same thing, which is a bitshift):

- adv: A = A >> combo
- bxl: B = B ^ arg
- bst: B = combo & 7
- jnz: jump to arg is A != 0
- bxc: B = B ^ C
- out: push combo to output
- bdv: A = B >> combo
- cdv: A = C >> combo

The combo means to translate the literal arg to either `0`, `1`, `2`, `3`, or `A`, `B`, `C`, with `7` not being valid. In part 1, we need to run the program with the registers given, which just needs to simulate. In part 2, we need to find the smallest `A` register value that will return the instructions. To start, I reversed the program to get this:

```
B = A & 7
B = B ^ 3
C = A >> B
B = B ^ 5
A = A >> 3
B = B ^ C
OUTPUT B & 7
JNZ 0
```

The shows that we are dealing with an encryption that turns a base 8 number to a list of other base 8 numbers. That means we can brute force efficiently by recursively checking each digit, incrementing by 8^i. This allows all possible branches to be checked, which fixes the issue with the `C` register.

My work during the night is in `program.txt`, which isn't much, but it's honest work.