const Or = (r, e) => {
  const t = [];
  for (const a in r)
    if (e.hasOwnProperty(a)) {
      if (typeof r[a] == "object" && typeof e[a] == "object" && JSON.stringify(r[a]) === JSON.stringify(e[a]))
        continue;
      r[a] !== e[a] && t.push([a, r[a], e[a]]);
    }
  return t;
}, V = (r, e) => {
  const t = [];
  let a = 0;
  for (const n in r)
    n in e || (t[a] = [n, r[n]], a++);
  return t;
}, Ar = (r, e, t, a) => {
  const n = a ? r ? "[" : "." : "/", o = a ? r ? "]" : "" : r ? "[]" : "";
  return e !== "" ? `${e}${n}${t}${o}` : `${a && r ? "[" : ""}${t}${o}`;
}, I = (r, e = !1, t = {}, a = "") => {
  for (const n of Object.keys(r)) {
    const o = Ar(Array.isArray(r), a, n, e);
    typeof r[n] == "object" && r[n] !== null ? (Object.keys(r[n]).length === 0 && (t[o] = r[n]), I(r[n], e, t, o)) : t[o] = r[n];
  }
  return t;
}, zi = (r, e, t = !1) => {
  const a = {
    added: [],
    removed: [],
    edited: []
  }, n = I(r, t), o = I(e, t);
  return a.removed = V(n, o), a.added = V(o, n), a.edited = Or(n, o), a;
};
var T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pr = Array.isArray, b = Pr, wr = typeof T == "object" && T && T.Object === Object && T, fr = wr, Ir = fr, xr = typeof self == "object" && self && self.Object === Object && self, Mr = Ir || xr || Function("return this")(), u = Mr, Er = u, Dr = Er.Symbol, K = Dr, R = K, ur = Object.prototype, Nr = ur.hasOwnProperty, Gr = ur.toString, _ = R ? R.toStringTag : void 0;
function Fr(r) {
  var e = Nr.call(r, _), t = r[_];
  try {
    r[_] = void 0;
    var a = !0;
  } catch {
  }
  var n = Gr.call(r);
  return a && (e ? r[_] = t : delete r[_]), n;
}
var Kr = Fr, Ur = Object.prototype, zr = Ur.toString;
function Hr(r) {
  return zr.call(r);
}
var Vr = Hr, B = K, Rr = Kr, Br = Vr, Lr = "[object Null]", Wr = "[object Undefined]", L = B ? B.toStringTag : void 0;
function Jr(r) {
  return r == null ? r === void 0 ? Wr : Lr : L && L in Object(r) ? Rr(r) : Br(r);
}
var d = Jr;
function qr(r) {
  return r != null && typeof r == "object";
}
var m = qr, Xr = d, kr = m, Yr = "[object Symbol]";
function Zr(r) {
  return typeof r == "symbol" || kr(r) && Xr(r) == Yr;
}
var j = Zr, Qr = b, re = j, ee = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, te = /^\w*$/;
function ae(r, e) {
  if (Qr(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || re(r) ? !0 : te.test(r) || !ee.test(r) || e != null && r in Object(e);
}
var ne = ae;
function oe(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var U = oe, ie = d, se = U, ce = "[object AsyncFunction]", fe = "[object Function]", ue = "[object GeneratorFunction]", pe = "[object Proxy]";
function ve(r) {
  if (!se(r))
    return !1;
  var e = ie(r);
  return e == fe || e == ue || e == ce || e == pe;
}
var pr = ve, ge = u, le = ge["__core-js_shared__"], he = le, w = he, W = function() {
  var r = /[^.]+$/.exec(w && w.keys && w.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function ye(r) {
  return !!W && W in r;
}
var $e = ye, _e = Function.prototype, be = _e.toString;
function de(r) {
  if (r != null) {
    try {
      return be.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var vr = de, Te = pr, me = $e, je = U, Se = vr, Ce = /[\\^$.*+?()[\]{}|]/g, Oe = /^\[object .+?Constructor\]$/, Ae = Function.prototype, Pe = Object.prototype, we = Ae.toString, Ie = Pe.hasOwnProperty, xe = RegExp(
  "^" + we.call(Ie).replace(Ce, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Me(r) {
  if (!je(r) || me(r))
    return !1;
  var e = Te(r) ? xe : Oe;
  return e.test(Se(r));
}
var Ee = Me;
function De(r, e) {
  return r == null ? void 0 : r[e];
}
var Ne = De, Ge = Ee, Fe = Ne;
function Ke(r, e) {
  var t = Fe(r, e);
  return Ge(t) ? t : void 0;
}
var g = Ke, Ue = g, ze = Ue(Object, "create"), S = ze, J = S;
function He() {
  this.__data__ = J ? J(null) : {}, this.size = 0;
}
var Ve = He;
function Re(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var Be = Re, Le = S, We = "__lodash_hash_undefined__", Je = Object.prototype, qe = Je.hasOwnProperty;
function Xe(r) {
  var e = this.__data__;
  if (Le) {
    var t = e[r];
    return t === We ? void 0 : t;
  }
  return qe.call(e, r) ? e[r] : void 0;
}
var ke = Xe, Ye = S, Ze = Object.prototype, Qe = Ze.hasOwnProperty;
function rt(r) {
  var e = this.__data__;
  return Ye ? e[r] !== void 0 : Qe.call(e, r);
}
var et = rt, tt = S, at = "__lodash_hash_undefined__";
function nt(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = tt && e === void 0 ? at : e, this;
}
var ot = nt, it = Ve, st = Be, ct = ke, ft = et, ut = ot;
function l(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var a = r[e];
    this.set(a[0], a[1]);
  }
}
l.prototype.clear = it;
l.prototype.delete = st;
l.prototype.get = ct;
l.prototype.has = ft;
l.prototype.set = ut;
var pt = l;
function vt() {
  this.__data__ = [], this.size = 0;
}
var gt = vt;
function lt(r, e) {
  return r === e || r !== r && e !== e;
}
var gr = lt, ht = gr;
function yt(r, e) {
  for (var t = r.length; t--; )
    if (ht(r[t][0], e))
      return t;
  return -1;
}
var C = yt, $t = C, _t = Array.prototype, bt = _t.splice;
function dt(r) {
  var e = this.__data__, t = $t(e, r);
  if (t < 0)
    return !1;
  var a = e.length - 1;
  return t == a ? e.pop() : bt.call(e, t, 1), --this.size, !0;
}
var Tt = dt, mt = C;
function jt(r) {
  var e = this.__data__, t = mt(e, r);
  return t < 0 ? void 0 : e[t][1];
}
var St = jt, Ct = C;
function Ot(r) {
  return Ct(this.__data__, r) > -1;
}
var At = Ot, Pt = C;
function wt(r, e) {
  var t = this.__data__, a = Pt(t, r);
  return a < 0 ? (++this.size, t.push([r, e])) : t[a][1] = e, this;
}
var It = wt, xt = gt, Mt = Tt, Et = St, Dt = At, Nt = It;
function h(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var a = r[e];
    this.set(a[0], a[1]);
  }
}
h.prototype.clear = xt;
h.prototype.delete = Mt;
h.prototype.get = Et;
h.prototype.has = Dt;
h.prototype.set = Nt;
var Gt = h, Ft = g, Kt = u, Ut = Ft(Kt, "Map"), lr = Ut, q = pt, zt = Gt, Ht = lr;
function Vt() {
  this.size = 0, this.__data__ = {
    hash: new q(),
    map: new (Ht || zt)(),
    string: new q()
  };
}
var Rt = Vt;
function Bt(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
var Lt = Bt, Wt = Lt;
function Jt(r, e) {
  var t = r.__data__;
  return Wt(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
var O = Jt, qt = O;
function Xt(r) {
  var e = qt(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
var kt = Xt, Yt = O;
function Zt(r) {
  return Yt(this, r).get(r);
}
var Qt = Zt, ra = O;
function ea(r) {
  return ra(this, r).has(r);
}
var ta = ea, aa = O;
function na(r, e) {
  var t = aa(this, r), a = t.size;
  return t.set(r, e), this.size += t.size == a ? 0 : 1, this;
}
var oa = na, ia = Rt, sa = kt, ca = Qt, fa = ta, ua = oa;
function y(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var a = r[e];
    this.set(a[0], a[1]);
  }
}
y.prototype.clear = ia;
y.prototype.delete = sa;
y.prototype.get = ca;
y.prototype.has = fa;
y.prototype.set = ua;
var pa = y, hr = pa, va = "Expected a function";
function z(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(va);
  var t = function() {
    var a = arguments, n = e ? e.apply(this, a) : a[0], o = t.cache;
    if (o.has(n))
      return o.get(n);
    var c = r.apply(this, a);
    return t.cache = o.set(n, c) || o, c;
  };
  return t.cache = new (z.Cache || hr)(), t;
}
z.Cache = hr;
var ga = z, la = ga, ha = 500;
function ya(r) {
  var e = la(r, function(a) {
    return t.size === ha && t.clear(), a;
  }), t = e.cache;
  return e;
}
var $a = ya, _a = $a, ba = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, da = /\\(\\)?/g, Ta = _a(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(ba, function(t, a, n, o) {
    e.push(n ? o.replace(da, "$1") : a || t);
  }), e;
}), yr = Ta;
function ma(r, e) {
  for (var t = -1, a = r == null ? 0 : r.length, n = Array(a); ++t < a; )
    n[t] = e(r[t], t, r);
  return n;
}
var $r = ma, X = K, ja = $r, Sa = b, Ca = j, Oa = 1 / 0, k = X ? X.prototype : void 0, Y = k ? k.toString : void 0;
function _r(r) {
  if (typeof r == "string")
    return r;
  if (Sa(r))
    return ja(r, _r) + "";
  if (Ca(r))
    return Y ? Y.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -Oa ? "-0" : e;
}
var Aa = _r, Pa = Aa;
function wa(r) {
  return r == null ? "" : Pa(r);
}
var br = wa, Ia = b, xa = ne, Ma = yr, Ea = br;
function Da(r, e) {
  return Ia(r) ? r : xa(r, e) ? [r] : Ma(Ea(r));
}
var H = Da;
function Na(r) {
  var e = r == null ? 0 : r.length;
  return e ? r[e - 1] : void 0;
}
var Ga = Na, Fa = j, Ka = 1 / 0;
function Ua(r) {
  if (typeof r == "string" || Fa(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Ka ? "-0" : e;
}
var A = Ua, za = H, Ha = A;
function Va(r, e) {
  e = za(e, r);
  for (var t = 0, a = e.length; r != null && t < a; )
    r = r[Ha(e[t++])];
  return t && t == a ? r : void 0;
}
var dr = Va;
function Ra(r, e, t) {
  var a = -1, n = r.length;
  e < 0 && (e = -e > n ? 0 : n + e), t = t > n ? n : t, t < 0 && (t += n), n = e > t ? 0 : t - e >>> 0, e >>>= 0;
  for (var o = Array(n); ++a < n; )
    o[a] = r[a + e];
  return o;
}
var Ba = Ra, La = dr, Wa = Ba;
function Ja(r, e) {
  return e.length < 2 ? r : La(r, Wa(e, 0, -1));
}
var qa = Ja, Xa = H, ka = Ga, Ya = qa, Za = A;
function Qa(r, e) {
  return e = Xa(e, r), r = Ya(r, e), r == null || delete r[Za(ka(e))];
}
var rn = Qa, en = rn;
function tn(r, e) {
  return r == null ? !0 : en(r, e);
}
var Z = tn, an = dr;
function nn(r, e, t) {
  var a = r == null ? void 0 : an(r, e);
  return a === void 0 ? t : a;
}
var on = nn, sn = g, cn = function() {
  try {
    var r = sn(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), fn = cn, Q = fn;
function un(r, e, t) {
  e == "__proto__" && Q ? Q(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
var pn = un, vn = pn, gn = gr, ln = Object.prototype, hn = ln.hasOwnProperty;
function yn(r, e, t) {
  var a = r[e];
  (!(hn.call(r, e) && gn(a, t)) || t === void 0 && !(e in r)) && vn(r, e, t);
}
var $n = yn, _n = 9007199254740991, bn = /^(?:0|[1-9]\d*)$/;
function dn(r, e) {
  var t = typeof r;
  return e = e == null ? _n : e, !!e && (t == "number" || t != "symbol" && bn.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
var Tn = dn, mn = $n, jn = H, Sn = Tn, rr = U, Cn = A;
function On(r, e, t, a) {
  if (!rr(r))
    return r;
  e = jn(e, r);
  for (var n = -1, o = e.length, c = o - 1, s = r; s != null && ++n < o; ) {
    var f = Cn(e[n]), p = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (n != c) {
      var P = s[f];
      p = a ? a(P, f, s) : void 0, p === void 0 && (p = rr(P) ? P : Sn(e[n + 1]) ? [] : {});
    }
    mn(s, f, p), s = s[f];
  }
  return r;
}
var Tr = On, An = Tr;
function Pn(r, e, t) {
  return r == null ? r : An(r, e, t);
}
var wn = Pn, In = Tr;
function xn(r, e, t, a) {
  return a = typeof a == "function" ? a : void 0, r == null ? r : In(r, e, t, a);
}
var Mn = xn, En = Object.prototype;
function Dn(r) {
  var e = r && r.constructor, t = typeof e == "function" && e.prototype || En;
  return r === t;
}
var mr = Dn;
function Nn(r, e) {
  return function(t) {
    return r(e(t));
  };
}
var Gn = Nn, Fn = Gn, Kn = Fn(Object.keys, Object), Un = Kn, zn = mr, Hn = Un, Vn = Object.prototype, Rn = Vn.hasOwnProperty;
function Bn(r) {
  if (!zn(r))
    return Hn(r);
  var e = [];
  for (var t in Object(r))
    Rn.call(r, t) && t != "constructor" && e.push(t);
  return e;
}
var Ln = Bn, Wn = g, Jn = u, qn = Wn(Jn, "DataView"), Xn = qn, kn = g, Yn = u, Zn = kn(Yn, "Promise"), Qn = Zn, ro = g, eo = u, to = ro(eo, "Set"), ao = to, no = g, oo = u, io = no(oo, "WeakMap"), so = io, x = Xn, M = lr, E = Qn, D = ao, N = so, jr = d, $ = vr, er = "[object Map]", co = "[object Object]", tr = "[object Promise]", ar = "[object Set]", nr = "[object WeakMap]", or = "[object DataView]", fo = $(x), uo = $(M), po = $(E), vo = $(D), go = $(N), v = jr;
(x && v(new x(new ArrayBuffer(1))) != or || M && v(new M()) != er || E && v(E.resolve()) != tr || D && v(new D()) != ar || N && v(new N()) != nr) && (v = function(r) {
  var e = jr(r), t = e == co ? r.constructor : void 0, a = t ? $(t) : "";
  if (a)
    switch (a) {
      case fo:
        return or;
      case uo:
        return er;
      case po:
        return tr;
      case vo:
        return ar;
      case go:
        return nr;
    }
  return e;
});
var lo = v, ho = d, yo = m, $o = "[object Arguments]";
function _o(r) {
  return yo(r) && ho(r) == $o;
}
var bo = _o, ir = bo, To = m, Sr = Object.prototype, mo = Sr.hasOwnProperty, jo = Sr.propertyIsEnumerable, So = ir(function() {
  return arguments;
}()) ? ir : function(r) {
  return To(r) && mo.call(r, "callee") && !jo.call(r, "callee");
}, Co = So, Oo = 9007199254740991;
function Ao(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Oo;
}
var Cr = Ao, Po = pr, wo = Cr;
function Io(r) {
  return r != null && wo(r.length) && !Po(r);
}
var xo = Io, G = { exports: {} };
function Mo() {
  return !1;
}
var Eo = Mo;
(function(r, e) {
  var t = u, a = Eo, n = e && !e.nodeType && e, o = n && !0 && r && !r.nodeType && r, c = o && o.exports === n, s = c ? t.Buffer : void 0, f = s ? s.isBuffer : void 0, p = f || a;
  r.exports = p;
})(G, G.exports);
var Do = d, No = Cr, Go = m, Fo = "[object Arguments]", Ko = "[object Array]", Uo = "[object Boolean]", zo = "[object Date]", Ho = "[object Error]", Vo = "[object Function]", Ro = "[object Map]", Bo = "[object Number]", Lo = "[object Object]", Wo = "[object RegExp]", Jo = "[object Set]", qo = "[object String]", Xo = "[object WeakMap]", ko = "[object ArrayBuffer]", Yo = "[object DataView]", Zo = "[object Float32Array]", Qo = "[object Float64Array]", ri = "[object Int8Array]", ei = "[object Int16Array]", ti = "[object Int32Array]", ai = "[object Uint8Array]", ni = "[object Uint8ClampedArray]", oi = "[object Uint16Array]", ii = "[object Uint32Array]", i = {};
i[Zo] = i[Qo] = i[ri] = i[ei] = i[ti] = i[ai] = i[ni] = i[oi] = i[ii] = !0;
i[Fo] = i[Ko] = i[ko] = i[Uo] = i[Yo] = i[zo] = i[Ho] = i[Vo] = i[Ro] = i[Bo] = i[Lo] = i[Wo] = i[Jo] = i[qo] = i[Xo] = !1;
function si(r) {
  return Go(r) && No(r.length) && !!i[Do(r)];
}
var ci = si;
function fi(r) {
  return function(e) {
    return r(e);
  };
}
var ui = fi, F = { exports: {} };
(function(r, e) {
  var t = fr, a = e && !e.nodeType && e, n = a && !0 && r && !r.nodeType && r, o = n && n.exports === a, c = o && t.process, s = function() {
    try {
      var f = n && n.require && n.require("util").types;
      return f || c && c.binding && c.binding("util");
    } catch {
    }
  }();
  r.exports = s;
})(F, F.exports);
var pi = ci, vi = ui, sr = F.exports, cr = sr && sr.isTypedArray, gi = cr ? vi(cr) : pi, li = gi, hi = Ln, yi = lo, $i = Co, _i = b, bi = xo, di = G.exports, Ti = mr, mi = li, ji = "[object Map]", Si = "[object Set]", Ci = Object.prototype, Oi = Ci.hasOwnProperty;
function Ai(r) {
  if (r == null)
    return !0;
  if (bi(r) && (_i(r) || typeof r == "string" || typeof r.splice == "function" || di(r) || mi(r) || $i(r)))
    return !r.length;
  var e = yi(r);
  if (e == ji || e == Si)
    return !r.size;
  if (Ti(r))
    return !hi(r).length;
  for (var t in r)
    if (Oi.call(r, t))
      return !1;
  return !0;
}
var Pi = Ai;
function wi(r, e) {
  var t = -1, a = r.length;
  for (e || (e = Array(a)); ++t < a; )
    e[t] = r[t];
  return e;
}
var Ii = wi, xi = $r, Mi = Ii, Ei = b, Di = j, Ni = yr, Gi = A, Fi = br;
function Ki(r) {
  return Ei(r) ? xi(r, Gi) : Di(r) ? [r] : Mi(Ni(Fi(r)));
}
var Ui = Ki;
const Hi = (r, e) => {
  const t = JSON.parse(JSON.stringify(r));
  return e.added.forEach((a) => {
    Z(t, a[0]);
  }), e.removed.forEach((a) => {
    const n = Ui(a[0]);
    n.splice(-1);
    const o = on(t, n);
    typeof o == "object" && Pi(o) && Z(t, n), Mn(t, a[0], a[1], (c) => {
      const s = a[0].split(".").pop();
      return s && s.includes("[") ? [] : c || {};
    });
  }), e.edited.forEach((a) => {
    wn(t, a[0], a[1]);
  }), t;
};
export {
  Hi as applyDeltaDiff,
  zi as getDiff,
  Or as getEditedPaths,
  V as getPathsDiff,
  I as getStructPaths
};
