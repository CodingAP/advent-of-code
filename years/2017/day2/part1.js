module.exports = input => {
    let checksum = 0;
    let rows = input.split('\n');
    for (let i = 0; i < rows.length; i++) {
        let numbers = rows[i].replace(/[\t]/g, ' ').split(' ');
        let largest = -Infinity, smallest = Infinity;
        for (let j = 0; j < numbers.length; j++) {
            largest = Math.max(largest, parseInt(numbers[j]));
            smallest = Math.min(smallest, parseInt(numbers[j]));
        }
        checksum += largest - smallest;
    }
    return checksum;
}