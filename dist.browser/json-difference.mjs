const t = (n, o) => {
  const f = [];
  for (const e in n)
    if (o.hasOwnProperty(e)) {
      if (typeof n[e] == "object" && typeof o[e] == "object" && JSON.stringify(n[e]) === JSON.stringify(o[e]))
        continue;
      n[e] !== o[e] && f.push([e, n[e], o[e]]);
    }
  return f;
}, s = (n, o) => {
  const f = [];
  let e = 0;
  for (const i in n)
    i in o || (f[e] = [i, n[i]], e++);
  return f;
}, d = (n, o = {}, f = "") => {
  for (const e of Object.keys(n)) {
    const i = f !== "" ? `${f}/${e}` : e, y = Array.isArray(n) ? `${i}[]` : i;
    typeof n[e] == "object" ? (Object.keys(n[e]).length === 0 && (o[i] = n[e]), d(n[e], o, y)) : o[y] = n[e];
  }
  return o;
}, r = (n, o) => {
  const f = {
    added: [],
    removed: [],
    edited: []
  }, e = d(n), i = d(o);
  return f.removed = s(e, i), f.added = s(i, e), f.edited = t(e, i), f;
};
export {
  r as getDiff,
  t as getEditedPaths,
  s as getPathsDiff,
  d as getStructPaths
};
