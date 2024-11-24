# Advent of Code 2023 - Day 5: [If You Give A Seed A Fertilizer](https://adventofcode.com/2023/day/5)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day05)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 484023871 | 46294175 |
| **Time (in ms)** | 0.56 | 24.78 |

%%%

Leaderboard Positions - **Part 1**: 1214, **Part 2**: 3999

Holy hell! I wish I can go out on a limb and say that was the hardest puzzle of the year, but it was only Day 5 :(.

For this puzzle, we are given a mapping of seeds to soil to fertilizer to blah blah blah. It doesn't matter about what names they map to, we just have to map the seed numbers 7 times using the ranges defined in the input. For part 1, we take the `seeds` list at the top of the input, go through all the mappings, and find the smallest value. To do this, we can simply go through all the mappings' ranges, see if the seed number is between it; if it is, then we map the seed number and continue with the next. If no range is found, we leave it be. We do this process for each mapping and we are left with 7-mapped numbers that we can find the minimum of. For part 2, we treat those list of seed numbers as two digits per entry: one is the start, the second is the range. For example...

```
[79] [14] [55] [13]
is now
[79 14] [55 13]
```

Theses ranges are also treated like inclusive-exclusive (`[79, 93), 79 + 14 = 93`), so 93 doesn't get mapped in this first range. If you look at my code, I just subtract 1 from all the ends and it seemed to work (probably a more elegant way to handle it). So when we go through all the mappings this time, I separated the ranges between `mapped` and `unmapped`. All the `unmapped` are checked for any range collisions; if they do collide, split the ranges so that only the numbers in the mapping range get mapped, and continue. This allows us to turn this billion-operation problem into a few thousand, which the computer can handle easily.

*NOTE: I originally went with a brute force solution the night of the puzzle's opening, and I was lucky to find the minimum in the second range of seed numbers, so I didn't have to run my solution for hours.*

I think that I will look back at this puzzle because it was harder than most of 2020 and 2015 (the ones that I have redone to train for 2023) and it is ONLY DAY 5!!! Until then, I look forward to the rest of 2023.