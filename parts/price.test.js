const { calculateNumberOfPalletes } = require('./price');

describe('calculateNumberOfPalletes', () => {
    it('should put item vertical', () => {
        expect(calculateNumberOfPalletes([[1400, 450]])).toBe(1);
    });
})
