"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CircularQueue {
    constructor(capacity = 10) {
        this.#front = 0;
        this.#back = 0;
        this.#queue = Array.from({ length: capacity + 1 });
    }
    #queue;
    #front;
    #back;
    get capacity() {
        return this.#queue.length - 1;
    }
    get size() {
        const diff = this.#back - this.#front;
        return diff < 0 ? this.#queue.length + diff : diff;
    }
    get isFull() {
        return this.size === this.capacity;
    }
    get isEmpty() {
        return this.size === 0;
    }
    enqueue(item) {
        if (this.isFull) {
            throw new Error('Queue is full');
        }
        this.#queue[this.#back] = item;
        this.#back = (this.#back + 1) % this.#queue.length;
    }
    dequeue() {
        if (this.isEmpty) {
            throw new Error('Queue is empty');
        }
        const item = this.#queue[this.#front];
        this.#queue[this.#front] = undefined;
        this.#front = (this.#front + 1) % this.#queue.length;
        return item;
    }
    next() {
        const done = this.isEmpty;
        if (done) {
            return { value: undefined, done };
        }
        else {
            return { value: this.dequeue(), done };
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
exports.CircularQueue = CircularQueue;
