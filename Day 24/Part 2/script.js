function init(input) {
    var strengths = [];
    var bridges = longestBridges(allBridges(0, input));
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


function removeBridge(bridge, components) {
    for (var i = 0; i<bridge.length; i++) {
        components = removeComponent(components, bridge[i]);
    }
    return components;
}

function removeComponent(components, remove) {
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