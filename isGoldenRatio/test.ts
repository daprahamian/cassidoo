import {expect} from 'chai'
import {isGoldenRatio} from './index';

describe('isGoldenRatio', function() {
    const PHI = (1 + Math.sqrt(5))/2;
    Array.from({length: 100000}).forEach((_, i) => {
        const n = i + 1;
        const m = n * PHI;

        it(`should pass for ${n} and ${m}`, function() {
            expect(isGoldenRatio(n, m)).to.equal(true);
        });
    });
});
