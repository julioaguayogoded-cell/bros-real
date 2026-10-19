// BroS Life · banco de pruebas: cada marco (Julio, Fer, Padres…) guarda su propia sesión
// aunque estén en el mismo navegador. Sin ?perfil= no hace nada (móviles reales).
(function () {
  var q = new URLSearchParams(location.search).get('perfil');
  if (q) window.name = 'bros:' + q.replace(/[^a-z0-9_-]/gi, '').slice(0, 20);
  var m = /^bros:(.+)$/.exec(window.name || '');
  if (!m) return;
  var P = 'P:' + m[1] + ':', S = Storage.prototype, g = S.getItem, s = S.setItem, r = S.removeItem;
  var es = function (x) { try { return x === window.localStorage; } catch (e) { return false; } };
  S.getItem = function (a) { return g.call(this, es(this) ? P + a : a); };
  S.setItem = function (a, b) { return s.call(this, es(this) ? P + a : a, b); };
  S.removeItem = function (a) { return r.call(this, es(this) ? P + a : a); };
  window.BROS_PERFIL = m[1];
})();
