const part1 = async input => {
    let bags = input.split('\n').reduce((obj, element) => {
        let [bag, contains] = element.replace(/( bags)|( bag)|[.]/g, '').split(' contain ');
        let allBags = contains.split(', ');
        
        obj[bag] = (allBags[0] == 'no other') ? [] : allBags.map(bagContain => {
            let tokens = bagContain.split(' ');
            return { count: parseInt(tokens[0]), bag: tokens.slice(1).join(' ') };
        });
        return obj;
    }, {});

    let checkBagFor = (bag, search) => {
        if (bag == search) return true;
        for (let i = 0; i < bags[bag].length; i++) if (checkBagFor(bags[bag][i].bag, search)) return true;
        return false;
    }

    return Object.keys(bags).filter(key => checkBagFor(key, 'shiny gold')).length - 1;
}

const part2 = async input => {
    let bags = input.split('\n').reduce((obj, element) => {
        let [bag, contains] = element.replace(/( bags)|( bag)|[.]/g, '').split(' contain ');
        let allBags = contains.split(', ');

        obj[bag] = (allBags[0] == 'no other') ? [] : allBags.map(bagContain => {
            let tokens = bagContain.split(' ');
            return { count: parseInt(tokens[0]), bag: tokens.slice(1).join(' ') };
        });
        return obj;
    }, {});

    let countBags = bagName => {
        return bags[bagName].reduce((acc, bag) => {
            return acc + bag.count + bag.count * countBags(bag.bag);
        }, 0);
    }

    return countBags('shiny gold');
}

export { part1, part2 };