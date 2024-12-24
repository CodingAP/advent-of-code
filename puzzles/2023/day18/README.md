# Advent of Code 2023 - Day 18: [Lavaduct Lagoon](https://adventofcode.com/2023/day/18)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day18)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 40761 | 106920098354636 |
| **Time (in ms)** | 2.80 | 3.50 |

%%%

Leaderboard Positions - **Part 1**: 1750, **Part 2**: 14530

The days that I have to save for the morning are increasing, and I don't see this trend going down anytime soon...

In this puzzle, we are given instructions to construct a moat. Each line comes in the format of `direction, amount, color`. The `color` attribute actually doesn't matter for the puzzle (for color reasons at least). The instructions will create a closed shape that we have to calculate the area of. In part 1, we are just following the instructions to find the total area. My first approach (the one I did that night) uses a scanning line to find all areas that is inside the shape. This is possible because each point can be stored as there is only around 3500 points in the perimeter, and the for loop is small enough to be done quickly. This also led to a very cool visualization of the puzzle for part 1, which I did not keep as I will write a full visualizer for the puzzle (sometime someday hopefully).

In part 2, we need to convert the `color` attribute into a direction and amount. To do this, we take the first 5 digits and turn that in an amount (using `parseInt(num, 16)`), then we use the last digit for direction (`0` to `R`, `1` to `D`, `2` to `L`, `3` to `U`). However, the algorithm before doesn't work as the for loop is now doing trillions of operations, which cannot be done quickly. So allow me to introduce you to the shoelace algorithm. It is defined as such...

```
p = list of points

area =
    sum from 1 to n:
        p[i].x * p[i + 1].y - p[i].y * p[i + 1].x
```

This can calculate any area of any shape from a list of points (take the absolute value as it can be negative). We can easily get those list of points because we have the shape instructions. We still need to calculate with the perimeter, so we use another math concept: Pick's Theorem.

```
total area = inside points + outside points / 2 - 1
```

The `inside points` is the area calculated above and the `outside points` is the perimeter points. However, we have some overlap on the perimeter for the starting point, so instead of using -1, we use +1. So the final formula for this puzzle is...

```
p = list of points
area = 0
perimeter = 0

sum from 1 to n:
    area += p[i].x * p[i + 1].y - p[i].y * p[i + 1].x
    perimeter += distance between p[i], p[i + 1]

return abs(area) + perimeter / 2 + 1
```

After figuring that my first algorithm wouldn't work on such a large distance, I just looked up how to find area of irregular shapes, which led me to the shoelace formula. Then, I had to narrow by saying integer grid, which got me Pick's. This is just to say that Googling is not a bad idea, especially if you are stuck. It can lead to some great ideas.