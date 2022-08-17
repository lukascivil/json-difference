const y = (f, i) => {
  const n = [];
  let o = {};
  for (const e in f)
    if (i.hasOwnProperty(e)) {
      if (typeof f[e] == "object" && typeof i[e] == "object" && JSON.stringify(f[e]) === JSON.stringify(i[e]))
        continue;
      f[e] !== i[e] && (o = {
        [e]: [f[e], i[e]]
      }, n.push(o));
    }
  return n;
}, t = (f, i) => {
  const n = [];
  let o = 0;
  for (const e in f)
    e in i || (n[o] = [e, f[e]], o++);
  return n;
}, d = (f, i = {}, n = "") => {
  for (const o of Object.keys(f)) {
    const e = n !== "" ? `${n}/${o}` : o;
    typeof f[o] == "object" ? (Object.keys(f[o]).length === 0 && (i[e] = f[o]), d(f[o], i, e)) : i[e] = f[o];
  }
  return i;
}, s = (f, i) => {
  const n = {
    added: [],
    removed: [],
    edited: []
  }, o = d(f), e = d(i);
  return n.removed = t(o, e), n.added = t(e, o), n.edited = y(o, e), n;
};
export {
  s as getDiff,
  y as getEditedPaths,
  t as getPathsDiff,
  d as getStructPaths
};
