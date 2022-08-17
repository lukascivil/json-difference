const t = (o, f) => {
  const n = [];
  for (const e in o)
    if (f.hasOwnProperty(e)) {
      if (typeof o[e] == "object" && typeof f[e] == "object" && JSON.stringify(o[e]) === JSON.stringify(f[e]))
        continue;
      o[e] !== f[e] && n.push([e, o[e], f[e]]);
    }
  return n;
}, y = (o, f) => {
  const n = [];
  let e = 0;
  for (const i in o)
    i in f || (n[e] = [i, o[i]], e++);
  return n;
}, d = (o, f = {}, n = "") => {
  for (const e of Object.keys(o)) {
    const i = n !== "" ? `${n}/${e}` : e;
    typeof o[e] == "object" ? (Object.keys(o[e]).length === 0 && (f[i] = o[e]), d(o[e], f, i)) : f[i] = o[e];
  }
  return f;
}, s = (o, f) => {
  const n = {
    added: [],
    removed: [],
    edited: []
  }, e = d(o), i = d(f);
  return n.removed = y(e, i), n.added = y(i, e), n.edited = t(e, i), n;
};
export {
  s as getDiff,
  t as getEditedPaths,
  y as getPathsDiff,
  d as getStructPaths
};
