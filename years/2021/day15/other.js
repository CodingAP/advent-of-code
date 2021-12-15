let data = require("fs").readFileSync("./years/2021/day15/input.txt", { encoding: "utf-8" }).trim();
let lines = data.trim().split(/\n/);
let src = lines.map((line) => [...line].map((v) => +v));

let map = Array.from({ length: src.length * 5 }, () => Array.from({ length: src[0].length * 5 }, () => 0));

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        map[y][x] =
            ((src[y % src.length][x % src[0].length] + Math.floor(y / src.length) + Math.floor(x / src[0].length) - 1) % 9) +
            1;
    }
}

let risk = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => 10000000));

function forward() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (x === 0 && y === 0) risk[y][x] = 0;
            else {
                let risks = [];
                if (x > 0) risks.push(risk[y][x - 1]);
                if (y > 0) risks.push(risk[y - 1][x]);
                risk[y][x] = Math.min(risk[y][x], Math.min(...risks) + map[y][x]);
            }
        }
    }
}

function backtrack() {
    let res = false;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (y === map.length - 1 && x === map[0].length - 1) return res;
            let risks = [];
            if (x !== map[0].length - 1) risks.push(risk[y][x + 1]);
            if (y !== map.length - 1) risks.push(risk[y + 1][x]);
            let minRisk = Math.min(...risks) + map[y][x];
            if (minRisk < risk[y][x]) {
                risk[y][x] = minRisk;
                res = true;
            }
        }
    }
}

forward();
while (backtrack()) forward();

console.log(risk[risk.length - 1][risk[0].length - 1]);