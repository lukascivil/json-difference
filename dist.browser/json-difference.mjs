const y = (n, f) => {
  const t = [];
  for (const e in n)
    if (f.hasOwnProperty(e)) {
      if (typeof n[e] == "object" && typeof f[e] == "object" && JSON.stringify(n[e]) === JSON.stringify(f[e]))
        continue;
      n[e] !== f[e] && t.push([e, n[e], f[e]]);
    }
  return t;
}, s = (n, f) => {
  const t = [];
  let e = 0;
  for (const o in n)
    o in f || (t[e] = [o, n[o]], e++);
  return t;
}, d = (n, f, t, e) => {
  const o = e ? n ? "[" : "." : "/", c = e ? n ? "]" : "" : n ? "[]" : "";
  return f !== "" ? `${f}${o}${t}${c}` : `${e && n ? "[" : ""}${t}${c}`;
}, r = (n, f = !1, t = {}, e = "") => {
  for (const o of Object.keys(n)) {
    const c = d(Array.isArray(n), e, o, f);
    typeof n[o] == "object" ? (Object.keys(n[o]).length === 0 && (t[c] = n[o]), r(n[o], f, t, c)) : t[c] = n[o];
  }
  return t;
}, p = (n, f, t = !1) => {
  const e = {
    added: [],
    removed: [],
    edited: []
  }, o = r(n, t), c = r(f, t);
  return e.removed = s(o, c), e.added = s(c, o), e.edited = y(o, c), e;
}, g = (n, [f, t]) => {
  const e = f.split("/");
  let o = n;
  const c = e.length - 1;
  for (let l = 0; l < c; ++l) {
    const i = e[l];
    i in o || (console.log({ key: i }), i.includes("[]") && i.replace("[]", "")), o = o[i];
  }
  return o[e[c]] = t, n;
}, a = (n, f) => {
  let t = n;
  return f.removed.forEach((e) => {
    const o = e[0].replaceAll("\\/.*?\\[]", (c) => (console.log("entrei"), `[${c.replaceAll("/", "").replaceAll("[]", "")}]`));
    console.log({ el: e, cafe: o });
  }), t;
};
export {
  g as addDynamicProperty,
  a as applyDeltaDiff,
  p as getDiff,
  y as getEditedPaths,
  s as getPathsDiff,
  r as getStructPaths
};
