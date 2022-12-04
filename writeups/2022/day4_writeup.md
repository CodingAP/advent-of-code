# Advent of Code 2022 - Day 4: [Camp Cleanup](https://adventofcode.com/2022/day/4)
By Alex Prosser

Leaderboard: 1319 (Part 1) / 1726 (Part 2)

In this puzzle, we need to find how many of the pairs listed in the input overlap. For part 1, we need to see if one pair completely overlaps the other while in part 2 we only need to see if there are any overlaps. Each pair is listed as such...

```
1-2,3-4
5-6,7-8
```

There is probably a way to mathematically show that a pair overlaps, but I only knew the complete overlap formula. This was easy to wrap my mind around, but I goofed on the execution because I forgot about the edge of the pairs (I just forgot to but an `=` with the `<` or `>` signs). This costed me a minute, which kicked me off the top 1000 leaderboard, but I still came back with a good enough score.