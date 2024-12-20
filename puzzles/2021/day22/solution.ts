/**
 * puzzles/2021/day22/solution.ts
 *
 * ~~ Reactor Reboot ~~
 * this is my solution for this advent of code puzzle
 *
 * by alex prosser
 * 11/27/2024
 */

interface Region {
    startX: number;
    startY: number;
    startZ: number;
    endX: number;
    endY: number;
    endZ: number;
}

const contains = (a: Region, b: Region): boolean => a.startX <= b.startX && a.endX >= b.endX && a.startY <= b.startY && a.endY >= b.endY && a.startZ <= b.startZ && a.endZ >= b.endZ;
const intersects = (a: Region, b: Region): boolean => a.startX <= b.endX && a.endX >= b.startX && a.startY <= b.endY && a.endY >= b.startY && a.startZ <= b.endZ && a.endZ >= b.startZ;
const volume = (a: Region): bigint => BigInt(a.endX - a.startX) * BigInt(a.endY - a.startY) * BigInt(a.endZ - a.startZ);
const subtract = (a: Region, b: Region): Region[] => {
    if (contains(b, a)) return [];
	if (!intersects(a, b)) return [a];

	const pointX = [a.startX, ...[b.startX, b.endX].filter(x => a.startX < x && x < a.endX), a.endX];
	const pointY = [a.startY, ...[b.startY, b.endY].filter(y => a.startY < y && y < a.endY), a.endY];
	const pointZ = [a.startZ, ...[b.startZ, b.endZ].filter(z => a.startZ < z && z < a.endZ), a.endZ];

	const result: Region[] = [];

	for (let i = 0; i < pointX.length - 1; i++) {
		for (let j = 0; j < pointY.length - 1; j++) {
			for (let k = 0; k < pointZ.length - 1; k++) {
				result.push({
					startX: pointX[i],
					startY: pointY[j],
					startZ: pointZ[k],
					endX: pointX[i + 1],
					endY: pointY[j + 1],
					endZ: pointZ[k + 1]
				});
			}
		}
	}

	return result.filter(region => !contains(b, region));
}

/**
 * the code of part 1 of the puzzle
 */
const part1 = (input: string) => {
    let regions: Region[] = [];

    input.trim().split('\n').forEach(line => {
        const [instruction, ranges] = line.split(' ');
        const [x, y, z] = ranges.split(',').map(range => range.split('=')[1].split('..').map(num => parseInt(num)));
        const current = { startX: x[0], startY: y[0], startZ: z[0], endX: x[1] + 1, endY: y[1] + 1, endZ: z[1] + 1 };

        if (current.startX < -50 || current.endX > 50 || current.startY < -50 || current.endY > 50 || current.startZ < -50 || current.endZ > 50) return;

        regions = regions.flatMap(region => subtract(region, current));
        if (instruction === 'on') regions.push(current);
    });

    return regions.map(region => volume(region)).reduce((sum, num) => sum + num, 0n);
};

/**
 * the code of part 2 of the puzzle
 */
const part2 = (input: string) => {
    let regions: Region[] = [];

    input.trim().split('\n').forEach(line => {
        const [instruction, ranges] = line.split(' ');
        const [x, y, z] = ranges.split(',').map(range => range.split('=')[1].split('..').map(num => parseInt(num)));
        const current = { startX: x[0], startY: y[0], startZ: z[0], endX: x[1] + 1, endY: y[1] + 1, endZ: z[1] + 1 };

        regions = regions.flatMap(region => subtract(region, current));
        if (instruction === 'on') regions.push(current);
    });

    return regions.map(region => volume(region)).reduce((sum, num) => sum + num, 0n);
};

export { part1, part2 };
