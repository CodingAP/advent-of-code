const part1 = async input => {
    let sues = [];
    input.replace(/[,:]/g, '').split('\n').forEach(element => {
        let tokens = element.split(' ').slice(2);
        let sue = {};
        for (let i = 0; i < tokens.length; i += 2) {
            sue[tokens[i]] = parseInt(tokens[i + 1]);
        } 
        sues.push(sue);
    });

    let neededSue = {
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
    };

    return sues.findIndex(element => {
        let correct = true;
        Object.keys(element).forEach(key => {
            if (neededSue[key] != element[key]) correct = false;
        });
        return correct;
    }) + 1;
}

const part2 = async input => {
    let sues = [];
    input.replace(/[,:]/g, '').split('\n').forEach(element => {
        let tokens = element.split(' ').slice(2);
        let sue = {};
        for (let i = 0; i < tokens.length; i += 2) {
            sue[tokens[i]] = parseInt(tokens[i + 1]);
        }
        sues.push(sue);
    });

    let neededSue = {
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
    };

    return sues.findIndex(element => {
        let correct = true;
        Object.keys(element).forEach(key => {
            if (key == 'cat' || key == 'trees') {
                if (neededSue[key] >= element[key]) correct = false;
            } else if (key == 'pomeranians' || key == 'goldfish') {
                if (neededSue[key] <= element[key]) correct = false;
            } else {
                if (neededSue[key] != element[key]) correct = false;
            }
        });
        return correct;
    }) + 1;
}

export { part1, part2 }; 