function init (input) {
    var registry = { a:[0,0], b:[0,0], c:[0,0], d:[0,0], e:[0,0], f:[0,0], g:[0,0], h:[0,0], i:[0,0], k:[0,0], l:[0,0], m:[0,0], n:[0,0], o:[0,0], p:[0,0],}
    var recovery = 0;
    for (var i = 0; i<input.length; i++){
        //alert("i is: "+i+"\na is: "+registry["a"]);
        switch (input[i][0]) {
            case "snd":
                recovery = registry[input[i][1]][0];
                break;
            case "rcv":
                if (recovery !== 0) {
                    return recovery;
                }
                break;
            case "jgz":
                i += jump(registry[input[i][1]], input[i][2]);
                break;
            case "mul":
                registry[input[i][1]] = mul(registry[input[i][1]], registry[input[i][2]][0]);
                break;
            default:
                registry[input[i][1]] = execute(input[i][0], registry[input[i][1]], input[i][2]);
        }
    }
    return registry;
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
    register[0] = val;
    return register;
}

function add(register, val) {
    register[0]+=val;
    return register;
}

function mul(register, val) {
    register[0]*=val;
    return register;
}

function mod(register, val) {
    register[0] %= val;
    return register;
}

function recover(register) {
    return register[1];
}

function jump(register, val) {
    if(register[0]>0) {
        return val--;
    }
    return 0;
}