Leaderboard Positions - **Part 1**: 2053, **Part 2**: 1318

2023 is definitely a harder year.

For this puzzle, we are given a grid of numbers, periods, and symbols that represent an engine. We need to able to find 'part numbers', or numbers that are beside symbols. We need to check around all directions (including diagonals) of the number to find the symbol attached to it. For example, here are some part numbers...

```
...435....
..*...45#.
345.......
.....55...

part numbers: 435, 45, 345, (not 55)
```

To do this, I do a 2D grid search where I check all neighbors for a symbol and if there is one, we make sure it is marked. Since I parsed the grid into a 2D array structure, it was easy to do that. For part 1, we just need to sum all 'part numbers'. For part 2, however, we need to find 'gear numbers'. These are numbers that are beside a `*`, and there can only be two beside the star. One edge case I didn't consider is if a number is by two `*`'s, which could lead to some gear chaining. Apparently it wasn't covered, though, so I'm good for now.

This is the first time this year I went back and rewrote the code because I just `isNaN()` all over, which leads to errors when dealing with undefined values (a bug that ruined the first part for a little bit). I also commented it just to make it better to look back on. Advent of Code 2023 seems to be harder, so let's see what happens next!