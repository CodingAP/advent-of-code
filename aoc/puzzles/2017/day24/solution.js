const part1 = async input => {
    let ports = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split('/').map(num => parseInt(num));
        array.push({ left, right });
        return array;
    }, []);

    let generateBridge = (start, portsLeft) => {
        let allPorts = [];
        for (let i = 0; i < portsLeft.length; i++) {
            if (portsLeft[i].left != start && portsLeft[i].right != start) continue;
            
            allPorts.push([portsLeft[i]]);
            let copy = JSON.parse(JSON.stringify(portsLeft));
            copy.splice(i, 1);

            let bridge = (portsLeft[i].left == start) ? generateBridge(portsLeft[i].right, copy) : generateBridge(portsLeft[i].left, copy); 
            bridge.forEach(element => {
                allPorts.push([portsLeft[i], ...element]);
            });
        }
        return allPorts;
    }

    let allPorts = generateBridge(0, ports);
    return allPorts.reduce((highest, array) => {
        return Math.max(highest, array.reduce((acc, port) => acc + port.left + port.right, 0));
    }, -Infinity);
}

const part2 = async input => {
    let ports = input.split('\n').reduce((array, line) => {
        let [left, right] = line.split('/').map(num => parseInt(num));
        array.push({ left, right });
        return array;
    }, []);

    let generateBridge = (start, portsLeft) => {
        let allPorts = [];
        for (let i = 0; i < portsLeft.length; i++) {
            if (portsLeft[i].left != start && portsLeft[i].right != start) continue;

            allPorts.push([portsLeft[i]]);
            let copy = JSON.parse(JSON.stringify(portsLeft));
            copy.splice(i, 1);

            let bridge = (portsLeft[i].left == start) ? generateBridge(portsLeft[i].right, copy) : generateBridge(portsLeft[i].left, copy);
            bridge.forEach(element => {
                allPorts.push([portsLeft[i], ...element]);
            });
        }
        return allPorts;
    }

    let allPorts = generateBridge(0, ports);
    let longestLength = allPorts.reduce((length, array) => {
        return Math.max(length, array.length);
    }, -Infinity);

    return allPorts.filter(array => array.length == longestLength).reduce((highest, array) => {
        return Math.max(highest, array.reduce((acc, port) => acc + port.left + port.right, 0));
    }, -Infinity)
}

export { part1, part2 };