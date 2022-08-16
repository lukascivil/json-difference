import { getStructPaths } from '.';

describe('GetStructPaths function', () => {
  test('Should return all paths from a basic structure', () => {
    const oldStruct = { 1: { 2: 7, 3: { 4: 6 } } };
    const expectedResult = { '1/2': 7, '1/3/4': 6 };

    const result = getStructPaths(oldStruct);

    expect(result).toEqual(expectedResult);
  });

  test('Should return all paths from a basic containing Array property', () => {
    const oldStruct = { a: 1, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 3 }] } }, { c4: 6 }] }, { c2: 2 }] };
    const expectedResult = { a: 1, 'b/0/c1/0/c3/c5/0': 1, 'b/0/c1/0/c3/c5/1': 2, 'b/0/c1/0/c3/c5/2/c6': 3, 'b/0/c1/1/c4': 6, 'b/1/c2': 2 };

    const result = getStructPaths(oldStruct);

    expect(result).toEqual(expectedResult);
  });
});
