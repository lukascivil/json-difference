const d = (n, o) => {
  const i = [];
  let e = {};
  for (const f in n)
    if (o.hasOwnProperty(f)) {
      if (typeof n[f] == "object" && typeof o[f] == "object" && JSON.stringify(n[f]) === JSON.stringify(o[f]))
        continue;
      n[f] !== o[f] && (e = {
        [f]: {
          oldValue: n[f],
          newValue: o[f]
        }
      }, i.push(e));
    }
  return i;
}, t = (n, o) => {
  const i = {};
  for (const e in n)
    e in o || (i[e] = n[e]);
  return i;
}, y = (n, o = {}, i = "") => {
  for (const e of Object.keys(n)) {
    const f = i !== "" ? `${i}/${e}` : e;
    typeof n[e] == "object" ? (Object.keys(n[e]).length === 0 && (o[f] = n[e]), y(n[e], o, f)) : o[f] = n[e];
  }
  return o;
}, s = (n, o) => {
  const i = {
    new: {},
    removed: {},
    edited: []
  }, e = y(n), f = y(o);
  return i.removed = t(e, f), i.new = t(f, e), i.edited = d(e, f), i;
};
export {
  s as getDiff,
  d as getEditedPaths,
  t as getPathsDiff,
  y as getStructPaths
};
