const e = 0, t = 1, n = 2, i = -2, r = -3, a = -4, s = -5, o = [
  0,
  1,
  3,
  7,
  15,
  31,
  63,
  127,
  255,
  511,
  1023,
  2047,
  4095,
  8191,
  16383,
  32767,
  65535
], l = 1440, c = 0, u = 4, d = [
  96,
  7,
  256,
  0,
  8,
  80,
  0,
  8,
  16,
  84,
  8,
  115,
  82,
  7,
  31,
  0,
  8,
  112,
  0,
  8,
  48,
  0,
  9,
  192,
  80,
  7,
  10,
  0,
  8,
  96,
  0,
  8,
  32,
  0,
  9,
  160,
  0,
  8,
  0,
  0,
  8,
  128,
  0,
  8,
  64,
  0,
  9,
  224,
  80,
  7,
  6,
  0,
  8,
  88,
  0,
  8,
  24,
  0,
  9,
  144,
  83,
  7,
  59,
  0,
  8,
  120,
  0,
  8,
  56,
  0,
  9,
  208,
  81,
  7,
  17,
  0,
  8,
  104,
  0,
  8,
  40,
  0,
  9,
  176,
  0,
  8,
  8,
  0,
  8,
  136,
  0,
  8,
  72,
  0,
  9,
  240,
  80,
  7,
  4,
  0,
  8,
  84,
  0,
  8,
  20,
  85,
  8,
  227,
  83,
  7,
  43,
  0,
  8,
  116,
  0,
  8,
  52,
  0,
  9,
  200,
  81,
  7,
  13,
  0,
  8,
  100,
  0,
  8,
  36,
  0,
  9,
  168,
  0,
  8,
  4,
  0,
  8,
  132,
  0,
  8,
  68,
  0,
  9,
  232,
  80,
  7,
  8,
  0,
  8,
  92,
  0,
  8,
  28,
  0,
  9,
  152,
  84,
  7,
  83,
  0,
  8,
  124,
  0,
  8,
  60,
  0,
  9,
  216,
  82,
  7,
  23,
  0,
  8,
  108,
  0,
  8,
  44,
  0,
  9,
  184,
  0,
  8,
  12,
  0,
  8,
  140,
  0,
  8,
  76,
  0,
  9,
  248,
  80,
  7,
  3,
  0,
  8,
  82,
  0,
  8,
  18,
  85,
  8,
  163,
  83,
  7,
  35,
  0,
  8,
  114,
  0,
  8,
  50,
  0,
  9,
  196,
  81,
  7,
  11,
  0,
  8,
  98,
  0,
  8,
  34,
  0,
  9,
  164,
  0,
  8,
  2,
  0,
  8,
  130,
  0,
  8,
  66,
  0,
  9,
  228,
  80,
  7,
  7,
  0,
  8,
  90,
  0,
  8,
  26,
  0,
  9,
  148,
  84,
  7,
  67,
  0,
  8,
  122,
  0,
  8,
  58,
  0,
  9,
  212,
  82,
  7,
  19,
  0,
  8,
  106,
  0,
  8,
  42,
  0,
  9,
  180,
  0,
  8,
  10,
  0,
  8,
  138,
  0,
  8,
  74,
  0,
  9,
  244,
  80,
  7,
  5,
  0,
  8,
  86,
  0,
  8,
  22,
  192,
  8,
  0,
  83,
  7,
  51,
  0,
  8,
  118,
  0,
  8,
  54,
  0,
  9,
  204,
  81,
  7,
  15,
  0,
  8,
  102,
  0,
  8,
  38,
  0,
  9,
  172,
  0,
  8,
  6,
  0,
  8,
  134,
  0,
  8,
  70,
  0,
  9,
  236,
  80,
  7,
  9,
  0,
  8,
  94,
  0,
  8,
  30,
  0,
  9,
  156,
  84,
  7,
  99,
  0,
  8,
  126,
  0,
  8,
  62,
  0,
  9,
  220,
  82,
  7,
  27,
  0,
  8,
  110,
  0,
  8,
  46,
  0,
  9,
  188,
  0,
  8,
  14,
  0,
  8,
  142,
  0,
  8,
  78,
  0,
  9,
  252,
  96,
  7,
  256,
  0,
  8,
  81,
  0,
  8,
  17,
  85,
  8,
  131,
  82,
  7,
  31,
  0,
  8,
  113,
  0,
  8,
  49,
  0,
  9,
  194,
  80,
  7,
  10,
  0,
  8,
  97,
  0,
  8,
  33,
  0,
  9,
  162,
  0,
  8,
  1,
  0,
  8,
  129,
  0,
  8,
  65,
  0,
  9,
  226,
  80,
  7,
  6,
  0,
  8,
  89,
  0,
  8,
  25,
  0,
  9,
  146,
  83,
  7,
  59,
  0,
  8,
  121,
  0,
  8,
  57,
  0,
  9,
  210,
  81,
  7,
  17,
  0,
  8,
  105,
  0,
  8,
  41,
  0,
  9,
  178,
  0,
  8,
  9,
  0,
  8,
  137,
  0,
  8,
  73,
  0,
  9,
  242,
  80,
  7,
  4,
  0,
  8,
  85,
  0,
  8,
  21,
  80,
  8,
  258,
  83,
  7,
  43,
  0,
  8,
  117,
  0,
  8,
  53,
  0,
  9,
  202,
  81,
  7,
  13,
  0,
  8,
  101,
  0,
  8,
  37,
  0,
  9,
  170,
  0,
  8,
  5,
  0,
  8,
  133,
  0,
  8,
  69,
  0,
  9,
  234,
  80,
  7,
  8,
  0,
  8,
  93,
  0,
  8,
  29,
  0,
  9,
  154,
  84,
  7,
  83,
  0,
  8,
  125,
  0,
  8,
  61,
  0,
  9,
  218,
  82,
  7,
  23,
  0,
  8,
  109,
  0,
  8,
  45,
  0,
  9,
  186,
  0,
  8,
  13,
  0,
  8,
  141,
  0,
  8,
  77,
  0,
  9,
  250,
  80,
  7,
  3,
  0,
  8,
  83,
  0,
  8,
  19,
  85,
  8,
  195,
  83,
  7,
  35,
  0,
  8,
  115,
  0,
  8,
  51,
  0,
  9,
  198,
  81,
  7,
  11,
  0,
  8,
  99,
  0,
  8,
  35,
  0,
  9,
  166,
  0,
  8,
  3,
  0,
  8,
  131,
  0,
  8,
  67,
  0,
  9,
  230,
  80,
  7,
  7,
  0,
  8,
  91,
  0,
  8,
  27,
  0,
  9,
  150,
  84,
  7,
  67,
  0,
  8,
  123,
  0,
  8,
  59,
  0,
  9,
  214,
  82,
  7,
  19,
  0,
  8,
  107,
  0,
  8,
  43,
  0,
  9,
  182,
  0,
  8,
  11,
  0,
  8,
  139,
  0,
  8,
  75,
  0,
  9,
  246,
  80,
  7,
  5,
  0,
  8,
  87,
  0,
  8,
  23,
  192,
  8,
  0,
  83,
  7,
  51,
  0,
  8,
  119,
  0,
  8,
  55,
  0,
  9,
  206,
  81,
  7,
  15,
  0,
  8,
  103,
  0,
  8,
  39,
  0,
  9,
  174,
  0,
  8,
  7,
  0,
  8,
  135,
  0,
  8,
  71,
  0,
  9,
  238,
  80,
  7,
  9,
  0,
  8,
  95,
  0,
  8,
  31,
  0,
  9,
  158,
  84,
  7,
  99,
  0,
  8,
  127,
  0,
  8,
  63,
  0,
  9,
  222,
  82,
  7,
  27,
  0,
  8,
  111,
  0,
  8,
  47,
  0,
  9,
  190,
  0,
  8,
  15,
  0,
  8,
  143,
  0,
  8,
  79,
  0,
  9,
  254,
  96,
  7,
  256,
  0,
  8,
  80,
  0,
  8,
  16,
  84,
  8,
  115,
  82,
  7,
  31,
  0,
  8,
  112,
  0,
  8,
  48,
  0,
  9,
  193,
  80,
  7,
  10,
  0,
  8,
  96,
  0,
  8,
  32,
  0,
  9,
  161,
  0,
  8,
  0,
  0,
  8,
  128,
  0,
  8,
  64,
  0,
  9,
  225,
  80,
  7,
  6,
  0,
  8,
  88,
  0,
  8,
  24,
  0,
  9,
  145,
  83,
  7,
  59,
  0,
  8,
  120,
  0,
  8,
  56,
  0,
  9,
  209,
  81,
  7,
  17,
  0,
  8,
  104,
  0,
  8,
  40,
  0,
  9,
  177,
  0,
  8,
  8,
  0,
  8,
  136,
  0,
  8,
  72,
  0,
  9,
  241,
  80,
  7,
  4,
  0,
  8,
  84,
  0,
  8,
  20,
  85,
  8,
  227,
  83,
  7,
  43,
  0,
  8,
  116,
  0,
  8,
  52,
  0,
  9,
  201,
  81,
  7,
  13,
  0,
  8,
  100,
  0,
  8,
  36,
  0,
  9,
  169,
  0,
  8,
  4,
  0,
  8,
  132,
  0,
  8,
  68,
  0,
  9,
  233,
  80,
  7,
  8,
  0,
  8,
  92,
  0,
  8,
  28,
  0,
  9,
  153,
  84,
  7,
  83,
  0,
  8,
  124,
  0,
  8,
  60,
  0,
  9,
  217,
  82,
  7,
  23,
  0,
  8,
  108,
  0,
  8,
  44,
  0,
  9,
  185,
  0,
  8,
  12,
  0,
  8,
  140,
  0,
  8,
  76,
  0,
  9,
  249,
  80,
  7,
  3,
  0,
  8,
  82,
  0,
  8,
  18,
  85,
  8,
  163,
  83,
  7,
  35,
  0,
  8,
  114,
  0,
  8,
  50,
  0,
  9,
  197,
  81,
  7,
  11,
  0,
  8,
  98,
  0,
  8,
  34,
  0,
  9,
  165,
  0,
  8,
  2,
  0,
  8,
  130,
  0,
  8,
  66,
  0,
  9,
  229,
  80,
  7,
  7,
  0,
  8,
  90,
  0,
  8,
  26,
  0,
  9,
  149,
  84,
  7,
  67,
  0,
  8,
  122,
  0,
  8,
  58,
  0,
  9,
  213,
  82,
  7,
  19,
  0,
  8,
  106,
  0,
  8,
  42,
  0,
  9,
  181,
  0,
  8,
  10,
  0,
  8,
  138,
  0,
  8,
  74,
  0,
  9,
  245,
  80,
  7,
  5,
  0,
  8,
  86,
  0,
  8,
  22,
  192,
  8,
  0,
  83,
  7,
  51,
  0,
  8,
  118,
  0,
  8,
  54,
  0,
  9,
  205,
  81,
  7,
  15,
  0,
  8,
  102,
  0,
  8,
  38,
  0,
  9,
  173,
  0,
  8,
  6,
  0,
  8,
  134,
  0,
  8,
  70,
  0,
  9,
  237,
  80,
  7,
  9,
  0,
  8,
  94,
  0,
  8,
  30,
  0,
  9,
  157,
  84,
  7,
  99,
  0,
  8,
  126,
  0,
  8,
  62,
  0,
  9,
  221,
  82,
  7,
  27,
  0,
  8,
  110,
  0,
  8,
  46,
  0,
  9,
  189,
  0,
  8,
  14,
  0,
  8,
  142,
  0,
  8,
  78,
  0,
  9,
  253,
  96,
  7,
  256,
  0,
  8,
  81,
  0,
  8,
  17,
  85,
  8,
  131,
  82,
  7,
  31,
  0,
  8,
  113,
  0,
  8,
  49,
  0,
  9,
  195,
  80,
  7,
  10,
  0,
  8,
  97,
  0,
  8,
  33,
  0,
  9,
  163,
  0,
  8,
  1,
  0,
  8,
  129,
  0,
  8,
  65,
  0,
  9,
  227,
  80,
  7,
  6,
  0,
  8,
  89,
  0,
  8,
  25,
  0,
  9,
  147,
  83,
  7,
  59,
  0,
  8,
  121,
  0,
  8,
  57,
  0,
  9,
  211,
  81,
  7,
  17,
  0,
  8,
  105,
  0,
  8,
  41,
  0,
  9,
  179,
  0,
  8,
  9,
  0,
  8,
  137,
  0,
  8,
  73,
  0,
  9,
  243,
  80,
  7,
  4,
  0,
  8,
  85,
  0,
  8,
  21,
  80,
  8,
  258,
  83,
  7,
  43,
  0,
  8,
  117,
  0,
  8,
  53,
  0,
  9,
  203,
  81,
  7,
  13,
  0,
  8,
  101,
  0,
  8,
  37,
  0,
  9,
  171,
  0,
  8,
  5,
  0,
  8,
  133,
  0,
  8,
  69,
  0,
  9,
  235,
  80,
  7,
  8,
  0,
  8,
  93,
  0,
  8,
  29,
  0,
  9,
  155,
  84,
  7,
  83,
  0,
  8,
  125,
  0,
  8,
  61,
  0,
  9,
  219,
  82,
  7,
  23,
  0,
  8,
  109,
  0,
  8,
  45,
  0,
  9,
  187,
  0,
  8,
  13,
  0,
  8,
  141,
  0,
  8,
  77,
  0,
  9,
  251,
  80,
  7,
  3,
  0,
  8,
  83,
  0,
  8,
  19,
  85,
  8,
  195,
  83,
  7,
  35,
  0,
  8,
  115,
  0,
  8,
  51,
  0,
  9,
  199,
  81,
  7,
  11,
  0,
  8,
  99,
  0,
  8,
  35,
  0,
  9,
  167,
  0,
  8,
  3,
  0,
  8,
  131,
  0,
  8,
  67,
  0,
  9,
  231,
  80,
  7,
  7,
  0,
  8,
  91,
  0,
  8,
  27,
  0,
  9,
  151,
  84,
  7,
  67,
  0,
  8,
  123,
  0,
  8,
  59,
  0,
  9,
  215,
  82,
  7,
  19,
  0,
  8,
  107,
  0,
  8,
  43,
  0,
  9,
  183,
  0,
  8,
  11,
  0,
  8,
  139,
  0,
  8,
  75,
  0,
  9,
  247,
  80,
  7,
  5,
  0,
  8,
  87,
  0,
  8,
  23,
  192,
  8,
  0,
  83,
  7,
  51,
  0,
  8,
  119,
  0,
  8,
  55,
  0,
  9,
  207,
  81,
  7,
  15,
  0,
  8,
  103,
  0,
  8,
  39,
  0,
  9,
  175,
  0,
  8,
  7,
  0,
  8,
  135,
  0,
  8,
  71,
  0,
  9,
  239,
  80,
  7,
  9,
  0,
  8,
  95,
  0,
  8,
  31,
  0,
  9,
  159,
  84,
  7,
  99,
  0,
  8,
  127,
  0,
  8,
  63,
  0,
  9,
  223,
  82,
  7,
  27,
  0,
  8,
  111,
  0,
  8,
  47,
  0,
  9,
  191,
  0,
  8,
  15,
  0,
  8,
  143,
  0,
  8,
  79,
  0,
  9,
  255
], f = [
  80,
  5,
  1,
  87,
  5,
  257,
  83,
  5,
  17,
  91,
  5,
  4097,
  81,
  5,
  5,
  89,
  5,
  1025,
  85,
  5,
  65,
  93,
  5,
  16385,
  80,
  5,
  3,
  88,
  5,
  513,
  84,
  5,
  33,
  92,
  5,
  8193,
  82,
  5,
  9,
  90,
  5,
  2049,
  86,
  5,
  129,
  192,
  5,
  24577,
  80,
  5,
  2,
  87,
  5,
  385,
  83,
  5,
  25,
  91,
  5,
  6145,
  81,
  5,
  7,
  89,
  5,
  1537,
  85,
  5,
  97,
  93,
  5,
  24577,
  80,
  5,
  4,
  88,
  5,
  769,
  84,
  5,
  49,
  92,
  5,
  12289,
  82,
  5,
  13,
  90,
  5,
  3073,
  86,
  5,
  193,
  192,
  5,
  24577
], _ = [
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
], h = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  112,
  112
], w = [
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577
], b = [
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13
], p = 15;
function m() {
  let t2, n2, i2, o2, c2, u2;
  function d2(t3, n3, a2, d3, f3, _2, h2, w2, b2, m2, g2) {
    let y2, x2, k2, v2, S2, z2, A2, U2, D2, E2, F2, T2, O2, C2, W2;
    E2 = 0, S2 = a2;
    do {
      i2[t3[n3 + E2]]++, E2++, S2--;
    } while (0 !== S2);
    if (i2[0] == a2)
      return h2[0] = -1, w2[0] = 0, e;
    for (U2 = w2[0], z2 = 1; z2 <= p && 0 === i2[z2]; z2++)
      ;
    for (A2 = z2, U2 < z2 && (U2 = z2), S2 = p; 0 !== S2 && 0 === i2[S2]; S2--)
      ;
    for (k2 = S2, U2 > S2 && (U2 = S2), w2[0] = U2, C2 = 1 << z2; z2 < S2; z2++, C2 <<= 1)
      if ((C2 -= i2[z2]) < 0)
        return r;
    if ((C2 -= i2[S2]) < 0)
      return r;
    for (i2[S2] += C2, u2[1] = z2 = 0, E2 = 1, O2 = 2; 0 != --S2; )
      u2[O2] = z2 += i2[E2], O2++, E2++;
    S2 = 0, E2 = 0;
    do {
      0 !== (z2 = t3[n3 + E2]) && (g2[u2[z2]++] = S2), E2++;
    } while (++S2 < a2);
    for (a2 = u2[k2], u2[0] = S2 = 0, E2 = 0, v2 = -1, T2 = -U2, c2[0] = 0, F2 = 0, W2 = 0; A2 <= k2; A2++)
      for (y2 = i2[A2]; 0 != y2--; ) {
        for (; A2 > T2 + U2; ) {
          if (v2++, T2 += U2, W2 = k2 - T2, W2 = W2 > U2 ? U2 : W2, (x2 = 1 << (z2 = A2 - T2)) > y2 + 1 && (x2 -= y2 + 1, O2 = A2, z2 < W2))
            for (; ++z2 < W2 && !((x2 <<= 1) <= i2[++O2]); )
              x2 -= i2[O2];
          if (W2 = 1 << z2, m2[0] + W2 > l)
            return r;
          c2[v2] = F2 = m2[0], m2[0] += W2, 0 !== v2 ? (u2[v2] = S2, o2[0] = z2, o2[1] = U2, z2 = S2 >>> T2 - U2, o2[2] = F2 - c2[v2 - 1] - z2, b2.set(o2, 3 * (c2[v2 - 1] + z2))) : h2[0] = F2;
        }
        for (o2[1] = A2 - T2, E2 >= a2 ? o2[0] = 192 : g2[E2] < d3 ? (o2[0] = g2[E2] < 256 ? 0 : 96, o2[2] = g2[E2++]) : (o2[0] = _2[g2[E2] - d3] + 16 + 64, o2[2] = f3[g2[E2++] - d3]), x2 = 1 << A2 - T2, z2 = S2 >>> T2; z2 < W2; z2 += x2)
          b2.set(o2, 3 * (F2 + z2));
        for (z2 = 1 << A2 - 1; 0 != (S2 & z2); z2 >>>= 1)
          S2 ^= z2;
        for (S2 ^= z2, D2 = (1 << T2) - 1; (S2 & D2) != u2[v2]; )
          v2--, T2 -= U2, D2 = (1 << T2) - 1;
      }
    return 0 !== C2 && 1 != k2 ? s : e;
  }
  function f2(e2) {
    let r2;
    for (t2 || (t2 = [], n2 = [], i2 = new Int32Array(p + 1), o2 = [], c2 = new Int32Array(p), u2 = new Int32Array(p + 1)), n2.length < e2 && (n2 = []), r2 = 0; r2 < e2; r2++)
      n2[r2] = 0;
    for (r2 = 0; r2 < p + 1; r2++)
      i2[r2] = 0;
    for (r2 = 0; r2 < 3; r2++)
      o2[r2] = 0;
    c2.set(i2.subarray(0, p), 0), u2.set(i2.subarray(0, p + 1), 0);
  }
  this.inflate_trees_bits = function(e2, i3, a2, o3, l2) {
    let c3;
    return f2(19), t2[0] = 0, c3 = d2(e2, 0, 19, 19, null, null, a2, i3, o3, t2, n2), c3 == r ? l2.msg = "oversubscribed dynamic bit lengths tree" : c3 != s && 0 !== i3[0] || (l2.msg = "incomplete dynamic bit lengths tree", c3 = r), c3;
  }, this.inflate_trees_dynamic = function(i3, o3, l2, c3, u3, p2, m2, g2, y2) {
    let x2;
    return f2(288), t2[0] = 0, x2 = d2(l2, 0, i3, 257, _, h, p2, c3, g2, t2, n2), x2 != e || 0 === c3[0] ? (x2 == r ? y2.msg = "oversubscribed literal/length tree" : x2 != a && (y2.msg = "incomplete literal/length tree", x2 = r), x2) : (f2(288), x2 = d2(l2, i3, o3, 0, w, b, m2, u3, g2, t2, n2), x2 != e || 0 === u3[0] && i3 > 257 ? (x2 == r ? y2.msg = "oversubscribed distance tree" : x2 == s ? (y2.msg = "incomplete distance tree", x2 = r) : x2 != a && (y2.msg = "empty distance tree with lengths", x2 = r), x2) : e);
  };
}
m.inflate_trees_fixed = function(t2, n2, i2, r2) {
  return t2[0] = 9, n2[0] = 5, i2[0] = d, r2[0] = f, e;
};
const g = 0, y = 1, x = 2, k = 3, v = 4, S = 5, z = 6, A = 7, U = 8, D = 9;
function E() {
  const n2 = this;
  let a2, s2, l2, c2, u2 = 0, d2 = 0, f2 = 0, _2 = 0, h2 = 0, w2 = 0, b2 = 0, p2 = 0, m2 = 0, E2 = 0;
  function F2(n3, i2, a3, s3, l3, c3, u3, d3) {
    let f3, _3, h3, w3, b3, p3, m3, g2, y2, x2, k2, v2, S2, z2, A2, U2;
    m3 = d3.next_in_index, g2 = d3.avail_in, b3 = u3.bitb, p3 = u3.bitk, y2 = u3.write, x2 = y2 < u3.read ? u3.read - y2 - 1 : u3.end - y2, k2 = o[n3], v2 = o[i2];
    do {
      for (; p3 < 20; )
        g2--, b3 |= (255 & d3.read_byte(m3++)) << p3, p3 += 8;
      if (f3 = b3 & k2, _3 = a3, h3 = s3, U2 = 3 * (h3 + f3), 0 !== (w3 = _3[U2]))
        for (; ; ) {
          if (b3 >>= _3[U2 + 1], p3 -= _3[U2 + 1], 0 != (16 & w3)) {
            for (w3 &= 15, S2 = _3[U2 + 2] + (b3 & o[w3]), b3 >>= w3, p3 -= w3; p3 < 15; )
              g2--, b3 |= (255 & d3.read_byte(m3++)) << p3, p3 += 8;
            for (f3 = b3 & v2, _3 = l3, h3 = c3, U2 = 3 * (h3 + f3), w3 = _3[U2]; ; ) {
              if (b3 >>= _3[U2 + 1], p3 -= _3[U2 + 1], 0 != (16 & w3)) {
                for (w3 &= 15; p3 < w3; )
                  g2--, b3 |= (255 & d3.read_byte(m3++)) << p3, p3 += 8;
                if (z2 = _3[U2 + 2] + (b3 & o[w3]), b3 >>= w3, p3 -= w3, x2 -= S2, y2 >= z2)
                  A2 = y2 - z2, y2 - A2 > 0 && 2 > y2 - A2 ? (u3.win[y2++] = u3.win[A2++], u3.win[y2++] = u3.win[A2++], S2 -= 2) : (u3.win.set(u3.win.subarray(A2, A2 + 2), y2), y2 += 2, A2 += 2, S2 -= 2);
                else {
                  A2 = y2 - z2;
                  do {
                    A2 += u3.end;
                  } while (A2 < 0);
                  if (w3 = u3.end - A2, S2 > w3) {
                    if (S2 -= w3, y2 - A2 > 0 && w3 > y2 - A2)
                      do {
                        u3.win[y2++] = u3.win[A2++];
                      } while (0 != --w3);
                    else
                      u3.win.set(u3.win.subarray(A2, A2 + w3), y2), y2 += w3, A2 += w3, w3 = 0;
                    A2 = 0;
                  }
                }
                if (y2 - A2 > 0 && S2 > y2 - A2)
                  do {
                    u3.win[y2++] = u3.win[A2++];
                  } while (0 != --S2);
                else
                  u3.win.set(u3.win.subarray(A2, A2 + S2), y2), y2 += S2, A2 += S2, S2 = 0;
                break;
              }
              if (0 != (64 & w3))
                return d3.msg = "invalid distance code", S2 = d3.avail_in - g2, S2 = p3 >> 3 < S2 ? p3 >> 3 : S2, g2 += S2, m3 -= S2, p3 -= S2 << 3, u3.bitb = b3, u3.bitk = p3, d3.avail_in = g2, d3.total_in += m3 - d3.next_in_index, d3.next_in_index = m3, u3.write = y2, r;
              f3 += _3[U2 + 2], f3 += b3 & o[w3], U2 = 3 * (h3 + f3), w3 = _3[U2];
            }
            break;
          }
          if (0 != (64 & w3))
            return 0 != (32 & w3) ? (S2 = d3.avail_in - g2, S2 = p3 >> 3 < S2 ? p3 >> 3 : S2, g2 += S2, m3 -= S2, p3 -= S2 << 3, u3.bitb = b3, u3.bitk = p3, d3.avail_in = g2, d3.total_in += m3 - d3.next_in_index, d3.next_in_index = m3, u3.write = y2, t) : (d3.msg = "invalid literal/length code", S2 = d3.avail_in - g2, S2 = p3 >> 3 < S2 ? p3 >> 3 : S2, g2 += S2, m3 -= S2, p3 -= S2 << 3, u3.bitb = b3, u3.bitk = p3, d3.avail_in = g2, d3.total_in += m3 - d3.next_in_index, d3.next_in_index = m3, u3.write = y2, r);
          if (f3 += _3[U2 + 2], f3 += b3 & o[w3], U2 = 3 * (h3 + f3), 0 === (w3 = _3[U2])) {
            b3 >>= _3[U2 + 1], p3 -= _3[U2 + 1], u3.win[y2++] = _3[U2 + 2], x2--;
            break;
          }
        }
      else
        b3 >>= _3[U2 + 1], p3 -= _3[U2 + 1], u3.win[y2++] = _3[U2 + 2], x2--;
    } while (x2 >= 258 && g2 >= 10);
    return S2 = d3.avail_in - g2, S2 = p3 >> 3 < S2 ? p3 >> 3 : S2, g2 += S2, m3 -= S2, p3 -= S2 << 3, u3.bitb = b3, u3.bitk = p3, d3.avail_in = g2, d3.total_in += m3 - d3.next_in_index, d3.next_in_index = m3, u3.write = y2, e;
  }
  n2.init = function(e2, t2, n3, i2, r2, o2) {
    a2 = g, b2 = e2, p2 = t2, l2 = n3, m2 = i2, c2 = r2, E2 = o2, s2 = null;
  }, n2.proc = function(n3, T2, O2) {
    let C2, W2, j2, M2, L2, R2, B2, I2 = 0, N2 = 0, P2 = 0;
    for (P2 = T2.next_in_index, M2 = T2.avail_in, I2 = n3.bitb, N2 = n3.bitk, L2 = n3.write, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2; ; )
      switch (a2) {
        case g:
          if (R2 >= 258 && M2 >= 10 && (n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, O2 = F2(b2, p2, l2, m2, c2, E2, n3, T2), P2 = T2.next_in_index, M2 = T2.avail_in, I2 = n3.bitb, N2 = n3.bitk, L2 = n3.write, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2, O2 != e)) {
            a2 = O2 == t ? A : D;
            break;
          }
          f2 = b2, s2 = l2, d2 = m2, a2 = y;
        case y:
          for (C2 = f2; N2 < C2; ) {
            if (0 === M2)
              return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
            O2 = e, M2--, I2 |= (255 & T2.read_byte(P2++)) << N2, N2 += 8;
          }
          if (W2 = 3 * (d2 + (I2 & o[C2])), I2 >>>= s2[W2 + 1], N2 -= s2[W2 + 1], j2 = s2[W2], 0 === j2) {
            _2 = s2[W2 + 2], a2 = z;
            break;
          }
          if (0 != (16 & j2)) {
            h2 = 15 & j2, u2 = s2[W2 + 2], a2 = x;
            break;
          }
          if (0 == (64 & j2)) {
            f2 = j2, d2 = W2 / 3 + s2[W2 + 2];
            break;
          }
          if (0 != (32 & j2)) {
            a2 = A;
            break;
          }
          return a2 = D, T2.msg = "invalid literal/length code", O2 = r, n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
        case x:
          for (C2 = h2; N2 < C2; ) {
            if (0 === M2)
              return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
            O2 = e, M2--, I2 |= (255 & T2.read_byte(P2++)) << N2, N2 += 8;
          }
          u2 += I2 & o[C2], I2 >>= C2, N2 -= C2, f2 = p2, s2 = c2, d2 = E2, a2 = k;
        case k:
          for (C2 = f2; N2 < C2; ) {
            if (0 === M2)
              return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
            O2 = e, M2--, I2 |= (255 & T2.read_byte(P2++)) << N2, N2 += 8;
          }
          if (W2 = 3 * (d2 + (I2 & o[C2])), I2 >>= s2[W2 + 1], N2 -= s2[W2 + 1], j2 = s2[W2], 0 != (16 & j2)) {
            h2 = 15 & j2, w2 = s2[W2 + 2], a2 = v;
            break;
          }
          if (0 == (64 & j2)) {
            f2 = j2, d2 = W2 / 3 + s2[W2 + 2];
            break;
          }
          return a2 = D, T2.msg = "invalid distance code", O2 = r, n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
        case v:
          for (C2 = h2; N2 < C2; ) {
            if (0 === M2)
              return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
            O2 = e, M2--, I2 |= (255 & T2.read_byte(P2++)) << N2, N2 += 8;
          }
          w2 += I2 & o[C2], I2 >>= C2, N2 -= C2, a2 = S;
        case S:
          for (B2 = L2 - w2; B2 < 0; )
            B2 += n3.end;
          for (; 0 !== u2; ) {
            if (0 === R2 && (L2 == n3.end && 0 !== n3.read && (L2 = 0, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2), 0 === R2 && (n3.write = L2, O2 = n3.inflate_flush(T2, O2), L2 = n3.write, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2, L2 == n3.end && 0 !== n3.read && (L2 = 0, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2), 0 === R2)))
              return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
            n3.win[L2++] = n3.win[B2++], R2--, B2 == n3.end && (B2 = 0), u2--;
          }
          a2 = g;
          break;
        case z:
          if (0 === R2 && (L2 == n3.end && 0 !== n3.read && (L2 = 0, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2), 0 === R2 && (n3.write = L2, O2 = n3.inflate_flush(T2, O2), L2 = n3.write, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2, L2 == n3.end && 0 !== n3.read && (L2 = 0, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2), 0 === R2)))
            return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
          O2 = e, n3.win[L2++] = _2, R2--, a2 = g;
          break;
        case A:
          if (N2 > 7 && (N2 -= 8, M2++, P2--), n3.write = L2, O2 = n3.inflate_flush(T2, O2), L2 = n3.write, R2 = L2 < n3.read ? n3.read - L2 - 1 : n3.end - L2, n3.read != n3.write)
            return n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
          a2 = U;
        case U:
          return O2 = t, n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
        case D:
          return O2 = r, n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
        default:
          return O2 = i, n3.bitb = I2, n3.bitk = N2, T2.avail_in = M2, T2.total_in += P2 - T2.next_in_index, T2.next_in_index = P2, n3.write = L2, n3.inflate_flush(T2, O2);
      }
  }, n2.free = function() {
  };
}
const F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], T = 0, O = 1, C = 2, W = 3, j = 4, M = 5, L = 6, R = 7, B = 8, I = 9;
function N(n2, a2) {
  const c2 = this;
  let u2, d2 = T, f2 = 0, _2 = 0, h2 = 0;
  const w2 = [0], b2 = [0], p2 = new E();
  let g2 = 0, y2 = new Int32Array(3 * l);
  const x2 = new m();
  c2.bitk = 0, c2.bitb = 0, c2.win = new Uint8Array(a2), c2.end = a2, c2.read = 0, c2.write = 0, c2.reset = function(e2, t2) {
    t2 && (t2[0] = 0), d2 == L && p2.free(e2), d2 = T, c2.bitk = 0, c2.bitb = 0, c2.read = c2.write = 0;
  }, c2.reset(n2, null), c2.inflate_flush = function(t2, n3) {
    let i2, r2, a3;
    return r2 = t2.next_out_index, a3 = c2.read, i2 = (a3 <= c2.write ? c2.write : c2.end) - a3, i2 > t2.avail_out && (i2 = t2.avail_out), 0 !== i2 && n3 == s && (n3 = e), t2.avail_out -= i2, t2.total_out += i2, t2.next_out.set(c2.win.subarray(a3, a3 + i2), r2), r2 += i2, a3 += i2, a3 == c2.end && (a3 = 0, c2.write == c2.end && (c2.write = 0), i2 = c2.write - a3, i2 > t2.avail_out && (i2 = t2.avail_out), 0 !== i2 && n3 == s && (n3 = e), t2.avail_out -= i2, t2.total_out += i2, t2.next_out.set(c2.win.subarray(a3, a3 + i2), r2), r2 += i2, a3 += i2), t2.next_out_index = r2, c2.read = a3, n3;
  }, c2.proc = function(n3, a3) {
    let s2, l2, k2, v2, S2, z2, A2, U2;
    for (v2 = n3.next_in_index, S2 = n3.avail_in, l2 = c2.bitb, k2 = c2.bitk, z2 = c2.write, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2; ; ) {
      let D2, E2, N2, P2, V2, q2, H2, K2;
      switch (d2) {
        case T:
          for (; k2 < 3; ) {
            if (0 === S2)
              return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
            a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
          }
          switch (s2 = 7 & l2, g2 = 1 & s2, s2 >>> 1) {
            case 0:
              l2 >>>= 3, k2 -= 3, s2 = 7 & k2, l2 >>>= s2, k2 -= s2, d2 = O;
              break;
            case 1:
              D2 = [], E2 = [], N2 = [[]], P2 = [[]], m.inflate_trees_fixed(D2, E2, N2, P2), p2.init(D2[0], E2[0], N2[0], 0, P2[0], 0), l2 >>>= 3, k2 -= 3, d2 = L;
              break;
            case 2:
              l2 >>>= 3, k2 -= 3, d2 = W;
              break;
            case 3:
              return l2 >>>= 3, k2 -= 3, d2 = I, n3.msg = "invalid block type", a3 = r, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          }
          break;
        case O:
          for (; k2 < 32; ) {
            if (0 === S2)
              return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
            a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
          }
          if ((~l2 >>> 16 & 65535) != (65535 & l2))
            return d2 = I, n3.msg = "invalid stored block lengths", a3 = r, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          f2 = 65535 & l2, l2 = k2 = 0, d2 = 0 !== f2 ? C : 0 !== g2 ? R : T;
          break;
        case C:
          if (0 === S2)
            return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          if (0 === A2 && (z2 == c2.end && 0 !== c2.read && (z2 = 0, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2), 0 === A2 && (c2.write = z2, a3 = c2.inflate_flush(n3, a3), z2 = c2.write, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2, z2 == c2.end && 0 !== c2.read && (z2 = 0, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2), 0 === A2)))
            return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          if (a3 = e, s2 = f2, s2 > S2 && (s2 = S2), s2 > A2 && (s2 = A2), c2.win.set(n3.read_buf(v2, s2), z2), v2 += s2, S2 -= s2, z2 += s2, A2 -= s2, 0 != (f2 -= s2))
            break;
          d2 = 0 !== g2 ? R : T;
          break;
        case W:
          for (; k2 < 14; ) {
            if (0 === S2)
              return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
            a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
          }
          if (_2 = s2 = 16383 & l2, (31 & s2) > 29 || (s2 >> 5 & 31) > 29)
            return d2 = I, n3.msg = "too many length or distance symbols", a3 = r, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          if (s2 = 258 + (31 & s2) + (s2 >> 5 & 31), !u2 || u2.length < s2)
            u2 = [];
          else
            for (U2 = 0; U2 < s2; U2++)
              u2[U2] = 0;
          l2 >>>= 14, k2 -= 14, h2 = 0, d2 = j;
        case j:
          for (; h2 < 4 + (_2 >>> 10); ) {
            for (; k2 < 3; ) {
              if (0 === S2)
                return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
              a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
            }
            u2[F[h2++]] = 7 & l2, l2 >>>= 3, k2 -= 3;
          }
          for (; h2 < 19; )
            u2[F[h2++]] = 0;
          if (w2[0] = 7, s2 = x2.inflate_trees_bits(u2, w2, b2, y2, n3), s2 != e)
            return (a3 = s2) == r && (u2 = null, d2 = I), c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          h2 = 0, d2 = M;
        case M:
          for (; s2 = _2, !(h2 >= 258 + (31 & s2) + (s2 >> 5 & 31)); ) {
            let t2, i2;
            for (s2 = w2[0]; k2 < s2; ) {
              if (0 === S2)
                return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
              a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
            }
            if (s2 = y2[3 * (b2[0] + (l2 & o[s2])) + 1], i2 = y2[3 * (b2[0] + (l2 & o[s2])) + 2], i2 < 16)
              l2 >>>= s2, k2 -= s2, u2[h2++] = i2;
            else {
              for (U2 = 18 == i2 ? 7 : i2 - 14, t2 = 18 == i2 ? 11 : 3; k2 < s2 + U2; ) {
                if (0 === S2)
                  return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
                a3 = e, S2--, l2 |= (255 & n3.read_byte(v2++)) << k2, k2 += 8;
              }
              if (l2 >>>= s2, k2 -= s2, t2 += l2 & o[U2], l2 >>>= U2, k2 -= U2, U2 = h2, s2 = _2, U2 + t2 > 258 + (31 & s2) + (s2 >> 5 & 31) || 16 == i2 && U2 < 1)
                return u2 = null, d2 = I, n3.msg = "invalid bit length repeat", a3 = r, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
              i2 = 16 == i2 ? u2[U2 - 1] : 0;
              do {
                u2[U2++] = i2;
              } while (0 != --t2);
              h2 = U2;
            }
          }
          if (b2[0] = -1, V2 = [], q2 = [], H2 = [], K2 = [], V2[0] = 9, q2[0] = 6, s2 = _2, s2 = x2.inflate_trees_dynamic(
            257 + (31 & s2),
            1 + (s2 >> 5 & 31),
            u2,
            V2,
            q2,
            H2,
            K2,
            y2,
            n3
          ), s2 != e)
            return s2 == r && (u2 = null, d2 = I), a3 = s2, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          p2.init(V2[0], q2[0], y2, H2[0], y2, K2[0]), d2 = L;
        case L:
          if (c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, (a3 = p2.proc(c2, n3, a3)) != t)
            return c2.inflate_flush(n3, a3);
          if (a3 = e, p2.free(n3), v2 = n3.next_in_index, S2 = n3.avail_in, l2 = c2.bitb, k2 = c2.bitk, z2 = c2.write, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2, 0 === g2) {
            d2 = T;
            break;
          }
          d2 = R;
        case R:
          if (c2.write = z2, a3 = c2.inflate_flush(n3, a3), z2 = c2.write, A2 = z2 < c2.read ? c2.read - z2 - 1 : c2.end - z2, c2.read != c2.write)
            return c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
          d2 = B;
        case B:
          return a3 = t, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
        case I:
          return a3 = r, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
        default:
          return a3 = i, c2.bitb = l2, c2.bitk = k2, n3.avail_in = S2, n3.total_in += v2 - n3.next_in_index, n3.next_in_index = v2, c2.write = z2, c2.inflate_flush(n3, a3);
      }
    }
  }, c2.free = function(e2) {
    c2.reset(e2, null), c2.win = null, y2 = null;
  }, c2.set_dictionary = function(e2, t2, n3) {
    c2.win.set(e2.subarray(t2, t2 + n3), 0), c2.read = c2.write = n3;
  }, c2.sync_point = function() {
    return d2 == O ? 1 : 0;
  };
}
const P = 32, V = 8, q = 0, H = 1, K = 2, Z = 3, G = 4, J = 5, Q = 6, X = 7, Y = 12, $ = 13, ee = [0, 0, 255, 255];
function te() {
  const a2 = this;
  function o2(t2) {
    return t2 && t2.istate ? (t2.total_in = t2.total_out = 0, t2.msg = null, t2.istate.mode = X, t2.istate.blocks.reset(t2, null), e) : i;
  }
  a2.mode = 0, a2.method = 0, a2.was = [0], a2.need = 0, a2.marker = 0, a2.wbits = 0, a2.inflateEnd = function(t2) {
    return a2.blocks && a2.blocks.free(t2), a2.blocks = null, e;
  }, a2.inflateInit = function(t2, n2) {
    return t2.msg = null, a2.blocks = null, n2 < 8 || n2 > 15 ? (a2.inflateEnd(t2), i) : (a2.wbits = n2, t2.istate.blocks = new N(t2, 1 << n2), o2(t2), e);
  }, a2.inflate = function(a3, o3) {
    let l2, c2;
    if (!a3 || !a3.istate || !a3.next_in)
      return i;
    const d2 = a3.istate;
    for (o3 = o3 == u ? s : e, l2 = s; ; )
      switch (d2.mode) {
        case q:
          if (0 === a3.avail_in)
            return l2;
          if (l2 = o3, a3.avail_in--, a3.total_in++, (15 & (d2.method = a3.read_byte(a3.next_in_index++))) != V) {
            d2.mode = $, a3.msg = "unknown compression method", d2.marker = 5;
            break;
          }
          if (8 + (d2.method >> 4) > d2.wbits) {
            d2.mode = $, a3.msg = "invalid win size", d2.marker = 5;
            break;
          }
          d2.mode = H;
        case H:
          if (0 === a3.avail_in)
            return l2;
          if (l2 = o3, a3.avail_in--, a3.total_in++, c2 = 255 & a3.read_byte(a3.next_in_index++), ((d2.method << 8) + c2) % 31 != 0) {
            d2.mode = $, a3.msg = "incorrect header check", d2.marker = 5;
            break;
          }
          if (0 == (c2 & P)) {
            d2.mode = X;
            break;
          }
          d2.mode = K;
        case K:
          if (0 === a3.avail_in)
            return l2;
          l2 = o3, a3.avail_in--, a3.total_in++, d2.need = (255 & a3.read_byte(a3.next_in_index++)) << 24 & 4278190080, d2.mode = Z;
        case Z:
          if (0 === a3.avail_in)
            return l2;
          l2 = o3, a3.avail_in--, a3.total_in++, d2.need += (255 & a3.read_byte(a3.next_in_index++)) << 16 & 16711680, d2.mode = G;
        case G:
          if (0 === a3.avail_in)
            return l2;
          l2 = o3, a3.avail_in--, a3.total_in++, d2.need += (255 & a3.read_byte(a3.next_in_index++)) << 8 & 65280, d2.mode = J;
        case J:
          return 0 === a3.avail_in ? l2 : (l2 = o3, a3.avail_in--, a3.total_in++, d2.need += 255 & a3.read_byte(a3.next_in_index++), d2.mode = Q, n);
        case Q:
          return d2.mode = $, a3.msg = "need dictionary", d2.marker = 0, i;
        case X:
          if (l2 = d2.blocks.proc(a3, l2), l2 == r) {
            d2.mode = $, d2.marker = 0;
            break;
          }
          if (l2 == e && (l2 = o3), l2 != t)
            return l2;
          l2 = o3, d2.blocks.reset(a3, d2.was), d2.mode = Y;
        case Y:
          return a3.avail_in = 0, t;
        case $:
          return r;
        default:
          return i;
      }
  }, a2.inflateSetDictionary = function(t2, n2, r2) {
    let a3 = 0, s2 = r2;
    if (!t2 || !t2.istate || t2.istate.mode != Q)
      return i;
    const o3 = t2.istate;
    return s2 >= 1 << o3.wbits && (s2 = (1 << o3.wbits) - 1, a3 = r2 - s2), o3.blocks.set_dictionary(n2, a3, s2), o3.mode = X, e;
  }, a2.inflateSync = function(t2) {
    let n2, a3, l2, c2, u2;
    if (!t2 || !t2.istate)
      return i;
    const d2 = t2.istate;
    if (d2.mode != $ && (d2.mode = $, d2.marker = 0), 0 === (n2 = t2.avail_in))
      return s;
    for (a3 = t2.next_in_index, l2 = d2.marker; 0 !== n2 && l2 < 4; )
      t2.read_byte(a3) == ee[l2] ? l2++ : l2 = 0 !== t2.read_byte(a3) ? 0 : 4 - l2, a3++, n2--;
    return t2.total_in += a3 - t2.next_in_index, t2.next_in_index = a3, t2.avail_in = n2, d2.marker = l2, 4 != l2 ? r : (c2 = t2.total_in, u2 = t2.total_out, o2(t2), t2.total_in = c2, t2.total_out = u2, d2.mode = X, e);
  }, a2.inflateSyncPoint = function(e2) {
    return e2 && e2.istate && e2.istate.blocks ? e2.istate.blocks.sync_point() : i;
  };
}
function ne() {
}
ne.prototype = {
  inflateInit(e2) {
    const t2 = this;
    return t2.istate = new te(), e2 || (e2 = 15), t2.istate.inflateInit(t2, e2);
  },
  inflate(e2) {
    const t2 = this;
    return t2.istate ? t2.istate.inflate(t2, e2) : i;
  },
  inflateEnd() {
    const e2 = this;
    if (!e2.istate)
      return i;
    const t2 = e2.istate.inflateEnd(e2);
    return e2.istate = null, t2;
  },
  inflateSync() {
    const e2 = this;
    return e2.istate ? e2.istate.inflateSync(e2) : i;
  },
  inflateSetDictionary(e2, t2) {
    const n2 = this;
    return n2.istate ? n2.istate.inflateSetDictionary(n2, e2, t2) : i;
  },
  read_byte(e2) {
    return this.next_in[e2];
  },
  read_buf(e2, t2) {
    return this.next_in.subarray(e2, e2 + t2);
  }
};
const ie = 4294967295, re = 65535, ae = 33639248, se = 101075792, oe = 1, le = 39169, ce = 10, ue = 1, de = 21589, fe = 28789, _e = 25461, he = 1, we = 6, be = 8, pe = 2048, me = void 0, ge = "undefined", ye = "function";
class xe {
  constructor(e2) {
    return class extends TransformStream {
      constructor(t2, n2) {
        const i2 = new e2(n2);
        super({
          transform(e3, t3) {
            t3.enqueue(i2.append(e3));
          },
          flush(e3) {
            const t3 = i2.flush();
            t3 && e3.enqueue(t3);
          }
        });
      }
    };
  }
}
const ke = 64;
let ve = 2;
try {
  typeof navigator != ge && navigator.hardwareConcurrency && (ve = navigator.hardwareConcurrency);
} catch (e2) {
}
const Se = {
  chunkSize: 524288,
  maxWorkers: ve,
  terminateWorkerTimeout: 5e3,
  useWebWorkers: true,
  useCompressionStream: true,
  workerScripts: me,
  CompressionStreamNative: typeof CompressionStream != ge && CompressionStream,
  DecompressionStreamNative: typeof DecompressionStream != ge && DecompressionStream
}, ze = Object.assign({}, Se);
function Ae(e2) {
  const {
    baseURL: t2,
    chunkSize: n2,
    maxWorkers: i2,
    terminateWorkerTimeout: r2,
    useCompressionStream: a2,
    useWebWorkers: s2,
    Deflate: o2,
    Inflate: l2,
    CompressionStream: c2,
    DecompressionStream: u2,
    workerScripts: d2
  } = e2;
  if (Ue("baseURL", t2), Ue("chunkSize", n2), Ue("maxWorkers", i2), Ue("terminateWorkerTimeout", r2), Ue("useCompressionStream", a2), Ue("useWebWorkers", s2), o2 && (ze.CompressionStream = new xe(o2)), l2 && (ze.DecompressionStream = new xe(l2)), Ue("CompressionStream", c2), Ue("DecompressionStream", u2), d2 !== me) {
    const { deflate: e3, inflate: t3 } = d2;
    if ((e3 || t3) && (ze.workerScripts || (ze.workerScripts = {})), e3) {
      if (!Array.isArray(e3))
        throw new Error("workerScripts.deflate must be an array");
      ze.workerScripts.deflate = e3;
    }
    if (t3) {
      if (!Array.isArray(t3))
        throw new Error("workerScripts.inflate must be an array");
      ze.workerScripts.inflate = t3;
    }
  }
}
function Ue(e2, t2) {
  t2 !== me && (ze[e2] = t2);
}
const De = [];
for (let e2 = 0; e2 < 256; e2++) {
  let t2 = e2;
  for (let e3 = 0; e3 < 8; e3++)
    1 & t2 ? t2 = t2 >>> 1 ^ 3988292384 : t2 >>>= 1;
  De[e2] = t2;
}
class Ee {
  constructor(e2) {
    this.crc = e2 || -1;
  }
  append(e2) {
    let t2 = 0 | this.crc;
    for (let n2 = 0, i2 = 0 | e2.length; n2 < i2; n2++)
      t2 = t2 >>> 8 ^ De[255 & (t2 ^ e2[n2])];
    this.crc = t2;
  }
  get() {
    return ~this.crc;
  }
}
class Fe extends TransformStream {
  constructor() {
    const e2 = new Ee();
    super({
      transform(t2) {
        e2.append(t2);
      },
      flush(t2) {
        const n2 = new Uint8Array(4);
        new DataView(n2.buffer).setUint32(0, e2.get()), t2.enqueue(n2);
      }
    });
  }
}
const Te = {
  concat(e2, t2) {
    if (0 === e2.length || 0 === t2.length)
      return e2.concat(t2);
    const n2 = e2[e2.length - 1], i2 = Te.getPartial(n2);
    return 32 === i2 ? e2.concat(t2) : Te._shiftRight(t2, i2, 0 | n2, e2.slice(0, e2.length - 1));
  },
  bitLength(e2) {
    const t2 = e2.length;
    if (0 === t2)
      return 0;
    const n2 = e2[t2 - 1];
    return 32 * (t2 - 1) + Te.getPartial(n2);
  },
  clamp(e2, t2) {
    if (32 * e2.length < t2)
      return e2;
    const n2 = (e2 = e2.slice(0, Math.ceil(t2 / 32))).length;
    return t2 &= 31, n2 > 0 && t2 && (e2[n2 - 1] = Te.partial(t2, e2[n2 - 1] & 2147483648 >> t2 - 1, 1)), e2;
  },
  partial: (e2, t2, n2) => 32 === e2 ? t2 : (n2 ? 0 | t2 : t2 << 32 - e2) + 1099511627776 * e2,
  getPartial: (e2) => Math.round(e2 / 1099511627776) || 32,
  _shiftRight(e2, t2, n2, i2) {
    for (void 0 === i2 && (i2 = []); t2 >= 32; t2 -= 32)
      i2.push(n2), n2 = 0;
    if (0 === t2)
      return i2.concat(e2);
    for (let r3 = 0; r3 < e2.length; r3++)
      i2.push(n2 | e2[r3] >>> t2), n2 = e2[r3] << 32 - t2;
    const r2 = e2.length ? e2[e2.length - 1] : 0, a2 = Te.getPartial(r2);
    return i2.push(Te.partial(t2 + a2 & 31, t2 + a2 > 32 ? n2 : i2.pop(), 1)), i2;
  }
}, Oe = {
  bytes: {
    fromBits(e2) {
      const t2 = Te.bitLength(e2) / 8, n2 = new Uint8Array(t2);
      let i2;
      for (let r2 = 0; r2 < t2; r2++)
        0 == (3 & r2) && (i2 = e2[r2 / 4]), n2[r2] = i2 >>> 24, i2 <<= 8;
      return n2;
    },
    toBits(e2) {
      const t2 = [];
      let n2, i2 = 0;
      for (n2 = 0; n2 < e2.length; n2++)
        i2 = i2 << 8 | e2[n2], 3 == (3 & n2) && (t2.push(i2), i2 = 0);
      return 3 & n2 && t2.push(Te.partial(8 * (3 & n2), i2)), t2;
    }
  }
}, Ce = {
  sha1: class {
    constructor(e2) {
      const t2 = this;
      t2.blockSize = 512, t2._init = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ], t2._key = [1518500249, 1859775393, 2400959708, 3395469782], e2 ? (t2._h = e2._h.slice(0), t2._buffer = e2._buffer.slice(0), t2._length = e2._length) : t2.reset();
    }
    reset() {
      const e2 = this;
      return e2._h = e2._init.slice(0), e2._buffer = [], e2._length = 0, e2;
    }
    update(e2) {
      const t2 = this;
      "string" == typeof e2 && (e2 = Oe.utf8String.toBits(e2));
      const n2 = t2._buffer = Te.concat(t2._buffer, e2), i2 = t2._length, r2 = t2._length = i2 + Te.bitLength(e2);
      if (r2 > 9007199254740991)
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      const a2 = new Uint32Array(n2);
      let s2 = 0;
      for (let e3 = t2.blockSize + i2 - (t2.blockSize + i2 & t2.blockSize - 1); e3 <= r2; e3 += t2.blockSize)
        t2._block(a2.subarray(16 * s2, 16 * (s2 + 1))), s2 += 1;
      return n2.splice(0, 16 * s2), t2;
    }
    finalize() {
      const e2 = this;
      let t2 = e2._buffer;
      const n2 = e2._h;
      t2 = Te.concat(t2, [Te.partial(1, 1)]);
      for (let e3 = t2.length + 2; 15 & e3; e3++)
        t2.push(0);
      for (t2.push(Math.floor(e2._length / 4294967296)), t2.push(0 | e2._length); t2.length; )
        e2._block(t2.splice(0, 16));
      return e2.reset(), n2;
    }
    _f(e2, t2, n2, i2) {
      return e2 <= 19 ? t2 & n2 | ~t2 & i2 : e2 <= 39 ? t2 ^ n2 ^ i2 : e2 <= 59 ? t2 & n2 | t2 & i2 | n2 & i2 : e2 <= 79 ? t2 ^ n2 ^ i2 : void 0;
    }
    _S(e2, t2) {
      return t2 << e2 | t2 >>> 32 - e2;
    }
    _block(e2) {
      const t2 = this, n2 = t2._h, i2 = Array(80);
      for (let t3 = 0; t3 < 16; t3++)
        i2[t3] = e2[t3];
      let r2 = n2[0], a2 = n2[1], s2 = n2[2], o2 = n2[3], l2 = n2[4];
      for (let e3 = 0; e3 <= 79; e3++) {
        e3 >= 16 && (i2[e3] = t2._S(1, i2[e3 - 3] ^ i2[e3 - 8] ^ i2[e3 - 14] ^ i2[e3 - 16]));
        const n3 = t2._S(5, r2) + t2._f(e3, a2, s2, o2) + l2 + i2[e3] + t2._key[Math.floor(e3 / 20)] | 0;
        l2 = o2, o2 = s2, s2 = t2._S(30, a2), a2 = r2, r2 = n3;
      }
      n2[0] = n2[0] + r2 | 0, n2[1] = n2[1] + a2 | 0, n2[2] = n2[2] + s2 | 0, n2[3] = n2[3] + o2 | 0, n2[4] = n2[4] + l2 | 0;
    }
  }
}, We = {
  aes: class {
    constructor(e2) {
      const t2 = this;
      t2._tables = [
        [[], [], [], [], []],
        [[], [], [], [], []]
      ], t2._tables[0][0][0] || t2._precompute();
      const n2 = t2._tables[0][4], i2 = t2._tables[1], r2 = e2.length;
      let a2, s2, o2, l2 = 1;
      if (4 !== r2 && 6 !== r2 && 8 !== r2)
        throw new Error("invalid aes key size");
      for (t2._key = [s2 = e2.slice(0), o2 = []], a2 = r2; a2 < 4 * r2 + 28; a2++) {
        let e3 = s2[a2 - 1];
        (a2 % r2 == 0 || 8 === r2 && a2 % r2 == 4) && (e3 = n2[e3 >>> 24] << 24 ^ n2[e3 >> 16 & 255] << 16 ^ n2[e3 >> 8 & 255] << 8 ^ n2[255 & e3], a2 % r2 == 0 && (e3 = e3 << 8 ^ e3 >>> 24 ^ l2 << 24, l2 = l2 << 1 ^ 283 * (l2 >> 7))), s2[a2] = s2[a2 - r2] ^ e3;
      }
      for (let e3 = 0; a2; e3++, a2--) {
        const t3 = s2[3 & e3 ? a2 : a2 - 4];
        o2[e3] = a2 <= 4 || e3 < 4 ? t3 : i2[0][n2[t3 >>> 24]] ^ i2[1][n2[t3 >> 16 & 255]] ^ i2[2][n2[t3 >> 8 & 255]] ^ i2[3][n2[255 & t3]];
      }
    }
    encrypt(e2) {
      return this._crypt(e2, 0);
    }
    decrypt(e2) {
      return this._crypt(e2, 1);
    }
    _precompute() {
      const e2 = this._tables[0], t2 = this._tables[1], n2 = e2[4], i2 = t2[4], r2 = [], a2 = [];
      let s2, o2, l2, c2;
      for (let e3 = 0; e3 < 256; e3++)
        a2[(r2[e3] = e3 << 1 ^ 283 * (e3 >> 7)) ^ e3] = e3;
      for (let u2 = s2 = 0; !n2[u2]; u2 ^= o2 || 1, s2 = a2[s2] || 1) {
        let a3 = s2 ^ s2 << 1 ^ s2 << 2 ^ s2 << 3 ^ s2 << 4;
        a3 = a3 >> 8 ^ 255 & a3 ^ 99, n2[u2] = a3, i2[a3] = u2, c2 = r2[l2 = r2[o2 = r2[u2]]];
        let d2 = 16843009 * c2 ^ 65537 * l2 ^ 257 * o2 ^ 16843008 * u2, f2 = 257 * r2[a3] ^ 16843008 * a3;
        for (let n3 = 0; n3 < 4; n3++)
          e2[n3][u2] = f2 = f2 << 24 ^ f2 >>> 8, t2[n3][a3] = d2 = d2 << 24 ^ d2 >>> 8;
      }
      for (let n3 = 0; n3 < 5; n3++)
        e2[n3] = e2[n3].slice(0), t2[n3] = t2[n3].slice(0);
    }
    _crypt(e2, t2) {
      if (4 !== e2.length)
        throw new Error("invalid aes block size");
      const n2 = this._key[t2], i2 = n2.length / 4 - 2, r2 = [0, 0, 0, 0], a2 = this._tables[t2], s2 = a2[0], o2 = a2[1], l2 = a2[2], c2 = a2[3], u2 = a2[4];
      let d2, f2, _2, h2 = e2[0] ^ n2[0], w2 = e2[t2 ? 3 : 1] ^ n2[1], b2 = e2[2] ^ n2[2], p2 = e2[t2 ? 1 : 3] ^ n2[3], m2 = 4;
      for (let e3 = 0; e3 < i2; e3++)
        d2 = s2[h2 >>> 24] ^ o2[w2 >> 16 & 255] ^ l2[b2 >> 8 & 255] ^ c2[255 & p2] ^ n2[m2], f2 = s2[w2 >>> 24] ^ o2[b2 >> 16 & 255] ^ l2[p2 >> 8 & 255] ^ c2[255 & h2] ^ n2[m2 + 1], _2 = s2[b2 >>> 24] ^ o2[p2 >> 16 & 255] ^ l2[h2 >> 8 & 255] ^ c2[255 & w2] ^ n2[m2 + 2], p2 = s2[p2 >>> 24] ^ o2[h2 >> 16 & 255] ^ l2[w2 >> 8 & 255] ^ c2[255 & b2] ^ n2[m2 + 3], m2 += 4, h2 = d2, w2 = f2, b2 = _2;
      for (let e3 = 0; e3 < 4; e3++)
        r2[t2 ? 3 & -e3 : e3] = u2[h2 >>> 24] << 24 ^ u2[w2 >> 16 & 255] << 16 ^ u2[b2 >> 8 & 255] << 8 ^ u2[255 & p2] ^ n2[m2++], d2 = h2, h2 = w2, w2 = b2, b2 = p2, p2 = d2;
      return r2;
    }
  }
}, je = {
  getRandomValues(e2) {
    const t2 = new Uint32Array(e2.buffer), n2 = (e3) => {
      let t3 = 987654321;
      const n3 = 4294967295;
      return function() {
        t3 = 36969 * (65535 & t3) + (t3 >> 16) & n3;
        return (((t3 << 16) + (e3 = 18e3 * (65535 & e3) + (e3 >> 16) & n3) & n3) / 4294967296 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
      };
    };
    for (let i2, r2 = 0; r2 < e2.length; r2 += 4) {
      const e3 = n2(4294967296 * (i2 || Math.random()));
      i2 = 987654071 * e3(), t2[r2 / 4] = 4294967296 * e3() | 0;
    }
    return e2;
  }
}, Me = {
  ctrGladman: class {
    constructor(e2, t2) {
      this._prf = e2, this._initIv = t2, this._iv = t2;
    }
    reset() {
      this._iv = this._initIv;
    }
    update(e2) {
      return this.calculate(this._prf, e2, this._iv);
    }
    incWord(e2) {
      if (255 == (e2 >> 24 & 255)) {
        let t2 = e2 >> 16 & 255, n2 = e2 >> 8 & 255, i2 = 255 & e2;
        255 === t2 ? (t2 = 0, 255 === n2 ? (n2 = 0, 255 === i2 ? i2 = 0 : ++i2) : ++n2) : ++t2, e2 = 0, e2 += t2 << 16, e2 += n2 << 8, e2 += i2;
      } else
        e2 += 1 << 24;
      return e2;
    }
    incCounter(e2) {
      0 === (e2[0] = this.incWord(e2[0])) && (e2[1] = this.incWord(e2[1]));
    }
    calculate(e2, t2, n2) {
      let i2;
      if (!(i2 = t2.length))
        return [];
      const r2 = Te.bitLength(t2);
      for (let r3 = 0; r3 < i2; r3 += 4) {
        this.incCounter(n2);
        const i3 = e2.encrypt(n2);
        t2[r3] ^= i3[0], t2[r3 + 1] ^= i3[1], t2[r3 + 2] ^= i3[2], t2[r3 + 3] ^= i3[3];
      }
      return Te.clamp(t2, r2);
    }
  }
}, Le = {
  importKey: (e2) => new Le.hmacSha1(Oe.bytes.toBits(e2)),
  pbkdf2(e2, t2, n2, i2) {
    if (n2 = n2 || 1e4, i2 < 0 || n2 < 0)
      throw new Error("invalid params to pbkdf2");
    const r2 = 1 + (i2 >> 5) << 2;
    let a2, s2, o2, l2, c2;
    const u2 = new ArrayBuffer(r2), d2 = new DataView(u2);
    let f2 = 0;
    const _2 = Te;
    for (t2 = Oe.bytes.toBits(t2), c2 = 1; f2 < (r2 || 1); c2++) {
      for (a2 = s2 = e2.encrypt(_2.concat(t2, [c2])), o2 = 1; o2 < n2; o2++)
        for (s2 = e2.encrypt(s2), l2 = 0; l2 < s2.length; l2++)
          a2[l2] ^= s2[l2];
      for (o2 = 0; f2 < (r2 || 1) && o2 < a2.length; o2++)
        d2.setInt32(f2, a2[o2]), f2 += 4;
    }
    return u2.slice(0, i2 / 8);
  },
  hmacSha1: class {
    constructor(e2) {
      const t2 = this, n2 = t2._hash = Ce.sha1, i2 = [[], []];
      t2._baseHash = [new n2(), new n2()];
      const r2 = t2._baseHash[0].blockSize / 32;
      e2.length > r2 && (e2 = new n2().update(e2).finalize());
      for (let t3 = 0; t3 < r2; t3++)
        i2[0][t3] = 909522486 ^ e2[t3], i2[1][t3] = 1549556828 ^ e2[t3];
      t2._baseHash[0].update(i2[0]), t2._baseHash[1].update(i2[1]), t2._resultHash = new n2(t2._baseHash[0]);
    }
    reset() {
      const e2 = this;
      e2._resultHash = new e2._hash(e2._baseHash[0]), e2._updated = false;
    }
    update(e2) {
      this._updated = true, this._resultHash.update(e2);
    }
    digest() {
      const e2 = this, t2 = e2._resultHash.finalize(), n2 = new e2._hash(e2._baseHash[1]).update(t2).finalize();
      return e2.reset(), n2;
    }
    encrypt(e2) {
      if (this._updated)
        throw new Error("encrypt on already updated hmac called!");
      return this.update(e2), this.digest(e2);
    }
  }
}, Re = "undefined" != typeof crypto && "function" == typeof crypto.getRandomValues, Be = "Invalid password", Ie = "Invalid signature";
function Ne(e2) {
  return Re ? crypto.getRandomValues(e2) : je.getRandomValues(e2);
}
const Pe = 16, Ve = "raw", qe = { name: "PBKDF2" }, He = Object.assign({ hash: { name: "HMAC" } }, qe), Ke = Object.assign({ iterations: 1e3, hash: { name: "SHA-1" } }, qe), Ze = ["deriveBits"], Ge = [8, 12, 16], Je = [16, 24, 32], Qe = 10, Xe = [0, 0, 0, 0], Ye = "undefined", $e = "function", et = typeof crypto != Ye, tt = et && crypto.subtle, nt = et && typeof tt != Ye, it = Oe.bytes, rt = We.aes, at = Me.ctrGladman, st = Le.hmacSha1;
let ot = et && nt && typeof tt.importKey == $e, lt = et && nt && typeof tt.deriveBits == $e;
class ct extends TransformStream {
  constructor({ password: e2, signed: t2, encryptionStrength: n2 }) {
    super({
      start() {
        Object.assign(this, {
          ready: new Promise((e3) => this.resolveReady = e3),
          password: e2,
          signed: t2,
          strength: n2 - 1,
          pending: new Uint8Array()
        });
      },
      async transform(e3, t3) {
        const n3 = this, { password: i2, strength: r2, resolveReady: a2, ready: s2 } = n3;
        i2 ? (await async function(e4, t4, n4, i3) {
          const r3 = await ft(e4, t4, n4, ht(i3, 0, Ge[t4])), a3 = ht(i3, Ge[t4]);
          if (r3[0] != a3[0] || r3[1] != a3[1])
            throw new Error(Be);
        }(n3, r2, i2, ht(e3, 0, Ge[r2] + 2)), e3 = ht(e3, Ge[r2] + 2), a2()) : await s2;
        const o2 = new Uint8Array(e3.length - Qe - (e3.length - Qe) % Pe);
        t3.enqueue(dt(n3, e3, o2, 0, Qe, true));
      },
      async flush(e3) {
        const { signed: t3, ctr: n3, hmac: i2, pending: r2, ready: a2 } = this;
        await a2;
        const s2 = ht(r2, 0, r2.length - Qe), o2 = ht(r2, r2.length - Qe);
        let l2 = new Uint8Array();
        if (s2.length) {
          const e4 = bt(it, s2);
          i2.update(e4);
          const t4 = n3.update(e4);
          l2 = wt(it, t4);
        }
        if (t3) {
          const e4 = ht(wt(it, i2.digest()), 0, Qe);
          for (let t4 = 0; t4 < Qe; t4++)
            if (e4[t4] != o2[t4])
              throw new Error(Ie);
        }
        e3.enqueue(l2);
      }
    });
  }
}
class ut extends TransformStream {
  constructor({ password: e2, encryptionStrength: t2 }) {
    let n2;
    super({
      start() {
        Object.assign(this, {
          ready: new Promise((e3) => this.resolveReady = e3),
          password: e2,
          strength: t2 - 1,
          pending: new Uint8Array()
        });
      },
      async transform(e3, t3) {
        const n3 = this, { password: i2, strength: r2, resolveReady: a2, ready: s2 } = n3;
        let o2 = new Uint8Array();
        i2 ? (o2 = await async function(e4, t4, n4) {
          const i3 = Ne(new Uint8Array(Ge[t4])), r3 = await ft(e4, t4, n4, i3);
          return _t(i3, r3);
        }(n3, r2, i2), a2()) : await s2;
        const l2 = new Uint8Array(o2.length + e3.length - e3.length % Pe);
        l2.set(o2, 0), t3.enqueue(dt(n3, e3, l2, o2.length, 0));
      },
      async flush(e3) {
        const { ctr: t3, hmac: i2, pending: r2, ready: a2 } = this;
        await a2;
        let s2 = new Uint8Array();
        if (r2.length) {
          const e4 = t3.update(bt(it, r2));
          i2.update(e4), s2 = wt(it, e4);
        }
        n2.signature = wt(it, i2.digest()).slice(0, Qe), e3.enqueue(_t(s2, n2.signature));
      }
    }), n2 = this;
  }
}
function dt(e2, t2, n2, i2, r2, a2) {
  const { ctr: s2, hmac: o2, pending: l2 } = e2, c2 = t2.length - r2;
  let u2;
  for (l2.length && (t2 = _t(l2, t2), n2 = function(e3, t3) {
    if (t3 && t3 > e3.length) {
      const n3 = e3;
      (e3 = new Uint8Array(t3)).set(n3, 0);
    }
    return e3;
  }(n2, c2 - c2 % Pe)), u2 = 0; u2 <= c2 - Pe; u2 += Pe) {
    const e3 = bt(it, ht(t2, u2, u2 + Pe));
    a2 && o2.update(e3);
    const r3 = s2.update(e3);
    a2 || o2.update(r3), n2.set(wt(it, r3), u2 + i2);
  }
  return e2.pending = ht(t2, u2), n2;
}
async function ft(e2, t2, n2, i2) {
  e2.password = null;
  const r2 = function(e3) {
    if ("undefined" == typeof TextEncoder) {
      e3 = unescape(encodeURIComponent(e3));
      const t3 = new Uint8Array(e3.length);
      for (let n3 = 0; n3 < t3.length; n3++)
        t3[n3] = e3.charCodeAt(n3);
      return t3;
    }
    return new TextEncoder().encode(e3);
  }(n2), a2 = await async function(e3, t3, n3, i3, r3) {
    if (!ot)
      return Le.importKey(t3);
    try {
      return await tt.importKey(e3, t3, n3, i3, r3);
    } catch (e4) {
      return ot = false, Le.importKey(t3);
    }
  }(Ve, r2, He, false, Ze), s2 = await async function(e3, t3, n3) {
    if (!lt)
      return Le.pbkdf2(t3, e3.salt, Ke.iterations, n3);
    try {
      return await tt.deriveBits(e3, t3, n3);
    } catch (i3) {
      return lt = false, Le.pbkdf2(t3, e3.salt, Ke.iterations, n3);
    }
  }(Object.assign({ salt: i2 }, Ke), a2, 8 * (2 * Je[t2] + 2)), o2 = new Uint8Array(s2), l2 = bt(it, ht(o2, 0, Je[t2])), c2 = bt(it, ht(o2, Je[t2], 2 * Je[t2])), u2 = ht(o2, 2 * Je[t2]);
  return Object.assign(e2, {
    keys: { key: l2, authentication: c2, passwordVerification: u2 },
    ctr: new at(new rt(l2), Array.from(Xe)),
    hmac: new st(c2)
  }), u2;
}
function _t(e2, t2) {
  let n2 = e2;
  return e2.length + t2.length && (n2 = new Uint8Array(e2.length + t2.length), n2.set(e2, 0), n2.set(t2, e2.length)), n2;
}
function ht(e2, t2, n2) {
  return e2.subarray(t2, n2);
}
function wt(e2, t2) {
  return e2.fromBits(t2);
}
function bt(e2, t2) {
  return e2.toBits(t2);
}
const pt = 12;
class mt extends TransformStream {
  constructor({ password: e2, passwordVerification: t2 }) {
    super({
      start() {
        Object.assign(this, { password: e2, passwordVerification: t2 }), kt(this, e2);
      },
      transform(e3, t3) {
        const n2 = this;
        if (n2.password) {
          const t4 = yt(n2, e3.subarray(0, pt));
          if (n2.password = null, t4[11] != n2.passwordVerification)
            throw new Error(Be);
          e3 = e3.subarray(pt);
        }
        t3.enqueue(yt(n2, e3));
      }
    });
  }
}
class gt extends TransformStream {
  constructor({ password: e2, passwordVerification: t2 }) {
    super({
      start() {
        Object.assign(this, { password: e2, passwordVerification: t2 }), kt(this, e2);
      },
      transform(e3, t3) {
        const n2 = this;
        let i2, r2;
        if (n2.password) {
          n2.password = null;
          const t4 = Ne(new Uint8Array(pt));
          t4[11] = n2.passwordVerification, i2 = new Uint8Array(e3.length + t4.length), i2.set(xt(n2, t4), 0), r2 = pt;
        } else
          i2 = new Uint8Array(e3.length), r2 = 0;
        i2.set(xt(n2, e3), r2), t3.enqueue(i2);
      }
    });
  }
}
function yt(e2, t2) {
  const n2 = new Uint8Array(t2.length);
  for (let i2 = 0; i2 < t2.length; i2++)
    n2[i2] = St(e2) ^ t2[i2], vt(e2, n2[i2]);
  return n2;
}
function xt(e2, t2) {
  const n2 = new Uint8Array(t2.length);
  for (let i2 = 0; i2 < t2.length; i2++)
    n2[i2] = St(e2) ^ t2[i2], vt(e2, t2[i2]);
  return n2;
}
function kt(e2, t2) {
  const n2 = [305419896, 591751049, 878082192];
  Object.assign(e2, { keys: n2, crcKey0: new Ee(n2[0]), crcKey2: new Ee(n2[2]) });
  for (let n3 = 0; n3 < t2.length; n3++)
    vt(e2, t2.charCodeAt(n3));
}
function vt(e2, t2) {
  let [n2, i2, r2] = e2.keys;
  e2.crcKey0.append([t2]), n2 = ~e2.crcKey0.get(), i2 = At(Math.imul(At(i2 + zt(n2)), 134775813) + 1), e2.crcKey2.append([i2 >>> 24]), r2 = ~e2.crcKey2.get(), e2.keys = [n2, i2, r2];
}
function St(e2) {
  const t2 = 2 | e2.keys[2];
  return zt(Math.imul(t2, 1 ^ t2) >>> 8);
}
function zt(e2) {
  return 255 & e2;
}
function At(e2) {
  return 4294967295 & e2;
}
const Ut = "deflate-raw";
class Dt extends TransformStream {
  constructor(e2, { chunkSize: t2, CompressionStream: n2, CompressionStreamNative: i2 }) {
    super({});
    const {
      compressed: r2,
      encrypted: a2,
      useCompressionStream: s2,
      zipCrypto: o2,
      signed: l2,
      level: c2
    } = e2, u2 = this;
    let d2, f2, _2 = Ft(super.readable);
    a2 && !o2 || !l2 || ([_2, d2] = _2.tee(), d2 = Ct(d2, new Fe())), r2 && (_2 = Ot(_2, s2, { level: c2, chunkSize: t2 }, i2, n2)), a2 && (o2 ? _2 = Ct(_2, new gt(e2)) : (f2 = new ut(e2), _2 = Ct(_2, f2))), Tt(u2, _2, async () => {
      let e3;
      a2 && !o2 && (e3 = f2.signature), a2 && !o2 || !l2 || (e3 = await d2.getReader().read(), e3 = new DataView(e3.value.buffer).getUint32(0)), u2.signature = e3;
    });
  }
}
class Et extends TransformStream {
  constructor(e2, { chunkSize: t2, DecompressionStream: n2, DecompressionStreamNative: i2 }) {
    super({});
    const {
      zipCrypto: r2,
      encrypted: a2,
      signed: s2,
      signature: o2,
      compressed: l2,
      useCompressionStream: c2
    } = e2;
    let u2, d2, f2 = Ft(super.readable);
    a2 && (r2 ? f2 = Ct(f2, new mt(e2)) : (d2 = new ct(e2), f2 = Ct(f2, d2))), l2 && (f2 = Ot(f2, c2, { chunkSize: t2 }, i2, n2)), a2 && !r2 || !s2 || ([f2, u2] = f2.tee(), u2 = Ct(u2, new Fe())), Tt(this, f2, async () => {
      if ((!a2 || r2) && s2) {
        const e3 = await u2.getReader().read(), t3 = new DataView(e3.value.buffer);
        if (o2 != t3.getUint32(0, false))
          throw new Error(Ie);
      }
    });
  }
}
function Ft(e2) {
  return Ct(
    e2,
    new TransformStream({
      transform(e3, t2) {
        e3 && e3.length && t2.enqueue(e3);
      }
    })
  );
}
function Tt(e2, t2, n2) {
  t2 = Ct(t2, new TransformStream({ flush: n2 })), Object.defineProperty(e2, "readable", { get: () => t2 });
}
function Ot(e2, t2, n2, i2, r2) {
  try {
    e2 = Ct(e2, new (t2 && i2 ? i2 : r2)(Ut, n2));
  } catch (i3) {
    if (!t2)
      throw i3;
    e2 = Ct(e2, new r2(Ut, n2));
  }
  return e2;
}
function Ct(e2, t2) {
  return e2.pipeThrough(t2);
}
const Wt = "message", jt = "start", Mt = "pull", Lt = "data", Rt = "ack", Bt = "close", It = "inflate";
class Nt extends TransformStream {
  constructor(e2, t2) {
    super({});
    const n2 = this, { codecType: i2 } = e2;
    let r2;
    i2.startsWith("deflate") ? r2 = Dt : i2.startsWith(It) && (r2 = Et);
    let a2 = 0;
    const s2 = new r2(e2, t2), o2 = super.readable, l2 = new TransformStream({
      transform(e3, t3) {
        e3 && e3.length && (a2 += e3.length, t3.enqueue(e3));
      },
      flush() {
        const { signature: e3 } = s2;
        Object.assign(n2, { signature: e3, size: a2 });
      }
    });
    Object.defineProperty(n2, "readable", {
      get: () => o2.pipeThrough(s2).pipeThrough(l2)
    });
  }
}
const Pt = typeof Worker != ge;
class Vt {
  constructor(e2, { readable: t2, writable: n2 }, {
    options: i2,
    config: r2,
    streamOptions: a2,
    useWebWorkers: s2,
    transferStreams: o2,
    scripts: l2
  }, c2) {
    const { signal: u2 } = a2;
    return Object.assign(e2, {
      busy: true,
      readable: t2.pipeThrough(new qt(t2, a2, r2), { signal: u2 }),
      writable: n2,
      options: Object.assign({}, i2),
      scripts: l2,
      transferStreams: o2,
      terminate() {
        const { worker: t3, busy: n3 } = e2;
        t3 && !n3 && (t3.terminate(), e2.interface = null);
      },
      onTaskFinished() {
        e2.busy = false, c2(e2);
      }
    }), (s2 && Pt ? Zt : Kt)(e2, r2);
  }
}
class qt extends TransformStream {
  constructor(e2, { onstart: t2, onprogress: n2, size: i2, onend: r2 }, { chunkSize: a2 }) {
    let s2 = 0;
    super(
      {
        start() {
          t2 && Ht(t2, i2);
        },
        async transform(e3, t3) {
          s2 += e3.length, n2 && await Ht(n2, s2, i2), t3.enqueue(e3);
        },
        flush() {
          e2.size = s2, r2 && Ht(r2, s2);
        }
      },
      { highWaterMark: 1, size: () => a2 }
    );
  }
}
async function Ht(e2, ...t2) {
  try {
    await e2(...t2);
  } catch (e3) {
  }
}
function Kt(e2, t2) {
  return {
    run: () => async function({ options: e3, readable: t3, writable: n2, onTaskFinished: i2 }, r2) {
      const a2 = new Nt(e3, r2);
      try {
        await t3.pipeThrough(a2).pipeTo(n2, { preventClose: true, preventAbort: true });
        const { signature: e4, size: i3 } = a2;
        return { signature: e4, size: i3 };
      } finally {
        i2();
      }
    }(e2, t2)
  };
}
function Zt(e2, { baseURL: t2, chunkSize: n2 }) {
  return e2.interface || Object.assign(e2, {
    worker: Qt(e2.scripts[0], t2, e2),
    interface: {
      run: () => async function(e3, t3) {
        let n3, i2;
        const r2 = new Promise((e4, t4) => {
          n3 = e4, i2 = t4;
        });
        Object.assign(e3, {
          reader: null,
          writer: null,
          resolveResult: n3,
          rejectResult: i2,
          result: r2
        });
        const { readable: a2, options: s2, scripts: o2 } = e3, { writable: l2, closed: c2 } = function(e4) {
          const t4 = e4.getWriter();
          let n4;
          const i3 = new Promise((e5) => n4 = e5), r3 = new WritableStream({
            async write(e5) {
              await t4.ready, await t4.write(e5);
            },
            close() {
              t4.releaseLock(), n4();
            },
            abort: (e5) => t4.abort(e5)
          });
          return { writable: r3, closed: i3 };
        }(e3.writable), u2 = Xt(
          {
            type: jt,
            scripts: o2.slice(1),
            options: s2,
            config: t3,
            readable: a2,
            writable: l2
          },
          e3
        );
        u2 || Object.assign(e3, {
          reader: a2.getReader(),
          writer: l2.getWriter()
        });
        const d2 = await r2;
        try {
          await l2.close();
        } catch (e4) {
        }
        return await c2, d2;
      }(e2, { chunkSize: n2 })
    }
  }), e2.interface;
}
let Gt = true, Jt = true;
function Qt(e2, t2, n2) {
  const i2 = { type: "module" };
  let r2, a2;
  typeof e2 == ye && (e2 = e2());
  try {
    r2 = new URL(e2, t2);
  } catch (t3) {
    r2 = e2;
  }
  if (Gt)
    try {
      a2 = new Worker(r2);
    } catch (e3) {
      Gt = false, a2 = new Worker(r2, i2);
    }
  else
    a2 = new Worker(r2, i2);
  return a2.addEventListener(
    Wt,
    (e3) => async function({ data: e4 }, t3) {
      const { type: n3, value: i3, messageId: r3, result: a3, error: s2 } = e4, {
        reader: o2,
        writer: l2,
        resolveResult: c2,
        rejectResult: u2,
        onTaskFinished: d2
      } = t3;
      try {
        if (s2) {
          const { message: e5, stack: t4, code: n4, name: i4 } = s2, r4 = new Error(e5);
          Object.assign(r4, { stack: t4, code: n4, name: i4 }), f2(r4);
        } else {
          if (n3 == Mt) {
            const { value: e5, done: n4 } = await o2.read();
            Xt({ type: Lt, value: e5, done: n4, messageId: r3 }, t3);
          }
          n3 == Lt && (await l2.ready, await l2.write(new Uint8Array(i3)), Xt({ type: Rt, messageId: r3 }, t3)), n3 == Bt && f2(null, a3);
        }
      } catch (s3) {
        f2(s3);
      }
      function f2(e5, t4) {
        e5 ? u2(e5) : c2(t4), l2 && l2.releaseLock(), d2();
      }
    }(e3, n2)
  ), a2;
}
function Xt(e2, { worker: t2, writer: n2, onTaskFinished: i2, transferStreams: r2 }) {
  try {
    let { value: n3, readable: i3, writable: a2 } = e2;
    const s2 = [];
    if (n3) {
      const { buffer: t3, length: i4 } = n3;
      i4 != t3.byteLength && (n3 = new Uint8Array(n3)), e2.value = n3.buffer, s2.push(e2.value);
    }
    if (r2 && Jt ? (i3 && s2.push(i3), a2 && s2.push(a2)) : e2.readable = e2.writable = null, s2.length)
      try {
        return t2.postMessage(e2, s2), true;
      } catch (n4) {
        Jt = false, e2.readable = e2.writable = null, t2.postMessage(e2);
      }
    else
      t2.postMessage(e2);
  } catch (e3) {
    throw n2 && n2.releaseLock(), i2(), e3;
  }
}
let Yt = [];
const $t = [];
let en = 0;
function tn(e2) {
  const { terminateTimeout: t2 } = e2;
  t2 && (clearTimeout(t2), e2.terminateTimeout = null);
}
const nn = 65536, rn = "writable";
class an {
  constructor() {
    this.size = 0;
  }
  init() {
    this.initialized = true;
  }
}
class sn extends an {
  get readable() {
    const e2 = this, { chunkSize: t2 = nn } = e2, n2 = new ReadableStream({
      start() {
        this.chunkOffset = 0;
      },
      async pull(i2) {
        const { offset: r2 = 0, size: a2, diskNumberStart: s2 } = n2, { chunkOffset: o2 } = this;
        i2.enqueue(await hn(e2, r2 + o2, Math.min(t2, a2 - o2), s2)), o2 + t2 > a2 ? i2.close() : this.chunkOffset += t2;
      }
    });
    return n2;
  }
}
class on extends sn {
  constructor(e2) {
    super(), Object.assign(this, { blob: e2, size: e2.size });
  }
  async readUint8Array(e2, t2) {
    const n2 = this, i2 = e2 + t2, r2 = e2 || i2 < n2.size ? n2.blob.slice(e2, i2) : n2.blob;
    return new Uint8Array(await r2.arrayBuffer());
  }
}
class ln extends an {
  constructor(e2) {
    super();
    const t2 = new TransformStream(), n2 = [];
    e2 && n2.push(["Content-Type", e2]), Object.defineProperty(this, rn, { get: () => t2.writable }), this.blob = new Response(t2.readable, { headers: n2 }).blob();
  }
  getData() {
    return this.blob;
  }
}
class cn extends ln {
  constructor(e2) {
    super(e2), Object.assign(this, {
      encoding: e2,
      utf8: !e2 || "utf-8" == e2.toLowerCase()
    });
  }
  async getData() {
    const { encoding: e2, utf8: t2 } = this, n2 = await super.getData();
    if (n2.text && t2)
      return n2.text();
    {
      const t3 = new FileReader();
      return new Promise((i2, r2) => {
        Object.assign(t3, {
          onload: ({ target: e3 }) => i2(e3.result),
          onerror: () => r2(t3.error)
        }), t3.readAsText(n2, e2);
      });
    }
  }
}
class un extends sn {
  constructor(e2) {
    super(), this.readers = e2;
  }
  async init() {
    const e2 = this, { readers: t2 } = e2;
    e2.lastDiskNumber = 0, await Promise.all(
      t2.map(async (t3) => {
        await t3.init(), e2.size += t3.size;
      })
    ), super.init();
  }
  async readUint8Array(e2, t2, n2 = 0) {
    const i2 = this, { readers: r2 } = this;
    let a2, s2 = n2;
    -1 == s2 && (s2 = r2.length - 1);
    let o2 = e2;
    for (; o2 >= r2[s2].size; )
      o2 -= r2[s2].size, s2++;
    const l2 = r2[s2], c2 = l2.size;
    if (o2 + t2 <= c2)
      a2 = await hn(l2, o2, t2);
    else {
      const r3 = c2 - o2;
      a2 = new Uint8Array(t2), a2.set(await hn(l2, o2, r3)), a2.set(await i2.readUint8Array(e2 + r3, t2 - r3, n2), r3);
    }
    return i2.lastDiskNumber = Math.max(s2, i2.lastDiskNumber), a2;
  }
}
class dn extends an {
  constructor(e2, t2 = 4294967295) {
    super();
    const n2 = this;
    let i2, r2, a2;
    Object.assign(n2, {
      diskNumber: 0,
      diskOffset: 0,
      size: 0,
      maxSize: t2,
      availableSize: t2
    });
    const s2 = new WritableStream({
      async write(t3) {
        const { availableSize: s3 } = n2;
        if (a2)
          t3.length >= s3 ? (await o2(t3.slice(0, s3)), await l2(), n2.diskOffset += i2.size, n2.diskNumber++, a2 = null, await this.write(t3.slice(s3))) : await o2(t3);
        else {
          const { value: s4, done: o3 } = await e2.next();
          if (o3 && !s4)
            throw new Error("Writer iterator completed too soon");
          i2 = s4, i2.size = 0, i2.maxSize && (n2.maxSize = i2.maxSize), n2.availableSize = n2.maxSize, await fn(i2), r2 = s4.writable, a2 = r2.getWriter(), await this.write(t3);
        }
      },
      async close() {
        await a2.ready, await l2();
      }
    });
    async function o2(e3) {
      const t3 = e3.length;
      t3 && (await a2.ready, await a2.write(e3), i2.size += t3, n2.size += t3, n2.availableSize -= t3);
    }
    async function l2() {
      r2.size = i2.size, await a2.close();
    }
    Object.defineProperty(n2, rn, { get: () => s2 });
  }
}
async function fn(e2, t2) {
  e2.init && !e2.initialized && await e2.init(t2);
}
function _n(e2) {
  return Array.isArray(e2) && (e2 = new un(e2)), e2 instanceof ReadableStream && (e2 = { readable: e2 }), e2;
}
function hn(e2, t2, n2, i2) {
  return e2.readUint8Array(t2, n2, i2);
}
const wn = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split(
  ""
), bn = 256 == wn.length;
function pn(e2, t2) {
  return t2 && "cp437" == t2.trim().toLowerCase() ? function(e3) {
    if (bn) {
      let t3 = "";
      for (let n2 = 0; n2 < e3.length; n2++)
        t3 += wn[e3[n2]];
      return t3;
    }
    return new TextDecoder().decode(e3);
  }(e2) : new TextDecoder(t2).decode(e2);
}
const mn = "filename", gn = "rawFilename", yn = "comment", xn = "rawComment", kn = "uncompressedSize", vn = "compressedSize", Sn = "offset", zn = "diskNumberStart", An = "lastModDate", Un = "rawLastModDate", Dn = "lastAccessDate", En = "rawLastAccessDate", Fn = "creationDate", Tn = "rawCreationDate", On = [
  mn,
  gn,
  vn,
  kn,
  An,
  Un,
  yn,
  xn,
  Dn,
  Fn,
  Sn,
  zn,
  zn,
  "internalFileAttribute",
  "externalFileAttribute",
  "msDosCompatible",
  "zip64",
  "directory",
  "bitFlag",
  "encrypted",
  "signature",
  "filenameUTF8",
  "commentUTF8",
  "compressionMethod",
  "version",
  "versionMadeBy",
  "extraField",
  "rawExtraField",
  "extraFieldZip64",
  "extraFieldUnicodePath",
  "extraFieldUnicodeComment",
  "extraFieldAES",
  "extraFieldNTFS",
  "extraFieldExtendedTimestamp"
];
class Cn {
  constructor(e2) {
    On.forEach((t2) => this[t2] = e2[t2]);
  }
}
const Wn = "File format is not recognized", jn = "Zip64 extra field not found", Mn = "Compression method not supported", Ln = "Split zip file", Rn = "utf-8", Bn = "cp437", In = [
  [kn, ie],
  [vn, ie],
  [Sn, ie],
  [zn, re]
], Nn = { [re]: { getValue: Yn, bytes: 4 }, [ie]: { getValue: $n, bytes: 8 } };
class Pn {
  constructor(e2, t2 = {}) {
    Object.assign(this, { reader: _n(e2), options: t2, config: ze });
  }
  async *getEntriesGenerator(e2 = {}) {
    const t2 = this;
    let { reader: n2 } = t2;
    const { config: i2 } = t2;
    if (await fn(n2), n2.size !== me && n2.readUint8Array || (n2 = new on(await new Response(n2.readable).blob()), await fn(n2)), n2.size < 22)
      throw new Error(Wn);
    n2.chunkSize = function(e3) {
      return Math.max(e3.chunkSize, ke);
    }(i2);
    const r2 = await async function(e3, t3, n3, i3, r3) {
      const a3 = new Uint8Array(4);
      !function(e4, t4, n4) {
        e4.setUint32(t4, n4, true);
      }(ei(a3), 0, t3);
      const s3 = i3 + r3;
      return await o3(i3) || await o3(Math.min(s3, n3));
      async function o3(t4) {
        const r4 = n3 - t4, s4 = await hn(e3, r4, t4);
        for (let e4 = s4.length - i3; e4 >= 0; e4--)
          if (s4[e4] == a3[0] && s4[e4 + 1] == a3[1] && s4[e4 + 2] == a3[2] && s4[e4 + 3] == a3[3])
            return { offset: r4 + e4, buffer: s4.slice(e4, e4 + i3).buffer };
      }
    }(n2, 101010256, n2.size, 22, 1048560);
    if (!r2) {
      throw 134695760 == Yn(ei(await hn(n2, 0, 4))) ? new Error(Ln) : new Error("End of central directory not found");
    }
    const a2 = ei(r2);
    let s2 = Yn(a2, 12), o2 = Yn(a2, 16);
    const l2 = r2.offset, c2 = Xn(a2, 20), u2 = l2 + 22 + c2;
    let d2 = Xn(a2, 4);
    const f2 = n2.lastDiskNumber || 0;
    let _2 = Xn(a2, 6), h2 = Xn(a2, 8), w2 = 0, b2 = 0;
    if (o2 == ie || s2 == ie || h2 == re || _2 == re) {
      const e3 = ei(await hn(n2, r2.offset - 20, 20));
      if (117853008 != Yn(e3, 0))
        throw new Error("End of Zip64 central directory not found");
      o2 = $n(e3, 8);
      let t3 = await hn(n2, o2, 56, -1), i3 = ei(t3);
      const a3 = r2.offset - 20 - 56;
      if (Yn(i3, 0) != se && o2 != a3) {
        const e4 = o2;
        o2 = a3, w2 = o2 - e4, t3 = await hn(n2, o2, 56, -1), i3 = ei(t3);
      }
      if (Yn(i3, 0) != se)
        throw new Error("End of Zip64 central directory locator not found");
      d2 == re && (d2 = Yn(i3, 16)), _2 == re && (_2 = Yn(i3, 20)), h2 == re && (h2 = $n(i3, 32)), s2 == ie && (s2 = $n(i3, 40)), o2 -= s2;
    }
    if (f2 != d2)
      throw new Error(Ln);
    if (o2 < 0 || o2 >= n2.size)
      throw new Error(Wn);
    let p2 = 0, m2 = await hn(n2, o2, s2, _2), g2 = ei(m2);
    if (s2) {
      const e3 = r2.offset - s2;
      if (Yn(g2, p2) != ae && o2 != e3) {
        const t3 = o2;
        o2 = e3, w2 = o2 - t3, m2 = await hn(n2, o2, s2, _2), g2 = ei(m2);
      }
    }
    if (o2 < 0 || o2 >= n2.size)
      throw new Error(Wn);
    const y2 = Zn(t2, e2, "filenameEncoding"), x2 = Zn(t2, e2, "commentEncoding");
    for (let r3 = 0; r3 < h2; r3++) {
      const a3 = new Vn(n2, i2, t2.options);
      if (Yn(g2, p2) != ae)
        throw new Error("Central directory header not found");
      qn(a3, g2, p2 + 6);
      const s3 = Boolean(a3.bitFlag.languageEncodingFlag), o3 = p2 + 46, l3 = o3 + a3.filenameLength, c3 = l3 + a3.extraFieldLength, u3 = Xn(g2, p2 + 4), d3 = 0 == (0 & u3), f3 = m2.subarray(o3, l3), _3 = Xn(g2, p2 + 32), k3 = c3 + _3, v3 = m2.subarray(c3, k3), S2 = s3, z2 = s3, A2 = d3 && 16 == (16 & Qn(g2, p2 + 38)), U2 = Yn(g2, p2 + 42) + w2;
      Object.assign(a3, {
        versionMadeBy: u3,
        msDosCompatible: d3,
        compressedSize: 0,
        uncompressedSize: 0,
        commentLength: _3,
        directory: A2,
        offset: U2,
        diskNumberStart: Xn(g2, p2 + 34),
        internalFileAttribute: Xn(g2, p2 + 36),
        externalFileAttribute: Yn(g2, p2 + 38),
        rawFilename: f3,
        filenameUTF8: S2,
        commentUTF8: z2,
        rawExtraField: m2.subarray(l3, c3)
      });
      const [D2, E2] = await Promise.all([
        pn(f3, S2 ? Rn : y2 || Bn),
        pn(v3, z2 ? Rn : x2 || Bn)
      ]);
      Object.assign(a3, {
        rawComment: v3,
        filename: D2,
        comment: E2,
        directory: A2 || D2.endsWith("/")
      }), b2 = Math.max(U2, b2), await Hn(a3, a3, g2, p2 + 6);
      const F2 = new Cn(a3);
      F2.getData = (e3, t3) => a3.getData(e3, F2, t3), p2 = k3;
      const { onprogress: T2 } = e2;
      if (T2)
        try {
          await T2(r3 + 1, h2, new Cn(a3));
        } catch (e3) {
        }
      yield F2;
    }
    const k2 = Zn(t2, e2, "extractPrependedData"), v2 = Zn(t2, e2, "extractAppendedData");
    return k2 && (t2.prependedData = b2 > 0 ? await hn(n2, 0, b2) : new Uint8Array()), t2.comment = c2 ? await hn(n2, l2 + 22, c2) : new Uint8Array(), v2 && (t2.appendedData = u2 < n2.size ? await hn(n2, u2, n2.size - u2) : new Uint8Array()), true;
  }
  async getEntries(e2 = {}) {
    const t2 = [];
    for await (const n2 of this.getEntriesGenerator(e2))
      t2.push(n2);
    return t2;
  }
  async close() {
  }
}
class Vn {
  constructor(e2, t2, n2) {
    Object.assign(this, { reader: e2, config: t2, options: n2 });
  }
  async getData(e2, t2, n2 = {}) {
    const i2 = this, {
      reader: r2,
      offset: a2,
      diskNumberStart: s2,
      extraFieldAES: o2,
      compressionMethod: l2,
      config: c2,
      bitFlag: u2,
      signature: d2,
      rawLastModDate: f2,
      uncompressedSize: _2,
      compressedSize: h2
    } = i2, w2 = i2.localDirectory = {}, b2 = ei(await hn(r2, a2, 30, s2));
    let p2 = Zn(i2, n2, "password");
    if (p2 = p2 && p2.length && p2, o2 && 99 != o2.originalCompressionMethod)
      throw new Error(Mn);
    if (0 != l2 && 8 != l2)
      throw new Error(Mn);
    if (67324752 != Yn(b2, 0))
      throw new Error("Local file header not found");
    qn(w2, b2, 4), w2.rawExtraField = w2.extraFieldLength ? await hn(r2, a2 + 30 + w2.filenameLength, w2.extraFieldLength, s2) : new Uint8Array(), await Hn(i2, w2, b2, 4), Object.assign(t2, {
      lastAccessDate: w2.lastAccessDate,
      creationDate: w2.creationDate
    });
    const m2 = i2.encrypted && w2.encrypted, g2 = m2 && !o2;
    if (m2) {
      if (!g2 && o2.strength === me)
        throw new Error("Encryption method not supported");
      if (!p2)
        throw new Error("File contains encrypted entry");
    }
    const y2 = a2 + 30 + w2.filenameLength + w2.extraFieldLength, x2 = r2.readable;
    x2.diskNumberStart = s2, x2.offset = y2;
    const k2 = x2.size = h2, v2 = Zn(i2, n2, "signal");
    e2 = function(e3) {
      e3.writable === me && typeof e3.next == ye && (e3 = new dn(e3)), e3 instanceof WritableStream && (e3 = { writable: e3 });
      const { writable: t3 } = e3;
      return t3.size === me && (t3.size = 0), e3 instanceof dn || Object.assign(e3, {
        diskNumber: 0,
        diskOffset: 0,
        availableSize: 1 / 0,
        maxSize: 1 / 0
      }), e3;
    }(e2), await fn(e2, _2);
    const { writable: S2 } = e2, { onstart: z2, onprogress: A2, onend: U2 } = n2, D2 = {
      options: {
        codecType: It,
        password: p2,
        zipCrypto: g2,
        encryptionStrength: o2 && o2.strength,
        signed: Zn(i2, n2, "checkSignature"),
        passwordVerification: g2 && (u2.dataDescriptor ? f2 >>> 8 & 255 : d2 >>> 24 & 255),
        signature: d2,
        compressed: 0 != l2,
        encrypted: m2,
        useWebWorkers: Zn(i2, n2, "useWebWorkers"),
        useCompressionStream: Zn(i2, n2, "useCompressionStream"),
        transferStreams: Zn(i2, n2, "transferStreams")
      },
      config: c2,
      streamOptions: {
        signal: v2,
        size: k2,
        onstart: z2,
        onprogress: A2,
        onend: U2
      }
    };
    S2.size += (await async function(e3, t3) {
      const { options: n3, config: i3 } = t3, {
        transferStreams: r3,
        useWebWorkers: a3,
        useCompressionStream: s3,
        codecType: o3,
        compressed: l3,
        signed: c3,
        encrypted: u3
      } = n3, { workerScripts: d3, maxWorkers: f3, terminateWorkerTimeout: _3 } = i3;
      t3.transferStreams = r3 || r3 === me;
      const h3 = !(l3 || c3 || u3 || t3.transferStreams);
      let w3;
      t3.useWebWorkers = !h3 && (a3 || a3 === me && i3.useWebWorkers), t3.scripts = t3.useWebWorkers && d3 ? d3[o3] : [], n3.useCompressionStream = s3 || s3 === me && i3.useCompressionStream;
      const b3 = Yt.find((e4) => !e4.busy);
      if (b3)
        tn(b3), w3 = new Vt(b3, e3, t3, p3);
      else if (Yt.length < f3) {
        const n4 = { indexWorker: en };
        en++, Yt.push(n4), w3 = new Vt(n4, e3, t3, p3);
      } else
        w3 = await new Promise(
          (n4) => $t.push({ resolve: n4, stream: e3, workerOptions: t3 })
        );
      return w3.run();
      function p3(e4) {
        if ($t.length) {
          const [{ resolve: t4, stream: n4, workerOptions: i4 }] = $t.splice(
            0,
            1
          );
          t4(new Vt(e4, n4, i4, p3));
        } else
          e4.worker ? (tn(e4), Number.isFinite(_3) && _3 >= 0 && (e4.terminateTimeout = setTimeout(() => {
            Yt = Yt.filter((t4) => t4 != e4), e4.terminate();
          }, _3))) : Yt = Yt.filter((t4) => t4 != e4);
      }
    }({ readable: x2, writable: S2 }, D2)).size;
    return Zn(i2, n2, "preventClose") || await S2.close(), e2.getData ? e2.getData() : S2;
  }
}
function qn(e2, t2, n2) {
  const i2 = e2.rawBitFlag = Xn(t2, n2 + 2), r2 = (i2 & he) == he, a2 = Yn(t2, n2 + 6);
  Object.assign(e2, {
    encrypted: r2,
    version: Xn(t2, n2),
    bitFlag: {
      level: (i2 & we) >> 1,
      dataDescriptor: (i2 & be) == be,
      languageEncodingFlag: (i2 & pe) == pe
    },
    rawLastModDate: a2,
    lastModDate: Gn(a2),
    filenameLength: Xn(t2, n2 + 22),
    extraFieldLength: Xn(t2, n2 + 24)
  });
}
async function Hn(e2, t2, n2, i2) {
  const { rawExtraField: r2 } = t2, a2 = t2.extraField = /* @__PURE__ */ new Map(), s2 = ei(new Uint8Array(r2));
  let o2 = 0;
  try {
    for (; o2 < r2.length; ) {
      const e3 = Xn(s2, o2), t3 = Xn(s2, o2 + 2);
      a2.set(e3, { type: e3, data: r2.slice(o2 + 4, o2 + 4 + t3) }), o2 += 4 + t3;
    }
  } catch (e3) {
  }
  const l2 = Xn(n2, i2 + 4);
  Object.assign(t2, {
    signature: Yn(n2, i2 + 10),
    uncompressedSize: Yn(n2, i2 + 18),
    compressedSize: Yn(n2, i2 + 14)
  });
  const c2 = a2.get(oe);
  c2 && (!function(e3, t3) {
    t3.zip64 = true;
    const n3 = ei(e3.data), i3 = In.filter(([e4, n4]) => t3[e4] == n4);
    for (let r3 = 0, a3 = 0; r3 < i3.length; r3++) {
      const [s3, o3] = i3[r3];
      if (t3[s3] == o3) {
        const i4 = Nn[o3];
        t3[s3] = e3[s3] = i4.getValue(n3, a3), a3 += i4.bytes;
      } else if (e3[s3])
        throw new Error(jn);
    }
  }(c2, t2), t2.extraFieldZip64 = c2);
  const u2 = a2.get(fe);
  u2 && (await Kn(u2, mn, gn, t2, e2), t2.extraFieldUnicodePath = u2);
  const d2 = a2.get(_e);
  d2 && (await Kn(d2, yn, xn, t2, e2), t2.extraFieldUnicodeComment = d2);
  const f2 = a2.get(le);
  f2 ? (!function(e3, t3, n3) {
    const i3 = ei(e3.data), r3 = Qn(i3, 4);
    Object.assign(e3, {
      vendorVersion: Qn(i3, 0),
      vendorId: Qn(i3, 2),
      strength: r3,
      originalCompressionMethod: n3,
      compressionMethod: Xn(i3, 5)
    }), t3.compressionMethod = e3.compressionMethod;
  }(f2, t2, l2), t2.extraFieldAES = f2) : t2.compressionMethod = l2;
  const _2 = a2.get(ce);
  _2 && (!function(e3, t3) {
    const n3 = ei(e3.data);
    let i3, r3 = 4;
    try {
      for (; r3 < e3.data.length && !i3; ) {
        const t4 = Xn(n3, r3), a3 = Xn(n3, r3 + 2);
        t4 == ue && (i3 = e3.data.slice(r3 + 4, r3 + 4 + a3)), r3 += 4 + a3;
      }
    } catch (e4) {
    }
    try {
      if (i3 && 24 == i3.length) {
        const n4 = ei(i3), r4 = n4.getBigUint64(0, true), a3 = n4.getBigUint64(8, true), s3 = n4.getBigUint64(16, true);
        Object.assign(e3, {
          rawLastModDate: r4,
          rawLastAccessDate: a3,
          rawCreationDate: s3
        });
        const o3 = Jn(r4), l3 = Jn(a3), c3 = { lastModDate: o3, lastAccessDate: l3, creationDate: Jn(s3) };
        Object.assign(e3, c3), Object.assign(t3, c3);
      }
    } catch (e4) {
    }
  }(_2, t2), t2.extraFieldNTFS = _2);
  const h2 = a2.get(de);
  h2 && (!function(e3, t3) {
    const n3 = ei(e3.data), i3 = Qn(n3, 0), r3 = [], a3 = [];
    1 == (1 & i3) && (r3.push(An), a3.push(Un));
    2 == (2 & i3) && (r3.push(Dn), a3.push(En));
    4 == (4 & i3) && (r3.push(Fn), a3.push(Tn));
    let s3 = 1;
    r3.forEach((i4, r4) => {
      if (e3.data.length >= s3 + 4) {
        const o3 = Yn(n3, s3);
        t3[i4] = e3[i4] = new Date(1e3 * o3);
        const l3 = a3[r4];
        e3[l3] = o3;
      }
      s3 += 4;
    });
  }(h2, t2), t2.extraFieldExtendedTimestamp = h2);
}
async function Kn(e2, t2, n2, i2, r2) {
  const a2 = ei(e2.data), s2 = new Ee();
  s2.append(r2[n2]);
  const o2 = ei(new Uint8Array(4));
  o2.setUint32(0, s2.get(), true), Object.assign(e2, {
    version: Qn(a2, 0),
    signature: Yn(a2, 1),
    [t2]: await pn(e2.data.subarray(5)),
    valid: !r2.bitFlag.languageEncodingFlag && e2.signature == Yn(o2, 0)
  }), e2.valid && (i2[t2] = e2[t2], i2[t2 + "UTF8"] = true);
}
function Zn(e2, t2, n2) {
  return t2[n2] === me ? e2.options[n2] : t2[n2];
}
function Gn(e2) {
  const t2 = (4294901760 & e2) >> 16, n2 = 65535 & e2;
  try {
    return new Date(
      1980 + ((65024 & t2) >> 9),
      ((480 & t2) >> 5) - 1,
      31 & t2,
      (63488 & n2) >> 11,
      (2016 & n2) >> 5,
      2 * (31 & n2),
      0
    );
  } catch (e3) {
  }
}
function Jn(e2) {
  return new Date(Number(e2 / BigInt(1e4) - BigInt(116444736e5)));
}
function Qn(e2, t2) {
  return e2.getUint8(t2);
}
function Xn(e2, t2) {
  return e2.getUint16(t2, true);
}
function Yn(e2, t2) {
  return e2.getUint32(t2, true);
}
function $n(e2, t2) {
  return Number(e2.getBigUint64(t2, true));
}
function ei(e2) {
  return new DataView(e2.buffer);
}
Ae({
  Inflate: function(n2) {
    const i2 = new ne(), r2 = n2 && n2.chunkSize ? Math.floor(2 * n2.chunkSize) : 131072, a2 = c, o2 = new Uint8Array(r2);
    let l2 = false;
    i2.inflateInit(), i2.next_out = o2, this.append = function(n3, c2) {
      const u2 = [];
      let d2, f2, _2 = 0, h2 = 0, w2 = 0;
      if (0 !== n3.length) {
        i2.next_in_index = 0, i2.next_in = n3, i2.avail_in = n3.length;
        do {
          if (i2.next_out_index = 0, i2.avail_out = r2, 0 !== i2.avail_in || l2 || (i2.next_in_index = 0, l2 = true), d2 = i2.inflate(a2), l2 && d2 === s) {
            if (0 !== i2.avail_in)
              throw new Error("inflating: bad input");
          } else if (d2 !== e && d2 !== t)
            throw new Error("inflating: " + i2.msg);
          if ((l2 || d2 === t) && i2.avail_in === n3.length)
            throw new Error("inflating: bad input");
          i2.next_out_index && (i2.next_out_index === r2 ? u2.push(new Uint8Array(o2)) : u2.push(o2.slice(0, i2.next_out_index))), w2 += i2.next_out_index, c2 && i2.next_in_index > 0 && i2.next_in_index != _2 && (c2(i2.next_in_index), _2 = i2.next_in_index);
        } while (i2.avail_in > 0 || 0 === i2.avail_out);
        return u2.length > 1 ? (f2 = new Uint8Array(w2), u2.forEach(function(e2) {
          f2.set(e2, h2), h2 += e2.length;
        })) : f2 = u2[0] || new Uint8Array(), f2;
      }
    }, this.flush = function() {
      i2.inflateEnd();
    };
  }
});
export {
  on as BlobReader,
  ln as BlobWriter,
  cn as TextWriter,
  Pn as ZipReader,
  Ae as configure
};
