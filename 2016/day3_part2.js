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
    const TRIANGLES = getTriangles(input);
    return TRIANGLES.filter((triangle) => triangle.isValid()).length;
}

function getTriangles(input) {
    const TRIANGLES = [];
    for (let i=0; i<input.length; i+=3) {
        for (let j=0; j<3; j++) {
            TRIANGLES.push(new Triangle([input[i][j], input[i+1][j], input[i+2][j]]));
        }
    }
    return TRIANGLES;
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

