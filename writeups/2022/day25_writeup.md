# Advent of Code 2022 - Day 25: [Full of Hot Air](https://adventofcode.com/2022/day/25)
By Alex Prosser

Leaderboard: 1330 (Part 1) / 1140 (Part 2)

Well, well, well. The last day of the Advent of Code 2022 puzzle set. This was quite a journey. In this puzzle, we are converting to and from SNAFU and decimal numbers. SNAFU numbers are essentially base-5 numbers but with some differences. There are the digits 0, 1, and 2, but now - and = are digits representing -1 and -2 respectively. In part 1 (and the only part), we need to convert the list of numbers given to us to decimal, add them together, and convert that number to SNAFU. After looking this up on Google, apparently these are called balanced based numbers. While there wasn't a formula to use specifically for base 5 numbers, there were enough examples for me to implement an algorithm. And that was it! 