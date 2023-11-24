const part1 = async input => {
    let disks = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({ size: parseInt(tokens[3]), starting: parseInt(tokens[11].replace('.', '')) });
        return array;
    }, []);

    let time = 0;
    while (true) {
        let success = true;

        for (let i = 0; i < disks.length; i++) {
            if ((disks[i].starting + time + i + 1) % disks[i].size != 0) success = false;
        }

        if (success) return time;
        time++;
    }
}

const part2 = async input => {
    let disks = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        array.push({ size: parseInt(tokens[3]), starting: parseInt(tokens[11].replace('.', '')) });
        return array;
    }, []);
    disks.push({ size: 11, starting: 0 });

    let time = 0;
    while (true) {
        let success = true;

        for (let i = 0; i < disks.length; i++) {
            if ((disks[i].starting + time + i + 1) % disks[i].size != 0) success = false;
        }

        if (success) return time;
        time++;
    }
}

export { part1, part2 };