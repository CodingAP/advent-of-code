/**
 * puzzles/2021/day19/solution.ts
 *
 * ~~ Beacon Scanner ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

type Point = { x: number, y: number, z: number };
type Mapping = { [key in keyof Point]: keyof Point };

type Rotation = {
    direction: Point;
    maps: Mapping;
};

interface Scanner {
    beacons: Point[];
    position?: Point;
    rotation?: Rotation;
    placed: boolean;
}

const DIRECTIONS: Point[] = [
    {x: 1, y: 1, z: 1},
    {x: 1, y: 1, z: -1},
    {x: 1, y: -1, z: 1},
    {x: 1, y: -1, z: -1},
    {x: -1, y: 1, z: 1},
    {x: -1, y: 1, z: -1},
    {x: -1, y: -1, z: 1},
    {x: -1, y: -1, z: -1},
];

const MAPPINGS: Mapping[] = [
    {x: 'x', y: 'y', z: 'z'},
    {x: 'x', y: 'z', z: 'y'},
    {x: 'z', y: 'y', z: 'x'},
    {x: 'z', y: 'x', z: 'y'},
    {x: 'y', y: 'x', z: 'z'},
    {x: 'y', y: 'z', z: 'x'},
];

const ROTATIONS: Rotation[] = DIRECTIONS.map(direction => MAPPINGS.map(maps => ({direction, maps}))).flat();

const getScannerPoints =(scanner: Scanner, rotation: Rotation): Point[] => scanner.beacons.map(beacon => {
    return {
        x: (rotation.direction.x * beacon[rotation.maps.x]),
        y: (rotation.direction.y * beacon[rotation.maps.y]),
        z: (rotation.direction.z * beacon[rotation.maps.z])
    };
});

const getDelta = (points: Point[], base: number): string[] => [...points.slice(0, base), ...points.slice(base + 1)].map(point => `${points[base].x - point.x},${points[base].y - point.y},${points[base].z - point.z}`);

const setScanner = (scanner: Scanner, position: Point, rotation: Rotation, beacons: Set<string>) => {
    scanner.position = position;
    scanner.rotation = rotation;

    scanner.beacons.forEach(beacon => {
        const mapped = {
            x: position.x + (rotation.direction.x * beacon[rotation.maps.x]),
            y: position.y + (rotation.direction.y * beacon[rotation.maps.y]),
            z: position.z + (rotation.direction.z * beacon[rotation.maps.z])
        };

        beacons.add(`${mapped.x},${mapped.y},${mapped.z}`);
    });

    scanner.placed = true;
};

/**
 * keep trying to place the scanners until all are placed correctly
 */
const placeAllScanners = (scanners: Scanner[], beacons: Set<string>) => {
    while (scanners.some(scanner => !scanner.placed)) {
        const knownScanners = scanners.filter(scanner => scanner.placed);

        // go through all unknown scanners
        scanners.forEach(scanner => {
            if (scanner.placed) return;

            for (let i = 0; i < knownScanners.length; i++) {
                const knownScanner = knownScanners[i];
                if (knownScanner.position === undefined || knownScanner.rotation === undefined) continue;

                // get current points
                const knownPoints = getScannerPoints(knownScanner, knownScanner.rotation)
                for (let j = 0; j < knownPoints.length; j++) {
                    const deltasFromKnown = getDelta(knownPoints, j);

                    // try all rotations to try to match the scanner
                    for (let k = 0; k < ROTATIONS.length; k++) {
                        const rotation = ROTATIONS[k];
                        const thisPoints = getScannerPoints(scanner, rotation);
                        for (let l = 0; l < thisPoints.length; l++) {
                            // if 12 points match, then we know the scanner is placed correctly
                            if (getDelta(thisPoints, l).filter(val => deltasFromKnown.includes(val)).length >= 11) {
                                const thisPoint = thisPoints[l];
                                const knownPoint = knownPoints[j];

                                const scannerPosition = {
                                    x: knownPoint.x + knownScanner.position.x - thisPoint.x,
                                    y: knownPoint.y + knownScanner.position.y - thisPoint.y,
                                    z: knownPoint.z + knownScanner.position.z - thisPoint.z,
                                };

                                setScanner(
                                    scanner,
                                    scannerPosition,
                                    rotation,
                                    beacons
                                );
                                return;
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    const scanners: Scanner[] = input.trim().split('\n\n').map(lines => {
        const beacons =  lines.split('\n').slice(1).map(numbers => {
            const [x, y, z] = numbers.split(',').map(num => parseInt(num));
            return { x, y, z };
        });

        return { beacons, placed: false };
    });

    const beacons = new Set<string>();

    // make the first beacon the absolute positions
    setScanner(scanners[0], { x: 0, y: 0, z: 0 }, ROTATIONS[0], beacons);
    placeAllScanners(scanners, beacons);

    return beacons.size;
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    const scanners: Scanner[] = input.trim().split('\n\n').map(lines => {
        const beacons =  lines.split('\n').slice(1).map(numbers => {
            const [x, y, z] = numbers.split(',').map(num => parseInt(num));
            return { x, y, z };
        });

        return { beacons, placed: false };
    });

    const beacons = new Set<string>();

    // make the first beacon the absolute positions
    setScanner(scanners[0], { x: 0, y: 0, z: 0 }, ROTATIONS[0], beacons);
    placeAllScanners(scanners, beacons);

    // find the biggest distance between any two scanners
    let max = -Infinity;
    const positions = scanners.map(scanner => scanner.position);
    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions.length; j++) {
            const a = positions[i] as Point;
            const b = positions[j] as Point;

            if (i === j) continue;
            const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

            max = Math.max(max, dist);
        }
    }

    return max;
};

export { part1, part2 };
