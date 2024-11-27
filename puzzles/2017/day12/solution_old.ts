// @ts-nocheck previous years was written in javascript, so disable it here

// this code was from my original solve
// i didn't know disjoint sets at the time, so this was my best solution
// it runs very slow, but it is cool to look at history, right?

const part1 = input => {
    let connections = input.trim().split('\n').reduce((array, element) => {
        let [index, contains] = element.replace(/ /g, '').split('<->');
        array[parseInt(index)] = contains.split(',').map(num => parseInt(num));
        return array;
    }, []);

    let checkForConnection = (connection, needed, history) => {
        if (history == null) history = [];
        if (connection == needed) return true;
        if (history.includes(connection)) return false;
        history.push(connection);

        return connections[connection].reduce((flag, other) => {
            if (checkForConnection(other, needed, history)) return true;
            return flag;
        }, false);
    }

    return connections.reduce((acc, element, index) => acc + (checkForConnection(index, 0) ? 1 : 0), 0);
}

const part2 = input => {
    let connections = input.trim().split('\n').reduce((array, element) => {
        let [index, contains] = element.replace(/ /g, '').split('<->');
        array[parseInt(index)] = contains.split(',').map(num => parseInt(num));
        return array;
    }, []);

    let checkForConnection = (connection, needed, history) => {
        if (history == null) history = [];
        if (connection == needed) return true;
        if (history.includes(connection)) return false;
        history.push(connection);

        return connections[connection].reduce((flag, other) => {
            if (checkForConnection(other, needed, history)) return true;
            return flag;
        }, false);
    }

    let allGroups = [];
    for (let i = 0; i < connections.length; i++) {
        let group = new Array(connections.length).fill(0).map((element, index) => index).filter(element => checkForConnection(i, element));
        if (!allGroups.includes(JSON.stringify(group))) allGroups.push(JSON.stringify(group));
    }

    return allGroups.length;
}

export { part1, part2 };