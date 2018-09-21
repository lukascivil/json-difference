"use strict";
exports.__esModule = true;
var JsonDiffer = /** @class */ (function () {
    function JsonDiffer() {
    }
    JsonDiffer.prototype.getDiff = function (struct1, struct2) {
        var delta = {
            "new": [],
            removed: [],
            edited: []
        };
        var struct1_paths = this.getStructPaths(struct1);
        var struct2_paths = this.getStructPaths(struct2);
        // A-B
        delta.removed = this.getRemovedPaths(struct1_paths, struct2_paths);
        // // B-A
        delta["new"] = this.getAddedPaths(struct1_paths, struct2_paths);
        // // a->b
        delta.edited = this.getEditedPaths(struct1_paths, struct2_paths);
        return delta;
    };
    JsonDiffer.prototype.getStructPaths = function (struct, paths, currentpath) {
        if (paths === void 0) { paths = []; }
        if (currentpath === void 0) { currentpath = ''; }
        var _a;
        var oi;
        for (var key in struct) {
            var path = currentpath !== '' ? currentpath + "/" + key : key;
            console.log('key', key);
            console.log('struct[key]', struct[key]);
            if (typeof struct[key] == "object") {
                this.getStructPaths(struct[key], paths, path);
            }
            else {
                oi = (_a = {},
                    _a[path] = struct[key],
                    _a);
                paths.push(oi);
            }
        }
        ;
        return paths;
    };
    // Diference
    JsonDiffer.prototype.getRemovedPaths = function (struct1_paths, struct2_paths) {
        return struct1_paths.filter(function (x) { return !struct2_paths.includes(x); });
    };
    JsonDiffer.prototype.getAddedPaths = function (struct1_paths, struct2_paths) {
        return struct2_paths.filter(function (x) { return !struct1_paths.includes(x); });
    };
    JsonDiffer.prototype.getEditedPaths = function (struct1_paths, struct2_paths) {
        var paths = [];
        for (var key in struct1_paths) {
            if (struct2_paths.hasOwnProperty(key)) {
                if (struct1_paths[key] != struct2_paths[key]) {
                    var diff = {
                        edited: {
                            newvalue: struct1_paths[key],
                            oldvalue: struct2_paths[key]
                        }
                    };
                    paths.push(diff);
                }
            }
            return paths;
        }
    };
    return JsonDiffer;
}());
exports.JsonDiffer = JsonDiffer;
