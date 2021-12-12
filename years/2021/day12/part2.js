module.exports = input => {
    let connections = {};
    input.split('\n').forEach(element => {
        let tokens = element.split('-');

        if (!connections[tokens[0]]) connections[tokens[0]] = [];
        connections[tokens[0]].push(tokens[1]);

        if (!connections[tokens[1]]) connections[tokens[1]] = [];
        connections[tokens[1]].push(tokens[0]);
    });

    let paths = [];

    let findPaths = path => {
        let currentCave = path[path.length - 1];
        let currentOptions = connections[currentCave];

        if (currentCave == 'end') {
            paths.push(path);
        } else {
            let currentSmallCaveVisits = {};
            for (let i = 0; i < path.length; i++) {
                if (path[i] == path[i].toLowerCase() && path[i] != 'start') {
                    if (!currentSmallCaveVisits[path[i]]) currentSmallCaveVisits[path[i]] = 0;
                    currentSmallCaveVisits[path[i]]++;
                }
            }

            let twoCaveVisitsTotal = Object.values(currentSmallCaveVisits).filter(element => element == 2).length;
            if (twoCaveVisitsTotal > 1) return;
            for (let i = 0; i < currentOptions.length; i++) {
                if (currentOptions[i] != 'start' && currentSmallCaveVisits[currentOptions[i]] != 2) {
                    let newPath = [...path, currentOptions[i]];
                    findPaths(newPath);
                }
            }
        }
    }

    findPaths(['start']);

    return paths.length;
}