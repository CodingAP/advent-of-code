module.exports = input => {
    let dots = [];
    let [dotLines, foldLines] = input.split('\n\n');
    dotLines.split('\n').forEach(element => {
        let [x, y] = element.split(',').map(num => parseInt(num));
        dots.push({ x, y });
    });

    let [direction, place] = foldLines.split('\n')[0].split(' ')[2].split('=');
    
    if (direction == 'x') {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].x > parseInt(place)) dots[i].x -= (dots[i].x - parseInt(place)) * 2;
        }
    } else {
        for (let i = 0; i < dots.length; i++) {
            if (dots[i].y > parseInt(place)) dots[i].y -= (dots[i].y - parseInt(place)) * 2;
        }
    }

    for (let i = dots.length - 1; i >= 0; i--) {
        if (dots.filter(element => element.x == dots[i].x && element.y == dots[i].y).length == 2) dots.splice(i, 1);
    }

    return dots.length;
}