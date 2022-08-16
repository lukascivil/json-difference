import { getEditedPaths } from '.';

describe('GetEditedPaths function', () => {
  test('Should return empty when there is no edited value', () => {
    const oldStruct = { a: 1, b: 'a/a/a/a/a/a/a', c: '0/0/0/0', d: '0/1/2/3/4/5/6/7/8/9' };
    const newStruct = { a: 1, b: 'a/a/a/a/a/a/a', d: '0/1/2/3/4/5/6/7/8/9', e: 4 };
    const expectedResult = [] as any;

    const result = getEditedPaths(oldStruct, newStruct);

    expect(result).toEqual(expectedResult);
  });

  test('Should compute the difference between structures with different value', () => {
    const oldStruct = { a: 1, b: 'a/a/a/a/a/a/a', c: '0/0/0/0', d: '0/1/2/3/4/5/6/7/8/9' };
    const newStruct = { a: 1, b: 'b/b/b/b/b/b/b', c: '1/1/1/1', d: '9/8/7/6/5/4/3/2/1/0', e: '4' };
    const expectedResult = [
      { b: { newValue: 'b/b/b/b/b/b/b', oldValue: 'a/a/a/a/a/a/a' } },
      { c: { newValue: '1/1/1/1', oldValue: '0/0/0/0' } },
      { d: { newValue: '9/8/7/6/5/4/3/2/1/0', oldValue: '0/1/2/3/4/5/6/7/8/9' } }
    ];

    const result = getEditedPaths(oldStruct, newStruct);

    expect(result).toEqual(expectedResult);
  });
});
