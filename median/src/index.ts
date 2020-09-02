// Given an unsorted array arr of integers and an index n,
// return a list of medians of the subarrays in arr 
// (where the first subarray is from index 0 to index 1,
// the next from 0 to index 2… index 0 to index n).
// Try to do it in better than O(n^2) time!
// $ findMedians([2, 1, 3, 10, 5], 3)
// $ [2, 1.5, 2]

class Node {
    valueIndex!: number;
    next?: Node;
    prev?: Node;
    constructor(public readonly value: number) {}

    appendValue(other: Node) {
        this.next = other;
        other.prev = this;
    }

    remove(): void {
        const {prev, next} = this;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
    }
}

interface Median {
    value: number;
    isEmpty: boolean;
    adjust(removed: Node): Median;
}

class OddMedian implements Median {
    constructor(private node: Node) {}
    get value() {
        return this.node.value;
    }
    get isEmpty() {
        return false;
    }

    adjust(removed: Node) {
        const low = (this.node.valueIndex > removed.valueIndex ? this.node : this.node.prev) as Node;
        const high = (this.node.valueIndex < removed.valueIndex ? this.node : this.node.next) as Node;
        return new EvenMedian(low, high);
    }
}

class EvenMedian implements Median {
    constructor(private low: Node, private high: Node) {
    }
    get value() {
        return (this.low.value + this.high.value) / 2;
    }
    get isEmpty() { 
        return false;
    }

    adjust(removed: Node) {
        const center = this.high.valueIndex <= removed.valueIndex ? this.low : this.high;
        return new OddMedian(center);
    }
}

function makeMedian(collection: Node[]) : Median {
    const midpoint = (collection.length - 1) / 2;
    const low = collection[Math.floor(midpoint)];
    const high = collection[Math.ceil(midpoint)];

    return low === high ? new OddMedian(low) : new EvenMedian(low, high);
}

export function findMedians(collection: number[], count: number) {
    if (count < 0) {
        throw new Error(`Cannot request negative count ${count}`);
    }
    if (collection.length < count) {
        throw new Error(`Cannot request count ${count} greater than collection.length ${collection.length}`);
    }

    const nodesByIndex: Node[] = [];
    for (let i = 0; i < count; i += 1) {
        nodesByIndex.push(new Node(collection[i]));
    }
    const nodesByValue = nodesByIndex.concat([]).sort((a, b) => a.value - b.value);
    nodesByValue[0].valueIndex = 0;
    for (let i = 1; i < nodesByValue.length; i += 1) {
        nodesByValue[i].valueIndex = i;
        nodesByValue[i - 1].appendValue(nodesByValue[i]);
    }

    console.log(nodesByIndex);
    console.log(nodesByValue);

    let median = makeMedian(nodesByValue);

    const results: number[] = [];

    while(nodesByIndex.length) {
        results.unshift(median.value);
        const node = nodesByIndex.pop() as Node;
        node.remove();
        median = median.adjust(node);
    }
    
    return results;
}
