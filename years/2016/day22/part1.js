module.exports = input => {
    let nodes = [];
    let df = input.split('\n');
    for (let i = 0; i < df.length; i++) {
        if (i <= 1) continue;
        let tokens = df[i].split(' ').filter(value => value != '');
        
        let position = { x: parseInt(tokens[0].split('-')[1].replace('x', '')), y: parseInt(tokens[0].split('-')[2].replace('y', '')) };
        let size = parseInt(tokens[1].replace('T', ''));
        let used = parseInt(tokens[2].replace('T', ''));

        nodes.push({ position, size, used });
    }
    
    let valid = 0;
    for (let a = 0; a < nodes.length; a++) {
        for (let b = 0; b < nodes.length; b++) {
            if (a == b) continue;

            if (nodes[a].used != 0 && (nodes[b].size - nodes[b].used) >= nodes[a].used) valid++;
        }
    }
    return valid;
}