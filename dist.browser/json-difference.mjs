const g = (f, n) => {
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
}, d = (f, n) => {
  const o = [];
  let e = 0;
  for (const i in f)
    if (!(i in n)) {
      const y = f[i] === "@{}" ? {} : f[i] === "@[]" ? [] : f[i];
      o[e] = [i, y], e++;
    }
  return o;
}, r = (f, n, o, e) => {
  const i = e ? f ? "[" : "." : "/", y = e ? f ? "]" : "" : f ? "[]" : "";
  return n === "__start__" ? `${e && f ? "[" : ""}${o}${y}` : `${n}${i}${o}${y}`;
}, s = (f, n = !1, o, e = "__start__") => {
  o === void 0 && (o = Array.isArray(f) ? { __root__: "@[]" } : { __root__: "@{}" });
  for (const i of Object.keys(f)) {
    const y = r(Array.isArray(f), e, i, n);
    typeof f[i] == "object" && f[i] !== null ? (Object.keys(f[i]).length === 0 ? o[y] = f[i] : o[y] = Array.isArray(f[i]) ? "@[]" : "@{}", s(f[i], n, o, y)) : o[y] = f[i];
  }
  return o;
}, O = {
  isLodashLike: !1
}, p = (f, n, o) => {
  const { isLodashLike: e } = o ?? O, i = {
    added: [],
    removed: [],
    edited: []
  }, y = s(f, e), _ = s(n, e);
  return i.removed = d(y, _), i.added = d(_, y), i.edited = g(y, _), i;
};
export {
  p as getDiff,
  g as getEditedPaths,
  d as getPathsDiff,
  s as getStructPaths
};
