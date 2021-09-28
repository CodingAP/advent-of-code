module.exports = input => {
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