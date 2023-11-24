# Advent of Code 2022 - Day 2: [Rock Paper Scissors](https://adventofcode.com/2022/day/2)
By Alex Prosser

Leaderboard: 213 (Part 1) / 287 (Part 2)

Ah, Rock Paper Scissors. It is an easy game to master, but slightly harder to program. Only slightly, however. In this puzzle, we need to try to be the best Rock Paper Scissors player by following the script another elf gave us. For the first part, we just need to play the moves given by the script. Each move is given by `[opponent's move] [our move]`, so parsing isn't difficult. For the actual moves, `A`, `B`, and `C` are used for the opponent while `X`, `Y`, and `Z` are used for us. `A` and `X` means Rock, `B` and `Y` means Paper, and `C` and `Z` means Scissors. We gain points based on the win/draw/loss of the move plus whatever sign we used (`1` point for rock, `2` points for paper, and `3` points for scissors).

For the second part, we now need to parse our move as whether we win/draw/lose. `X` means we lose, `Y` means we draw, and `Z` means we win (the parsing doesn't change for the opponent). The scoring is the same.

In my first version, I just did a bunch of conditionals to see what the outcome will be (this is changed to a table, which makes it more compact). If it is a win, add `6`; if it is a draw, add `3`. We don't need to care about losing in the first part because it doesn't add anything. Then we need to add the points based on what move we used (again, replaced by a table in the new version). The second part used tables, but still had a bunch of conditionals to add the points (also replaced by tables, which helps a lot in these challenges)