var JsonDiffer = /** @class */ (function () {
    function JsonDiffer() {
    }
    JsonDiffer.prototype.getDiff = function (oldStruct, newStruct) {
        var delta = {
            new: {},
            removed: {},
            edited: []
        };
        var oldStructPaths = this.getStructPaths(oldStruct);
        var newStructPaths = this.getStructPaths(newStruct);
        // A-B
        delta.removed = this.getPathsDiff(oldStructPaths, newStructPaths);
        // B-A
        delta.new = this.getPathsDiff(newStructPaths, oldStructPaths);
        // a->b
        delta.edited = this.getEditedPaths(oldStructPaths, newStructPaths);
        return delta;
    };
    JsonDiffer.prototype.getStructPaths = function (struct, paths, currentPath) {
        if (paths === void 0) { paths = {}; }
        if (currentPath === void 0) { currentPath = ''; }
        for (var _i = 0, _a = Object.keys(struct); _i < _a.length; _i++) {
            var key = _a[_i];
            var path = currentPath !== '' ? "".concat(currentPath, "/").concat(key) : key;
            if (typeof struct[key] === 'object') {
                this.getStructPaths(struct[key], paths, path);
            }
            else {
                paths[path] = struct[key];
            }
        }
        return paths;
    };
    // Difference by key
    JsonDiffer.prototype.getPathsDiff = function (oldStructPaths, newStructPaths) {
        var diff = {};
        for (var key in oldStructPaths) {
            if (!(key in newStructPaths)) {
                diff[key] = oldStructPaths[key];
            }
        }
        return diff;
    };
    // Difference by value
    JsonDiffer.prototype.getEditedPaths = function (oldStructPaths, newStructPaths) {
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
    return JsonDiffer;
}());
export { JsonDiffer };
