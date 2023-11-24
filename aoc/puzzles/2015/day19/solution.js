const part1 = async input => {
    let rules = [];
    let [ruleStrings, string] = input.split(/\n\n/);
    let newStrings = [];

    ruleStrings.split(/\n/).forEach(string => {
        rules.push({ key: string.split(' => ')[0], replacement: string.split(' => ')[1] });
    });

    for (let i = 0; i < rules.length; i++) {
        let regex = new RegExp(rules[i].key, 'g');
        let allIndices = [...string.matchAll(regex)];
        for (let j = 0; j < allIndices.length; j++) {
            let newString = string.slice(0, allIndices[j].index) + rules[i].replacement + string.slice(allIndices[j].index + rules[i].key.length);
            if (!newStrings.includes(newString)) newStrings.push(newString);
        }
    }

    return newStrings.length;
}

const part2 = async input => {
    let rules = [];
    let [ruleStrings, string] = input.split(/\n\n/);

    let simplify = (molecule, depth) => {
        if (molecule == 'e') return depth;
        let changed = false;
        for (let i = 0; i < rules.length; i++) {
            let regex = new RegExp(rules[i].key, 'g');
            let allIndices = [...molecule.matchAll(regex)];
            for (let j = 0; j < allIndices.length; j++) {
                changed = true;
                let newString = molecule.slice(0, allIndices[j].index) + rules[i].replacement + molecule.slice(allIndices[j].index + rules[i].key.length);
                let result = simplify(newString, depth + 1);
                if (result) return result;
            }
        }
        if (!changed) return null;
    }

    ruleStrings.split(/\n/).forEach(string => {
        rules.push({ key: string.split(' => ')[1], replacement: string.split(' => ')[0] });
    });

    return simplify(string, 0);
}

export { part1, part2 };