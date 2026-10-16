// ============================================================
// PUERTA ENTRE FRONT Y BACK.
// El front solo usa llamar('nombre', datos). Nunca toca los datos directamente.
//
// MODO 'simulado' → la lógica corre en el navegador y se guarda en localStorage.
// MODO 'real'     → llama al servidor (backend/server.js). No hay que tocar el front.
// ============================================================
import { datosIniciales, ejecutar } from './logica.js';

export const MODO = 'simulado'; // cambia a 'real' cuando arranques el servidor
export const API_URL = 'http://localhost:3000';

const CLAVE = 'bro-os-db-v6';

function leer() {
  try { return JSON.parse(localStorage.getItem(CLAVE)) || datosIniciales(); }
  catch (e) { return datosIniciales(); }
}

export async function llamar(ruta, datos = {}) {
  if (MODO === 'real') {
    const r = await fetch(`${API_URL}/api/${ruta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    return r.json();
  }
  const db = leer();
  const res = ejecutar(db, ruta, datos);
  localStorage.setItem(CLAVE, JSON.stringify(db));
  return res;
}

export async function reiniciar() {
  if (MODO === 'real') return llamar('reiniciar');
  localStorage.removeItem(CLAVE);
  return llamar('estado');
}
