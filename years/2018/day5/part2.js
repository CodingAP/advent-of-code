module.exports = input => {
    let shortest = Infinity;
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 26; i++) {
        let polymer = input.split(alphabet[i].toLowerCase()).join('').split(alphabet[i].toUpperCase()).join('');

        while (true) {
            let finished = true;
            for (let i = 0; i < polymer.length; i++) {
                let current = polymer.charAt(i);
                let next = polymer.charAt(i + 1) || '';

                if (current.toLowerCase() == next.toLowerCase() &&
                    ((current == current.toUpperCase() && next == next.toLowerCase()) ||
                        ((current == current.toLowerCase() && next == next.toUpperCase())))) {
                    polymer = polymer.slice(0, i) + polymer.slice(i + 2);
                    i++;
                    finished = false;
                }
            }
            if (finished) break;
        }

        shortest = Math.min(polymer.length, shortest);
    }

    return shortest;
}