'use strict';

var C = K,
  S = K;
(function (E, h) {
  var T = {
      E: 0xfc,
      h: 0xf5,
      R: 0x107,
      s: 0xfb,
      I: 0x10f,
      d: 0xf1,
      z: 0x10e,
      b: 0xf2,
      N: 0x104
    },
    U = K,
    J = K,
    R = E();
  while (!![]) {
    try {
      var s = -parseInt(U(T.E)) / 0x1 * (parseInt(U(T.h)) / 0x2) + -parseInt(J(0xee)) / 0x3 * (-parseInt(U(T.R)) / 0x4) + -parseInt(U(0x108)) / 0x5 * (-parseInt(U(T.s)) / 0x6) + -parseInt(U(T.I)) / 0x7 + parseInt(U(T.d)) / 0x8 * (parseInt(J(T.z)) / 0x9) + parseInt(U(T.b)) / 0xa + parseInt(J(T.N)) / 0xb;
      if (s === h) break;else R['push'](R['shift']());
    } catch (I) {
      R['push'](R['shift']());
    }
  }
})(Z, 0x29642);
var CronExpression = require(C(0x103) + C(0x10a));
function CronParser() {}
function K(E, h) {
  var R = Z();
  return K = function K(s, I) {
    s = s - 0xec;
    var d = R[s];
    return d;
  }, K(E, h);
}
CronParser[S(0xef) + C(0x106)] = function (E) {
  var w = {
      E: 0x110,
      h: 0x111,
      R: 0x10c,
      s: 0x101,
      I: 0xfd,
      d: 0x111,
      z: 0xfa
    },
    l = S,
    y = C,
    h = {
      'ryclN': function ryclN(s, I) {
        return s === I;
      },
      'sBDMK': function sBDMK(s, I) {
        return s > I;
      },
      'lvoho': function lvoho(s, I) {
        return s + I;
      }
    },
    R = E[l(w.E)]('\x20');
  if (h['ryclN'](0x6, R[l(w.h)])) return {
    'interval': CronExpression[l(0x101)](E)
  };
  if (h[y(w.R)](R[y(w.h)], 0x6)) return {
    'interval': CronExpression[y(w.s)](R['slice'](0x0, 0x6)[y(w.I)]('\x20')),
    'command': R['slice'](0x6, R[y(w.d)])
  };
  throw new Error(h['lvoho'](l(w.z) + l(0x10d), E));
}, CronParser[S(0xf8) + 'ression'] = function (E, h) {
  var q = S;
  return CronExpression[q(0x101)](E, h);
}, CronParser['fieldsTo' + S(0x105) + 'on'] = function (E, h) {
  var B = {
      E: 0x10b
    },
    m = C,
    a = S;
  return CronExpression[m(B.E) + a(0x105) + 'on'](E, h);
}, CronParser['parseStr' + 'ing'] = function (E) {
  var p = {
      E: 0x110,
      h: 0x109,
      R: 0xf7,
      s: 0xef,
      I: 0x106,
      d: 0xf9,
      z: 0x100,
      b: 0x102,
      N: 0xed
    },
    H = S,
    k = C,
    h = {
      'TBtNw': function TBtNw(G, u) {
        return G < u;
      },
      'vBfGK': function vBfGK(G, u) {
        return G > u;
      }
    };
  for (var R = E[H(p.E)]('\x0a'), I = {
      'variables': {},
      'expressions': [],
      'errors': {}
    }, d = 0x0, z = R[k(0x111)]; h[H(p.h)](d, z); d++) {
    var b = null,
      N = R[d][k(p.R)]();
    if (h['vBfGK'](N[k(0x111)], 0x0)) {
      if (N[k(0xff)](/^#/)) continue;
      if (b = N[H(0xff)](/^(.*)=(.*)$/)) I[H(0xec) + 's'][b[0x1]] = b[0x2];else {
        var L = null;
        try {
          L = CronParser[H(p.s) + k(p.I)]('0\x20' + N), I['expressi' + k(p.d)][H(p.z)](L[k(p.b)]);
        } catch (G) {
          I[H(p.N)][N] = G;
        }
      }
    }
  }
  return I;
}, CronParser['parseFil' + 'e'] = function (E, h) {
  var n = {
      E: 0xf0
    },
    F = {
      E: 0xf4
    },
    M = S,
    P = S,
    R = {
      'sfOPT': function sfOPT(s, I) {
        return s(I);
      }
    };
  R[M(n.E)](require, 'fs')[P(0xf3)](E, function (s, I) {
    var c = M,
      e = P;
    if (!s) return h(null, CronParser['parseStr' + c(0xfe)](I[c(F.E)]()));
    R['sfOPT'](h, s);
  });
}, module[C(0xf6)] = CronParser;
function Z() {
  var A = ['toString', '40yuxUom', 'exports', 'trim', 'parseExp', 'ons', 'Invalid\x20', '197292Tuybiv', '13764XQpDha', 'join', 'ing', 'match', 'push', 'parse', 'interval', './expres', '2210912rOYNvU', 'Expressi', 'try', '17500SQLdPw', '25BKfWSB', 'TBtNw', 'sion', 'fieldsTo', 'sBDMK', 'entry:\x20', '36027lOzScq', '2111277hSvozi', 'split', 'length', 'variable', 'errors', '21HgmtYM', '_parseEn', 'sfOPT', '360iYFlhi', '1702670tsXIKk', 'readFile'];
  Z = function Z() {
    return A;
  };
  return Z();
}