const part1 = async input => {
    // This is from reverse engineering the program
    return 8797248;
}

const part2 = async input => {
    // let c = 0;
    // let previous = new Set();
    // while (true) {
    //     let f = c | 65536;
    //     c = 4843319;
    //     while (true) {
    //         let e = f & 0xff;
    //         c = (((c + e) & 16777215) * 65899) & 16777215

    //         if (256 > f) {
    //             if (!previous.has(c)) console.log(c);
    //             previous.add(c);
    //             break;
    //         }
    //         f = Math.floor(f / 256); 
    //     }  
    // }

    return 3007673;
}

export { part1, part2 };