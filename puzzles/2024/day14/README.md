# Advent of Code 2024 - Day 14: [Restroom Redoubt](https://adventofcode.com/2024/day/14)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day14)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 219150360 | 8053 |
| **Time (in ms)** | 1.72 | 2910.07 |

%%%

Leaderboard Positions - **Part 1**: 1277, **Part 2**: 1311

[Video Replay](https://youtu.be/TOk_bEpUMv0)

Hello all! In this puzzle, we must view the robots movement patterns on a wrapping grid. Each robot is given an initial position and velocity, and they move on a grid that wraps on both directions. In part 1, we need to simulate 100 seconds of the robot movement as see which quadrants each will be in. This is very simple as we can simulate 100 seconds, then check by dividing the position by the grid's width and height divided by 2. One edge case is to not consider robots that are in the middle column or row, but that it easy to detect. In part 2, however, we need to find the smallest second where all the robots configure themselves into a Christmas tree. This is way more difficult as the problem doesn't give you any hint to find the tree. My way of handling it is to find the first second where a 5x5 solid area of robots are found. This must be the tree as it seemed very unlikely for any other state to have that configuration. Another way of handling it is to find the cycle. In the grids I've seen, there was a repeating pattern of horizontal and vertical groups that were much closer together than most. They seemed to follow every 101 tries for one, and 105 tries for the other. If you could only search those, that would speed up the calculations.

This is what the tree looks like:
```
###############################
#                             #
#                             #
#                             #
#                             #
#              #              #
#             ###             #
#            #####            #
#           #######           #
#          #########          #
#            #####            #
#           #######           #
#          #########          #
#         ###########         #
#        #############        #
#          #########          #
#         ###########         #
#        #############        #
#       ###############       #
#      #################      #
#        #############        #
#       ###############       #
#      #################      #
#     ###################     #
#    #####################    #
#             ###             #
#             ###             #
#             ###             #
#                             #
#                             #
#                             #
#                             #
###############################
```

Not a big fan of the puzzle due to the ambuiguity that can arise, so hopefully Eric doesn't consider revisiting this idea. It kinda reminds me of the text ones where the answer has to be parsed by printing the grid out.