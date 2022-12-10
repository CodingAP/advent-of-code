# Advent of Code 2022 - Day 9: [Rope Bridge](https://adventofcode.com/2022/day/9)
By Alex Prosser

Leaderboard: 925 (Part 1) / 2932 (Part 2)

In this puzzle, we need to simulate a rope with differing lengths depending on the part. In part 1, there are only 2 knots, which made it easy to hardcode where the knot would be after it left the range. However, in part 2, there are 10 knots, which made my first solution not work anymore. I rewrote part 1 to be able to have any length of rope and I had figure out how to move the knots after it went out of range. What I had to do is if the distance is too far from the previous knot, then I essentially normalized that data, which just means that it is only 1 distance away from the knot. I finished it that night, but I came back and rewrote both parts to be more concise when I was fully awake. The solution in the repo should be able to handle any length of rope, which is very cool for visual simulations. 