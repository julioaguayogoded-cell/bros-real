// BroS Life · <bros-estado>: wifi/cobertura y batería REALES del móvil + la J del Bro (abre su código QR).
// Se usa en las páginas que no son Bro OS (Build, Navega) para que la cabecera sea igual en todo BroS Life.
(function () {
  if (window.customElements && customElements.get('bros-estado')) return;
  const nivel = (n, k) => (n >= k ? '1' : '.25');
  function svgMovil(n) {
    return `<svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" opacity="${nivel(n, 1)}"/><rect x="4.5" y="5" width="3" height="6" rx="1" opacity="${nivel(n, 2)}"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" opacity="${nivel(n, 3)}"/><rect x="13.5" y="0" width="3" height="11" rx="1" opacity="${nivel(n, 4)}"/></svg>`;
  }
  function svgWifi(n) {
    return `<svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 12 5.6 9.4a3.4 3.4 0 0 1 4.8 0Z" opacity="${nivel(n, 1)}"/><path d="M3.5 7.3a6.4 6.4 0 0 1 9 0l-1.4 1.4a4.4 4.4 0 0 0-6.2 0Z" opacity="${nivel(n, 2)}"/><path d="M1.4 5.2a9.4 9.4 0 0 1 13.2 0l-1.4 1.4a7.4 7.4 0 0 0-10.4 0Z" opacity="${nivel(n, 3)}"/><path d="M-.6 3.1a12.4 12.4 0 0 1 17.2 0l-1.4 1.4a10.4 10.4 0 0 0-14.4 0Z" opacity="${nivel(n, 4)}"/></svg>`;
  }
  function svgBateria(p, cargando) {
    const ancho = Math.max(1, Math.round(17 * p / 100)), col = cargando ? '#4E9A2E' : p <= 15 ? '#D93B2B' : 'currentColor';
    return `<svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3.2" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="${ancho}" height="8" rx="1.8" fill="${col}"/><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4z" fill="currentColor" opacity=".45"/></svg>`;
  }
  async function leer() {
    try { if (window.BroNativo && BroNativo.estadoMovil) return JSON.parse(BroNativo.estadoMovil()); } catch (e) {}
    const e = { red: navigator.onLine ? 'desconocida' : 'ninguna' };
    const c = navigator.connection; if (c && c.type) e.red = c.type === 'wifi' ? 'wifi' : c.type === 'cellular' ? 'movil' : c.type === 'none' ? 'ninguna' : e.red;
    try { if (navigator.getBattery) { const b = await navigator.getBattery(); e.bateria = Math.round(b.level * 100); e.cargando = b.charging; } } catch (x) {}
    return e;
  }
  class BrosEstado extends HTMLElement {
    connectedCallback() {
      // Shadow DOM: el motor de la página (React) no ve ni toca lo que pintamos aquí
      if (!this.raiz) this.raiz = this.attachShadow({ mode: 'open' });
      this.style.cssText = 'display:flex;flex:none';
      this.pintar(); clearInterval(this.t); this.t = setInterval(() => this.pintar(), 15000);
    }
    disconnectedCallback() { clearInterval(this.t); }
    async pintar() {
      const e = await leer();
      let disp = null; try { disp = JSON.parse(localStorage.getItem('bros-dispositivo')); } catch (x) {}
      const ini = ((disp && disp.nombre) || 'B').trim().charAt(0).toUpperCase();
      const bat = typeof e.bateria === 'number' ? Math.max(0, Math.min(100, e.bateria)) : null;
      let h = '';
      if (e.red === 'movil' || e.sim) h += svgMovil(Math.max(0, Math.min(4, e.nivelMovil || 0)));
      if (e.red === 'movil' && e.gen) h += `<span style="font:700 11.5px Inter,system-ui;line-height:1">${e.gen}</span>`;
      if (e.red === 'wifi') h += svgWifi(e.nivelWifi == null ? 4 : e.nivelWifi);
      if (e.red === 'ninguna') h += `<span style="font:700 11px Inter,system-ui;color:#6B7280">Sin red</span>`;
      if (bat != null) h += `<span style="font:700 11.5px Inter,system-ui;line-height:1">${bat}%</span>` + svgBateria(bat, e.cargando);
      h += `<button aria-label="Mi código Bro" style="width:36px;height:36px;border-radius:50%;background:#3068ED;color:#fff;display:grid;place-items:center;font:700 16px Outfit,system-ui;border:0;margin-left:6px;cursor:pointer">${ini}</button>`;
      this.raiz.innerHTML = `<div style="display:flex;align-items:center;gap:6px;color:#111">${h}</div>`;
      this.raiz.querySelector('button').onclick = () => { location.href = 'Bro%20OS%20Real.dc.html#qr'; };
    }
  }
  customElements.define('bros-estado', BrosEstado);
})();
