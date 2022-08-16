const d = (n, t) => {
  const o = [];
  let e = {};
  for (const f in n)
    t.hasOwnProperty(f) && n[f] !== t[f] && (e = {
      [f]: {
        oldValue: n[f],
        newValue: t[f]
      }
    }, o.push(e));
  return o;
}, s = (n, t) => {
  const o = {};
  for (const e in n)
    e in t || (o[e] = n[e]);
  return o;
}, i = (n, t = {}, o = "") => {
  for (const e of Object.keys(n)) {
    const f = o !== "" ? `${o}/${e}` : e;
    typeof n[e] == "object" ? i(n[e], t, f) : t[f] = n[e];
  }
  return t;
}, c = (n, t) => {
  const o = {
    new: {},
    removed: {},
    edited: []
  }, e = i(n), f = i(t);
  return o.removed = s(e, f), o.new = s(f, e), o.edited = d(e, f), o;
};
export {
  c as getDiff,
  d as getEditedPaths,
  s as getPathsDiff,
  i as getStructPaths
};
