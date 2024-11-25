# Advent of Code 2023 - Day 10: [Pipe Maze](https://adventofcode.com/2023/day/10)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day10)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 7063 | 589 |
| **Time (in ms)** | 11.18 | 17.74 |

%%%

Leaderboard Positions - **Part 1**: 75, **Part 2**: 1613

WOW! Another global leaderboard position, and it is on the hardest puzzle yet (according to my own difficulty metrics).

In this puzzle, we are given a grid of characters that correspond to one giant loop. Some characters are part of it while other are not. Each character has a different role (taken from the prose directly)...

- `|` is a **vertical pipe** connecting north and south.
- `-` is a **horizontal pipe** connecting east and west.
- `L` is a **90-degree bend** connecting north and east.
- `J` is a **90-degree bend** connecting north and west.
- `7` is a **90-degree bend** connecting south and west.
- `F` is a **90-degree bend** connecting south and east.
- `.` is **ground**; there is no pipe in this tile.
- `S` is the **starting position** of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

For part 1, we need to find the loop the `S` is on and find the distance of the farthest point away from it on that loop. To do this, we can just follow the loop until we reach `S` again, then return half the loop's size. This will return the farthest point away (think of it like a circle, the farthest point away on a circle is half the circumference away).

For part 2, we need to find the area enclosed by the loop. What complicates things is that area enclosed by the outside of the loop is not counted. Stuff like this (with outside marked as `O` and `.` and inside marked as `I`)...

```
..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........
```

can happen, so we need to account for that. Luckily, my first thought was a scanning line that checked for line collisions to see if a point was inside a shape or not. This would work, but sadly, an off-the-shelf implementation didn't work as we need to account for space between characters.

This is where we count the 'north' and 'south' bends. We can treat each line as three seperate parts, the north, the intersect, and the south. If we are given this for example...

```
north:     L------J  |       |   |
intersect:           |       |   |
south:               L-------J   L--------7
```

only the rightmost would be counted as an intersection. This is because the left doesn't cross the intersection plane, and the middle can just be traveled around. We must only look for intersections that move across all three sections in one direction. The same can be said for the other way...

```
north:               F-------7            |
intersect:           |       |            |
south:     F------7  |       |   L--------J
```

To actually count this so we can compute it, we count how many 'north' characters (`L`, `J`, and `|`) and 'south' characters (`F`, `7`, and `|`). Note the vertical pipe can be both as it goes both ways and doesn't bend. So in the cases above, we have `2` (the `L` and `J`) + `1` (the `|`) 'north' characters and `2` (first `F` and `7`) + `2` (second `F` and `7`) + `1` (the `|`) (we do not count the intersect as it is just a theoretical section). This gives us `5` and `3`, which are both odd, which means it is in the loop. Below is an example of not being in the loop...

```
north:               F-------7
intersect:           |       |
south:     F------7  |       |
```

There is only `4` 'south' charactes and `0` 'north' charactes. Both are even, so this point is not in the loop.

Honestly, I didn't come up with the 'north' and 'south' modification to this problem. I saw a reddit comment in the megathread that described it, and I was already trying to make the scanning line trick work, so it made sense. It is a bit of a shame, but I feel like I learned a new trick in the process, so I think it was a win-win. Plus, I did horrible on the leaderboard for part 2, so it doesn't hurt that bad.