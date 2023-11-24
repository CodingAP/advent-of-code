const part1 = async input => {
    let string = input;

    for (let i = 0; i < 40; i++) {
        let newString = '';
        let currentCount = 1;
        let currentNumber = string.charAt(0);
        for (let j = 1; j < string.length; j++) {
            if (currentNumber == string.charAt(j)) {
                currentCount++;
            } else {
                newString += currentCount + currentNumber;
                currentCount = 1;
                currentNumber = string.charAt(j);
            }
        }
        newString += currentCount + currentNumber;
        string = newString;
    }

    return string.length;
}

const part2 = async input => {
    let string = input;

    for (let i = 0; i < 50; i++) {
        let newString = '';
        let currentCount = 1;
        let currentNumber = string.charAt(0);
        for (let j = 1; j < string.length; j++) {
            if (currentNumber == string.charAt(j)) {
                currentCount++;
            } else {
                newString += currentCount + currentNumber;
                currentCount = 1;
                currentNumber = string.charAt(j);
            }
        }
        newString += currentCount + currentNumber;
        string = newString;
    }

    return string.length;
}

export { part1, part2 };