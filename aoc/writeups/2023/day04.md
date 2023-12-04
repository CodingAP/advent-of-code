Leaderboard Positions - **Part 1**: 1344, **Part 2**: 642

I think I should make some data sets after the fact because this is really interesting data to look at. Time to solve, lines of code written, total runtime, etc. That could be an interesting project to look after, but currently I'm struggling to make visualizations, so who am I to say?

For the puzzle, we need to parse a list of scratch off tickets where the winning numbers are on the left of the `|` and the numbers chosen are on the right of the `|`. This was much simpler to parse because it only had three seperators (I know I could use regex or a string parser, but I use `.split()` too much to not implement it). For part 1, we need to 'score' each card by seeing how many drawn numbers match the winning numbers. The formula is...

`2^(n-1) if n > 0`

This is pretty simple as we can use a `.filter()` to check how many are winning numbers, then add all the cards using the formula above.

For part 2, we have a different strategy. For every winning number, we receive a *copy* of the cards below it corresponding to the number of winning numbers. So if we have 3 winning numbers on Card 1, we get Cards 2, 3, and 4. This is very much a recursive search, so we create a function that counts the cards used that calls itself with terminating conditions. In my first attempt, I didn't add memoization as I was trying to type code as fast as possible; however, I did afterwards because it did run slightly slow.

I've heard that through the weekdays that the problems get easier because Eric tries to put difficult problems on the weekend so that it doesn't interrupt a work day (imagine having that type of influence). That means that the next few puzzles should be easier, but it is not a guarantee.   