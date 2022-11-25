const part1 = async input => {
    let passports = input.split('\n\n').map(element => {
        let tokens = element.split(/[ \n]/g);
        let details = tokens.reduce((obj, element) => {
            let [key, value] = element.split(':');
            obj[key] = value;
            return obj;
        }, {});
        return details;
    });

    let valid = 0;
    passports.forEach(passport => {
        let keys = Object.keys(passport);
        if (keys.includes('cid')) keys.splice(keys.indexOf('cid'), 1);
        if (keys.length == 7) valid++;
    });
    return valid;
}

const part2 = async input => {
    let passports = input.split('\n\n').map(element => {
        let tokens = element.split(/[ \n]/g);
        let details = tokens.reduce((obj, element) => {
            let [key, value] = element.split(':');
            obj[key] = value;
            return obj;
        }, {});
        return details;
    });

    let valid = 0;
    passports.forEach(passport => {
        let keys = Object.keys(passport);
        if (keys.includes('cid')) keys.splice(keys.indexOf('cid'), 1);
        if (keys.length != 7) return;

        if (parseInt(passport.byr) < 1920 || parseInt(passport.byr) > 2002) return;
        if (parseInt(passport.iyr) < 2010 || parseInt(passport.iyr) > 2020) return;
        if (parseInt(passport.eyr) < 2020 || parseInt(passport.eyr) > 2030) return;

        if (!passport.hgt.match(/cm|in/g)) return;
        let height = parseInt(passport.hgt.slice(0, -2));
        let measurement = passport.hgt.slice(-2);
        if (measurement == 'cm' && (height < 150 || height > 193)) return;
        if (measurement == 'in' && (height < 59 || height > 76)) return;

        if (!passport.hcl.startsWith('#') || !passport.hcl.slice(1).match(/[0-9a-z]/g)) return;
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) return;
        if (passport.pid.length != 9) return;

        valid++;
    });
    return valid;
}

export { part1, part2 }; 