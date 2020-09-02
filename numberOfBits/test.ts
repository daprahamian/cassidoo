import {numberOfOnesUInt32} from './src/';
import {expect} from 'chai';


describe('numberOfOnesUInt32', function() {
    function testNum(int: number) {
        let expected = 0;
        for (let i = 0; i < 32; i++) {
            expected += (int & (1 << i)) >>> i;
        }

        expect(numberOfOnesUInt32(int)).to.equal(BigInt(expected));
    }

    it('should work for positive numbers', function() {
        for (let i = 0; i < 2 ** 32; i++) {
            testNum(i);
        }
    });
});
