# Advent of Code 2022 - Day 8: [Treetop Tree House](https://adventofcode.com/2022/day/8)
By Alex Prosser

Leaderboard: 5244 (Part 1) / 2757 (Part 2)

This puzzle, we need to find the best spot to build a tree house in a forest of trees. In part 1, we found how many trees can see from the outside of the very square forest. In part 2, we need to find the tree with the best scenic score, which is how many trees can it see in each direction multiplied.

We need to somehow get the 4 rows/columns to the left, up, right, and down of the tree to solve both of these parts. Originally, my solution consisted of hardcoding those values and seeing if any of them are visible. In my newer solution, I just create an array that stores all the different rows and checks if any of them are visible from the outside, so there can be any different types of visibility. In part 2, I just reversed the numbers to get the rows/columns starting from the point rather than the outside, and foudn the first number that was larger than it. If there was no number, the length of the row/column was the value. Then, I multiplied all the values together.  