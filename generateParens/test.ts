import {equal} from 'assert';
import {generateParens} from './index';

function validateString(str: string) {
    let stack = 0;
    for (const c of str) {
        switch (c) {
            case '(': stack += 1; break;
            case ')': stack -= 1; break;
            default: throw new Error(`String "${str}" contains invalid character "${c}"`);
        }
        if (stack < 0) {
            throw new Error(`String "${str}" is malformed`);
        }
    }
    if (stack !== 0 ){
        throw new Error(`String "${str}" is malformed`);
    }
}

function validateResults(input: number, expected: number) {
    const output = generateParens(input);
    equal(expected, output.length);
    output.forEach(validateString);
}

validateResults(0, 0);
validateResults(1, 1);
validateResults(2, 2);
validateResults(3, 5);
validateResults(4, 14);
validateResults(5, 42);