# Advent of Code 2024 - Day 6: [Guard Gallivant](https://adventofcode.com/2024/day/6)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day06)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 4903 | 1911 |
| **Time (in ms)** | 7.78 | 13395.88 |

%%%

Leaderboard Positions - **Part 1**: 609, **Part 2**: 578

[Video Replay](https://youtu.be/jkVmRn1IHZY)

Hello all! In this puzzle, we are trying to see all the spots a guard passes over on a grid. To understand the guard's path, we must simulate where they walk. The guard walks in a straight line until is hits an obstacle (`#`). It will then turn right and keep moving. If the guard hits the edge of the grid, simulation is finished. For example, the sample input (with directions) looks like this...

```
....#.....
....>>>>>#
....^...V.
..#.^...V.
..>>^>>#V.
..^.^.V.V.
.#<<S<<<V.
.>>>>>V>#.
#^<<<<VV..
......#V..
```

In part 1, we need to see how many different spots the guard visits before it goes off the grid. In part 2, we need to see how many different position obstacles can be placed to make the guard loop. To check if there is a loop in the guard's movement, you can check if a certain position and direction has been visited before. If so, it is a loop. Then, you can place a single obstacle and see if the guard loops. One optimation is only place an obstacle where part 1's points where, as we know that if an obstacle is placed not on the original path, it will not affect it.