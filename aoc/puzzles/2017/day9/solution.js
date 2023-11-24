const part1 = async input => {
    let garbage = false, depth = 0, total = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '!') i++;
        else if (input[i] == '<') garbage = true
        else if (input[i] == '>') garbage = false;

        if (!garbage) {
            if (input[i] == '{') depth++;
            else if (input[i] == '}') {
                total += depth;
                depth--;
            }
        }
    }

    return total;
}

const part2 = async input => {
    let garbage = false, total = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '!') i++;
        else if (input[i] == '<' && !garbage) garbage = true
        else if (input[i] == '>') garbage = false;
        else if (garbage) total++;
    }

    return total;
}

export { part1, part2 };