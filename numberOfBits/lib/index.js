"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberOfOnesUInt32 = exports.numberOfOnesFloat64 = exports.numberOfOnesBigint = void 0;
const DEFAULT_MAX_MASK = 0xffffffffffffffffn;
function numberOfOnesBigint(input, mask = DEFAULT_MAX_MASK) {
    input &= mask;
    let count = 0n;
    for (input = input & mask; input !== 0n; input >>= 1n) {
        count += input & 1n;
    }
    return count;
}
exports.numberOfOnesBigint = numberOfOnesBigint;
function numberOfOnesFloat64(input) {
    const buff = Buffer.alloc(8);
    buff.writeFloatBE(input);
    const n = buff.readBigUInt64BE(0);
    return numberOfOnesBigint(n);
}
exports.numberOfOnesFloat64 = numberOfOnesFloat64;
function numberOfOnesUInt32(input) {
    const buff = Buffer.alloc(8);
    buff.writeUInt32BE(input);
    buff.writeUInt32BE(0, 4);
    const n = buff.readBigUInt64BE(0);
    return numberOfOnesBigint(n);
}
exports.numberOfOnesUInt32 = numberOfOnesUInt32;
