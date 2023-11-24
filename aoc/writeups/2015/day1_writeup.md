# Advent of Code 2015 - Day 1: [Not Quite Lisp](https://adventofcode.com/2015/day/1)
By Alex Prosser

This is the first ever Advent of Code puzzle. I believe that this is a very good introduction puzzle as it is not complicated to the point of nonstart, but still has a bit of thinking needed, especially the second part. I didn't start with 2015 as I started my first Advent of Code in 2019.

Now to the actual puzzle, we need to find the floor of the elevator. We just need to loop through all the characters in the input, which is either a `(` or a `)`. If it is a `(`, then we go up a floor; if it is a `)`, then we go down a floor. For the first part, we just need to figure out the floor after all the characters. The second part needs to find the first index that makes the elevator go to basement, or when floor goes negative.