function init(input) {
    var position = findStartingPosition(input[0]);
    var direction = "south";
    var output = "";
    var current;
    var steps = 0
    while(direction) {
        position = move(direction, position);
        current = input[position[1]][position[0]];
        if(current !== "|" && current !== "-" && current !== "+" ) {
            output += current;
        }
        direction = changeDirection(direction, position, input);
        //console.log(position);
        steps++
    }
    return steps;
}

function changeDirection(direction, position, input) {
    var movement = move(direction, position);
    if(input[movement[1]][movement[0]]!==" ") {
        return direction;
    }
    if (direction === "north" || direction === "south") {
        movement = move("east", position);
        if(input[movement[1]][movement[0]]!==" ") {
            return "east";
        } else {
            movement = move("west", position);
            if(input[movement[1]][movement[0]]!==" ") {
                return "west";
            }
        }
    } else if (direction ==="east" || direction === "west") {
        movement = move("south", position);
        if(input[movement[1]][movement[0]]!==" ") {
            return "south";
        } else {
            movement = move("north", position);
            if(input[movement[1]][movement[0]]!==" ") {
                return "north";
            }
        }
    }
    return false;
}

function move(direction, position){
    switch(direction) {
        case "north":
            return [position[0],position[1]-1];
        case "south":
            return [position[0], position[1]+1];
        case "east":
            return [position[0]+1, position[1]];
        case "west":
            return [position[0]-1, position[1]];
    }
    alert("You lose!");
}

function findStartingPosition(firstLine) {
    for (var i = 0; i<firstLine.length; i++) {
        if(firstLine[i]==="|") {
            return [i,0];
        }
    }
    return null;
}