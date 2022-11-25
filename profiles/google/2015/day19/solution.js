const part1 = async input => {
    let [ruleDefintions, molecule] = input.split('\n\n');

    let rules = [];
    ruleDefintions.split('\n').forEach(element => {
        let [input, output] = element.split(' => ');
        rules.push({ input, output });
    });

    let tokens = [];
    let current = '';
    for (let i = 0; i < molecule.length; i++) {
        if (molecule[i] == molecule[i].toUpperCase()) {
            tokens.push(current);
            current = '';
        }
        current += molecule[i];
    }
    tokens.push(current);

    let allMolecules = [];
    rules.forEach(rule => {
        tokens.forEach((element, index) => {
            if (element == rule.input) {
                let temp = JSON.parse(JSON.stringify(tokens));
                temp[index] = rule.output;
                allMolecules.push(temp.join(''));
            }
        });
    });
    return new Set(allMolecules).size;
}

const part2 = async input => {
    let [ruleDefintions, molecule] = input.split('\n\n');

    let rules = [];
    ruleDefintions.split('\n').forEach(element => {
        let [input, output] = element.split(' => ');
        rules.push({ input, output });
    });

    let simplifyMolecule = (molecule, depth = 0) => {
        if (molecule == 'e') return depth;
        let changed = false;
        for (let i = 0; i < rules.length; i++) {
            let regex = new RegExp(rules[i].output, 'g');
            let allIndices = [...molecule.matchAll(regex)];
            if (allIndices.length > 0) changed = true;
            for (let j = 0; j < allIndices.length; j++) {
                let newString = molecule.slice(0, allIndices[j].index) + rules[i].input + molecule.slice(allIndices[j].index + rules[i].output.length);
                let result = simplifyMolecule(newString, depth + 1);
                if (result) return result;
            }
        }
        if (!changed) return null;
    }

    return simplifyMolecule(molecule);
}

export { part1, part2 }; 