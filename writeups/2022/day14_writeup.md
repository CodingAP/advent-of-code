# Advent of Code 2022 - Day 14: [Regolith Reservoir](https://adventofcode.com/2022/day/14)
By Alex Prosser

Leaderboard: 255 (Part 1) / 189 (Part 2)

In this puzzle, we are creating a simple sand simulator and counting how many bits of sand has fallen out of the generator. The generator is located at `(500, 0)`, and creates a bit of sand everytime the previous one comes to rest. In part 1, we need to find how many bits of sand will come to rest until they all start to fall in the void below all the points defined. In part 2, we need to find how many bits of sand are needed to block the generator. We can simulate the sand by keeping track of one at a time until it goes to rest, then adding a wall at that position. This cell automata is a very common project, but surprisingly I've never created on until now. I think this is the first visualization I am going to do.