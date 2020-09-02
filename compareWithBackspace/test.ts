import {compareWithBackspace} from './compareWithBackspace';
import {equal as assertEqual} from 'assert';

function assertTrue(str1: string, str2: string) {
    assertEqual(compareWithBackspace(str1, str2), true);
}

function assertFalse(str1: string, str2: string) {
    assertEqual(compareWithBackspace(str1, str2), false);
}

assertTrue('hello', 'hello');
assertFalse('hello', 'world');
assertTrue('hello', 'helloworld#####');
assertFalse('hello', 'helloworld####');
assertTrue('abc#def#ghi#', 'abdegh');
assertTrue('abc###', 'defg####');
