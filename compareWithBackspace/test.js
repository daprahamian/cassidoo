"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compareWithBackspace_1 = require("./compareWithBackspace");
const assert_1 = require("assert");
function assertTrue(str1, str2) {
    assert_1.equal(compareWithBackspace_1.compareWithBackspace(str1, str2), true);
}
function assertFalse(str1, str2) {
    assert_1.equal(compareWithBackspace_1.compareWithBackspace(str1, str2), false);
}
assertTrue('hello', 'hello');
assertTrue('hello', 'helloworld#####');
assertTrue('abc#def#ghi#', 'abdegh');
assertFalse('abc###', 'defg####');
