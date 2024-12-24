# Advent of Code 2024 - Day 23: [LAN Party](https://adventofcode.com/2024/day/23)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day23)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 1043 | ai,bk,dc,dx,fo,gx,hk,kd,os,uz,xn,yk,zs |
| **Time (in ms)** | 167.09 | 466.90 |

%%%

Leaderboard Positions - **Part 1**: 2077, **Part 2**: 2482

[Video Replay](https://youtu.be/MHcEGvbfhPs)

Hello all! In this puzzle, we are finding different sets where computers are connected to each other. We are given a list of connections, where we can construct an undirected graph. In part 1, we need to find all sets of 3 computers that are all connected together, then we need to count the ones which have a computer that start with `t`. I used a DFS to find a path of 3 computers that connect back to the beginning because by the fact that we can traverse them that way means that all of them must be connected. For example...

```
   aq
  /  \
cg----yn

aq -> yn -> cg -> aq
```

In part 2, we need to find the biggest set of computers that are all connected to each other. While there probably is an algorithm that can solve both part 1 and 2, I chose to use different strategies for both parts. Mine was a simple as checking for a set of computers that were connected to the same set of computers. This involved a bunch of set intersections, but with the new Set interface in JS/TS, it made it super easy.