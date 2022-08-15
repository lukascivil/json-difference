export var getEditedPaths = function (oldStructPaths, newStructPaths) {
    var _a;
    var diffs = [];
    var diff = {};
    for (var key in oldStructPaths) {
        if (newStructPaths.hasOwnProperty(key)) {
            if (oldStructPaths[key] !== newStructPaths[key]) {
                diff = (_a = {},
                    _a[key] = {
                        oldValue: oldStructPaths[key],
                        newValue: newStructPaths[key]
                    },
                    _a);
                diffs.push(diff);
            }
        }
    }
    return diffs;
};
