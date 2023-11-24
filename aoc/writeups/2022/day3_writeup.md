# Advent of Code 2022 - Day 3: [Rucksack Reorganization](https://adventofcode.com/2022/day/3)
By Alex Prosser

Leaderboard: 689 (Part 1) / 430 (Part 2)

In this puzzle, we need to find the commonalities between sets of strings. This just means that we need to do some set math between the strings. The strings are variable length, so for the example given, we would find the intersection of...

```
vJrwpWtwJgWr/hcsFMMfFFhFp
jqHRNqRjqzjGDLGL/rsFMfFZSrLrFZsSL
PmmdzqPrV/vPwwTWBwg
wMqvLMZHhHMvwLH/jbvcjnnSBnvTQFn
ttgJtRGJ/QctTZtZT
CrZsJsPPZsGz/wwsLwLmpwMDw
```

In part 1, we need to compare the different halves. In part 2, we need to compare three lines at a time. One mistake I made is that I didn't treat the intersection as a Set object, so there were multiple copies in the array, which messed with the score. After catching that bug, it worked, but moved me back a couple of spots. Still, I am happy with being in top 1000 each time so far.