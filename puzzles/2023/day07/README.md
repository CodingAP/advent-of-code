# Advent of Code 2023 - Day 7: [Camel Cards](https://adventofcode.com/2023/day/7)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day07)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 250254244 | 250087440 |
| **Time (in ms)** | 5.83 | 138.28 |

%%%

Leaderboard Positions - **Part 1**: 92, **Part 2**: 1304

Wow, the odd day wasn't as bad! Wasn't pleasant either, but comparing to Day 5, it was simple. I also got on the global leaderboard for the first time this year. This was my second time overall, too.

For this puzzle, we have a list of hands that are being played under 'Camel Card' rules. They are similar to Poker, but the High Card is determined from left to right, not the highest overall. The ranks are as such: 5 of a Kind, 4 of a Kind, Full House, 3 of a Kind, Two Pair, One Pair, and the High Card. For part 1, we need to sort the hands worst to best, multiply the rank number by the bid, and add them up. The way I do this is by passing the hand to `getHandRank()` and it returns a number depending on what rank it is. That can be passed in `.sort()` to do the sorting for me. As mentioned above, the High Card is from left to right, so indexes worked for this one.

For part 2, the `J's` are not Jacks but Jokers, which means that they could be any of the cards. This complicates it a bit as there are many options, but we can optimize because if there is 4 or 5 Jokers, we know the best can be a 5 of a kind. If there is less, we generate all possible combinations and find the highest rank. Technically, we can apply more rules to optimize further, but it ran in a reasonable amount of time with this rule, so I'm fine with it.

This one should be the best for a visualization, and I want to try and make a deck of cards in the AOC ASCII style, so look out for that! 