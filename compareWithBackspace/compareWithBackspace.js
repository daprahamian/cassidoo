'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function* backspaceIterator(input) {
    let backspaces = 0;
    for (let i = input.length - 1; i >= 0; i--) {
        const char = input[i];
        if (char === '#') {
            backspaces += 1;
        }
        else if (backspaces > 0) {
            backspaces -= 1;
        }
        else {
            yield char;
        }
    }
}
function compareIterables(iterable1, iterable2) {
    const otherIter = iterable2[Symbol.iterator]();
    for (const item1 of iterable1) {
        const { value: item2, done } = otherIter.next();
        if (done || item1 !== item2) {
            return false;
        }
    }
    return !!otherIter.next().done;
}
function compareWithBackspace(str1, str2) {
    const iter1 = backspaceIterator(str1);
    const iter2 = backspaceIterator(str2);
    return compareIterables(iter1, iter2);
}
exports.compareWithBackspace = compareWithBackspace;
