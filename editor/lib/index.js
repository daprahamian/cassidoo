"use strict";
// Build a very simple text editor. Your editor should contain an empty string
// S at first, and have the functions append(t) (add t to the end of S), delete(n)
// (delete the last n characters of S), undo() (revert S to the state it was before
// an append or delete), as well as any other functions you might want to include.
function throwExhaustive(x) {
    throw new Error();
}
class Editor {
    constructor() {
        this.#content = [];
        this.#undo = [];
        this.#redo = [];
    }
    #content;
    #undo;
    #redo;
    toString() {
        return this.#content.join('');
    }
    print() {
        console.log(this.toString());
    }
    append(t) {
        if (!t.length) {
            throw new Error('Cannot append empty string');
        }
        this.#redo.length = 0;
        const history = this.runOp({ type: 'append', payload: Array.from(t) });
        this.#undo.push(history);
    }
    delete(n) {
        if (n < 0) {
            throw new Error('Cannot delete negative number of characters');
        }
        this.#redo.length = 0;
        const history = this.runOp({ type: 'delete', payload: n });
        this.#undo.push(history);
    }
    undo() {
        const op = this.#undo.pop();
        if (!op) {
            throw new Error('No actions saved that can be undone');
        }
        const history = this.runOp(op);
        this.#redo.push(history);
    }
    redo() {
        const op = this.#redo.pop();
        if (!op) {
            throw new Error('No actions saved that can be redone');
        }
        const history = this.runOp(op);
        this.#undo.push(history);
    }
    runOp(op) {
        switch (op.type) {
            case 'append': {
                this.#content.push(...op.payload);
                return { type: 'delete', payload: op.payload.length };
            }
            case 'delete': {
                const remaining = this.#content.splice(this.#content.length - op.payload);
                return { type: 'append', payload: remaining };
            }
            default:
                throwExhaustive(op);
        }
    }
}
