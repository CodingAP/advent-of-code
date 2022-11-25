const part1 = async input => {
    let object = JSON.parse(input);

    let search = object => {
        let totalSum = 0;

        let parseElement = element => {
            let sum = 0;

            if (typeof element == 'number') sum += element;
            else if (typeof element == 'object') sum += search(element);

            return sum;
        }

        if (Array.isArray(object)) for (let i = 0; i < object.length; i++) totalSum += parseElement(object[i]);
        else for (let key in object) totalSum += parseElement(object[key]);

        return totalSum;
    }

    return search(object);
}

const part2 = async input => {
    let object = JSON.parse(input);

    let search = object => {
        let totalSum = 0;
        
        let parseElement = (element, isObject) => {
            let sum = 0;

            if (typeof element == 'number') sum += element;
            else if (typeof element == 'string') {
                if (isObject && element == 'red') return null;
            }
            else sum += search(element);

            return sum;
        }

        if (Array.isArray(object)) {
            for (let i = 0; i < object.length; i++) {
                let sum = parseElement(object[i], false);
                if (sum == null) {
                    totalSum = 0;
                    break;
                }
                totalSum += sum;
            }
        } else {
            for (let key in object) {
                let sum = parseElement(object[key], true);
                if (sum == null) {
                    totalSum = 0;
                    break;
                }
                totalSum += sum;
            }
        }

        return totalSum;
    }

    return search(object);
}

export { part1, part2 }; 