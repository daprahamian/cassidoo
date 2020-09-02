export class CircularQueue<T=unknown> {
    #queue: (T|undefined)[];
    #front = 0;
    #back = 0;
    constructor(capacity: number = 10) {
        this.#queue = Array.from({length: capacity + 1});
    }

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

    enqueue(item: T): void {
        if (this.isFull) {
            throw new Error('Queue is full');
        }
        this.#queue[this.#back] = item;
        this.#back = (this.#back + 1) % this.#queue.length; 
    }

    dequeue(): T {
        if (this.isEmpty) {
            throw new Error('Queue is empty');
        }
        const item = this.#queue[this.#front] as T;
        this.#queue[this.#front] = undefined;
        this.#front = (this.#front + 1) % this.#queue.length;
        return item;
    }
}
