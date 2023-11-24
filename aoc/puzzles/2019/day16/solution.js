const part1 = async input => {
    let signal = input.split('').map(num => parseInt(num));;
    let key = [0, 1, 0, -1];

    for (let fft = 0; fft < 100; fft++) {
        let newSignal = '';
        for (let i = 1; i <= signal.length; i++) {
            let number = 0;
            for (let j = 0; j < signal.length; j++) {
                number += signal[j] * key[Math.floor((j + 1) / i) % key.length]
            }
            newSignal += Math.abs(number) % 10;
        }
        signal = newSignal;
    }

    return signal.slice(0, 8);
}

const part2 = async input => {
    let signal = input.repeat(10000).split('').map(num => parseInt(num));

    let offset = parseInt(input.slice(0, 7));
    signal = signal.slice(offset);
    for (let i = 0; i < 100; i++) {
        for (let i = signal.length - 2; i >= 0; i--) {
            signal[i] = (signal[i + 1] + signal[i]) % 10;
        }
    }

    return signal.slice(0, 8).join('');
}

export { part1, part2 };