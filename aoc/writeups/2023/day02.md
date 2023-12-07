Leaderboard Positions - **Part 1**: 858, **Part 2**: 685

I think 2023 is going to be a harder year...

For this puzzle, we need to parse a list of games where an elf pulls out a random number of colored cubes for a random amount of sets. This puzzle seemed to be more of a parsing question than anything else as parsing varying amount of strings is slightly difficult. My code uses a lot of `.reduce()`, which without types (I still won't use TypeScript) is difficult to keep track of. For part 1, we need to use this parse data to disqualify any games where an elf pulled more colored cubes that was possible based of the limit given in the puzzle, which is...

```
red: 12
green: 13
blue: 14
```

Because parsing was the hardest part, it was easy to add up all the game IDs where it was possible. Just check if any set has an impossible amount of cubes by checking each number for each color. I thought it was going to be difficult to account for sets that don't pull out a color (something like `3 blue, 4 red`), but just checking for undefined values fixed it. For part 2, we just need to find the minimum amount of cubes needed for the whole game, multiplying them all, and adding to the total sum. I would say part 2 is easier than part 1, but not by much. I just used a `Math.max` for each set in each game. 

The difficulty of these first 2 days have been higher than all the others year so far (in my personal experience), but that makes me more excited as I get to work on Advent of Code more!