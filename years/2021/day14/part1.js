const common = require('../../../scripts/common');

module.exports = input => {
    let [polymer, rules] = input.split('\n\n');

    let replacements = {};

    rules.split('\n').forEach(element => {
        let tokens = element.split(' -> ');
        replacements[tokens[0]] = tokens[1];
    });

    for (let steps = 0; steps < 10; steps++) {
        let newPolymer = '';
        for (let i = 1; i < polymer.length; i++) {
            if (replacements[polymer[i - 1] + polymer[i]]) {
                newPolymer += polymer[i - 1] + replacements[polymer[i - 1] + polymer[i]];
            } else {
                newPolymer += polymer[i - 1];
            }

            if (i == polymer.length - 1) {
                newPolymer += polymer[i];
            }
        }
        polymer = newPolymer;
    }

    let set = {};
    for (let i = 0; i < polymer.length; i++) {
        if (!set[polymer[i]]) set[polymer[i]] = 0;
        set[polymer[i]]++;
    }

    let sorted = Object.entries(set).sort((a, b) => a[1] - b[1]);
    return sorted[sorted.length - 1][1] - sorted[0][1];
}