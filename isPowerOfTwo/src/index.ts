/**
 * Determines if x is a power of 2.
 * 
 * Relies on:
 * - For a power of two X:
 *   - X has a single non-zero bit
 *   - (X - 1) will flip that bit to 0, and fill in all less significant digits with 1
 *   - Therefore, X and (X - 1) will have no non-zero bits in common, so
 *     (X & (X - 1)) === 0 for powers of 2
 * - For a not-power-of-two positive integer X:
 *   - X - 1 will share the same most significant non-zero digit as X
 *   - Therefore (X & (X - 1)) !== 0 for non-powers-of-two positive integers
 * - Therefore, (X & (X - 1)) === 0 iff X is a positive integer and X is a power of 2
 * 
 * IMPORTANT NOTE: This works in JS because it is using bigint. This function will not work
 * if used on a number because bitwise & in JS casts numbers to 32-bit signed integers.
 * That means:
 * 
 * - non-integer X can be false positives if Math.floor(X) is a power of 2.
 *   Ex: (2.5 & (2.5 - 1)) === 0
 * - Numbers > 2 ** 32 are effectively bitmasked with 0xffffffff, so any number x
 *   where (x > (2 ** 32)) and ((x & 0xffffffff) === 0) will be a false positive:
 *   Ex: x = (2 ** 40) + (2 ** 39); (x & (x - 1)) === 0
 * 
 * @param {bigint} x Integer to check
 * @return {boolean} true if x is a power of two
 */
export function isBigintPowerOfTwo(x: bigint): boolean {
    return x > 0 && ((x & (x - 1n)) === 0n)
}

const powersOfTwo = new Set();
for (let i = 1; i < Number.MAX_SAFE_INTEGER; i *= 2) {
    powersOfTwo.add(i);
}

/**
 * Determines if x is a power of two
 *
 * Rather than doing math, just precompute all valid safe integers that are powers of 2
 * as a set, and then compare against that set for numbers passed in.
 * 
 * @param {number} x Number to check
 * @return {boolean} true if x is a power of two 
 */
export function isNumberPowerOfTwo(x: number) {
    return powersOfTwo.has(x);
}

/**
 * Determines if passed in value is a power of 2
 * 
 * @param {*} x An unknown value
 * @return {boolean} True if x is a power of 2
 */
export function isPowerOfTwo(x: unknown): boolean {
    switch (typeof x){
        case 'number': return isNumberPowerOfTwo(x);
        case 'bigint': return isBigintPowerOfTwo(x);
        default: return false;
    }
}
