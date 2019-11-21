import { JsonDiffer } from '../jsondiffer';

test('Comparing Structs', () => {
  const jsondifference = new JsonDiffer();
  const struct1 = { 1: { 2: 7, 3: { 4: 6 } } };
  const struct2 = { 1: { 3: { 4: 5 } } };
  const result_expected = { edited: [{ '1/3/4': { newvalue: 5, oldvalue: 6 } }], new: {}, removed: { '1/2': 7 } };
  const result = jsondifference.getDiff(struct1, struct2);

  expect(result).toEqual(result_expected);
});

test('Comparing Structs Containing Array Property', () => {
  const jsondifference = new JsonDiffer();
  const struct1 = { a: 1, b: [{ c1: 1 }, { c2: 2 }] };
  const struct2 = { a: 11, b: [{ c1: 1 }, { c2: 22 }] };
  const result_expected = {
    edited: [{ a: { newvalue: 11, oldvalue: 1 } }, { 'b/1/c2': { newvalue: 22, oldvalue: 2 } }],
    new: {},
    removed: {}
  };
  const result = jsondifference.getDiff(struct1, struct2);

  expect(result).toEqual(result_expected);
});
