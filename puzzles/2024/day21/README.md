# Advent of Code 2024 - Day 21: [Keypad Conundrum](https://adventofcode.com/2024/day/21)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2024/day21)

## Results

|                  | **Part 1** | **Part 2** |
| :--------------: | :--------: | :--------: |
|   **Results**    | 136780 | 167538833832712 |
| **Time (in ms)** | 4.98 | 22.21 |

%%%

Leaderboard Positions - **Part 1**: 1620, **Part 2**: 708

[Video Replay](https://youtu.be/FYsSUm6UpI8)

Hello all! In this puzzle, we are using many layers of robots to control other robots to hit a keypad. We are given a keypad with a code to enter; however, we must use a robot's arm to hit those keys using a directional keypad. We must also control this robot with another robot with the same keypad. Then, one more time, we must control that robot with another robot. Finally, we can control that last robot. All robots start on the key `A` for the given keypad. For example, given the keypads in the puzzle, to hit the number `5`, we must do the following on all robots...

```
robot 1: ^^<A
robot 2: <AAv<A>^>A
robot 3: <v<A>^>AA<vA<A>^>AvA<^Av>A^A

(may not be optimal)
```

In part 1, we need to find the complexity of each code, which consists of the length of presses needed for the code multiplied by the numerical part of the code. My initial solution was to find the shortest path at each robot iteration, then use that to expand to the next one. This didn't guarantee that the shortest path would be found however, which caused problems even on the sample case. I also used BFS to find all the paths between two buttons on either keypad. I had to throw away my initial solution in favor of a recursively solution, which worked out much better. In part 2, we now are using 26 total robots to control the keypad, which with my original solution would be impossible; however, with my recursive solution, it works when I add memoization. The trick is to only count the lengths of the strings rather than try to create the string itself. 