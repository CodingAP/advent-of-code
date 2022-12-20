# Advent of Code 2022 - Day 20: [Grove Positioning System](https://adventofcode.com/2022/day/20)
By Alex Prosser

Leaderboard: 884 (Part 1) / 1138 (Part 2)

A surprisingly simple puzzle after the last 5 days of hell. In this puzzle, we are mixing an array of numbers by their value. Positive numbers means move forward by that amount. Negative numbers means move backwards by that amount. The catch is that we have to sort in the same order everytime, so we have to keep track of two arrays, one untouched and obviously the mixed one.

In part 1, we just follow what the prose gives us, nothing special. In part 2, we first multiply the number by a "decryption key", then we do the mixing 10 times. Because of past puzzles involving lists, I just started by creating a linked list immediately, and then did swapping with them. However, because of part 2 and the large number we are dealing with, I just used normal arrays with index math to make it run at a much shorter time.