module.exports = input => {
    let generators = {
        a: parseInt(input.split('\n')[0].split(' ')[4]),
        b: parseInt(input.split('\n')[1].split(' ')[4])
    };

    let pairs = 0;
    for (let i = 0; i < 5000000; i++) {
        while (generators.a % 4 != 0) generators.a = (generators.a * 16807) % 2147483647;
        while (generators.b % 8 != 0) generators.b = (generators.b * 48271) % 2147483647;

        if ((generators.a & 0xffff) == (generators.b & 0xffff)) pairs++;
    
        generators.a = (generators.a * 16807) % 2147483647;
        generators.b = (generators.b * 48271) % 2147483647;
    }
    return pairs;
}