const part1 = async input => {
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

const part2 = async input => {
    let limit = parseInt(input);

    let calculatePresents = house => {
        let sum = house;
        if (house < 50) sum++;

        let sqrt = Math.sqrt(house);

        for (let i = 2; i <= sqrt; i++) {
            if (house % i == 0) {
                if (house / i <= 50) sum += i;
                if (house / (house / i) <= 50) sum += house / i;
            }
        }

        if (sqrt % 1 == 0) sum -= sqrt;
        return sum * 11;
    }

    let house = 1;

    while (true) {
        let presents = calculatePresents(house);
        if (presents >= limit) return house;
        house++;
    }
}

export { part1, part2 };