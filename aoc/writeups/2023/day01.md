Leaderboard Positions - **Part 1**: 917, **Part 2**: 2517

Wow, for a first day this did have some trickery to it. Welcome to Advent of Code 2023 I guess...

For Day 1 this year, we are trying to calibrate a trebuchet (cool, btw) by adding the first and last number in each line. For part 1, this only consists of the numbers 0-9. That is relatively easy to search for as they can be converted to a number afterwards. I just used a `.filter()` to remove non-digit characters, and added the first and last together to sum all lines up.

For part 2, however, things were much harder. Each line also had the numbers spelled out as well, so we had to account for those as well; however, those spelled out numbers could overlap to give something like `eightwo`. My first naive method was to just do a search and replace, but it would do it in numerical order! So instead of `eightwo` producing `8wo`, it would produce `eigh2`, which was incorrect. To account for this, I had to check if the beginning of a sliding window was the number, like this...

*EDIT: Apparently, the intended result for `eightwo` is `82`, so no wonder I was extremely off. Please take the past paragraph with a grain of salt...*

```
i = 0: 7pqrstsixteen
i = 1:  pqrstsixteen
i = 2:   qrstsixteen
i = 3:    rstsixteen
i = 4:     stsixteen
i = 5:      tsixteen
i = 6:      [six]teen
...
```

This leads to the correct output, and the end of the first day of 2023. I am still excited (now slightly scared) for the rest of the month, though.