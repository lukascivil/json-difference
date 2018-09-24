var JsonDiffer = /** @class */ (function () {
    function JsonDiffer() {
    }
    JsonDiffer.prototype.getDiff = function (struct1, struct2) {
        var delta = {
            new: [],
            removed: [],
            edited: [],
        };
        var struct1_paths = this.getStructPaths(struct1);
        var struct2_paths = this.getStructPaths(struct2);
        // A-B
        delta.removed = this.getPathsDiff(struct1_paths, struct2_paths);
        // B-A
        delta.new = this.getPathsDiff(struct2_paths, struct1_paths);
        // a->b
        delta.edited = this.getEditedPaths(struct1_paths, struct2_paths);
        return delta;
    };
    JsonDiffer.prototype.getStructPaths = function (struct, paths, currentpath) {
        if (paths === void 0) { paths = []; }
        if (currentpath === void 0) { currentpath = ''; }
        for (var key in struct) {
            var path = currentpath !== '' ? currentpath + "/" + key : key;
            if (typeof struct[key] == "object") {
                this.getStructPaths(struct[key], paths, path);
            }
            else {
                paths[path] = struct[key];
            }
        }
        ;
        return paths;
    };
    // Diference by key
    JsonDiffer.prototype.getPathsDiff = function (struct1_paths, struct2_paths) {
        var diff = {};
        for (var key in struct1_paths) {
            if (!(key in struct2_paths)) {
                diff[key] = struct1_paths[key];
            }
        }
        return diff;
    };
    // Diference by value
    JsonDiffer.prototype.getEditedPaths = function (struct1_paths, struct2_paths) {
        var _a;
        var diffs = [];
        var diff = {};
        for (var key in struct1_paths) {
            if (struct2_paths.hasOwnProperty(key)) {
                if (struct1_paths[key] != struct2_paths[key]) {
                    diff = (_a = {},
                        _a[key] = {
                            newvalue: struct1_paths[key],
                            oldvalue: struct2_paths[key]
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
