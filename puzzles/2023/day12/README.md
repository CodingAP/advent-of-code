# Advent of Code 2023 - Day 12: [Hot Springs](https://adventofcode.com/2023/day/12)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day12)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 7350 | 200097286528151 |
| **Time (in ms)** | 32.44 | 725.12 |

%%%

Leaderboard Positions - **Part 1**: 253, **Part 2**: 15266

The first day that I couldn't solve that night. Granted, I did solve part 1 really fast with a naive solution, but because I knew that this was Advent of Code, that I would have to rewrite my solution.

In this puzzle, we are given a list of broken and functional springs, as well as some that we do not know the condition of. What we do know is the groups of the functional springs, so we must find all possible combinations that allow for the spring groups to match up. In part 1, we just find all possible for every list and add them up. My naive solution (still listed in the source code) brute forces all possible combinations and checks to see if the groups lines up. This works for the first part because of the relatively small search space (the highest it gets is like `14` or `15`, which only checks around `125000` conditions). 

For part 2, however, we are told to multiply the lengths of everything by `5`, which turns our small search to the biggest possible (`14` or `15` now turns to `60`, which is `18 quintillion possibilities`!). With brute forcing out the window, I had to find a different way to search. This is going to involve what is called 'dynamic programming'. This is a term that I know exists, but don't really know how to use. The best explanation I have seen is 'recursion that remembers', and looking at the megathread on Reddit, that is what most people did. So, reimplementing part 1, I started with adding a recursion loop that goes through all the characters, replace any `?` with both a `#` and `.` and adds a branch if the current group still lines up with the current group count; if it doesn't, we throw away the group. This works by itself for part 1, but because we have such a large search space, we use memoization to skip searches we have already done. We can do this because we should get the same results by searching the same conditions. We add an object to the search to keep track of every item in the list, then add like normally. This takes less than a second, which is much better than the multiple thousands of years of searching we had to do naively.

I am not surprised that this day would come because I was already struggling with other days, but on day 12? Since I am writing after a couple days, I know that the difficultly curve isn't insane right now, but it will come.