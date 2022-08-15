// Packages
import { getEditedPaths } from './get-edited-patch';
import { getPathsDiff } from './get-paths-diff';
import { getStructPaths } from './get-struct-paths';
export var getDiff = function (oldStruct, newStruct) {
    var delta = {
        new: {},
        removed: {},
        edited: []
    };
    var oldStructPaths = getStructPaths(oldStruct);
    var newStructPaths = getStructPaths(newStruct);
    // A-B
    delta.removed = getPathsDiff(oldStructPaths, newStructPaths);
    // B-A
    delta.new = getPathsDiff(newStructPaths, oldStructPaths);
    // a->b
    delta.edited = getEditedPaths(oldStructPaths, newStructPaths);
    return delta;
};
