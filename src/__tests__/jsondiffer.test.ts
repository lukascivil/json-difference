import { JsonDiffer } from '../jsondiffer';

test('Comparing Structs', () => {
  const jsondifference = new JsonDiffer();
  const struct1 = { 1: { 2: 7, 3: { 4: 6 } } }
  const struct2 = { 1: { 3: { 4: 5 } } }
  const result_expected = { "edited": [{ "1/3/4": { "newvalue": 6, "oldvalue": 5 } }], "new": {}, "removed": { "1/2": 7 } };
  const result = jsondifference.getDiff(struct1, struct2);
  expect(result).toEqual(result_expected);
});