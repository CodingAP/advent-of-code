# Advent of Code 2022 - Day 19: [Not Enough Minerals](https://adventofcode.com/2022/day/19)
By Alex Prosser

Leaderboard: 6942 (Part 1) / 5816 (Part 2)

This year seems to love big searches, huh? In this puzzle, we need to find the maximum amount of geodes we can produce which each blueprint provided. Each blueprint has the format...

`Blueprint <ID>: Each ore robot costs <ORE_COST> ore. Each clay robot costs <CLAY_COST> ore. Each obsidian robot costs <OBSIDIAN_ORE_COST> ore and <OBSIDIAN_CLAY_COST> clay. Each geode robot costs <GEODE_ORE_COST> ore and <GEODE_OBSIDIAN_COST> obsidian.`

For part 1, we need to find the quality of each blueprint, and add them together. The quality is `ID * amount of geodes produced`. To find the max geodes, we just simulate the resource creation process for 24 minutes. In part 2, we need to multiply the first 3 blueprint's quality together, but we need to simulate 32 minutes instead. This problem gets a bit difficult because there isn't one algorithm that works to find the max amount of geodes produced. The best strategy is to try every method in a puesdo-BFS style (I didn't use BFS as it had to still search through all ways). For each minute, we create all the possible new states, then after they are all created, we only keep the top 20000. This keeps the searching time to enough where I can run it. Just look at my code to see how it works.