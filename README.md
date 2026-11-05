# Advent of Code

These are all my solutions for the years of [Advent of Code](https://adventofcode.com), in TypeScript.

```
puzzles/<year>/dayNN/   solution.ts, README.md (results table, then my writeup after %%%), examples.json (example inputs + expected answers)
puzzlehub.json          tells the puzzle hub how this repository is laid out
hub.db                  puzzle titles, submitted answers and run history (sqlite)
template.ts             what a new solution starts from
```

Every solution exports `part1` and `part2`, each taking the puzzle input as a string and returning the answer.

### Running them

The tooling lives in its own repository, [puzzle-hub](https://github.com/CodingAP/puzzle-hub): a small Deno server with a CLI, a JSON API and a browser editor that can host any number of puzzle repositories like this one. Clone both next to each other, list this folder in the hub's `hub.json`, and:

```bash
deno task cli credential --source=advent-of-code --value=<your adventofcode.com session cookie>
deno task cli fetch --source=advent-of-code --year=2024 --day=1    # downloads input.txt and puzzle.md (never committed)
deno task cli run --source=advent-of-code --year=2024 --day=1
deno task serve                                                    # dashboard + editor on http://localhost:8000
```

My own instance runs at https://challenges.codingap.dev.

`deno.json` only carries the import map a few 2016 solutions need (`@std/crypto`).

### Note for AOC moderators

Requests to adventofcode.com are made only by the hub's Advent of Code provider ([advent-of-code.ts](https://github.com/CodingAP/puzzle-hub/blob/main/backend/src/providers/advent-of-code.ts)), with a User-Agent that points back to me, and only when a command or API call explicitly asks for them. Inputs and puzzle text are never committed.
