# Advent of Code 2015 - Day 1: [Not Quite Lisp](https://adventofcode.com/2015/day/1)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2015/day01)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 280 | 1797 |
| **Time (in ms)** | 0.25 | 0.27 |

%%%

The first puzzle of Advent of Code! This is also the start of the Advent of Code Hub that I created! This was a lot of work, but I'm happy to show everything I built off because I believe it will be a very valuable learning experience, not only to the people reading but to myself as well. Anyways, on to the puzzle!

In this puzzle, we are on an elevator that moves up and down, and it is controlled by a series of parenthesis: `(` makes us go up and `)` makes us go down.

For the first part, we need to find what floor we end up on. Single enough, I used a `.reduce()` to go through all characters and add 1 if it was a `(` and -1 if it was a `)`. For my input, my answer is `280`.

For the second part, though, we need to find when we first enter the 'basement', or when we reach a negative floor. Instead of using `.reduce()`, I just looped normally and checked when we hit a negative floor. I did it with a flag, which is slightly weird, but it works...

```javascript
let floor = 0, first = -1;
input.split('').forEach((char, index) => {
    floor += (char == '(') ? 1 : -1;
    if (floor < 0 && first == -1) first = index + 1;
});
```

Afterwards, for my input, my answer is `1797`. I didn't compete during 2015 (my first was 2019), so this was done after the fact. I think for a first-ever concept, it worked well. The first part was easy while the second part used the same concept, but changed it to target a different solution. 