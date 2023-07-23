const J = (t, e) => {
  const n = [];
  for (const r in t)
    if (e.hasOwnProperty(r)) {
      if (typeof t[r] == "object" && typeof e[r] == "object" && JSON.stringify(t[r]) === JSON.stringify(e[r]) || t[r] === e[r])
        continue;
      if (t[r] === "@{}" || t[r] === "@[]") {
        const o = e[r] === "@{}" ? {} : e[r] === "@[]" ? [] : e[r];
        t[r] === "@{}" ? JSON.stringify(e[r]) !== "{}" && n.push([r, {}, o]) : JSON.stringify(e[r]) !== "[]" && n.push([r, [], o]);
      } else
        n.push([r, t[r], e[r]]);
    }
  return n;
}, x = (t, e) => {
  const n = [];
  let r = 0;
  for (const o in t)
    if (!(o in e)) {
      const i = t[o] === "@{}" ? {} : t[o] === "@[]" ? [] : t[o];
      n[r] = [o, i], r++;
    }
  return n;
}, K = (t, e, n, r) => {
  const o = r ? t ? "[" : "." : "/", i = r ? t ? "]" : "" : t ? "[]" : "";
  return e !== "" ? `${e}${o}${n}${i}` : `${r && t ? "[" : ""}${n}${i}`;
}, C = (t, e = !1, n = {}, r = "") => {
  for (const o of Object.keys(t)) {
    const i = K(Array.isArray(t), r, o, e);
    typeof t[o] == "object" && t[o] !== null ? (Object.keys(t[o]).length === 0 ? n[i] = t[o] : n[i] = Array.isArray(t[o]) ? "@[]" : "@{}", C(t[o], e, n, i)) : n[i] = t[o];
  }
  return n;
};
var h = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function L(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var U = "Expected a function", S = "__lodash_hash_undefined__", w = 1 / 0, X = 9007199254740991, q = "[object Function]", z = "[object GeneratorFunction]", P = "[object Symbol]", Y = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, B = /^\w*$/, Q = /^\./, W = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Z = /[\\^$.*+?()[\]{}|]/g, V = /\\(\\)?/g, k = /^\[object .+?Constructor\]$/, tt = /^(?:0|[1-9]\d*)$/, et = typeof h == "object" && h && h.Object === Object && h, nt = typeof self == "object" && self && self.Object === Object && self, j = et || nt || Function("return this")();
function rt(t, e) {
  return t == null ? void 0 : t[e];
}
function ot(t) {
  var e = !1;
  if (t != null && typeof t.toString != "function")
    try {
      e = !!(t + "");
    } catch {
    }
  return e;
}
var it = Array.prototype, at = Function.prototype, F = Object.prototype, O = j["__core-js_shared__"], I = function() {
  var t = /[^.]+$/.exec(O && O.keys && O.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}(), A = at.toString, y = F.hasOwnProperty, H = F.toString, ft = RegExp(
  "^" + A.call(y).replace(Z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), E = j.Symbol, st = it.splice, ct = G(j, "Map"), p = G(Object, "create"), N = E ? E.prototype : void 0, D = N ? N.toString : void 0;
function s(t) {
  var e = -1, n = t ? t.length : 0;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
function ut() {
  this.__data__ = p ? p(null) : {};
}
function pt(t) {
  return this.has(t) && delete this.__data__[t];
}
function dt(t) {
  var e = this.__data__;
  if (p) {
    var n = e[t];
    return n === S ? void 0 : n;
  }
  return y.call(e, t) ? e[t] : void 0;
}
function lt(t) {
  var e = this.__data__;
  return p ? e[t] !== void 0 : y.call(e, t);
}
function ht(t, e) {
  var n = this.__data__;
  return n[t] = p && e === void 0 ? S : e, this;
}
s.prototype.clear = ut;
s.prototype.delete = pt;
s.prototype.get = dt;
s.prototype.has = lt;
s.prototype.set = ht;
function u(t) {
  var e = -1, n = t ? t.length : 0;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
function _t() {
  this.__data__ = [];
}
function yt(t) {
  var e = this.__data__, n = g(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : st.call(e, n, 1), !0;
}
function gt(t) {
  var e = this.__data__, n = g(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function bt(t) {
  return g(this.__data__, t) > -1;
}
function mt(t, e) {
  var n = this.__data__, r = g(n, t);
  return r < 0 ? n.push([t, e]) : n[r][1] = e, this;
}
u.prototype.clear = _t;
u.prototype.delete = yt;
u.prototype.get = gt;
u.prototype.has = bt;
u.prototype.set = mt;
function c(t) {
  var e = -1, n = t ? t.length : 0;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
function Ot() {
  this.__data__ = {
    hash: new s(),
    map: new (ct || u)(),
    string: new s()
  };
}
function vt(t) {
  return b(this, t).delete(t);
}
function Ct(t) {
  return b(this, t).get(t);
}
function jt(t) {
  return b(this, t).has(t);
}
function $t(t, e) {
  return b(this, t).set(t, e), this;
}
c.prototype.clear = Ot;
c.prototype.delete = vt;
c.prototype.get = Ct;
c.prototype.has = jt;
c.prototype.set = $t;
function Tt(t, e, n) {
  var r = t[e];
  (!(y.call(t, e) && M(r, n)) || n === void 0 && !(e in t)) && (t[e] = n);
}
function g(t, e) {
  for (var n = t.length; n--; )
    if (M(t[n][0], e))
      return n;
  return -1;
}
function xt(t) {
  if (!_(t) || Ft(t))
    return !1;
  var e = Mt(t) || ot(t) ? ft : k;
  return e.test(Gt(t));
}
function It(t, e, n, r) {
  if (!_(t))
    return t;
  e = St(e, t) ? [e] : Nt(e);
  for (var o = -1, i = e.length, f = i - 1, a = t; a != null && ++o < i; ) {
    var d = Ht(e[o]), l = n;
    if (o != f) {
      var m = a[d];
      l = r ? r(m, d, a) : void 0, l === void 0 && (l = _(m) ? m : Dt(e[o + 1]) ? [] : {});
    }
    Tt(a, d, l), a = a[d];
  }
  return t;
}
function Et(t) {
  if (typeof t == "string")
    return t;
  if (T(t))
    return D ? D.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -w ? "-0" : e;
}
function Nt(t) {
  return R(t) ? t : At(t);
}
function b(t, e) {
  var n = t.__data__;
  return wt(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function G(t, e) {
  var n = rt(t, e);
  return xt(n) ? n : void 0;
}
function Dt(t, e) {
  return e = e ?? X, !!e && (typeof t == "number" || tt.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function St(t, e) {
  if (R(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || T(t) ? !0 : B.test(t) || !Y.test(t) || e != null && t in Object(e);
}
function wt(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Ft(t) {
  return !!I && I in t;
}
var At = $(function(t) {
  t = Jt(t);
  var e = [];
  return Q.test(t) && e.push(""), t.replace(W, function(n, r, o, i) {
    e.push(o ? i.replace(V, "$1") : r || n);
  }), e;
});
function Ht(t) {
  if (typeof t == "string" || T(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -w ? "-0" : e;
}
function Gt(t) {
  if (t != null) {
    try {
      return A.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
function $(t, e) {
  if (typeof t != "function" || e && typeof e != "function")
    throw new TypeError(U);
  var n = function() {
    var r = arguments, o = e ? e.apply(this, r) : r[0], i = n.cache;
    if (i.has(o))
      return i.get(o);
    var f = t.apply(this, r);
    return n.cache = i.set(o, f), f;
  };
  return n.cache = new ($.Cache || c)(), n;
}
$.Cache = c;
function M(t, e) {
  return t === e || t !== t && e !== e;
}
var R = Array.isArray;
function Mt(t) {
  var e = _(t) ? H.call(t) : "";
  return e == q || e == z;
}
function _(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function Rt(t) {
  return !!t && typeof t == "object";
}
function T(t) {
  return typeof t == "symbol" || Rt(t) && H.call(t) == P;
}
function Jt(t) {
  return t == null ? "" : Et(t);
}
function Kt(t, e, n) {
  return t == null ? t : It(t, e, n);
}
var Lt = Kt;
const v = /* @__PURE__ */ L(Lt), Ut = (t) => {
  const e = t.removed.map((o) => {
    const i = {};
    return v(i, o[0], o[1]), i;
  }), n = t.edited.map((o) => v({}, "cafe/123", "8888")), r = t.added.map((o) => v({}, o[0], o[1]));
  return {
    removed: e,
    edited: n,
    added: r
  };
}, Xt = {
  isLodashLike: !1,
  isObjectOutput: !1
}, qt = (t, e, n) => {
  const { isLodashLike: r, isObjectOutput: o } = n ?? Xt;
  let i = {
    added: [],
    removed: [],
    edited: []
  };
  const f = C(t, r), a = C(e, r);
  return i.removed = x(f, a), i.added = x(a, f), i.edited = J(f, a), o && (i = Ut(i)), i;
};
export {
  qt as getDiff,
  J as getEditedPaths,
  x as getPathsDiff,
  C as getStructPaths
};
