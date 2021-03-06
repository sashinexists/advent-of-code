function init(input) {
    var registry = {a:1,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
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
                    registry[input[i][1]] *= input[i][2];
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
                    registry[input[i][1]] *= registry[input[i][2]];
                    break;
            }
        }
        if (input[i][1]==="h" && !isPrime(registry["b"])) {
            count++;
        } else if(input[i][0]==="jnz") {
            if((typeof(input[i][1])==="number"&&input[i][1]!==0)||(typeof(input[i][1])==="string"&& registry[input[i][1]]!==0)) {
                i += input[i][2] -1;
            }
        }
        if(i===8) {
            i = 24;
        }   
    }
    return count;
}

function isPrime(num) {
    for (var i = 1; i<num-1; i++) {
        if (num%(num-i)===0) {
            return false;
        }
    }
    return true;
}
