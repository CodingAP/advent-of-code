# Advent of Code 2022 - Day 7: [No Space Left On Device](https://adventofcode.com/2022/day/7)
By Alex Prosser

Leaderboard: 4248 (Part 1) / 3704 (Part 2)

Wow, this puzzle was not the best. I will first talk about how to solve this puzzle, then go over why it isn't the cleanest puzzle. In this puzzle, we need to figure out the sizes of directories given a terminal command list. It has a root folder (`/`) with many files and directories nested in it. Each line is either a command or a listing of a file/directory. The commands are `cd` and `ls` and start with a `$`, where `cd` changes the directory depending on the argument provided and `ls` lists all the files and directories. If `cd` is provided with `..`, it goes back a directory, and if it is provided a `/`, it goes to the root directory. The other lines are either files or directories, where a directory is noted with `dir` and files are noted with a number for the size. Example terminal output is...

```
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
```

This would create this file system...

```
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
```

One note that is not said in the puzzle is that a directory can have the same name of another directory if it is not in the same place, which messed with my code. I think that should have been said in the puzzle prose because that is a crucial step to fixing the bugs I had.

For part 1, we need to find all the directories that have a size that is at most 100000 and sum them all together. One note is that the size consist of all the files and subdirectories, so some directories can be counted multiple times. This is a recursive problem where we need to find all the subdirectories and calculate the size.

For part 2, we need to make room by removing one directory in the file system that makes the update happen. Specifically, we have at most 70000000 somethings (the size type isn't specified), and we need 30000000 somethings. We need to find all the sizes of each directory and see if removing it will give enough room, and we take the smallest size.