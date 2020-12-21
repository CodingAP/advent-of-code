const input = require('fs').readFileSync('./years/2015/day19/input.txt').toString().trim();
const common = require('../../../scripts/common');

module.exports = () => {
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