/**
 * puzzles/2024/day09/solution.ts
 *
 * ~~ Disk Fragmenter ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 12/8/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let fileSystem: number[] = [];
    let file = 0;

    // create initial file system
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < parseInt(input[i]); j++) fileSystem.push((i % 2 === 0) ? file : -1);
        if (i % 2 === 0) file++;
    }

    // keep swapping empty spaces from bottom to top
    let bottom = 0, top = fileSystem.length - 1;
    while (bottom < top) {
        if (fileSystem[bottom] === -1) {
            while (fileSystem[top] === -1) top--;

            if (top < bottom) break; // edge case to prevent unneeded swaps
            fileSystem[bottom] = fileSystem[top];
            fileSystem[top] = -1;
        }
        bottom++;
    }

    // find checksum of file system
    let sum = 0;
    for (let i = 0; i < fileSystem.length; i++) {
        if (fileSystem[i] === -1) break;
        sum += fileSystem[i] * i;
    }
    
    return sum;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let fileSystem: { file: number, count: number }[] = [];
    let file = 0;

    // create file system with object representation
    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) fileSystem.push({ file: file++, count: parseInt(input[i]) });
        else fileSystem.push({ file: -1, count: parseInt(input[i]) });
    }

    let reducedFileSystem: { file: number, count: number }[] = [];
    for (let i = 0; i < fileSystem.length; i++) {
        // if processing a gap, try to fill with as many files from right to left
        if (fileSystem[i].file === -1) {
            // start at the end, while there is room
            let scan = fileSystem.length - 1;
            while (fileSystem[i].count > 0 && scan > i) {
                // if nonempty file has room to be put in gap, update gap size and try to find more if possible
                if (fileSystem[scan].file !== -1 && fileSystem[scan].count <= fileSystem[i].count) {
                    reducedFileSystem.push({ ...fileSystem[scan] });
                    fileSystem[i].count -= fileSystem[scan].count;
                    fileSystem[scan].file = -1;
                    scan = fileSystem.length - 1;
                }
                scan--;
            }

            // if gap is still there, make sure it is reflected in reduced
            if (fileSystem[i].count != 0) reducedFileSystem.push(fileSystem[i]);
        } else if (fileSystem[i].count != 0) {
            reducedFileSystem.push({ ...fileSystem[i] });
        }
    }

    // compute checksum with gaps in mind
    let index = 0, sum = 0, current = reducedFileSystem.shift();
    while (reducedFileSystem.length != 0) {
        if (current === undefined) break;

        if (current.file !== -1) {
            sum += current.file * index++;
            current.count--;
        } else {
            index += current.count;
            current.count = 0;
        }
        
        if (current.count === 0) current = reducedFileSystem.shift();
    }

    return sum;
};

export { part1, part2 };
