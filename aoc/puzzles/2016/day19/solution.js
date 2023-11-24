const part1 = async input => {
    // thank you numberphile (https://www.youtube.com/watch?v=uCsD3ZGzMgE&ab_channel=Numberphile)
    let binary = parseInt(input).toString(2);
    return parseInt(binary.slice(1) + binary.charAt(0), 2);
}

const part2 = async input => {
    let num = parseInt(input);
    let largest3 = 1;
    while (largest3 < num) largest3 *= 3;
    largest3 /= 3;
    let current = 0, increase = 1;
    
    for (let i = largest3; i < num; i++) {
        current += increase;
        if (i == largest3 / 3) increase = 2;
    }

    return current;
}

export { part1, part2 };