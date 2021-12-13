module.exports = input => {
    let dots = [];
    let [dotLines, foldLines] = input.split('\n\n');
    dotLines.split('\n').forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));
        dots.push({ x, y });
    });

    foldLines.split('\n').forEach(line => {
        let [direction, place] = line.split(' ')[2].split('=');

        if (direction == 'x') {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
            }
        } else {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
            }
        }
    });

    // dots.forEach(element => {
    //     console.log(`(${element.x},-${element.y})`);
    // })

    return 'FAGURZHE';
}