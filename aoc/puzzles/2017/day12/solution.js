const part1 = async input => {
    let connections = input.split('\n').reduce((array, element) => {
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

const part2 = async input => {
    let connections = input.split('\n').reduce((array, element) => {
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