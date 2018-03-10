function init(input) {
    var fractal = ".#./..#/###";
    var fractalArr = fractal.split("/");
    var splitArr;
    for (var i = 0; i<18	; i++) {
    	if (fractalArr[0].length % 2 === 0) {
    		splitArr = split(fractalArr, 2);
    		fractalArr = join(enhanceAll(splitArr, input));
    	} else if (fractalArr[0].length % 3 === 0) {
    		splitArr = split(fractalArr, 3);
    		fractalArr = join(enhanceAll(splitArr, input));
    	}

    }
    return onPixels(fractalArr.join("/"));
}

function onPixels(fractalString) {
	var pixels = 0;
	for (var i = 0; i<fractalString.length; i++) {
		if(fractalString[i]==="#") {
			pixels++
		}
	}
	return pixels;
}

function enhanceAll(splitFractal, input) {
	var output = [];
	splitFractal.forEach(function(square) {
		output.push(enhance(square, input));
	})
	return output;
}

function enhance(square, input) {
	var squareString = square.join("/");
	for (var i = 0; i<input.length; i++) {
		if(inArray(allPermutations(square),input[i][0])) {
			return input[i][1].split("/");
		}
	}
	alert("Fatal error");
	return square;
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

//if there is an issue it is probably here
function join(splitFractal) {
    var output = [];
    var divisor = splitFractal[0].length;
    var side = Math.ceil(Math.sqrt(splitFractal.length));
    var row;
    for (var i = 0; i<splitFractal.length; i+=side) {
    	for (var j = 0; j<splitFractal[i].length; j++) {
    		row = "";
    		for (var k = 0; k<side; k++) {
    			row += splitFractal[i+k][j];
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
    return uniqueArray(output);
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
