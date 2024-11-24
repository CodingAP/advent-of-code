Leaderboard Positions - **Part 1**: 567, **Part 2**: 409

Ok, we seem to be leveling out on the difficulty on this year. It is weird to get a weekend puzzle not hard, but I'm suspect that puzzles may have been rearranged to make some days easier because of the difficulty (I doubt this as it would be a lot of work, but who knows).

For this puzzle, we are trying to interpolate a new value given the history of the value. To interpolate it the `OASIS` way, we need to take all the differences between the history and make a new list until we make a list of all 0s. This is from the example to try and see how it is done...

```
1   3   6  10  15  21
  2   3   4   5   6
    1   1   1   1
      0   0   0
```

As you can see, we do this process 4 times until we get that row of 0s. To find the new value, we just add all the iteration's last number to find the number. In this case, it will be `21 + 6 + 1 + 0`, which gives us 28. We do this process for all histories and sum up the interpolate value to get our answer. For part 2, instead of finding the last number, we must find the first number. This is a simple change as we just subtract rather than add; So, our answer is `1 - 2 - 1 - 0` which gives us 0. We do the same process of adding those interpolated values together.

Once you see the pattern, it is a very simple problem to solve. Find a way to generate the differences, then do math on the first or last number. Simple.