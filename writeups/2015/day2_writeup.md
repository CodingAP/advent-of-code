# Advent of Code 2015 - Day 2: [I Was Told There Would Be No Math](https://adventofcode.com/2015/day/2)
By Alex Prosser

The second day of 2015 start the trend of these puzzles to go through a list of numbers and calculate the sum of some value. For this puzzle, we need to calculate present material amount from a list of box's dimensions (ex. ```[l]x[w]x[h]```). To make the code easier, I sort the dimensions before calculating it so that ```l``` and ```w``` are the smallest values. The first part needs to find the wrapper paper amount, which is the surface area of the box plus the area of the smallest size. The formula for this for a box (```[l]x[w]x[h]```) is...

```2*l*w + 2*w*h + 2*l*h + l*w```

The second part need to find the ribbon length, which is the smallest perimeter and the cubic volume of the box. The formula for this for a box (```[l]x[w]x[h]```) is...

```l*w*h + 2*l + 2*w```

Adding up all those formulas for each part gets the results.