'use strict';

function K(E, h) {
  var R = Z();
  return K = function K(s, I) {
    s = s - 0x149;
    var d = R[s];
    return d;
  }, K(E, h);
}
var t = K,
  X = K;
function Z() {
  var Zl = ['__esModu', 'WAKE_LOC', '../modul', 'ser', 'toString', 'now', 'RVICE', 'off', 'Context', 'POWER_SE', '327392vjYSIb', 'newSingl', 'Now', '@bunny', 'cheduled', 'eThreadS', 'put', 'ntHashMa', 'YSZPe', '10366816gWFdAW', './lib/is', 'random', 'sVNPr', 'util', 'schedule', '997335vuAbNQ', 'e/parser', 'startDat', 'repeat', '1627701vTGPAW', 'operty', 'dTeNt', 'randomUU', 'AbSNn', 'ase', '나는굇수다', 'ChkRZ', 'definePr', 'bind', 'Executor', 'CronJob', 'ShgKP', 'mService', 'TimeUnit', 'RuntimeE', '0|2|4|5|', 'removeAl', 'getSyste', 'parseExp', '138sQnEUn', 'join', 'InvalidP', 'ams', 'Runnable', 'on-job-f', '../error', 'concurre', 'PARTIAL_', 'UUID', 'setWakeL', 'toLowerC', 'ONDS', 'arams', 'ager', 'default', 'CronJobF', 'actor', 'LGhvJ', 'fill', 'fun', '우웅나는서큐버스', 'acquire', 'dateAddS', 'INPrq', 'release', 'next', 'ParseErr', 'mxDFL', '알\x20수\x20없는\x20오', '2420116gUQOpn', 'rror', '724508tkibXH', 'DYFpd', 'newWakeL', 'ression', 'endDate', 'shutdown', '@appmaid', '류가\x20발생했습니', 'get', '215684oEdBxe', '1|3', 'getConte', 'getTime', 'ock', '../util', 'cancel', 'QJtno', '__import', 'add', 'isValidP', 'MhdDU', 'fJPiB', 'before', '@saroro'];
  Z = function Z() {
    return Zl;
  };
  return Z();
}
(function (E, h) {
  var Z4 = {
      E: 0x1aa,
      h: 0x154,
      R: 0x150,
      s: 0x168,
      I: 0x191,
      d: 0x14a
    },
    W = K,
    w = K,
    R = E();
  while (!![]) {
    try {
      var s = -parseInt(W(Z4.E)) / 0x1 + -parseInt(w(0x188)) / 0x2 + -parseInt(w(Z4.h)) / 0x3 + -parseInt(W(0x186)) / 0x4 + parseInt(W(Z4.R)) / 0x5 + -parseInt(w(Z4.s)) / 0x6 * (-parseInt(W(Z4.I)) / 0x7) + parseInt(w(Z4.d)) / 0x8;
      if (s === h) break;else R['push'](R['shift']());
    } catch (I) {
      R['push'](R['shift']());
    }
  }
})(Z, 0x598a1);
var __importDefault = void 0 && (void 0)[t(0x199) + 'Default'] || function (E) {
  var Z5 = {
      E: 0x1a0
    },
    B = t;
  return E && E[B(Z5.E) + 'le'] ? E : {
    'default': E
  };
};
Object[t(0x15c) + X(0x155)](exports, X(0x1a0) + 'le', {
  'value': !0x0
}), exports['CronJob'] = void 0x0;
var CronJob,
  UUID = java[X(0x14e)][X(0x171)],
  ConcurrentHashMap = java['util'][X(0x16f) + 'nt']['Concurre' + X(0x1b1) + 'p'],
  TimeUnit = java[t(0x14e)][X(0x16f) + 'nt'][X(0x162)],
  Executors = java[t(0x14e)][X(0x16f) + 'nt'][t(0x15e) + 's'],
  cron_job_factor_1 = require('./lib/cr' + t(0x16d) + t(0x179)),
  parser_1 = __importDefault(require(t(0x1a2) + X(0x151) + '/lib/par' + t(0x1a3))),
  Runnable = java['lang'][t(0x16c)],
  Context = android['content'][t(0x1a8)],
  PowerManager = android['os']['PowerMan' + X(0x176)],
  isValidParams_1 = require(t(0x14b) + 'ValidPar' + X(0x16b)),
  util_1 = require(t(0x196)),
  error_1 = require(t(0x16e));
