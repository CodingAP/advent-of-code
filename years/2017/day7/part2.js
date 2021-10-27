module.exports = input => {
    let programs = {};

    input.split('\n').forEach(element => {
        let tokens = element.replace(/ /g, '').split('->');

        let children = (tokens[1]) ? tokens[1].split(',') : [];
        let [parent, weight] = tokens[0].split(/[\(\)]/g);

        if (!programs[parent]) programs[parent] = {};
        programs[parent].weight = parseInt(weight);
        programs[parent].children = children;

        children.forEach(child => {
            if (!programs[child]) programs[child] = {};
            programs[child].parent = parent;
        });
    });

    let checkBalance = base => {
        let childrenWeights = [];
        
        programs[base].children.forEach(child => {
            childrenWeights.push(checkBalance(child));
        });

        if (programs[base].children.length != 0) {
            let same = childrenWeights.every((val, i, arr) => val === arr[0]);
            if (!same) {
                console.log(`PROBLEM: ${base}, ${childrenWeights}`);
                let unique = [...new Set(childrenWeights)];
                console.log('change weight: ' + (Math.abs(unique[0] - unique[1])));
            }
            else programs[base].weight += childrenWeights.reduce((value, element) => value += element);
        }

        return programs[base].weight;
    }

    let baseProgram = Object.keys(programs).filter(element => !programs[element].parent)[0];

    checkBalance(baseProgram)

    // console.log(programs);
    return 0;
}