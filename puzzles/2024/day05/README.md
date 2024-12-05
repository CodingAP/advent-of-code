# Advent of Code 2024 - Day 5: [Print Queue](https://adventofcode.com/2024/day/5)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day05)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 6612 | 4944 |
| **Time (in ms)** | 2.70 | 9.30 |

%%%

Leaderboard Positions - **Part 1**: 547, **Part 2**: 691

[Video Replay](https://youtu.be/x-HcVnRBreM)

Hello all! In this puzzle, we are trying to order pages given a specific set of page rules. Each page rule is defined by `<a>|<b>`, where the page a must be before page b to be correct. In part 1, we need to find all correct pages and sum the middle index. To find if a list is correct or not, you can store the rules as a mapping of arrays where the array represents all pages allowed to be to the left of a page. For example...

```
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

is stored as...

13: 97, 61, 29, 47, 75, 53
29: 75, 97, 53, 61, 47
47: 97, 75
53: 47, 75, 61, 97
61: 97, 47, 75
75: 97
97: -
```

This allows quick indexing to see if all items to the left of the current number. For example...

```
75,47,61,53,29

75 | 47 : no violation
75, 47 | 61 : no violation
75, 47, 61 | 53 : no violation
75, 47, 61, 53 | 29 : no violation

75,97,47,61,53

75 | 97 : violation!!!
```

Then, you can sum up all the middle indices (all list should have an odd length). In part 2, we need to fix the incorrect lists and add all those instead. With the previous structure, it makes it super simple to sort the list as we already have an ordering based on the array's length. For example, if all numbers in the sample input where is the list, we know 97 must come first, which has no elements, then 75 with 1 element, 47 with 2 elements and so on. For lists without all the numbers, we can just remove the unneeded elements to make sure no conflicts arise. This was my best day so far, so I am pretty happy :).