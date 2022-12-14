const part1 = async input => {
    let data = input;
    let length = 272;
    while (data.length < length) {
        let a = data;
        let b = data.split('').map(element => (element == '0') ? 1 : 0).reverse().join('');

        data = a + '0' + b;
    }

    data = data.slice(0, length);
    while (data.length % 2 == 0) {
        let newData = '';
        for (let i = 0; i < data.length; i += 2) {
            newData += (data[i] == data[i + 1]) ? 1 : 0;
        }
        data = newData;
    }
    return data;
}

const part2 = async input => {
    let data = input;
    let length = 35651584;
    while (data.length < length) {
        let a = data;
        let b = data.split('').map(element => (element == '0') ? 1 : 0).reverse().join('');

        data = a + '0' + b;
    }

    data = data.slice(0, length);
    while (data.length % 2 == 0) {
        let newData = '';
        for (let i = 0; i < data.length; i += 2) {
            newData += (data[i] == data[i + 1]) ? 1 : 0;
        }
        data = newData;
    }
    return data;
}

export { part1, part2 };