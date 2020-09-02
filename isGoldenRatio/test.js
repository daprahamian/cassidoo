"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("./index");
describe('isGoldenRatio', function () {
    var PHI = (1 + Math.sqrt(5)) / 2;
    Array.from({ length: 100000 }).forEach(function (_, i) {
        var n = i + 1;
        var m = n * PHI;
        it("should pass for " + n + " and " + m, function () {
            chai_1.expect(index_1.isGoldenRatio(n, m)).to.equal(true);
        });
    });
});
