# Advent of Code 2023 - Day 13: [Point of Incidence](https://adventofcode.com/2023/day/13)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day13)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 27505 | 22906 |
| **Time (in ms)** | 2.69 | 227.60 |

%%%

Leaderboard Positions - **Part 1**: 1300, **Part 2**: 1700

In this puzzle, we are given a list of grids and we are trying to find the reflections (vertical and horizontal) inside them. Each grid is guaranteed to have at least one vertical reflection or one horizontal reflection. To define a reflection, we will use an example...

```
1 #...##..# 1
2 #....#..# 2
3 ..##..### 3
4v#####.##.v4
5^#####.##.^5
6 ..##..### 6
7 #....#..# 7

```

If you look between y=4 and y=5, you can see that above and below (besides y=1 as it has no match on the other side), it is the same...

```
y=4: #####.##.
y=5: #####.##.

y=3: ..##..###
y=6: ..##..###

y=2: #....#..#
y=7: #....#..#
```

It is the same for the vertical reflections, obviously going through columns rather than rows. For part 1, we need to find these reflections and count them by finding the coordinate it is on, multiplying it by 100 if it is a horizontal reflection, and adding all grids together. I had a tough time wrapping my head around doing it programmatically (it also is weird as the column/row you need to find is between two others), so I struggled with getting a working solution fast; however, it worked after a little bit. This kicker is find the smallest side so that you don't have to account for undefined values.

In part 2, we need to change one of the symbols from `.` to a `#` and see if the reflections change. This takes a bit more work, and I originally thought that bruteforcing would not work. Thankfully, I can just try all changes until one produces a different reflection. Not everything needs a crazy fast solution that optimizes for different grids.

It seems like we are taking a break with the difficult puzzles, which I am glad because I need to study for my last finals. It could have been done on purpose, but I highly doubt as college students aren't the only demographic Advent of Code serves. 