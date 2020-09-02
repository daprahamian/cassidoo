import {Tweet} from './interfaces';

class FeedWrapper<T> {
    #feed: Iterator<T>;
    #result : IteratorResult<T>;
    constructor(feed: Iterator<T>) {
        this.#feed = feed;
        this.#result = feed.next();
    }

    get done() {
        return this.#result.done;
    }

    peek(): T {
        if (this.done) {
            throw new Error('');
        }
        return this.#result.value;
    }

    pop(): T {
        if (this.done) {
            throw new Error('');
        }
        const value = this.#result.value;
        this.#result = this.#feed.next();
        return value;
    }
}

export function * feedCondenser(feeds: Iterator<Tweet>[], limit: number = 10): IterableIterator<Tweet> {
    const wrappers = new Set(feeds.map(feed => new FeedWrapper<Tweet>(feed)));

    for (let i = 0; i < limit; i+= 1) {
        let chosenWrapper: FeedWrapper<Tweet> | undefined;
        // This could be done better with a heap.
        for (const wrapper of wrappers) {
            if (wrapper.done) {
                wrappers.delete(wrapper);
                continue;
            }

            if (!chosenWrapper || chosenWrapper.peek().date < wrapper.peek().date) {
                chosenWrapper = wrapper;
            }
        }
        if (!chosenWrapper) {
            return;
        }
        yield chosenWrapper.pop();
    }
}
