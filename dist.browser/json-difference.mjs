const t = (o, i) => {
  const n = [];
  let e = {};
  for (const f in o)
    if (i.hasOwnProperty(f)) {
      if (typeof o[f] == "object" && typeof i[f] == "object" && JSON.stringify(o[f]) === JSON.stringify(i[f]))
        continue;
      o[f] !== i[f] && (e = {
        [f]: [o[f], i[f]]
      }, n.push(e));
    }
  return n;
}, y = (o, i) => {
  const n = {};
  for (const e in o)
    e in i || (n[e] = o[e]);
  return n;
}, d = (o, i = {}, n = "") => {
  for (const e of Object.keys(o)) {
    const f = n !== "" ? `${n}/${e}` : e;
    typeof o[e] == "object" ? (Object.keys(o[e]).length === 0 && (i[f] = o[e]), d(o[e], i, f)) : i[f] = o[e];
  }
  return i;
}, s = (o, i) => {
  const n = {
    added: {},
    removed: {},
    edited: []
  }, e = d(o), f = d(i);
  return n.removed = y(e, f), n.added = y(f, e), n.edited = t(e, f), n;
};
export {
  s as getDiff,
  t as getEditedPaths,
  y as getPathsDiff,
  d as getStructPaths
};
