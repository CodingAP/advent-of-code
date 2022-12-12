# Advent of Code 2022 - Day 12: [Hill Climbing Algorithm](https://adventofcode.com/2022/day/12)
By Alex Prosser

Leaderboard: 4574 (Part 1) / 4116 (Part 2)

Ah yes, maze solving. I do say that I am not very good at these types of problems. I will admit, I didn't know where to go on this one, so the subreddit definitely helped me out. Granted, I didn't take code from it because I just wanted where to go on the algorithm, but I did copy/paste a BFS implemention from StackOverflow. In this puzzle, we need to find the shortest path between elevations denoted by letters in a mountain. In part 1, we need to find the shortest path between `S` and `E`. In part 2, we need to find the shortest path between any `a` and `E`. As mentioned before, I used breadth-first search to find the shortest path. It just finds the shortest path by optimizing short paths and adding on possible paths.