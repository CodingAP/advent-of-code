/*
For each scanner, pre-calculate the 24 different sets of rotated points (the original set from the input, plus 23 rotated sets). You don't need to do this for scanner 0, as we can just assume the original points from the input for scanner 0 are our starting point which we'll try to match everything else to

Now, consider scanner 1, and try to see if it can be matched up with the points from scanner 0:

To do this, consider each of the 24 different rotations for scanner 1. Then, for each orientation, consider how we can position it to align with scanner 0's points.

Could point 0 from scanner 1 in this particular orientation be the same as point 0 from scanner 0? If it was, what offset would we need to apply to shift it into position? Try it out - apply this offset to every point in scanner 1, and then count how many of its points in total line up with points from scanner 0.

If it's less than 12, then it's not a match. Move on to the next point - could point 0 from scanner 1 be the same as point 1 from scanner 0? Or point 2? Try every possible combination

By doing this you'll try every possible position offset for this particular orientation of scanner 1. Well, not literally every possible offset - you're only trying offsets where you know at least one point will match. If none of them match 12 points, you can try the next orientation of scanner 1. If you don't find a match in any orientation, move on to scanner 2. Etc, etc...

If 12 or more points align, you've found a match! "Lock in" this scanner, in this orientation, at this offset. Note down the final position of every point given this info. Continue checking the remaining scanners for matches - now not just against the points from scanner 0, but the points from every other scanner you've locked-in so far.
*/

const part1 = async input => {
    let getAllOrientations = position => {
        let orientations = [];
        orientations.push({ x: position.x, y: position.y, z: position.z });
        orientations.push({ x: position.x, y: -position.z, z: position.y });
        orientations.push({ x: position.x, y: -position.y, z: -position.z });
        orientations.push({ x: position.x, y: position.z, z: -position.y });
        orientations.push({ x: -position.x, y: -position.y, z: position.z });
        orientations.push({ x: -position.x, y: position.z, z: position.y });
        orientations.push({ x: -position.x, y: position.y, z: -position.z });
        orientations.push({ x: -position.x, y: -position.z, z: -position.y });
        orientations.push({ x: position.y, y: position.z, z: position.x });
        orientations.push({ x: position.y, y: -position.x, z: position.z });
        orientations.push({ x: position.y, y: -position.z, z: -position.x });
        orientations.push({ x: position.y, y: position.x, z: -position.z });
        orientations.push({ x: -position.y, y: -position.z, z: position.x });
        orientations.push({ x: -position.y, y: position.x, z: position.z });
        orientations.push({ x: -position.y, y: position.z, z: -position.x });
        orientations.push({ x: -position.y, y: -position.x, z: -position.z });
        orientations.push({ x: position.z, y: position.x, z: position.y });
        orientations.push({ x: position.z, y: -position.y, z: position.x });
        orientations.push({ x: position.z, y: -position.x, z: -position.y });
        orientations.push({ x: position.z, y: position.y, z: -position.x });
        orientations.push({ x: -position.z, y: -position.x, z: position.y });
        orientations.push({ x: -position.z, y: position.y, z: position.x });
        orientations.push({ x: -position.z, y: position.x, z: -position.y });
        orientations.push({ x: -position.z, y: -position.y, z: -position.x });
        return orientations;
    }

    let scanners = input.split('\n\n').reduce((array, lines, index) => {
        let scanner = [];
        lines.split('\n').slice(1).forEach((position) => {
            let [x, y, z] = position.split(',').map(num => parseInt(num));
            if (index == 0) scanner.push({ x, y, z});
            else scanner.push(getAllOrientations({ x, y, z }));
        });
        array.push(scanner);
        return array;
    }, []);

    let lockedIn = [scanners[0]];
    for (let i = 1; i < scanners.length; i++) {
        for (let o = 0; o < 24; o++) {
            for (let p = 0; p < scanners[i].length; p++) {
                for (let l = 0; l < lockedIn.length; l++) {
                    let offset = { x: lockedIn[l][0].x - scanners[i][p][o].x, y: lockedIn[l][0].y - scanners[i][p][o].y, z: lockedIn[l][0].z - scanners[i][p][o].z };
                    let matching = scanners[i].reduce((acc, point) => {
                        let translated = { x: point[o].x + offset.x, y: point[o].y + offset.y, z: point[o].z + offset.z };
                        let isInLocked = false;
                        lockedIn[l].forEach(locked => {
                            if (translated.x == locked.x && translated.y == locked.y && translated.x == locked.z) isInLocked = true;
                        });
                        return acc + (isInLocked ? 1 : 0);
                    }, 0);

                    if (matching >= 12) console.log('found something', o);
                }
            }
        }
        
        break;
    }
    return 0;
}

const part2 = async input => {
    return 0;
}

export { part1, part2 };