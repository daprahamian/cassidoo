import {expect} from 'chai';
import {Editor, EmptyAppendError, NonPositiveDeleteError, DeleteTooFarError, UndoError, RedoError} from './src/'

describe('Editor', function() {
    const ed = () => new Editor();
    it('can construct', function() {
        expect(() => new Editor()).to.not.throw();
    });

    it('should be able to append characters', function() {
        const e = ed();
        expect(e.toString()).to.equal('');
        e.append('hello');
        expect(e.toString()).to.equal('hello');
        e.append('world');
        expect(e.toString()).to.equal('helloworld');
    });

    it('should be able to delete characters', function() {
        const e = ed().append('hello');
        expect(e.toString()).to.equal('hello');
        e.delete(3);
        expect(e.toString()).to.equal('he');
        e.delete(1);
        expect(e.toString()).to.equal('h');
    });

    it('should be able to undo operations', function() {
        const e = ed().append('hello').delete(2).append('met');
        expect(e.toString()).to.equal('helmet');
        e.undo();
        expect(e.toString()).to.equal('hel');
        e.undo();
        expect(e.toString()).to.equal('hello');
        e.undo();
        expect(e.toString()).to.equal('');
    });

    it('should be able to redo undone operations', function() {
        const e = ed().append('hello').delete(2).append('met').undo().undo();
        expect(e.toString()).to.equal('hello');
        e.redo();
        expect(e.toString()).to.equal('hel');
        e.redo();
        expect(e.toString()).to.equal('helmet');
    });

    it('should clear redo stack when new append or delete occurs', function() {
        let e = ed().append('foobar').append('fizzbuzz').undo().append('hello');
        expect(() => e.redo()).to.throw(RedoError);
        e = ed().append('foobar').append('fizzbuzz').undo().delete(3);
        expect(() => e.redo()).to.throw(RedoError);
    });

    describe('Errors', function() {
        it('should throw when attempting to write an empty string', function() {
            expect(() => ed().append('')).to.throw(EmptyAppendError);
        });
    
        it('should throw when attempting to delete non-positive number of characters', function() {
            const e = new Editor();
            expect(() => ed().delete(-3)).to.throw(NonPositiveDeleteError);
            expect(() => ed().delete(0)).to.throw(NonPositiveDeleteError);
        });
    
        it('should throw when attempting to delete too far', function() {
            expect(() => ed().delete(1)).to.throw(DeleteTooFarError);
            expect(() => ed().append('hello').delete(6)).to.throw(DeleteTooFarError);
            expect(() => ed().append('hello').append(' world').delete(12)).to.throw(DeleteTooFarError);
        });

        it('should throw if you attempt to undo without any operations saved', function() {
            expect(() => ed().undo()).to.throw(UndoError);
            expect(() => ed().append('12').undo()).to.not.throw();
            expect(() => ed().append('12').undo().undo()).to.throw(UndoError);
        });

        it('should throw when you attempt to redo without any operations saved', function() {
            expect(() => ed().redo()).to.throw(RedoError);
            expect(() => ed().append('12').undo().redo()).to.not.throw();
            expect(() => ed().append('12').undo().redo().redo()).to.throw(RedoError);
        });
    });
});
