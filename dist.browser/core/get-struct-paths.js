export var getStructPaths = function (struct, paths, currentPath) {
    if (paths === void 0) { paths = {}; }
    if (currentPath === void 0) { currentPath = ''; }
    for (var _i = 0, _a = Object.keys(struct); _i < _a.length; _i++) {
        var key = _a[_i];
        var path = currentPath !== '' ? currentPath + "/" + key : key;
        if (typeof struct[key] === 'object') {
            getStructPaths(struct[key], paths, path);
        }
        else {
            paths[path] = struct[key];
        }
    }
    return paths;
};
