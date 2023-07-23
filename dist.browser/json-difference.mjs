const p = (f, i) => {
  const o = [];
  for (const e in f)
    if (i.hasOwnProperty(e)) {
      if (typeof f[e] == "object" && typeof i[e] == "object" && JSON.stringify(f[e]) === JSON.stringify(i[e]) || f[e] === i[e])
        continue;
      if (f[e] === "@{}" || f[e] === "@[]") {
        const n = i[e] === "@{}" ? {} : i[e] === "@[]" ? [] : i[e];
        f[e] === "@{}" ? JSON.stringify(i[e]) !== "{}" && o.push([e, {}, n]) : JSON.stringify(i[e]) !== "[]" && o.push([e, [], n]);
      } else
        o.push([e, f[e], i[e]]);
    }
  return o;
}, d = (f, i) => {
  const o = [];
  let e = 0;
  for (const n in f)
    if (!(n in i)) {
      const y = f[n] === "@{}" ? {} : f[n] === "@[]" ? [] : f[n];
      o[e] = [n, y], e++;
    }
  return o;
}, O = (f, i, o, e) => {
  const n = e ? f ? "[" : "." : "/", y = e ? f ? "]" : "" : f ? "[]" : "";
  return i !== "" ? `${i}${n}${o}${y}` : `${e && f ? "[" : ""}${o}${y}`;
}, g = (f, i = !1, o = {}, e = "") => {
  for (const n of Object.keys(f)) {
    const y = O(Array.isArray(f), e, n, i);
    typeof f[n] == "object" && f[n] !== null ? (Object.keys(f[n]).length === 0 ? o[y] = f[n] : o[y] = Array.isArray(f[n]) ? "@[]" : "@{}", g(f[n], i, o, y)) : o[y] = f[n];
  }
  return o;
}, $ = {
  isLodashLike: !1
}, b = (f, i, o) => {
  const { isLodashLike: e } = o ?? $, n = {
    added: [],
    removed: [],
    edited: []
  }, y = g(f, e), s = g(i, e);
  return n.removed = d(y, s), n.added = d(s, y), n.edited = p(y, s), n;
};
export {
  b as getDiff,
  p as getEditedPaths,
  d as getPathsDiff,
  g as getStructPaths
};
