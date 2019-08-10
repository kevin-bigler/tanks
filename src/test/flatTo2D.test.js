import flatTo2d from '../main/snyder-square/flatTo2d';

describe('flatTo2d', () => {
    it('happy path', () => {
        expect(flatTo2d(3, 1)).toEqual({x: 1, y: 0});
        expect(flatTo2d(3, 5)).toEqual({x: 2, y: 1});
        expect(flatTo2d(3, 8)).toEqual({x: 2, y: 2});
        expect(flatTo2d(3, 9)).toEqual({x: 0, y: 3});
    });
});