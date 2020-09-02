const DEFAULT_MAX_MASK = 0xffffffffffffffffn
export function numberOfOnesBigint(input: bigint, mask: bigint = DEFAULT_MAX_MASK): bigint {
    input &= mask;
    let count = 0n;
    for (input = input & mask; input !== 0n; input >>= 1n) {
        count += input & 1n
    }
    return count;
}

export function numberOfOnesFloat64(input: number): bigint {
    const buff = Buffer.alloc(8);
    buff.writeFloatBE(input);
    const n = buff.readBigUInt64BE(0);
    return numberOfOnesBigint(n);
}

export function numberOfOnesUInt32(input: number) {
    const buff = Buffer.alloc(8);
    buff.writeUInt32BE(input);
    buff.writeUInt32BE(0, 4);
    const n = buff.readBigUInt64BE(0);
    return numberOfOnesBigint(n);
}
