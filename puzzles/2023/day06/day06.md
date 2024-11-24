Leaderboard Positions - **Part 1**: 303, **Part 2**: 178

It seems to be that the even days are the easier problems and the odd days are the harder problems (with the even days getting easier and the odd days get harder). I did absolutely wonderful this day, the best I did so far, but it makes me very wary of the Day 7 (oh no).

Anyways, for this puzzle we need to see which of our boats beats the record distances given to us based on how long we hold on to the accelerator. For example, if our time is `15 seconds` and our record distance of `40 units`, we can hold the accelerator for `7 seconds`, which allows the boat to go at `7 units/sec`; however, we then only have `8 seconds` to race. That will allow it to go `56 units (7 units/sec * 8 sec)`, which beats the record.

For part 1, we need to go through all pairs of times and distances; for each, we need to find how many ways we can beat the record and then multiply them all together. This just consists of doing a for loop on each pair that checks if `i * (time - i)`, with i being an iterator from `1-time`, is greater than the record. Since the numbers are very small (especially compared to Day 5), this is really fast.

For part 2, we do the same thing except we combine our numbers in the input. This was a very simple process, and the same procedure works. Doing 50 million operations is still pretty fast, so I only changed the parsing.

*NOTE: This can also be solved by quadratic formula, which I did not implement. Here is the details if you want to see*

[Desmos Link](https://www.desmos.com/calculator/lhonoroyz9)

```
time: 15 seconds
record: 40 meters

x * (15 - x) > 40
-x^2 + 15x > 40
x^2 - 15x + 40 < 0

quadratic formula:
(-(-15) + sqrt((-15)^2 - 4(1)(40))) / 2(1)
= (15 + sqrt(65)) / 2
= 11.53

(-(-15) - sqrt((-15)^2 - 4(1)(40))) / 2(1)
= (15 - sqrt(65)) / 2
= 3.47

finding range between solutions (only integers)
abs((ceil(11.53) - 1) - (floor(3.47) + 1)) + 1
= abs(11 - 4) + 1
= 8

8 different ways to beat record
```

This is a fun break after dealing with the headache that was Day 5, but as mentioned before, I am scared of what Day 7 has to offer.