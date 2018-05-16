function init(input) {
    const PERSON = {        
        direction: "north",

        position: {
            x: 0,
            y: 0,
        },

        turnRight() {
            switch(this.direction) {
                case "north":
                    this.changeDirection("east");
                    break;
                case "east":
                    this.changeDirection("south");
                    break;
                case "south":
                    this.changeDirection("west");
                    break;
                case "west":
                    this.changeDirection("north");
                    break;
                default:
                    console.log("ERROR");
            }
        },

        turnLeft() {
            switch (this.direction){
                case "north":
                    this.changeDirection("west");
                    break;
                case "east":
                    this.changeDirection("north");
                    break;
                case "south":
                    this.changeDirection("east");
                    break;
                case "west":
                    this.changeDirection("south");
                    break;
                default:
                    console.log("ERROR");
            }
        },

        changeDirection(direction) {
            this.direction = direction;
        },

        walk(blocks) {
            switch(this.direction) {
                case "north":
                    this.position.y+=blocks;
                    break;
                case "east":
                    this.position.x+=blocks;
                    break;
                case "south":
                    this.position.y-=blocks;
                    break;
                case "west":
                    this.position.x-=blocks;
                    break;
                default:
                    console.log("ERROR");
            }
        },

        getDistanceFromStartingPosition() {
            return Math.abs(this.position.y)+Math.abs(this.position.x);
        }
    }
    input.forEach(function(instruction) {
        instruction[0] === "R" ? PERSON.turnRight() : PERSON.turnLeft();
        PERSON.walk(Number(instruction[1]));
    })
    return PERSON.getDistanceFromStartingPosition();
}

function run() {
    const TEST_INPUT = ["R5", "L5", "R5", "R3"];
    const INPUT = ["R1", "R1", "R3", "R1", "R1", "L2", "R5", "L2", "R5", "R1", "R4", "L2", "R3", "L3", "R4", "L5", "R4", "R4", "R1", "L5", "L4", "R5", "R3", "L1", "R4", "R3", "L2", "L1", "R3", "L4", "R3", "L2", "R5", "R190", "R3", "R5", "L5", "L1", "R54", "L3", "L4", "L1", "R4", "R1", "R3", "L1", "L1", "R2", "L2", "R2", "R5", "L3", "R4", "R76", "L3", "R4", "R191", "R5", "R5", "L5", "L4", "L5", "L3", "R1", "R3", "R2", "L2", "L2", "L4", "L5", "L4", "R5", "R4", "R4", "R2", "R3", "R4", "L3", "L2", "R5", "R3", "L2", "L1", "R2", "L3", "R2", "L1", "L1", "R1", "L3", "R5", "L5", "L1", "L2", "R5", "R3", "L3", "R3", "R5", "R2", "R5", "R5", "L5", "L5", "R2", "L3", "L5", "L2", "L1", "R2", "R2", "L2", "R2", "L3", "L2", "R3", "L5", "R4", "L4", "L5", "R3", "L4", "R1", "R3", "R2", "R4", "L2", "L3", "R2", "L5", "R5", "R4", "L2", "R4", "L1", "L3", "L1", "L3", "R1", "R2", "R1", "L5", "R5", "R3", "L3", "L3", "L2", "R4", "R2", "L5", "L1", "L1", "L5", "L4", "L1", "L1", "R1"];
    console.log(init(TEST_INPUT));
}

run();