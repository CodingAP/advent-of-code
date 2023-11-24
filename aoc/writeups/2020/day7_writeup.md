# Advent of Code 2020 - Day 7: [Handy Haversacks](https://adventofcode.com/2020/day/7)
By Alex Prosser

This puzzle is the first occurence of recursion in 2020. We need to search through all the bags, where each bag contains other bags. In the first part, we count how many bags contain the `shiny gold` bag, whether directly or indirectly through another bag. This just consists of searching each bag and if any bag returns a `shiny gold` bag, return true. The second part needs to count how many bags is in one `shiny gold` bag. This is similar as we need to recursively search through all of the bags in the `shiny gold` bag, but instead of just searching for one bag, we need to count the bags in it. The formula for one bag is...

for bag in bags:
    `bag.count + bag.count * countBags(bag)`

With `countBags()` being the recursive function.