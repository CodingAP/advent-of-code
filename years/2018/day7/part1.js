const common = require('./../../../scripts/common');

module.exports = input => {
    let tree = {};

    input.split('\n').forEach(element => {
        let tokens = element.split(' ');
        if (tree[tokens[1]] == null) tree[tokens[1]] = { parents: [], children: [] };
        if (tree[tokens[7]] == null) tree[tokens[7]] = { parents: [], children: [] };
        tree[tokens[1]].children.push(tokens[7]);
        tree[tokens[7]].parents.push(tokens[1]);
    });

    let finished = [];
    let ready = Object.keys(tree).filter(element => tree[element].parents.length == 0).sort();

    while (!common.arrayEquals(finished, Object.keys(tree), false)) {
        let selected = 0;
        while (true) {
            if (tree[ready[selected]].parents.length == 0) break;
            let hasFinishedParents = true;
            for (let i = 0; i < tree[ready[selected]].parents.length; i++) {
                if (!finished.includes(tree[ready[selected]].parents[i])) hasFinishedParents = false;
            }
            if (hasFinishedParents) break;
            selected++;
        }

        for (let i = 0; i < tree[ready[selected]].children.length; i++) {
            if (!ready.includes(tree[ready[selected]].children[i])) ready.push(tree[ready[selected]].children[i]);
        }
        finished.push(ready.splice(selected, 1)[0]);
        ready.sort();
    }

    return finished.join('');
}