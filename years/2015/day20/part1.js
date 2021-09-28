module.exports = input => {
    let limit = parseInt(input);

    let calculatePresents = house => {
        let sum = 1 + house;
        let sqrt = Math.sqrt(house);

        for (let i = 2; i <= sqrt; i++) {
            if (0 == house % i) sum += i + house / i;
        }

        if (0 == sqrt % 1) sum -= sqrt;
        return sum * 10;
    }

    let house = 1;

    while (true) {
        let presents = calculatePresents(house);
        if (presents >= limit) return house;
        house++;
    }
}