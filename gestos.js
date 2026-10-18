// BroS Life · gestos: deslizar arriba = inicio, borde izquierdo = atrás, deslizar una pregunta = aprobar/rechazar.
// También convierte el botón/gesto «atrás» del sistema (Android, Safari) en el atrás de BroS Life.
(function () {
  window.broGestos = function (c) {
    var activo = function () { return !c.gestoActivo || c.gestoActivo(); };
    var bar = document.createElement('div');
    bar.setAttribute('aria-hidden', 'true');
    bar.style.cssText = 'position:fixed;left:50%;bottom:calc(3px + env(safe-area-inset-bottom));width:120px;height:4px;margin-left:-60px;border-radius:3px;background:rgba(120,124,135,.55);z-index:9999;pointer-events:none;transition:transform .25s,opacity .25s';
    var flecha = document.createElement('div');
    flecha.setAttribute('aria-hidden', 'true');
    flecha.textContent = '‹';
    flecha.style.cssText = 'position:fixed;left:-44px;top:50%;width:40px;height:40px;margin-top:-20px;border-radius:50%;background:rgba(17,17,17,.75);color:#fff;font:700 26px/38px Inter,system-ui,sans-serif;text-align:center;z-index:9999;pointer-events:none;transition:left .2s,opacity .2s;opacity:0';
    var pastilla = document.createElement('div');
    pastilla.setAttribute('aria-hidden', 'true');
    pastilla.style.cssText = 'position:fixed;left:50%;top:42%;transform:translate(-50%,-50%) scale(.9);padding:12px 20px;border-radius:999px;color:#fff;font:700 16px Inter,system-ui,sans-serif;z-index:9999;pointer-events:none;opacity:0;transition:opacity .2s,transform .2s';
    document.body.appendChild(bar); document.body.appendChild(flecha); document.body.appendChild(pastilla);

    var tPast;
    function avisar(txt, color) {
      pastilla.textContent = txt; pastilla.style.background = color;
      pastilla.style.opacity = '1'; pastilla.style.transform = 'translate(-50%,-50%) scale(1)';
      clearTimeout(tPast); tPast = setTimeout(function () { pastilla.style.opacity = '0'; pastilla.style.transform = 'translate(-50%,-50%) scale(.9)'; }, 700);
    }
    var movil = function () { return window.innerWidth < 520; };
    function refrescar() { bar.style.opacity = activo() && movil() ? '1' : '0'; }
    var reloj = setInterval(refrescar, 400); refrescar();

    function scrollHorizontal(el) {
      while (el && el !== document.body) {
        var cs = getComputedStyle(el);
        if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2) return true;
        el = el.parentElement;
      }
      return false;
    }

    var x0 = 0, y0 = 0, t0 = 0, zona = null;
    function inicio(e) {
      if (!activo() || !movil() || e.touches.length !== 1) { zona = null; return; }
      var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now();
      var tag = (e.target && e.target.tagName) || '';
      if (x0 < 26) zona = 'borde';
      else if (y0 > window.innerHeight - 28 && !/INPUT|TEXTAREA|BUTTON/.test(tag)) zona = 'abajo';
      else if (/INPUT|TEXTAREA|SELECT|IFRAME/.test(tag) || scrollHorizontal(e.target)) zona = null;
      else zona = 'medio';
    }
    function mover(e) {
      if (!zona) return;
      var t = e.touches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (zona === 'abajo' && dy < 0) bar.style.transform = 'translateY(' + Math.max(dy / 3, -24) + 'px) scaleX(' + (1 + Math.min(-dy, 120) / 300) + ')';
      if (zona === 'borde' && dx > 0) { flecha.style.opacity = String(Math.min(dx / 60, 1)); flecha.style.left = Math.min(-44 + dx * .6, 14) + 'px'; }
    }
    function fin(e) {
      bar.style.transform = ''; flecha.style.opacity = '0'; flecha.style.left = '-44px';
      if (!zona) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0, dt = Date.now() - t0, z = zona; zona = null;
      if (z === 'abajo' && dy < -45 && Math.abs(dx) < 120) { if (c.gestoInicio && c.gestoInicio()) avisar('Inicio', 'rgba(17,17,17,.85)'); return; }
      if (z === 'borde' && dx > 60 && Math.abs(dy) < 90) { if (c.gestoAtras) c.gestoAtras(); return; }
      if (z === 'medio' && Math.abs(dx) > 90 && Math.abs(dy) < 50 && dt < 800 && c.gestoDeslizar) {
        var r = c.gestoDeslizar(dx > 0 ? 'derecha' : 'izquierda');
        if (r) avisar(r.txt, r.color);
      }
    }
    document.addEventListener('touchstart', inicio, { passive: true });
    document.addEventListener('touchmove', mover, { passive: true });
    document.addEventListener('touchend', fin, { passive: true });

    // Atrás del sistema → atrás de BroS Life (nunca sale de la app)
    try { history.pushState({ bros: 1 }, ''); } catch (e) {}
    function alAtras() { if (c.gestoAtras) c.gestoAtras(); try { history.pushState({ bros: 1 }, ''); } catch (e) {} }
    window.addEventListener('popstate', alAtras);

    return function () {
      clearInterval(reloj); clearTimeout(tPast);
      document.removeEventListener('touchstart', inicio); document.removeEventListener('touchmove', mover); document.removeEventListener('touchend', fin);
      window.removeEventListener('popstate', alAtras);
      [bar, flecha, pastilla].forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    };
  };
})();
