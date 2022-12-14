const part1 = async input => {
    return input.split('\n').reduce((acc, line) => {
        let parts = line.split(/[\[\]]/g);
        let inSquare = false, outside = false;
        for (let j = 0; j < parts.length; j++) {
            let string = parts[j].match(/(\w)(\w)\2\1/);

            if (string && string[0].charAt(0) != string[0].charAt(1)) {
                if (j % 2 == 1) inSquare = true;
                else outside = true;
            }
        }
        if (outside && !inSquare) acc++;
        return acc;
    }, 0);
}

const part2 = async input => {
    return input.split('\n').reduce((acc, line) => {
        let parts = line.split(/[\[\]]/g);
        let square = [], outside = [];
        for (let j = 0; j < parts.length; j++) {
            let strings = Array.from(parts[j].matchAll(/(?=((\w)(\w)\2))/g), iter => iter[1]);

            for (let k = 0; k < strings.length; k++) {
                if (strings[k].charAt(0) != strings[k].charAt(1)) {
                    if (j % 2 == 1) square.push(strings[k]);
                    else outside.push(strings[k]);
                }
            }
        }

        let matching = false;
        for (let j = 0; j < square.length; j++) {
            for (let k = 0; k < outside.length; k++) {
                if (square[j].charAt(0) == outside[k].charAt(1) && square[j].charAt(1) == outside[k].charAt(0)) matching = true;
            }
        }

        if (matching) acc++;
        return acc;
    }, 0);
}

export { part1, part2 };