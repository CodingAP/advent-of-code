module.exports = input => {
    let incrementPassword = password => {
        let numbers = password.split('').map(value => value.charCodeAt(0) - 97);
        let overflow = true;
        let current = numbers.length - 1;
        
        while (overflow) {
            numbers[current]++;
            if (numbers[current] > 25) {
                numbers[current] = 0;
                current--;
            } else {
                overflow = false;
            }
        }
        
        return numbers.map(value => String.fromCharCode(value + 97)).join('');
    }
    
    let currentPassword = input;
    while (true) {
        let doubles = {}, incremental = false;
        currentPassword = incrementPassword(currentPassword);
        if (currentPassword.match(/[iol]/)) continue;
        for (let i = 0; i < currentPassword.length; i++) {
            let last = currentPassword.charAt(i - 1) || '';
            let current = currentPassword.charAt(i);
            let next = currentPassword.charAt(i + 1) || '';
            
            let lastCode = last.charCodeAt(0) - 97;
            let currentCode = current.charCodeAt(0) - 97;
            let nextCode = next.charCodeAt(0) - 97;
            if (currentCode - lastCode == 1 && nextCode - currentCode == 1) incremental = true;
            
            if (current == next) {
                if (!doubles[current + next]) doubles[current + next] = 0;
                doubles[current + next]++;
            }
        }
        
        if (Object.keys(doubles).length >= 2 && incremental) return currentPassword;
    }
}