const part1 = async input => {
    let blacklist = input.split('\n').reduce((array, line) => {
        let [min, max] = line.split('-').map(num => parseInt(num));
        array.push({ min, max });
        return array;
    }, []);

    for (let i = 0; i <= 4294967295; i++) {
        let allowed = true;
        for (let range of blacklist) {
            if (range.min <= i && range.max >= i) {
                allowed = false;
                i = range.max;
                break;
            }
        }
        if (allowed) return i;
    }
}

const part2 = async input => {
    let blacklist = input.split('\n').reduce((array, line) => {
        let [min, max] = line.split('-').map(num => parseInt(num));
        array.push({ min, max });
        return array;
    }, []);

    let count = 0;
    for (let i = 0; i <= 4294967295; i++) {
        let allowed = true;
        for (let range of blacklist) {
            if (range.min <= i && range.max >= i) {
                allowed = false;
                i = range.max;
                break;
            }
        }
        if (allowed) count++;
    }
    return count;
}

export { part1, part2 };