module.exports = input => {
    let ascii = Array.from(input).map((element, index) => input.charCodeAt(index));
    ascii.push(17, 31, 73, 47, 23);

    let numbers = Array.from(Array(256).keys());
    let position = 0;
    let skipSize = 0;

    for (let i = 0; i < 64; i++) {
        for (let j = 0; j < ascii.length; j++) {
            let subarray = [];
            for (let k = 0; k < ascii[j]; k++) {
                subarray.push(numbers[(position + k) % numbers.length]);
            }

            subarray.reverse();

            for (let k = 0; k < subarray.length; k++) {
                numbers[(position + k) % numbers.length] = subarray[k];
            }

            position += ascii[j] + skipSize;
            skipSize++;
        }
    }

    let string = '';
    for (let i = 0; i < 16; i++) {
        let subarray = numbers.slice(i * 16, i * 16 + 16);
        let xorNumber = subarray[0];
        for (let j = 1; j < subarray.length; j++) {
            xorNumber ^= subarray[j];
        }

        string += ((xorNumber < 10) ? '0' : '') + xorNumber.toString(16);
    }
    
    return string;
}