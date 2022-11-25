const part1 = async input => {
    let numbers = input.split('\n').map(element => parseInt(element));
    for (let j = 0; j < numbers.length; j++) {
        for (let i = 0; i < numbers.length; i++) {
            if (i == j) continue;

            if (numbers[i] + numbers[j] == 2020) return numbers[i] * numbers[j];
        }
    }
}

const part2 = async input => {
    let numbers = input.split('\n').map(element => parseInt(element));
    for (let k = 0; k < numbers.length; k++) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < numbers.length; j++) {
                for (let i = 0; i < numbers.length; i++) {
                    if (i == j && k == j) continue;

                    if (numbers[i] + numbers[j] + numbers[k] == 2020) return numbers[i] * numbers[j] * numbers[k];
                }
            }
        }
    }
    
}

export { part1, part2 }; 