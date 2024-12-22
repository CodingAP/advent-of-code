# Advent of Code 2024 - Day 22: [Monkey Market](https://adventofcode.com/2024/day/22)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day22)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 13185239446 | 1501 |
| **Time (in ms)** | 240.15 | 3461.22 |

%%%

Leaderboard Positions - **Part 1**: 715, **Part 2**: 1535

[Video Replay](https://youtu.be/ESRhdpd0s_E)

Hello all! In this puzzle, we are predicting the banana stock market using a pseudorandom number generator. In part 1, we need to create a pseudorandom generator and find the 2000th number from each of the seed numbers in the input. The generator using bitshifts, XORs, and modulo, so nothing to uncommon in terms of RNG. For part 2, we need to generate all the prices of the buyers as well as the changes and find the subsequence with the largest selling price (i'm starting to sound like a crypto bro). For example, given `123` as the starting number, here are the numbers, the prices, and the changes:

```
     123: 3 
15887950: 0 (-3)
16495136: 6 (6)
  527345: 5 (-1)
  704524: 4 (-1)
 1553684: 4 (0)
12683156: 6 (2)
11100544: 4 (-2)
12249484: 4 (0)
 7753432: 2 (-2)
```

The way I did it is to use a sliding window that adds/removes elements to keep 4 elements, then added the first instance of that sequence to a map with it's price. For example, given the sequences above...

```
[-3, 6, -1, -1]: 4
 [6, -1, -1, 0]: 4
 [-1, -1, 0, 2]: 6
 [-1, 0, 2, -2]: 4
  [0, 2, -2, 0]: 4
 [2, -2, 0, -2]: 2
```

Generating this list for all buyers, you can combine all the same subsequences and add them up, which we can find the max of.