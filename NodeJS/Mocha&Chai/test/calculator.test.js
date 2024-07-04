// test/calculator.test.js
const { expect } = require('chai');
const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator', () => {
    describe('add', () => {
        it('should add two numbers correctly', () => {
            expect(add(2, 3)).to.equal(5);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers correctly', () => {
            expect(subtract(5, 3)).to.equal(2);
        });
    });

    describe('multiply', () => {
        it('should multiply two numbers correctly', () => {
            expect(multiply(2, 3)).to.equal(6);
        });
    });

    describe('divide', () => {
        it('should divide two numbers correctly', () => {
            expect(divide(6, 3)).to.equal(2);
        });

        it('should throw an error when division by zero', () => {
            expect(() => divide(6, 0)).to.throw('Division by zero');
        });
    });
});
