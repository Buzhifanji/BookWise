var r = Uint8Array,
  e = Uint16Array,
  n = Uint32Array,
  a = new r([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  t = new r([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  i = new r([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  f = function (r, a) {
    for (var t = new e(31), i = 0; i < 31; ++i) t[i] = a += 1 << r[i - 1];
    var f = new n(t[30]);
    for (i = 1; i < 30; ++i)
      for (var o = t[i]; o < t[i + 1]; ++o) f[o] = ((o - t[i]) << 5) | i;
    return [t, f];
  },
  o = f(a, 2),
  v = o[0],
  l = o[1];
(v[28] = 258), (l[258] = 28);
for (var u = f(t, 0)[0], c = new e(32768), d = 0; d < 32768; ++d) {
  var s = ((43690 & d) >>> 1) | ((21845 & d) << 1);
  (s =
    ((61680 & (s = ((52428 & s) >>> 2) | ((13107 & s) << 2))) >>> 4) |
    ((3855 & s) << 4)),
    (c[d] = (((65280 & s) >>> 8) | ((255 & s) << 8)) >>> 1);
}
var w = function (r, n, a) {
    for (var t = r.length, i = 0, f = new e(n); i < t; ++i)
      r[i] && ++f[r[i] - 1];
    var o,
      v = new e(n);
    for (i = 0; i < n; ++i) v[i] = (v[i - 1] + f[i - 1]) << 1;
    if (a) {
      o = new e(1 << n);
      var l = 15 - n;
      for (i = 0; i < t; ++i)
        if (r[i])
          for (
            var u = (i << 4) | r[i],
              d = n - r[i],
              s = v[r[i] - 1]++ << d,
              w = s | ((1 << d) - 1);
            s <= w;
            ++s
          )
            o[c[s] >>> l] = u;
    } else
      for (o = new e(t), i = 0; i < t; ++i)
        r[i] && (o[i] = c[v[r[i] - 1]++] >>> (15 - r[i]));
    return o;
  },
  b = new r(288);
for (d = 0; d < 144; ++d) b[d] = 8;
for (d = 144; d < 256; ++d) b[d] = 9;
for (d = 256; d < 280; ++d) b[d] = 7;
for (d = 280; d < 288; ++d) b[d] = 8;
var h = new r(32);
for (d = 0; d < 32; ++d) h[d] = 5;
var E = w(b, 9, 1),
  p = w(h, 5, 1),
  g = function (r) {
    for (var e = r[0], n = 1; n < r.length; ++n) r[n] > e && (e = r[n]);
    return e;
  },
  y = function (r, e, n) {
    var a = (e / 8) | 0;
    return ((r[a] | (r[a + 1] << 8)) >> (7 & e)) & n;
  },
  k = function (r, e) {
    var n = (e / 8) | 0;
    return (r[n] | (r[n + 1] << 8) | (r[n + 2] << 16)) >> (7 & e);
  },
  T = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data',
  ],
  m = function (r, e, n) {
    var a = new Error(e || T[r]);
    if (
      ((a.code = r),
      Error.captureStackTrace && Error.captureStackTrace(a, m),
      !n)
    )
      throw a;
    return a;
  },
  x = function (f, o, l) {
    var c = f.length;
    if (!c || (l && l.f && !l.l)) return o || new r(0);
    var d = !o || l,
      s = !l || l.i;
    l || (l = {}), o || (o = new r(3 * c));
    var b = function (e) {
        var n = o.length;
        if (e > n) {
          var a = new r(Math.max(2 * n, e));
          a.set(o), (o = a);
        }
      },
      h = l.f || 0,
      T = l.p || 0,
      x = l.b || 0,
      S = l.l,
      U = l.d,
      _ = l.m,
      z = l.n,
      A = 8 * c;
    do {
      if (!S) {
        h = y(f, T, 1);
        var M = y(f, T + 1, 3);
        if (((T += 3), !M)) {
          var B = f[(C = 4 + (((T + 7) / 8) | 0)) - 4] | (f[C - 3] << 8),
            D = C + B;
          if (D > c) {
            s && m(0);
            break;
          }
          d && b(x + B),
            o.set(f.subarray(C, D), x),
            (l.b = x += B),
            (l.p = T = 8 * D),
            (l.f = h);
          continue;
        }
        if (1 == M) (S = E), (U = p), (_ = 9), (z = 5);
        else if (2 == M) {
          var F = y(f, T, 31) + 257,
            L = y(f, T + 10, 15) + 4,
            N = F + y(f, T + 5, 31) + 1;
          T += 14;
          for (var P = new r(N), R = new r(19), Y = 0; Y < L; ++Y)
            R[i[Y]] = y(f, T + 3 * Y, 7);
          T += 3 * L;
          var O = g(R),
            j = (1 << O) - 1,
            q = w(R, O, 1);
          for (Y = 0; Y < N; ) {
            var C,
              G = q[y(f, T, j)];
            if (((T += 15 & G), (C = G >>> 4) < 16)) P[Y++] = C;
            else {
              var H = 0,
                I = 0;
              for (
                16 == C
                  ? ((I = 3 + y(f, T, 3)), (T += 2), (H = P[Y - 1]))
                  : 17 == C
                  ? ((I = 3 + y(f, T, 7)), (T += 3))
                  : 18 == C && ((I = 11 + y(f, T, 127)), (T += 7));
                I--;

              )
                P[Y++] = H;
            }
          }
          var J = P.subarray(0, F),
            K = P.subarray(F);
          (_ = g(J)), (z = g(K)), (S = w(J, _, 1)), (U = w(K, z, 1));
        } else m(1);
        if (T > A) {
          s && m(0);
          break;
        }
      }
      d && b(x + 131072);
      for (var Q = (1 << _) - 1, V = (1 << z) - 1, W = T; ; W = T) {
        var X = (H = S[k(f, T) & Q]) >>> 4;
        if ((T += 15 & H) > A) {
          s && m(0);
          break;
        }
        if ((H || m(2), X < 256)) o[x++] = X;
        else {
          if (256 == X) {
            (W = T), (S = null);
            break;
          }
          var Z = X - 254;
          if (X > 264) {
            var $ = a[(Y = X - 257)];
            (Z = y(f, T, (1 << $) - 1) + v[Y]), (T += $);
          }
          var rr = U[k(f, T) & V],
            er = rr >>> 4;
          rr || m(3), (T += 15 & rr);
          K = u[er];
          if (er > 3) {
            $ = t[er];
            (K += k(f, T) & ((1 << $) - 1)), (T += $);
          }
          if (T > A) {
            s && m(0);
            break;
          }
          d && b(x + 131072);
          for (var nr = x + Z; x < nr; x += 4)
            (o[x] = o[x - K]),
              (o[x + 1] = o[x + 1 - K]),
              (o[x + 2] = o[x + 2 - K]),
              (o[x + 3] = o[x + 3 - K]);
          x = nr;
        }
      }
      (l.l = S),
        (l.p = W),
        (l.b = x),
        (l.f = h),
        S && ((h = 1), (l.m = _), (l.d = U), (l.n = z));
    } while (!h);
    return x == o.length
      ? o
      : (function (a, t, i) {
          (null == t || t < 0) && (t = 0),
            (null == i || i > a.length) && (i = a.length);
          var f = new (
            2 == a.BYTES_PER_ELEMENT ? e : 4 == a.BYTES_PER_ELEMENT ? n : r
          )(i - t);
          return f.set(a.subarray(t, i)), f;
        })(o, 0, x);
  },
  S = new r(0),
  U = function (r) {
    (8 != (15 & r[0]) || r[0] >>> 4 > 7 || ((r[0] << 8) | r[1]) % 31) &&
      m(6, 'invalid zlib data'),
      32 & r[1] && m(6, 'invalid zlib data: preset dictionaries not supported');
  };
function _(r, e) {
  return x((U(r), r.subarray(2, -4)), e);
}
var z = 'undefined' != typeof TextDecoder && new TextDecoder();
try {
  z.decode(S, { stream: !0 }), 1;
} catch (r) {}
export { _ as unzlibSync };
