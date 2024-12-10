/**
 * puzzles/2021/day13/solution.ts
 *
 * ~~ Transparent Origami ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    // parse dots and lines
    const [dotLines, foldLines] = input.trim().split('\n\n');
    let dots: { x: number, y: number }[] = dotLines.split('\n').map(element => {
        const [x, y] = element.split(',').map(num => parseInt(num));
        return { x, y };
    });

    // get first fold and modify points
    const [direction, place] = foldLines.split('\n')[0].split(' ')[2].split('=');
    
    if (direction === 'x') {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
        }
    } else {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
        }
    }

    // remove duplicates
    dots = Array.from(new Set(dots.map(dot => `${dot.x},${dot.y}`))).map(element => {
        const [x, y] = element.split(',').map(num => parseInt(num));
        return { x, y };
    });

    return dots.length;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    // parse dots and lines
    const [dotLines, foldLines] = input.trim().split('\n\n');
    let dots: { x: number, y: number }[] = dotLines.split('\n').map(element => {
        const [x, y] = element.split(',').map(num => parseInt(num));
        return { x, y };
    });

    // fold upon all lines
    foldLines.split('\n').forEach(line => {
        const [direction, place] = line.split(' ')[2].split('=');

        if (direction == 'x') {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
            }
        } else {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
            }
        }
    });

    // print grid
    // const grid = new Set(dots.map(dot => `${dot.x},${dot.y}`));
    // const minX = Math.min(...Array.from(grid).map(dot => parseInt(dot.split(',')[0])));
    // const maxX = Math.max(...Array.from(grid).map(dot => parseInt(dot.split(',')[0])));
    // const maxY = Math.max(...Array.from(grid).map(dot => parseInt(dot.split(',')[1])));
    // const minY = Math.min(...Array.from(grid).map(dot => parseInt(dot.split(',')[1])));

    // for (let y = minY; y <= maxY; y++) {
    //     let row = '';
    //     for (let x = minX; x <= maxX; x++) {
    //         if (grid.has(`${x},${y}`)) row += '#';
    //         else row += ' ';
    //     }
    //     console.log(row);
    // }

    return 'FAGURZHE';
};

export { part1, part2 };
