function * backspaceIterator(input: string) {
    let backspaces = 0;
    for (let i = input.length - 1; i >=0; i--) {
        const char = input[i];
        if (char === '#') {
            backspaces += 1;
        } else if (backspaces > 0) {
            backspaces -= 1;
        } else {
            yield char;
        }
    }
}

function compareIterables<T>(iterable1: Iterable<T>, iterable2: Iterable<T>): boolean {
    const otherIter = iterable2[Symbol.iterator]();
    for (const item1 of iterable1) {
        const { value: item2, done } = otherIter.next();
        if (done || item1 !== item2) {
            return false;
        }
    }
    return !!otherIter.next().done;
}

export function compareWithBackspace(str1: string, str2: string): boolean {
    const iter1 = backspaceIterator(str1);
    const iter2 = backspaceIterator(str2);
    return compareIterables(iter1, iter2);
}
