function init(input) {
    return highestStrength(longestBridges(allBridges(0, input, [])));
}

function allBridges(openPort, components, built) {
    var bridges = joinMatches(built, allMatches(openPort, components));
    bridges = bridges.concat(bridges.reduce(function(extensions, bridge) {
        return extensions.concat(allBridges(findOpenPort(bridge), removeBridge(bridge, components), bridge));
    }, []));
    return bridges; 
}

function longestBridges(bridges) {
    var highestLength = maxLength(bridges);
    return bridges.filter(function(bridge) {
        return bridge.length === highestLength;
    });
}

function maxLength(bridges) {
    return bridges.reduce(function(length, bridge) {
        if(bridge.length>length) {
            return bridge.length;
        }
        return length;
    }, 0);
}

function highestStrength(bridges) {
    var strength;
    return bridges.reduce(function(highestStrength, bridge) {
        strength = bridgeStrength(bridge);
        if(strength > highestStrength) {
            return strength;
        }
        return highestStrength;
    }, 0);
}

function bridgeStrength(bridge) {
    return bridge.reduce(function(bridgeStrength, component) {
        return bridgeStrength + componentStrength(component);
    }, 0)
}

function componentStrength(component) {
    return component[0] + component[1];
}

function removeBridge(bridge, components) {
    return components.filter(function(component) {
        return !usedComponent(component, bridge);
    });
}

function usedComponent(component, bridge) {
    return bridge.some(function(part) {
        return sameComponent(component, part);
    });
}

function findOpenPort(bridge) {
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

function joinMatches(bridge, matches) {
    return matches.reduce(function(existing, match) {
        return existing.concat([bridge.concat([match])]);
    }, []);
}

function allMatches(openPort, components) {
    return components.filter(function(component) {
        return isCompatible(openPort, component);
    });
}

function sameComponent(a, b) {
    return a[0]===b[0] && a[1] === b[1];
}

function isCompatible(openPort, component) {
    return openPort === component[0] || openPort === component[1];
}