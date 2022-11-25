const part1 = async input => {
    let string = input;
    for (let num = 0; num < 40; num++) {
        let newString = '';
        let current = { number: string[0], count: 1 };
        for (let i = 1; i < string.length; i++) {
            if (string[i] != current.number) {
                newString += current.count + current.number;

                current.number = string[i];
                current.count = 1;
            } else {
                current.count++;
            }
        }
        newString += current.count + current.number;
        string = newString;
    }
    return string.length;
}

const part2 = async input => {
    let string = input;
    for (let num = 0; num < 50; num++) {
        let newString = '';
        let current = { number: string[0], count: 1 };
        for (let i = 1; i < string.length; i++) {
            if (string[i] != current.number) {
                newString += current.count + current.number;

                current.number = string[i];
                current.count = 1;
            } else {
                current.count++;
            }
        }
        newString += current.count + current.number;
        string = newString;
    }
    return string.length;
}

export { part1, part2 }; 