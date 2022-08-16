import { getPathsDiff } from '.';

describe('GetPathDiff function', () => {
  test('Should return empty when there is no key difference', () => {
    const oldStruct = { a: 1, b: 'a/a/a/a/a/a/a', c: '0/0/0/0', d: '0/1/2/3/4/5/6/7/8/9' };
    const newStruct = { a: 1, b: 'b/b/b/b/b/b/b', c: '1/1/1/1', d: '9/8/7/6/5/4/3/2/1/0' };
    const expectedResult = {};

    const result = getPathsDiff(oldStruct, newStruct);

    expect(result).toEqual(expectedResult);
  });

  test('Should return paths when the structs are different', () => {
    const oldStruct = { a: 1, 'b/b/b/b/b/b/b': '1', c: '0/0/2/0', '0/1/2/3/4/5/6/7/8/9': 3 };
    const newStruct = { a: 1, 'b/b/b/b/1/b/b': '1', c: '0/0/0/0', '9/8/7/6/5/4/3/2/1/0': 4 };
    const expectedResult = { 'b/b/b/b/b/b/b': '1', '0/1/2/3/4/5/6/7/8/9': 3 };

    const result = getPathsDiff(oldStruct, newStruct);

    expect(result).toEqual(expectedResult);
  });
});
