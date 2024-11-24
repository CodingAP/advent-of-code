Leaderboard Positions - **Part 1**: 2939, **Part 2**: 4846

Alright, my worst day so far. I was distracted while coding (watching Downton Abbey with a friend), so it is very understandable; plus, I took a very bad approach while solving the first part, which led to the second part having to be refactored. Oh well...

In this puzzle, we are trying to calculate the distances between pairs of expanding galaxies. The prompt comes in three parts. We first parse the grid to get the positions of the unexpanded galaxies. Then, we expand on the rows and columns that doesn't have any galaxies. Finally, we calculate the shortest distances between all galaxies.

For part 1, the expansion size of each unoccupied row/column is `2`. This prompted me to create a new row or column of a 2D array when I saw a unoccupied row/column. Then, calculating the shortest distances was always going to be the Manhattan distance (thanks to integer grids). This worked for part 1, but for part 2, the expansion size went up `1000000`! Obviously, my naive solution will not work on this large number (I still tried and my heap size overflowed and crashed). That is when I transitioned to keeping track of which row and column were expanded, then manually calculating each galaxy's position by adding 1 or the expansion size. This worked wonderfully, and I got the answer really quickly.

I had suspected it was going to be this type of problem, but I wanted to make a solution as fast as possible rather than as flexible as possible. Woe is me...