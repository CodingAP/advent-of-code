# Advent of Code 2024 - Day 9: [Disk Fragmenter](https://adventofcode.com/2024/day/9)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day09)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 6432869891895 | 6467290479134 |
| **Time (in ms)** | 3.35 | 263.32 |

%%%

Leaderboard Positions - **Part 1**: 5114, **Part 2**: 3147

[Video Replay](https://youtu.be/WCMKYD4yAGM)

Hello all! In this puzzle, we are running our own `defrag` program and trying to see how we can reduce the file system. To understand the input, we need to break down each character into either a file or a gap. For the sample input `2333133121414131402`, this corresponds to this file system...

```
00...111...2...333.44.5555.6666.777.888899
```

To be specific, `2` means 2 of ID 0, `3` means 3 empty spaces, `3` means 3 of ID 1, and so on. The IDs increment everytime a file is defined, which means that every even character defines a file and it's size, and every odd character defines the gap size between. In part 1, we need to find the checksum of a reduced file system where we move each file bit from the right side to an empty spot on the left. For the example above, here are the steps...

```
00...111...2...333.44.5555.6666.777.888899
009..111...2...333.44.5555.6666.777.88889.
0099.111...2...333.44.5555.6666.777.8888..
00998111...2...333.44.5555.6666.777.888...
009981118..2...333.44.5555.6666.777.88....
0099811188.2...333.44.5555.6666.777.8.....
009981118882...333.44.5555.6666.777.......
0099811188827..333.44.5555.6666.77........
00998111888277.333.44.5555.6666.7.........
009981118882777333.44.5555.6666...........
009981118882777333644.5555.666............
00998111888277733364465555.66.............
0099811188827773336446555566..............
```

Then, we need to compute the checksum, which consists of adding up all the indices multiplied by the file ID inside (`0*0+0*1+9*2+9*3...`). In part 2, we need to do something similar, but this time we need to keep the entire file in tact. To do this, we must find a gap that is big enough to move the file. In order, we a.) find a gap, then b.) find a file with the highest file ID that can fit in the gap, and then move it there. I took the approach of blocks, which allows the entire file system to be compressed and easily managed. For example again...

```
00...111...2...333.44.5555.6666.777.888899
0099.111...2...333.44.5555.6666.777.8888..
0099.1117772...333.44.5555.6666.....8888..
0099.111777244.333....5555.6666.....8888..
00992111777.44.333....5555.6666.....8888..
```

This leads to a bit more complex stuff when computing the checksum, but not too complicated.