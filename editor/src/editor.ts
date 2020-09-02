// Build a very simple text editor. Your editor should contain an empty string
// S at first, and have the functions append(t) (add t to the end of S), delete(n)
// (delete the last n characters of S), undo() (revert S to the state it was before
// an append or delete), as well as any other functions you might want to include.

interface OpAppend {
    type: 'append';
    payload: string[];
}

interface OpDelete {
    type: 'delete';
    payload: number;
}
type Op = OpDelete | OpAppend;

import {EmptyAppendError, NonPositiveDeleteError, DeleteTooFarError, UndoError, RedoError} from './errors';

export class Editor {
    readonly #content: string[] = [];
    readonly #undo: Op[] = [];
    readonly #redo: Op[] = [];

    toString(): string {
        return this.#content.join('');
    }

    print() {
        console.log(this.toString());
    }

    append(t: string): this {
        if (!t.length) {
            throw new EmptyAppendError();
        }
        this.#redo.length = 0;
        const history = this.runOp({ type: 'append', payload: Array.from(t) });
        this.#undo.push(history);

        return this;
    }

    delete(n: number): this {
        if (n <= 0) {
            throw new NonPositiveDeleteError();
        }
        if (n > this.#content.length) {
            throw new DeleteTooFarError(n, this.#content.length);
        }
        this.#redo.length = 0;
        const history = this.runOp({ type: 'delete', payload: n });
        this.#undo.push(history);

        return this;
    }

    undo(): this {
        const op = this.#undo.pop();
        if (!op) {
            throw new UndoError();
        }
        const history = this.runOp(op);
        this.#redo.push(history);

        return this;
    }

    redo() : this {
        const op = this.#redo.pop();
        if (!op) {
            throw new RedoError();
        }
        const history = this.runOp(op);
        this.#undo.push(history);

        return this;
    }

    private runOp(op: Op): Op {
        switch (op.type) {
            case 'append':{
                this.#content.push(...op.payload);
                return { type: 'delete', payload: op.payload.length }
            }
            case 'delete': {
                const remaining = this.#content.splice(this.#content.length - op.payload);
                return { type: 'append', payload: remaining };
            }
            default:
                throwOnInvalidInternalOperation(op);
        }
    }
}

// Used to enforce exhaustive switch statement
function throwOnInvalidInternalOperation({type}: never): never {
    throw new Error(`Invalid operation type ${type}`);
}