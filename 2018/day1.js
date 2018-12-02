function init(input) {
    return input.reduce((sum, val)=> sum += val, 0);
}

function readInput() {
    const fs = require('fs');
    return fs.readFileSync("input/day1.txt", "utf8");
}

function parseInput(input) {
    return input.replace(/\n/g,",").split(",");
}

(
    function run() {
        console.log(init(parseInput(readInput()).map(val=>Number(val))));
    }
)();