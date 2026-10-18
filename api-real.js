// ============================================================
// API REAL · BroS Life
// Mismo uso que api.js: llamar('ruta', datos). La lógica (logica.js) corre en el navegador,
// pero el estado de la familia vive en Supabase (función bro-estado): el móvil del Bro
// y la app de padres leen y escriben el MISMO estado. Lo que decide mamá, se aplica en Julio.
// Sin código de acceso o sin conexión, funciona en local como el prototipo.
// ============================================================
import { datosIniciales, ejecutar } from './logica.js';

const URL = 'https://nxdkjayuonzrqwjokfyu.supabase.co/functions/v1/bro-estado';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54ZGtqYXl1b256cnF3am9rZnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2ODUyOTUsImV4cCI6MjEwNjI2MTI5NX0.f4hfHICq3NxJm8f5X7bnMq2WqqlRWahpaFjCEWl2FSg';
const FAMILIA = 'familia-julio';
const LOCAL = 'bro-os-real-db';

let db = null, version = 0;
const codigo = () => localStorage.getItem('bros-real-codigo') || '';
const copia = o => JSON.parse(JSON.stringify(o));
const guardarLocal = () => { try { localStorage.setItem(LOCAL, JSON.stringify({ db, version })); } catch (e) {} };
function leerLocal() {
  try { const x = JSON.parse(localStorage.getItem(LOCAL)); if (x && x.db) { db = x.db; version = x.version || 0; return; } } catch (e) {}
  db = datosIniciales(); version = 0;
}

async function fn(accion, datos = {}) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY, apikey: KEY, 'x-bros-codigo': codigo() },
    body: JSON.stringify({ accion, familia: FAMILIA, ...datos })
  });
  if (res.status === 401) throw new Error('codigo');
  const j = await res.json();
  if (!res.ok || j.error) throw new Error(j.error || 'servidor');
  return j;
}

async function cargar() {
  const j = await fn('leer');
  if (j.datos && Object.keys(j.datos).length) { db = j.datos; version = j.version; }
  else { // primera vez: sube el estado inicial
    db = datosIniciales();
    const g = await fn('guardar', { version: 0, datos: db });
    version = g.version || (await fn('leer')).version;
  }
  guardarLocal();
}

// Igual que api.js
export async function llamar(ruta, datos = {}) {
  if (!codigo()) { if (!db) leerLocal(); const res = ejecutar(db, ruta, datos); guardarLocal(); return res; }
  try {
    if (!db || !version) await cargar();
    if (ruta === 'estado') return ejecutar(copia(db), 'estado', datos);
    for (let i = 0; i < 4; i++) {
      const nuevo = copia(db);
      const res = ejecutar(nuevo, ruta, datos);
      const g = await fn('guardar', { version, datos: nuevo });
      if (g.ok) { db = nuevo; version = g.version; guardarLocal(); return res; }
      if (g.conflicto) { db = g.datos || db; version = g.version; continue; } // otro dispositivo cambió algo: se repite sobre lo nuevo
      break;
    }
    throw new Error('conflicto');
  } catch (e) {
    if (!db) leerLocal();
    const res = ejecutar(db, ruta, datos); guardarLocal();
    return res;
  }
}

// ¿Ha cambiado algo en el otro dispositivo? Devuelve { cambio, estado }
export async function traer() {
  if (!codigo()) return { cambio: false };
  const v = await fn('leer', { solo_version: true });
  if (db && v.version === version) return { cambio: false };
  await cargar();
  return { cambio: true, estado: ejecutar(copia(db), 'estado').estado };
}

export async function reiniciar() {
  db = datosIniciales();
  if (codigo()) { try { const g = await fn('guardar', { forzar: true, datos: db }); version = g.version; } catch (e) {} }
  guardarLocal();
  return llamar('estado');
}