!function (E) {
  var ZS = {
      E: 0x185,
      h: 0x18f,
      R: 0x19f,
      s: 0x15a,
      I: 0x193,
      d: 0x161,
      z: 0x1a6,
      b: 0x18a,
      N: 0x195,
      L: 0x1a1,
      G: 0x19d,
      u: 0x1a9,
      U: 0x18a,
      J: 0x170,
      C: 0x1a1,
      S: 0x1af,
      l: 0x15e,
      y: 0x19a,
      q: 0x165,
      m: 0x172,
      a: 0x195
    },
    ZC = {
      E: 0x158,
      h: 0x158,
      R: 0x181
    },
    ZJ = {
      E: 0x15e
    },
    ZU = {
      E: 0x1ac
    },
    Zu = {
      E: 0x164,
      h: 0x192,
      R: 0x14d,
      s: 0x153,
      I: 0x173,
      d: 0x159,
      z: 0x157,
      b: 0x1a4,
      N: 0x149,
      L: 0x178,
      G: 0x183,
      u: 0x1ad,
      U: 0x19c,
      J: 0x169,
      C: 0x189,
      S: 0x180
    },
    ZL = {
      E: 0x19c
    },
    ZN = {
      E: 0x190,
      h: 0x17c,
      R: 0x197
    },
    Zb = {
      E: 0x19b,
      h: 0x177,
      R: 0x167,
      s: 0x18b,
      I: 0x152,
      d: 0x18c,
      z: 0x182,
      b: 0x1a5,
      N: 0x19e,
      L: 0x14f,
      G: 0x174,
      u: 0x1b0
    },
    Zz = {
      E: 0x17f,
      h: 0x198,
      R: 0x19e,
      s: 0x17a,
      I: 0x152,
      d: 0x15d,
      z: 0x19c,
      b: 0x163,
      N: 0x187
    },
    j = X,
    p = X,
    h = {
      'QJtno': function QJtno(G, U) {
        return G !== U;
      },
      'LGhvJ': function LGhvJ(G, U) {
        return G !== U;
      },
      'MhdDU': function MhdDU(G, U) {
        return G(U);
      },
      'dTeNt': function dTeNt(G, U) {
        return G - U;
      },
      'tYSRd': function tYSRd(G, U) {
        return G < U;
      },
      'mxDFL': j(ZS.E) + j(ZS.h) + '다',
      'wQqAl': function wQqAl(G, U) {
        return G != U;
      },
      'ChkRZ': function ChkRZ(G, U) {
        return G === U;
      },
      'sVNPr': j(ZS.R),
      'ShgKP': p(ZS.s),
      'YSZPe': function YSZPe(G, U, J, C, S) {
        return G(U, J, C, S);
      },
      'DYFpd': function DYFpd(G, U) {
        return G === U;
      },
      'oVDQr': j(0x18e),
      'INPrq': p(0x17d) + '앱짱',
      'XzVVX': function XzVVX(G) {
        return G();
      },
      'AbSNn': function AbSNn(G, U) {
        return G && U;
      },
      'EHtRY': function EHtRY(G, U) {
        return G !== U;
      },
      'fJPiB': 'Cron'
    },
    R;
  if (h['EHtRY'](void 0x0, global()['Api'])) {
    var s = Api[j(ZS.I) + 'xt']()['getSyste' + p(ZS.d)](Context['POWER_SE' + j(ZS.z)]);
    R = s[p(ZS.b) + j(ZS.N)](PowerManager['PARTIAL_' + p(ZS.L) + 'K'], h[j(ZS.G)]);
  } else s = App['getConte' + 'xt']()[p(0x166) + j(0x161)](Context[p(ZS.u) + 'RVICE']), R = s[p(ZS.U) + 'ock'](PowerManager[p(ZS.J) + p(ZS.C) + 'K'], h['fJPiB']);
  var I = new ConcurrentHashMap(),
    d = Executors['newSingl' + j(ZS.S) + 'cheduled' + p(ZS.l)](),
    z = !0x1;
  function b(G, U, J, C) {
    var i = j,
      F = p,
      S;
    if (void 0x0 === C && (C = {}), !(0x0, isValidParams_1[i(Zb.E) + 'arams'])(C)) throw new error_1[i(0x16a) + i(0x175)]();
    try {
      var y = parser_1[F(Zb.h)][i(Zb.R) + F(Zb.s)](U, {
          'startDate': C[i(Zb.I) + 'e'],
          'endDate': C[i(Zb.d)]
        })[i(Zb.z)](),
        q = y['getTime'](),
        m = Date[F(Zb.b)](),
        H = new Runnable({
          'run': function run() {
            var n = F,
              A = i,
              T;
            try {
              var O = new Date(q);
              (0x0, util_1[n(Zz.E) + 'ub'])(O, {
                'milliseconds': (h[n(Zz.h)](null, T = C[n(Zz.R)]) && h[A(Zz.s)](void 0x0, T) ? T : 0x0) + 0xa
              }), C[n(Zz.I) + 'e'] = O, J[n(Zz.d)](null, G)(), h[n(Zz.z)](N, G), b(G, U, J, C);
            } catch (D) {
              throw new error_1[A(Zz.b) + A(Zz.N)]();
            }
          }
        }),
        k = h[i(0x156)](h[i(0x156)](q, m), null !== (S = C[i(Zb.N)]) && void 0x0 !== S ? S : 0x0);
      h['tYSRd'](k, 0x0) && (k = 0x0);
      var M = d[i(Zb.L)](H, k, TimeUnit['MILLISEC' + i(Zb.G)]),
        P = {
          'cronJob': U,
          'fun': M
        };
      return I[i(Zb.u)](G, P), new Date(y[F(0x194)]());
    } catch (T) {
      if (T instanceof Error) throw T;
      throw new Error(h[i(0x184)]);
    }
  }
  function N(G) {
    var g = p,
      V = j,
      U = I[g(ZN.E)](G);
    return h['wQqAl'](null, U) && (U[g(ZN.h)][V(ZN.R)](!0x0), I['remove'](G), !0x0);
  }
  function L() {
    var Q = j;
    for (var G in I) h[Q(ZL.E)](N, G);
    return !0x0;
  }
  E[p(ZS.y)] = function (G, U, J) {
    var ZG = {
        E: 0x14c
      },
      Y = j,
      r = j,
      C = (Y(Zu.E) + Y(Zu.h))['split']('|'),
      S = 0x0;
    while (!![]) {
      switch (C[S++]) {
        case '0':
          h[r(0x15b)](void 0x0, J) && (J = {});
          continue;
        case '1':
          if (h[Y(Zu.R)] === l) throw new Error(h[r(0x160)][Y(Zu.s)](0x5));
          continue;
        case '2':
          var l = G[Y(Zu.I) + r(Zu.d)]();
          continue;
        case '3':
          try {
            var y = String(UUID[r(Zu.z) + 'ID']()[r(Zu.b)]());
            return h[Y(Zu.N)](b, y, G, U, J), new cron_job_factor_1[Y(Zu.L) + 'actor'](y, G, J);
          } catch (q) {
            throw new error_1[r(Zu.G) + 'or']();
          }
          continue;
        case '4':
          if (h[Y(0x15b)](r(Zu.u), l)) throw new Error(h[Y(Zu.U)](Array, 0x6)[Y(0x17b)](0x0)['map'](function () {
            var o = r;
            return Math[o(ZG.E)]() < 0.5 ? '깡충' : '껑충';
          })[Y(Zu.J)](''));
          continue;
        case '5':
          if (h[Y(Zu.C)](h['oVDQr'], l)) throw new Error(h[Y(Zu.S)]);
          continue;
      }
      break;
    }
  }, E['remove'] = N, E[p(ZS.q) + 'l'] = L, E[p(0x1a7)] = function () {
    var f = p,
      x = p;
    h['XzVVX'](L), d['isShutdo' + 'wn']() || d[f(0x18d) + x(ZU.E)]();
  }, E['on'] = function () {
    var Z0 = p,
      Z1 = p;
    d['isShutdo' + 'wn']() && (d = Executors[Z0(0x1ab) + Z1(0x1af) + Z0(0x1ae) + Z1(ZJ.E)]());
  }, E[j(ZS.m) + p(ZS.a)] = function (G) {
    var Z2 = j,
      Z3 = p;
    h[Z2(ZC.E)](G, !z) ? (z = !0x0, R[Z3(0x17e)]()) : h[Z2(ZC.h)](!G, z) && (z = !0x1, R[Z3(ZC.R)]());
  };
}(CronJob || (exports[t(0x15f)] = CronJob = {}));