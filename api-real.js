// ============================================================
// API REAL · BroS Life
// Mismo uso que api.js: llamar('ruta', datos). La lógica (logica.js) corre en el navegador,
// pero el estado de la familia vive en Supabase (función bro-estado): el móvil del Bro
// y la app de padres leen y escriben el MISMO estado. Lo que decide mamá, se aplica en Julio.
// Sin código de acceso o sin conexión, funciona en local como el prototipo.
// ============================================================
import { datosIniciales, ejecutar } from './logica.js?v=2026-10-19.4';

const URL = 'https://nxdkjayuonzrqwjokfyu.supabase.co/functions/v1/bro-estado';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54ZGtqYXl1b256cnF3am9rZnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2ODUyOTUsImV4cCI6MjEwNjI2MTI5NX0.f4hfHICq3NxJm8f5X7bnMq2WqqlRWahpaFjCEWl2FSg';
const FAMILIA = 'familia-julio';
if (typeof window !== 'undefined') { (function(){if(window.__brosP)return;window.__brosP=1;var q=new URLSearchParams(location.search).get('perfil');if(q)window.name='bros:'+q.replace(/[^a-z0-9_-]/gi,'').slice(0,20);var m=/^bros:(.+)$/.exec(window.name||'');if(!m)return;var P='P:'+m[1]+':',S=Storage.prototype,g=S.getItem,s=S.setItem,r=S.removeItem;var es=function(x){try{return x===window.localStorage}catch(e){return false}};S.getItem=function(a){return g.call(this,es(this)?P+a:a)};S.setItem=function(a,b){return s.call(this,es(this)?P+a:a,b)};S.removeItem=function(a){return r.call(this,es(this)?P+a:a)};window.BROS_PERFIL=m[1];})(); }
const LOCAL = 'bro-os-real-db';
const RPC = 'https://nxdkjayuonzrqwjokfyu.supabase.co/rest/v1/rpc/';
// Móvil vinculado en el primer encendido: guarda { token, bro, nombre, nacimiento, correa, avatar }
const dispositivo = () => { try { return JSON.parse(localStorage.getItem('bros-dispositivo')) || null; } catch (e) { return null; } };
const previewLimpio = () => /[?&]limpio=1/.test(location.search);

const edadDe = n => { if (!n) return 12; const d = new Date(n), h = new Date(); let e = h.getFullYear() - d.getFullYear(); if (h < new Date(h.getFullYear(), d.getMonth(), d.getDate())) e--; return Math.max(8, Math.min(16, e)); };
// Un Bro recién encendido: solo los módulos de BroS Life. Sin apps, proyectos, contactos ni contenido de demo.
export function datosLimpios(p = {}) {
  const base = datosIniciales(), nombre = p.nombre || 'Bro', edad = edadDe(p.nacimiento);
  const cero7 = [0, 0, 0, 0, 0, 0, 0];
  return {
    ...base,
    limpio: true,
    nino: { nombre, edad, minutosPantalla: 240, minutosUsados: 0, noche: '22:00', avatar: p.avatar || null },
    madre: { nombre: p.tutor || 'Mamá' },
    aura: { ...base.aura, pasos: 0, activos: 0, movimiento: 0, pantalla: 0, actividad: 0, semana: cero7.map(() => [0, 0]), suenoSemana: cero7.slice(), sueno: { total: '—', dormir: '—', despertar: '—', calidad: 'Sin datos todavía', ayer: '—', fases: [] }, sinDatos: true },
    comunidades: [], fichas: {}, reviews: {}, bros: [], chats: {}, planes: [], proyectos: [],
    rewards: [], canalesAprobados: [], logros: [], solicitudes: [], contenido: [],
    apps: base.apps.filter(a => a.id === 'wallet').map(a => ({ ...a, estado: 'disponible' })),
    monedero: { activo: false, saldo: 0, movimientos: [], tarjeta: { ...base.monedero.tarjeta, titular: nombre.toUpperCase() } },
    hijos: [{ id: p.bro || 'bro', nombre, edad, color: '#3068ED' }],
    sofia: { cumple: 'no aplica' }, calendarioExtra: [], recordatorios: [], avisos: [], colegio: []
  };
}
// ---------- Modo padres: sesión de Familia Real (supabase-js) y un estado por hijo ----------
const SB_URL = 'https://nxdkjayuonzrqwjokfyu.supabase.co';
let sb = null, padre = null; // padre = { bros: [...], sel: id }
function cliente() {
  if (!sb && typeof window !== 'undefined' && window.supabase) sb = window.supabase.createClient(SB_URL, KEY);
  return sb;
}
const broPadre = () => padre && padre.bros.find(b => b.id === padre.sel);
async function leerPadre() {
  const { data, error } = await cliente().from('estado_bro').select('version,datos').eq('bro', padre.sel).maybeSingle();
  if (error) throw new Error(error.message);
  return { version: data ? data.version : 0, datos: data ? data.datos : null };
}
async function guardarPadre(v, datos) {
  const c = cliente();
  if (!v) {
    const { error } = await c.from('estado_bro').insert({ bro: padre.sel, version: 1, datos });
    if (!error) return { ok: true, version: 1 };
    const a = await leerPadre(); return { conflicto: true, version: a.version, datos: a.datos };
  }
  const { data, error } = await c.from('estado_bro').update({ version: v + 1, datos, actualizado: new Date().toISOString() }).eq('bro', padre.sel).eq('version', v).select('version');
  if (error) throw new Error(error.message);
  if (data && data.length) return { ok: true, version: v + 1 };
  const a = await leerPadre(); return { conflicto: true, version: a.version, datos: a.datos };
}

