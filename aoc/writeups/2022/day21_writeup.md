# Advent of Code 2022 - Day 21: [Monkey Math](https://adventofcode.com/2022/day/21)
By Alex Prosser

Leaderboard: 5049 (Part 1) / 3413 (Part 2)

In this puzzle, we are trying to find the number the `root` monkey yells. In part 1, we just need to parse all the monkeys to get the answer. In part 2, we need to find the number the `humn` monkey (or the human) needs to output for the two monkeys in the `root` equation. There isn't much difficulty here, we just need to keep replacing each monkey name until the only thing in the equation are numbers, then use `eval` to figure out the answer. For part 2, I replace the human number with `X` and I used an equation solver to figure out what `X`. Nothing too difficult, but I wasn't on my computer at the time the puzzle opened.