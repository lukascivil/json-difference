const c = (e, i) => {
  const o = [];
  for (const n in e)
    if (i.hasOwnProperty(n)) {
      if (typeof e[n] == "object" && typeof i[n] == "object" && JSON.stringify(e[n]) === JSON.stringify(i[n]))
        continue;
      e[n] !== i[n] && o.push([n, e[n], i[n]]);
    }
  return o;
}, y = (e, i) => {
  const o = [];
  let n = 0;
  for (const f in e)
    f in i || (o[n] = [f, e[f]], n++);
  return o;
}, g = (e, i, o, n) => {
  const f = n ? e ? "[" : "." : "/", t = n ? e ? "]" : "" : e ? "[]" : "";
  return i !== "" ? `${i}${f}${o}${t}` : `${n && e ? "[" : ""}${o}${t}`;
}, d = (e, i = !1, o = {}, n = "") => {
  for (const f of Object.keys(e)) {
    const t = g(Array.isArray(e), n, f, i);
    typeof e[f] == "object" && e[f] !== null ? (Object.keys(e[f]).length === 0 && (o[t] = e[f]), d(e[f], i, o, t)) : o[t] = e[f];
  }
  return o;
}, $ = (e, i, o = !1) => {
  const n = {
    added: [],
    removed: [],
    edited: []
  }, f = d(e, o), t = d(i, o);
  return n.removed = y(f, t), n.added = y(t, f), n.edited = c(f, t), n;
};
export {
  $ as getDiff,
  c as getEditedPaths,
  y as getPathsDiff,
  d as getStructPaths
};
