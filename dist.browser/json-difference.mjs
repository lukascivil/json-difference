const g = (e, f) => {
  const o = [];
  for (const n in e)
    if (f.hasOwnProperty(n)) {
      if (typeof e[n] == "object" && typeof f[n] == "object" && JSON.stringify(e[n]) === JSON.stringify(f[n]) || e[n] === f[n])
        continue;
      if (e[n] === "@{}" || e[n] === "@[]") {
        const i = f[n] === "@{}" ? {} : f[n] === "@[]" ? [] : f[n];
        e[n] === "@{}" ? JSON.stringify(f[n]) !== "{}" && o.push([n, {}, i]) : JSON.stringify(f[n]) !== "[]" && o.push([n, [], i]);
      } else
        o.push([n, e[n], f[n]]);
    }
  return o;
}, _ = (e, f) => {
  const o = [];
  let n = 0;
  for (const i in e)
    if (!(i in f)) {
      const r = e[i] === "@{}" ? {} : e[i] === "@[]" ? [] : e[i];
      o[n] = [i, r], n++;
    }
  return o;
}, p = (e, f, o, n) => {
  const i = n ? e ? "[" : "." : "/", r = n ? e ? "]" : "" : e ? "[]" : "";
  return f === "__start__" ? `${n && e ? "[" : ""}${o}${r}` : `${f}${i}${o}${r}`;
}, y = (e, f = !1, o, n = "__start__") => {
  o === void 0 && (o = Array.isArray(e) ? { __root__: "@[]" } : { __root__: "@{}" });
  for (const i of Object.keys(e)) {
    const r = p(Array.isArray(e), n, i, f);
    typeof e[i] == "object" && e[i] !== null ? (Object.keys(e[i]).length === 0 ? o[r] = e[i] : o[r] = Array.isArray(e[i]) ? "@[]" : "@{}", y(e[i], f, o, r)) : o[r] = e[i];
  }
  return o;
}, O = (e) => (e.edited = e.edited.filter((f) => !(typeof f[1] == "object" && f[2] === "@{}")).map((f) => f[2] === "@{}" ? [f[0], f[1], {}] : f[2] === "@[]" ? [f[0], f[1], []] : f), e), c = {
  isLodashLike: !1
}, b = (e, f, o) => {
  const { isLodashLike: n } = o ?? c, i = {
    added: [],
    removed: [],
    edited: []
  }, r = y(e, n), s = y(f, n);
  return i.removed = _(r, s), i.added = _(s, r), i.edited = g(r, s), O(i);
};
export {
  b as getDiff,
  g as getEditedPaths,
  _ as getPathsDiff,
  y as getStructPaths
};
