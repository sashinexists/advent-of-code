class Instruction {
    constructor(input) {
        this.turnDirection = input[0] === "R" ? "right" : "left";
        this.numberOfBlocks = Number(input.slice(1));
    }
}

class Position {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    getDistanceFromStartingPosition() {
        return Math.abs(this.y)+Math.abs(this.x);
    }

    isAt(position) {
        return position.x === this.x && position.y === this.y;
    }

    inPathMoreThanOnce(path) {
        return path.filter(position =>position.isAt(this)).length>1;
    }
}

function init(input) {
    let destination = {};
    const PERSON = {        
        direction: "north",
        history: [],
        path: [],
        position: new Position(0,0),

        turn(direction) {
            direction === "right" ? this.turnRight() : this.turnLeft();
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
            for (let i = 0; i<blocks; i++) {
                this.step();
                this.path.push(new Position(this.position.x, this.position.y));
            }
        },

        step() {
            switch(this.direction) {
                case "north":
                    this.position.y+=1;
                    break;
                case "east":
                    this.position.x+=1;
                    break;
                case "south":
                    this.position.y-=1;
                    break;
                case "west":
                    this.position.x-=1;
                    break;
                default:
                    console.log("ERROR");
            }
        },

        follow(instruction) {
            const {turnDirection, numberOfBlocks} = instruction;
            this.turn(turnDirection);
            this.walk(numberOfBlocks);
        }
    }
    
    input.forEach(command => {
        const INSTRUCTION = new Instruction(command);
        PERSON.follow(INSTRUCTION);
    })

    destination = PERSON.path.find((position)=>position.inPathMoreThanOnce(PERSON.path));

    return destination.getDistanceFromStartingPosition();
}

function run() {
    const TEST_INPUT = ["R8", "R4", "R4", "R8"];
    const INPUT = ["R1", "R1", "R3", "R1", "R1", "L2", "R5", "L2", "R5", "R1", "R4", "L2", "R3", "L3", "R4", "L5", "R4", "R4", "R1", "L5", "L4", "R5", "R3", "L1", "R4", "R3", "L2", "L1", "R3", "L4", "R3", "L2", "R5", "R190", "R3", "R5", "L5", "L1", "R54", "L3", "L4", "L1", "R4", "R1", "R3", "L1", "L1", "R2", "L2", "R2", "R5", "L3", "R4", "R76", "L3", "R4", "R191", "R5", "R5", "L5", "L4", "L5", "L3", "R1", "R3", "R2", "L2", "L2", "L4", "L5", "L4", "R5", "R4", "R4", "R2", "R3", "R4", "L3", "L2", "R5", "R3", "L2", "L1", "R2", "L3", "R2", "L1", "L1", "R1", "L3", "R5", "L5", "L1", "L2", "R5", "R3", "L3", "R3", "R5", "R2", "R5", "R5", "L5", "L5", "R2", "L3", "L5", "L2", "L1", "R2", "R2", "L2", "R2", "L3", "L2", "R3", "L5", "R4", "L4", "L5", "R3", "L4", "R1", "R3", "R2", "R4", "L2", "L3", "R2", "L5", "R5", "R4", "L2", "R4", "L1", "L3", "L1", "L3", "R1", "R2", "R1", "L5", "R5", "R3", "L3", "L3", "L2", "R4", "R2", "L5", "L1", "L1", "L5", "L4", "L1", "L1", "R1"];
    console.log(init(INPUT));
}

run();