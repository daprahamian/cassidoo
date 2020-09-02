
export class EmptyAppendError extends Error {
    constructor() {
        super('Cannot append empty string');
        Error.captureStackTrace(this);
    }
}

export class NonPositiveDeleteError extends Error {
    constructor() {
        super('Cannot delete non-positive number of characters');
        Error.captureStackTrace(this);
    }
}

export class DeleteTooFarError extends Error {
    constructor(attempt: number, available: number) {
        super(`Cannot delete ${attempt} characters when only ${available} characters available`);
        Error.captureStackTrace(this);
    }
}

export class UndoError extends Error {
    constructor() {
        super('No actions saved that can be undone');
    }
}

export class RedoError extends Error {
    constructor() {
        super('No actions saved that can be redone');
        Error.captureStackTrace(this);
    }
}