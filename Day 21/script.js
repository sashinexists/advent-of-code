function init(input) {
    var fractal = ".#./..#/###";
    var fractalArr = fractal.split("/");
    return fractalArr;
}

function split(fractal, divisor) {
    var output = [];
    var split;
    for (var i = 0; i<fractal.length; i+=divisor) {
        for (var j = 0; j<fractal[i].length; j+=divisor) {
            var split = [];
            for (var k = 0; k<divisor; k++) {
                split.push(fractal[i+k].slice(j, j+divisor));
            }
            output.push(split);
        }
    }
    return output;
}

function join(splitFractal) {
    var output = [];
    var divisor = splitFractal.length;
    var side = Math.sqrt(divisor);
    var row;
    for (var i = 0; i<splitFractal.length; i++) {
        for(var j = 0; j<side; j+=divisor) {
            row = "";
            for (var k = 0; k<side; k++) {
                row += splitFractal[k][j];
            }
            output.push(row);
        }
    }
    return output;
}

function allPermutations(fractal) {
    var output = [];
    var flipped = flip(fractal);
    output.push(fractal.join("/"));
    output.push(flipped.join("/"));
    for (var i = 0; i<3; i++) {
        fractal = rotate(fractal);
        flipped = rotate(flipped);
        output.push(fractal.join("/"));
        output.push(flipped.join("/"));
    }
    return output;
}

function rotate(fractal) {
    var rotated = [];
    var row;
    for (var i = 0; i<fractal.length; i++) {
        row = "";
        for (var j = 0; j<fractal[i].length; j++) {
            row+=fractal[fractal.length-1-j][i];
        }
        rotated.push(row);
    }
    return rotated;
}

function flip(fractal) {
    var flipped = [];
    var row;
    for (var i=0; i<fractal.length; i++) {
        row = "";
        for (var j=0; j<fractal[i].length; j++) {
            row += fractal[i][fractal.length-1-j];
        }
        flipped.push(row);
    }
    return flipped;
}

function printFractal(fractal){
    var printFractal = "";
    fractal.forEach(function(row){
        printFractal += row +"\n";
    });
    return printFractal;
};

function uniqueArray(arr) {
    var uniqueArray = [];
    for (var i=0; i<arr.length; i++) {
        if(!inArray(uniqueArray, arr[i])) {
            uniqueArray.push(arr[i]);
        }
    }
    return uniqueArray;
}

function inArray(arr, a) {
    for (var i = 0; i<arr.length; i++) {
        if(arr[i]===a) {
            return true;
        }
    }
    return false;
}

//console.log(split(["###...","###...","###...","###..."],2));
//console.log(join(split(["###...","###...","###...","###..."],2)));
console.log(split(["##.","##.","##."],3));
console.log(join(split(["##.","##.","##."],3)));
/*
function test(fractal) {
    var permutations = uniqueArray(allPermutations(fractal));
    permutations.forEach(function(permutation) {
        console.log(printFractal(permutation.split("/")));
    })
};

test(["##..","##..","##..","##.."]);*/