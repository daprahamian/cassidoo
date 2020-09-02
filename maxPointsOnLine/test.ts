import * as assert from 'assert';
import {Point, maxPointsOnLine} from './index';

function assertValid(points: Point[], expected: number) {
    const actual = maxPointsOnLine(points);
    assert.equal(actual, expected);
}

function testLinear(num: number) {
    const points = [] as Point[];
    for (let i = 1; i <= num; i += 1) {
        points.push([i, i]);
    }

    assertValid(points, num);
}

assertValid([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]], 4);

for (let i = 1; i < 20; i += 1) {
    testLinear(i);
}

assertValid([[1, 1]], 1);
