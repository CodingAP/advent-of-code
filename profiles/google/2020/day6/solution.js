const part1 = async input => {
    return input.split('\n\n').reduce((acc, element) => acc + new Set(element.split('\n').join('').split('')).size, 0);
}

const part2 = async input => {
    return input.split('\n\n').reduce((acc, element) => {
        let responses = element.split('\n');
        let individual = responses.join('').split('').reduce((obj, character) => {
            if (obj[character] == null) obj[character] = 0;
            obj[character]++;
            return obj;
        }, {});

        for (let character in individual) {
            if (individual[character] == responses.length) acc++;
        }
        return acc;
    }, 0);
}

export { part1, part2 }; 