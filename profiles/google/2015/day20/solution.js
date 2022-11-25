const part1 = async input => {
    let num = 1;
    while (true) {
        let sum = 0;
        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                let factor1 = i;
                let factor2 = num / i;

                if (factor1 == factor2) sum += factor1;
                else sum += factor1 + factor2;
            }
        }

        if ((sum * 10) >= input) return num;
        num++;
    }
}

const part2 = async input => {
    let num = 1;
    while (true) {
        let sum = 0;
        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                let factor1 = i;
                let factor2 = num / i;

                if (num / factor1 <= 50) sum += factor1;
                if (num / factor2 <= 50) sum += factor2;
                
                if (factor1 == factor2) sum -= factor2;
            }
        }

        if ((sum * 11) >= input) return num;
        num++;
    }
}

export { part1, part2 }; 