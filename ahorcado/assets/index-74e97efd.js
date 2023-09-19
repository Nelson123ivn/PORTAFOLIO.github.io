(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function Br(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const se = {},
  At = [],
  qe = () => {},
  qs = () => !1,
  Rs = /^on[^a-z]/,
  Bn = (e) => Rs.test(e),
  Nr = (e) => e.startsWith("onUpdate:"),
  he = Object.assign,
  Dr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Is = Object.prototype.hasOwnProperty,
  Y = (e, t) => Is.call(e, t),
  D = Array.isArray,
  Mt = (e) => Nn(e) === "[object Map]",
  Ci = (e) => Nn(e) === "[object Set]",
  K = (e) => typeof e == "function",
  ue = (e) => typeof e == "string",
  jr = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  Ei = (e) => le(e) && K(e.then) && K(e.catch),
  Ti = Object.prototype.toString,
  Nn = (e) => Ti.call(e),
  Bs = (e) => Nn(e).slice(8, -1),
  ki = (e) => Nn(e) === "[object Object]",
  Hr = (e) =>
    ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Cn = Br(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Dn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ns = /-(\w)/g,
  $t = Dn((e) => e.replace(Ns, (t, n) => (n ? n.toUpperCase() : ""))),
  Ds = /\B([A-Z])/g,
  Bt = Dn((e) => e.replace(Ds, "-$1").toLowerCase()),
  Pi = Dn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ir = Dn((e) => (e ? `on${Pi(e)}` : "")),
  tn = (e, t) => !Object.is(e, t),
  sr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  An = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  js = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Hs = (e) => {
    const t = ue(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let fo;
const _r = () =>
  fo ||
  (fo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function zr(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = ue(r) ? Ws(r) : zr(r);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else {
    if (ue(e)) return e;
    if (le(e)) return e;
  }
}
const zs = /;(?![^(]*\))/g,
  Ks = /:([^]+)/,
  Us = /\/\*[^]*?\*\//g;
function Ws(e) {
  const t = {};
  return (
    e
      .replace(Us, "")
      .split(zs)
      .forEach((n) => {
        if (n) {
          const r = n.split(Ks);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Kr(e) {
  let t = "";
  if (ue(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const r = Kr(e[n]);
      r && (t += r + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Vs =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Qs = Br(Vs);
function Si(e) {
  return !!e || e === "";
}
const zt = (e) =>
    ue(e)
      ? e
      : e == null
      ? ""
      : D(e) || (le(e) && (e.toString === Ti || !K(e.toString)))
      ? JSON.stringify(e, Li, 2)
      : String(e),
  Li = (e, t) =>
    t && t.__v_isRef
      ? Li(e, t.value)
      : Mt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : Ci(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : le(t) && !D(t) && !ki(t)
      ? String(t)
      : t;
let Me;
class Js {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Me),
      !t && Me && (this.index = (Me.scopes || (Me.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Me;
      try {
        return (Me = this), t();
      } finally {
        Me = n;
      }
    }
  }
  on() {
    Me = this;
  }
  off() {
    Me = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Ys(e, t = Me) {
  t && t.active && t.effects.push(e);
}
function Xs() {
  return Me;
}
const Ur = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ai = (e) => (e.w & ot) > 0,
  Mi = (e) => (e.n & ot) > 0,
  Zs = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ot;
  },
  Gs = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        Ai(o) && !Mi(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~ot),
          (o.n &= ~ot);
      }
      t.length = n;
    }
  },
  yr = new WeakMap();
let Wt = 0,
  ot = 1;
const wr = 30;
let Fe;
const mt = Symbol(""),
  xr = Symbol("");
class Wr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Ys(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Fe,
      n = nt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Fe),
        (Fe = this),
        (nt = !0),
        (ot = 1 << ++Wt),
        Wt <= wr ? Zs(this) : ho(this),
        this.fn()
      );
    } finally {
      Wt <= wr && Gs(this),
        (ot = 1 << --Wt),
        (Fe = this.parent),
        (nt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Fe === this
      ? (this.deferStop = !0)
      : this.active &&
        (ho(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ho(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let nt = !0;
const Oi = [];
function Nt() {
  Oi.push(nt), (nt = !1);
}
function Dt() {
  const e = Oi.pop();
  nt = e === void 0 ? !0 : e;
}
function xe(e, t, n) {
  if (nt && Fe) {
    let r = yr.get(e);
    r || yr.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = Ur())), Fi(o);
  }
}
function Fi(e, t) {
  let n = !1;
  Wt <= wr ? Mi(e) || ((e.n |= ot), (n = !Ai(e))) : (n = !e.has(Fe)),
    n && (e.add(Fe), Fe.deps.push(e));
}
function Ve(e, t, n, r, o, i) {
  const s = yr.get(e);
  if (!s) return;
  let l = [];
  if (t === "clear") l = [...s.values()];
  else if (n === "length" && D(e)) {
    const a = Number(r);
    s.forEach((u, h) => {
      (h === "length" || h >= a) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(s.get(n)), t)) {
      case "add":
        D(e)
          ? Hr(n) && l.push(s.get("length"))
          : (l.push(s.get(mt)), Mt(e) && l.push(s.get(xr)));
        break;
      case "delete":
        D(e) || (l.push(s.get(mt)), Mt(e) && l.push(s.get(xr)));
        break;
      case "set":
        Mt(e) && l.push(s.get(mt));
        break;
    }
  if (l.length === 1) l[0] && Cr(l[0]);
  else {
    const a = [];
    for (const u of l) u && a.push(...u);
    Cr(Ur(a));
  }
}
function Cr(e, t) {
  const n = D(e) ? e : [...e];
  for (const r of n) r.computed && po(r);
  for (const r of n) r.computed || po(r);
}
function po(e, t) {
  (e !== Fe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const el = Br("__proto__,__v_isRef,__isVue"),
  $i = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(jr)
  ),
  tl = Vr(),
  nl = Vr(!1, !0),
  rl = Vr(!0),
  go = ol();
function ol() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = Z(this);
        for (let i = 0, s = this.length; i < s; i++) xe(r, "get", i + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(Z)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Nt();
        const r = Z(this)[t].apply(this, n);
        return Dt(), r;
      };
    }),
    e
  );
}
function il(e) {
  const t = Z(this);
  return xe(t, "has", e), t.hasOwnProperty(e);
}
function Vr(e = !1, t = !1) {
  return function (r, o, i) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && i === (e ? (t ? wl : Ni) : t ? Bi : Ii).get(r))
      return r;
    const s = D(r);
    if (!e) {
      if (s && Y(go, o)) return Reflect.get(go, o, i);
      if (o === "hasOwnProperty") return il;
    }
    const l = Reflect.get(r, o, i);
    return (jr(o) ? $i.has(o) : el(o)) || (e || xe(r, "get", o), t)
      ? l
      : be(l)
      ? s && Hr(o)
        ? l
        : l.value
      : le(l)
      ? e
        ? Di(l)
        : dn(l)
      : l;
  };
}
const sl = qi(),
  ll = qi(!0);
function qi(e = !1) {
  return function (n, r, o, i) {
    let s = n[r];
    if (qt(s) && be(s) && !be(o)) return !1;
    if (
      !e &&
      (!Mn(o) && !qt(o) && ((s = Z(s)), (o = Z(o))), !D(n) && be(s) && !be(o))
    )
      return (s.value = o), !0;
    const l = D(n) && Hr(r) ? Number(r) < n.length : Y(n, r),
      a = Reflect.set(n, r, o, i);
    return (
      n === Z(i) && (l ? tn(o, s) && Ve(n, "set", r, o) : Ve(n, "add", r, o)), a
    );
  };
}
function al(e, t) {
  const n = Y(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Ve(e, "delete", t, void 0), r;
}
function cl(e, t) {
  const n = Reflect.has(e, t);
  return (!jr(t) || !$i.has(t)) && xe(e, "has", t), n;
}
function ul(e) {
  return xe(e, "iterate", D(e) ? "length" : mt), Reflect.ownKeys(e);
}
const Ri = { get: tl, set: sl, deleteProperty: al, has: cl, ownKeys: ul },
  fl = {
    get: rl,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  dl = he({}, Ri, { get: nl, set: ll }),
  Qr = (e) => e,
  jn = (e) => Reflect.getPrototypeOf(e);
function hn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = Z(e),
    i = Z(t);
  n || (t !== i && xe(o, "get", t), xe(o, "get", i));
  const { has: s } = jn(o),
    l = r ? Qr : n ? Xr : nn;
  if (s.call(o, t)) return l(e.get(t));
  if (s.call(o, i)) return l(e.get(i));
  e !== o && e.get(t);
}
function pn(e, t = !1) {
  const n = this.__v_raw,
    r = Z(n),
    o = Z(e);
  return (
    t || (e !== o && xe(r, "has", e), xe(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function gn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && xe(Z(e), "iterate", mt), Reflect.get(e, "size", e)
  );
}
function mo(e) {
  e = Z(e);
  const t = Z(this);
  return jn(t).has.call(t, e) || (t.add(e), Ve(t, "add", e, e)), this;
}
function vo(e, t) {
  t = Z(t);
  const n = Z(this),
    { has: r, get: o } = jn(n);
  let i = r.call(n, e);
  i || ((e = Z(e)), (i = r.call(n, e)));
  const s = o.call(n, e);
  return (
    n.set(e, t), i ? tn(t, s) && Ve(n, "set", e, t) : Ve(n, "add", e, t), this
  );
}
function bo(e) {
  const t = Z(this),
    { has: n, get: r } = jn(t);
  let o = n.call(t, e);
  o || ((e = Z(e)), (o = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return o && Ve(t, "delete", e, void 0), i;
}
function _o() {
  const e = Z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Ve(e, "clear", void 0, void 0), n;
}
function mn(e, t) {
  return function (r, o) {
    const i = this,
      s = i.__v_raw,
      l = Z(s),
      a = t ? Qr : e ? Xr : nn;
    return (
      !e && xe(l, "iterate", mt), s.forEach((u, h) => r.call(o, a(u), a(h), i))
    );
  };
}
function vn(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      i = Z(o),
      s = Mt(i),
      l = e === "entries" || (e === Symbol.iterator && s),
      a = e === "keys" && s,
      u = o[e](...r),
      h = n ? Qr : t ? Xr : nn;
    return (
      !t && xe(i, "iterate", a ? xr : mt),
      {
        next() {
          const { value: p, done: d } = u.next();
          return d
            ? { value: p, done: d }
            : { value: l ? [h(p[0]), h(p[1])] : h(p), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ze(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function hl() {
  const e = {
      get(i) {
        return hn(this, i);
      },
      get size() {
        return gn(this);
      },
      has: pn,
      add: mo,
      set: vo,
      delete: bo,
      clear: _o,
      forEach: mn(!1, !1),
    },
    t = {
      get(i) {
        return hn(this, i, !1, !0);
      },
      get size() {
        return gn(this);
      },
      has: pn,
      add: mo,
      set: vo,
      delete: bo,
      clear: _o,
      forEach: mn(!1, !0),
    },
    n = {
      get(i) {
        return hn(this, i, !0);
      },
      get size() {
        return gn(this, !0);
      },
      has(i) {
        return pn.call(this, i, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: mn(!0, !1),
    },
    r = {
      get(i) {
        return hn(this, i, !0, !0);
      },
      get size() {
        return gn(this, !0);
      },
      has(i) {
        return pn.call(this, i, !0);
      },
      add: Ze("add"),
      set: Ze("set"),
      delete: Ze("delete"),
      clear: Ze("clear"),
      forEach: mn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = vn(i, !1, !1)),
        (n[i] = vn(i, !0, !1)),
        (t[i] = vn(i, !1, !0)),
        (r[i] = vn(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [pl, gl, ml, vl] = hl();
function Jr(e, t) {
  const n = t ? (e ? vl : ml) : e ? gl : pl;
  return (r, o, i) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(Y(n, o) && o in r ? n : r, o, i);
}
const bl = { get: Jr(!1, !1) },
  _l = { get: Jr(!1, !0) },
  yl = { get: Jr(!0, !1) },
  Ii = new WeakMap(),
  Bi = new WeakMap(),
  Ni = new WeakMap(),
  wl = new WeakMap();
function xl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Cl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xl(Bs(e));
}
function dn(e) {
  return qt(e) ? e : Yr(e, !1, Ri, bl, Ii);
}
function El(e) {
  return Yr(e, !1, dl, _l, Bi);
}
function Di(e) {
  return Yr(e, !0, fl, yl, Ni);
}
function Yr(e, t, n, r, o) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = o.get(e);
  if (i) return i;
  const s = Cl(e);
  if (s === 0) return e;
  const l = new Proxy(e, s === 2 ? r : n);
  return o.set(e, l), l;
}
function Ot(e) {
  return qt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function qt(e) {
  return !!(e && e.__v_isReadonly);
}
function Mn(e) {
  return !!(e && e.__v_isShallow);
}
function ji(e) {
  return Ot(e) || qt(e);
}
function Z(e) {
  const t = e && e.__v_raw;
  return t ? Z(t) : e;
}
function Hn(e) {
  return An(e, "__v_skip", !0), e;
}
const nn = (e) => (le(e) ? dn(e) : e),
  Xr = (e) => (le(e) ? Di(e) : e);
function Hi(e) {
  nt && Fe && ((e = Z(e)), Fi(e.dep || (e.dep = Ur())));
}
function zi(e, t) {
  e = Z(e);
  const n = e.dep;
  n && Cr(n);
}
function be(e) {
  return !!(e && e.__v_isRef === !0);
}
function ce(e) {
  return Tl(e, !1);
}
function Tl(e, t) {
  return be(e) ? e : new kl(e, t);
}
class kl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Z(t)),
      (this._value = n ? t : nn(t));
  }
  get value() {
    return Hi(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Mn(t) || qt(t);
    (t = n ? t : Z(t)),
      tn(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : nn(t)), zi(this));
  }
}
function En(e) {
  return be(e) ? e.value : e;
}
const Pl = {
  get: (e, t, n) => En(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return be(o) && !be(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Ki(e) {
  return Ot(e) ? e : new Proxy(e, Pl);
}
class Sl {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Wr(t, () => {
        this._dirty || ((this._dirty = !0), zi(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = Z(this);
    return (
      Hi(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ll(e, t, n = !1) {
  let r, o;
  const i = K(e);
  return (
    i ? ((r = e), (o = qe)) : ((r = e.get), (o = e.set)),
    new Sl(r, o, i || !o, n)
  );
}
function rt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (i) {
    zn(i, t, n);
  }
  return o;
}
function Le(e, t, n, r) {
  if (K(e)) {
    const i = rt(e, t, n, r);
    return (
      i &&
        Ei(i) &&
        i.catch((s) => {
          zn(s, t, n);
        }),
      i
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(Le(e[i], t, n, r));
  return o;
}
function zn(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const s = t.proxy,
      l = n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, s, l) === !1) return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      rt(a, null, 10, [e, s, l]);
      return;
    }
  }
  Al(e, n, o, r);
}
function Al(e, t, n, r = !0) {
  console.error(e);
}
let rn = !1,
  Er = !1;
const ve = [];
let ze = 0;
const Ft = [];
let We = null,
  dt = 0;
const Ui = Promise.resolve();
let Zr = null;
function On(e) {
  const t = Zr || Ui;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ml(e) {
  let t = ze + 1,
    n = ve.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    on(ve[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Gr(e) {
  (!ve.length || !ve.includes(e, rn && e.allowRecurse ? ze + 1 : ze)) &&
    (e.id == null ? ve.push(e) : ve.splice(Ml(e.id), 0, e), Wi());
}
function Wi() {
  !rn && !Er && ((Er = !0), (Zr = Ui.then(Qi)));
}
function Ol(e) {
  const t = ve.indexOf(e);
  t > ze && ve.splice(t, 1);
}
function Fl(e) {
  D(e)
    ? Ft.push(...e)
    : (!We || !We.includes(e, e.allowRecurse ? dt + 1 : dt)) && Ft.push(e),
    Wi();
}
function yo(e, t = rn ? ze + 1 : 0) {
  for (; t < ve.length; t++) {
    const n = ve[t];
    n && n.pre && (ve.splice(t, 1), t--, n());
  }
}
function Vi(e) {
  if (Ft.length) {
    const t = [...new Set(Ft)];
    if (((Ft.length = 0), We)) {
      We.push(...t);
      return;
    }
    for (We = t, We.sort((n, r) => on(n) - on(r)), dt = 0; dt < We.length; dt++)
      We[dt]();
    (We = null), (dt = 0);
  }
}
const on = (e) => (e.id == null ? 1 / 0 : e.id),
  $l = (e, t) => {
    const n = on(e) - on(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Qi(e) {
  (Er = !1), (rn = !0), ve.sort($l);
  const t = qe;
  try {
    for (ze = 0; ze < ve.length; ze++) {
      const n = ve[ze];
      n && n.active !== !1 && rt(n, null, 14);
    }
  } finally {
    (ze = 0),
      (ve.length = 0),
      Vi(),
      (rn = !1),
      (Zr = null),
      (ve.length || Ft.length) && Qi();
  }
}
function ql(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || se;
  let o = n;
  const i = t.startsWith("update:"),
    s = i && t.slice(7);
  if (s && s in r) {
    const h = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: p, trim: d } = r[h] || se;
    d && (o = n.map((_) => (ue(_) ? _.trim() : _))), p && (o = n.map(js));
  }
  let l,
    a = r[(l = ir(t))] || r[(l = ir($t(t)))];
  !a && i && (a = r[(l = ir(Bt(t)))]), a && Le(a, e, 6, o);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Le(u, e, 6, o);
  }
}
function Ji(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let s = {},
    l = !1;
  if (!K(e)) {
    const a = (u) => {
      const h = Ji(u, t, !0);
      h && ((l = !0), he(s, h));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !i && !l
    ? (le(e) && r.set(e, null), null)
    : (D(i) ? i.forEach((a) => (s[a] = null)) : he(s, i),
      le(e) && r.set(e, s),
      s);
}
function Kn(e, t) {
  return !e || !Bn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Bt(t)) || Y(e, t));
}
let Se = null,
  Un = null;
function Fn(e) {
  const t = Se;
  return (Se = e), (Un = (e && e.type.__scopeId) || null), t;
}
function Rl(e) {
  Un = e;
}
function Il() {
  Un = null;
}
function Vt(e, t = Se, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Oo(-1);
    const i = Fn(t);
    let s;
    try {
      s = e(...o);
    } finally {
      Fn(i), r._d && Oo(1);
    }
    return s;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function lr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: i,
    propsOptions: [s],
    slots: l,
    attrs: a,
    emit: u,
    render: h,
    renderCache: p,
    data: d,
    setupState: _,
    ctx: x,
    inheritAttrs: E,
  } = e;
  let P, I;
  const S = Fn(e);
  try {
    if (n.shapeFlag & 4) {
      const A = o || r;
      (P = He(h.call(A, A, p, i, _, d, x))), (I = a);
    } else {
      const A = t;
      (P = He(
        A.length > 1 ? A(i, { attrs: a, slots: l, emit: u }) : A(i, null)
      )),
        (I = t.props ? a : Bl(a));
    }
  } catch (A) {
    (en.length = 0), zn(A, e, 1), (P = pe(Re));
  }
  let j = P;
  if (I && E !== !1) {
    const A = Object.keys(I),
      { shapeFlag: B } = j;
    A.length && B & 7 && (s && A.some(Nr) && (I = Nl(I, s)), (j = it(j, I)));
  }
  return (
    n.dirs && ((j = it(j)), (j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (j.transition = n.transition),
    (P = j),
    Fn(S),
    P
  );
}
const Bl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Bn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Nl = (e, t) => {
    const n = {};
    for (const r in e) (!Nr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Dl(e, t, n) {
  const { props: r, children: o, component: i } = e,
    { props: s, children: l, patchFlag: a } = t,
    u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? wo(r, s, u) : !!s;
    if (a & 8) {
      const h = t.dynamicProps;
      for (let p = 0; p < h.length; p++) {
        const d = h[p];
        if (s[d] !== r[d] && !Kn(u, d)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : r === s
      ? !1
      : r
      ? s
        ? wo(r, s, u)
        : !0
      : !!s;
  return !1;
}
function wo(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !Kn(n, i)) return !0;
  }
  return !1;
}
function jl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Hl = (e) => e.__isSuspense;
function zl(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Fl(e);
}
const bn = {};
function vt(e, t, n) {
  return Yi(e, t, n);
}
function Yi(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: s } = se
) {
  var l;
  const a = Xs() === ((l = ge) == null ? void 0 : l.scope) ? ge : null;
  let u,
    h = !1,
    p = !1;
  if (
    (be(e)
      ? ((u = () => e.value), (h = Mn(e)))
      : Ot(e)
      ? ((u = () => e), (r = !0))
      : D(e)
      ? ((p = !0),
        (h = e.some((A) => Ot(A) || Mn(A))),
        (u = () =>
          e.map((A) => {
            if (be(A)) return A.value;
            if (Ot(A)) return gt(A);
            if (K(A)) return rt(A, a, 2);
          })))
      : K(e)
      ? t
        ? (u = () => rt(e, a, 2))
        : (u = () => {
            if (!(a && a.isUnmounted)) return d && d(), Le(e, a, 3, [_]);
          })
      : (u = qe),
    t && r)
  ) {
    const A = u;
    u = () => gt(A());
  }
  let d,
    _ = (A) => {
      d = S.onStop = () => {
        rt(A, a, 4);
      };
    },
    x;
  if (ln)
    if (
      ((_ = qe),
      t ? n && Le(t, a, 3, [u(), p ? [] : void 0, _]) : u(),
      o === "sync")
    ) {
      const A = ja();
      x = A.__watcherHandles || (A.__watcherHandles = []);
    } else return qe;
  let E = p ? new Array(e.length).fill(bn) : bn;
  const P = () => {
    if (S.active)
      if (t) {
        const A = S.run();
        (r || h || (p ? A.some((B, V) => tn(B, E[V])) : tn(A, E))) &&
          (d && d(),
          Le(t, a, 3, [A, E === bn ? void 0 : p && E[0] === bn ? [] : E, _]),
          (E = A));
      } else S.run();
  };
  P.allowRecurse = !!t;
  let I;
  o === "sync"
    ? (I = P)
    : o === "post"
    ? (I = () => ye(P, a && a.suspense))
    : ((P.pre = !0), a && (P.id = a.uid), (I = () => Gr(P)));
  const S = new Wr(u, I);
  t
    ? n
      ? P()
      : (E = S.run())
    : o === "post"
    ? ye(S.run.bind(S), a && a.suspense)
    : S.run();
  const j = () => {
    S.stop(), a && a.scope && Dr(a.scope.effects, S);
  };
  return x && x.push(j), j;
}
function Kl(e, t, n) {
  const r = this.proxy,
    o = ue(e) ? (e.includes(".") ? Xi(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  K(t) ? (i = t) : ((i = t.handler), (n = t));
  const s = ge;
  Rt(this);
  const l = Yi(o, i.bind(r), n);
  return s ? Rt(s) : bt(), l;
}
function Xi(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function gt(e, t) {
  if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), be(e))) gt(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) gt(e[n], t);
  else if (Ci(e) || Mt(e))
    e.forEach((n) => {
      gt(n, t);
    });
  else if (ki(e)) for (const n in e) gt(e[n], t);
  return e;
}
function Zi(e, t) {
  const n = Se;
  if (n === null) return e;
  const r = Xn(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, l, a, u = se] = t[i];
    s &&
      (K(s) && (s = { mounted: s, updated: s }),
      s.deep && gt(l),
      o.push({
        dir: s,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: u,
      }));
  }
  return e;
}
function st(e, t, n, r) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let s = 0; s < o.length; s++) {
    const l = o[s];
    i && (l.oldValue = i[s].value);
    let a = l.dir[r];
    a && (Nt(), Le(a, n, 8, [e.el, l, e, t]), Dt());
  }
}
function Ul() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Qn(() => {
      e.isMounted = !0;
    }),
    xt(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Te = [Function, Array],
  Gi = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Te,
    onEnter: Te,
    onAfterEnter: Te,
    onEnterCancelled: Te,
    onBeforeLeave: Te,
    onLeave: Te,
    onAfterLeave: Te,
    onLeaveCancelled: Te,
    onBeforeAppear: Te,
    onAppear: Te,
    onAfterAppear: Te,
    onAppearCancelled: Te,
  },
  Wl = {
    name: "BaseTransition",
    props: Gi,
    setup(e, { slots: t }) {
      const n = Je(),
        r = Ul();
      let o;
      return () => {
        const i = t.default && ts(t.default(), !0);
        if (!i || !i.length) return;
        let s = i[0];
        if (i.length > 1) {
          for (const E of i)
            if (E.type !== Re) {
              s = E;
              break;
            }
        }
        const l = Z(e),
          { mode: a } = l;
        if (r.isLeaving) return ar(s);
        const u = xo(s);
        if (!u) return ar(s);
        const h = Tr(u, l, r, n);
        kr(u, h);
        const p = n.subTree,
          d = p && xo(p);
        let _ = !1;
        const { getTransitionKey: x } = u.type;
        if (x) {
          const E = x();
          o === void 0 ? (o = E) : E !== o && ((o = E), (_ = !0));
        }
        if (d && d.type !== Re && (!ht(u, d) || _)) {
          const E = Tr(d, l, r, n);
          if ((kr(d, E), a === "out-in"))
            return (
              (r.isLeaving = !0),
              (E.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              ar(s)
            );
          a === "in-out" &&
            u.type !== Re &&
            (E.delayLeave = (P, I, S) => {
              const j = es(r, d);
              (j[String(d.key)] = d),
                (P._leaveCb = () => {
                  I(), (P._leaveCb = void 0), delete h.delayedLeave;
                }),
                (h.delayedLeave = S);
            });
        }
        return s;
      };
    },
  },
  Vl = Wl;
function es(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Tr(e, t, n, r) {
  const {
      appear: o,
      mode: i,
      persisted: s = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: h,
      onBeforeLeave: p,
      onLeave: d,
      onAfterLeave: _,
      onLeaveCancelled: x,
      onBeforeAppear: E,
      onAppear: P,
      onAfterAppear: I,
      onAppearCancelled: S,
    } = t,
    j = String(e.key),
    A = es(n, e),
    B = (O, M) => {
      O && Le(O, r, 9, M);
    },
    V = (O, M) => {
      const N = M[1];
      B(O, M),
        D(O) ? O.every(($) => $.length <= 1) && N() : O.length <= 1 && N();
    },
    U = {
      mode: i,
      persisted: s,
      beforeEnter(O) {
        let M = l;
        if (!n.isMounted)
          if (o) M = E || l;
          else return;
        O._leaveCb && O._leaveCb(!0);
        const N = A[j];
        N && ht(e, N) && N.el._leaveCb && N.el._leaveCb(), B(M, [O]);
      },
      enter(O) {
        let M = a,
          N = u,
          $ = h;
        if (!n.isMounted)
          if (o) (M = P || a), (N = I || u), ($ = S || h);
          else return;
        let T = !1;
        const Q = (O._enterCb = (L) => {
          T ||
            ((T = !0),
            L ? B($, [O]) : B(N, [O]),
            U.delayedLeave && U.delayedLeave(),
            (O._enterCb = void 0));
        });
        M ? V(M, [O, Q]) : Q();
      },
      leave(O, M) {
        const N = String(e.key);
        if ((O._enterCb && O._enterCb(!0), n.isUnmounting)) return M();
        B(p, [O]);
        let $ = !1;
        const T = (O._leaveCb = (Q) => {
          $ ||
            (($ = !0),
            M(),
            Q ? B(x, [O]) : B(_, [O]),
            (O._leaveCb = void 0),
            A[N] === e && delete A[N]);
        });
        (A[N] = e), d ? V(d, [O, T]) : T();
      },
      clone(O) {
        return Tr(O, t, n, r);
      },
    };
  return U;
}
function ar(e) {
  if (Wn(e)) return (e = it(e)), (e.children = null), e;
}
function xo(e) {
  return Wn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function kr(e, t) {
  e.shapeFlag & 6 && e.component
    ? kr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ts(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    const l = n == null ? s.key : String(n) + String(s.key != null ? s.key : i);
    s.type === we
      ? (s.patchFlag & 128 && o++, (r = r.concat(ts(s.children, t, l))))
      : (t || s.type !== Re) && r.push(l != null ? it(s, { key: l }) : s);
  }
  if (o > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
function Ql(e, t) {
  return K(e) ? (() => he({ name: e.name }, t, { setup: e }))() : e;
}
const Tn = (e) => !!e.type.__asyncLoader,
  Wn = (e) => e.type.__isKeepAlive;
function Jl(e, t) {
  ns(e, "a", t);
}
function eo(e, t) {
  ns(e, "da", t);
}
function ns(e, t, n = ge) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Vn(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      Wn(o.parent.vnode) && Yl(r, t, n, o), (o = o.parent);
  }
}
function Yl(e, t, n, r) {
  const o = Vn(t, e, r, !0);
  to(() => {
    Dr(r[t], o);
  }, n);
}
function Vn(e, t, n = ge, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...s) => {
          if (n.isUnmounted) return;
          Nt(), Rt(n);
          const l = Le(t, n, e, s);
          return bt(), Dt(), l;
        });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const Qe =
    (e) =>
    (t, n = ge) =>
      (!ln || e === "sp") && Vn(e, (...r) => t(...r), n),
  Xl = Qe("bm"),
  Qn = Qe("m"),
  Zl = Qe("bu"),
  Gl = Qe("u"),
  xt = Qe("bum"),
  to = Qe("um"),
  ea = Qe("sp"),
  ta = Qe("rtg"),
  na = Qe("rtc");
function ra(e, t = ge) {
  Vn("ec", e, t);
}
const oa = Symbol.for("v-ndc");
function _n(e, t, n, r) {
  let o;
  const i = n && n[r];
  if (D(e) || ue(e)) {
    o = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      o[s] = t(e[s], s, void 0, i && i[s]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let s = 0; s < e; s++) o[s] = t(s + 1, s, void 0, i && i[s]);
  } else if (le(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (s, l) => t(s, l, void 0, i && i[l]));
    else {
      const s = Object.keys(e);
      o = new Array(s.length);
      for (let l = 0, a = s.length; l < a; l++) {
        const u = s[l];
        o[l] = t(e[u], u, l, i && i[l]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
const Pr = (e) => (e ? (hs(e) ? Xn(e) || e.proxy : Pr(e.parent)) : null),
  Zt = he(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Pr(e.parent),
    $root: (e) => Pr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => no(e),
    $forceUpdate: (e) => e.f || (e.f = () => Gr(e.update)),
    $nextTick: (e) => e.n || (e.n = On.bind(e.proxy)),
    $watch: (e) => Kl.bind(e),
  }),
  cr = (e, t) => e !== se && !e.__isScriptSetup && Y(e, t),
  ia = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: i,
        accessCache: s,
        type: l,
        appContext: a,
      } = e;
      let u;
      if (t[0] !== "$") {
        const _ = s[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (cr(r, t)) return (s[t] = 1), r[t];
          if (o !== se && Y(o, t)) return (s[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && Y(u, t)) return (s[t] = 3), i[t];
          if (n !== se && Y(n, t)) return (s[t] = 4), n[t];
          Sr && (s[t] = 0);
        }
      }
      const h = Zt[t];
      let p, d;
      if (h) return t === "$attrs" && xe(e, "get", t), h(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== se && Y(n, t)) return (s[t] = 4), n[t];
      if (((d = a.config.globalProperties), Y(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: i } = e;
      return cr(o, t)
        ? ((o[t] = n), !0)
        : r !== se && Y(r, t)
        ? ((r[t] = n), !0)
        : Y(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: i,
        },
      },
      s
    ) {
      let l;
      return (
        !!n[s] ||
        (e !== se && Y(e, s)) ||
        cr(t, s) ||
        ((l = i[0]) && Y(l, s)) ||
        Y(r, s) ||
        Y(Zt, s) ||
        Y(o.config.globalProperties, s)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Y(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Co(e) {
  return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Sr = !0;
function sa(e) {
  const t = no(e),
    n = e.proxy,
    r = e.ctx;
  (Sr = !1), t.beforeCreate && Eo(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: s,
    watch: l,
    provide: a,
    inject: u,
    created: h,
    beforeMount: p,
    mounted: d,
    beforeUpdate: _,
    updated: x,
    activated: E,
    deactivated: P,
    beforeDestroy: I,
    beforeUnmount: S,
    destroyed: j,
    unmounted: A,
    render: B,
    renderTracked: V,
    renderTriggered: U,
    errorCaptured: O,
    serverPrefetch: M,
    expose: N,
    inheritAttrs: $,
    components: T,
    directives: Q,
    filters: L,
  } = t;
  if ((u && la(u, r, null), s))
    for (const re in s) {
      const G = s[re];
      K(G) && (r[re] = G.bind(n));
    }
  if (o) {
    const re = o.call(n, n);
    le(re) && (e.data = dn(re));
  }
  if (((Sr = !0), i))
    for (const re in i) {
      const G = i[re],
        Ie = K(G) ? G.bind(n, n) : K(G.get) ? G.get.bind(n, n) : qe,
        Ye = !K(G) && K(G.set) ? G.set.bind(n) : qe,
        Ke = H({ get: Ie, set: Ye });
      Object.defineProperty(r, re, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Ee) => (Ke.value = Ee),
      });
    }
  if (l) for (const re in l) rs(l[re], r, n, re);
  if (a) {
    const re = K(a) ? a.call(n) : a;
    Reflect.ownKeys(re).forEach((G) => {
      ha(G, re[G]);
    });
  }
  h && Eo(h, e, "c");
  function ee(re, G) {
    D(G) ? G.forEach((Ie) => re(Ie.bind(n))) : G && re(G.bind(n));
  }
  if (
    (ee(Xl, p),
    ee(Qn, d),
    ee(Zl, _),
    ee(Gl, x),
    ee(Jl, E),
    ee(eo, P),
    ee(ra, O),
    ee(na, V),
    ee(ta, U),
    ee(xt, S),
    ee(to, A),
    ee(ea, M),
    D(N))
  )
    if (N.length) {
      const re = e.exposed || (e.exposed = {});
      N.forEach((G) => {
        Object.defineProperty(re, G, {
          get: () => n[G],
          set: (Ie) => (n[G] = Ie),
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === qe && (e.render = B),
    $ != null && (e.inheritAttrs = $),
    T && (e.components = T),
    Q && (e.directives = Q);
}
function la(e, t, n = qe) {
  D(e) && (e = Lr(e));
  for (const r in e) {
    const o = e[r];
    let i;
    le(o)
      ? "default" in o
        ? (i = kn(o.from || r, o.default, !0))
        : (i = kn(o.from || r))
      : (i = kn(o)),
      be(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (s) => (i.value = s),
          })
        : (t[r] = i);
  }
}
function Eo(e, t, n) {
  Le(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function rs(e, t, n, r) {
  const o = r.includes(".") ? Xi(n, r) : () => n[r];
  if (ue(e)) {
    const i = t[e];
    K(i) && vt(o, i);
  } else if (K(e)) vt(o, e.bind(n));
  else if (le(e))
    if (D(e)) e.forEach((i) => rs(i, t, n, r));
    else {
      const i = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(i) && vt(o, i, e);
    }
}
function no(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    l = i.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !o.length && !n && !r
      ? (a = t)
      : ((a = {}), o.length && o.forEach((u) => $n(a, u, s, !0)), $n(a, t, s)),
    le(t) && i.set(t, a),
    a
  );
}
function $n(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && $n(e, i, n, !0), o && o.forEach((s) => $n(e, s, n, !0));
  for (const s in t)
    if (!(r && s === "expose")) {
      const l = aa[s] || (n && n[s]);
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const aa = {
  data: To,
  props: ko,
  emits: ko,
  methods: Qt,
  computed: Qt,
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  components: Qt,
  directives: Qt,
  watch: ua,
  provide: To,
  inject: ca,
};
function To(e, t) {
  return t
    ? e
      ? function () {
          return he(
            K(e) ? e.call(this, this) : e,
            K(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ca(e, t) {
  return Qt(Lr(e), Lr(t));
}
function Lr(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? he(Object.create(null), e, t) : t;
}
function ko(e, t) {
  return e
    ? D(e) && D(t)
      ? [...new Set([...e, ...t])]
      : he(Object.create(null), Co(e), Co(t ?? {}))
    : t;
}
function ua(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = he(Object.create(null), e);
  for (const r in t) n[r] = _e(e[r], t[r]);
  return n;
}
function os() {
  return {
    app: null,
    config: {
      isNativeTag: qs,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let fa = 0;
function da(e, t) {
  return function (r, o = null) {
    K(r) || (r = he({}, r)), o != null && !le(o) && (o = null);
    const i = os(),
      s = new Set();
    let l = !1;
    const a = (i.app = {
      _uid: fa++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Ha,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...h) {
        return (
          s.has(u) ||
            (u && K(u.install)
              ? (s.add(u), u.install(a, ...h))
              : K(u) && (s.add(u), u(a, ...h))),
          a
        );
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), a;
      },
      component(u, h) {
        return h ? ((i.components[u] = h), a) : i.components[u];
      },
      directive(u, h) {
        return h ? ((i.directives[u] = h), a) : i.directives[u];
      },
      mount(u, h, p) {
        if (!l) {
          const d = pe(r, o);
          return (
            (d.appContext = i),
            h && t ? t(d, u) : e(d, u, p),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Xn(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, h) {
        return (i.provides[u] = h), a;
      },
      runWithContext(u) {
        qn = a;
        try {
          return u();
        } finally {
          qn = null;
        }
      },
    });
    return a;
  };
}
let qn = null;
function ha(e, t) {
  if (ge) {
    let n = ge.provides;
    const r = ge.parent && ge.parent.provides;
    r === n && (n = ge.provides = Object.create(r)), (n[e] = t);
  }
}
function kn(e, t, n = !1) {
  const r = ge || Se;
  if (r || qn) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : qn._context.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && K(t) ? t.call(r && r.proxy) : t;
  }
}
function pa(e, t, n, r = !1) {
  const o = {},
    i = {};
  An(i, Yn, 1), (e.propsDefaults = Object.create(null)), is(e, t, o, i);
  for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
  n ? (e.props = r ? o : El(o)) : e.type.props ? (e.props = o) : (e.props = i),
    (e.attrs = i);
}
function ga(e, t, n, r) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: s },
    } = e,
    l = Z(o),
    [a] = e.propsOptions;
  let u = !1;
  if ((r || s > 0) && !(s & 16)) {
    if (s & 8) {
      const h = e.vnode.dynamicProps;
      for (let p = 0; p < h.length; p++) {
        let d = h[p];
        if (Kn(e.emitsOptions, d)) continue;
        const _ = t[d];
        if (a)
          if (Y(i, d)) _ !== i[d] && ((i[d] = _), (u = !0));
          else {
            const x = $t(d);
            o[x] = Ar(a, l, x, _, e, !1);
          }
        else _ !== i[d] && ((i[d] = _), (u = !0));
      }
    }
  } else {
    is(e, t, o, i) && (u = !0);
    let h;
    for (const p in l)
      (!t || (!Y(t, p) && ((h = Bt(p)) === p || !Y(t, h)))) &&
        (a
          ? n &&
            (n[p] !== void 0 || n[h] !== void 0) &&
            (o[p] = Ar(a, l, p, void 0, e, !0))
          : delete o[p]);
    if (i !== l) for (const p in i) (!t || !Y(t, p)) && (delete i[p], (u = !0));
  }
  u && Ve(e, "set", "$attrs");
}
function is(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let s = !1,
    l;
  if (t)
    for (let a in t) {
      if (Cn(a)) continue;
      const u = t[a];
      let h;
      o && Y(o, (h = $t(a)))
        ? !i || !i.includes(h)
          ? (n[h] = u)
          : ((l || (l = {}))[h] = u)
        : Kn(e.emitsOptions, a) ||
          ((!(a in r) || u !== r[a]) && ((r[a] = u), (s = !0)));
    }
  if (i) {
    const a = Z(n),
      u = l || se;
    for (let h = 0; h < i.length; h++) {
      const p = i[h];
      n[p] = Ar(o, a, p, u[p], e, !Y(u, p));
    }
  }
  return s;
}
function Ar(e, t, n, r, o, i) {
  const s = e[n];
  if (s != null) {
    const l = Y(s, "default");
    if (l && r === void 0) {
      const a = s.default;
      if (s.type !== Function && !s.skipFactory && K(a)) {
        const { propsDefaults: u } = o;
        n in u ? (r = u[n]) : (Rt(o), (r = u[n] = a.call(null, t)), bt());
      } else r = a;
    }
    s[0] &&
      (i && !l ? (r = !1) : s[1] && (r === "" || r === Bt(n)) && (r = !0));
  }
  return r;
}
function ss(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const i = e.props,
    s = {},
    l = [];
  let a = !1;
  if (!K(e)) {
    const h = (p) => {
      a = !0;
      const [d, _] = ss(p, t, !0);
      he(s, d), _ && l.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!i && !a) return le(e) && r.set(e, At), At;
  if (D(i))
    for (let h = 0; h < i.length; h++) {
      const p = $t(i[h]);
      Po(p) && (s[p] = se);
    }
  else if (i)
    for (const h in i) {
      const p = $t(h);
      if (Po(p)) {
        const d = i[h],
          _ = (s[p] = D(d) || K(d) ? { type: d } : he({}, d));
        if (_) {
          const x = Ao(Boolean, _.type),
            E = Ao(String, _.type);
          (_[0] = x > -1),
            (_[1] = E < 0 || x < E),
            (x > -1 || Y(_, "default")) && l.push(p);
        }
      }
    }
  const u = [s, l];
  return le(e) && r.set(e, u), u;
}
function Po(e) {
  return e[0] !== "$";
}
function So(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Lo(e, t) {
  return So(e) === So(t);
}
function Ao(e, t) {
  return D(t) ? t.findIndex((n) => Lo(n, e)) : K(t) && Lo(t, e) ? 0 : -1;
}
const ls = (e) => e[0] === "_" || e === "$stable",
  ro = (e) => (D(e) ? e.map(He) : [He(e)]),
  ma = (e, t, n) => {
    if (t._n) return t;
    const r = Vt((...o) => ro(t(...o)), n);
    return (r._c = !1), r;
  },
  as = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (ls(o)) continue;
      const i = e[o];
      if (K(i)) t[o] = ma(o, i, r);
      else if (i != null) {
        const s = ro(i);
        t[o] = () => s;
      }
    }
  },
  cs = (e, t) => {
    const n = ro(t);
    e.slots.default = () => n;
  },
  va = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = Z(t)), An(t, "_", n)) : as(t, (e.slots = {}));
    } else (e.slots = {}), t && cs(e, t);
    An(e.slots, Yn, 1);
  },
  ba = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let i = !0,
      s = se;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (he(o, t), !n && l === 1 && delete o._)
        : ((i = !t.$stable), as(t, o)),
        (s = t);
    } else t && (cs(e, t), (s = { default: 1 }));
    if (i) for (const l in o) !ls(l) && !(l in s) && delete o[l];
  };
function Mr(e, t, n, r, o = !1) {
  if (D(e)) {
    e.forEach((d, _) => Mr(d, t && (D(t) ? t[_] : t), n, r, o));
    return;
  }
  if (Tn(r) && !o) return;
  const i = r.shapeFlag & 4 ? Xn(r.component) || r.component.proxy : r.el,
    s = o ? null : i,
    { i: l, r: a } = e,
    u = t && t.r,
    h = l.refs === se ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (u != null &&
      u !== a &&
      (ue(u)
        ? ((h[u] = null), Y(p, u) && (p[u] = null))
        : be(u) && (u.value = null)),
    K(a))
  )
    rt(a, l, 12, [s, h]);
  else {
    const d = ue(a),
      _ = be(a);
    if (d || _) {
      const x = () => {
        if (e.f) {
          const E = d ? (Y(p, a) ? p[a] : h[a]) : a.value;
          o
            ? D(E) && Dr(E, i)
            : D(E)
            ? E.includes(i) || E.push(i)
            : d
            ? ((h[a] = [i]), Y(p, a) && (p[a] = h[a]))
            : ((a.value = [i]), e.k && (h[e.k] = a.value));
        } else
          d
            ? ((h[a] = s), Y(p, a) && (p[a] = s))
            : _ && ((a.value = s), e.k && (h[e.k] = s));
      };
      s ? ((x.id = -1), ye(x, n)) : x();
    }
  }
}
const ye = zl;
function _a(e) {
  return ya(e);
}
function ya(e, t) {
  const n = _r();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: i,
      createElement: s,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: h,
      parentNode: p,
      nextSibling: d,
      setScopeId: _ = qe,
      insertStaticContent: x,
    } = e,
    E = (
      c,
      f,
      g,
      v = null,
      m = null,
      w = null,
      k = !1,
      y = null,
      C = !!f.dynamicChildren
    ) => {
      if (c === f) return;
      c && !ht(c, f) && ((v = Xe(c)), Ee(c, m, w, !0), (c = null)),
        f.patchFlag === -2 && ((C = !1), (f.dynamicChildren = null));
      const { type: b, ref: q, shapeFlag: F } = f;
      switch (b) {
        case Jn:
          P(c, f, g, v);
          break;
        case Re:
          I(c, f, g, v);
          break;
        case ur:
          c == null && S(f, g, v, k);
          break;
        case we:
          T(c, f, g, v, m, w, k, y, C);
          break;
        default:
          F & 1
            ? B(c, f, g, v, m, w, k, y, C)
            : F & 6
            ? Q(c, f, g, v, m, w, k, y, C)
            : (F & 64 || F & 128) && b.process(c, f, g, v, m, w, k, y, C, Be);
      }
      q != null && m && Mr(q, c && c.ref, w, f || c, !f);
    },
    P = (c, f, g, v) => {
      if (c == null) r((f.el = l(f.children)), g, v);
      else {
        const m = (f.el = c.el);
        f.children !== c.children && u(m, f.children);
      }
    },
    I = (c, f, g, v) => {
      c == null ? r((f.el = a(f.children || "")), g, v) : (f.el = c.el);
    },
    S = (c, f, g, v) => {
      [c.el, c.anchor] = x(c.children, f, g, v, c.el, c.anchor);
    },
    j = ({ el: c, anchor: f }, g, v) => {
      let m;
      for (; c && c !== f; ) (m = d(c)), r(c, g, v), (c = m);
      r(f, g, v);
    },
    A = ({ el: c, anchor: f }) => {
      let g;
      for (; c && c !== f; ) (g = d(c)), o(c), (c = g);
      o(f);
    },
    B = (c, f, g, v, m, w, k, y, C) => {
      (k = k || f.type === "svg"),
        c == null ? V(f, g, v, m, w, k, y, C) : M(c, f, m, w, k, y, C);
    },
    V = (c, f, g, v, m, w, k, y) => {
      let C, b;
      const { type: q, props: F, shapeFlag: R, transition: z, dirs: W } = c;
      if (
        ((C = c.el = s(c.type, w, F && F.is, F)),
        R & 8
          ? h(C, c.children)
          : R & 16 &&
            O(c.children, C, null, v, m, w && q !== "foreignObject", k, y),
        W && st(c, null, v, "created"),
        U(C, c, c.scopeId, k, v),
        F)
      ) {
        for (const ne in F)
          ne !== "value" &&
            !Cn(ne) &&
            i(C, ne, null, F[ne], w, c.children, v, m, oe);
        "value" in F && i(C, "value", null, F.value),
          (b = F.onVnodeBeforeMount) && De(b, v, c);
      }
      W && st(c, null, v, "beforeMount");
      const ie = (!m || (m && !m.pendingBranch)) && z && !z.persisted;
      ie && z.beforeEnter(C),
        r(C, f, g),
        ((b = F && F.onVnodeMounted) || ie || W) &&
          ye(() => {
            b && De(b, v, c), ie && z.enter(C), W && st(c, null, v, "mounted");
          }, m);
    },
    U = (c, f, g, v, m) => {
      if ((g && _(c, g), v)) for (let w = 0; w < v.length; w++) _(c, v[w]);
      if (m) {
        let w = m.subTree;
        if (f === w) {
          const k = m.vnode;
          U(c, k, k.scopeId, k.slotScopeIds, m.parent);
        }
      }
    },
    O = (c, f, g, v, m, w, k, y, C = 0) => {
      for (let b = C; b < c.length; b++) {
        const q = (c[b] = y ? tt(c[b]) : He(c[b]));
        E(null, q, f, g, v, m, w, k, y);
      }
    },
    M = (c, f, g, v, m, w, k) => {
      const y = (f.el = c.el);
      let { patchFlag: C, dynamicChildren: b, dirs: q } = f;
      C |= c.patchFlag & 16;
      const F = c.props || se,
        R = f.props || se;
      let z;
      g && lt(g, !1),
        (z = R.onVnodeBeforeUpdate) && De(z, g, f, c),
        q && st(f, c, g, "beforeUpdate"),
        g && lt(g, !0);
      const W = m && f.type !== "foreignObject";
      if (
        (b
          ? N(c.dynamicChildren, b, y, g, v, W, w)
          : k || G(c, f, y, null, g, v, W, w, !1),
        C > 0)
      ) {
        if (C & 16) $(y, f, F, R, g, v, m);
        else if (
          (C & 2 && F.class !== R.class && i(y, "class", null, R.class, m),
          C & 4 && i(y, "style", F.style, R.style, m),
          C & 8)
        ) {
          const ie = f.dynamicProps;
          for (let ne = 0; ne < ie.length; ne++) {
            const fe = ie[ne],
              Ae = F[fe],
              Tt = R[fe];
            (Tt !== Ae || fe === "value") &&
              i(y, fe, Ae, Tt, m, c.children, g, v, oe);
          }
        }
        C & 1 && c.children !== f.children && h(y, f.children);
      } else !k && b == null && $(y, f, F, R, g, v, m);
      ((z = R.onVnodeUpdated) || q) &&
        ye(() => {
          z && De(z, g, f, c), q && st(f, c, g, "updated");
        }, v);
    },
    N = (c, f, g, v, m, w, k) => {
      for (let y = 0; y < f.length; y++) {
        const C = c[y],
          b = f[y],
          q =
            C.el && (C.type === we || !ht(C, b) || C.shapeFlag & 70)
              ? p(C.el)
              : g;
        E(C, b, q, null, v, m, w, k, !0);
      }
    },
    $ = (c, f, g, v, m, w, k) => {
      if (g !== v) {
        if (g !== se)
          for (const y in g)
            !Cn(y) && !(y in v) && i(c, y, g[y], null, k, f.children, m, w, oe);
        for (const y in v) {
          if (Cn(y)) continue;
          const C = v[y],
            b = g[y];
          C !== b && y !== "value" && i(c, y, b, C, k, f.children, m, w, oe);
        }
        "value" in v && i(c, "value", g.value, v.value);
      }
    },
    T = (c, f, g, v, m, w, k, y, C) => {
      const b = (f.el = c ? c.el : l("")),
        q = (f.anchor = c ? c.anchor : l(""));
      let { patchFlag: F, dynamicChildren: R, slotScopeIds: z } = f;
      z && (y = y ? y.concat(z) : z),
        c == null
          ? (r(b, g, v), r(q, g, v), O(f.children, g, q, m, w, k, y, C))
          : F > 0 && F & 64 && R && c.dynamicChildren
          ? (N(c.dynamicChildren, R, g, m, w, k, y),
            (f.key != null || (m && f === m.subTree)) && oo(c, f, !0))
          : G(c, f, g, q, m, w, k, y, C);
    },
    Q = (c, f, g, v, m, w, k, y, C) => {
      (f.slotScopeIds = y),
        c == null
          ? f.shapeFlag & 512
            ? m.ctx.activate(f, g, v, k, C)
            : L(f, g, v, m, w, k, C)
          : te(c, f, C);
    },
    L = (c, f, g, v, m, w, k) => {
      const y = (c.component = $a(c, v, m));
      if ((Wn(c) && (y.ctx.renderer = Be), qa(y), y.asyncDep)) {
        if ((m && m.registerDep(y, ee), !c.el)) {
          const C = (y.subTree = pe(Re));
          I(null, C, f, g);
        }
        return;
      }
      ee(y, c, f, g, m, w, k);
    },
    te = (c, f, g) => {
      const v = (f.component = c.component);
      if (Dl(c, f, g))
        if (v.asyncDep && !v.asyncResolved) {
          re(v, f, g);
          return;
        } else (v.next = f), Ol(v.update), v.update();
      else (f.el = c.el), (v.vnode = f);
    },
    ee = (c, f, g, v, m, w, k) => {
      const y = () => {
          if (c.isMounted) {
            let { next: q, bu: F, u: R, parent: z, vnode: W } = c,
              ie = q,
              ne;
            lt(c, !1),
              q ? ((q.el = W.el), re(c, q, k)) : (q = W),
              F && sr(F),
              (ne = q.props && q.props.onVnodeBeforeUpdate) && De(ne, z, q, W),
              lt(c, !0);
            const fe = lr(c),
              Ae = c.subTree;
            (c.subTree = fe),
              E(Ae, fe, p(Ae.el), Xe(Ae), c, m, w),
              (q.el = fe.el),
              ie === null && jl(c, fe.el),
              R && ye(R, m),
              (ne = q.props && q.props.onVnodeUpdated) &&
                ye(() => De(ne, z, q, W), m);
          } else {
            let q;
            const { el: F, props: R } = f,
              { bm: z, m: W, parent: ie } = c,
              ne = Tn(f);
            if (
              (lt(c, !1),
              z && sr(z),
              !ne && (q = R && R.onVnodeBeforeMount) && De(q, ie, f),
              lt(c, !0),
              F && or)
            ) {
              const fe = () => {
                (c.subTree = lr(c)), or(F, c.subTree, c, m, null);
              };
              ne
                ? f.type.__asyncLoader().then(() => !c.isUnmounted && fe())
                : fe();
            } else {
              const fe = (c.subTree = lr(c));
              E(null, fe, g, v, c, m, w), (f.el = fe.el);
            }
            if ((W && ye(W, m), !ne && (q = R && R.onVnodeMounted))) {
              const fe = f;
              ye(() => De(q, ie, fe), m);
            }
            (f.shapeFlag & 256 ||
              (ie && Tn(ie.vnode) && ie.vnode.shapeFlag & 256)) &&
              c.a &&
              ye(c.a, m),
              (c.isMounted = !0),
              (f = g = v = null);
          }
        },
        C = (c.effect = new Wr(y, () => Gr(b), c.scope)),
        b = (c.update = () => C.run());
      (b.id = c.uid), lt(c, !0), b();
    },
    re = (c, f, g) => {
      f.component = c;
      const v = c.vnode.props;
      (c.vnode = f),
        (c.next = null),
        ga(c, f.props, v, g),
        ba(c, f.children, g),
        Nt(),
        yo(),
        Dt();
    },
    G = (c, f, g, v, m, w, k, y, C = !1) => {
      const b = c && c.children,
        q = c ? c.shapeFlag : 0,
        F = f.children,
        { patchFlag: R, shapeFlag: z } = f;
      if (R > 0) {
        if (R & 128) {
          Ye(b, F, g, v, m, w, k, y, C);
          return;
        } else if (R & 256) {
          Ie(b, F, g, v, m, w, k, y, C);
          return;
        }
      }
      z & 8
        ? (q & 16 && oe(b, m, w), F !== b && h(g, F))
        : q & 16
        ? z & 16
          ? Ye(b, F, g, v, m, w, k, y, C)
          : oe(b, m, w, !0)
        : (q & 8 && h(g, ""), z & 16 && O(F, g, v, m, w, k, y, C));
    },
    Ie = (c, f, g, v, m, w, k, y, C) => {
      (c = c || At), (f = f || At);
      const b = c.length,
        q = f.length,
        F = Math.min(b, q);
      let R;
      for (R = 0; R < F; R++) {
        const z = (f[R] = C ? tt(f[R]) : He(f[R]));
        E(c[R], z, g, null, m, w, k, y, C);
      }
      b > q ? oe(c, m, w, !0, !1, F) : O(f, g, v, m, w, k, y, C, F);
    },
    Ye = (c, f, g, v, m, w, k, y, C) => {
      let b = 0;
      const q = f.length;
      let F = c.length - 1,
        R = q - 1;
      for (; b <= F && b <= R; ) {
        const z = c[b],
          W = (f[b] = C ? tt(f[b]) : He(f[b]));
        if (ht(z, W)) E(z, W, g, null, m, w, k, y, C);
        else break;
        b++;
      }
      for (; b <= F && b <= R; ) {
        const z = c[F],
          W = (f[R] = C ? tt(f[R]) : He(f[R]));
        if (ht(z, W)) E(z, W, g, null, m, w, k, y, C);
        else break;
        F--, R--;
      }
      if (b > F) {
        if (b <= R) {
          const z = R + 1,
            W = z < q ? f[z].el : v;
          for (; b <= R; )
            E(null, (f[b] = C ? tt(f[b]) : He(f[b])), g, W, m, w, k, y, C), b++;
        }
      } else if (b > R) for (; b <= F; ) Ee(c[b], m, w, !0), b++;
      else {
        const z = b,
          W = b,
          ie = new Map();
        for (b = W; b <= R; b++) {
          const Ce = (f[b] = C ? tt(f[b]) : He(f[b]));
          Ce.key != null && ie.set(Ce.key, b);
        }
        let ne,
          fe = 0;
        const Ae = R - W + 1;
        let Tt = !1,
          ao = 0;
        const Ht = new Array(Ae);
        for (b = 0; b < Ae; b++) Ht[b] = 0;
        for (b = z; b <= F; b++) {
          const Ce = c[b];
          if (fe >= Ae) {
            Ee(Ce, m, w, !0);
            continue;
          }
          let Ne;
          if (Ce.key != null) Ne = ie.get(Ce.key);
          else
            for (ne = W; ne <= R; ne++)
              if (Ht[ne - W] === 0 && ht(Ce, f[ne])) {
                Ne = ne;
                break;
              }
          Ne === void 0
            ? Ee(Ce, m, w, !0)
            : ((Ht[Ne - W] = b + 1),
              Ne >= ao ? (ao = Ne) : (Tt = !0),
              E(Ce, f[Ne], g, null, m, w, k, y, C),
              fe++);
        }
        const co = Tt ? wa(Ht) : At;
        for (ne = co.length - 1, b = Ae - 1; b >= 0; b--) {
          const Ce = W + b,
            Ne = f[Ce],
            uo = Ce + 1 < q ? f[Ce + 1].el : v;
          Ht[b] === 0
            ? E(null, Ne, g, uo, m, w, k, y, C)
            : Tt && (ne < 0 || b !== co[ne] ? Ke(Ne, g, uo, 2) : ne--);
        }
      }
    },
    Ke = (c, f, g, v, m = null) => {
      const { el: w, type: k, transition: y, children: C, shapeFlag: b } = c;
      if (b & 6) {
        Ke(c.component.subTree, f, g, v);
        return;
      }
      if (b & 128) {
        c.suspense.move(f, g, v);
        return;
      }
      if (b & 64) {
        k.move(c, f, g, Be);
        return;
      }
      if (k === we) {
        r(w, f, g);
        for (let F = 0; F < C.length; F++) Ke(C[F], f, g, v);
        r(c.anchor, f, g);
        return;
      }
      if (k === ur) {
        j(c, f, g);
        return;
      }
      if (v !== 2 && b & 1 && y)
        if (v === 0) y.beforeEnter(w), r(w, f, g), ye(() => y.enter(w), m);
        else {
          const { leave: F, delayLeave: R, afterLeave: z } = y,
            W = () => r(w, f, g),
            ie = () => {
              F(w, () => {
                W(), z && z();
              });
            };
          R ? R(w, W, ie) : ie();
        }
      else r(w, f, g);
    },
    Ee = (c, f, g, v = !1, m = !1) => {
      const {
        type: w,
        props: k,
        ref: y,
        children: C,
        dynamicChildren: b,
        shapeFlag: q,
        patchFlag: F,
        dirs: R,
      } = c;
      if ((y != null && Mr(y, null, g, c, !0), q & 256)) {
        f.ctx.deactivate(c);
        return;
      }
      const z = q & 1 && R,
        W = !Tn(c);
      let ie;
      if ((W && (ie = k && k.onVnodeBeforeUnmount) && De(ie, f, c), q & 6))
        J(c.component, g, v);
      else {
        if (q & 128) {
          c.suspense.unmount(g, v);
          return;
        }
        z && st(c, null, f, "beforeUnmount"),
          q & 64
            ? c.type.remove(c, f, g, m, Be, v)
            : b && (w !== we || (F > 0 && F & 64))
            ? oe(b, f, g, !1, !0)
            : ((w === we && F & 384) || (!m && q & 16)) && oe(C, f, g),
          v && Et(c);
      }
      ((W && (ie = k && k.onVnodeUnmounted)) || z) &&
        ye(() => {
          ie && De(ie, f, c), z && st(c, null, f, "unmounted");
        }, g);
    },
    Et = (c) => {
      const { type: f, el: g, anchor: v, transition: m } = c;
      if (f === we) {
        nr(g, v);
        return;
      }
      if (f === ur) {
        A(c);
        return;
      }
      const w = () => {
        o(g), m && !m.persisted && m.afterLeave && m.afterLeave();
      };
      if (c.shapeFlag & 1 && m && !m.persisted) {
        const { leave: k, delayLeave: y } = m,
          C = () => k(g, w);
        y ? y(c.el, w, C) : C();
      } else w();
    },
    nr = (c, f) => {
      let g;
      for (; c !== f; ) (g = d(c)), o(c), (c = g);
      o(f);
    },
    J = (c, f, g) => {
      const { bum: v, scope: m, update: w, subTree: k, um: y } = c;
      v && sr(v),
        m.stop(),
        w && ((w.active = !1), Ee(k, c, f, g)),
        y && ye(y, f),
        ye(() => {
          c.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    oe = (c, f, g, v = !1, m = !1, w = 0) => {
      for (let k = w; k < c.length; k++) Ee(c[k], f, g, v, m);
    },
    Xe = (c) =>
      c.shapeFlag & 6
        ? Xe(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : d(c.anchor || c.el),
    jt = (c, f, g) => {
      c == null
        ? f._vnode && Ee(f._vnode, null, null, !0)
        : E(f._vnode || null, c, f, null, null, null, g),
        yo(),
        Vi(),
        (f._vnode = c);
    },
    Be = {
      p: E,
      um: Ee,
      m: Ke,
      r: Et,
      mt: L,
      mc: O,
      pc: G,
      pbc: N,
      n: Xe,
      o: e,
    };
  let rr, or;
  return (
    t && ([rr, or] = t(Be)), { render: jt, hydrate: rr, createApp: da(jt, rr) }
  );
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function oo(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (D(r) && D(o))
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      let l = o[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[i] = tt(o[i])), (l.el = s.el)),
        n || oo(s, l)),
        l.type === Jn && (l.el = s.el);
    }
}
function wa(e) {
  const t = e.slice(),
    n = [0];
  let r, o, i, s, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (i = 0, s = n.length - 1; i < s; )
        (l = (i + s) >> 1), e[n[l]] < u ? (i = l + 1) : (s = l);
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, s = n[i - 1]; i-- > 0; ) (n[i] = s), (s = t[s]);
  return n;
}
const xa = (e) => e.__isTeleport,
  Gt = (e) => e && (e.disabled || e.disabled === ""),
  Mo = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  Or = (e, t) => {
    const n = e && e.to;
    return ue(n) ? (t ? t(n) : null) : n;
  },
  Ca = {
    __isTeleport: !0,
    process(e, t, n, r, o, i, s, l, a, u) {
      const {
          mc: h,
          pc: p,
          pbc: d,
          o: { insert: _, querySelector: x, createText: E, createComment: P },
        } = u,
        I = Gt(t.props);
      let { shapeFlag: S, children: j, dynamicChildren: A } = t;
      if (e == null) {
        const B = (t.el = E("")),
          V = (t.anchor = E(""));
        _(B, n, r), _(V, n, r);
        const U = (t.target = Or(t.props, x)),
          O = (t.targetAnchor = E(""));
        U && (_(O, U), (s = s || Mo(U)));
        const M = (N, $) => {
          S & 16 && h(j, N, $, o, i, s, l, a);
        };
        I ? M(n, V) : U && M(U, O);
      } else {
        t.el = e.el;
        const B = (t.anchor = e.anchor),
          V = (t.target = e.target),
          U = (t.targetAnchor = e.targetAnchor),
          O = Gt(e.props),
          M = O ? n : V,
          N = O ? B : U;
        if (
          ((s = s || Mo(V)),
          A
            ? (d(e.dynamicChildren, A, M, o, i, s, l), oo(e, t, !0))
            : a || p(e, t, M, N, o, i, s, l, !1),
          I)
        )
          O || yn(t, n, B, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const $ = (t.target = Or(t.props, x));
          $ && yn(t, $, null, u, 0);
        } else O && yn(t, V, U, u, 1);
      }
      us(t);
    },
    remove(e, t, n, r, { um: o, o: { remove: i } }, s) {
      const {
        shapeFlag: l,
        children: a,
        anchor: u,
        targetAnchor: h,
        target: p,
        props: d,
      } = e;
      if ((p && i(h), (s || !Gt(d)) && (i(u), l & 16)))
        for (let _ = 0; _ < a.length; _++) {
          const x = a[_];
          o(x, t, n, !0, !!x.dynamicChildren);
        }
    },
    move: yn,
    hydrate: Ea,
  };
function yn(e, t, n, { o: { insert: r }, m: o }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: s, anchor: l, shapeFlag: a, children: u, props: h } = e,
    p = i === 2;
  if ((p && r(s, t, n), (!p || Gt(h)) && a & 16))
    for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
  p && r(l, t, n);
}
function Ea(
  e,
  t,
  n,
  r,
  o,
  i,
  { o: { nextSibling: s, parentNode: l, querySelector: a } },
  u
) {
  const h = (t.target = Or(t.props, a));
  if (h) {
    const p = h._lpa || h.firstChild;
    if (t.shapeFlag & 16)
      if (Gt(t.props))
        (t.anchor = u(s(e), t, l(e), n, r, o, i)), (t.targetAnchor = p);
      else {
        t.anchor = s(e);
        let d = p;
        for (; d; )
          if (
            ((d = s(d)), d && d.nodeType === 8 && d.data === "teleport anchor")
          ) {
            (t.targetAnchor = d),
              (h._lpa = t.targetAnchor && s(t.targetAnchor));
            break;
          }
        u(p, t, h, n, r, o, i);
      }
    us(t);
  }
  return t.anchor && s(t.anchor);
}
const Ta = Ca;
function us(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const we = Symbol.for("v-fgt"),
  Jn = Symbol.for("v-txt"),
  Re = Symbol.for("v-cmt"),
  ur = Symbol.for("v-stc"),
  en = [];
let $e = null;
function je(e = !1) {
  en.push(($e = e ? null : []));
}
function ka() {
  en.pop(), ($e = en[en.length - 1] || null);
}
let sn = 1;
function Oo(e) {
  sn += e;
}
function fs(e) {
  return (
    (e.dynamicChildren = sn > 0 ? $e || At : null),
    ka(),
    sn > 0 && $e && $e.push(e),
    e
  );
}
function Ue(e, t, n, r, o, i) {
  return fs(ae(e, t, n, r, o, i, !0));
}
function Pa(e, t, n, r, o) {
  return fs(pe(e, t, n, r, o, !0));
}
function Fr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yn = "__vInternal",
  ds = ({ key: e }) => e ?? null,
  Pn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ue(e) || be(e) || K(e)
        ? { i: Se, r: e, k: t, f: !!n }
        : e
      : null
  );
function ae(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  i = e === we ? 0 : 1,
  s = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ds(t),
    ref: t && Pn(t),
    scopeId: Un,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Se,
  };
  return (
    l
      ? (io(a, n), i & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ue(n) ? 8 : 16),
    sn > 0 &&
      !s &&
      $e &&
      (a.patchFlag > 0 || i & 6) &&
      a.patchFlag !== 32 &&
      $e.push(a),
    a
  );
}
const pe = Sa;
function Sa(e, t = null, n = null, r = 0, o = null, i = !1) {
  if (((!e || e === oa) && (e = Re), Fr(e))) {
    const l = it(e, t, !0);
    return (
      n && io(l, n),
      sn > 0 &&
        !i &&
        $e &&
        (l.shapeFlag & 6 ? ($e[$e.indexOf(e)] = l) : $e.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Na(e) && (e = e.__vccOpts), t)) {
    t = La(t);
    let { class: l, style: a } = t;
    l && !ue(l) && (t.class = Kr(l)),
      le(a) && (ji(a) && !D(a) && (a = he({}, a)), (t.style = zr(a)));
  }
  const s = ue(e) ? 1 : Hl(e) ? 128 : xa(e) ? 64 : le(e) ? 4 : K(e) ? 2 : 0;
  return ae(e, t, n, r, o, s, i, !0);
}
function La(e) {
  return e ? (ji(e) || Yn in e ? he({}, e) : e) : null;
}
function it(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: s } = e,
    l = t ? Ma(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ds(l),
    ref:
      t && t.ref ? (n && o ? (D(o) ? o.concat(Pn(t)) : [o, Pn(t)]) : Pn(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== we ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && it(e.ssContent),
    ssFallback: e.ssFallback && it(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function Aa(e = " ", t = 0) {
  return pe(Jn, null, e, t);
}
function Fo(e = "", t = !1) {
  return t ? (je(), Pa(Re, null, e)) : pe(Re, null, e);
}
function He(e) {
  return e == null || typeof e == "boolean"
    ? pe(Re)
    : D(e)
    ? pe(we, null, e.slice())
    : typeof e == "object"
    ? tt(e)
    : pe(Jn, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : it(e);
}
function io(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), io(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Yn in t)
        ? (t._ctx = Se)
        : o === 3 &&
          Se &&
          (Se.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(t)
      ? ((t = { default: t, _ctx: Se }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Aa(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ma(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Kr([t.class, r.class]));
      else if (o === "style") t.style = zr([t.style, r.style]);
      else if (Bn(o)) {
        const i = t[o],
          s = r[o];
        s &&
          i !== s &&
          !(D(i) && i.includes(s)) &&
          (t[o] = i ? [].concat(i, s) : s);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function De(e, t, n, r = null) {
  Le(e, t, 7, [n, r]);
}
const Oa = os();
let Fa = 0;
function $a(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Oa,
    i = {
      uid: Fa++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Js(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ss(r, o),
      emitsOptions: Ji(r, o),
      emit: null,
      emitted: null,
      propsDefaults: se,
      inheritAttrs: r.inheritAttrs,
      ctx: se,
      data: se,
      props: se,
      attrs: se,
      slots: se,
      refs: se,
      setupState: se,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = ql.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let ge = null;
const Je = () => ge || Se;
let so,
  kt,
  $o = "__VUE_INSTANCE_SETTERS__";
(kt = _r()[$o]) || (kt = _r()[$o] = []),
  kt.push((e) => (ge = e)),
  (so = (e) => {
    kt.length > 1 ? kt.forEach((t) => t(e)) : kt[0](e);
  });
const Rt = (e) => {
    so(e), e.scope.on();
  },
  bt = () => {
    ge && ge.scope.off(), so(null);
  };
function hs(e) {
  return e.vnode.shapeFlag & 4;
}
let ln = !1;
function qa(e, t = !1) {
  ln = t;
  const { props: n, children: r } = e.vnode,
    o = hs(e);
  pa(e, n, o, t), va(e, r);
  const i = o ? Ra(e, t) : void 0;
  return (ln = !1), i;
}
function Ra(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Hn(new Proxy(e.ctx, ia)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Ba(e) : null);
    Rt(e), Nt();
    const i = rt(r, e, 0, [e.props, o]);
    if ((Dt(), bt(), Ei(i))) {
      if ((i.then(bt, bt), t))
        return i
          .then((s) => {
            qo(e, s, t);
          })
          .catch((s) => {
            zn(s, e, 0);
          });
      e.asyncDep = i;
    } else qo(e, i, t);
  } else ps(e, t);
}
function qo(e, t, n) {
  K(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = Ki(t)),
    ps(e, n);
}
let Ro;
function ps(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Ro && !r.render) {
      const o = r.template || no(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = r,
          u = he(he({ isCustomElement: i, delimiters: l }, s), a);
        r.render = Ro(o, u);
      }
    }
    e.render = r.render || qe;
  }
  Rt(e), Nt(), sa(e), Dt(), bt();
}
function Ia(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return xe(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Ba(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Ia(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Xn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ki(Hn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Zt) return Zt[n](e);
        },
        has(t, n) {
          return n in t || n in Zt;
        },
      }))
    );
}
function Na(e) {
  return K(e) && "__vccOpts" in e;
}
const H = (e, t) => Ll(e, t, ln);
function X(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? le(t) && !D(t)
      ? Fr(t)
        ? pe(e, null, [t])
        : pe(e, t)
      : pe(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Fr(n) && (n = [n]),
      pe(e, t, n));
}
const Da = Symbol.for("v-scx"),
  ja = () => kn(Da),
  Ha = "3.3.4",
  za = "http://www.w3.org/2000/svg",
  pt = typeof document < "u" ? document : null,
  Io = pt && pt.createElement("template"),
  Ka = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? pt.createElementNS(za, e)
        : pt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => pt.createTextNode(e),
    createComment: (e) => pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, i) {
      const s = n ? n.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === i || !(o = o.nextSibling));

        );
      else {
        Io.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Io.content;
        if (r) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        s ? s.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Ua(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Wa(e, t, n) {
  const r = e.style,
    o = ue(n);
  if (n && !o) {
    if (t && !ue(t)) for (const i in t) n[i] == null && $r(r, i, "");
    for (const i in n) $r(r, i, n[i]);
  } else {
    const i = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = i);
  }
}
const Bo = /\s*!important$/;
function $r(e, t, n) {
  if (D(n)) n.forEach((r) => $r(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Va(e, t);
    Bo.test(n)
      ? e.setProperty(Bt(r), n.replace(Bo, ""), "important")
      : (e[r] = n);
  }
}
const No = ["Webkit", "Moz", "ms"],
  fr = {};
function Va(e, t) {
  const n = fr[t];
  if (n) return n;
  let r = $t(t);
  if (r !== "filter" && r in e) return (fr[t] = r);
  r = Pi(r);
  for (let o = 0; o < No.length; o++) {
    const i = No[o] + r;
    if (i in e) return (fr[t] = i);
  }
  return t;
}
const Do = "http://www.w3.org/1999/xlink";
function Qa(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Do, t.slice(6, t.length))
      : e.setAttributeNS(Do, t, n);
  else {
    const i = Qs(t);
    n == null || (i && !Si(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function Ja(e, t, n, r, o, i, s) {
  if (t === "innerHTML" || t === "textContent") {
    r && s(r, o, i), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const u = l === "OPTION" ? e.getAttribute("value") : e.value,
      h = n ?? "";
    u !== h && (e.value = h), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean"
      ? (n = Si(n))
      : n == null && u === "string"
      ? ((n = ""), (a = !0))
      : u === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Ya(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Xa(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Za(e, t, n, r, o = null) {
  const i = e._vei || (e._vei = {}),
    s = i[t];
  if (r && s) s.value = r;
  else {
    const [l, a] = Ga(t);
    if (r) {
      const u = (i[t] = nc(r, o));
      Ya(e, l, u, a);
    } else s && (Xa(e, l, s, a), (i[t] = void 0));
  }
}
const jo = /(?:Once|Passive|Capture)$/;
function Ga(e) {
  let t;
  if (jo.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(jo)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Bt(e.slice(2)), t];
}
let dr = 0;
const ec = Promise.resolve(),
  tc = () => dr || (ec.then(() => (dr = 0)), (dr = Date.now()));
function nc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Le(rc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = tc()), n;
}
function rc(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const Ho = /^on[a-z]/,
  oc = (e, t, n, r, o = !1, i, s, l, a) => {
    t === "class"
      ? Ua(e, r, o)
      : t === "style"
      ? Wa(e, n, r)
      : Bn(t)
      ? Nr(t) || Za(e, t, n, r, s)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : ic(e, t, r, o)
        )
      ? Ja(e, t, r, i, s, l, a)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Qa(e, t, r, o));
  };
function ic(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ho.test(t) && K(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ho.test(t) && ue(n))
    ? !1
    : t in e;
}
const Ge = "transition",
  Kt = "animation",
  an = (e, { slots: t }) => X(Vl, sc(e), t);
an.displayName = "Transition";
const gs = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
an.props = he({}, Gi, gs);
const at = (e, t = []) => {
    D(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  zo = (e) => (e ? (D(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function sc(e) {
  const t = {};
  for (const T in e) T in gs || (t[T] = e[T]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: s = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = i,
      appearActiveClass: u = s,
      appearToClass: h = l,
      leaveFromClass: p = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: _ = `${n}-leave-to`,
    } = e,
    x = lc(o),
    E = x && x[0],
    P = x && x[1],
    {
      onBeforeEnter: I,
      onEnter: S,
      onEnterCancelled: j,
      onLeave: A,
      onLeaveCancelled: B,
      onBeforeAppear: V = I,
      onAppear: U = S,
      onAppearCancelled: O = j,
    } = t,
    M = (T, Q, L) => {
      ct(T, Q ? h : l), ct(T, Q ? u : s), L && L();
    },
    N = (T, Q) => {
      (T._isLeaving = !1), ct(T, p), ct(T, _), ct(T, d), Q && Q();
    },
    $ = (T) => (Q, L) => {
      const te = T ? U : S,
        ee = () => M(Q, T, L);
      at(te, [Q, ee]),
        Ko(() => {
          ct(Q, T ? a : i), et(Q, T ? h : l), zo(te) || Uo(Q, r, E, ee);
        });
    };
  return he(t, {
    onBeforeEnter(T) {
      at(I, [T]), et(T, i), et(T, s);
    },
    onBeforeAppear(T) {
      at(V, [T]), et(T, a), et(T, u);
    },
    onEnter: $(!1),
    onAppear: $(!0),
    onLeave(T, Q) {
      T._isLeaving = !0;
      const L = () => N(T, Q);
      et(T, p),
        uc(),
        et(T, d),
        Ko(() => {
          T._isLeaving && (ct(T, p), et(T, _), zo(A) || Uo(T, r, P, L));
        }),
        at(A, [T, L]);
    },
    onEnterCancelled(T) {
      M(T, !1), at(j, [T]);
    },
    onAppearCancelled(T) {
      M(T, !0), at(O, [T]);
    },
    onLeaveCancelled(T) {
      N(T), at(B, [T]);
    },
  });
}
function lc(e) {
  if (e == null) return null;
  if (le(e)) return [hr(e.enter), hr(e.leave)];
  {
    const t = hr(e);
    return [t, t];
  }
}
function hr(e) {
  return Hs(e);
}
function et(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function ct(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Ko(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ac = 0;
function Uo(e, t, n, r) {
  const o = (e._endId = ++ac),
    i = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: s, timeout: l, propCount: a } = cc(e, t);
  if (!s) return r();
  const u = s + "end";
  let h = 0;
  const p = () => {
      e.removeEventListener(u, d), i();
    },
    d = (_) => {
      _.target === e && ++h >= a && p();
    };
  setTimeout(() => {
    h < a && p();
  }, l + 1),
    e.addEventListener(u, d);
}
function cc(e, t) {
  const n = window.getComputedStyle(e),
    r = (x) => (n[x] || "").split(", "),
    o = r(`${Ge}Delay`),
    i = r(`${Ge}Duration`),
    s = Wo(o, i),
    l = r(`${Kt}Delay`),
    a = r(`${Kt}Duration`),
    u = Wo(l, a);
  let h = null,
    p = 0,
    d = 0;
  t === Ge
    ? s > 0 && ((h = Ge), (p = s), (d = i.length))
    : t === Kt
    ? u > 0 && ((h = Kt), (p = u), (d = a.length))
    : ((p = Math.max(s, u)),
      (h = p > 0 ? (s > u ? Ge : Kt) : null),
      (d = h ? (h === Ge ? i.length : a.length) : 0));
  const _ =
    h === Ge && /\b(transform|all)(,|$)/.test(r(`${Ge}Property`).toString());
  return { type: h, timeout: p, propCount: d, hasTransform: _ };
}
function Wo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Vo(n) + Vo(e[r])));
}
function Vo(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function uc() {
  return document.body.offsetHeight;
}
const fc = he({ patchProp: oc }, Ka);
let Qo;
function dc() {
  return Qo || (Qo = _a(fc));
}
const hc = (...e) => {
  const t = dc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = pc(r);
      if (!o) return;
      const i = t._component;
      !K(i) && !i.render && !i.template && (i.template = o.innerHTML),
        (o.innerHTML = "");
      const s = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        s
      );
    }),
    t
  );
};
function pc(e) {
  return ue(e) ? document.querySelector(e) : e;
}
function Zn(e, t, n, r) {
  return Object.defineProperty(e, t, { get: n, set: r, enumerable: !0 }), e;
}
const wt = ce(!1);
let Gn;
function gc(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(
      e
    ) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    [];
  return {
    browser: n[5] || n[3] || n[1] || "",
    version: n[2] || n[4] || "0",
    versionNumber: n[4] || n[2] || "0",
    platform: t[0] || "",
  };
}
function mc(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  );
}
const ms = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function vc(e) {
  (Gn = { is: { ...e } }), delete e.mac, delete e.desktop;
  const t =
    Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(e, { mobile: !0, ios: !0, platform: t, [t]: !0 });
}
function bc(e) {
  const t = e.toLowerCase(),
    n = mc(t),
    r = gc(t, n),
    o = {};
  r.browser &&
    ((o[r.browser] = !0),
    (o.version = r.version),
    (o.versionNumber = parseInt(r.versionNumber, 10))),
    r.platform && (o[r.platform] = !0);
  const i =
    o.android ||
    o.ios ||
    o.bb ||
    o.blackberry ||
    o.ipad ||
    o.iphone ||
    o.ipod ||
    o.kindle ||
    o.playbook ||
    o.silk ||
    o["windows phone"];
  return (
    i === !0 || t.indexOf("mobile") > -1
      ? ((o.mobile = !0),
        o.edga || o.edgios
          ? ((o.edge = !0), (r.browser = "edge"))
          : o.crios
          ? ((o.chrome = !0), (r.browser = "chrome"))
          : o.fxios && ((o.firefox = !0), (r.browser = "firefox")))
      : (o.desktop = !0),
    (o.ipod || o.ipad || o.iphone) && (o.ios = !0),
    o["windows phone"] && ((o.winphone = !0), delete o["windows phone"]),
    (o.chrome ||
      o.opr ||
      o.safari ||
      o.vivaldi ||
      (o.mobile === !0 && o.ios !== !0 && i !== !0)) &&
      (o.webkit = !0),
    o.edg && ((r.browser = "edgechromium"), (o.edgeChromium = !0)),
    ((o.safari && o.blackberry) || o.bb) &&
      ((r.browser = "blackberry"), (o.blackberry = !0)),
    o.safari && o.playbook && ((r.browser = "playbook"), (o.playbook = !0)),
    o.opr && ((r.browser = "opera"), (o.opera = !0)),
    o.safari && o.android && ((r.browser = "android"), (o.android = !0)),
    o.safari && o.kindle && ((r.browser = "kindle"), (o.kindle = !0)),
    o.safari && o.silk && ((r.browser = "silk"), (o.silk = !0)),
    o.vivaldi && ((r.browser = "vivaldi"), (o.vivaldi = !0)),
    (o.name = r.browser),
    (o.platform = r.platform),
    t.indexOf("electron") > -1
      ? (o.electron = !0)
      : document.location.href.indexOf("-extension://") > -1
      ? (o.bex = !0)
      : (window.Capacitor !== void 0
          ? ((o.capacitor = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "capacitor"))
          : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
            ((o.cordova = !0),
            (o.nativeMobile = !0),
            (o.nativeMobileWrapper = "cordova")),
        ms === !0 &&
          o.mac === !0 &&
          ((o.desktop === !0 && o.safari === !0) ||
            (o.nativeMobile === !0 &&
              o.android !== !0 &&
              o.ios !== !0 &&
              o.ipad !== !0)) &&
          vc(o)),
    o
  );
}
const Jo = navigator.userAgent || navigator.vendor || window.opera,
  _c = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  de = {
    userAgent: Jo,
    is: bc(Jo),
    has: { touch: ms },
    within: { iframe: window.self !== window.top },
  },
  qr = {
    install(e) {
      const { $q: t } = e;
      wt.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, de), (wt.value = !1), (Gn = void 0);
          }),
          (t.platform = dn(this)))
        : (t.platform = this);
    },
  };
{
  let e;
  Zn(de.has, "webStorage", () => {
    if (e !== void 0) return e;
    try {
      if (window.localStorage) return (e = !0), !0;
    } catch {}
    return (e = !1), !1;
  }),
    de.is.ios === !0 && window.navigator.vendor.toLowerCase().indexOf("apple"),
    wt.value === !0 ? Object.assign(qr, de, Gn, _c) : Object.assign(qr, de);
}
const er = (e, t) => {
    const n = dn(e);
    for (const r in e)
      Zn(
        t,
        r,
        () => n[r],
        (o) => {
          n[r] = o;
        }
      );
    return t;
  },
  Pe = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 };
try {
  const e = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(Pe, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 },
      });
    },
  });
  window.addEventListener("qtest", null, e),
    window.removeEventListener("qtest", null, e);
} catch {}
function cn() {}
function yc(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
      ? (e = e.changedTouches[0])
      : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  );
}
function wc(e) {
  if (e.path) return e.path;
  if (e.composedPath) return e.composedPath();
  const t = [];
  let n = e.target;
  for (; n; ) {
    if ((t.push(n), n.tagName === "HTML"))
      return t.push(document), t.push(window), t;
    n = n.parentElement;
  }
}
function vs(e) {
  e.stopPropagation();
}
function xc(e) {
  e.cancelable !== !1 && e.preventDefault();
}
function ft(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation();
}
function Cc(e, t, n) {
  const r = `__q_${t}_evt`;
  (e[r] = e[r] !== void 0 ? e[r].concat(n) : n),
    n.forEach((o) => {
      o[0].addEventListener(o[1], e[o[2]], Pe[o[3]]);
    });
}
function Ec(e, t) {
  const n = `__q_${t}_evt`;
  e[n] !== void 0 &&
    (e[n].forEach((r) => {
      r[0].removeEventListener(r[1], e[r[2]], Pe[r[3]]);
    }),
    (e[n] = void 0));
}
function Tc(e, t = 250, n) {
  let r = null;
  function o() {
    const i = arguments,
      s = () => {
        (r = null), n !== !0 && e.apply(this, i);
      };
    r !== null ? clearTimeout(r) : n === !0 && e.apply(this, i),
      (r = setTimeout(s, t));
  }
  return (
    (o.cancel = () => {
      r !== null && clearTimeout(r);
    }),
    o
  );
}
const pr = ["sm", "md", "lg", "xl"],
  { passive: Yo } = Pe,
  kc = er(
    {
      width: 0,
      height: 0,
      name: "xs",
      sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
      lt: { sm: !0, md: !0, lg: !0, xl: !0 },
      gt: { xs: !1, sm: !1, md: !1, lg: !1 },
      xs: !0,
      sm: !1,
      md: !1,
      lg: !1,
      xl: !1,
    },
    {
      setSizes: cn,
      setDebounce: cn,
      install({ $q: e, onSSRHydrated: t }) {
        if (((e.screen = this), this.__installed === !0)) {
          e.config.screen !== void 0 &&
            (e.config.screen.bodyClasses === !1
              ? document.body.classList.remove(`screen--${this.name}`)
              : this.__update(!0));
          return;
        }
        const { visualViewport: n } = window,
          r = n || window,
          o = document.scrollingElement || document.documentElement,
          i =
            n === void 0 || de.is.mobile === !0
              ? () => [
                  Math.max(window.innerWidth, o.clientWidth),
                  Math.max(window.innerHeight, o.clientHeight),
                ]
              : () => [
                  n.width * n.scale + window.innerWidth - o.clientWidth,
                  n.height * n.scale + window.innerHeight - o.clientHeight,
                ],
          s = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0;
        this.__update = (p) => {
          const [d, _] = i();
          if ((_ !== this.height && (this.height = _), d !== this.width))
            this.width = d;
          else if (p !== !0) return;
          let x = this.sizes;
          (this.gt.xs = d >= x.sm),
            (this.gt.sm = d >= x.md),
            (this.gt.md = d >= x.lg),
            (this.gt.lg = d >= x.xl),
            (this.lt.sm = d < x.sm),
            (this.lt.md = d < x.md),
            (this.lt.lg = d < x.lg),
            (this.lt.xl = d < x.xl),
            (this.xs = this.lt.sm),
            (this.sm = this.gt.xs === !0 && this.lt.md === !0),
            (this.md = this.gt.sm === !0 && this.lt.lg === !0),
            (this.lg = this.gt.md === !0 && this.lt.xl === !0),
            (this.xl = this.gt.lg),
            (x =
              (this.xs === !0 && "xs") ||
              (this.sm === !0 && "sm") ||
              (this.md === !0 && "md") ||
              (this.lg === !0 && "lg") ||
              "xl"),
            x !== this.name &&
              (s === !0 &&
                (document.body.classList.remove(`screen--${this.name}`),
                document.body.classList.add(`screen--${x}`)),
              (this.name = x));
        };
        let l,
          a = {},
          u = 16;
        (this.setSizes = (p) => {
          pr.forEach((d) => {
            p[d] !== void 0 && (a[d] = p[d]);
          });
        }),
          (this.setDebounce = (p) => {
            u = p;
          });
        const h = () => {
          const p = getComputedStyle(document.body);
          p.getPropertyValue("--q-size-sm") &&
            pr.forEach((d) => {
              this.sizes[d] = parseInt(p.getPropertyValue(`--q-size-${d}`), 10);
            }),
            (this.setSizes = (d) => {
              pr.forEach((_) => {
                d[_] && (this.sizes[_] = d[_]);
              }),
                this.__update(!0);
            }),
            (this.setDebounce = (d) => {
              l !== void 0 && r.removeEventListener("resize", l, Yo),
                (l = d > 0 ? Tc(this.__update, d) : this.__update),
                r.addEventListener("resize", l, Yo);
            }),
            this.setDebounce(u),
            Object.keys(a).length !== 0
              ? (this.setSizes(a), (a = void 0))
              : this.__update(),
            s === !0 &&
              this.name === "xs" &&
              document.body.classList.add("screen--xs");
        };
        wt.value === !0 ? t.push(h) : h();
      },
    }
  ),
  me = er(
    { isActive: !1, mode: !1 },
    {
      __media: void 0,
      set(e) {
        (me.mode = e),
          e === "auto"
            ? (me.__media === void 0 &&
                ((me.__media = window.matchMedia(
                  "(prefers-color-scheme: dark)"
                )),
                (me.__updateMedia = () => {
                  me.set("auto");
                }),
                me.__media.addListener(me.__updateMedia)),
              (e = me.__media.matches))
            : me.__media !== void 0 &&
              (me.__media.removeListener(me.__updateMedia),
              (me.__media = void 0)),
          (me.isActive = e === !0),
          document.body.classList.remove(
            `body--${e === !0 ? "light" : "dark"}`
          ),
          document.body.classList.add(`body--${e === !0 ? "dark" : "light"}`);
      },
      toggle() {
        me.set(me.isActive === !1);
      },
      install({ $q: e, onSSRHydrated: t, ssrContext: n }) {
        const { dark: r } = e.config;
        if (((e.dark = this), this.__installed === !0 && r === void 0)) return;
        this.isActive = r === !0;
        const o = r !== void 0 ? r : !1;
        if (wt.value === !0) {
          const i = (l) => {
              this.__fromSSR = l;
            },
            s = this.set;
          (this.set = i),
            i(o),
            t.push(() => {
              (this.set = s), this.set(this.__fromSSR);
            });
        } else this.set(o);
      },
    }
  ),
  bs = () => !0;
function Pc(e) {
  return typeof e == "string" && e !== "" && e !== "/" && e !== "#/";
}
function Sc(e) {
  return (
    e.startsWith("#") === !0 && (e = e.substring(1)),
    e.startsWith("/") === !1 && (e = "/" + e),
    e.endsWith("/") === !0 && (e = e.substring(0, e.length - 1)),
    "#" + e
  );
}
function Lc(e) {
  if (e.backButtonExit === !1) return () => !1;
  if (e.backButtonExit === "*") return bs;
  const t = ["#/"];
  return (
    Array.isArray(e.backButtonExit) === !0 &&
      t.push(...e.backButtonExit.filter(Pc).map(Sc)),
    () => t.includes(window.location.hash)
  );
}
const Rr = {
    __history: [],
    add: cn,
    remove: cn,
    install({ $q: e }) {
      if (this.__installed === !0) return;
      const { cordova: t, capacitor: n } = de.is;
      if (t !== !0 && n !== !0) return;
      const r = e.config[t === !0 ? "cordova" : "capacitor"];
      if (
        (r !== void 0 && r.backButton === !1) ||
        (n === !0 &&
          (window.Capacitor === void 0 ||
            window.Capacitor.Plugins.App === void 0))
      )
        return;
      (this.add = (s) => {
        s.condition === void 0 && (s.condition = bs), this.__history.push(s);
      }),
        (this.remove = (s) => {
          const l = this.__history.indexOf(s);
          l >= 0 && this.__history.splice(l, 1);
        });
      const o = Lc(Object.assign({ backButtonExit: !0 }, r)),
        i = () => {
          if (this.__history.length) {
            const s = this.__history[this.__history.length - 1];
            s.condition() === !0 && (this.__history.pop(), s.handler());
          } else o() === !0 ? navigator.app.exitApp() : window.history.back();
        };
      t === !0
        ? document.addEventListener("deviceready", () => {
            document.addEventListener("backbutton", i, !1);
          })
        : window.Capacitor.Plugins.App.addListener("backButton", i);
    },
  },
  Xo = {
    isoName: "en-US",
    nativeName: "English (US)",
    label: {
      clear: "Clear",
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      set: "Set",
      select: "Select",
      reset: "Reset",
      remove: "Remove",
      update: "Update",
      create: "Create",
      search: "Search",
      filter: "Filter",
      refresh: "Refresh",
      expand: (e) => (e ? `Expand "${e}"` : "Expand"),
      collapse: (e) => (e ? `Collapse "${e}"` : "Collapse"),
    },
    date: {
      days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
        "_"
      ),
      daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      months:
        "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ),
      monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: "days",
    },
    table: {
      noData: "No data available",
      noResults: "No matching records found",
      loading: "Loading...",
      selectedRecords: (e) =>
        e === 1
          ? "1 record selected."
          : (e === 0 ? "No" : e) + " records selected.",
      recordsPerPage: "Records per page:",
      allRows: "All",
      pagination: (e, t, n) => e + "-" + t + " of " + n,
      columns: "Columns",
    },
    editor: {
      url: "URL",
      bold: "Bold",
      italic: "Italic",
      strikethrough: "Strikethrough",
      underline: "Underline",
      unorderedList: "Unordered List",
      orderedList: "Ordered List",
      subscript: "Subscript",
      superscript: "Superscript",
      hyperlink: "Hyperlink",
      toggleFullscreen: "Toggle Fullscreen",
      quote: "Quote",
      left: "Left align",
      center: "Center align",
      right: "Right align",
      justify: "Justify align",
      print: "Print",
      outdent: "Decrease indentation",
      indent: "Increase indentation",
      removeFormat: "Remove formatting",
      formatting: "Formatting",
      fontSize: "Font Size",
      align: "Align",
      hr: "Insert Horizontal Rule",
      undo: "Undo",
      redo: "Redo",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      heading4: "Heading 4",
      heading5: "Heading 5",
      heading6: "Heading 6",
      paragraph: "Paragraph",
      code: "Code",
      size1: "Very small",
      size2: "A bit small",
      size3: "Normal",
      size4: "Medium-large",
      size5: "Big",
      size6: "Very big",
      size7: "Maximum",
      defaultFont: "Default Font",
      viewSource: "View Source",
    },
    tree: {
      noNodes: "No nodes available",
      noResults: "No matching nodes found",
    },
  };
function Zo() {
  const e =
    Array.isArray(navigator.languages) === !0 &&
    navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language;
  if (typeof e == "string")
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
          ? t.toUpperCase()
          : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join("-");
}
const Oe = er(
  { __langPack: {} },
  {
    getLocale: Zo,
    set(e = Xo, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: Zo };
      {
        if (
          ((n.set = Oe.set),
          Oe.__langConfig === void 0 || Oe.__langConfig.noHtmlAttrs !== !0)
        ) {
          const r = document.documentElement;
          r.setAttribute("dir", n.rtl === !0 ? "rtl" : "ltr"),
            r.setAttribute("lang", n.isoName);
        }
        Object.assign(Oe.__langPack, n),
          (Oe.props = n),
          (Oe.isoName = n.isoName),
          (Oe.nativeName = n.nativeName);
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      (e.lang = Oe.__langPack),
        (Oe.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : this.set(t || Xo);
    },
  }
);
function Ac(e, t, n = document.body) {
  if (typeof e != "string")
    throw new TypeError("Expected a string as propName");
  if (typeof t != "string") throw new TypeError("Expected a string as value");
  if (!(n instanceof Element)) throw new TypeError("Expected a DOM element");
  n.style.setProperty(`--q-${e}`, t);
}
let _s = !1;
function Mc(e) {
  _s = e.isComposing === !0;
}
function Oc(e) {
  return (
    _s === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
  );
}
function un(e, t) {
  return Oc(e) === !0 ? !1 : [].concat(t).includes(e.keyCode);
}
function ys(e) {
  if (e.ios === !0) return "ios";
  if (e.android === !0) return "android";
}
function Fc({ is: e, has: t, within: n }, r) {
  const o = [
    e.desktop === !0 ? "desktop" : "mobile",
    `${t.touch === !1 ? "no-" : ""}touch`,
  ];
  if (e.mobile === !0) {
    const i = ys(e);
    i !== void 0 && o.push("platform-" + i);
  }
  if (e.nativeMobile === !0) {
    const i = e.nativeMobileWrapper;
    o.push(i),
      o.push("native-mobile"),
      e.ios === !0 &&
        (r[i] === void 0 || r[i].iosStatusBarPadding !== !1) &&
        o.push("q-ios-padding");
  } else e.electron === !0 ? o.push("electron") : e.bex === !0 && o.push("bex");
  return n.iframe === !0 && o.push("within-iframe"), o;
}
function $c() {
  const { is: e } = de,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, " ").split(" "));
  if (Gn !== void 0)
    n.delete("desktop"), n.add("platform-ios"), n.add("mobile");
  else if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete("mobile"),
        n.delete("platform-ios"),
        n.delete("platform-android"),
        n.add("desktop");
    else if (e.mobile === !0) {
      n.delete("desktop"), n.add("mobile");
      const o = ys(e);
      o !== void 0
        ? (n.add(`platform-${o}`),
          n.delete(`platform-${o === "ios" ? "android" : "ios"}`))
        : (n.delete("platform-ios"), n.delete("platform-android"));
    }
  }
  de.has.touch === !0 && (n.delete("no-touch"), n.add("touch")),
    de.within.iframe === !0 && n.add("within-iframe");
  const r = Array.from(n).join(" ");
  t !== r && (document.body.className = r);
}
function qc(e) {
  for (const t in e) Ac(t, e[t]);
}
const Rc = {
    install(e) {
      if (this.__installed !== !0) {
        if (wt.value === !0) $c();
        else {
          const { $q: t } = e;
          t.config.brand !== void 0 && qc(t.config.brand);
          const n = Fc(de, t.config);
          document.body.classList.add.apply(document.body.classList, n);
        }
        de.is.ios === !0 && document.body.addEventListener("touchstart", cn),
          window.addEventListener("keydown", Mc, !0);
      }
    },
  },
  Ic = {
    name: "material-icons",
    type: {
      positive: "check_circle",
      negative: "warning",
      info: "info",
      warning: "priority_high",
    },
    arrow: {
      up: "arrow_upward",
      right: "arrow_forward",
      down: "arrow_downward",
      left: "arrow_back",
      dropdown: "arrow_drop_down",
    },
    chevron: { left: "chevron_left", right: "chevron_right" },
    colorPicker: { spectrum: "gradient", tune: "tune", palette: "style" },
    pullToRefresh: { icon: "refresh" },
    carousel: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
      navigationIcon: "lens",
    },
    chip: { remove: "cancel", selected: "check" },
    datetime: {
      arrowLeft: "chevron_left",
      arrowRight: "chevron_right",
      now: "access_time",
      today: "today",
    },
    editor: {
      bold: "format_bold",
      italic: "format_italic",
      strikethrough: "strikethrough_s",
      underline: "format_underlined",
      unorderedList: "format_list_bulleted",
      orderedList: "format_list_numbered",
      subscript: "vertical_align_bottom",
      superscript: "vertical_align_top",
      hyperlink: "link",
      toggleFullscreen: "fullscreen",
      quote: "format_quote",
      left: "format_align_left",
      center: "format_align_center",
      right: "format_align_right",
      justify: "format_align_justify",
      print: "print",
      outdent: "format_indent_decrease",
      indent: "format_indent_increase",
      removeFormat: "format_clear",
      formatting: "text_format",
      fontSize: "format_size",
      align: "format_align_left",
      hr: "remove",
      undo: "undo",
      redo: "redo",
      heading: "format_size",
      code: "code",
      size: "format_size",
      font: "font_download",
      viewSource: "code",
    },
    expansionItem: {
      icon: "keyboard_arrow_down",
      denseIcon: "arrow_drop_down",
    },
    fab: { icon: "add", activeIcon: "close" },
    field: { clear: "cancel", error: "error" },
    pagination: {
      first: "first_page",
      prev: "keyboard_arrow_left",
      next: "keyboard_arrow_right",
      last: "last_page",
    },
    rating: { icon: "grade" },
    stepper: { done: "check", active: "edit", error: "warning" },
    tabs: {
      left: "chevron_left",
      right: "chevron_right",
      up: "keyboard_arrow_up",
      down: "keyboard_arrow_down",
    },
    table: {
      arrowUp: "arrow_upward",
      warning: "warning",
      firstPage: "first_page",
      prevPage: "chevron_left",
      nextPage: "chevron_right",
      lastPage: "last_page",
    },
    tree: { icon: "play_arrow" },
    uploader: {
      done: "done",
      clear: "clear",
      add: "add_box",
      upload: "cloud_upload",
      removeQueue: "clear_all",
      removeUploaded: "done_all",
    },
  },
  Rn = er(
    { iconMapFn: null, __icons: {} },
    {
      set(e, t) {
        const n = { ...e, rtl: e.rtl === !0 };
        (n.set = Rn.set), Object.assign(Rn.__icons, n);
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__icons),
          Zn(
            e,
            "iconMapFn",
            () => this.iconMapFn,
            (r) => {
              this.iconMapFn = r;
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : this.set(t || Ic);
      },
    }
  ),
  Bc = "_q_",
  In = {};
let ws = !1;
function Nc() {
  ws = !0;
}
function Go(e) {
  return e !== null && typeof e == "object" && Array.isArray(e) !== !0;
}
const ei = [qr, Rc, me, kc, Rr, Oe, Rn];
function ti(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0);
  });
}
function Dc(e, t, n) {
  (e.config.globalProperties.$q = n.$q),
    e.provide(Bc, n.$q),
    ti(n, ei),
    t.components !== void 0 &&
      Object.values(t.components).forEach((r) => {
        Go(r) === !0 && r.name !== void 0 && e.component(r.name, r);
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((r) => {
        Go(r) === !0 && r.name !== void 0 && e.directive(r.name, r);
      }),
    t.plugins !== void 0 &&
      ti(
        n,
        Object.values(t.plugins).filter(
          (r) => typeof r.install == "function" && ei.includes(r) === !1
        )
      ),
    wt.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((r) => {
          r();
        }),
          (n.$q.onSSRHydrated = () => {});
      });
}
const jc = function (e, t = {}) {
    const n = { version: "2.12.6" };
    ws === !1
      ? (t.config !== void 0 && Object.assign(In, t.config),
        (n.config = { ...In }),
        Nc())
      : (n.config = t.config || {}),
      Dc(e, t, {
        parentApp: e,
        $q: n,
        lang: t.lang,
        iconSet: t.iconSet,
        onSSRHydrated: [],
      });
  },
  Hc = { version: "2.12.6", install: jc, lang: Oe, iconSet: Rn };
const Ct = (e) => Hn(Ql(e)),
  xs = (e) => Hn(e),
  zc = X("div", { class: "q-space" }),
  Kc = Ct({
    name: "QSpace",
    setup() {
      return () => zc;
    },
  }),
  Ir = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  Cs = { size: String };
function Es(e, t = Ir) {
  return H(() =>
    e.size !== void 0
      ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size }
      : null
  );
}
function tr(e, t) {
  return (e !== void 0 && e()) || t;
}
function Jt(e, t) {
  return e !== void 0 ? t.concat(e()) : t;
}
const ni = "0 0 24 24",
  ri = (e) => e,
  gr = (e) => `ionicons ${e}`,
  Ts = {
    "mdi-": (e) => `mdi ${e}`,
    "icon-": ri,
    "bt-": (e) => `bt ${e}`,
    "eva-": (e) => `eva ${e}`,
    "ion-md": gr,
    "ion-ios": gr,
    "ion-logo": gr,
    "iconfont ": ri,
    "ti-": (e) => `themify-icon ${e}`,
    "bi-": (e) => `bootstrap-icons ${e}`,
  },
  ks = { o_: "-outlined", r_: "-round", s_: "-sharp" },
  Ps = { sym_o_: "-outlined", sym_r_: "-rounded", sym_s_: "-sharp" },
  Uc = new RegExp("^(" + Object.keys(Ts).join("|") + ")"),
  Wc = new RegExp("^(" + Object.keys(ks).join("|") + ")"),
  oi = new RegExp("^(" + Object.keys(Ps).join("|") + ")"),
  Vc = /^[Mm]\s?[-+]?\.?\d/,
  Qc = /^img:/,
  Jc = /^svguse:/,
  Yc = /^ion-/,
  Xc = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /,
  ii = Ct({
    name: "QIcon",
    props: {
      ...Cs,
      tag: { type: String, default: "i" },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean,
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n },
        } = Je(),
        r = Es(e),
        o = H(
          () =>
            "q-icon" +
            (e.left === !0 ? " on-left" : "") +
            (e.right === !0 ? " on-right" : "") +
            (e.color !== void 0 ? ` text-${e.color}` : "")
        ),
        i = H(() => {
          let s,
            l = e.name;
          if (l === "none" || !l) return { none: !0 };
          if (n.iconMapFn !== null) {
            const h = n.iconMapFn(l);
            if (h !== void 0)
              if (h.icon !== void 0) {
                if (((l = h.icon), l === "none" || !l)) return { none: !0 };
              } else
                return {
                  cls: h.cls,
                  content: h.content !== void 0 ? h.content : " ",
                };
          }
          if (Vc.test(l) === !0) {
            const [h, p = ni] = l.split("|");
            return {
              svg: !0,
              viewBox: p,
              nodes: h.split("&&").map((d) => {
                const [_, x, E] = d.split("@@");
                return X("path", { style: x, d: _, transform: E });
              }),
            };
          }
          if (Qc.test(l) === !0) return { img: !0, src: l.substring(4) };
          if (Jc.test(l) === !0) {
            const [h, p = ni] = l.split("|");
            return { svguse: !0, src: h.substring(7), viewBox: p };
          }
          let a = " ";
          const u = l.match(Uc);
          if (u !== null) s = Ts[u[1]](l);
          else if (Xc.test(l) === !0) s = l;
          else if (Yc.test(l) === !0)
            s = `ionicons ion-${
              n.platform.is.ios === !0 ? "ios" : "md"
            }${l.substring(3)}`;
          else if (oi.test(l) === !0) {
            s = "notranslate material-symbols";
            const h = l.match(oi);
            h !== null && ((l = l.substring(6)), (s += Ps[h[1]])), (a = l);
          } else {
            s = "notranslate material-icons";
            const h = l.match(Wc);
            h !== null && ((l = l.substring(2)), (s += ks[h[1]])), (a = l);
          }
          return { cls: s, content: a };
        });
      return () => {
        const s = {
          class: o.value,
          style: r.value,
          "aria-hidden": "true",
          role: "presentation",
        };
        return i.value.none === !0
          ? X(e.tag, s, tr(t.default))
          : i.value.img === !0
          ? X("span", s, Jt(t.default, [X("img", { src: i.value.src })]))
          : i.value.svg === !0
          ? X(
              "span",
              s,
              Jt(t.default, [
                X(
                  "svg",
                  { viewBox: i.value.viewBox || "0 0 24 24" },
                  i.value.nodes
                ),
              ])
            )
          : i.value.svguse === !0
          ? X(
              "span",
              s,
              Jt(t.default, [
                X("svg", { viewBox: i.value.viewBox }, [
                  X("use", { "xlink:href": i.value.src }),
                ]),
              ])
            )
          : (i.value.cls !== void 0 && (s.class += " " + i.value.cls),
            X(e.tag, s, Jt(t.default, [i.value.content])));
      };
    },
  }),
  Zc = { size: { type: [Number, String], default: "1em" }, color: String };
function Gc(e) {
  return {
    cSize: H(() => (e.size in Ir ? `${Ir[e.size]}px` : e.size)),
    classes: H(() => "q-spinner" + (e.color ? ` text-${e.color}` : "")),
  };
}
const eu = Ct({
  name: "QSpinner",
  props: { ...Zc, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = Gc(e);
    return () =>
      X(
        "svg",
        {
          class: n.value + " q-spinner-mat",
          width: t.value,
          height: t.value,
          viewBox: "25 25 50 50",
        },
        [
          X("circle", {
            class: "path",
            cx: "50",
            cy: "50",
            r: "20",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": e.thickness,
            "stroke-miterlimit": "10",
          }),
        ]
      );
  },
});
function tu(e, t) {
  const n = e.style;
  for (const r in t) n[r] = t[r];
}
function nu(e, t) {
  if (e == null || e.contains(t) === !0) return !0;
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling)
    if (n.contains(t)) return !0;
  return !1;
}
function ru(e, t = 250) {
  let n = !1,
    r;
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1;
        }, t),
        (r = e.apply(this, arguments))),
      r
    );
  };
}
function si(e, t, n, r) {
  n.modifiers.stop === !0 && vs(e);
  const o = n.modifiers.color;
  let i = n.modifiers.center;
  i = i === !0 || r === !0;
  const s = document.createElement("span"),
    l = document.createElement("span"),
    a = yc(e),
    { left: u, top: h, width: p, height: d } = t.getBoundingClientRect(),
    _ = Math.sqrt(p * p + d * d),
    x = _ / 2,
    E = `${(p - _) / 2}px`,
    P = i ? E : `${a.left - u - x}px`,
    I = `${(d - _) / 2}px`,
    S = i ? I : `${a.top - h - x}px`;
  (l.className = "q-ripple__inner"),
    tu(l, {
      height: `${_}px`,
      width: `${_}px`,
      transform: `translate3d(${P},${S},0) scale3d(.2,.2,1)`,
      opacity: 0,
    }),
    (s.className = `q-ripple${o ? " text-" + o : ""}`),
    s.setAttribute("dir", "ltr"),
    s.appendChild(l),
    t.appendChild(s);
  const j = () => {
    s.remove(), clearTimeout(A);
  };
  n.abort.push(j);
  let A = setTimeout(() => {
    l.classList.add("q-ripple__inner--enter"),
      (l.style.transform = `translate3d(${E},${I},0) scale3d(1,1,1)`),
      (l.style.opacity = 0.2),
      (A = setTimeout(() => {
        l.classList.remove("q-ripple__inner--enter"),
          l.classList.add("q-ripple__inner--leave"),
          (l.style.opacity = 0),
          (A = setTimeout(() => {
            s.remove(), n.abort.splice(n.abort.indexOf(j), 1);
          }, 275));
      }, 250));
  }, 50);
}
function li(e, { modifiers: t, value: n, arg: r }) {
  const o = Object.assign({}, e.cfg.ripple, t, n);
  e.modifiers = {
    early: o.early === !0,
    stop: o.stop === !0,
    center: o.center === !0,
    color: o.color || r,
    keyCodes: [].concat(o.keyCodes || 13),
  };
}
const ou = xs({
    name: "ripple",
    beforeMount(e, t) {
      const n = t.instance.$.appContext.config.globalProperties.$q.config || {};
      if (n.ripple === !1) return;
      const r = {
        cfg: n,
        enabled: t.value !== !1,
        modifiers: {},
        abort: [],
        start(o) {
          r.enabled === !0 &&
            o.qSkipRipple !== !0 &&
            o.type === (r.modifiers.early === !0 ? "pointerdown" : "click") &&
            si(o, e, r, o.qKeyEvent === !0);
        },
        keystart: ru((o) => {
          r.enabled === !0 &&
            o.qSkipRipple !== !0 &&
            un(o, r.modifiers.keyCodes) === !0 &&
            o.type === `key${r.modifiers.early === !0 ? "down" : "up"}` &&
            si(o, e, r, !0);
        }, 300),
      };
      li(r, t),
        (e.__qripple = r),
        Cc(r, "main", [
          [e, "pointerdown", "start", "passive"],
          [e, "click", "start", "passive"],
          [e, "keydown", "keystart", "passive"],
          [e, "keyup", "keystart", "passive"],
        ]);
    },
    updated(e, t) {
      if (t.oldValue !== t.value) {
        const n = e.__qripple;
        n !== void 0 &&
          ((n.enabled = t.value !== !1),
          n.enabled === !0 && Object(t.value) === t.value && li(n, t));
      }
    },
    beforeUnmount(e) {
      const t = e.__qripple;
      t !== void 0 &&
        (t.abort.forEach((n) => {
          n();
        }),
        Ec(t, "main"),
        delete e._qripple);
    },
  }),
  Ss = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
    evenly: "evenly",
    stretch: "stretch",
  },
  iu = Object.keys(Ss),
  su = { align: { type: String, validator: (e) => iu.includes(e) } };
function lu(e) {
  return H(() => {
    const t =
      e.align === void 0 ? (e.vertical === !0 ? "stretch" : "left") : e.align;
    return `${e.vertical === !0 ? "items" : "justify"}-${Ss[t]}`;
  });
}
function Sn(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent;
  let { parent: t } = e.$;
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy;
    t = t.parent;
  }
}
function Ls(e) {
  return e.appContext.config.globalProperties.$router !== void 0;
}
function As(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0;
}
function ai(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
function ci(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function au(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (
      Array.isArray(o) === !1 ||
      o.length !== r.length ||
      r.some((i, s) => i !== o[s])
    )
      return !1;
  }
  return !0;
}
function ui(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function cu(e, t) {
  return Array.isArray(e) === !0
    ? ui(e, t)
    : Array.isArray(t) === !0
    ? ui(t, e)
    : e === t;
}
function uu(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (cu(e[n], t[n]) === !1) return !1;
  return !0;
}
const fu = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: { type: String, default: "q-router-link--active" },
  exactActiveClass: { type: String, default: "q-router-link--exact-active" },
  href: String,
  target: String,
  disable: Boolean,
};
function du({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = Je(),
    { props: r, proxy: o, emit: i } = n,
    s = Ls(n),
    l = H(() => r.disable !== !0 && r.href !== void 0),
    a = H(
      t === !0
        ? () =>
            s === !0 &&
            r.disable !== !0 &&
            l.value !== !0 &&
            r.to !== void 0 &&
            r.to !== null &&
            r.to !== ""
        : () =>
            s === !0 &&
            l.value !== !0 &&
            r.to !== void 0 &&
            r.to !== null &&
            r.to !== ""
    ),
    u = H(() => (a.value === !0 ? S(r.to) : null)),
    h = H(() => u.value !== null),
    p = H(() => l.value === !0 || h.value === !0),
    d = H(() => (r.type === "a" || p.value === !0 ? "a" : r.tag || e || "div")),
    _ = H(() =>
      l.value === !0
        ? { href: r.href, target: r.target }
        : h.value === !0
        ? { href: u.value.href, target: r.target }
        : {}
    ),
    x = H(() => {
      if (h.value === !1) return -1;
      const { matched: B } = u.value,
        { length: V } = B,
        U = B[V - 1];
      if (U === void 0) return -1;
      const O = o.$route.matched;
      if (O.length === 0) return -1;
      const M = O.findIndex(ci.bind(null, U));
      if (M > -1) return M;
      const N = ai(B[V - 2]);
      return V > 1 && ai(U) === N && O[O.length - 1].path !== N
        ? O.findIndex(ci.bind(null, B[V - 2]))
        : M;
    }),
    E = H(
      () =>
        h.value === !0 && x.value !== -1 && au(o.$route.params, u.value.params)
    ),
    P = H(
      () =>
        E.value === !0 &&
        x.value === o.$route.matched.length - 1 &&
        uu(o.$route.params, u.value.params)
    ),
    I = H(() =>
      h.value === !0
        ? P.value === !0
          ? ` ${r.exactActiveClass} ${r.activeClass}`
          : r.exact === !0
          ? ""
          : E.value === !0
          ? ` ${r.activeClass}`
          : ""
        : ""
    );
  function S(B) {
    try {
      return o.$router.resolve(B);
    } catch {}
    return null;
  }
  function j(
    B,
    { returnRouterError: V, to: U = r.to, replace: O = r.replace } = {}
  ) {
    if (r.disable === !0) return B.preventDefault(), Promise.resolve(!1);
    if (
      B.metaKey ||
      B.altKey ||
      B.ctrlKey ||
      B.shiftKey ||
      (B.button !== void 0 && B.button !== 0) ||
      r.target === "_blank"
    )
      return Promise.resolve(!1);
    B.preventDefault();
    const M = o.$router[O === !0 ? "replace" : "push"](U);
    return V === !0 ? M : M.then(() => {}).catch(() => {});
  }
  function A(B) {
    if (h.value === !0) {
      const V = (U) => j(B, U);
      i("click", B, V), B.defaultPrevented !== !0 && V();
    } else i("click", B);
  }
  return {
    hasRouterLink: h,
    hasHrefLink: l,
    hasLink: p,
    linkTag: d,
    resolvedLink: u,
    linkIsActive: E,
    linkIsExactActive: P,
    linkClass: I,
    linkAttrs: _,
    getLink: S,
    navigateToRouterLink: j,
    navigateOnClick: A,
  };
}
const fi = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  hu = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  pu = ["button", "submit", "reset"],
  gu = /[^\s]\/[^\s]/,
  mu = ["flat", "outline", "push", "unelevated"],
  vu = (e, t) =>
    e.flat === !0
      ? "flat"
      : e.outline === !0
      ? "outline"
      : e.push === !0
      ? "push"
      : e.unelevated === !0
      ? "unelevated"
      : t,
  bu = {
    ...Cs,
    ...fu,
    type: { type: String, default: "button" },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...mu.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    round: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...su.align, default: "center" },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean,
  };
function _u(e) {
  const t = Es(e, hu),
    n = lu(e),
    {
      hasRouterLink: r,
      hasLink: o,
      linkTag: i,
      linkAttrs: s,
      navigateOnClick: l,
    } = du({ fallbackTag: "button" }),
    a = H(() => {
      const P = e.fab === !1 && e.fabMini === !1 ? t.value : {};
      return e.padding !== void 0
        ? Object.assign({}, P, {
            padding: e.padding
              .split(/\s+/)
              .map((I) => (I in fi ? fi[I] + "px" : I))
              .join(" "),
            minWidth: "0",
            minHeight: "0",
          })
        : P;
    }),
    u = H(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    h = H(() => e.disable !== !0 && e.loading !== !0),
    p = H(() => (h.value === !0 ? e.tabindex || 0 : -1)),
    d = H(() => vu(e, "standard")),
    _ = H(() => {
      const P = { tabindex: p.value };
      return (
        o.value === !0
          ? Object.assign(P, s.value)
          : pu.includes(e.type) === !0 && (P.type = e.type),
        i.value === "a"
          ? (e.disable === !0
              ? (P["aria-disabled"] = "true")
              : P.href === void 0 && (P.role = "button"),
            r.value !== !0 && gu.test(e.type) === !0 && (P.type = e.type))
          : e.disable === !0 &&
            ((P.disabled = ""), (P["aria-disabled"] = "true")),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(P, {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.percentage,
          }),
        P
      );
    }),
    x = H(() => {
      let P;
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (P = `text-${e.textColor || e.color}`)
          : (P = `bg-${e.color} text-${e.textColor || "white"}`)
        : e.textColor && (P = `text-${e.textColor}`);
      const I =
        e.round === !0
          ? "round"
          : `rectangle${
              u.value === !0
                ? " q-btn--rounded"
                : e.square === !0
                ? " q-btn--square"
                : ""
            }`;
      return (
        `q-btn--${d.value} q-btn--${I}` +
        (P !== void 0 ? " " + P : "") +
        (h.value === !0
          ? " q-btn--actionable q-focusable q-hoverable"
          : e.disable === !0
          ? " disabled"
          : "") +
        (e.fab === !0
          ? " q-btn--fab"
          : e.fabMini === !0
          ? " q-btn--fab-mini"
          : "") +
        (e.noCaps === !0 ? " q-btn--no-uppercase" : "") +
        (e.dense === !0 ? " q-btn--dense" : "") +
        (e.stretch === !0 ? " no-border-radius self-stretch" : "") +
        (e.glossy === !0 ? " glossy" : "") +
        (e.square ? " q-btn--square" : "")
      );
    }),
    E = H(
      () =>
        n.value +
        (e.stack === !0 ? " column" : " row") +
        (e.noWrap === !0 ? " no-wrap text-no-wrap" : "") +
        (e.loading === !0 ? " q-btn__content--hidden" : "")
    );
  return {
    classes: x,
    style: a,
    innerClasses: E,
    attributes: _,
    hasLink: o,
    linkTag: i,
    navigateOnClick: l,
    isActionable: h,
  };
}
const { passiveCapture: ke } = Pe;
let Pt = null,
  St = null,
  Lt = null;
const yu = Ct({
    name: "QBtn",
    props: {
      ...bu,
      percentage: Number,
      darkPercentage: Boolean,
      onTouchstart: [Function, Array],
    },
    emits: ["click", "keydown", "mousedown", "keyup"],
    setup(e, { slots: t, emit: n }) {
      const { proxy: r } = Je(),
        {
          classes: o,
          style: i,
          innerClasses: s,
          attributes: l,
          hasLink: a,
          linkTag: u,
          navigateOnClick: h,
          isActionable: p,
        } = _u(e),
        d = ce(null),
        _ = ce(null);
      let x = null,
        E,
        P = null;
      const I = H(
          () => e.label !== void 0 && e.label !== null && e.label !== ""
        ),
        S = H(() =>
          e.disable === !0 || e.ripple === !1
            ? !1
            : {
                keyCodes: a.value === !0 ? [13, 32] : [13],
                ...(e.ripple === !0 ? {} : e.ripple),
              }
        ),
        j = H(() => ({ center: e.round })),
        A = H(() => {
          const L = Math.max(0, Math.min(100, e.percentage));
          return L > 0
            ? {
                transition: "transform 0.6s",
                transform: `translateX(${L - 100}%)`,
              }
            : {};
        }),
        B = H(() => {
          if (e.loading === !0)
            return {
              onMousedown: Q,
              onTouchstart: Q,
              onClick: Q,
              onKeydown: Q,
              onKeyup: Q,
            };
          if (p.value === !0) {
            const L = { onClick: U, onKeydown: O, onMousedown: N };
            if (r.$q.platform.has.touch === !0) {
              const te = e.onTouchstart !== void 0 ? "" : "Passive";
              L[`onTouchstart${te}`] = M;
            }
            return L;
          }
          return { onClick: ft };
        }),
        V = H(() => ({
          ref: d,
          class: "q-btn q-btn-item non-selectable no-outline " + o.value,
          style: i.value,
          ...l.value,
          ...B.value,
        }));
      function U(L) {
        if (d.value !== null) {
          if (L !== void 0) {
            if (L.defaultPrevented === !0) return;
            const te = document.activeElement;
            if (
              e.type === "submit" &&
              te !== document.body &&
              d.value.contains(te) === !1 &&
              te.contains(d.value) === !1
            ) {
              d.value.focus();
              const ee = () => {
                document.removeEventListener("keydown", ft, !0),
                  document.removeEventListener("keyup", ee, ke),
                  d.value !== null &&
                    d.value.removeEventListener("blur", ee, ke);
              };
              document.addEventListener("keydown", ft, !0),
                document.addEventListener("keyup", ee, ke),
                d.value.addEventListener("blur", ee, ke);
            }
          }
          h(L);
        }
      }
      function O(L) {
        d.value !== null &&
          (n("keydown", L),
          un(L, [13, 32]) === !0 &&
            St !== d.value &&
            (St !== null && T(),
            L.defaultPrevented !== !0 &&
              (d.value.focus(),
              (St = d.value),
              d.value.classList.add("q-btn--active"),
              document.addEventListener("keyup", $, !0),
              d.value.addEventListener("blur", $, ke)),
            ft(L)));
      }
      function M(L) {
        d.value !== null &&
          (n("touchstart", L),
          L.defaultPrevented !== !0 &&
            (Pt !== d.value &&
              (Pt !== null && T(),
              (Pt = d.value),
              (x = L.target),
              x.addEventListener("touchcancel", $, ke),
              x.addEventListener("touchend", $, ke)),
            (E = !0),
            P !== null && clearTimeout(P),
            (P = setTimeout(() => {
              (P = null), (E = !1);
            }, 200))));
      }
      function N(L) {
        d.value !== null &&
          ((L.qSkipRipple = E === !0),
          n("mousedown", L),
          L.defaultPrevented !== !0 &&
            Lt !== d.value &&
            (Lt !== null && T(),
            (Lt = d.value),
            d.value.classList.add("q-btn--active"),
            document.addEventListener("mouseup", $, ke)));
      }
      function $(L) {
        if (
          d.value !== null &&
          !(
            L !== void 0 &&
            L.type === "blur" &&
            document.activeElement === d.value
          )
        ) {
          if (L !== void 0 && L.type === "keyup") {
            if (St === d.value && un(L, [13, 32]) === !0) {
              const te = new MouseEvent("click", L);
              (te.qKeyEvent = !0),
                L.defaultPrevented === !0 && xc(te),
                L.cancelBubble === !0 && vs(te),
                d.value.dispatchEvent(te),
                ft(L),
                (L.qKeyEvent = !0);
            }
            n("keyup", L);
          }
          T();
        }
      }
      function T(L) {
        const te = _.value;
        L !== !0 &&
          (Pt === d.value || Lt === d.value) &&
          te !== null &&
          te !== document.activeElement &&
          (te.setAttribute("tabindex", -1), te.focus()),
          Pt === d.value &&
            (x !== null &&
              (x.removeEventListener("touchcancel", $, ke),
              x.removeEventListener("touchend", $, ke)),
            (Pt = x = null)),
          Lt === d.value &&
            (document.removeEventListener("mouseup", $, ke), (Lt = null)),
          St === d.value &&
            (document.removeEventListener("keyup", $, !0),
            d.value !== null && d.value.removeEventListener("blur", $, ke),
            (St = null)),
          d.value !== null && d.value.classList.remove("q-btn--active");
      }
      function Q(L) {
        ft(L), (L.qSkipRipple = !0);
      }
      return (
        xt(() => {
          T(!0);
        }),
        Object.assign(r, { click: U }),
        () => {
          let L = [];
          e.icon !== void 0 &&
            L.push(
              X(ii, {
                name: e.icon,
                left: e.stack === !1 && I.value === !0,
                role: "img",
                "aria-hidden": "true",
              })
            ),
            I.value === !0 && L.push(X("span", { class: "block" }, [e.label])),
            (L = Jt(t.default, L)),
            e.iconRight !== void 0 &&
              e.round === !1 &&
              L.push(
                X(ii, {
                  name: e.iconRight,
                  right: e.stack === !1 && I.value === !0,
                  role: "img",
                  "aria-hidden": "true",
                })
              );
          const te = [X("span", { class: "q-focus-helper", ref: _ })];
          return (
            e.loading === !0 &&
              e.percentage !== void 0 &&
              te.push(
                X(
                  "span",
                  {
                    class:
                      "q-btn__progress absolute-full overflow-hidden" +
                      (e.darkPercentage === !0 ? " q-btn__progress--dark" : ""),
                  },
                  [
                    X("span", {
                      class: "q-btn__progress-indicator fit block",
                      style: A.value,
                    }),
                  ]
                )
              ),
            te.push(
              X(
                "span",
                {
                  class:
                    "q-btn__content text-center col items-center q-anchor--skip " +
                    s.value,
                },
                L
              )
            ),
            e.loading !== null &&
              te.push(
                X(an, { name: "q-transition--fade" }, () =>
                  e.loading === !0
                    ? [
                        X(
                          "span",
                          {
                            key: "loading",
                            class: "absolute-full flex flex-center",
                          },
                          t.loading !== void 0 ? t.loading() : [X(eu)]
                        ),
                      ]
                    : null
                )
              ),
            Zi(X(u.value, V.value, te), [[ou, S.value, void 0, j.value]])
          );
        }
      );
    },
  }),
  di = Ct({
    name: "QCardSection",
    props: { tag: { type: String, default: "div" }, horizontal: Boolean },
    setup(e, { slots: t }) {
      const n = H(
        () =>
          `q-card__section q-card__section--${
            e.horizontal === !0 ? "horiz row no-wrap" : "vert"
          }`
      );
      return () => X(e.tag, { class: n.value }, tr(t.default));
    },
  }),
  wu = { dark: { type: Boolean, default: null } };
function xu(e, t) {
  return H(() => (e.dark === null ? t.dark.isActive : e.dark));
}
const Cu = Ct({
  name: "QCard",
  props: {
    ...wu,
    tag: { type: String, default: "div" },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean,
  },
  setup(e, { slots: t }) {
    const {
        proxy: { $q: n },
      } = Je(),
      r = xu(e, n),
      o = H(
        () =>
          "q-card" +
          (r.value === !0 ? " q-card--dark q-dark" : "") +
          (e.bordered === !0 ? " q-card--bordered" : "") +
          (e.square === !0 ? " q-card--square no-border-radius" : "") +
          (e.flat === !0 ? " q-card--flat no-shadow" : "")
      );
    return () => X(e.tag, { class: o.value }, tr(t.default));
  },
});
function Eu(e, t, n) {
  let r;
  function o() {
    r !== void 0 && (Rr.remove(r), (r = void 0));
  }
  return (
    xt(() => {
      e.value === !0 && o();
    }),
    {
      removeFromHistory: o,
      addToHistory() {
        (r = { condition: () => n.value === !0, handler: t }), Rr.add(r);
      },
    }
  );
}
function Tu() {
  let e = null;
  const t = Je();
  function n() {
    e !== null && (clearTimeout(e), (e = null));
  }
  return (
    eo(n),
    xt(n),
    {
      removeTimeout: n,
      registerTimeout(r, o) {
        n(), As(t) === !1 && (e = setTimeout(r, o));
      },
    }
  );
}
function ku() {
  let e;
  const t = Je();
  function n() {
    e = void 0;
  }
  return (
    eo(n),
    xt(n),
    {
      removeTick: n,
      registerTick(r) {
        (e = r),
          On(() => {
            e === r && (As(t) === !1 && e(), (e = void 0));
          });
      },
    }
  );
}
const Pu = {
    modelValue: { type: Boolean, default: null },
    "onUpdate:modelValue": [Function, Array],
  },
  Su = ["beforeShow", "show", "beforeHide", "hide"];
function Lu({
  showing: e,
  canShow: t,
  hideOnRouteChange: n,
  handleShow: r,
  handleHide: o,
  processOnMount: i,
}) {
  const s = Je(),
    { props: l, emit: a, proxy: u } = s;
  let h;
  function p(S) {
    e.value === !0 ? x(S) : d(S);
  }
  function d(S) {
    if (
      l.disable === !0 ||
      (S !== void 0 && S.qAnchorHandled === !0) ||
      (t !== void 0 && t(S) !== !0)
    )
      return;
    const j = l["onUpdate:modelValue"] !== void 0;
    j === !0 &&
      (a("update:modelValue", !0),
      (h = S),
      On(() => {
        h === S && (h = void 0);
      })),
      (l.modelValue === null || j === !1) && _(S);
  }
  function _(S) {
    e.value !== !0 &&
      ((e.value = !0), a("beforeShow", S), r !== void 0 ? r(S) : a("show", S));
  }
  function x(S) {
    if (l.disable === !0) return;
    const j = l["onUpdate:modelValue"] !== void 0;
    j === !0 &&
      (a("update:modelValue", !1),
      (h = S),
      On(() => {
        h === S && (h = void 0);
      })),
      (l.modelValue === null || j === !1) && E(S);
  }
  function E(S) {
    e.value !== !1 &&
      ((e.value = !1), a("beforeHide", S), o !== void 0 ? o(S) : a("hide", S));
  }
  function P(S) {
    l.disable === !0 && S === !0
      ? l["onUpdate:modelValue"] !== void 0 && a("update:modelValue", !1)
      : (S === !0) !== e.value && (S === !0 ? _ : E)(h);
  }
  vt(() => l.modelValue, P),
    n !== void 0 &&
      Ls(s) === !0 &&
      vt(
        () => u.$route.fullPath,
        () => {
          n.value === !0 && e.value === !0 && x();
        }
      ),
    i === !0 &&
      Qn(() => {
        P(l.modelValue);
      });
  const I = { show: d, hide: x, toggle: p };
  return Object.assign(u, I), I;
}
const Au = {
  transitionShow: { type: String, default: "fade" },
  transitionHide: { type: String, default: "fade" },
  transitionDuration: { type: [String, Number], default: 300 },
};
function Mu(e, t = () => {}, n = () => {}) {
  return {
    transitionProps: H(() => {
      const r = `q-transition--${e.transitionShow || t()}`,
        o = `q-transition--${e.transitionHide || n()}`;
      return {
        appear: !0,
        enterFromClass: `${r}-enter-from`,
        enterActiveClass: `${r}-enter-active`,
        enterToClass: `${r}-enter-to`,
        leaveFromClass: `${o}-leave-from`,
        leaveActiveClass: `${o}-leave-active`,
        leaveToClass: `${o}-leave-to`,
      };
    }),
    transitionStyle: H(
      () => `--q-transition-duration: ${e.transitionDuration}ms`
    ),
  };
}
let Yt = [],
  fn = [];
function Ms(e) {
  fn = fn.filter((t) => t !== e);
}
function Ou(e) {
  Ms(e), fn.push(e);
}
function hi(e) {
  Ms(e), fn.length === 0 && Yt.length !== 0 && (Yt[Yt.length - 1](), (Yt = []));
}
function Fu(e) {
  fn.length === 0 ? e() : Yt.push(e);
}
let $u = 1,
  qu = document.body;
function Ru(e, t) {
  const n = document.createElement("div");
  if (
    ((n.id = t !== void 0 ? `q-portal--${t}--${$u++}` : e),
    In.globalNodes !== void 0)
  ) {
    const r = In.globalNodes.class;
    r !== void 0 && (n.className = r);
  }
  return qu.appendChild(n), n;
}
function Iu(e) {
  e.remove();
}
const Ln = [];
function Bu(e) {
  return Ln.find((t) => t.contentEl !== null && t.contentEl.contains(e));
}
function Nu(e, t) {
  do {
    if (e.$options.name === "QMenu") {
      if ((e.hide(t), e.$props.separateClosePopup === !0)) return Sn(e);
    } else if (e.__qPortal === !0) {
      const n = Sn(e);
      return n !== void 0 && n.$options.name === "QPopupProxy"
        ? (e.hide(t), n)
        : e;
    }
    e = Sn(e);
  } while (e != null);
}
function Du(e, t, n) {
  for (; n !== 0 && e !== void 0 && e !== null; ) {
    if (e.__qPortal === !0) {
      if ((n--, e.$options.name === "QMenu")) {
        e = Nu(e, t);
        continue;
      }
      e.hide(t);
    }
    e = Sn(e);
  }
}
function ju(e) {
  for (e = e.parent; e != null; ) {
    if (e.type.name === "QGlobalDialog") return !0;
    if (e.type.name === "QDialog" || e.type.name === "QMenu") return !1;
    e = e.parent;
  }
  return !1;
}
function Hu(e, t, n, r) {
  const o = ce(!1),
    i = ce(!1);
  let s = null;
  const l = {},
    a = r === "dialog" && ju(e);
  function u(p) {
    if (p === !0) {
      hi(l), (i.value = !0);
      return;
    }
    (i.value = !1),
      o.value === !1 &&
        (a === !1 && s === null && (s = Ru(!1, r)),
        (o.value = !0),
        Ln.push(e.proxy),
        Ou(l));
  }
  function h(p) {
    if (((i.value = !1), p !== !0)) return;
    hi(l), (o.value = !1);
    const d = Ln.indexOf(e.proxy);
    d !== -1 && Ln.splice(d, 1), s !== null && (Iu(s), (s = null));
  }
  return (
    to(() => {
      h(!0);
    }),
    (e.proxy.__qPortal = !0),
    Zn(e.proxy, "contentEl", () => t.value),
    {
      showPortal: u,
      hidePortal: h,
      portalIsActive: o,
      portalIsAccessible: i,
      renderPortal: () =>
        a === !0 ? n() : o.value === !0 ? [X(Ta, { to: s }, n())] : void 0,
    }
  );
}
function zu(e) {
  return e === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : e.scrollTop;
}
function Ku(e) {
  return e === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : e.scrollLeft;
}
function Uu(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
    ? e.scrollHeight > e.clientHeight &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-y"]))
    : e.scrollWidth > e.clientWidth &&
      (e.classList.contains("scroll") ||
        e.classList.contains("overflow-auto") ||
        ["auto", "scroll"].includes(window.getComputedStyle(e)["overflow-x"]));
}
let Ut = 0,
  mr,
  vr,
  Xt,
  br = !1,
  pi,
  gi,
  mi,
  ut = null;
function Wu(e) {
  Vu(e) && ft(e);
}
function Vu(e) {
  if (
    e.target === document.body ||
    e.target.classList.contains("q-layout__backdrop")
  )
    return !0;
  const t = wc(e),
    n = e.shiftKey && !e.deltaX,
    r = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    o = n || r ? e.deltaY : e.deltaX;
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    if (Uu(s, r))
      return r
        ? o < 0 && s.scrollTop === 0
          ? !0
          : o > 0 && s.scrollTop + s.clientHeight === s.scrollHeight
        : o < 0 && s.scrollLeft === 0
        ? !0
        : o > 0 && s.scrollLeft + s.clientWidth === s.scrollWidth;
  }
  return !0;
}
function vi(e) {
  e.target === document &&
    (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop);
}
function wn(e) {
  br !== !0 &&
    ((br = !0),
    requestAnimationFrame(() => {
      br = !1;
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: r } = document.scrollingElement;
      (Xt === void 0 || t !== window.innerHeight) &&
        ((Xt = n - t), (document.scrollingElement.scrollTop = r)),
        r > Xt &&
          (document.scrollingElement.scrollTop -= Math.ceil((r - Xt) / 8));
    }));
}
function bi(e) {
  const t = document.body,
    n = window.visualViewport !== void 0;
  if (e === "add") {
    const { overflowY: r, overflowX: o } = window.getComputedStyle(t);
    (mr = Ku(window)),
      (vr = zu(window)),
      (pi = t.style.left),
      (gi = t.style.top),
      (mi = window.location.href),
      (t.style.left = `-${mr}px`),
      (t.style.top = `-${vr}px`),
      o !== "hidden" &&
        (o === "scroll" || t.scrollWidth > window.innerWidth) &&
        t.classList.add("q-body--force-scrollbar-x"),
      r !== "hidden" &&
        (r === "scroll" || t.scrollHeight > window.innerHeight) &&
        t.classList.add("q-body--force-scrollbar-y"),
      t.classList.add("q-body--prevent-scroll"),
      (document.qScrollPrevented = !0),
      de.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener(
              "resize",
              wn,
              Pe.passiveCapture
            ),
            window.visualViewport.addEventListener(
              "scroll",
              wn,
              Pe.passiveCapture
            ),
            window.scrollTo(0, 0))
          : window.addEventListener("scroll", vi, Pe.passiveCapture));
  }
  de.is.desktop === !0 &&
    de.is.mac === !0 &&
    window[`${e}EventListener`]("wheel", Wu, Pe.notPassive),
    e === "remove" &&
      (de.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener(
              "resize",
              wn,
              Pe.passiveCapture
            ),
            window.visualViewport.removeEventListener(
              "scroll",
              wn,
              Pe.passiveCapture
            ))
          : window.removeEventListener("scroll", vi, Pe.passiveCapture)),
      t.classList.remove("q-body--prevent-scroll"),
      t.classList.remove("q-body--force-scrollbar-x"),
      t.classList.remove("q-body--force-scrollbar-y"),
      (document.qScrollPrevented = !1),
      (t.style.left = pi),
      (t.style.top = gi),
      window.location.href === mi && window.scrollTo(mr, vr),
      (Xt = void 0));
}
function Qu(e) {
  let t = "add";
  if (e === !0) {
    if ((Ut++, ut !== null)) {
      clearTimeout(ut), (ut = null);
      return;
    }
    if (Ut > 1) return;
  } else {
    if (Ut === 0 || (Ut--, Ut > 0)) return;
    if (((t = "remove"), de.is.ios === !0 && de.is.nativeMobile === !0)) {
      ut !== null && clearTimeout(ut),
        (ut = setTimeout(() => {
          bi(t), (ut = null);
        }, 100));
      return;
    }
  }
  bi(t);
}
function Ju() {
  let e;
  return {
    preventBodyScroll(t) {
      t !== e && (e !== void 0 || t === !0) && ((e = t), Qu(t));
    },
  };
}
const _t = [];
let It;
function Yu(e) {
  It = e.keyCode === 27;
}
function Xu() {
  It === !0 && (It = !1);
}
function Zu(e) {
  It === !0 && ((It = !1), un(e, 27) === !0 && _t[_t.length - 1](e));
}
function Os(e) {
  window[e]("keydown", Yu),
    window[e]("blur", Xu),
    window[e]("keyup", Zu),
    (It = !1);
}
function Gu(e) {
  de.is.desktop === !0 &&
    (_t.push(e), _t.length === 1 && Os("addEventListener"));
}
function _i(e) {
  const t = _t.indexOf(e);
  t > -1 && (_t.splice(t, 1), _t.length === 0 && Os("removeEventListener"));
}
const yt = [];
function Fs(e) {
  yt[yt.length - 1](e);
}
function ef(e) {
  de.is.desktop === !0 &&
    (yt.push(e),
    yt.length === 1 && document.body.addEventListener("focusin", Fs));
}
function yi(e) {
  const t = yt.indexOf(e);
  t > -1 &&
    (yt.splice(t, 1),
    yt.length === 0 && document.body.removeEventListener("focusin", Fs));
}
let xn = 0;
const tf = {
    standard: "fixed-full flex-center",
    top: "fixed-top justify-center",
    bottom: "fixed-bottom justify-center",
    right: "fixed-right items-center",
    left: "fixed-left items-center",
  },
  wi = {
    standard: ["scale", "scale"],
    top: ["slide-down", "slide-up"],
    bottom: ["slide-up", "slide-down"],
    right: ["slide-left", "slide-right"],
    left: ["slide-right", "slide-left"],
  },
  nf = Ct({
    name: "QDialog",
    inheritAttrs: !1,
    props: {
      ...Pu,
      ...Au,
      transitionShow: String,
      transitionHide: String,
      persistent: Boolean,
      autoClose: Boolean,
      allowFocusOutside: Boolean,
      noEscDismiss: Boolean,
      noBackdropDismiss: Boolean,
      noRouteDismiss: Boolean,
      noRefocus: Boolean,
      noFocus: Boolean,
      noShake: Boolean,
      seamless: Boolean,
      maximized: Boolean,
      fullWidth: Boolean,
      fullHeight: Boolean,
      square: Boolean,
      position: {
        type: String,
        default: "standard",
        validator: (e) =>
          e === "standard" || ["top", "bottom", "left", "right"].includes(e),
      },
    },
    emits: [...Su, "shake", "click", "escapeKey"],
    setup(e, { slots: t, emit: n, attrs: r }) {
      const o = Je(),
        i = ce(null),
        s = ce(!1),
        l = ce(!1);
      let a = null,
        u = null,
        h,
        p;
      const d = H(
          () =>
            e.persistent !== !0 && e.noRouteDismiss !== !0 && e.seamless !== !0
        ),
        { preventBodyScroll: _ } = Ju(),
        { registerTimeout: x } = Tu(),
        { registerTick: E, removeTick: P } = ku(),
        { transitionProps: I, transitionStyle: S } = Mu(
          e,
          () => wi[e.position][0],
          () => wi[e.position][1]
        ),
        {
          showPortal: j,
          hidePortal: A,
          portalIsAccessible: B,
          renderPortal: V,
        } = Hu(o, i, nr, "dialog"),
        { hide: U } = Lu({
          showing: s,
          hideOnRouteChange: d,
          handleShow: L,
          handleHide: te,
          processOnMount: !0,
        }),
        { addToHistory: O, removeFromHistory: M } = Eu(s, U, d),
        N = H(
          () =>
            `q-dialog__inner flex no-pointer-events q-dialog__inner--${
              e.maximized === !0 ? "maximized" : "minimized"
            } q-dialog__inner--${e.position} ${tf[e.position]}` +
            (l.value === !0 ? " q-dialog__inner--animating" : "") +
            (e.fullWidth === !0 ? " q-dialog__inner--fullwidth" : "") +
            (e.fullHeight === !0 ? " q-dialog__inner--fullheight" : "") +
            (e.square === !0 ? " q-dialog__inner--square" : "")
        ),
        $ = H(() => s.value === !0 && e.seamless !== !0),
        T = H(() => (e.autoClose === !0 ? { onClick: Ke } : {})),
        Q = H(() => [
          `q-dialog fullscreen no-pointer-events q-dialog--${
            $.value === !0 ? "modal" : "seamless"
          }`,
          r.class,
        ]);
      vt(
        () => e.maximized,
        (J) => {
          s.value === !0 && Ye(J);
        }
      ),
        vt($, (J) => {
          _(J), J === !0 ? (ef(Et), Gu(G)) : (yi(Et), _i(G));
        });
      function L(J) {
        O(),
          (u =
            e.noRefocus === !1 && document.activeElement !== null
              ? document.activeElement
              : null),
          Ye(e.maximized),
          j(),
          (l.value = !0),
          e.noFocus !== !0
            ? (document.activeElement !== null && document.activeElement.blur(),
              E(ee))
            : P(),
          x(() => {
            if (o.proxy.$q.platform.is.ios === !0) {
              if (e.seamless !== !0 && document.activeElement) {
                const { top: oe, bottom: Xe } =
                    document.activeElement.getBoundingClientRect(),
                  { innerHeight: jt } = window,
                  Be =
                    window.visualViewport !== void 0
                      ? window.visualViewport.height
                      : jt;
                oe > 0 &&
                  Xe > Be / 2 &&
                  (document.scrollingElement.scrollTop = Math.min(
                    document.scrollingElement.scrollHeight - Be,
                    Xe >= jt
                      ? 1 / 0
                      : Math.ceil(
                          document.scrollingElement.scrollTop + Xe - Be / 2
                        )
                  )),
                  document.activeElement.scrollIntoView();
              }
              (p = !0), i.value.click(), (p = !1);
            }
            j(!0), (l.value = !1), n("show", J);
          }, e.transitionDuration);
      }
      function te(J) {
        P(),
          M(),
          Ie(!0),
          (l.value = !0),
          A(),
          u !== null &&
            ((
              (J && J.type.indexOf("key") === 0
                ? u.closest('[tabindex]:not([tabindex^="-"])')
                : void 0) || u
            ).focus(),
            (u = null)),
          x(() => {
            A(!0), (l.value = !1), n("hide", J);
          }, e.transitionDuration);
      }
      function ee(J) {
        Fu(() => {
          let oe = i.value;
          oe === null ||
            oe.contains(document.activeElement) === !0 ||
            ((oe =
              (J !== "" ? oe.querySelector(J) : null) ||
              oe.querySelector(
                "[autofocus][tabindex], [data-autofocus][tabindex]"
              ) ||
              oe.querySelector(
                "[autofocus] [tabindex], [data-autofocus] [tabindex]"
              ) ||
              oe.querySelector("[autofocus], [data-autofocus]") ||
              oe),
            oe.focus({ preventScroll: !0 }));
        });
      }
      function re(J) {
        J && typeof J.focus == "function"
          ? J.focus({ preventScroll: !0 })
          : ee(),
          n("shake");
        const oe = i.value;
        oe !== null &&
          (oe.classList.remove("q-animate--scale"),
          oe.classList.add("q-animate--scale"),
          a !== null && clearTimeout(a),
          (a = setTimeout(() => {
            (a = null),
              i.value !== null &&
                (oe.classList.remove("q-animate--scale"), ee());
          }, 170)));
      }
      function G() {
        e.seamless !== !0 &&
          (e.persistent === !0 || e.noEscDismiss === !0
            ? e.maximized !== !0 && e.noShake !== !0 && re()
            : (n("escapeKey"), U()));
      }
      function Ie(J) {
        a !== null && (clearTimeout(a), (a = null)),
          (J === !0 || s.value === !0) &&
            (Ye(!1), e.seamless !== !0 && (_(!1), yi(Et), _i(G))),
          J !== !0 && (u = null);
      }
      function Ye(J) {
        J === !0
          ? h !== !0 &&
            (xn < 1 && document.body.classList.add("q-body--dialog"),
            xn++,
            (h = !0))
          : h === !0 &&
            (xn < 2 && document.body.classList.remove("q-body--dialog"),
            xn--,
            (h = !1));
      }
      function Ke(J) {
        p !== !0 && (U(J), n("click", J));
      }
      function Ee(J) {
        e.persistent !== !0 && e.noBackdropDismiss !== !0
          ? U(J)
          : e.noShake !== !0 && re();
      }
      function Et(J) {
        e.allowFocusOutside !== !0 &&
          B.value === !0 &&
          nu(i.value, J.target) !== !0 &&
          ee('[tabindex]:not([tabindex="-1"])');
      }
      Object.assign(o.proxy, {
        focus: ee,
        shake: re,
        __updateRefocusTarget(J) {
          u = J || null;
        },
      }),
        xt(Ie);
      function nr() {
        return X(
          "div",
          {
            role: "dialog",
            "aria-modal": $.value === !0 ? "true" : "false",
            ...r,
            class: Q.value,
          },
          [
            X(an, { name: "q-transition--fade", appear: !0 }, () =>
              $.value === !0
                ? X("div", {
                    class: "q-dialog__backdrop fixed-full",
                    style: S.value,
                    "aria-hidden": "true",
                    tabindex: -1,
                    onClick: Ee,
                  })
                : null
            ),
            X(an, I.value, () =>
              s.value === !0
                ? X(
                    "div",
                    {
                      ref: i,
                      class: N.value,
                      style: S.value,
                      tabindex: -1,
                      ...T.value,
                    },
                    tr(t.default)
                  )
                : null
            ),
          ]
        );
      }
      return V;
    },
  });
function xi(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
const rf = xs({
    name: "close-popup",
    beforeMount(e, { value: t }) {
      const n = {
        depth: xi(t),
        handler(r) {
          n.depth !== 0 &&
            setTimeout(() => {
              const o = Bu(e);
              o !== void 0 && Du(o, r, n.depth);
            });
        },
        handlerKey(r) {
          un(r, 13) === !0 && n.handler(r);
        },
      };
      (e.__qclosepopup = n),
        e.addEventListener("click", n.handler),
        e.addEventListener("keyup", n.handlerKey);
    },
    updated(e, { value: t, oldValue: n }) {
      t !== n && (e.__qclosepopup.depth = xi(t));
    },
    beforeUnmount(e) {
      const t = e.__qclosepopup;
      e.removeEventListener("click", t.handler),
        e.removeEventListener("keyup", t.handlerKey),
        delete e.__qclosepopup;
    },
  }),
  of = "./assets/animales-57ed4f2e.avif",
  sf = "./assets/colores-2444dc09.jpg",
  lf = "./assets/frutas-017659f5.avif",
  af = "./assets/inicio-c0a9f1df.png",
  cf = "./assets/error1-ea3c96a5.png",
  uf = "./assets/error2-d5b6aca0.png",
  ff = "./assets/error3-887ce648.png",
  df = "./assets/error4-66a13d72.png",
  hf = "./assets/error5-b4a3e5c8.png",
  pf = "./assets/error6-cab03b62.png",
  gf = "./assets/error7-8f7db387.png",
  mf = "./assets/error8-9412ee47.png",
  vf = "./assets/error9-7bc4cba0.png",
  bf = "./assets/gameover-c3803710.png",
  _f = "./assets/ganar-679cfbbc.jpg";
const yf = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  lo = (e) => (Rl("data-v-c88be80e"), (e = e()), Il(), e),
  wf = { key: 0, id: "contenedorTodo" },
  xf = { class: "parteuno" },
  Cf = lo(() =>
    ae("div", null, [ae("h1", { class: "titulo" }, "AHORCADO")], -1)
  ),
  Ef = lo(() => ae("span", null, "Empezar", -1)),
  Tf = [Ef],
  kf = { key: 1, class: "contenedor" },
  Pf = { class: "parte1" },
  Sf = ["src"],
  Lf = { class: "palabra" },
  Af = { class: "cuadrito" },
  Mf = { class: "tamaño" },
  Of = lo(() => ae("hr", null, null, -1)),
  Ff = { class: "contenedor2" },
  $f = { class: "parte2" },
  qf = ["onClick", "disabled"],
  Rf = { class: "q-pa-md q-gutter-sm" },
  If = { class: "text-h6" },
  Bf = ["onClick"],
  Nf = ["src"],
  Df = ["onClick"],
  jf = {
    setup() {
      return { icon: ce(!1), bar: ce(!1), bar2: ce(!1), toolbar: ce(!1) };
    },
  },
  Hf = Object.assign(jf, {
    __name: "App",
    setup(e) {
      const t = ce(!0),
        n = Array.from({ length: 26 }, (M, N) => String.fromCharCode(65 + N)),
        r = ce(!0),
        o = ce({ categoria: "Animales", dificultad: "Fácil" }),
        i = {
          Animales: {
            Fácil: ["gato", "perro", "pato", "pez"],
            Medio: ["elefante", "jirafa", "tigre", "rinoceronte"],
            Difícil: ["hipopotamo", "cocodrilo", "pinguino", "murcielago"],
          },
          Colores: {
            Fácil: ["verde", "rojo", "azul", "amarillo"],
            Medio: ["naranja", "violeta", "rosado", "gris"],
            Difícil: ["turquesa", "beige", "magenta"],
          },
          Frutas: {
            Fácil: ["manzana", "uva", "pera", "fresa"],
            Medio: ["sandia", "naranja", "platano", "kiwi"],
            Difícil: ["granada", "mango", "papaya", "frambuesa"],
          },
        },
        s = () => Math.floor(Math.random() * 3),
        l = ce([]),
        a = () => {
          console.log(o.value);
          const M = i[o.value.categoria][o.value.dificultad][s()],
            N = Array.from(M);
          l.value.length > 0 && (l.value = []);
          for (const $ of N) l.value.push($);
        },
        u = ce([""]),
        h = [af, cf, uf, ff, df, hf, pf, gf, mf, vf],
        p = ce(0),
        d = { Fácil: 1, Medio: 2, Difícil: 3 },
        _ = (M) => {
          if ((console.log("principio"), l.value.includes(M.toLowerCase()))) {
            if (
              (console.log(
                u.value.includes(M),
                "data",
                o.value.dificultad != "Difícil"
              ),
              u.value.includes(M) && o.value.dificultad === "Difícil")
            ) {
              console.log("hola"), (p.value += d[o.value.dificultad]);
              return;
            }
            console.log("adios"),
              u.value.push(M),
              o.value.dificultad != "Difícil" &&
                event.target.setAttribute("disabled", "true");
            return;
          }
          console.log("sin if"),
            (p.value += d[o.value.dificultad]),
            o.value.dificultad != "Difícil" &&
              event.target.setAttribute("disabled", "true");
        },
        x = H(
          () => (M) =>
            u.value.find(($) => String($) === String(M.toUpperCase())) ? M : ""
        ),
        E = H(() => {
          let M = !1;
          for (const N of l.value) {
            if (!u.value.includes(N.toUpperCase())) {
              M = !1;
              break;
            }
            M = !0;
          }
          return M === !0 ? "Ganaste" : "Nada";
        }),
        P = (M) => {
          (M === "Ganaste" || p.value >= 9) && (I.value = !0);
        },
        I = ce(!1),
        S = [
          { nombre: "Animales", imagen: of },
          { nombre: "Colores", imagen: sf },
          { nombre: "Frutas", imagen: lf },
        ],
        j = ["Fácil", "Medio", "Difícil"],
        A = () => {
          (o.value = { categoria: "", dificultad: "" }), (r.value = !0);
        },
        B = ce([]),
        V = ce(!1),
        U = async (M) => {
          (u.value = [""]),
            (I.value = !1),
            (r.value = !0),
            (p.value = 0),
            (B.value = ["Dato 1", "Dato 2", "Dato 3"]),
            (o.value.dificultad = M),
            a(),
            (t.value = !1),
            (V.value = !0);
        };
      Qn(() => {});
      const O = (M) => {
        (o.value.categoria = M), (r.value = !1);
      };
      return (M, N) => (
        je(),
        Ue("div", null, [
          t.value
            ? (je(),
              Ue("div", wf, [
                ae("div", xf, [
                  Cf,
                  ae(
                    "button",
                    {
                      class: "boton",
                      onClick:
                        N[0] ||
                        (N[0] = ($) => {
                          (I.value = !0), A();
                        }),
                    },
                    Tf
                  ),
                ]),
              ]))
            : Fo("", !0),
          t.value
            ? Fo("", !0)
            : (je(),
              Ue("div", kf, [
                ae("div", Pf, [
                  ae(
                    "img",
                    {
                      id: "imagen",
                      src:
                        E.value === "Ganaste"
                          ? En(_f)
                          : p.value <= 9
                          ? h[p.value]
                          : En(bf),
                      alt: "",
                      onClick: N[1] || (N[1] = () => P(E.value)),
                    },
                    null,
                    8,
                    Sf
                  ),
                  ae("div", null, [
                    ae("div", Lf, [
                      (je(!0),
                      Ue(
                        we,
                        null,
                        _n(
                          l.value,
                          ($, T) => (
                            je(),
                            Ue("div", { key: T, class: "letra" }, [
                              ae("div", Af, [ae("h1", Mf, zt(x.value($)), 1)]),
                              Of,
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                  ]),
                ]),
                ae("div", Ff, [
                  ae("div", $f, [
                    (je(!0),
                    Ue(
                      we,
                      null,
                      _n(
                        En(n),
                        ($, T) => (
                          je(),
                          Ue(
                            "button",
                            {
                              id: "buton",
                              key: T,
                              onClick: (Q) => _($),
                              disabled: p.value > 9 || E.value === "Ganaste",
                            },
                            zt($),
                            9,
                            qf
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
              ])),
          ae("div", Rf, [
            pe(
              nf,
              {
                modelValue: I.value,
                "onUpdate:modelValue": N[2] || (N[2] = ($) => (I.value = $)),
              },
              {
                default: Vt(() => [
                  pe(Cu, null, {
                    default: Vt(() => [
                      pe(
                        di,
                        { class: "row items-center q-pb-none" },
                        {
                          default: Vt(() => [
                            ae(
                              "div",
                              If,
                              zt(
                                o.value.categoria === ""
                                  ? "Elije la categoría"
                                  : "Elije la dificultad"
                              ),
                              1
                            ),
                            pe(Kc),
                            Zi(
                              pe(
                                yu,
                                { icon: "X", flat: "", round: "", dense: "" },
                                null,
                                512
                              ),
                              [[rf]]
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      pe(
                        di,
                        { class: "row selecionCardCategoria" },
                        {
                          default: Vt(() => [
                            r.value
                              ? (je(),
                                Ue(
                                  we,
                                  { key: 0 },
                                  _n(S, ($, T) =>
                                    ae(
                                      "div",
                                      {
                                        key: T,
                                        class: "cardCategoria",
                                        onClick: (Q) => O($.nombre),
                                      },
                                      [
                                        ae(
                                          "img",
                                          {
                                            src: $.imagen,
                                            alt: "",
                                            class: "imgsCategoria",
                                          },
                                          null,
                                          8,
                                          Nf
                                        ),
                                        ae("h4", null, zt($.nombre), 1),
                                      ],
                                      8,
                                      Bf
                                    )
                                  ),
                                  64
                                ))
                              : (je(),
                                Ue(
                                  we,
                                  { key: 1 },
                                  _n(j, ($, T) =>
                                    ae(
                                      "button",
                                      { key: T, onClick: () => U($) },
                                      zt($),
                                      9,
                                      Df
                                    )
                                  ),
                                  64
                                )),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              },
              8,
              ["modelValue"]
            ),
          ]),
        ])
      );
    },
  }),
  zf = yf(Hf, [["__scopeId", "data-v-c88be80e"]]),
  $s = hc(zf);
$s.use(Hc, { plugins: {} });
$s.mount("#app");
