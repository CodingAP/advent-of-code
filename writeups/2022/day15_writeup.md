# Advent of Code 2022 - Day 15: [Beacon Exclusion Zone](https://adventofcode.com/2022/day/15)
By Alex Prosser

Leaderboard: 1899 (Part 1) / 1167 (Part 2)

In this puzzle, we are given a list of sensors and the nearest beacon. In the first part, we need to find out how many spots in the row `y=2000000` where there are no beacons. In the second part, we need to find the one spot in a range of `4000000x4000000` where this is no beacon, and return `x * 4000000 + y`. The input parsing was easy, but I knew that naive solutions wouldn't work as well because of the size of the ranges we are dealing with. For part 1, I found all the sensors that intersected the `y=2000000` row and used diamond math (explained below) to find the places on that specific row. Adding those to a set and returning the length should do the trick. For part 2, searching `16000000000000` places is not a plausible strategy, so I used the methods used in part 1 to find the ranges of spots and combined them until I found a line that has a missing spot, then returning that one spot.

DIAMOND MATH:
You can consider each diamond have a position and radius like a circle, but it doesn't look like one obviously.
For example, a diamond with radius `5` at `(0, 0)`...
```
     #
    ###
   #####
  #######
 #########
#####X#####
 #########
  #######
   #####
    ###
     #
```
This makes it easy to find where the edges are as the distance from the center to the edge is also the radius. Because of that, you can easily find the length of any row on the diamond using this formula...
`2 * (radius - distance_to_center) + 1`

Example: `2 * (5 - 3) + 1 = 5`

With this, you can easily find how many spaces collide with a specific line, which helps solve this problem