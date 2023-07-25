const O = (f, n) => {
  const o = [];
  for (const e in f)
    if (n.hasOwnProperty(e)) {
      if (typeof f[e] == "object" && typeof n[e] == "object" && JSON.stringify(f[e]) === JSON.stringify(n[e]) || f[e] === n[e])
        continue;
      if (f[e] === "@{}" || f[e] === "@[]") {
        const i = n[e] === "@{}" ? {} : n[e] === "@[]" ? [] : n[e];
        f[e] === "@{}" ? JSON.stringify(n[e]) !== "{}" && o.push([e, {}, i]) : JSON.stringify(n[e]) !== "[]" && o.push([e, [], i]);
      } else
        o.push([e, f[e], n[e]]);
    }
  return o;
}, g = (f, n) => {
  const o = [];
  let e = 0;
  for (const i in f)
    if (!(i in n)) {
      const y = f[i] === "@{}" ? {} : f[i] === "@[]" ? [] : f[i];
      o[e] = [i, y], e++;
    }
  return o;
}, p = (f, n, o, e) => {
  const i = e ? f ? "[" : "." : "/", y = e ? f ? "]" : "" : f ? "[]" : "";
  return n !== "" ? `${n}${i}${o}${y}` : `${e && f ? "[" : ""}${o}${y}`;
}, d = (f, n = !1, o, e = "") => {
  o === void 0 && (o = Array.isArray(f) ? { "": "@[]" } : { "": "@{}" });
  for (const i of Object.keys(f)) {
    const y = p(Array.isArray(f), e, i, n);
    typeof f[i] == "object" && f[i] !== null ? (Object.keys(f[i]).length === 0 ? o[y] = f[i] : o[y] = Array.isArray(f[i]) ? "@[]" : "@{}", d(f[i], n, o, y)) : o[y] = f[i];
  }
  return o;
}, $ = {
  isLodashLike: !1
}, b = (f, n, o) => {
  const { isLodashLike: e } = o ?? $, i = {
    added: [],
    removed: [],
    edited: []
  }, y = d(f, e), s = d(n, e);
  return i.removed = g(y, s), i.added = g(s, y), i.edited = O(y, s), i;
};
export {
  b as getDiff,
  O as getEditedPaths,
  g as getPathsDiff,
  d as getStructPaths
};
