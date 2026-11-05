// BroS Life · <bro-flotante>: Bro AI pequeñito y flotante en los módulos.
// Se arrastra a donde quiera el Bro (se recuerda la posición) y al tocarlo, Bro escucha.
// Shadow DOM: el motor de la página no toca lo que hay dentro.
(function () {
  if (!window.customElements || customElements.get('bro-flotante')) return;
  const TAM = 58, MARGEN = 10, CLAVE = 'bros-flotante-pos';
  const CARA = '<svg viewBox="0 0 96 96" width="62%" height="62%"><g fill="#111"><circle cx="15.5" cy="23" r="15"/><circle cx="80.5" cy="23" r="15"/></g><path d="M12 52 C13 85, 83 85, 84 52" fill="none" stroke="#111" stroke-width="24" stroke-linecap="round"/></svg>';
  class BroFlotante extends HTMLElement {
    connectedCallback() {
      if (this.raiz) return this.colocar();
      this.raiz = this.attachShadow({ mode: 'open' });
      this.raiz.innerHTML = `<style>
        :host{position:fixed;z-index:40;width:${TAM}px;height:${TAM}px;touch-action:none;-webkit-tap-highlight-color:transparent}
        .b{width:100%;height:100%;border-radius:50%;padding:4px;box-sizing:border-box;border:0;cursor:pointer;
           background:conic-gradient(from 140deg,#3068ED 0 25%,#E56648 0 50%,#82B94F 0 75%,#111 0);
           box-shadow:0 8px 22px rgba(17,17,17,.22);transition:transform .15s ease}
        .b.arr{transform:scale(1.08);box-shadow:0 12px 28px rgba(17,17,17,.3)}
        .c{width:100%;height:100%;border-radius:50%;background:#fff;display:grid;place-items:center}
      </style><button class="b" aria-label="Hablar con Bro"><div class="c">${CARA}</div></button>`;
      this.btn = this.raiz.querySelector('.b');
      let ini = null, movido = false;
      this.btn.addEventListener('pointerdown', (e) => {
        ini = { x: e.clientX, y: e.clientY, l: this.offsetLeft, t: this.offsetTop }; movido = false;
        this.btn.setPointerCapture(e.pointerId);
      });
      this.btn.addEventListener('pointermove', (e) => {
        if (!ini) return;
        const dx = e.clientX - ini.x, dy = e.clientY - ini.y;
        if (!movido && Math.hypot(dx, dy) < 8) return;
        movido = true; this.btn.classList.add('arr');
        this.mover(ini.l + dx, ini.t + dy);
      });
      const fin = () => {
        if (!ini) return; ini = null; this.btn.classList.remove('arr');
        if (movido) { try { localStorage.setItem(CLAVE, JSON.stringify({ x: this.offsetLeft / innerWidth, y: this.offsetTop / innerHeight })); } catch (e) {} }
        else if (window.__bro && __bro.escuchar) __bro.escuchar();
        else location.href = 'Bro%20OS%20Real.dc.html#hablar'; // en páginas aparte (Build): vuelve a Bro y escucha
      };
      this.btn.addEventListener('pointerup', fin);
      this.btn.addEventListener('pointercancel', () => { ini = null; this.btn.classList.remove('arr'); });
      this.alRedimensionar = () => this.colocar(); addEventListener('resize', this.alRedimensionar);
      this.colocar();
    }
    disconnectedCallback() { removeEventListener('resize', this.alRedimensionar); }
    mover(l, t) {
      this.style.left = Math.max(MARGEN, Math.min(innerWidth - TAM - MARGEN, l)) + 'px';
      this.style.top = Math.max(MARGEN + 70, Math.min(innerHeight - TAM - MARGEN, t)) + 'px';
    }
    colocar() {
      let p = null; try { p = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) {}
      if (p && typeof p.x === 'number') this.mover(p.x * innerWidth, p.y * innerHeight);
      else this.mover(innerWidth - TAM - 16, innerHeight - TAM - 24); // por defecto: abajo a la derecha
    }
  }
  customElements.define('bro-flotante', BroFlotante);
})();
