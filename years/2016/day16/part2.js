module.exports = input => {
    let data = input;
    let size = 35651584;

    let dragonCurve = a => {
        let b = a;
        b = b.split('').reverse().join('');
        b = b.replace(/0/g, 'x').replace(/1/g, '0').replace(/x/g, '1');
        return a + '0' + b;
    }

    let checkSum = a => {
        let sum = '';
        for (let i = 0; i < a.length; i += 2) {
            sum += (a.charAt(i) == a.charAt(i + 1)) ? '1' : '0';
        }
        return sum;
    }

    while (data.length < size) data = dragonCurve(data);
    data = data.substring(0, size);
    while (data.length % 2 == 0) data = checkSum(data);

    return data;
}