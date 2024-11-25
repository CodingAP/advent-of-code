# Advent of Code 2023 - Day 16: [The Floor Will Be Lava](https://adventofcode.com/2023/day/16)

## [Write Up](https://codingap.github.io/advent-of-code/writeups/2023/day16)
## Results
|| **Part 1** | **Part 2** |
|:--:|:---:|:---:|
| **Results** | 8146 | 8358 |
| **Time (in ms)** | 17.34 | 2729.75 |

%%%

Leaderboard Positions - **Part 1**: 5198, **Part 2**: 4905

I also started this one late as I was playing Mario Party. The local leaderboards are settling any way, and there is a unlikely chance that I will make anything global-wise, so I will accept doing the puzzles an hour later (it still only tryhards at that time, so it shouldn't affect much).

In this puzzle, we are simulating a laser beam that travels through a room of mirrors. The beam has a direction, and each character in the input can affect it. Taken from the prose...

- If the beam encounters **empty space** (`.`), it continues in the same direction.
- If the beam encounters a **mirror** (`/` or `\`), the beam is reflected 90 degrees depending on the angle of the mirror. For instance, a rightward-moving beam that encounters a `/` mirror would continue **upward** in the mirror's column, while a rightward-moving beam that encounters a `\` mirror would continue **downward** from the mirror's column.
- If the beam encounters the pointy end of a splitter (`|` or `-`), the beam passes through the splitter as if the splitter were **empty space**. For instance, a rightward-moving beam that encounters a `-` splitter would continue in the same direction.
- If the beam encounters the **flat side of a splitter** (`|` or `-`), the beam is **split into two beams** going in each of the two directions the splitter's pointy ends are pointing. For instance, a rightward-moving beam that encounters a `|` splitter would split into two beams: one that continues **upward** from the splitter's column and one that continues **downward** from the splitter's column.

This means that we had multiple beam heads to deal with, which meant I was using an array. I took a queue approach that just held all current beams, then used `.shift()` to get all the beams until they either hit the edge or repeated a beam path. The reason I had to check for repeating beam paths is that the beams would keep hitting infinite loops, which would cause the program to not end. I just used a set to keep track of `x,y,direction`. Then, when counting, I removed duplicated positions.

For part 1, we need to see how many tiles the beam starting at the top left corner `(0,0)` facing right will 'energize'. This was very simple as I just made a movement function for each tile of the grid, which adds either the same beam back into the queue or adds two beams going in different directions (depending on the current tile). This ran fast enough, so part 2 dealt with finding the highest energize count for all the beams coming from the edge. So not only the top left, but the entire left edge (facing right), the right edge (facing left), the top edge (facing down), and the bottom edge (facing up). Also, I had to check the corners twice for each direction (ex: top left facing right AND down).

If it wasn't for the infinite loop and me starting an hour later, I probably would have done better, but alas, I had to beat others in Mario Party (Yoshi ftw).