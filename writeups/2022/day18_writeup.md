# Advent of Code 2022 - Day 18: [Boiling Boulders](https://adventofcode.com/2022/day/18)
By Alex Prosser

Leaderboard: 703 (Part 1) / 1580 (Part 2)

In this puzzle, we are analyzing a piece of obsidian to find the surface area of it. In part 1, we are finding the surface area everywhere, which includes air pockets. In part 2, we are finding the surface area of only the outside part that touches water. For part 1, we can simplily count how many faces are exposed by looping through all the cubes and counting neighbors (or non-neighbors in this case). For part 2, we can't do that anymore as there are air pockets inside the obsidian that counted for part 1, but not for part 2. To fix this, we are using a flood fill on the outside of the rock (that doesn't go diagonally) to find all the faces that touch the water.