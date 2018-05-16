function init(input) {
    var strengths = [];
    var bridges = longestBridges(allBridgesV3(input, [], 0));
    for (var i = 0; i<bridges.length; i++) {
        strengths.push(bridgeStrength(bridges[i]));
    }
    return highestInArray(strengths);
}

function allMatches(openPort, components) {
    var matches = [];
    for (var i = 0; i<components.length; i++) {
        if(canConnect(openPort, components[i])) {
            matches.push([components[i]]);
        }
    }
    return matches;
}

function joinMatches(bridge, matches) {
    var bridges = [];
    for (var i = 0; i<matches.length; i++) {
        bridges.push(bridge.concat(matches[i]));
    }
    return bridges;
}

function allBridges(openPort, components) {
    var bridges = joinMatches([], allMatches(openPort, components));
    var allComponents = components.slice();
    for (var i = 0; i<bridges.length; i++) {
        openPort = findOpenPort(bridges[i]);
        components = removeBridge(bridges[i], components);
        bridges = bridges.concat(joinMatches(bridges[i], allMatches(openPort, components)));
        components = allComponents.slice();
    }
    return bridges;
}

function allBridgesV2(openPort, components) {
    var matches = allMatches(openPort, components);
    var bridges = joinMatches([], matches);
    for (var i = 0; i<bridges.length; i++) {
        var bridge = bridges[i];
        bridges = bridges.concat(joinMatches(bridge, allBridgesV2(findOpenPort(bridge), removeBridge(bridge, components))));
    }
    return bridges;    
}

function allBridgesV3(components, built, openPort) {
    var bridges = joinMatches(built, allMatches(openPort, components));
    for(var i = 0; i<bridges.length; i++) {
        var bridge = bridges[i];
        bridges = bridges.concat(allBridgesV3(removeBridge(bridge, components), bridge, findOpenPort(bridge)));
    }
    return bridges;    
}

function uniqueBridges(bridges) {
    var strings = [];
    var unique = [];
    var string;
    bridges.forEach(function(bridge) {
        string = bridge.join();
        if(!inArray(strings, string)) {
            strings.push(string);
            unique.push(bridge);
        }
    });
    return unique;
}

function removeBridge(bridge, pool) {
    components = pool.slice();
    for (var i = 0; i<bridge.length; i++) {
        components = removeComponent(components, bridge[i]);
    }
    return components;
}

function removeComponent(components, remove) {
    //components = pool.slice();
    for (var i = 0; i<components.length; i++) {
        if(matchComponent(components[i], remove)) {
            components.splice(i, 1);
            return components;
        }
    }
    return components;
}

function matchComponent(a,b) {
    return a[0]===b[0]&&a[1]===b[1];
}

function bridgeStrength(bridge) {
    var strength = 0;
    for (var i = 0; i<bridge.length; i++) {
        strength += bridge[i][0] + bridge[i][1];
    }
    return strength;
}

function findOpenPort(bridge){
    if(bridge.length===1) {
        if (bridge[bridge.length-1][0]===0) {
            return bridge[bridge.length-1][1];
        } else if (bridge[bridge.length-1][1]===0) {
            return bridge[bridge.length-1][0];
        }
    } else {
        if (bridge[bridge.length-1][0]===bridge[bridge.length-2][0]||bridge[bridge.length-1][0]===bridge[bridge.length-2][1]) {
            return bridge[bridge.length-1][1]
        }
    }
    return bridge[bridge.length-1][0];
}

function canConnect(openPort, component) {
    return openPort === component[0] || openPort === component[1];
}

function highestInArray(arr) {
    var highest = arr[0];
    for (var i = 1; i<arr.length; i++) {
        if(arr[i]>highest) {
            highest = arr[i];
        }
    }
    return highest;
}

function longestBridges(bridges) {
    var longest = [];
    var highestLength = 0;
    for (var i = 0; i<bridges.length; i++) {
        if (bridges[i].length>highestLength) {
            highestLength = bridges[i].length;
        }
    }
    for (var i=0; i<bridges.length; i++) {
        if(bridges[i].length === highestLength) {
            longest.push(bridges[i]);
        }
    }
    return longest;
}

function matchable(openPort, components) {
    for (var i = 0; i<components.length; i++) {
        if (canConnect(openPort, components[i])) {
            return true;
        }
    }
    return false;
}

function inArray(arr, a) {
    for (var i = 0; i<arr.length; i++) {
        if (arr[i]===a) {
            return true;
        }
    }
    return false;
}