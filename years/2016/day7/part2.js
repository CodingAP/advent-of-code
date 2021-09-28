module.exports = input => {
    let valid = 0;

    let addresses = input.split('\n');
    for (let i = 0; i < addresses.length; i++) {
        let parts = addresses[i].split(/[\[\]]/g);
        let square = [], outside = [];
        for (let j = 0; j < parts.length; j++) {
            let strings = Array.from(parts[j].matchAll(/(?=((\w)(\w)\2))/g), iter => iter[1]);
            
            for (let k = 0; k < strings.length; k++) {
                if (strings[k].charAt(0) != strings[k].charAt(1)) {
                    if (j % 2 == 1) square.push(strings[k]);
                    else outside.push(strings[k]);
                }
            }
        }
        
        let matching = false;
        for (let j = 0; j < square.length; j++) {
            for (let k = 0; k < outside.length; k++) {
                if (square[j].charAt(0) == outside[k].charAt(1) && square[j].charAt(1) == outside[k].charAt(0)) matching = true;
            }
        }
        if (matching) valid++;
    }

    return valid;
}