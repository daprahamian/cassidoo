"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PHI = (1 + Math.pow(5, 0.5)) / 2;
// If we attempt to reverse PHI by doing ((PHI * 2) - 1) ** 2 / 5 - 1
// Math.sin(Math.PI) === 1.2246467991473532e-16 b/c of FP error
// const DEFAULT_PRECISON = Math.sin(Math.PI) * 2;
var DEFAULT_PRECISON = Math.pow(((PHI * 2) - 1), 2) / 5 - 1;
function isGoldenRatio(a, b, precision) {
    if (precision === void 0) { precision = DEFAULT_PRECISON; }
    var _a = a > b ? [b, a] : [a, b], min = _a[0], max = _a[1];
    var diff = Math.abs(((min + max) / max) - PHI);
    return diff <= precision;
}
exports.isGoldenRatio = isGoldenRatio;
