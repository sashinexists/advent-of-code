function init(input) {
    var registry = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
    var activeRegister;
    var count = 0;
    for(var i = 0; i<input.length; i++) {
        if(typeof(input[i][2])==="number") {
            switch(input[i][0]) {
                case "set":
                    registry[input[i][1]] = input[i][2];
                    break;
                case "sub":
                    registry[input[i][1]] -= input[i][2];
                    break;
                case "mul":
                    registry[input[i][1]] -= input[i][2];
                    count++;
                    break;
            }
        } else if (typeof(input[i][2])==="string") {
            switch(input[i][0]) {
                case "set":
                    registry[input[i][1]] = registry[input[i][2]];
                    break;
                case "sub":
                    registry[input[i][1]] -= registry[input[i][2]];
                    break;
                case "mul":
                    registry[input[i][1]] -= registry[input[i][2]];
                    count++;
                    break;
            }
        }
        if(input[i][0]==="jnz" && registry[input[i][1]] !== 0) {
            i += input[i][2] - 1;
        }
        
    }
    return count;
}
