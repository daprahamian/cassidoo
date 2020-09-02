import {expect} from 'chai';
import { isPowerOfTwo, isBigintPowerOfTwo, isNumberPowerOfTwo } from './src/index';

// describe('isBigintPowerOfTwo', function() {
//     const MAX_TESTING_VALUE = 2 ** 64;
//     const validPowersOfTwo = new Set<bigint>();
//     for (let i = 1n; i <= MAX_TESTING_VALUE; i *= 2n) {
//         validPowersOfTwo.add(i);
//     }

//     for (let i = 1n; i <= MAX_TESTING_VALUE; i += 1n) {
//         const shouldPass = validPowersOfTwo.has(i);
//         it(`should return ${shouldPass} for value ${i}`, function() {
//             expect(isBigintPowerOfTwo(i)).to.equal(shouldPass);
//         });
//     }
// });

let MAX_TEST_BIGINT: bigint = 2n ** 32n;
try {
    MAX_TEST_BIGINT = BigInt(process.env.TEST_RANGE);
} catch (e) {

}
const MAX_TEST_NUMBER = Math.min(Number(MAX_TEST_BIGINT), Number.MAX_SAFE_INTEGER);

describe('isNumberPowerOfTwo', function() {
    const validPowersOfTwo = new Set<number>();
    for (let i = 1; i <= Number.MAX_SAFE_INTEGER; i *= 2) {
        validPowersOfTwo.add(i);
    }

    function checkFailures<T>(falsePositives: Set<T>, falseNegatives: Set<T>) {
        if (falseNegatives.size || falsePositives.size) {
            const errorStats = {
                falseNegativeCount: falseNegatives.size,
                falsePositiveCount: falsePositives.size,
                falseNegatives,
                falsePositives,
            };
            const e = new Error(`isNumberPowerOfTwo failed: ${JSON.stringify(errorStats)}`);
            Object.assign(e, { errorStats });
            throw e;
        }
    }

    function test(min: number, max: number) {
        it(`test range: ${min} - ${max}`, function() {

            const falsePositives = new Set<number>();
            const falseNegatives = new Set<number>();
    
            for (let i = min; i < max; i += 1) {
                const actual = isNumberPowerOfTwo(i);
                const expected = validPowersOfTwo.has(i);
    
                if (expected && !actual) {
                    falseNegatives.add(i);
                }
    
                if (actual && !expected) {
                    falsePositives.add(i);
                }
    
                if (falsePositives.size + falseNegatives.size > 10) {
                    checkFailures(falsePositives, falseNegatives);
                }
            }
            checkFailures(falsePositives, falseNegatives);
        });
    }

    const INCREMENT = 0xFFFF;

    for (let i = 0; i <= MAX_TEST_NUMBER; i += INCREMENT) {
        const maxTestValue = Math.min(MAX_TEST_NUMBER + 1, i + INCREMENT);
        test(i, maxTestValue);
    }
});