// La app de padres la llama al arrancar: ¿hay sesión de Familia Real? ¿qué hijos hay?
export async function familia() {
  for (let i = 0; i < 30 && typeof window !== 'undefined' && !window.supabase; i++) await new Promise(r => setTimeout(r, 100));
  const c = cliente(); if (!c) return { sesion: false, bros: [] };
  const { data: s } = await c.auth.getSession();
  if (!s || !s.session) { padre = null; return { sesion: false, bros: [] }; }
  const { data: bros } = await c.from('bros').select('id,nombre,nacimiento,correa,vinculado').order('creado');
  const lista = bros || [];
  if (!lista.length) { padre = null; return { sesion: true, bros: [] }; }
  const guardado = localStorage.getItem('bros-padre-bro');
  const sel = lista.some(b => b.id === guardado) ? guardado : lista[0].id;
  if (!padre || padre.sel !== sel) { db = null; version = 0; }
  padre = { bros: lista, sel };
  return { sesion: true, bros: lista, sel };
}
// Lo urgente de todos los hijos, para el inicio de la app de padres
export async function urgentesFamilia() {
  if (!padre || !padre.bros.length) return null;
  const c = cliente(); if (!c) return null;
  const { data } = await c.from('estado_bro').select('bro,datos').in('bro', padre.bros.map(b => b.id));
  const COL = { Azul: '#3068ED', Naranja: '#E56648', Verde: '#4E8A2A', Negro: '#111111', Rosa: '#D9467A' };
  const todos = [];
  for (const b of padre.bros) {
    const fila = (data || []).find(x => x.bro === b.id);
    const d = fila && fila.datos ? copia(fila.datos) : datosLimpios({ ...b, bro: b.id });
    const sug = ejecutar(d, 'estado').estado.sugerenciasPadre || [];
    sug.forEach(x => todos.push({ ...x, hijo: b.id, hijoNombre: b.nombre, color: COL[b.correa] || '#3068ED' }));
  }
  return todos.sort((a, b) => a.orden - b.orden);
}
// Amistades de los hijos con más de 3 años de diferencia: esperan el permiso de los padres
export async function amistadesPendientes() {
  const c = cliente(); if (!c || !padre) return [];
  const { data, error } = await c.rpc('amistades_por_aprobar');
  return error ? [] : (data || []);
}
export async function decidirAmistad(id, si) {
  const { data, error } = await cliente().rpc('decidir_amistad', { p_id: id, p_si: !!si });
  if (error) throw new Error(error.message);
  return data;
}
export async function elegirBro(id) {
  if (!padre || !padre.bros.some(b => b.id === id)) return llamar('estado');
  localStorage.setItem('bros-padre-bro', id);
  padre.sel = id; db = null; version = 0;
  return llamar('estado');
}

async function rpc(nombre, args) {
  const res = await fetch(RPC + nombre, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY, apikey: KEY }, body: JSON.stringify(args) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || (j && j.error)) throw new Error((j && (j.error || j.message)) || 'servidor');
  return j;
}

let db = null, version = 0;
const codigo = () => localStorage.getItem('bros-real-codigo') || '';
const copia = o => JSON.parse(JSON.stringify(o));
const guardarLocal = () => { if (padre) return; try { localStorage.setItem(LOCAL, JSON.stringify({ db, version })); } catch (e) {} };
function leerLocal() {
  if (previewLimpio()) { db = datosLimpios({ nombre: 'Julio', nacimiento: '2014-03-10' }); version = 0; return; }
  try { const x = JSON.parse(localStorage.getItem(LOCAL)); if (x && x.db) { db = x.db; version = x.version || 0; return; } } catch (e) {}
  db = dispositivo() ? datosLimpios(dispositivo()) : datosIniciales(); version = 0;
}
const enLinea = () => !previewLimpio() && (!!(dispositivo() && dispositivo().token) || !!(padre && padre.sel) || !!codigo());

async function fn(accion, datos = {}) {
  const d = dispositivo();
  if (d && d.token) { // Bro vinculado: su propio estado
    if (accion === 'leer') { const j = await rpc('estado_leer_bro', { p_token: d.token }); return { version: j.version || 0, datos: j.datos }; }
    if (accion === 'guardar') { const j = await rpc('estado_guardar_bro', { p_token: d.token, p_version: Number(datos.version) || 0, p_datos: datos.datos }); return j; }
  }
  if (padre && padre.sel) { // padre o madre con sesión: el estado del hijo elegido
    if (accion === 'leer') return leerPadre();
    if (accion === 'guardar') return guardarPadre(datos.forzar ? (await leerPadre()).version : Number(datos.version) || 0, datos.datos);
  }
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
    db = dispositivo() ? datosLimpios(dispositivo()) : broPadre() ? datosLimpios({ ...broPadre(), bro: broPadre().id }) : datosIniciales();
    const g = await fn('guardar', { version: 0, datos: db });
    version = g.version || (await fn('leer')).version;
  }
  guardarLocal();
}

// Igual que api.js
export async function llamar(ruta, datos = {}) {
  if (!enLinea()) { if (!db) leerLocal(); const res = ejecutar(db, ruta, datos); if (!previewLimpio()) guardarLocal(); return res; }
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
  if (!enLinea()) return { cambio: false };
  const v = await fn('leer', { solo_version: true });
  if (db && v.version === version) return { cambio: false };
  await cargar();
  return { cambio: true, estado: ejecutar(copia(db), 'estado').estado };
}

export async function reiniciar() {
  db = dispositivo() ? datosLimpios(dispositivo()) : broPadre() ? datosLimpios({ ...broPadre(), bro: broPadre().id }) : datosIniciales();
  if (enLinea()) { try { const g = await fn('guardar', { forzar: true, datos: db }); version = g.version; } catch (e) {} }
  guardarLocal();
  return llamar('estado');
}
