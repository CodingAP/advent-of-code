module.exports = input => {
    let polymer = input;
    
    while (true) {
        let finished = true;
        for (let i = 0; i < polymer.length; i++) {
            let current = polymer.charAt(i);
            let next = polymer.charAt(i + 1) || '';

            if (current == next.toLowerCase() || current.toLowerCase() == next) {
                polymer = polymer.slice(0, i) + polymer.slice(i + 2);
                i++;
                finished = false;
            }
        }
        if (finished) break;
    }
    console.log(polymer.length, input.length);
    return polymer.length;
}