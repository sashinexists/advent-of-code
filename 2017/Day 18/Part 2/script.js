function init(input) {
    var program0 = new Program(0);
    var program1 = new Program(1);
    while(program0.t >= 0 && program1.t >= 0 && program0.t <input.length && program1.t <input.length &&(program0.deadlock ===0 || program1.deadlock ===0)) {
        program1 = program0.run(program1, input[program0.t]);
        program0 = program1.run(program0, input[program1.t]);
    }
    return program1.sent;
}
    


/*function init (input) {
    var registry = { a:[0,0], b:[0,0], c:[0,0], d:[0,0], e:[0,0], f:[0,0], g:[0,0], h:[0,0], i:[0,0], k:[0,0], l:[0,0], m:[0,0], n:[0,0], o:[0,0], p:[0,0],}
    var recovery = 0;
    for (var z = 0; z<input.length; z++){
        switch (input[z][0]) {
            case "snd":
                recovery = registry[input[z][1]][0];
                break;
            case "rcv":
                if (registry[input[z][1]] !==0) {
                    return recovery;
                }
                break;
            case "jgz":
                if (typeof input[z][2]=== "string") {
                    z += jump(registry[input[z][1]], registry[input[z][2]][0]);
                } else {
                    z += jump(registry[input[z][1]], input[z][2]);
                }
                z = z % input.length;
                break;
            default:
                if(typeof input[z][2]=== "string") {
                    registry[input[z][1]] = execute(input[z][0], registry[input[z][1]], registry[input[z][2]][0]);
                } else {
                    registry[input[z][1]] = execute(input[z][0], registry[input[z][1]], input[z][2]);
                }
                    
        }
    }
    return registry;
}*/

class Program {
    constructor(id) {
        this.state = { a:0, b:0, c:0, d:0, e:0, f:0, g:0, h:0, i:0, k:0, l:0, m:0, n:0, o:0, p:id};
        this.queue = [];
        this.t = 0;
        this.sent = 0;
        this.deadlock = 0;
        this.run = function(programX, input){
            switch (input[0]) {
                case "snd":
                    this.queue.push(this.state[input[1]]);
                    this.sent++;
                    programX.deadlock = 0;
                    break;
                case "rcv":
                    if (programX.queue.length > 0) {
                        //alert("Recovery in process: "+this.t);
                        this.state[input[1]] = programX.queue[0];
                        programX.queue.shift();
                        //return programX;
                    } else {
                        //alert("Failed recovery: "+this.t);
                        this.t--;
                        this.deadlock = 1;
                    }
                    break;
                case "jgz":
                    if (typeof input[2]=== "string" && typeof input[1]==="string") {
                        this.t += jump(this.state[input[1]], this.state[input[2]]);
                    } else if (typeof input[1]==="string"){
                        this.t += jump(this.state[input[1]], input[2]);
                    } else {
                        this.t += jump(input[1],input[2]);
                    }
                    //this.t = this.t % input.length;
                    break;
                default:
                    if(typeof input[2]=== "string") {
                        this.state[input[1]] = execute(input[0], this.state[input[1]], this.state[input[2]]);
                    } else {
                        this.state[input[1]] = execute(input[0], this.state[input[1]], input[2]);
                    }                      
            }
            this.t++;
            return programX;
        }
    }
}

function execute(instruction, register, val) {
    switch (instruction) {
        case "snd":
            return play(register, val);
        case "set":
            return set(register, val);
        case "add":
            return add(register, val);
        case "mul":
            return mul(register, val);
        case "mod":
            return mod(register, val);
        case "rcv":
            return recover(register);
        case "jump":
            return jump(register,val);
    }
    alert("Error in function execute");
    return register; 
}

function play (register) {
    register[1]=register[0];
    return register;
}

function set(register, val) {
    register = val;
    return register;
}

function add(register, val) {
    register+=val;
    return register;
}

function mul(register, val) {
    register*=val;
    return register;
}

function mod(register, val) {
    register %= val;
    return register;
}


function jump(register, val) {
    if(register>0) {
        val--;
        return val;
    }
    return 0;
}