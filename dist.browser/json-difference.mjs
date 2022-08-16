const t = (o, n) => {
  const i = [];
  let e = {};
  for (const f in o)
    if (n.hasOwnProperty(f)) {
      if (typeof o[f] == "object" && typeof n[f] == "object" && JSON.stringify(o[f]) === JSON.stringify(n[f]))
        continue;
      o[f] !== n[f] && (e = {
        [f]: {
          oldValue: o[f],
          newValue: n[f]
        }
      }, i.push(e));
    }
  return i;
}, y = (o, n) => {
  const i = {};
  for (const e in o)
    e in n || (i[e] = o[e]);
  return i;
}, d = (o, n = {}, i = "") => {
  for (const e of Object.keys(o)) {
    const f = i !== "" ? `${i}/${e}` : e;
    typeof o[e] == "object" ? (Object.keys(o[e]).length === 0 && (n[f] = o[e]), d(o[e], n, f)) : n[f] = o[e];
  }
  return n;
}, s = (o, n) => {
  const i = {
    added: {},
    removed: {},
    edited: []
  }, e = d(o), f = d(n);
  return i.removed = y(e, f), i.added = y(f, e), i.edited = t(e, f), i;
};
export {
  s as getDiff,
  t as getEditedPaths,
  y as getPathsDiff,
  d as getStructPaths
};
