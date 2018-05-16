function init() {
    var state = "a";
    var tape = [0];
    var position = 0;
    var movement = [];
    for (var i = 0; i<12994925; i++) {
        switch(state) {
            case "a":
                if (tape[position] === 0) {
                    tape[position] = 1;
                    movement = move("right", tape, position);
                    state = "b";
                } else if (tape[position] === 1) {
                    tape[position] = 0;
                    movement = move("left", tape, position);
                    state = "f";
                }
                break;
            case "b":
                if (tape[position] === 0) {
                    tape[position] = 0;
                    movement = move("right", tape, position);
                    state = "c";
                } else if (tape[position] === 1) {
                    tape[position] = 0;
                    movement = move("right", tape, position);
                    state = "d";
                }
                break;
            case "c":
                if (tape[position] === 0) {
                    tape[position] = 1;
                    movement = move("left", tape, position);
                    state = "d";
                } else if (tape[position] === 1) {
                    tape[position] = 1;
                    movement = move("right", tape, position);
                    state = "e";
                }
                break;
            case "d":
                if (tape[position] === 0) {
                    tape[position] = 0;
                    movement = move("left", tape, position);
                    state = "e";
                } else if (tape[position] === 1) {
                    tape[position] = 0;
                    movement = move("left", tape, position);
                    state = "d";
                }
                break;
            case "e":
                if (tape[position] === 0) {
                    tape[position] = 0;
                    movement = move("right", tape, position);
                    state = "a";
                } else if (tape[position] === 1) {
                    tape[position] = 1;
                    movement = move("right", tape, position);
                    state = "c";
                }
                break;
            case "f":
                if (tape[position] === 0) {
                    tape[position] = 1;
                    movement = move("left", tape, position);
                    state = "a";
                } else if (tape[position] === 1) {
                    tape[position] = 1;
                    movement = move("right", tape, position);
                    state = "a";
                }
                break;  
        }
        tape = movement[0];
        position = movement[1];
    }
    return sumArray(tape);
}

function move(direction, tape, position) {
    if (direction === "left") {
        position--;
        if (position<0) {
            tape.unshift(0);
            position++;
        }
    } else if (direction === "right") {
        position++;
        if (position>=tape.length) {
            tape.push(0);
        }
    }
    return [tape, position];
}

function sumArray(arr) {
    var sum = 0;
    for (var i = 0; i<arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}