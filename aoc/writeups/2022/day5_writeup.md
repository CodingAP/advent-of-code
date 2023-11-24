# Advent of Code 2022 - Day 5: [Supply Stacks](https://adventofcode.com/2022/day/5)
By Alex Prosser

Leaderboard: 716 (Part 1) / 444 (Part 2)

This was a fun one. In this puzzle, we need to stack crates depending on the instructions given to us in the input. The crates are also in the input, which presents the first challenge: how do we parse the input? In this first attempt, I didn't even try and just hardcoded the crate values; however, when I came back to it, I found a way to seperate the crates to create the crates. Each instruction follows like this...

```
move [amount] from [source] to [destination]
```

This is was simple as treating the crate stacks as arrays and doing Array.splice() on them. In part 1, we needed to move the crates one at a time. In part 2, we needed to move all of them at the same time. My part 1 code only needed one change to make part 2 work, which is why the leaderboard position is such a jump.