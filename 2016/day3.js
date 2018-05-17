"use strict";

class Triangle {
    constructor(sides) {
        this.sides = sides;
    }

    isValid() {
        const {sides} = this;
        return sides[0] + sides[1] > sides[2] 
                && sides[0] + sides[2] > sides[1]
                && sides[1] + sides[2] > sides[0];
    }
}

function init(input) {
    let numberOfValidTriangles = 0;
    input.forEach(sides => {
        const TRIANGLE = new Triangle(sides);
        numberOfValidTriangles += TRIANGLE.isValid() ? 1 : 0;
    });
    return numberOfValidTriangles;
}


function readInput() {
    const fs = require('fs');
    return fs.readFileSync("input/day3.txt", "utf8");
};

function parseInput(input) {
    return input.split("\n")
            .map(line => line.split(" "))
            .map(arr => arr.filter(str=>str!==""))
            .map(arr => arr.map(str=>Number(str)));
}

(
    function run() {
        console.log(init(parseInput(readInput())));
    }
)();