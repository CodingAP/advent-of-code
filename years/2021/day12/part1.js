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
            for (let i = 0; i < currentOptions.length; i++) {
                if ((currentOptions[i] == currentOptions[i].toLowerCase() && path.includes(currentOptions[i])) || currentOptions[i] == 'start') {

                } else {
                    let newPath = [...path, currentOptions[i]];
                    findPaths(newPath);
                }
            }
        }
    }

    findPaths(['start']);

    return paths.length;
}