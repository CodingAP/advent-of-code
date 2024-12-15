# Advent of Code 2024 - Day 15: [Warehouse Woes](https://adventofcode.com/2024/day/15)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day15)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 1559280 | 1576353 |
| **Time (in ms)** | 1.99 | 62.74 |

%%%

Leaderboard Positions - **Part 1**: 1399, **Part 2**: 3426

[Video Replay](https://youtu.be/f-AFf8lyXHA)

Hello all! In this puzzle, we are using a robot to move around different boxes in a warehouse. The robot is given a grid of walls, boxes, and empty spaces and will try to push any box that it encounters in the same direction it is moving. For example...

```
moving right
1: @.O.
2: .@O.
3: ..@O
```

The robot is given a list of instructions that correspond the direction it should move: `^` for up, `>` for right, `v` for down, and `<` for left. In part 1, we need to run all the instructions to see where all the boxes end up. To find the score, we need to add up all the positions with `100 * boxY + boxX`. For part 2, the grid spaces are now 2x wider. So the walls, boxes, and empty spaces take up `2` spots rather than one. However, the robot and movements still only move in steps of `1`. The approach is similar to part 1, but we must now make sure to move the boxes correctly.

The implementation of this for me was a recursive search where the movements would be canceled if there is a blocking step. In part 1, this was a simple boolean as there was only one box and one direction. In part 2, however, I needed to account for all box positions as they now took up `2` units. There were a lot of edge cases, so I have provided some sample inputs to help you if you are reading this and need them.

```
##########
#........#
#........#
#..OO....#
#..O.#...#
#..OO....#
#.@OO....#
#..OO....#
#........#
#........#
#........#
##########

>><vv>>>^

should produce

####################
##................##
##....[]..........##
##....[][]........##
##....[][]##......##
##.....[][].......##
##......[]........##
##....[]@.........##
##................##
##................##
##................##
####################
3964
```

```
###########
#.........#
#.........#
##O.......#
#..O.@....#
#OOO......#
#.O#......#
#OO.......#
#.........#
#.........#
###########

<<<^<v

should produce

######################
##..................##
##..................##
####[]@.............##
##...[].............##
##[][][]............##
##..[]##............##
##[][]..............##
##..................##
##..................##
######################
4231
```

Most of my testing was from printing every step from this [solution](https://www.reddit.com/r/adventofcode/comments/1hele8m/comment/m24ojfi) and checking for any discrepancies, so thanks for that!