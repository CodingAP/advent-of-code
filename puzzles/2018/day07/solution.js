const part1 = async input => {
    let allSteps = new Set();
    let order = input.split('\n').reduce((obj, line) => {
        let tokens = line.split(' ');
        allSteps.add(tokens[1]);
        allSteps.add(tokens[7]);
        if (obj[tokens[7]] == null) obj[tokens[7]] = [];
        obj[tokens[7]].push(tokens[1]);
        return obj;
    }, {});

    let finished = '';
    let ready = [...allSteps].filter(element => !Object.keys(order).includes(element)).sort();
    while (finished.length != allSteps.size) {
        let finishedStep = ready.shift();
        finished += finishedStep;

        for (let step in order) {
            if (order[step] == null) continue;

            if (order[step].includes(finishedStep)) order[step].splice(order[step].indexOf(finishedStep), 1);
            if (order[step].length == 0) {
                ready.push(step);
                order[step] = null;
            }
        }

        ready.sort();
    }

    return finished;
}

const part2 = async input => {
    let allSteps = new Set();
    let order = input.split('\n').reduce((obj, line) => {
        let tokens = line.split(' ');
        allSteps.add(tokens[1]);
        allSteps.add(tokens[7]);
        if (obj[tokens[7]] == null) obj[tokens[7]] = [];
        obj[tokens[7]].push(tokens[1]);
        return obj;
    }, {});

    let finished = '';
    let ready = [...allSteps].filter(element => !Object.keys(order).includes(element)).sort();
    while (finished.length != allSteps.size) {
        let finishedStep = ready.shift();
        finished += finishedStep;

        for (let step in order) {
            if (order[step] == null) continue;

            if (order[step].includes(finishedStep)) order[step].splice(order[step].indexOf(finishedStep), 1);
            if (order[step].length == 0) {
                ready.push(step);
                order[step] = null;
            }
        }

        ready.sort();
    }

    return finished;
}

export { part1, part2 };