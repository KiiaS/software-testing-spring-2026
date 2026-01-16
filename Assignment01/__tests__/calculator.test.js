import { divide } from "../src/calculator.js";

describe('divide', () => {
    //Onnistunut positiivinen testi
    it('divides two positive numbers', () => {
        expect(divide(4, 2)).toBe(2)
    })
    //Jako nollalla
    it('throws when divide with zero', () => {
        expect(() => divide(4,0)).toThrow(RangeError)
        expect(() => divide(4,0)).toThrow('Division by zero is not allowed')
    })

    //NaN
    it('expects two numbers', () => {
        expect(() => divide(4, NaN)).toThrow(TypeError)
        expect(() => divide(4, NaN)).toThrow('Arguments cannot be NaN')
    })
    it('expects two numbers', () => {
        expect(() => divide(4, NaN)).toThrow(TypeError)
        expect(() => divide(NaN, 4)).toThrow('Arguments cannot be NaN')
    })

    //String
    it('expects two numbers', () => {
        expect(() => divide(4, '2')).toThrow('Both arguments must be numbers')
    })
    it('expects two numbers', () => {
        expect(() => divide('2', 4)).toThrow('Both arguments must be numbers')
    })
})