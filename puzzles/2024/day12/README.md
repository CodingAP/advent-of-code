# Advent of Code 2024 - Day 12: [Garden Groups](https://adventofcode.com/2024/day/12)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day12)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 1396298 | 853588 |
| **Time (in ms)** | 112.93 | 122.18 |

%%%

Leaderboard Positions - **Part 1**: 2165, **Part 2**: 1224

[Video Replay](https://youtu.be/nNCtZ-6a7wU)

Hello all! In this puzzle, we are figuring out the price of different regions based on their area and perimeter. Because we are working with grids, each character is considered `1` unit of area, and any edge that is not touching the same region is `1` unit of perimeter. For example...

```
AAAA
BBCD
BBCC
EEEC

is parsed as

 ----
|AAAA|
 ----

 --
|BB|
|BB|
 --

 -
|C|_
|CC|
-|C|
  -

 -
|D|
 -

 --
|EE|
 --
```

There could also being multiple regions that have the same name. If they are not touching, then they are different regions. In part 1, we need to count all the regions' area and perimeter, multiply them, then add it all up. To do this, we can use a recursive flood fill that returns the area and perimeter counts as well as the squares in the regions. Then, when looping over the grid, we can keep track of all the regions and make sure they one count once. For part 2, we need to combine perimeter edges that are next to each other. Using the example above, A will now have a perimeter of `4` and not `10`. C will have a perimeter of `8` and not `10`. This requires us to check which perimeters are next to each other and only count it once. I chose to loop over all directions, from smallest to largest, and make perimeters 'valid' or not if they needed to be counted.