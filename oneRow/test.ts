import {oneRow} from './index';

import {expect} from 'chai';

describe('oneRow', function() {
    it('should return an empty list given an empty list', function() {
        expect(oneRow([])).to.deep.equal([]);
    });

    it('should throw on an invalid keyboard name', function() {
        expect(() => oneRow([], 'fizzybob')).to.throw();
    });

    describe('querty', function() {
        it('should properly filter for querty', function() {
            const actual = oneRow(['candy', 'doodle', 'pop', 'shield', 'lag', 'typewriter']);
            expect(actual).to.deep.equal(['pop', 'lag', 'typewriter']);
        });
    });

    describe('dvorak', function() {
        it('should properly filter for dvorak', function() {
            const actual = oneRow(['dad', 'mom', 'brother', 'sister'], 'dvorak');
            expect(actual).to.deep.equal(['dad']);
        });
    });
});
