# Advent of Code 2023 - Day 19: [Aplenty](https://adventofcode.com/2023/day/19)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day19)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 333263 | 130745440937650 |
| **Time (in ms)** | 7.09 | 22.76 |

%%%

Leaderboard Positions - **Part 1**: 691, **Part 2**: 2161

In this puzzle, we are given a list of workflows, which define what values should be accepted/rejected. It is a bit of a convoluted way, of course, where each workflow has a list of conditions that either send it to another workflow or gets accepted or rejected. Each part is defined by `x`, `m`, `a`, `s`. Let's look at an example...

```
pv{a>1716:R,A}
in{s<1351:A,px}
px{a<2006:pv,m>2090:A,R}

ex: {x=787,m=2655,a=1222,s=2876}

in: 2876 < 1351 : no  (go to px)
px: 1222 < 2006 : yes (go to pv)
pv: 1222 > 1716 : no  (accepted)
```

For part 1, we need to take the list of part numbers given in the input and check to see if there accepted. If they are, add all the part numbers together to the total sum. The hardest part of the puzzle is to parse both the workflows and the part numbers (both take an approach that is close to JSON object, but I chose to parse to an abstract syntax). The method I chose is to go through the workflows recursively until I find an acceptance or rejection.

For part 2, we need to find all possible combinations of ranges that will be accepted. This requires a search to go through all states. If a condition is found, we split the range and search the corresponding workflow. If we get an accepted, we add the state to the accepted list; if it is rejected, we stop searching that range. With all accepted ranges, we multiply the ranges and add them together to find all possible. 

I almost saved this one for the morning, but after looking for hints in the subreddit, I saw that you have to do a DFS. I didn't even look at their code, I just needed to know what to do. While it could be considered 'cheating', learning is far more valuable.