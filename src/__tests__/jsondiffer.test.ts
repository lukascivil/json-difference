import { JsonDiffer } from '../jsondiffer';

test('Comparing Structs', () => {
  const jsonDiffer = new JsonDiffer();
  const struct1 = { 1: { 2: 7, 3: { 4: 6 } } };
  const struct2 = { 1: { 3: { 4: 5 } } };
  const expectedResult = { edited: [{ '1/3/4': { newValue: 5, oldValue: 6 } }], new: {}, removed: { '1/2': 7 } };
  const result = jsonDiffer.getDiff(struct1, struct2);

  expect(result).toEqual(expectedResult);
});

test('Comparing Structs Containing Array Property', () => {
  const jsonDiffer = new JsonDiffer();
  const struct1 = { a: 1, b: [{ c1: 1 }, { c2: 2 }] };
  const struct2 = { a: 11, b: [{ c1: 1 }, { c2: 22 }] };
  const expectedResult = {
    edited: [{ a: { newValue: 11, oldValue: 1 } }, { 'b/1/c2': { newValue: 22, oldValue: 2 } }],
    new: {},
    removed: {}
  };
  const result = jsonDiffer.getDiff(struct1, struct2);

  expect(result).toEqual(expectedResult);
});

test('Comparing Structs Containing deep nodes', () => {
  const jsonDiffer = new JsonDiffer();
  const struct1 = { a: 1, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 3 }] } }, { c4: 6 }] }, { c2: 2 }] };
  const struct2 = { a: 11, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 4 }] } }, { c4: 6 }] }, { c2: 2 }] };
  const expectedResult = {
    edited: [{ a: { newValue: 11, oldValue: 1 } }, { 'b/0/c1/0/c3/c5/2/c6': { newValue: 4, oldValue: 3 } }],
    new: {},
    removed: {}
  };
  const result = jsonDiffer.getDiff(struct1, struct2);

  expect(result).toEqual(expectedResult);
});

test('Comparing Structs Containing different types', () => {
  const jsonDiffer = new JsonDiffer();
  const struct1 = { a: 1, b: { c1: 2 }, c: 3 };
  const struct2 = { a: '1', b: 2, c: true };
  const expectedResult = {
    edited: [{ a: { newValue: '1', oldValue: 1 } }, { c: { newValue: true, oldValue: 3 } }],
    new: { b: 2 },
    removed: { 'b/c1': 2 }
  };
  const result = jsonDiffer.getDiff(struct1, struct2);

  expect(result).toEqual(expectedResult);
});
