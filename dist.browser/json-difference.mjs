const y = (f, i) => {
  const n = [];
  for (const e in f)
    if (i.hasOwnProperty(e)) {
      if (typeof f[e] == "object" && typeof i[e] == "object" && JSON.stringify(f[e]) === JSON.stringify(i[e]))
        continue;
      f[e] !== i[e] && n.push([e, f[e], i[e]]);
    }
  return n;
}, d = (f, i) => {
  const n = [];
  let e = 0;
  for (const o in f)
    o in i || (n[e] = [o, f[o]], e++);
  return n;
}, g = (f, i, n, e) => {
  const o = e ? f ? "[" : "." : "/", t = e ? f ? "]" : "" : f ? "[]" : "";
  return i !== "" ? `${i}${o}${n}${t}` : `${e && f ? "[" : ""}${n}${t}`;
}, c = (f, i = !1, n = {}, e = "") => {
  for (const o of Object.keys(f)) {
    const t = g(Array.isArray(f), e, o, i);
    typeof f[o] == "object" ? (Object.keys(f[o]).length === 0 && (n[t] = f[o]), c(f[o], i, n, t)) : n[t] = f[o];
  }
  return n;
}, s = (f, i, n = !1) => {
  const e = {
    added: [],
    removed: [],
    edited: []
  }, o = c(f, n), t = c(i, n);
  return e.removed = d(o, t), e.added = d(t, o), e.edited = y(o, t), e;
};
export {
  s as getDiff,
  y as getEditedPaths,
  d as getPathsDiff,
  c as getStructPaths
};
