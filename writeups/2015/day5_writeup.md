# Advent of Code 2015 - Day 5: [Doesn't He Have Intern-Elves For This?](https://adventofcode.com/2015/day/5)
By Alex Prosser

In this puzzle, we are just checking to see which of the strings in the input are nice (and by association, naughty). The first part has these three conditions (from the website):

* It contains at least three vowels (aeiou only), like `aei`, `xazegov`, or `aeiouaeiouaeiou`.
* It contains at least one letter that appears twice in a row, like `xx`, `abcdde` (`dd`), or `aabbccdd` (`aa`, `bb`, `cc`, or `dd`).
* It does not contain the strings `ab`, `cd`, `pq`, or `xy`, even if they are part of one of the other requirements.

There is a way to do the entire puzzle with just regular expressions, but I am not an expert with those; however, I did still use them for vowels and the bad strings. This just consisted of checking if the current string has those bad strings, continuing if it doesn't, and seeing if it has a double letter and three vowels. The second part has a different set of conditions (again, from the website):

* It contains a pair of any two letters that appears at least twice in the string without overlapping, like `xyxy` (`xy`) or `aabcdefgaa` (`aa`), but not like `aaa` (`aa`, but it overlaps).
* It contains at least one letter which repeats with exactly one letter between them, like `xyx`, `abcdefeghi` (`efe`), or even `aaa`.

Using the safe structure as part 1, we can also use regular expressions again, but I chose not to at all as it gets much more complicated that way. This also has to check for overlapping pairs unlike part 1. This just uses for loops to find all the conditions, and a `pairs` object that keeps track of all two letter sequences (but removes the overlaps). 