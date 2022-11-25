const part1 = async input => {
    let password = input.split('').map(element => element.charCodeAt(0) - 97);

    while (true) {
        let carry = false;
        for (let i = input.length - 1; i >= 0; i--) {
            let newCharacter = (password[i] + 1);
            carry = (newCharacter >= 26);
            password[i] = newCharacter % 26;

            if (!carry) break;
        }

        if (!password.map(element => String.fromCharCode(element + 97)).join('').match(/[iol]/g)) {
            let pairs = {};
            let increasing = false;
            for (let i = 1; i < password.length - 1; i++) {
                if ((password[i + 1] - password[i]) == 1 && (password[i] - password[i - 1]) == 1) increasing = true;
                if ((password[i] == password[i + 1] && password[i] != password[i - 1])) {
                    if (pairs[String.fromCharCode(password[i])] == null) pairs[String.fromCharCode(password[i])] = 0;
                    pairs[String.fromCharCode(password[i])]++;
                }
            }

            if (increasing && Object.values(pairs).length >= 2) return password.map(element => String.fromCharCode(element + 97)).join('');
        }
    }
}

const part2 = async input => {
    let password = (await part1(input)).split('').map(element => element.charCodeAt(0) - 97);

    while (true) {
        let carry = false;
        for (let i = input.length - 1; i >= 0; i--) {
            let newCharacter = (password[i] + 1);
            carry = (newCharacter >= 26);
            password[i] = newCharacter % 26;

            if (!carry) break;
        }

        if (!password.map(element => String.fromCharCode(element + 97)).join('').match(/[iol]/g)) {
            let pairs = {};
            let increasing = false;
            for (let i = 1; i < password.length - 1; i++) {
                if ((password[i + 1] - password[i]) == 1 && (password[i] - password[i - 1]) == 1) increasing = true;
                if ((password[i] == password[i + 1] && password[i] != password[i - 1])) {
                    if (pairs[String.fromCharCode(password[i])] == null) pairs[String.fromCharCode(password[i])] = 0;
                    pairs[String.fromCharCode(password[i])]++;
                }
            }

            if (increasing && Object.values(pairs).length >= 2) return password.map(element => String.fromCharCode(element + 97)).join('');
        }
    }
}

export { part1, part2 }; 