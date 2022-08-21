const N = (t, e) => {
  const n = [];
  for (const r in t)
    if (e.hasOwnProperty(r)) {
      if (typeof t[r] == "object" && typeof e[r] == "object" && JSON.stringify(t[r]) === JSON.stringify(e[r]))
        continue;
      t[r] !== e[r] && n.push([r, t[r], e[r]]);
    }
  return n;
}, O = (t, e) => {
  const n = [];
  let r = 0;
  for (const o in t)
    o in e || (n[r] = [o, t[o]], r++);
  return n;
}, F = (t, e, n, r) => {
  const o = r ? t ? "[" : "." : "/", i = r ? t ? "]" : "" : t ? "[]" : "";
  return e !== "" ? `${e}${o}${n}${i}` : `${r && t ? "[" : ""}${n}${i}`;
}, _ = (t, e = !1, n = {}, r = "") => {
  for (const o of Object.keys(t)) {
    const i = F(Array.isArray(t), r, o, e);
    typeof t[o] == "object" ? (Object.keys(t[o]).length === 0 && (n[i] = t[o]), _(t[o], e, n, i)) : n[i] = t[o];
  }
  return n;
}, le = (t, e, n = !1) => {
  const r = {
    added: [],
    removed: [],
    edited: []
  }, o = _(t, n), i = _(e, n);
  return r.removed = O(o, i), r.added = O(i, o), r.edited = N(o, i), r;
}, he = (t, [e, n]) => {
  const r = e.split("/");
  let o = t;
  const i = r.length - 1;
  for (let a = 0; a < i; ++a) {
    const l = r[a];
    l in o || (console.log({ key: l }), l.includes("[]") && l.replace("[]", "")), o = o[l];
  }
  return o[r[i]] = n, t;
};
var A = typeof global == "object" && global && global.Object === Object && global;
const M = A;
var H = typeof self == "object" && self && self.Object === Object && self, G = M || H || Function("return this")();
const b = G;
var R = b.Symbol;
const f = R;
var P = Object.prototype, K = P.hasOwnProperty, U = P.toString, h = f ? f.toStringTag : void 0;
function J(t) {
  var e = K.call(t, h), n = t[h];
  try {
    t[h] = void 0;
    var r = !0;
  } catch {
  }
  var o = U.call(t);
  return r && (e ? t[h] = n : delete t[h]), o;
}
var X = Object.prototype, Y = X.toString;
function Z(t) {
  return Y.call(t);
}
var q = "[object Null]", V = "[object Undefined]", T = f ? f.toStringTag : void 0;
function w(t) {
  return t == null ? t === void 0 ? V : q : T && T in Object(t) ? J(t) : Z(t);
}
function B(t) {
  return t != null && typeof t == "object";
}
var Q = "[object Symbol]";
function v(t) {
  return typeof t == "symbol" || B(t) && w(t) == Q;
}
function W(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, o = Array(r); ++n < r; )
    o[n] = e(t[n], n, t);
  return o;
}
var k = Array.isArray;
const $ = k;
var L = 1 / 0, S = f ? f.prototype : void 0, j = S ? S.toString : void 0;
function x(t) {
  if (typeof t == "string")
    return t;
  if ($(t))
    return W(t, x) + "";
  if (v(t))
    return j ? j.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -L ? "-0" : e;
}
function I(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var tt = "[object AsyncFunction]", et = "[object Function]", nt = "[object GeneratorFunction]", rt = "[object Proxy]";
function ot(t) {
  if (!I(t))
    return !1;
  var e = w(t);
  return e == et || e == nt || e == tt || e == rt;
}
var it = b["__core-js_shared__"];
const y = it;
var C = function() {
  var t = /[^.]+$/.exec(y && y.keys && y.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function at(t) {
  return !!C && C in t;
}
var st = Function.prototype, ct = st.toString;
function ft(t) {
  if (t != null) {
    try {
      return ct.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var ut = /[\\^$.*+?()[\]{}|]/g, lt = /^\[object .+?Constructor\]$/, ht = Function.prototype, pt = Object.prototype, dt = ht.toString, gt = pt.hasOwnProperty, yt = RegExp(
  "^" + dt.call(gt).replace(ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _t(t) {
  if (!I(t) || at(t))
    return !1;
  var e = ot(t) ? yt : lt;
  return e.test(ft(t));
}
function bt(t, e) {
  return t == null ? void 0 : t[e];
}
function E(t, e) {
  var n = bt(t, e);
  return _t(n) ? n : void 0;
}
function vt(t, e) {
  return t === e || t !== t && e !== e;
}
var $t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, mt = /^\w*$/;
function Ot(t, e) {
  if ($(t))
    return !1;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || v(t) ? !0 : mt.test(t) || !$t.test(t) || e != null && t in Object(e);
}
var Tt = E(Object, "create");
const p = Tt;
function St() {
  this.__data__ = p ? p(null) : {}, this.size = 0;
}
function jt(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Ct = "__lodash_hash_undefined__", Pt = Object.prototype, wt = Pt.hasOwnProperty;
function xt(t) {
  var e = this.__data__;
  if (p) {
    var n = e[t];
    return n === Ct ? void 0 : n;
  }
  return wt.call(e, t) ? e[t] : void 0;
}
var It = Object.prototype, Et = It.hasOwnProperty;
function zt(t) {
  var e = this.__data__;
  return p ? e[t] !== void 0 : Et.call(e, t);
}
var Dt = "__lodash_hash_undefined__";
function Nt(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = p && e === void 0 ? Dt : e, this;
}
function s(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
s.prototype.clear = St;
s.prototype.delete = jt;
s.prototype.get = xt;
s.prototype.has = zt;
s.prototype.set = Nt;
function Ft() {
  this.__data__ = [], this.size = 0;
}
function d(t, e) {
  for (var n = t.length; n--; )
    if (vt(t[n][0], e))
      return n;
  return -1;
}
var At = Array.prototype, Mt = At.splice;
function Ht(t) {
  var e = this.__data__, n = d(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : Mt.call(e, n, 1), --this.size, !0;
}
function Gt(t) {
  var e = this.__data__, n = d(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function Rt(t) {
  return d(this.__data__, t) > -1;
}
function Kt(t, e) {
  var n = this.__data__, r = d(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function u(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
u.prototype.clear = Ft;
u.prototype.delete = Ht;
u.prototype.get = Gt;
u.prototype.has = Rt;
u.prototype.set = Kt;
var Ut = E(b, "Map");
const Jt = Ut;
function Xt() {
  this.size = 0, this.__data__ = {
    hash: new s(),
    map: new (Jt || u)(),
    string: new s()
  };
}
function Yt(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function g(t, e) {
  var n = t.__data__;
  return Yt(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function Zt(t) {
  var e = g(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function qt(t) {
  return g(this, t).get(t);
}
function Vt(t) {
  return g(this, t).has(t);
}
function Bt(t, e) {
  var n = g(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function c(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
c.prototype.clear = Xt;
c.prototype.delete = Zt;
c.prototype.get = qt;
c.prototype.has = Vt;
c.prototype.set = Bt;
var Qt = "Expected a function";
function m(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Qt);
  var n = function() {
    var r = arguments, o = e ? e.apply(this, r) : r[0], i = n.cache;
    if (i.has(o))
      return i.get(o);
    var a = t.apply(this, r);
    return n.cache = i.set(o, a) || i, a;
  };
  return n.cache = new (m.Cache || c)(), n;
}
m.Cache = c;
var Wt = 500;
function kt(t) {
  var e = m(t, function(r) {
    return n.size === Wt && n.clear(), r;
  }), n = e.cache;
  return e;
}
var Lt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, te = /\\(\\)?/g, ee = kt(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Lt, function(n, r, o, i) {
    e.push(o ? i.replace(te, "$1") : r || n);
  }), e;
});
const ne = ee;
function re(t) {
  return t == null ? "" : x(t);
}
function z(t, e) {
  return $(t) ? t : Ot(t, e) ? [t] : ne(re(t));
}
var oe = 1 / 0;
function D(t) {
  if (typeof t == "string" || v(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -oe ? "-0" : e;
}
function ie(t, e) {
  e = z(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[D(e[n++])];
  return n && n == r ? t : void 0;
}
function ae(t, e, n) {
  var r = -1, o = t.length;
  e < 0 && (e = -e > o ? 0 : o + e), n = n > o ? o : n, n < 0 && (n += o), o = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var i = Array(o); ++r < o; )
    i[r] = t[r + e];
  return i;
}
function se(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function ce(t, e) {
  return e.length < 2 ? t : ie(t, ae(e, 0, -1));
}
function fe(t, e) {
  return e = z(e, t), t = ce(t, e), t == null || delete t[D(se(e))];
}
function ue(t, e) {
  return t == null ? !0 : fe(t, e);
}
const pe = (t, e) => {
  let n = t;
  return e.removed.forEach((r) => {
    n = ue(t, r[0]);
  }), n;
};
export {
  he as addDynamicProperty,
  pe as applyDeltaDiff,
  le as getDiff,
  N as getEditedPaths,
  O as getPathsDiff,
  _ as getStructPaths
};
