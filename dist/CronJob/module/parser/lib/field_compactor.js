'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (E, h) {
  var q = {
      E: 0xd3,
      h: 0xdf,
      R: 0xcf,
      s: 0xdb,
      I: 0xda,
      d: 0xd5
    },
    G = K,
    u = K,
    R = E();
  while (!![]) {
    try {
      var s = -parseInt(G(q.E)) / 0x1 * (-parseInt(G(0xd4)) / 0x2) + parseInt(G(0xcd)) / 0x3 * (-parseInt(u(q.h)) / 0x4) + -parseInt(G(q.R)) / 0x5 * (parseInt(u(q.s)) / 0x6) + parseInt(G(q.I)) / 0x7 + parseInt(u(q.d)) / 0x8 + parseInt(G(0xde)) / 0x9 + parseInt(u(0xd6)) / 0xa;
      if (s === h) break;else R['push'](R['shift']());
    } catch (I) {
      R['push'](R['shift']());
    }
  }
})(Z, 0x28f9b);
function buildRange(E) {
  return {
    'start': E,
    'count': 0x1
  };
}
function Z() {
  var t = ['1351200maTUxW', 'end', 'number', 'count', '2054920iyhdHH', '6AVKIXA', 'cicMC', 'push', '1610208mkKcrz', '48RQywOt', 'Xxtfb', 'cWtnQ', 'rxLZM', 'OqUJQ', 'ipReI', 'LwnNW', 'length', '58722mHSblj', 'RIFdK', '1514405wZMrro', 'UbrXs', 'step', 'start', '5cYNMRf', '26746kjMgrj', '249176UFBtNQ'];
  Z = function Z() {
    return t;
  };
  return Z();
}
function completeRangeWithItem(E, h) {
  var a = {
      E: 0xd1,
      h: 0xd9
    },
    U = K,
    J = K;
  E[U(0xd7)] = h, E[U(a.E)] = h - E[U(0xd2)], E[J(a.h)] = 0x2;
}
function K(E, h) {
  var R = Z();
  return K = function K(s, I) {
    s = s - 0xca;
    var d = R[s];
    return d;
  }, K(E, h);
}
function finalizeCurrentRange(E, h, R) {
  var M = {
      E: 0xce,
      h: 0xd9,
      R: 0xd2,
      s: 0xdd,
      I: 0xdd
    },
    C = K,
    S = K,
    s = {
      'RIFdK': function RIFdK(I, d) {
        return I === d;
      },
      'rxLZM': function rxLZM(I, d) {
        return I(d);
      }
    };
  h && (s[C(M.E)](0x2, h[C(M.h)]) ? (E['push'](s[C(0xe2)](buildRange, h[S(M.R)])), E[C(M.s)](s[C(0xe2)](buildRange, h[C(0xd7)]))) : E[C(M.I)](h)), R && E[C(M.I)](R);
}
function compactField(E) {
  var w = {
      E: 0xd8,
      h: 0xcc,
      R: 0xe0,
      s: 0xd9,
      I: 0xca,
      d: 0xdd,
      z: 0xd2,
      b: 0xd7,
      N: 0xe1
    },
    l = K,
    y = K,
    h = {
      'FymQe': l(w.E),
      'cicMC': function cicMC(z, b, N, L) {
        return z(b, N, L);
      },
      'Xxtfb': function Xxtfb(z, b) {
        return z === b;
      },
      'ipReI': function ipReI(z, b) {
        return z === b;
      },
      'pjKYh': function pjKYh(z, b) {
        return z - b;
      },
      'UbrXs': function UbrXs(z, b) {
        return z === b;
      },
      'OqUJQ': function OqUJQ(z, b) {
        return z(b);
      },
      'LwnNW': function LwnNW(z, b) {
        return z(b);
      },
      'cWtnQ': function cWtnQ(z, b, N) {
        return z(b, N);
      }
    };
  for (var R = [], s = void 0x0, I = 0x0; I < E[l(w.h)]; I++) {
    var d = E[I];
    h['FymQe'] != _typeof(d) ? (h[y(0xdc)](finalizeCurrentRange, R, s, buildRange(d)), s = void 0x0) : s ? h[l(w.R)](0x1, s[l(w.s)]) ? completeRangeWithItem(s, d) : h[l(w.I)](s['step'], h['pjKYh'](d, s[y(0xd7)])) ? (s[l(w.s)]++, s[l(0xd7)] = d) : h[y(0xd0)](0x2, s[l(w.s)]) ? (R[y(w.d)](buildRange(s[l(w.z)])), completeRangeWithItem(s = h['OqUJQ'](buildRange, s[l(w.b)]), d)) : (finalizeCurrentRange(R, s), s = h[l(0xcb)](buildRange, d)) : s = h[y(0xe3)](buildRange, d);
  }
  return h[l(w.N)](finalizeCurrentRange, R, s), R;
}
module['exports'] = compactField;