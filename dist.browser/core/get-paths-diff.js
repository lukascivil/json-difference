export var getPathsDiff = function (oldStructPaths, newStructPaths) {
    var diff = {};
    for (var key in oldStructPaths) {
        if (!(key in newStructPaths)) {
            diff[key] = oldStructPaths[key];
        }
    }
    return diff;
};
