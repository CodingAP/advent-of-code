const part1 = async input => {
    let sues = [];

    let rightSue = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        let tokens = splitInput[i].split(' ');
        let newSue = {};
        for (let j = 2; j < tokens.length; j += 2) {
            newSue[tokens[j].replace(':', '')] = parseInt(tokens[j + 1].replace(',', ''));
        }
        sues.push(newSue);
    }

    for (let i = 0; i < sues.length; i++) {
        let knownObjects = Object.keys(sues[i]);
        let rightOne = true;
        for (let j = 0; j < knownObjects.length; j++) {
            if (sues[i][knownObjects[j]] != rightSue[knownObjects[j]]) {
                rightOne = false;
                break;
            }
        }
        if (rightOne) return i + 1;
    }
}

const part2 = async input => {
    let sues = [];

    let rightSue = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }

    let splitInput = input.split('\n');
    for (let i = 0; i < splitInput.length; i++) {
        let tokens = splitInput[i].split(' ');
        let newSue = {};
        for (let j = 2; j < tokens.length; j += 2) {
            newSue[tokens[j].replace(':', '')] = parseInt(tokens[j + 1].replace(',', ''));
        }
        sues.push(newSue);
    }

    for (let i = 0; i < sues.length; i++) {
        let knownObjects = Object.keys(sues[i]);
        let rightOne = true;
        for (let j = 0; j < knownObjects.length; j++) {
            if (knownObjects[j] == 'cats' || knownObjects[j] == 'trees') {
                if (sues[i][knownObjects[j]] <= rightSue[knownObjects[j]]) {
                    rightOne = false;
                    break;
                }
            } else if (knownObjects[j] == 'pomeranians' || knownObjects[j] == 'goldfish') {
                if (sues[i][knownObjects[j]] >= rightSue[knownObjects[j]]) {
                    rightOne = false;
                    break;
                }
            } else if (sues[i][knownObjects[j]] != rightSue[knownObjects[j]]) {
                rightOne = false;
                break;
            }
        }
        if (rightOne) return i + 1;
    }
}

export { part1, part2 };