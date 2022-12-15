const part1 = async input => {
    let allBeacons = new Set();
    let data = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        let sensorX = parseInt(tokens[2].replace(',', '').split('=')[1]);
        let sensorY = parseInt(tokens[3].replace(':', '').split('=')[1]);

        let beaconX = parseInt(tokens[8].replace(',', '').split('=')[1]);
        let beaconY = parseInt(tokens[9].split('=')[1]);
        allBeacons.add(`${beaconX},${beaconY}`);

        array.push({ sensor: { x: sensorX, y: sensorY }, beacon: { x: beaconX, y: beaconY } });
        return array;
    }, []);

    let notBeacons = new Set();
    let line = 2000000;
    data.forEach(element => {
        let radius = Math.abs(element.beacon.x - element.sensor.x) + Math.abs(element.beacon.y - element.sensor.y);
        let distance = Math.abs(element.sensor.y - line);
        if (distance <= radius) {
            for (let i = element.sensor.x - (radius - distance); i <= element.sensor.x + (radius - distance); i++) {
                if (!allBeacons.has(`${i},${line}`)) notBeacons.add(`${i},${line}`);
            }
        }
    });

    return notBeacons.size;
}

const part2 = async input => {
    let data = input.split('\n').reduce((array, line) => {
        let tokens = line.split(' ');
        let sensorX = parseInt(tokens[2].replace(',', '').split('=')[1]);
        let sensorY = parseInt(tokens[3].replace(':', '').split('=')[1]);

        let beaconX = parseInt(tokens[8].replace(',', '').split('=')[1]);
        let beaconY = parseInt(tokens[9].split('=')[1]);

        array.push({ sensor: { x: sensorX, y: sensorY }, beacon: { x: beaconX, y: beaconY } });
        return array;
    }, []);

    for (let line = 0; line <= 4000000; line++) {
        let ranges = [];
        data.forEach(element => {
            let radius = Math.abs(element.beacon.x - element.sensor.x) + Math.abs(element.beacon.y - element.sensor.y);
            let distance = Math.abs(element.sensor.y - line);
            if (distance <= radius) {
                let minX = Math.max(0, element.sensor.x - (radius - distance));
                let maxX = Math.min(4000000, element.sensor.x + (radius - distance));

                if (ranges.length == 0) ranges.push([minX, maxX]);
                else {
                    let currentRange = [minX, maxX];
                    for (let i = ranges.length - 1; i >= 0; i--) {
                        if (currentRange[0] <= ranges[i][1] && ranges[i][0] <= currentRange[1]) {
                            currentRange[0] = Math.min(currentRange[0], ranges[i][0]);
                            currentRange[1] = Math.max(currentRange[1], ranges[i][1]);
                            ranges.splice(i, 1);
                        }
                    }
                    ranges.push(currentRange);
                }
            }
        });
        if (!(ranges[0][0] == 0 && ranges[0][1] == 4000000)) return (ranges[0][1] + 1) * 4000000 + line;
    }
}

export { part1, part2 };