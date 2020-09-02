import {expect} from 'chai';
import {CircularQueue} from './index';

describe('CircularQueue', function() {
    it('should yield elements in order', function() {
        const queue = new CircularQueue(4);
    });

    it('should throw on full enqueue', function() {
        const queue = new CircularQueue(2);
        expect(() => queue.enqueue(1)).to.not.throw()
        expect(() => queue.enqueue(2)).to.not.throw()
        expect(() => queue.enqueue(3)).to.throw(Error)
    });

    it('should throw on empty dequeue', function() {
        const queue = new CircularQueue(2);
        expect(() => queue.enqueue(1)).to.not.throw()
        expect(() => queue.dequeue()).to.not.throw()
        expect(() => queue.dequeue()).to.throw(Error)
    });

    it('should maintain proper size', function() {
        const queue = new CircularQueue(5);
        expect(queue.size).to.equal(0);
        queue.enqueue(1);
        expect(queue.size).to.equal(1);
        queue.enqueue(1);
        expect(queue.size).to.equal(2);
        queue.enqueue(1);
        expect(queue.size).to.equal(3);
        queue.enqueue(1);
        expect(queue.size).to.equal(4);
        queue.enqueue(1);
        expect(queue.size).to.equal(5);

        queue.dequeue();
        expect(queue.size).to.equal(4);
        queue.dequeue();
        expect(queue.size).to.equal(3);

        queue.enqueue(1);
        expect(queue.size).to.equal(4);
        queue.enqueue(1);
        expect(queue.size).to.equal(5);
    });
});
