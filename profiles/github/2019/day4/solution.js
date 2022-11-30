const part1 = async input => {
    let [min, max] = input.split('-').map(num => parseInt(num));

    let valid = 0;
    for (let password = min; password <= max; password++) {
        let passwordString = password.toString();
        let numberCount = passwordString.split('').reduce((count, digit) => {
            count[parseInt(digit)]++;
            return count;
        }, new Array(10).fill(0));

        let decreases = false;
        for (let i = 1; i < passwordString.length; i++) {
            if (parseInt(passwordString[i]) < parseInt(passwordString[i - 1])) decreases = true;
        }

        if (!decreases && numberCount.filter(element => element >= 2).length > 0) valid++;
    }
    return valid;
}

const part2 = async input => {
    let [min, max] = input.split('-').map(num => parseInt(num));

    let valid = 0;
    for (let password = min; password <= max; password++) {
        let passwordString = password.toString();
        let numberCount = passwordString.split('').reduce((count, digit) => {
            count[parseInt(digit)]++;
            return count;
        }, new Array(10).fill(0));

        let decreases = false;
        for (let i = 1; i < passwordString.length; i++) {
            if (parseInt(passwordString[i]) < parseInt(passwordString[i - 1])) decreases = true;
        }

        if (!decreases && numberCount.filter(element => element == 2).length > 0) valid++;
    }
    return valid;
}

export { part1, part2 };