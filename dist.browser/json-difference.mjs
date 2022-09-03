const Ae = (e, r) => {
  const t = [];
  for (const a in e)
    if (r.hasOwnProperty(a)) {
      if (typeof e[a] == "object" && typeof r[a] == "object" && JSON.stringify(e[a]) === JSON.stringify(r[a]))
        continue;
      e[a] !== r[a] && t.push([a, e[a], r[a]]);
    }
  return t;
}, V = (e, r) => {
  const t = [];
  let a = 0;
  for (const n in e)
    n in r || (t[a] = [n, e[n]], a++);
  return t;
}, Pe = (e, r, t, a) => {
  const n = a ? e ? "[" : "." : "/", o = a ? e ? "]" : "" : e ? "[]" : "";
  return r !== "" ? `${r}${n}${t}${o}` : `${a && e ? "[" : ""}${t}${o}`;
}, I = (e, r = !1, t = {}, a = "") => {
  for (const n of Object.keys(e)) {
    const o = Pe(Array.isArray(e), a, n, r);
    typeof e[n] == "object" && e[n] !== null ? (Object.keys(e[n]).length === 0 && (t[o] = e[n]), I(e[n], r, t, o)) : t[o] = e[n];
  }
  return t;
}, zi = (e, r, t = !1) => {
  const a = {
    added: [],
    removed: [],
    edited: []
  }, n = I(e, t), o = I(r, t);
  return a.removed = V(n, o), a.added = V(o, n), a.edited = Ae(n, o), a;
}, Hi = (e, [r, t]) => {
  const a = r.split("/");
  let n = e;
  const o = a.length - 1;
  for (let c = 0; c < o; ++c) {
    const s = a[c];
    if (!(s in n))
      if (console.log({ key: s }), s.includes("[]")) {
        const f = s.replace("[]", "");
        n[f] = [];
      } else
        n[s] = {};
    n = n[s];
  }
  return n[a[o]] = t, e;
};
var T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, we = Array.isArray, d = we, Ie = typeof T == "object" && T && T.Object === Object && T, ue = Ie, xe = ue, Me = typeof self == "object" && self && self.Object === Object && self, De = xe || Me || Function("return this")(), u = De, Ee = u, Ne = Ee.Symbol, K = Ne, R = K, pe = Object.prototype, Ge = pe.hasOwnProperty, Fe = pe.toString, _ = R ? R.toStringTag : void 0;
function Ke(e) {
  var r = Ge.call(e, _), t = e[_];
  try {
    e[_] = void 0;
    var a = !0;
  } catch {
  }
  var n = Fe.call(e);
  return a && (r ? e[_] = t : delete e[_]), n;
}
var Ue = Ke, ze = Object.prototype, He = ze.toString;
function Ve(e) {
  return He.call(e);
}
var Re = Ve, B = K, Be = Ue, Le = Re, We = "[object Null]", qe = "[object Undefined]", L = B ? B.toStringTag : void 0;
function Je(e) {
  return e == null ? e === void 0 ? qe : We : L && L in Object(e) ? Be(e) : Le(e);
}
var b = Je;
function ke(e) {
  return e != null && typeof e == "object";
}
var m = ke, Xe = b, Ye = m, Ze = "[object Symbol]";
function Qe(e) {
  return typeof e == "symbol" || Ye(e) && Xe(e) == Ze;
}
var j = Qe, er = d, rr = j, tr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ar = /^\w*$/;
function nr(e, r) {
  if (er(e))
    return !1;
  var t = typeof e;
  return t == "number" || t == "symbol" || t == "boolean" || e == null || rr(e) ? !0 : ar.test(e) || !tr.test(e) || r != null && e in Object(r);
}
var or = nr;
function ir(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var U = ir, sr = b, cr = U, fr = "[object AsyncFunction]", ur = "[object Function]", pr = "[object GeneratorFunction]", vr = "[object Proxy]";
function lr(e) {
  if (!cr(e))
    return !1;
  var r = sr(e);
  return r == ur || r == pr || r == fr || r == vr;
}
var ve = lr, gr = u, hr = gr["__core-js_shared__"], yr = hr, w = yr, W = function() {
  var e = /[^.]+$/.exec(w && w.keys && w.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function $r(e) {
  return !!W && W in e;
}
var _r = $r, dr = Function.prototype, br = dr.toString;
function Tr(e) {
  if (e != null) {
    try {
      return br.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var le = Tr, mr = ve, jr = _r, Sr = U, Cr = le, Or = /[\\^$.*+?()[\]{}|]/g, Ar = /^\[object .+?Constructor\]$/, Pr = Function.prototype, wr = Object.prototype, Ir = Pr.toString, xr = wr.hasOwnProperty, Mr = RegExp(
  "^" + Ir.call(xr).replace(Or, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Dr(e) {
  if (!Sr(e) || jr(e))
    return !1;
  var r = mr(e) ? Mr : Ar;
  return r.test(Cr(e));
}
var Er = Dr;
function Nr(e, r) {
  return e == null ? void 0 : e[r];
}
var Gr = Nr, Fr = Er, Kr = Gr;
function Ur(e, r) {
  var t = Kr(e, r);
  return Fr(t) ? t : void 0;
}
var l = Ur, zr = l, Hr = zr(Object, "create"), S = Hr, q = S;
function Vr() {
  this.__data__ = q ? q(null) : {}, this.size = 0;
}
var Rr = Vr;
function Br(e) {
  var r = this.has(e) && delete this.__data__[e];
  return this.size -= r ? 1 : 0, r;
}
var Lr = Br, Wr = S, qr = "__lodash_hash_undefined__", Jr = Object.prototype, kr = Jr.hasOwnProperty;
function Xr(e) {
  var r = this.__data__;
  if (Wr) {
    var t = r[e];
    return t === qr ? void 0 : t;
  }
  return kr.call(r, e) ? r[e] : void 0;
}
var Yr = Xr, Zr = S, Qr = Object.prototype, et = Qr.hasOwnProperty;
function rt(e) {
  var r = this.__data__;
  return Zr ? r[e] !== void 0 : et.call(r, e);
}
var tt = rt, at = S, nt = "__lodash_hash_undefined__";
function ot(e, r) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = at && r === void 0 ? nt : r, this;
}
var it = ot, st = Rr, ct = Lr, ft = Yr, ut = tt, pt = it;
function g(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var a = e[r];
    this.set(a[0], a[1]);
  }
}
g.prototype.clear = st;
g.prototype.delete = ct;
g.prototype.get = ft;
g.prototype.has = ut;
g.prototype.set = pt;
var vt = g;
function lt() {
  this.__data__ = [], this.size = 0;
}
var gt = lt;
function ht(e, r) {
  return e === r || e !== e && r !== r;
}
var ge = ht, yt = ge;
function $t(e, r) {
  for (var t = e.length; t--; )
    if (yt(e[t][0], r))
      return t;
  return -1;
}
var C = $t, _t = C, dt = Array.prototype, bt = dt.splice;
function Tt(e) {
  var r = this.__data__, t = _t(r, e);
  if (t < 0)
    return !1;
  var a = r.length - 1;
  return t == a ? r.pop() : bt.call(r, t, 1), --this.size, !0;
}
var mt = Tt, jt = C;
function St(e) {
  var r = this.__data__, t = jt(r, e);
  return t < 0 ? void 0 : r[t][1];
}
var Ct = St, Ot = C;
function At(e) {
  return Ot(this.__data__, e) > -1;
}
var Pt = At, wt = C;
function It(e, r) {
  var t = this.__data__, a = wt(t, e);
  return a < 0 ? (++this.size, t.push([e, r])) : t[a][1] = r, this;
}
var xt = It, Mt = gt, Dt = mt, Et = Ct, Nt = Pt, Gt = xt;
function h(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var a = e[r];
    this.set(a[0], a[1]);
  }
}
h.prototype.clear = Mt;
h.prototype.delete = Dt;
h.prototype.get = Et;
h.prototype.has = Nt;
h.prototype.set = Gt;
var Ft = h, Kt = l, Ut = u, zt = Kt(Ut, "Map"), he = zt, J = vt, Ht = Ft, Vt = he;
function Rt() {
  this.size = 0, this.__data__ = {
    hash: new J(),
    map: new (Vt || Ht)(),
    string: new J()
  };
}
var Bt = Rt;
function Lt(e) {
  var r = typeof e;
  return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? e !== "__proto__" : e === null;
}
var Wt = Lt, qt = Wt;
function Jt(e, r) {
  var t = e.__data__;
  return qt(r) ? t[typeof r == "string" ? "string" : "hash"] : t.map;
}
var O = Jt, kt = O;
function Xt(e) {
  var r = kt(this, e).delete(e);
  return this.size -= r ? 1 : 0, r;
}
var Yt = Xt, Zt = O;
function Qt(e) {
  return Zt(this, e).get(e);
}
var ea = Qt, ra = O;
function ta(e) {
  return ra(this, e).has(e);
}
var aa = ta, na = O;
function oa(e, r) {
  var t = na(this, e), a = t.size;
  return t.set(e, r), this.size += t.size == a ? 0 : 1, this;
}
var ia = oa, sa = Bt, ca = Yt, fa = ea, ua = aa, pa = ia;
function y(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var a = e[r];
    this.set(a[0], a[1]);
  }
}
y.prototype.clear = sa;
y.prototype.delete = ca;
y.prototype.get = fa;
y.prototype.has = ua;
y.prototype.set = pa;
var va = y, ye = va, la = "Expected a function";
function z(e, r) {
  if (typeof e != "function" || r != null && typeof r != "function")
    throw new TypeError(la);
  var t = function() {
    var a = arguments, n = r ? r.apply(this, a) : a[0], o = t.cache;
    if (o.has(n))
      return o.get(n);
    var c = e.apply(this, a);
    return t.cache = o.set(n, c) || o, c;
  };
  return t.cache = new (z.Cache || ye)(), t;
}
z.Cache = ye;
var ga = z, ha = ga, ya = 500;
function $a(e) {
  var r = ha(e, function(a) {
    return t.size === ya && t.clear(), a;
  }), t = r.cache;
  return r;
}
var _a = $a, da = _a, ba = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ta = /\\(\\)?/g, ma = da(function(e) {
  var r = [];
  return e.charCodeAt(0) === 46 && r.push(""), e.replace(ba, function(t, a, n, o) {
    r.push(n ? o.replace(Ta, "$1") : a || t);
  }), r;
}), $e = ma;
function ja(e, r) {
  for (var t = -1, a = e == null ? 0 : e.length, n = Array(a); ++t < a; )
    n[t] = r(e[t], t, e);
  return n;
}
var _e = ja, k = K, Sa = _e, Ca = d, Oa = j, Aa = 1 / 0, X = k ? k.prototype : void 0, Y = X ? X.toString : void 0;
function de(e) {
  if (typeof e == "string")
    return e;
  if (Ca(e))
    return Sa(e, de) + "";
  if (Oa(e))
    return Y ? Y.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -Aa ? "-0" : r;
}
var Pa = de, wa = Pa;
function Ia(e) {
  return e == null ? "" : wa(e);
}
var be = Ia, xa = d, Ma = or, Da = $e, Ea = be;
function Na(e, r) {
  return xa(e) ? e : Ma(e, r) ? [e] : Da(Ea(e));
}
var H = Na;
function Ga(e) {
  var r = e == null ? 0 : e.length;
  return r ? e[r - 1] : void 0;
}
var Fa = Ga, Ka = j, Ua = 1 / 0;
function za(e) {
  if (typeof e == "string" || Ka(e))
    return e;
  var r = e + "";
  return r == "0" && 1 / e == -Ua ? "-0" : r;
}
var A = za, Ha = H, Va = A;
function Ra(e, r) {
  r = Ha(r, e);
  for (var t = 0, a = r.length; e != null && t < a; )
    e = e[Va(r[t++])];
  return t && t == a ? e : void 0;
}
var Te = Ra;
function Ba(e, r, t) {
  var a = -1, n = e.length;
  r < 0 && (r = -r > n ? 0 : n + r), t = t > n ? n : t, t < 0 && (t += n), n = r > t ? 0 : t - r >>> 0, r >>>= 0;
  for (var o = Array(n); ++a < n; )
    o[a] = e[a + r];
  return o;
}
var La = Ba, Wa = Te, qa = La;
function Ja(e, r) {
  return r.length < 2 ? e : Wa(e, qa(r, 0, -1));
}
var ka = Ja, Xa = H, Ya = Fa, Za = ka, Qa = A;
function en(e, r) {
  return r = Xa(r, e), e = Za(e, r), e == null || delete e[Qa(Ya(r))];
}
var rn = en, tn = rn;
function an(e, r) {
  return e == null ? !0 : tn(e, r);
}
var Z = an, nn = Te;
function on(e, r, t) {
  var a = e == null ? void 0 : nn(e, r);
  return a === void 0 ? t : a;
}
var sn = on, cn = l, fn = function() {
  try {
    var e = cn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), un = fn, Q = un;
function pn(e, r, t) {
  r == "__proto__" && Q ? Q(e, r, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[r] = t;
}
var vn = pn, ln = vn, gn = ge, hn = Object.prototype, yn = hn.hasOwnProperty;
function $n(e, r, t) {
  var a = e[r];
  (!(yn.call(e, r) && gn(a, t)) || t === void 0 && !(r in e)) && ln(e, r, t);
}
var _n = $n, dn = 9007199254740991, bn = /^(?:0|[1-9]\d*)$/;
function Tn(e, r) {
  var t = typeof e;
  return r = r == null ? dn : r, !!r && (t == "number" || t != "symbol" && bn.test(e)) && e > -1 && e % 1 == 0 && e < r;
}
var mn = Tn, jn = _n, Sn = H, Cn = mn, ee = U, On = A;
function An(e, r, t, a) {
  if (!ee(e))
    return e;
  r = Sn(r, e);
  for (var n = -1, o = r.length, c = o - 1, s = e; s != null && ++n < o; ) {
    var f = On(r[n]), p = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return e;
    if (n != c) {
      var P = s[f];
      p = a ? a(P, f, s) : void 0, p === void 0 && (p = ee(P) ? P : Cn(r[n + 1]) ? [] : {});
    }
    jn(s, f, p), s = s[f];
  }
  return e;
}
var me = An, Pn = me;
function wn(e, r, t) {
  return e == null ? e : Pn(e, r, t);
}
var In = wn, xn = me;
function Mn(e, r, t, a) {
  return a = typeof a == "function" ? a : void 0, e == null ? e : xn(e, r, t, a);
}
var Dn = Mn, En = Object.prototype;
function Nn(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || En;
  return e === t;
}
var je = Nn;
function Gn(e, r) {
  return function(t) {
    return e(r(t));
  };
}
var Fn = Gn, Kn = Fn, Un = Kn(Object.keys, Object), zn = Un, Hn = je, Vn = zn, Rn = Object.prototype, Bn = Rn.hasOwnProperty;
function Ln(e) {
  if (!Hn(e))
    return Vn(e);
  var r = [];
  for (var t in Object(e))
    Bn.call(e, t) && t != "constructor" && r.push(t);
  return r;
}
var Wn = Ln, qn = l, Jn = u, kn = qn(Jn, "DataView"), Xn = kn, Yn = l, Zn = u, Qn = Yn(Zn, "Promise"), eo = Qn, ro = l, to = u, ao = ro(to, "Set"), no = ao, oo = l, io = u, so = oo(io, "WeakMap"), co = so, x = Xn, M = he, D = eo, E = no, N = co, Se = b, $ = le, re = "[object Map]", fo = "[object Object]", te = "[object Promise]", ae = "[object Set]", ne = "[object WeakMap]", oe = "[object DataView]", uo = $(x), po = $(M), vo = $(D), lo = $(E), go = $(N), v = Se;
(x && v(new x(new ArrayBuffer(1))) != oe || M && v(new M()) != re || D && v(D.resolve()) != te || E && v(new E()) != ae || N && v(new N()) != ne) && (v = function(e) {
  var r = Se(e), t = r == fo ? e.constructor : void 0, a = t ? $(t) : "";
  if (a)
    switch (a) {
      case uo:
        return oe;
      case po:
        return re;
      case vo:
        return te;
      case lo:
        return ae;
      case go:
        return ne;
    }
  return r;
});
var ho = v, yo = b, $o = m, _o = "[object Arguments]";
function bo(e) {
  return $o(e) && yo(e) == _o;
}
var To = bo, ie = To, mo = m, Ce = Object.prototype, jo = Ce.hasOwnProperty, So = Ce.propertyIsEnumerable, Co = ie(function() {
  return arguments;
}()) ? ie : function(e) {
  return mo(e) && jo.call(e, "callee") && !So.call(e, "callee");
}, Oo = Co, Ao = 9007199254740991;
function Po(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ao;
}
var Oe = Po, wo = ve, Io = Oe;
function xo(e) {
  return e != null && Io(e.length) && !wo(e);
}
var Mo = xo, G = { exports: {} };
function Do() {
  return !1;
}
var Eo = Do;
(function(e, r) {
  var t = u, a = Eo, n = r && !r.nodeType && r, o = n && !0 && e && !e.nodeType && e, c = o && o.exports === n, s = c ? t.Buffer : void 0, f = s ? s.isBuffer : void 0, p = f || a;
  e.exports = p;
})(G, G.exports);
var No = b, Go = Oe, Fo = m, Ko = "[object Arguments]", Uo = "[object Array]", zo = "[object Boolean]", Ho = "[object Date]", Vo = "[object Error]", Ro = "[object Function]", Bo = "[object Map]", Lo = "[object Number]", Wo = "[object Object]", qo = "[object RegExp]", Jo = "[object Set]", ko = "[object String]", Xo = "[object WeakMap]", Yo = "[object ArrayBuffer]", Zo = "[object DataView]", Qo = "[object Float32Array]", ei = "[object Float64Array]", ri = "[object Int8Array]", ti = "[object Int16Array]", ai = "[object Int32Array]", ni = "[object Uint8Array]", oi = "[object Uint8ClampedArray]", ii = "[object Uint16Array]", si = "[object Uint32Array]", i = {};
i[Qo] = i[ei] = i[ri] = i[ti] = i[ai] = i[ni] = i[oi] = i[ii] = i[si] = !0;
i[Ko] = i[Uo] = i[Yo] = i[zo] = i[Zo] = i[Ho] = i[Vo] = i[Ro] = i[Bo] = i[Lo] = i[Wo] = i[qo] = i[Jo] = i[ko] = i[Xo] = !1;
function ci(e) {
  return Fo(e) && Go(e.length) && !!i[No(e)];
}
var fi = ci;
function ui(e) {
  return function(r) {
    return e(r);
  };
}
var pi = ui, F = { exports: {} };
(function(e, r) {
  var t = ue, a = r && !r.nodeType && r, n = a && !0 && e && !e.nodeType && e, o = n && n.exports === a, c = o && t.process, s = function() {
    try {
      var f = n && n.require && n.require("util").types;
      return f || c && c.binding && c.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(F, F.exports);
var vi = fi, li = pi, se = F.exports, ce = se && se.isTypedArray, gi = ce ? li(ce) : vi, hi = gi, yi = Wn, $i = ho, _i = Oo, di = d, bi = Mo, Ti = G.exports, mi = je, ji = hi, Si = "[object Map]", Ci = "[object Set]", Oi = Object.prototype, Ai = Oi.hasOwnProperty;
function Pi(e) {
  if (e == null)
    return !0;
  if (bi(e) && (di(e) || typeof e == "string" || typeof e.splice == "function" || Ti(e) || ji(e) || _i(e)))
    return !e.length;
  var r = $i(e);
  if (r == Si || r == Ci)
    return !e.size;
  if (mi(e))
    return !yi(e).length;
  for (var t in e)
    if (Ai.call(e, t))
      return !1;
  return !0;
}
var wi = Pi;
function Ii(e, r) {
  var t = -1, a = e.length;
  for (r || (r = Array(a)); ++t < a; )
    r[t] = e[t];
  return r;
}
var xi = Ii, Mi = _e, Di = xi, Ei = d, Ni = j, Gi = $e, Fi = A, Ki = be;
function Ui(e) {
  return Ei(e) ? Mi(e, Fi) : Ni(e) ? [e] : Di(Gi(Ki(e)));
}
var fe = Ui;
const Vi = (e, r) => {
  const t = JSON.parse(JSON.stringify(e));
  return r.added.forEach((a) => {
    Z(t, a[0]);
  }), r.removed.forEach((a) => {
    const n = fe(a[0]);
    n.splice(-1);
    const o = sn(t, n);
    console.log({ ori: a[0].split("."), parentPartialPaths: n, parentValue: o }), typeof o == "object" && wi(o) && Z(t, n), console.log({ eaqui: a[0], valor: a[1], toPath: fe(a[0]) }), Dn(t, a[0], a[1], (c) => {
      console.log({ cafe: c });
      const s = a[0].split(".").pop();
      return s && s.includes("[") ? [] : c || {};
    });
  }), r.edited.forEach((a) => {
    In(t, a[0], a[1]);
  }), t;
};
export {
  Hi as addDynamicProperty,
  Vi as applyDeltaDiff,
  zi as getDiff,
  Ae as getEditedPaths,
  V as getPathsDiff,
  I as getStructPaths
};
