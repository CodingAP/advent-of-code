Leaderboard Positions - **Part 1**: 303, **Part 2**: 178

It seems to be that the even days are the easier problems and the odd days are the harder problems (with the even days getting easier and the odd days get harder). I did absolutely wonderful this day, the best I did so far, but it makes me wary of the Day 7 (oh no).

Anyways, for this puzzle we need to see which of our boats beats the record distances given to us based on how long we hold on to the accelerator. For example, if our time is `15 seconds` and our record distance of `40 units`. We can hold it for `7 seconds`, which allows the boat to go at `7 units/sec`, but then we only have `8 seconds` to race. That will allow it to go `56 units (7 units/sec * 8 sec)`, which beats the record.

For part 1, we need to go through all pairs of times and distances; for each we need to find how many ways we can beat the record and then multiply them all together. This just consists of doing a for loop on each pair that checks if `i * (time - i)` is greater than the record. Since the numbers are very small (especially compared to Day 5), this is really fast.

For part 2, we do the same thing except we combine our numbers in the input. This was a very simple process, and the same procedure works. Doing 50 million operations is still pretty fast, so I only changed the parsing.

This is a fun break after dealing with the headache that was Day 5, but as mentioned before, I am scared of what Day 7 has to offer.