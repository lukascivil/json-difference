const t = (f, n) => {
  const i = [];
  let e = {};
  for (const o in f)
    if (n.hasOwnProperty(o)) {
      if (typeof f[o] == "object" && typeof n[o] == "object" && JSON.stringify(n[o]) === JSON.stringify(n[o]))
        continue;
      f[o] !== n[o] && (e = {
        [o]: {
          oldValue: f[o],
          newValue: n[o]
        }
      }, i.push(e));
    }
  return i;
}, d = (f, n) => {
  const i = {};
  for (const e in f)
    e in n || (i[e] = f[e]);
  return i;
}, y = (f, n = {}, i = "") => {
  for (const e of Object.keys(f)) {
    const o = i !== "" ? `${i}/${e}` : e;
    typeof f[e] == "object" ? (Object.keys(f[e]).length === 0 && (n[o] = f[e]), y(f[e], n, o)) : n[o] = f[e];
  }
  return n;
}, s = (f, n) => {
  const i = {
    new: {},
    removed: {},
    edited: []
  }, e = y(f), o = y(n);
  return i.removed = d(e, o), i.new = d(o, e), i.edited = t(e, o), i;
};
export {
  s as getDiff,
  t as getEditedPaths,
  d as getPathsDiff,
  y as getStructPaths
};
