// ============================================================
// BACK END DE BRO — datos y reglas.
// Igual en modo simulado (navegador) y real (servidor Node).
// Para cambiar cómo funciona Bro, se cambia AQUÍ. El front solo pinta.
// Principio: Bro hace pensar y da opciones. Nunca decide por la persona.
// ============================================================

export function datosIniciales() {
  return {
    nino: { nombre: 'Julio', edad: 13, minutosPantalla: 240, minutosUsados: 140, noche: '22:00' },
    madre: { nombre: 'Laura' },

    aura: {
      pasos: 6240, metaPasos: 9000, activos: 47, metaActivos: 60, movimiento: 310, metaMovimiento: 450,
      pantalla: 140, actividad: 95,
      semana: [[165, 70], [140, 110], [190, 55], [120, 130], [150, 95], [95, 175], [140, 95]], // [pantalla, movimiento] en minutos, de lunes a domingo
      suenoSemana: [7.8, 8.1, 7.2, 8.3, 8.0, 9.1, 8.2],
      sueno: {
        total: '8 h 12 min', dormir: '22:48', despertar: '07:00', calidad: 'Buena', ayer: '7 h 05 min',
        fases: [['#3068ED', 2], ['#7fa4ff', 3], ['#6f49d8', 1.5], ['#7fa4ff', 2], ['#3068ED', 1.5], ['#7fa4ff', 2.5], ['#E56648', 0.4], ['#6f49d8', 1.6], ['#7fa4ff', 1.5]]
      }
    },

    comunidades: [
      COMUNIDAD_BARRIO(),
      { id: 'futbol', ic: '⚽', nombre: 'Fútbol Base', para: 'Organizar partidos y entrenar juntos', dirige: 'CD Chamartín' },
      { id: 'robotica', ic: '🤖', nombre: 'Robótica del insti', para: 'Construir cosas que se mueven', dirige: 'IES Ramiro de Maeztu' },
      { id: 'familia', ic: '🏠', nombre: 'Familia', para: 'Logística de casa', dirige: 'Laura' }
    ],

    fichas: {
      skate: {
        nombre: 'Skate Madrid Río', ic: '🛹', que: 'Quedadas para patinar los sábados y aprender trucos',
        dirige: 'Club Deportivo Madrid Río (verificado)', responsable: 'Marta Ferrer, entrenadora', edades: '11 a 16',
        entra: 'Por invitación o solicitud', privacidad: 'No es pública. Nadie de fuera ve quién está.',
        adultos: '2 adultos identificados. No pueden escribir en privado a los niños.'
      }
    },
    reviews: {
      skate: [
        { de: 'Carmen, madre de Hugo', txt: 'Marta es muy atenta y siempre avisa al acabar. Hugo ha ganado mucha confianza.' },
        { de: 'Javier, padre de Mateo', txt: 'Grupo sano y bien organizado. Los horarios se cumplen.' }
      ]
    },

    bros: [
      { nombre: 'Hugo', apellido: 'Prieto', de: 'Del cole y de Fútbol Base', color: '#3068ED' },
      { nombre: 'Lucía', apellido: 'Rojas', de: 'De Robótica del insti', color: '#82B94F' },
      { nombre: 'Mateo', apellido: 'Serra', de: 'Del equipo', color: '#E56648' }
    ],

    chats: {
      Hugo: { sinLeer: true, mensajes: [{ de: 'Hugo', txt: '¿Te vienes el sábado al skate? Vamos 5.' }] },
      Lucía: { sinLeer: false, mensajes: [{ de: 'Lucía', txt: 'Mañana traigo los motores para la rampa' }, { de: 'yo', txt: 'Perfecto 👌' }] },
      Mateo: { sinLeer: false, mensajes: [{ de: 'Mateo', txt: 'Buen partido hoy' }] }
    },

    planes: [
      { id: 'skate', titulo: 'Skate en Madrid Río', cuando: 'Sábado, 10:00', donde: 'Puente de Praga, Madrid Río', van: 'Hugo, Mateo y 3 Bros más', organiza: 'Skate Madrid Río · Marta Ferrer (entrenadora)', estado: 'borrador', detalle: '' }
    ],

    proyectos: [
      { id: 'rampa', titulo: 'Rampa de skate', con: 'Con Lucía', paso: 2, pasos: 4, siguiente: 'Decidir el material' }
    ],

    rewards: rewardsIniciales(),
    canalesAprobados: [{ id: 'animalize', nombre: 'animaLize21', por: 'mamá', fecha: '14 sep' }, { id: 'plex', nombre: 'YoSoyPlex', por: 'mamá', fecha: '14 sep' }],
    logros: [
      { id: 'lectura', titulo: 'Leer 3 libros este mes', progreso: 2, meta: 3, premio: 'Cine el domingo', de: 'Laura', nuevo: false }
    ],

    // Wallet: tarjeta Bro emitida por Twelve. Julio la pide, Laura la activa.
    // Consentimientos de Laura (tutora legal). RGPD art. 8 + LOPDGDD art. 7: menores de 14 → consiente el tutor.
    consentimientos: consentimientosIniciales(),
    // Límites que pone Laura. El móvil los aplica (en el launcher real, vía Android Management API).
    limites: { pantallaDia: 180, cole: { on: true, desde: '08:30', hasta: '14:00' }, descanso: { desde: '22:00', hasta: '07:30' }, finde: { on: true }, actualizado: '28 sep' },
    descanso: { activo: false },

    monedero: { activo: false, saldo: 0, movimientos: [], tarjeta: { titular: 'JULIO', ultimos: '4827', caduca: '10/29' } },

    apps: [
      // estado: instalada | disponible | pendiente | denegada | noApta
      { id: 'spotify', nombre: 'Spotify', ic: '🎵', color: '#1DB954', estado: 'instalada', que: 'Música y podcasts' },
      { id: 'duolingo', nombre: 'Duolingo', ic: '🦉', color: '#58CC02', estado: 'instalada', que: 'Idiomas, 15 min al día' },
      { id: 'minecraft', nombre: 'Minecraft', ic: '⛏️', color: '#6B8E23', estado: 'instalada', que: 'Solo servidores de amigos' },
      { id: 'matchapp', nombre: 'Matchapp', ic: '🏅', color: '#3068ED', estado: 'instalada', que: 'Partidos y resultados', tiempo: '30 min al día' },
      { id: 'brownie', nombre: 'Brownie', ic: '🛍️', color: '#8B5E3C', estado: 'instalada', que: 'Tienda de ropa', tiempo: '15 min al día' },
      { id: 'wallet', nombre: 'Wallet', ic: '💳', color: '#E8447A', estado: 'instalada', que: 'Tu tarjeta Bro · Twelve' },
      { id: 'subway', nombre: 'Subway Surfers', ic: '🏄', color: '#F2A900', estado: 'instalada', que: 'Juego', tiempo: '30 min al día' },
      { id: 'canva', nombre: 'Canva', ic: '🎨', color: '#7D2AE8', estado: 'pendiente', que: 'Diseño para proyectos' },
      { id: 'madfutbol', nombre: 'MadFútbol', ic: '⚽', color: '#0B7A3E', estado: 'disponible', que: 'Resultados y partidos de fútbol base en Madrid' },
      { id: 'strava', nombre: 'Strava', ic: '🏃', color: '#FC4C02', estado: 'disponible', que: 'Registrar rutas en bici o a pie' },
      // Bloqueadas por edad: Bro las bloquea solo, según el perfil 13
      { id: 'tiktok', nombre: 'TikTok', ic: '📱', color: '#111111', estado: 'noApta', que: 'Vídeos cortos', motivo: 'Es para mayores de 16 y muestra vídeos de desconocidos' },
      { id: 'instagram', nombre: 'Instagram', ic: '📷', color: '#C13584', estado: 'noApta', que: 'Red social', motivo: 'Perfiles públicos y mensajes de desconocidos' },
      { id: 'gta', nombre: 'GTA', ic: '🚗', color: '#2b3550', estado: 'noApta', que: 'Videojuego', motivo: 'Clasificado PEGI 18 por violencia' },
      // Bloqueadas por mamá: decisión de Laura, con su porqué
      { id: 'roblox', nombre: 'Roblox', ic: '🧱', color: '#E2231A', estado: 'denegada', que: 'Juegos creados por la comunidad', motivo: 'Ya tiene bastante pantalla entre semana' },
      { id: 'fortnite', nombre: 'Fortnite', ic: '🎯', color: '#6f49d8', estado: 'denegada', que: 'Videojuego online', motivo: 'Tiene compras dentro del juego y chat de voz con desconocidos' },
      { id: 'brawl', nombre: 'Brawl Stars', ic: '⭐', color: '#F2B705', estado: 'denegada', que: 'Videojuego', motivo: 'Lo hablamos cuando acabe los exámenes' }
    ],

    // Lo que Julio pide y Laura decide. estado: pendiente | si | no | persona
    solicitudes: [
      { id: 's1', tipo: 'app', ref: 'canva', titulo: 'Canva', detalle: 'Julio la quiere. Tú decides el tiempo de uso.', estado: 'pendiente' },
      { id: 's2', tipo: 'comunidad', ref: 'skate', titulo: 'Skate Madrid Río', detalle: 'Quedadas los sábados con Hugo y Mateo.', estado: 'pendiente' }
    ],

    // Contenido revisado para perfil 13
    contenido: [
      { id: 'c1', tema: 'Proyectos', t: 'Cómo hacer un avión de papel que vuele lejos', de: 'Ciencia en Casa', dur: '4 min', color: '#3068ED' },
      { id: 'c2', tema: 'Deporte', t: 'Tres trucos de skate para empezar', de: 'Skate Madrid Río', dur: '6 min', color: '#E56648' },
      { id: 'c3', tema: 'Ciencia', t: 'Por qué vuelan los aviones', de: 'Ciencia en Casa', dur: '5 min', color: '#6f49d8' },
      { id: 'c4', tema: 'Fútbol', t: 'Resumen de la jornada de fútbol base', de: 'MadFútbol', dur: '3 min', color: '#82B94F' }
    ],

    // Recordatorios de Julio (aparecen en «My today stuff»)
    hijos: [{ id: 'julio', nombre: 'Julio', edad: 13, color: '#3068ED' }, { id: 'sofia', nombre: 'Sofía', edad: 10, color: '#82B94F' }],
    sofia: { cumple: null },
    calendarioExtra: [],
    recordatorios: [
      { id: 'mates', k: 'Mañana', titulo: 'Examen de Mates', detalle: 'Temas 3 y 4: fracciones y ecuaciones. Repasa los ejercicios de la página 58.' }
    ],

    // Avisos rápidos de Julio a Laura (flujo J4)
    avisos: [],

    colegio: [
      { id: 'excursion', de: 'IES Ramiro de Maeztu · Secretaría', asunto: 'Excursión al Museo del Prado', resumen: 'Autorización firmada y 12 € antes del viernes.', accion: 'Firmar y pagar 12 €', opciones: ['Firmar y pagar 12 €', 'Más tarde'], hecho: false },
      { id: 'examen', de: 'IES Ramiro de Maeztu · Tutoría', asunto: 'Examen de Lengua el jueves', resumen: 'Temas 4 y 5.', accion: 'Recordárselo a Julio', opciones: ['Recordárselo a Julio', 'Añadir al calendario', 'Nada'], hecho: false },
      { id: 'fundas', de: 'Profe de Ciencias', asunto: 'Fundas de plástico para el dosier', resumen: 'Cada documento en su funda antes del martes 22.', accion: 'Pedírselo a Julio', opciones: ['Pedírselo a Julio', 'Más tarde'], hecho: false }
    ]
  };
}

// ---------- Utilidades ----------
const limpiar = t => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const junto = t => limpiar(t).replace(/[^a-z0-9]/g, ''); // «Mad Fútbol» = «madfutbol»
const nuevoId = () => Math.random().toString(36).slice(2, 8);
const fmtMin = m => { const h = Math.floor(m / 60), x = Math.round(m % 60); return (h ? h + ' h ' : '') + (x ? x + ' min' : '') || '0 min'; };
const DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const TIPO = { plan: 'Plan físico', app: 'App nueva', monedero: 'Monedero', comunidad: 'Comunidad nueva' };

// ---------- Bro AI: qué quiere hacer cada persona ----------
// Cada intención: palabras que la activan → qué hace y qué dice Bro.
// Bro puntúa todas y elige la que más coincide (así entiende frases largas por voz).
// «peso» sube la prioridad de las intenciones importantes.
const INTENCIONES_NINO = [
  { peso: 5, palabras: ['buenas noches', 'me voy a dormir', 'me voy a la cama', 'modo descanso', 'a dormir', 'hora de dormir'], accion: { demo: 'dormir' }, di: 'Buenas noches, Julio. Tu Bro también descansa.' },
  { peso: 5, palabras: ['activa mi tarjeta', 'activar mi tarjeta', 'activar la tarjeta', 'activa la tarjeta', 'activar el wallet', 'activa el wallet', 'activar wallet', 'activar mi wallet', 'quiero mi tarjeta', 'pide la tarjeta'], accion: { pantalla: 'monedero', pedir: true }, di: '' },
  { peso: 7, palabras: ['pagina', 'paginas', 'libro de sm', 'del libro', 'mi libro', 'el libro', '166', '167'], accion: { pantalla: 'aprender', libro: true }, di: 'No puedo darte contenido de tu libro. Puedes pedirme contenido específico.' },
  { peso: 5, palabras: ['deberes', 'cole', 'colegio', 'power point', 'powerpoint', 'ppt', 'presentacion', 'diapositivas', 'geografia', 'historia', 'paleolitico', 'trabajo de clase', 'exposicion'], accion: { pantalla: 'aprender' }, di: 'Learning mode. Tú piensas y decides; yo te ayudo a ordenar.' },
  { peso: 5, palabras: ['compartelo', 'comparte el partido', 'compartir el partido', 'comparte el cartel', 'manda el cartel', 'mandalo a la comunidad', 'comunidad del barrio', 'la colonia'], accion: { pantalla: 'comunidad', id: 'barrio', compartir: true }, di: '' },
  { peso: 4, palabras: ['partido', 'triangular', 'pachanga', 'torneo', 'jugar al futbol', 'organizar un partido', 'montar un partido'], accion: { flujo: 'partido' }, di: '' },
  { peso: 3, palabras: ['principito', 'he leido', 'terminado el libro', 'acabado el libro', 'test del libro', 'hacer el test'], accion: { pantalla: 'logros', test: 'principito' }, di: 'Vamos con el test del libro.' },
  { peso: 3, palabras: ['bro join', 'unirme al reto', 'casa del libro', 'mcdonald', 'big mac', 'ea sports', 'fifa', 'fc 27', 'patrocinado', 'marcas'], accion: { pantalla: 'logros' }, di: 'Aquí tienes los rewards de marcas.' },
  { peso: 3, palabras: ['triste', 'agobiad', 'me siento mal', 'me siento fatal', 'estoy mal', 'estoy fatal', 'me han dicho', 'me han hecho', 'me han pegado', 'me insultan', 'se meten conmigo', 'no me encuentro', 'necesito hablar', 'me duele', 'estoy rayado', 'lloro', 'llorando', 'miedo', 'solo en el recreo', 'nadie me habla', 'deprimid', 'ansiedad', 'nervios'], accion: { responder: true }, di: 'Eso debes hablarlo con tu entorno más cercano.' },
  { peso: 2, palabras: ['que tiempo', 'tiempo hace', 'va a llover', 'llueve', 'hace frio', 'hace calor', 'temperatura', 'paraguas', 'abrigo'], accion: { responder: true }, di: 'Hoy en Madrid hace 26° y está parcialmente nublado. No hace falta paraguas.' },
  { peso: 2, palabras: ['qr', 'mi codigo', 'codigo bro', 'conectar con', 'nuevo bro', 'anadir a', 'agregar a', 'escanear'], accion: { pantalla: 'qr' }, di: 'Aquí tienes tu código Bro.' },
  { peso: 2, palabras: ['ven mis padres', 've mi madre', 've mama', 've laura', 'privacidad', 'que sabe mi madre', 'que sabe mama'], accion: { pantalla: 'privacidad' }, di: 'Esto es lo que ve Laura, y lo que no.' },
  { peso: 2, palabras: ['emergencia', '112', 'socorro', 'ayuda urgente'], accion: { llamar: 'Emergencias' }, di: 'Llamo al 112.' },
  { peso: 2, palabras: ['mama', 'madre', 'mami', 'laura'], accion: { flujo: 'mama' }, di: '' },
  { peso: 2, palabras: ['papa', 'papi', 'mi padre'], accion: { llamar: 'Papá' }, di: 'Llamo a papá.' },
  { peso: 1, palabras: ['hugo'], accion: { pantalla: 'chat', id: 'Hugo' }, di: 'Abro tu chat con Hugo.' },
  { peso: 1, palabras: ['lucia'], accion: { pantalla: 'chat', id: 'Lucía' }, di: 'Abro tu chat con Lucía.' },
  { peso: 1, palabras: ['mateo'], accion: { pantalla: 'chat', id: 'Mateo' }, di: 'Abro tu chat con Mateo.' },
  { peso: 2, palabras: ['proyecto', 'avion', 'tengo una idea', 'se me ha ocurrido', 'quiero hacer algo', 'quiero construir', 'quiero montar', 'quiero crear', 'quiero fabricar', 'manualidad', 'experimento', 'periodico', 'robot'], accion: { flujo: 'proyecto' }, di: '' },
  { peso: 1, palabras: ['mis proyectos', 'ver proyectos', 'como va mi proyecto', 'rampa'], accion: { pantalla: 'proyectos' }, di: 'Aquí están tus proyectos.' },
  { peso: 2, palabras: ['descarga', 'descargar', 'descargame', 'instala', 'instalar', 'instalame', 'bajame', 'bajar', 'app nueva', 'una app', 'nueva app', 'aplicacion nueva', 'quiero la app', 'quiero una aplicacion', 'pedir una app', 'tienda', 'store'], accion: { flujo: 'app' }, di: '' },
  { peso: 1, palabras: ['mis apps', 'mis aplicaciones', 'que apps tengo', 'aplicaciones', 'apps'], accion: { pantalla: 'apps' }, di: 'Aquí están tus apps.' },
  { peso: 1, palabras: ['comunidad', 'comunidades', 'grupo', 'grupos', 'equipo', 'futbol', 'robotica', 'mensaje', 'mensajes', 'chat', 'chats', 'que hay nuevo', 'novedades', 'bros', 'amigos', 'me han escrito', 'escribir a'], accion: { pantalla: 'comunidades' }, di: 'Te llevo a tus comunidades.' },
  { peso: 1, palabras: ['permiso', 'puedo ir', 'me dejas ir'], accion: { flujo: 'permiso', id: 'skate' }, di: 'Preparamos juntos lo que le vas a pedir a Laura.' },
  { peso: 1, palabras: ['skate', 'sabado', 'quedada', 'plan'], accion: { pantalla: 'plan', id: 'skate' }, di: 'Abro el plan del sábado.' },
  { peso: 1, palabras: ['dormido', 'sueno', 'dormir', 'aura', 'pulsera', 'pasos', 'movido', 'descanso', 'equilibrio'], accion: { pantalla: 'aura' }, di: 'Abro Aura.' },
  { peso: 1, palabras: ['dinero', 'monedero', 'wallet', 'paga', 'saldo', 'pagar', 'tarjeta', 'twelve'], accion: { pantalla: 'monedero' }, di: 'Abro tu Wallet.' },
  { peso: 1, palabras: ['logro', 'logros', 'premio', 'premios', 'reto', 'acuerdo', 'rewards', 'recompensa'], accion: { pantalla: 'logros' }, di: 'Aquí están tus logros.' },
  { peso: 1, palabras: ['contenido', 'video', 'videos', 'ver algo', 'content', 'aprender'], accion: { pantalla: 'contenido' }, di: 'Te llevo a Contenido.' }
];

const INTENCIONES_PADRE = [
  { peso: 4, palabras: ['limites', 'limite', 'horarios', 'horario', 'tiempo de pantalla', 'descanso', 'hora de dormir', 'modo cole', 'modo descanso', 'cuanto tiempo usa'], accion: { pantalla: 'limites' }, di: '' },
  { peso: 6, palabras: ['consentimiento', 'consentimientos', 'privacidad', 'permisos', 'mis datos', 'datos de julio', 'rgpd', 'que datos', 'proteccion de datos'], accion: { pantalla: 'consentimientos' }, di: 'Aquí tienes todos los permisos de Julio.' },
  { peso: 6, palabras: ['sofia', 'cumple', 'carla'], accion: { flujo: 'sofia' }, di: '' },
  { peso: 5, palabras: ['propon', 'proponer', 'proponle', 'nuevo reward', 'crear reward', 'un reto', 'premio para'], accion: { flujo: 'proponer' }, di: '' },
  { peso: 5, palabras: ['dile a julio', 'dile que', 'escribele', 'escribe a julio', 'mensaje a julio', 'mandale', 'chat con julio', 'hablar con julio', 'decirle'], accion: { flujo: 'mensaje' }, di: '' },
  { peso: 4, palabras: ['como va julio', 'como va', 'resumen', 'que ha hecho', 'que ha aprendido', 'que ha construido', 'su semana'], accion: { flujo: 'semana' }, di: '' },
  { peso: 4, palabras: ['limite', 'limites', 'horario', 'horarios', 'tiempo de pantalla', 'hora de dormir', 'apagar', 'cuanto tiempo'], accion: { flujo: 'limites' }, di: '' },
  { peso: 4, palabras: ['calendario', 'agenda', 'que tenemos', 'planes', 'que hay hoy', 'que hay esta semana', 'tenemos esta semana', 'familia'], accion: { flujo: 'calendario' }, di: '' },
  { peso: 4, palabras: ['reserva', 'reservar', 'pista', 'partido', 'pradillo'], accion: { flujo: 'reserva' }, di: '' },
  { peso: 4, palabras: ['canales', 'canal', 'youtuber', 'youtubers', 'plex', 'animaliz', 'whitelist', 'lista blanca', 'aprobados'], accion: { flujo: 'canales' }, di: '' },
  { peso: 3, palabras: ['reward', 'rewards', 'validar', 'valida', 'logro', 'logros', 'premio', 'recompensa', 'contrato', 'firmar', 'casa del libro', 'mcdonald', 'ea sports'], accion: { flujo: 'rewards' }, di: '' },
  { peso: 2, palabras: ['comunidad', 'grupo', 'unirse', 'unirme', 'apuntarse', 'apuntar', 'skate', 'club', 'madrid rio', 'resenas', 'reviews', 'opiniones'], accion: { flujo: 'comunidad' }, di: '' },
  { peso: 2, palabras: ['pendiente', 'pendientes', 'pide', 'pedido', 'peticion', 'peticiones', 'decidir', 'decision', 'solicitud', 'aprobar', 'aprobacion', 'que quiere', 'que me pide', 'que tengo', 'app', 'aplicacion', 'descargar', 'canva', 'madfutbol', 'mad futbol'], accion: { flujo: 'decidir' }, di: '' },
  { peso: 2, palabras: ['cole', 'colegio', 'instituto', 'insti', 'correo', 'correos', 'email', 'mail', 'excursion', 'examen', 'buzon', 'profe', 'tutor', 'tutoria', 'circular', 'autorizacion'], accion: { flujo: 'colegio' }, di: '' },
  { peso: 2, palabras: ['como esta', 'que tal esta', 'que tal julio', 'dormid', 'duerme', 'aura', 'pantalla', 'semana', 'sueno', 'hablar de algo', 'tendencia', 'movimiento', 'descanso', 'salud', 'bien julio'], accion: { flujo: 'aura' }, di: '' }
];

function puntuar(lista, texto) {
  const t = ' ' + limpiar(texto).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  let mejor = null, max = 0;
  for (const i of lista) {
    let p = 0;
    for (const w of i.palabras) if (t.includes(w.length <= 4 ? ' ' + w : w)) p += w.split(' ').length;
    if (p) p += i.peso || 0;
    if (p > max) { max = p; mejor = i; }
  }
  return mejor;
}

// ============================================================
// CONTENT: Bro busca, filtra y muestra. Sin recomendaciones ni feed.
// ============================================================
const NO_ADECUADO = { accion: { responder: true }, di: 'Este contenido no es adecuado para ti.' };

// Palabras que bloquean. Con * = empieza por (violen* = violento, violencia…)
const BLOQUEADO = [
  // violencia
  'violen*', 'pelea', 'peleas', 'matar', 'mata', 'asesin*', 'sangre', 'gore', 'arma', 'armas', 'pistola*', 'disparo*', 'tiroteo*', 'muerte*', 'muertos', 'tortur*', 'decapit*', 'gta', 'call of duty', 'squid game',
  // apuestas
  'apuesta*', 'apostar', 'casino*', 'ruleta', 'poker', 'tragaperras', 'bet', 'betting', 'cripto*',
  // adultos
  'porno*', 'porn*', 'sexo', 'sexy', 'sexual*', 'desnud*', 'xxx', 'onlyfans', 'hentai', 'erotic*', '18', 'mayores de edad', 'adulto', 'adultos', 'tetas', 'nudes',
  // inglés (títulos de imágenes públicas)
  'gun', 'guns', 'weapon*', 'rifle*', 'nude*', 'naked', 'nudity', 'topless', 'erotic*', 'blood*', 'corpse*', 'dead body', 'murder*', 'casino', 'gambling', 'beer', 'whisky', 'cigarette*', 'cannabis', 'bikini', 'lingerie', 'sex*',
  // drogas y alcohol
  'droga*', 'porro*', 'marihuana', 'cocaina', 'alcohol', 'borrach*', 'emborrach*', 'fumar', 'vape*', 'vapear', 'cerveza*', 'chupito*'
];
const INSULTOS = ['joder', 'jodido', 'mierda', 'puta', 'puto', 'putas', 'gilipollas', 'cabron', 'cabrones', 'cono', 'hostia', 'hostias', 'idiota', 'imbecil', 'subnormal', 'capullo', 'zorra', 'maricon', 'polla', 'cojones', 'estupido', 'pendejo', 'verga', 'mamon', 'hijo de puta', 'me cago', 'follar'];

const normal = t => ' ' + limpiar(t).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
const tiene = (t, w) => w.endsWith('*') ? new RegExp(' ' + w.slice(0, -1)).test(t) : t.includes(' ' + w + ' ');
function filtro(texto) {
  const t = normal(texto);
  if (INSULTOS.some(w => tiene(t, w))) return 'insulto';
  if (BLOQUEADO.some(w => tiene(t, w))) return 'bloqueado';
  return null;
}

// Catálogo revisado por Bro para perfil 13. yt = id del vídeo de YouTube.
// Bro solo enseña vídeos de aquí. Para añadir: nuevo objeto con tema y etiquetas.
const CATALOGO = [
  { yt: 'Uj06FGm8c64', tema: 'Aviones de papel', t: 'Avión «Ballista» fácil que vuela más de 30 m', canal: 'Foldable Flight', et: 'avion aviones papel volar origami plegar' },
  { yt: 'g2_CDlFquIk', tema: 'Aviones de papel', t: 'Avión fácil en 1 minuto que vuela muy lejos', canal: 'Foldable Flight', et: 'avion aviones papel volar origami rapido' },
  { yt: '38ZpBSjxyDo', tema: 'Aviones de papel', t: 'El «Canard», explicado por un récord mundial', canal: 'WIRED', et: 'avion aviones papel volar record ciencia' },
  { yt: 'MygnbvQy02w', tema: 'Ciencia', t: '6 experimentos caseros de ciencia divertida', canal: 'Experimentos caseros', et: 'ciencia experimento experimentos casa quimica fisica' },
  { yt: 'im35y1KAX5M', tema: 'Ciencia', t: '7 experimentos científicos fáciles en casa', canal: 'Experimentos', et: 'ciencia experimento experimentos casa' },
  { yt: 'TV2HHpXGhYE', tema: 'Ciencia', t: '9 experimentos fáciles de ciencia divertida', canal: 'Power Kids', et: 'ciencia experimento experimentos casa' },
  { yt: 'XeNqKUQ7GI4', tema: 'Mates', t: 'Fracciones desde cero: tipos, equivalentes y simplificar', canal: 'Matemáticas', et: 'mates matematicas fracciones fraccion examen simplificar equivalentes deberes' },
  { yt: 'yToVfydlnt0', tema: 'Mates', t: 'Suma y resta de fracciones, súper fácil', canal: 'Matemáticas', et: 'mates matematicas fracciones sumar restar suma resta examen deberes' },
  { yt: 'p42-9wQOrAs', tema: 'Mates', t: 'Las fracciones explicadas con ejemplos', canal: 'Happy Learning', et: 'mates matematicas fracciones fraccion' },
  { yt: 'RwuqaT0gqqE', tema: 'Fútbol', t: '22 ejercicios de fútbol en 12 minutos', canal: 'Entrenamiento fútbol', et: 'futbol ejercicios entrenar entrenamiento balon deporte' },
  { yt: '5yVp6lpjcDQ', tema: 'Fútbol', t: '10 ejercicios de fútbol para entrenar en casa', canal: 'Nacho Trujillo', et: 'futbol ejercicios entrenar casa balon deporte' },
  { yt: 'jIOC_LVejzY', tema: 'Fútbol', t: 'Entrenamiento de regate y velocidad', canal: 'Fútbol base', et: 'futbol regate dribling velocidad entrenar deporte' },
  { yt: 'nuYryhGhj1s', tema: 'Dibujo', t: '30 minutos de dibujos para principiantes', canal: 'Sir Pino', et: 'dibujo dibujar dibujos arte lapiz principiantes' },
  { yt: 'CETGKvK4sR4', tema: 'Dibujo', t: '10 trucos para aprender a dibujar', canal: 'Dibujo', et: 'dibujo dibujar trucos arte' },
  { yt: 'pS7p6FfU4bE', tema: 'Espacio', t: 'El Sistema Solar, planeta a planeta', canal: 'Educativo', et: 'espacio planetas sistema solar universo sol astronomia' },
  { yt: 'ZykXgSqet6A', tema: 'Espacio', t: 'El Sistema Solar y los planetas', canal: 'Happy Learning', et: 'espacio planetas sistema solar universo' },
  { yt: '0AXojPtxL8I', tema: 'Espacio', t: 'El Sistema Solar y la Vía Láctea explicados', canal: 'Educativo', et: 'espacio planetas sistema solar via lactea galaxia' }
];
// Canales aprobados por Laura (whitelist de padres): Julio ve sus vídeos sin pedir permiso
const CANALES = [
  { id: 'animalize', nombre: 'animaLize21', claves: ['animaliz', 'animalice', 'animalais'], videos: [
    { yt: 'RWyw-RaS10U', t: 'Mi nueva MANSIÓN con TIKTOKERS' },
    { yt: '4gLDTcvuFxQ', t: 'Mi nueva casa para grabar TikToks' },
    { yt: 'cEFYIBLhOJk', t: 'TIKTOK ANIMALIZE21 #15' }] },
  { id: 'plex', nombre: 'YoSoyPlex', claves: ['plex', 'yosoyplex', 'soy plex'], videos: [
    { yt: 'DxMOxRpZ8vw', t: 'Un día con las Fuerzas Especiales de España' },
    { yt: 'cyYZ0P3vfgc', t: '¡Hicimos la mejor fiesta del mundo!' },
    { yt: 'UTTIUuMntNU', t: '¿Dónde he estado?' },
    { yt: '3ctRdpBlN5Q', t: 'YoSoyPlex x Jopa – Último beso (vídeo oficial)' }] }
];
function canalDe(texto) { const t = normal(texto); return CANALES.find(c => c.claves.some(k => t.includes(k))); }

// Descartados por Bro: -O1OqlqBFRc (preescolar, no es para 13 años) · azFNMth9WOs (título cebo, promesa imposible)

const PIDE_CONTENIDO = / (video|videos|ponme|pon un|pon una|buscame|busca|contenido|youtube|tutorial|ver algo|quiero ver|quiero aprender|ensename a|imagen|imagenes|foto|fotos|articulo|articulos|informacion sobre|quiero leer) /;
const RELLENO = new Set(['imagen', 'imagenes', 'foto', 'fotos', 'articulo', 'articulos', 'informacion', 'leer', 'dibujos', 'wikipedia', 'quiero', 'ver', 'video', 'videos', 'ponme', 'pon', 'un', 'una', 'unos', 'de', 'del', 'sobre', 'buscame', 'busca', 'bro', 'contenido', 'youtube', 'tutorial', 'algo', 'aprender', 'ensename', 'a', 'el', 'la', 'los', 'las', 'me', 'por', 'favor', 'porfa', 'como', 'hacer', 'se', 'hace', 'que', 'y', 'para', 'con', 'en', 'mas']);
function temaDe(texto) { return normal(texto).trim().split(' ').filter(w => w && !RELLENO.has(w)).join(' '); }

function buscarContenido(db, { texto }) {
  const f = filtro(texto);
  if (f) return { bloqueado: true, texto };
  const cn = canalDe(texto);
  if (cn) {
    const ap = (db.canalesAprobados || []).find(a => a.id === cn.id);
    if (!ap) return { tema: cn.nombre, resultados: [], canalNoAprobado: cn.nombre };
    // Si pide un capítulo concreto, ese primero; si no, los 3-4 del canal
    const pal = temaDe(texto).split(' ').filter(w => w.length > 3 && !cn.claves.some(k => w.includes(k)));
    const vids = cn.videos.map(v => ({ ...v, tema: cn.nombre, canal: cn.nombre, p: pal.filter(w => normal(v.t).includes(w.replace(/e?s$/, ''))).length }))
      .sort((a, b) => b.p - a.p);
    const concreto = vids[0].p > 0;
    return { tema: cn.nombre, resultados: vids, canal: { nombre: cn.nombre, por: ap.por, fecha: ap.fecha }, concreto };
  }
  const tema = temaDe(texto);
  if (!tema) return { tema: '', resultados: [] };
  const pal = tema.split(' ').filter(w => w.length > 2);
  const resultados = CATALOGO.map(v => {
    const txt = normal(v.t + ' ' + v.tema + ' ' + v.et);
    const p = pal.filter(w => txt.includes(' ' + w) || txt.includes(' ' + w.replace(/e?s$/, ''))).length;
    return { ...v, p };
  }).filter(v => v.p > 0).sort((a, b) => b.p - a.p).slice(0, 6);
  return { tema, resultados };
}

// Imágenes y artículos públicos (Wikimedia Commons, Vikidia, Wikipedia): el front busca, Bro filtra aquí
function esAdecuado(db, { textos = [] }) { return { ok: textos.map(t => !filtro(t || '')) }; }
function temaWeb(db, { texto }) { return { bloqueado: !!filtro(texto), tema: temaDe(texto) }; }

function temasContenido() { return [...new Set(CATALOGO.map(v => v.tema))]; }

// ============================================================
// LÍMITES Y DESCANSO: Laura decide; el móvil de Julio los cumple y Aura registra el sueño.
// ============================================================
const aMin = h => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const aHora = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
const durTxt = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ' ' + String(m % 60).padStart(2, '0') + ' min' : ''}`;

function actualizarLimite(db, { k, v }) {
  const L = db.limites;
  if (k === 'pantallaDia') L.pantallaDia = Math.min(300, Math.max(30, v));
  else if (k === 'coleOn') L.cole.on = !!v;
  else if (k === 'coleDesde') L.cole.desde = v;
  else if (k === 'coleHasta') L.cole.hasta = v;
  else if (k === 'descansoDesde') L.descanso.desde = v;
  else if (k === 'descansoHasta') L.descanso.hasta = v;
  else if (k === 'findeOn') L.finde.on = !!v;
  L.actualizado = 'Hoy';
  return {};
}

function dormir(db) {
  db.descanso = { activo: true, desde: db.limites.descanso.desde };
  return { desde: db.descanso.desde, hasta: db.limites.descanso.hasta };
}

function despertar(db) {
  const L = db.limites.descanso, dormido = aMin(L.desde) + 18, fin = aMin(L.hasta);
  const dur = ((fin - dormido) % 1440 + 1440) % 1440;
  const total = durTxt(dur).replace(' min', ' min');
  db.aura.sueno = { ...db.aura.sueno, ayer: db.aura.sueno.total, total, dormir: aHora(dormido), despertar: L.hasta, calidad: dur >= 540 ? 'Muy buena' : dur >= 480 ? 'Buena' : 'Corta' };
  db.aura.suenoSemana = [...db.aura.suenoSemana.slice(1), Math.round(dur / 6) / 10];
  db.descanso = { activo: false, ultima: { total, dormir: aHora(dormido), despertar: L.hasta } };
  return { total, dormir: aHora(dormido), despertar: L.hasta, cumplido: dur >= 480 };
}

// ---------- Controles de la demo (por voz, para Julio y Laura) ----------
const INTENCIONES_DEMO = [
  { palabras: ['cambia a laura', 'pasa a laura', 've a laura', 'vete a laura', 'modo laura', 'vista de laura', 'soy laura', 'modo mama', 'modo madre', 'modo padres', 'cambia a mama', 'pasa a mama', 'bro parent', 'cambia de usuario a laura'], accion: { demo: 'padre' }, di: 'Cambio a Laura.' },
  { palabras: ['cambia a julio', 'pasa a julio', 've a julio', 'vete a julio', 'modo julio', 'vista de julio', 'soy julio', 'modo nino', 'modo hijo', 'vuelve a julio'], accion: { demo: 'nino' }, di: 'Cambio a Julio.' },
  { palabras: ['reinicia', 'reiniciar', 'resetea', 'resetear', 'empezar de cero', 'empieza de cero', 'borra todo', 'desde el principio'], accion: { demo: 'reiniciar' }, di: 'Reinicio la demo.' },
  { palabras: ['flujos', 'ver los flujos', 'ensename los flujos', 'documento de flujos'], accion: { demo: 'flujos' }, di: 'Te enseño los flujos.' },
  { palabras: ['bloquea', 'bloquear', 'bloquealo', 'pantalla de bloqueo', 'apaga la pantalla'], accion: { demo: 'bloquear' }, di: 'Bloqueo el móvil.' }
];

function interpretar(db, { texto, quien = 'nino' }) {
  const d = puntuar(INTENCIONES_DEMO, texto);
  if (d) return { accion: d.accion, di: d.di };
  if (quien !== 'padre' && /tiempo de pantalla|cuanto me queda|cuanto tiempo me queda|mis limites|a que hora (me )?(tengo que|debo) dormir/.test(normal(texto))) {
    const L = db.limites, usado = db.aura.pantalla, queda = Math.max(0, L.pantallaDia - usado);
    return { accion: { responder: true }, di: `Hoy llevas ${durTxt(usado)} de ${durTxt(L.pantallaDia)}. Te quedan ${durTxt(queda)}. El descanso empieza a las ${L.descanso.desde}.` };
  }
  if (quien !== 'padre') {
    const f = filtro(texto);
    if (f === 'insulto') return NO_ADECUADO;
    const h0 = puntuar(INTENCIONES_NINO, texto);
    if (h0 && h0.accion.responder && /entorno/.test(h0.di)) return { accion: h0.accion, di: h0.di };
    if (f) return NO_ADECUADO;
    if (PIDE_CONTENIDO.test(normal(texto)) || canalDe(texto)) return { accion: { pantalla: 'contenido', buscar: texto }, di: '' };
  }
  if (quien === 'padre') {
    const hit = puntuar(INTENCIONES_PADRE, texto);
    return hit ? { accion: hit.accion, di: hit.di } : { accion: null, di: null };
  }
  const hit = puntuar(INTENCIONES_NINO, texto);
  if (hit && hit.accion.flujo === 'mama' && /\b(llama|llamar|llamame|llamala)\b/.test(limpiar(texto))) return { accion: { llamar: 'Mamá' }, di: 'Llamo a mamá.' };
  if (hit && hit.accion.responder) return { accion: hit.accion, di: hit.di }; // lo emocional va primero
  for (const app of db.apps) {
    if (junto(texto).includes(junto(app.nombre))) {
      if (app.estado === 'instalada') return { accion: { pantalla: 'apps', id: app.id, abrir: true }, di: `Abro ${app.nombre}.` };
      return { accion: { flujo: 'app', id: app.id }, di: '' };
    }
  }
  return hit ? { accion: hit.accion, di: hit.di } : { accion: null, di: null };
}

// ---------- Entender la respuesta dentro de un flujo (voz o texto) ----------
// Devuelve la opción que la persona ha querido decir, o null.
const SINONIMOS = [
  [/\b(si|vale|ok|okay|claro|venga|de acuerdo|perfecto|adelante|dale|hazlo|correcto)\b/, ['Sí', 'Vale', 'Enviar', 'Aprobar', 'Seguir', 'Siguiente']],
  [/\b(no|nop|nada|ninguno|mejor no|para nada)\b/, ['No', 'Rechazar', 'Nada']],
  [/\b(envia|enviar|envialo|mandalo|manda|mandar)\b/, ['Enviar']],
  [/\b(cambia|cambiar|otra vez|de nuevo|repite)\b/, ['Cambiar']],
  [/\b(aprueba|apruebalo|aprobar|acepta|aceptar|dejale|que entre)\b/, ['Aprobar', 'Sí']],
  [/\b(rechaza|rechazar|deniega|no le dejo)\b/, ['Rechazar', 'No']],
  [/\b(llama|llamar|llamala|llamada)\b/, ['Llamar']],
  [/\b(aviso|avisa|avisale|mensaje|escribele|dile)\b/, ['Mandar un aviso']],
  [/\b(en persona|hablarlo|hablamos|lo hablamos|cara a cara)\b/, ['Hablarlo en persona']],
  [/\b(quince|15)\b/, ['15 min']], [/\b(treinta|30|media hora)\b/, ['30 min']], [/\b(una hora|1 hora|sesenta|60)\b/, ['1 hora']],
  [/\b(sin limite|lo que quiera|ilimitado)\b/, ['Sin límite']],
  [/\b(ficha|mas info|mas informacion|detalles)\b/, ['Ver ficha completa']],
  [/\b(resenas|reviews|opiniones|otras familias|que dicen)\b/, ['Ver reviews de familias', 'Ver más reviews']],
  [/\b(mas detalle|detalle|explicame|cuentame mas)\b/, ['Más detalle']],
  [/\b(firma|firmar|paga|pagar|pagalo)\b/, ['Firmar y pagar 12 €']],
  [/\b(recuerdaselo|recordar|recordatorio|avisale a julio)\b/, ['Recordárselo a Julio', 'Pedírselo a Julio']],
  [/\b(calendario|agenda)\b/, ['Añadir al calendario']],
  [/\b(luego|mas tarde|despues|otro dia)\b/, ['Más tarde']],
  [/\b(yo solo|solo yo|solo|nadie)\b/, ['Yo solo']],
  [/\b(hoy|ahora)\b/, ['Hoy']], [/\b(semana)\b/, ['Esta semana']], [/\b(mes)\b/, ['Este mes']],
  [/\b(domingo)\b/, ['Recordármelo el domingo']], [/\b(acuerdo|reto)\b/, ['Crear un acuerdo']]
];
const ORDINALES = ['primer', 'segund', 'tercer', 'cuart', 'quint'];
const VACIAS = new Set(['ver', 'quiero', 'hora', 'un', 'una', 'el', 'la', 'los', 'las', 'de', 'del', 'con', 'que', 'y', 'a', 'al', 'en', 'lo', 'le', 'me', 'mi', 'por', 'para', 'es', 'yo']);

function elegirOpcion(db, { texto, opciones = [] }) {
  const ops = opciones.filter(o => !/^Lo (digo|pienso) yo$/.test(o));
  const n = limpiar(texto).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!n) return { opcion: null };
  // 1. Igual o contenida
  let m = ops.find(o => limpiar(o) === n) || ops.find(o => n.includes(limpiar(o).replace(/[^a-z0-9 ]/g, ' ').trim()));
  // 2. Por posición: «la primera», «la segunda»…
  if (!m) ORDINALES.forEach((w, i) => { if (!m && n.includes(w) && ops[i]) m = ops[i]; });
  // 3. Sinónimos concretos (media hora, envíalo, reseñas…). Los genéricos sí/no van al final.
  const concretos = SINONIMOS.slice(2), generales = SINONIMOS.slice(0, 2);
  if (!m) for (const [re, cand] of concretos) { if (re.test(n)) { m = cand.find(c => ops.includes(c)); if (m) break; } }
  // 4. Por palabras en común («con hugo» → «Con Hugo», «planeador» → «Planeador: vuela lejos»)
  if (!m) {
    let max = 0;
    const pal = n.split(' ').filter(w => w.length > 2 && !VACIAS.has(w));
    for (const o of ops) {
      const po = limpiar(o).replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(w => w.length > 2 && !VACIAS.has(w));
      const c = pal.filter(w => po.some(x => x === w || (w.length > 4 && x.startsWith(w.slice(0, 5))))).length;
      if (c > max) { max = c; m = o; }
    }
  }
  // 5. Sí / no genéricos
  if (!m) for (const [re, cand] of generales) { if (re.test(n)) { m = cand.find(c => ops.includes(c)); if (m) break; } }
  return { opcion: m || null };
}

// ============================================================
// FLUJOS GUIADOS
// Cada flujo es una función: recibe las respuestas dadas hasta ahora
// y devuelve la siguiente pregunta o el final ({ fin }).
//   pregunta: { p, opciones, libre?, tarjeta?, ejemplo? }
//   libre: se acepta cualquier respuesta con tus palabras (voz o texto)
//   tarjeta: información extra que el front pinta (ficha, correo, gráfico…)
//   fin(db): aquí, y solo aquí, se guardan los cambios
// ============================================================
const FLUJOS = {

  // ---------- JULIO ----------
  proyecto: {
    titulo: 'Nuevo proyecto', total: 4,
    paso(db, r) {
      const P = [
        { p: '¿Qué idea tienes en mente? Escríbela o dímela con tus palabras.', opciones: ['Un periódico del insti', 'Un robot', 'Lo digo yo'], libre: true, ejemplo: 'Un avión de papel que vuele súper bien' },
        { p: '¿Con quién lo haces?', opciones: ['Yo solo', 'Con Hugo', 'Con Lucía', 'Con una comunidad'] },
        { p: '¿Para cuándo lo quieres?', opciones: ['Hoy', 'Esta semana', 'Este mes'] },
        { p: '¿Qué crees que hay que hacer primero? Te dejo ideas, pero eliges tú.', opciones: ['Hacer un boceto', 'Conseguir materiales', 'Repartir tareas', 'Lo pienso yo'], libre: true }
      ];
      const esAvion = r.length > 0 && limpiar(r[0]).includes('avion');
      if (esAvion) P[3] = { p: '¿Qué es lo primero que quieres hacer?', opciones: [], libre: true, ejemplo: 'Dame vídeos de cómo hacerlo' };
      if (r.length < P.length) return P[r.length];
      if (esAvion) return {
        fin(db) {
          const id = nuevoId();
          const nuevo = proyectoAvion(id, r);
          nuevo.siguiente = nuevo.lista[0].t;
          db.proyectos.unshift(nuevo);
          const videos = limpiar(r[3]).includes('video');
          return { di: videos ? 'Aquí tienes 3 vídeos. Elige el que quieras.' : `Apuntado: «${r[3]}». Es tu primer paso.`, accion: { pantalla: 'proyecto', id }, auto: true };
        }
      };
      return {
        fin(db) {
          db.proyectos.unshift({ id: nuevoId(), titulo: r[0], con: r[1], paso: 1, pasos: 4, siguiente: r[3], para: r[2] });
          return { di: `Listo: «${r[0]}», ${r[1].toLowerCase()}, para ${r[2].toLowerCase()}. Tu primer paso, el que has elegido: ${r[3].toLowerCase()}.`, accion: { pantalla: 'proyectos' }, boton: 'Ver mis proyectos' };
        }
      };
    }
  },

  // Bro AI como project manager: Julio decide todo; Bro pregunta, propone y lo convierte en algo real
  partido: {
    titulo: 'Organizar un partido', total: 8,
    paso(db, r) {
      const tri = r.length > 0 && /triangular|3 equipos|tres equipos/.test(limpiar(r[0]));
      const P = [
        { p: '¿Qué partido quieres montar? Cuéntamelo con tus palabras.', opciones: ['Un triangular de fútbol 7', 'Un partido 5 contra 5', 'Lo digo yo'], libre: true, ejemplo: 'Un triangular de fútbol 7 con los del barrio' },
        { p: '¿Dónde se juega?', opciones: ['Polideportivo El Pradillo', 'Parque de La Colonia', 'Lo digo yo'], libre: true },
        { p: '¿Qué día y a qué hora?', opciones: ['Viernes 13 nov · 18:00', 'Sábado 14 nov · 11:00', 'Lo digo yo'], libre: true },
        tri ? { p: 'En un triangular juegan 3 equipos. ¿Cómo se llaman?', opciones: ['Colonia FC · Pradillo United · Estación FC', 'Lo digo yo'], libre: true }
            : { p: '¿Cómo se llaman los dos equipos?', opciones: ['Colonia FC · Pradillo United', 'Lo digo yo'], libre: true },
        { p: tri ? '¿Quién juega? Necesitas 21 jugadores, 7 por equipo.' : '¿Quién juega?', opciones: ['Invitar a Fútbol La Colonia', 'Solo mis amigos', 'Lo digo yo'], libre: true },
        { p: '¿Qué tiene que traer cada uno?', opciones: ['Botas, agua y camiseta del color de su equipo', 'Lo digo yo'], libre: true },
        { p: 'Último toque creativo: ¿cómo se llama el partido?', opciones: ['Triangular de La Colonia', 'Copa Pradillo', 'Lo digo yo'], libre: true }
      ];
      if (r.length < P.length) return P[r.length];
      const d = datosPartido(r, tri);
      if (r.length === P.length) return {
        p: `Tu partido: «${d.nombre}», ${d.dia} a las ${d.hora} en ${d.lugar}. La pista la tiene que reservar un adulto. Le dejo a papá todo listo: pista, día, hora y precio (${d.precio}). Solo tendrá que pulsar «Reservar». ¿Se lo envío?`,
        opciones: ['Sí, envíaselo a papá', 'Todavía no']
      };
      return {
        fin(db) {
          d.reserva = r[P.length] === 'Sí, envíaselo a papá' ? 'esperando' : 'sin_pedir';
          db.partido = d;
          return { di: d.reserva === 'esperando' ? 'Enviado a papá. Mientras, tu cartel ya está listo para compartir.' : 'Guardado. Cuando quieras, le pido a papá la pista.', accion: { pantalla: 'partido' }, boton: 'Ver mi partido' };
        }
      };
    }
  },

  app: {
    // J2: sin preguntas. Julio dice la app y Bro se la envía a Laura. El tiempo lo decide ella.
    titulo: 'Pedir una app', total: 1,
    paso(db, r, id) {
      let app = db.apps.find(x => x.id === id);
      if (!app && r.length) app = db.apps.find(x => junto(r[0]).includes(junto(x.nombre)));
      if (!app && !r.length) return { p: '¿Qué app quieres?', opciones: db.apps.filter(x => x.estado === 'disponible').map(x => x.nombre), libre: true };
      if (!app) return { fin: () => ({ di: `${r[0]} no está disponible.` }) };
      const tarjeta = { tipo: 'app', nombre: app.nombre, ic: app.ic, color: app.color, que: app.que };
      const fin = di => ({ fin: () => ({ di, tarjeta }) });
      if (app.estado === 'instalada') return { fin: () => ({ di: `${app.nombre} ya la tienes.`, tarjeta, accion: { pantalla: 'apps', id: app.id, abrir: true }, boton: 'Abrirla' }) };
      if (app.estado === 'noApta') return fin(`${app.nombre} no está disponible.`);
      if (app.estado === 'pendiente') return fin(`${app.nombre} ya se la has pedido a Laura. Está pendiente.`);
      if (app.estado === 'persona') return fin(`${app.nombre} la tienes que hablar con mamá en persona.`);
      if (app.estado === 'denegada') return fin(`Laura dijo que no a ${app.nombre}${app.motivo ? ': ' + app.motivo.toLowerCase() : ''}.`);
      return {
        fin(db) {
          pedirApp(db, { id: app.id, detalle: 'Julio la quiere. Tú decides el tiempo de uso.' });
          return { di: `${app.nombre} queda pendiente de aprobación. Laura decide si sí y cuánto tiempo al día.`, tarjeta, accion: { pantalla: 'apps', id: app.id }, auto: true };
        }
      };
    }
  },

  hablar: {
    // J3: Bro no es un amigo ni entra en lo emocional. Respuesta fija y fin.
    titulo: 'Hablar', total: 1,
    paso() {
      return { fin: () => ({ di: 'Eso debes hablarlo con tu entorno más cercano.' }) };
    }
  },

  mama: {
    titulo: 'Mamá', total: 3,
    paso(db, r) {
      if (r.length === 0) return { p: '¿La llamo o le mando un aviso?', opciones: ['Llamar', 'Mandar un aviso'] };
      if (r[0] === 'Llamar') return { fin: () => ({ di: 'Llamo a mamá. No gasta tiempo de pantalla.', accion: { llamar: 'Mamá' }, auto: true }) };
      if (r.length === 1) return { p: '¿Qué le digo?', opciones: ['Llego 15 min tarde', 'Ya estoy en casa', '¿Me recoges?', 'Lo digo yo'], libre: true };
      if (r.length === 2) return { p: `«${r[1]}». ¿Se lo envío?`, opciones: ['Enviar', 'Cambiar'] };
      return {
        fin(db) {
          db.avisos.unshift({ id: nuevoId(), txt: r[1], hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), leido: false });
          return { di: 'Enviado. Mamá lo ve al momento.' };
        }
      };
    }
  },

  permiso: {
    titulo: 'Pedir permiso a Laura', total: 3,
    paso(db, r, id) {
      const P = [
        { p: '¿Cómo vas a ir?', opciones: ['Andando con Hugo', 'Me lleva Laura', 'En bus (línea 23)'] },
        { p: '¿A qué hora vuelves?', opciones: ['13:00', '14:00', 'Cuando diga Laura'] },
        { p: '¿Se lo cuentas tú en persona también?', opciones: ['Sí, luego se lo digo', 'Solo por Bro'] }
      ];
      if (r.length < P.length) return P[r.length];
      return {
        fin(db) {
          const plan = db.planes.find(p => p.id === (id || 'skate'));
          plan.estado = 'pedido';
          plan.detalle = `${r[0]} · vuelve a las ${r[1].toLowerCase()}`;
          db.solicitudes.unshift({ id: nuevoId(), tipo: 'plan', ref: plan.id, titulo: `${plan.titulo} · ${plan.cuando}`, detalle: `${plan.detalle}. Organiza ${plan.organiza}.`, estado: 'pendiente' });
          const extra = r[2].startsWith('Sí') ? ' Mejor así: en persona se entiende todo.' : '';
          return { di: `Enviado a Laura. Te aviso en cuanto decida.${extra}`, accion: { pantalla: 'plan', id: plan.id }, boton: 'Ver el plan' };
        }
      };
    }
  },

  // ---------- LAURA ----------
  decidir: {
    titulo: 'Peticiones de Julio',
    paso(db, r) {
      const pend = db.solicitudes.filter(s => s.estado === 'pendiente' && s.tipo !== 'comunidad');
      if (!pend.length) return { fin: () => ({ di: 'No tienes nada pendiente. Está bien que sea así.' }) };
      const decisiones = [];
      let k = 0;
      for (let i = 0; i < pend.length; i++) {
        const s = pend[i];
        if (k >= r.length) {
          const pre = i === 0 ? (pend.length === 1 ? 'Julio te pide una cosa:' : `Julio te pide ${pend.length} cosas. La primera:`) : 'Hecho. La siguiente:';
          const ops = s.tipo === 'app' ? ['Sí', 'No', 'Hablarlo en persona'] : ['Sí', 'No', 'Sí, con condición', 'Hablarlo en persona'];
          return { p: `${pre} ${s.titulo}.`, tarjeta: { tipo: 'solicitud', etiqueta: TIPO[s.tipo], titulo: s.titulo, detalle: s.detalle }, opciones: ops };
        }
        const a = r[k++];
        if (s.tipo === 'app' && a === 'Sí') {
          if (k >= r.length) return { p: `¿Cuánto tiempo al día puede usar ${s.titulo}?`, opciones: ['15 min', '30 min', '1 hora', 'Sin límite'] };
          decisiones.push({ s, si: true, condicion: r[k++] + ' al día' });
        } else if (s.tipo === 'app' && a === 'No') {
          if (k >= r.length) return { p: '¿Por qué? Julio lo verá.', opciones: ['No es para su edad', 'Ya tiene bastante pantalla', 'Lo digo yo'], libre: true };
          decisiones.push({ s, si: false, motivo: r[k++] });
        } else if (a === 'Sí, con condición') {
          if (k >= r.length) return { p: '¿Qué condición?', opciones: s.tipo === 'app' ? ['Solo 15 min al día', 'Solo fines de semana', 'Lo digo yo'] : ['Que vuelva a las 13:00', 'Que vaya con Hugo', 'Lo digo yo'], libre: true };
          decisiones.push({ s, si: true, condicion: r[k++] });
        } else decisiones.push({ s, si: a === 'Sí', persona: a === 'Hablarlo en persona' });
      }
      return {
        fin(db) {
          const lineas = decisiones.map(d => {
            if (d.persona) {
              d.s.estado = 'persona';
              if (d.s.tipo === 'app') db.apps.find(x => x.id === d.s.ref).estado = 'persona';
              return `${d.s.titulo}: lo habláis en persona`;
            }
            decidir(db, { id: d.s.id, si: d.si, condicion: d.condicion, motivo: d.motivo });
            const extra = d.condicion || d.motivo;
            return `${d.s.titulo}: ${d.si ? 'sí' : 'no'}${extra ? ' (' + extra.toLowerCase() + ')' : ''}`;
          });
          return { di: `Listo. ${lineas.join('. ')}. Julio lo ve en su Bro.` };
        }
      };
    }
  },

  colegio: {
    titulo: 'Correos del colegio',
    paso(db, r) {
      const pend = db.colegio.filter(c => !c.hecho);
      if (!pend.length) return { fin: () => ({ di: 'Del cole no hay nada que hacer. Todo al día.' }) };
      if (r.length < pend.length) {
        const c = pend[r.length];
        const pre = r.length === 0 ? (pend.length === 1 ? 'Hay un correo que pide algo:' : `Hay ${pend.length} correos que piden algo. El primero:`) : 'Siguiente:';
        return { p: `${pre} ${c.asunto}.`, tarjeta: { tipo: 'correo', de: c.de, asunto: c.asunto, resumen: c.resumen }, opciones: c.opciones };
      }
      return {
        fin(db) {
          const hechos = [];
          pend.forEach((c, i) => { if (!['Más tarde', 'Nada'].includes(r[i])) { c.hecho = true; c.resultado = r[i]; hechos.push(r[i].charAt(0).toLowerCase() + r[i].slice(1)); } });
          return { di: hechos.length ? `Listo: ${hechos.join(', ')}. Lo que es para Julio le aparece en su Bro.` : 'Vale, te lo dejo para más tarde.' };
        }
      };
    }
  },

  aura: {
    titulo: 'Aura de Julio',
    paso(db, r) {
      const A = db.aura, sem = A.semana;
      const media = (A.suenoSemana.reduce((x, y) => x + y, 0) / 7).toFixed(1).replace('.', ',');
      const dif = sem.map(([p, m]) => p - m);
      const peor = dif.indexOf(Math.max(...dif)), mejor = dif.indexOf(Math.min(...dif));
      const tarjeta = { tipo: 'tendencia', semana: sem, sueno: A.suenoSemana };
      if (r.length === 0) return { p: `Esta semana duerme bien (${media} h de media). El ${DIAS[peor]} tuvo mucha pantalla y poco movimiento.`, tarjeta, opciones: ['Vale', 'Más detalle'] };
      let i = 1;
      if (r[0] === 'Más detalle') {
        const mp = sem.reduce((x, d) => x + d[0], 0) / 7, mm = sem.reduce((x, d) => x + d[1], 0) / 7;
        if (r.length === 1) return { p: `Pantalla media: ${fmtMin(mp)} al día. Movimiento: ${fmtMin(mm)}. El mejor día fue el ${DIAS[mejor]}, con más movimiento que pantalla.`, opciones: ['Vale'] };
        i = 2;
      }
      if (r.length === i) return { p: 'No hace falta hablar de nada. Si quieres, podéis hacer algo juntos el sábado.', opciones: ['Crear un acuerdo', 'Recordármelo el domingo', 'Nada'] };
      const d = r[i];
      if (d === 'Crear un acuerdo') {
        if (r.length === i + 1) return { p: '¿Qué acuerdo le propones a Julio? Escríbelo como se lo dirías.', opciones: ['Salir en bici el sábado', 'Móvil fuera de la mesa', 'Lo digo yo'], libre: true };
        return { fin(db) { crearAcuerdo(db, { titulo: r[i + 1], meta: 1, premio: 'Lo habláis juntos' }); return { di: `Hecho. Julio verá el acuerdo «${r[i + 1]}».` }; } };
      }
      if (d === 'Recordármelo el domingo') return { fin: () => ({ di: 'Te lo recuerdo el domingo por la mañana.' }) };
      return { fin: () => ({ di: 'Perfecto. Todo en orden.' }) };
    }
  },

  reserva: {
    titulo: 'Reserva de pista',
    paso(db, r) {
      const d = db.partido;
      if (!d || d.reserva !== 'esperando') return { fin: () => ({ di: d && d.reserva === 'reservada' ? `La pista ya está reservada: ${d.lugar}, ${d.dia} a las ${d.hora}.` : 'No hay ninguna reserva pendiente.' }) };
      if (!r.length) return {
        p: `Julio ha organizado «${d.nombre}» y pide que reservéis la pista. Está todo listo: ${d.lugar}, ${d.dia}, de ${d.hora} a ${d.horaFin}. ${d.precio}.`,
        opciones: [`Reservar · ${d.precio}`, 'Ahora no']
      };
      return { fin(db) {
        if (r[0].startsWith('Reservar')) { db.partido.reserva = 'reservada'; return { di: `Reservado. ${d.lugar}, ${d.dia} a las ${d.hora}. Julio ya puede compartir el cartel con su comunidad.` }; }
        return { di: 'Vale. Julio verá que la reserva sigue pendiente.' };
      } };
    }
  },

  canales: {
    titulo: 'Canales aprobados',
    paso(db, r) {
      const cs = db.canalesAprobados || [];
      if (!r.length) return { p: cs.length ? `Julio tiene ${cs.length} canales de YouTube aprobados por ti: ${cs.map(c => c.nombre).join(' y ')}. Los aprobaste el ${cs[0].fecha}. Puede ver sus vídeos dentro de Bro sin pedirte permiso cada vez.` : 'Julio no tiene canales aprobados.', opciones: ['Vale', 'Quitar un canal'] };
      if (r[0] === 'Quitar un canal' && r.length === 1) return { p: '¿Cuál quitas?', opciones: cs.map(c => c.nombre).concat('Ninguno') };
      return { fin(db) {
        if (r[0] === 'Quitar un canal' && r[1] !== 'Ninguno') { db.canalesAprobados = cs.filter(c => c.nombre !== r[1]); return { di: `Hecho. Julio ya no verá ${r[1]} en Bro.` }; }
        return { di: 'Perfecto. Todo sigue igual.' };
      } };
    }
  },

  semana: {
    titulo: 'La semana de Julio',
    paso(db, r) {
      const A = db.aura, media = (A.suenoSemana.reduce((x, y) => x + y, 0) / 7).toFixed(1).replace('.', ',');
      const proy = db.proyectos.length + (db.partido ? 1 : 0);
      const logros = (db.rewards || []).filter(x => x.estado === 'conseguido').length;
      const enMarcha = (db.rewards || []).filter(x => !['propuesta', 'pide_unirse', 'conseguido'].includes(x.estado)).length;
      const tarjeta = { tipo: 'ficha', ic: '🌱', nombre: 'Tendencias de la semana', filas: [
        ['Construye', `${proy} proyecto${proy === 1 ? '' : 's'} en marcha${db.partido ? ', uno con su comunidad' : ''}`],
        ['Aprende', 'Sobre todo mates y ciencia'],
        ['Rewards', `${logros} conseguido${logros === 1 ? '' : 's'} · ${enMarcha} en marcha`],
        ['Comunidad', `Activo en ${db.comunidades.length} comunidades`],
        ['Descanso', `${media} h de sueño de media`]] };
      if (!r.length) return { p: 'Buena semana. Julio está construyendo más de lo que consume. Solo te enseño tendencias, nunca mensajes ni búsquedas.', tarjeta, opciones: ['Mandarle un mensaje', 'Proponerle un reward', 'Vale'] };
      if (r[0] === 'Mandarle un mensaje') return { fin: () => ({ di: 'Vamos con el mensaje.', accion: { flujo: 'mensaje' } }) };
      if (r[0] === 'Proponerle un reward') return { fin: () => ({ di: 'Vamos con el reward.', accion: { flujo: 'proponer' } }) };
      return { fin: () => ({ di: 'Perfecto. Te hago el resumen cada domingo.' }) };
    }
  },

  limites: {
    titulo: 'Límites y horarios',
    paso(db, r) {
      const n = db.nino, med = db.aura.semana.reduce((x, d) => x + d[0], 0) / 7;
      const tarjeta = { tipo: 'ficha', ic: '⏱', nombre: 'Julio, ahora mismo', filas: [['Pantalla', `Máximo ${fmtMin(n.minutosPantalla)} al día`], ['Media real', `${fmtMin(med)} al día esta semana`], ['Descanso', `El móvil se apaga a las ${n.noche}`]] };
      if (!r.length) return { p: `Julio usa de media ${fmtMin(med)} al día, por debajo de su máximo. ¿Quieres cambiar algo?`, tarjeta, opciones: ['Cambiar pantalla', 'Cambiar descanso', 'Está bien así'] };
      if (r[0] === 'Cambiar pantalla') {
        if (r.length === 1) return { p: '¿Cuánto tiempo de pantalla al día?', opciones: ['2 h', '3 h', '4 h'] };
        return { fin(db) { db.nino.minutosPantalla = parseInt(r[1]) * 60; return { di: `Hecho. Máximo ${r[1]} al día. Julio lo verá en su Bro, sin sorpresas.` }; } };
      }
      if (r[0] === 'Cambiar descanso') {
        if (r.length === 1) return { p: '¿A qué hora se apaga el móvil por la noche?', opciones: ['21:30', '22:00', '22:30'] };
        return { fin(db) { db.nino.noche = r[1]; return { di: `Hecho. Descanso desde las ${r[1]}. Julio recibe un aviso 15 minutos antes.` }; } };
      }
      return { fin: () => ({ di: 'Perfecto. Todo sigue igual.' }) };
    }
  },

  proponer: {
    titulo: 'Proponer un reward',
    paso(db, r) {
      if (!r.length) return { p: '¿Qué tiene que conseguir Julio? Escríbelo como se lo dirías.', opciones: ['Leer 2 libros este mes', 'Ordenar su cuarto toda la semana', 'Lo digo yo'], libre: true };
      if (r.length === 1) return { p: '¿Y qué gana si lo consigue? Algo concreto.', opciones: ['Cine el sábado', 'Elegir la cena del viernes', 'Lo digo yo'], libre: true };
      return { fin(db) {
        crearAcuerdo(db, { titulo: r[0], meta: 1, premio: r[1] });
        const rw = db.rewards[0]; rw.de = 'Propuesto por mamá';
        db.recordatorios.push({ id: nuevoId(), k: 'Reward', titulo: `Mamá te propone: ${r[0]}`, detalle: `Si lo consigues: ${r[1]}. Lo tienes en Rewards.` });
        return { di: `Hecho. Julio verá «${r[0]}» con su reward: ${r[1]}. Cuando lo marque, te pido que lo valides.` };
      } };
    }
  },

  mensaje: {
    titulo: 'Mensaje a Julio',
    paso(db, r) {
      if (!r.length) return { p: '¿Qué le digo a Julio?', opciones: ['Estoy orgullosa de ti', '¿A qué hora vuelves?', 'Lo digo yo'], libre: true };
      return { fin(db) {
        db.recordatorios.push({ id: nuevoId(), k: 'Mamá', titulo: r[0], detalle: 'Mensaje de mamá.' });
        return { di: 'Enviado. Le aparece a Julio en su pantalla de inicio.' };
      } };
    }
  },

  calendario: {
    titulo: 'Calendario familiar',
    paso(db, r) {
      const ex = db.colegio.find(c => c.id === 'excursion'), d = db.partido;
      const filas = [];
      if (ex && !ex.hecho) filas.push(['Hoy · 14:00', 'Firmar la excursión al Prado (Julio)']);
      filas.push(['Mañana', 'Examen de mates (Julio)']);
      if (d) filas.push([`${d.dia} · ${d.hora}`, `${d.nombre} (Julio)`]);
      filas.push(['Sábado · 17:00', db.sofia.cumple === 'No' ? 'Sofía en casa' : 'Cumple de Carla (Sofía)']);
      filas.push(['Domingo', 'Cine con papá (reward de Julio)']);
      (db.calendarioExtra || []).forEach(e => filas.push(['Añadido', e]));
      if (!r.length) return { p: 'Esto es lo que tenéis esta semana.', tarjeta: { tipo: 'ficha', ic: '📅', nombre: 'Esta semana', filas }, opciones: ['Vale', 'Añadir algo'] };
      if (r[0] === 'Añadir algo') {
        if (r.length === 1) return { p: '¿Qué añado? Dímelo con el día.', opciones: ['Dentista de Sofía el martes', 'Lo digo yo'], libre: true };
        return { fin(db) { db.calendarioExtra.push(r[1]); return { di: `Añadido: ${r[1]}.` }; } };
      }
      return { fin: () => ({ di: 'Perfecto.' }) };
    }
  },

  sofia: {
    titulo: 'Sofía',
    paso(db, r) {
      if (!r.length) return { p: 'Sofía pregunta si puede ir al cumple de Carla el sábado. Decides tú.', tarjeta: { tipo: 'ficha', ic: '🎈', nombre: 'Cumple de Carla', filas: [['Cuándo', 'Sábado, de 17:00 a 20:00'], ['Dónde', 'Casa de Carla, calle Ríos Rosas'], ['Con quién', '8 niñas de su clase'], ['Recoger', 'A las 20:00']] }, opciones: ['Sí', 'No', 'Lo hablo con ella'] };
      return { fin(db) {
        db.sofia.cumple = r[0];
        return { di: r[0] === 'Sí' ? 'Hecho. Se lo digo a Sofía y lo pongo en el calendario.' : r[0] === 'No' ? 'Vale. Se lo digo a Sofía.' : 'Perfecto. Lo dejo pendiente hasta que lo habléis.' };
      } };
    }
  },

  rewards: {
    titulo: 'Rewards de Julio',
    paso(db, r) {
      const pend = pendientesReward(db);
      if (!pend.length) return { fin: () => ({ di: 'No hay nada que validar. Julio va a su ritmo.' }) };
      if (r.length < pend.length) {
        const x = pend[r.length], pre = r.length ? 'Siguiente: ' : '';
        if (x.unirse) return {
          p: `${pre}Julio quiere unirse al reto de ${x.rw.marca}: «${x.rw.titulo}». Si lo cumple: ${x.rw.outcome}. ${x.rw.vigencia}. Si apruebas, firmas el contrato y la marca se compromete a cumplir.`,
          opciones: ['Aprobar y firmar', 'No']
        };
        return { p: `${pre}Julio dice que ha hecho «${x.c.t}». Es para «${x.rw.titulo}» → ${x.rw.outcome}.`, opciones: ['Validar', 'Todavía no'] };
      }
      return {
        fin(db) {
          const ok = [];
          pend.forEach((x, i) => {
            const rw = db.rewards.find(y => y.id === x.rw.id);
            if (x.unirse) {
              if (r[i] === 'Aprobar y firmar') { rw.estado = 'en_marcha'; rw.contrato = { firmado: 'Hoy', por: 'Mamá' }; ok.push('contrato firmado con ' + rw.marca); }
              else rw.estado = 'propuesta';
            } else { const c = rw.conds[x.i]; c.esperando = false; if (r[i] === 'Validar') { c.hecho = true; ok.push(c.t.charAt(0).toLowerCase() + c.t.slice(1)); } actualizarReward(rw); }
          });
          return { di: ok.length ? `Hecho: ${ok.join(', ')}. Julio lo verá en Rewards.` : 'Vale, lo dejamos pendiente.' };
        }
      };
    }
  },

  comunidad: {
    titulo: 'Comunidad nueva',
    paso(db, r) {
      const s = db.solicitudes.find(x => x.tipo === 'comunidad' && x.estado === 'pendiente');
      if (!s) return { fin: () => ({ di: 'No hay ninguna comunidad esperando tu permiso.' }) };
      const f = db.fichas[s.ref], rev = db.reviews[s.ref] || [];
      const ficha = corta => ({ tipo: 'ficha', nombre: f.nombre, ic: f.ic, filas: corta
        ? [['La dirige', f.dirige], ['Responsable', f.responsable], ['Edades', f.edades]]
        : [['Qué se hace', f.que], ['La dirige', f.dirige], ['Responsable', f.responsable], ['Edades', f.edades], ['Quién entra', f.entra], ['Privacidad', f.privacidad], ['Adultos', f.adultos]] });
      let vistas = 0;
      for (let k = 0; k < r.length; k++) {
        const a = r[k];
        if (k > 0 && r[k - 1] === 'Aprobar') {
          return {
            fin(db) {
              s.estado = 'si'; s.regla = a;
              if (!db.comunidades.some(c => c.id === s.ref)) db.comunidades.push({ id: s.ref, ic: f.ic, nombre: f.nombre, para: f.que, dirige: f.dirige });
              return { di: `Hecho. Julio ya puede entrar en ${f.nombre}. Quedadas: ${a.toLowerCase()}.` };
            }
          };
        }
        if (a === 'Rechazar') return { fin(db) { s.estado = 'no'; return { di: 'Se lo digo a Julio. Mejor contarle en persona por qué.' }; } };
        if (a === 'Ver reviews de familias' || a === 'Ver más reviews') vistas++;
      }
      const ultima = r[r.length - 1];
      if (!r.length) return { p: `Julio quiere unirse a ${f.nombre}.`, tarjeta: ficha(true), opciones: ['Aprobar', 'Ver ficha completa', 'Ver reviews de familias', 'Rechazar'] };
      if (ultima === 'Aprobar') return { p: '¿Y las quedadas físicas?', opciones: ['Pedir permiso cada vez', 'Aprobadas si está la entrenadora'] };
      if (ultima === 'Ver ficha completa') return { p: 'Esta es la ficha completa.', tarjeta: ficha(false), opciones: ['Aprobar', 'Ver reviews de familias', 'Rechazar'] };
      const rv = rev[Math.min(vistas, rev.length) - 1];
      return { p: 'Esto dice otra familia de la comunidad:', tarjeta: { tipo: 'review', de: rv.de, txt: rv.txt }, opciones: vistas < rev.length ? ['Aprobar', 'Ver más reviews', 'Rechazar'] : ['Aprobar', 'Rechazar'] };
    }
  }
};

function flujo(db, { flujo: nombre, id, respuestas = [] }) {
  const f = FLUJOS[nombre];
  if (!f) return { error: 'Flujo desconocido' };
  const r = f.paso(db, respuestas, id);
  if (r.fin) return { titulo: f.titulo, fin: r.fin(db) };
  return {
    titulo: f.titulo, nota: respuestas.length === 0 ? f.nota || null : null,
    pregunta: { p: r.p, opciones: r.opciones || [] }, libre: !!r.libre, tarjeta: r.tarjeta || null, ejemplo: r.ejemplo || null,
    paso: respuestas.length + 1, total: f.total || respuestas.length + 2
  };
}

// ============================================================
// CONSENTIMIENTOS: cada uso de datos, explicado y con Sí / No.
// necesario: sin él no hay cuenta (se explica, no se esconde).
// Cada cambio queda en el registro con fecha y versión del texto.
// ============================================================
const VERSION_CONSENT = '1.0 · oct 2026';
function consentimientosIniciales() {
  const C = (id, grupo, titulo, que, para, quien, cuanto, siNo, extra = {}) => ({ id, grupo, titulo, que, para, quien, cuanto, siNo, estado: null, ...extra });
  return {
    version: VERSION_CONSENT, revisado: null,
    registro: [],
    items: [
      C('cuenta', 'Básico', 'Cuenta de Julio', 'Nombre, fecha de nacimiento, avatar y tu relación con él.', 'Crear su perfil Bro y adaptar todo a su edad (13).', 'Solo Bro. Nunca se vende ni se cede.', 'Mientras la cuenta exista. Se borra en 30 días si la cierras.', 'Sin esto no puede haber cuenta Bro.', { necesario: true }),
      C('ia', 'Bro AI', 'Bro AI por texto', 'Lo que Julio escribe a Bro AI.', 'Entender lo que pide y ayudarle a pensar. Bro AI nunca decide por él.', 'Bro y su proveedor de IA, con contrato que prohíbe entrenar modelos con datos de menores.', 'Las conversaciones se borran a los 30 días.', 'Julio no podrá usar Bro AI.'),
      C('voz', 'Bro AI', 'Bro AI por voz', 'La voz de Julio mientras pulsa el micrófono.', 'Convertir su voz en texto. El audio no se guarda nunca.', 'El sistema de voz de su móvil (Apple). Bro solo recibe el texto.', 'El audio no se guarda. El texto, igual que en Bro AI.', 'Julio solo podrá escribir a Bro AI.'),
      C('aura', 'Salud', 'Aura: sueño y movimiento', 'Horas de sueño, pasos y minutos de pantalla. Son datos de salud.', 'Que Julio vea su descanso y que tú veas tendencias semanales, nunca el detalle.', 'Solo Bro. Ni marcas ni comunidades lo ven jamás.', 'Se guardan 90 días y luego solo queda la media semanal.', 'Aura se apaga y los retos de pasos o sueño no se pueden validar.', { sensible: true }),
      C('comunidades', 'Social', 'Communities y amigos', 'Nombre y avatar visibles para otros Bros de sus comunidades. Mensajes con sus amigos.', 'Conectar con Bros que ha añadido por QR y hacer proyectos juntos.', 'Solo los Bros de sus comunidades. Nunca perfiles públicos ni desconocidos.', 'Mientras esté en la comunidad.', 'Julio no podrá unirse a comunidades ni chatear.'),
      C('contenido', 'Content', 'Filtro de Content', 'Lo que Julio busca en Content.', 'Filtrar lo que no es adecuado para su edad. No se usa para recomendarle ni para publicidad.', 'Solo Bro.', 'Las búsquedas se borran a los 7 días.', 'Content se desactiva.'),
      C('marcas', 'Rewards', 'Rewards de marcas', 'Solo si Julio cumplió el reto (sí o no). Ningún otro dato.', 'Que la marca pueda darle el reward prometido.', 'La marca del contrato que tú firmas. Nunca su nombre, edad ni actividad.', 'Hasta que caduca el contrato.', 'No verá retos de marcas. Los rewards de familia siguen igual.'),
      C('wallet', 'Wallet', 'Tarjeta Bro · Twelve', 'Tus datos como titular y los movimientos de la tarjeta de Julio.', 'Emitir la tarjeta y aplicar la paga y los topes que tú pones.', 'Twelve, entidad de pago regulada.', 'Lo que exige la ley bancaria (hasta 10 años).', 'No habrá tarjeta. Wallet queda sin activar.'),
      C('mejora', 'Opcional', 'Ayudar a mejorar Bro', 'Uso de la app sin nombre ni nada que identifique a Julio.', 'Saber qué funciones sirven y cuáles no.', 'Solo el equipo de Bro.', '12 meses.', 'Nada cambia para Julio.', { opcional: true })
    ]
  };
}
function consentir(db, { id, valor }) {
  const c = db.consentimientos, it = c.items.find(x => x.id === id);
  if (!it) return { error: 'No existe' };
  if (it.necesario && valor === false) return { aviso: 'Sin este permiso no puede haber cuenta. Si quieres, puedes cerrar la cuenta de Julio.' };
  it.estado = valor; it.fecha = 'Hoy';
  c.registro.unshift({ id, titulo: it.titulo, valor, fecha: 'Hoy', version: c.version, por: 'Laura' });
  if (c.items.every(x => x.estado !== null)) c.revisado = 'Hoy';
  return {};
}
function permiso(db, id) { const it = db.consentimientos && db.consentimientos.items.find(x => x.id === id); return !it || it.estado !== false; }
function demoConsentimientos(db) {
  // Para la demo: todo dado salvo "mejora", como si Laura lo hubiera hecho al crear la cuenta
  db.consentimientos.items.forEach(x => { if (x.estado === null) { x.estado = x.id !== 'mejora'; x.fecha = '14 sep'; } });
  db.consentimientos.revisado = '14 sep';
  db.consentimientos.registro = db.consentimientos.items.map(x => ({ id: x.id, titulo: x.titulo, valor: x.estado, fecha: '14 sep', version: db.consentimientos.version, por: 'Laura' }));
}

// ---------- Lo que Bro sugiere a Laura al abrir ----------
function sugerenciasPadre(db) {
  const s = [], J = 'julio';
  const ex = db.colegio.find(c => c.id === 'excursion');
  if (ex && !ex.hecho) s.push({ orden: 1, cuando: 'Hoy · 14:00', txt: 'Firmar la excursión al Prado (12 €)', flujo: 'colegio', hijo: J });
  const n = db.solicitudes.filter(x => x.estado === 'pendiente' && x.tipo !== 'comunidad').length;
  if (n) s.push({ orden: 2, cuando: 'Hoy', txt: n === 1 ? 'Julio te pide una cosa' : `Julio te pide ${n} cosas`, flujo: 'decidir', hijo: J });
  if (db.sofia && !db.sofia.cumple) s.push({ orden: 3, cuando: 'Mañana', txt: 'Sofía pregunta por el cumple del sábado', flujo: 'sofia', hijo: 'sofia' });
  if (db.partido && db.partido.reserva === 'esperando') s.push({ orden: 4, cuando: 'Antes del jueves', txt: 'Reservar la pista del partido', flujo: 'reserva', hijo: J });
  const v = pendientesReward(db).length;
  if (v) s.push({ orden: 5, cuando: 'Esta semana', txt: v === 1 ? 'Validar un reward de Julio' : `Validar ${v} rewards de Julio`, flujo: 'rewards', hijo: J });
  const c = db.solicitudes.find(x => x.tipo === 'comunidad' && x.estado === 'pendiente');
  if (c) s.push({ orden: 6, cuando: 'Esta semana', txt: `Julio quiere unirse a ${c.titulo}`, flujo: 'comunidad', hijo: J });
  return s.sort((a, b) => a.orden - b.orden).map(x => ({ ...x, urgente: true }));
}

// ---------- «Ahora mismo» de Julio (usado por la versión v3) ----------
function ahoraMismo(db) {
  const items = [];
  (db.recordatorios || []).forEach(r => items.push({ k: r.k, titulo: r.titulo, texto: r.detalle, urgente: true, accion: { aviso: `${r.titulo}, ${r.k.toLowerCase()}. ${r.detalle}` } }));
  const chatNuevo = Object.entries(db.chats).find(([, c]) => c.sinLeer);
  if (chatNuevo) items.push({ k: 'Te han escrito', titulo: `${chatNuevo[0]}: «${chatNuevo[1].mensajes.at(-1).txt}»`, texto: 'Toca para responder.', accion: { pantalla: 'chat', id: chatNuevo[0] } });
  for (const p of db.planes) {
    const txt = {
      borrador: ['Te lo proponen', `${p.titulo}, ${p.cuando.toLowerCase()}`, 'Necesita el visto bueno de Laura.'],
      pedido: ['Esperando', 'Laura tiene que decidir el plan del sábado', p.detalle],
      aprobado: ['Pasa pronto', `${p.titulo}: aprobado`, `${p.cuando} · ${p.detalle}`],
      rechazado: ['Laura ha dicho que no', p.titulo, 'Mejor hablarlo con ella en persona.']
    }[p.estado];
    items.push({ k: txt[0], titulo: txt[1], texto: txt[2], accion: { pantalla: 'plan', id: p.id } });
  }
  db.solicitudes.filter(s => s.estado === 'pendiente' && (s.tipo === 'app' || s.tipo === 'monedero')).forEach(s =>
    items.push({ k: 'Esperando', titulo: `Laura decide: ${s.titulo}`, texto: 'Se lo has pedido desde Bro.', accion: { pantalla: s.tipo === 'app' ? 'apps' : 'monedero' } }));
  db.logros.filter(l => l.nuevo).forEach(l =>
    items.push({ k: 'Nuevo acuerdo con Laura', titulo: l.titulo, texto: `Premio: ${l.premio}`, accion: { pantalla: 'logros' } }));
  db.colegio.filter(c => c.hecho && c.id !== 'excursion').forEach(c =>
    items.push({ k: 'Del cole', titulo: c.asunto, texto: 'Lo ha puesto Laura. Bro te lo recuerda.', accion: { pantalla: 'inicio' } }));
  const pr = db.proyectos[0];
  if (pr) items.push({ k: 'Sigue en marcha', titulo: `Proyecto: ${pr.titulo}`, texto: `Te toca: ${pr.siguiente.toLowerCase()}.`, accion: { pantalla: 'proyectos' } });
  // Orden: 1) lo urgente (examen), 2) lo que depende de Julio (proyecto), 3) el resto, 4) lo que depende de mamá
  const orden = it => it.urgente ? 0 : /proyecto/i.test(it.titulo) ? 1 : /Esperando|Laura|mam/i.test(it.k + ' ' + it.titulo) ? 3 : 2;
  items.sort((a, b) => orden(a) - orden(b));
  return items;
}

// ---------- Proyecto interactivo: avión de papel ----------
// yt = id del vídeo de YouTube. Se reproduce con youtube-nocookie, sin recomendaciones.
const VIDEOS_AVION = [
  { id: 'v1', yt: 'Uj06FGm8c64', t: 'Avión «Ballista» fácil que vuela más de 30 m', canal: 'Foldable Flight (en español)', dur: 'Corto' },
  { id: 'v2', yt: 'g2_CDlFquIk', t: 'Avión fácil en 1 minuto que vuela muy lejos', canal: 'Foldable Flight', dur: '1 min' },
  { id: 'v3', yt: '38ZpBSjxyDo', t: 'El «Canard», explicado por un récord mundial', canal: 'WIRED · John Collins', dur: 'Largo' }
];
// Descartados por Bro (no se enseñan a Julio):
// azFNMth9WOs — «vuela 10000 pies»: promesa imposible, título cebo y lleno de hashtags; no es fiable para aprender.
// Cada paso tiene un tipo que el front sabe pintar: normal | videos | prueba | mejora
function proyectoAvion(id, r) {
  return {
    id, tipo: 'avion', siguiente: '', titulo: r[0].charAt(0).toUpperCase() + r[0].slice(1), con: r[1], para: r[2],
    actual: 0, paso: 1, pasos: 3, terminado: false,
    // El primer paso lo elige Julio con sus palabras. Si pide vídeos, se los enseñamos.
    lista: [
      limpiar(r[3]).includes('video') ? { t: 'Ver cómo se hace', tipo: 'videos', hecho: false, dato: '' } : { t: r[3].charAt(0).toUpperCase() + r[3].slice(1), tipo: 'normal', hecho: false, dato: '' },
      { t: 'Hacerlo y probarlo', tipo: 'prueba', hecho: false, dato: '' },
      { t: 'Mejorarlo', tipo: 'mejora', hecho: false, dato: '' }
    ],
    // Vídeos reales de YouTube, revisados por Bro para perfil 13 (ver VIDEOS_AVION)
    videos: VIDEOS_AVION.map(v => ({ ...v, visto: false }))
  };
}

const CONSEJOS = {
  'Vuela recto y lejos': 'Muy bien. Si quieres más distancia, prueba a lanzarlo más suave y un poco hacia arriba.',
  'Cae en picado': 'Prueba a doblar un poco hacia arriba el final de las alas.',
  'Gira hacia un lado': 'Mira si las dos alas son iguales. Si una está más doblada, iguálalas.'
};

function verVideo(db, { id, video }) {
  const p = db.proyectos.find(x => x.id === id);
  const v = p && p.videos.find(x => x.id === video);
  if (v) v.visto = true;
  return {};
}

function avanzarProyecto(db, { id, dato }) {
  const p = db.proyectos.find(x => x.id === id);
  if (!p || p.terminado) return {};
  const paso = p.lista[p.actual];
  paso.hecho = true;
  paso.dato = dato || '';
  if (paso.tipo === 'mejora') paso.consejo = CONSEJOS[dato] || '';
  p.actual++;
  p.terminado = p.actual >= p.lista.length;
  p.paso = Math.min(p.actual + 1, p.pasos);
  p.siguiente = p.terminado ? 'Terminado' : p.lista[p.actual].t;
  return { consejo: paso.consejo || null, terminado: p.terminado };
}

// ---------- Acciones sueltas ----------
const RESPUESTAS = {
  Hugo: ['¡Guay! Nos vemos allí 🛹', 'Jajaja vale', 'Yo llevo la tabla nueva'],
  Lucía: ['Genial, mañana lo probamos', 'Vale!', 'Te mando el esquema luego'],
  Mateo: ['Crack', 'Vale, hablamos', '👍']
};

function enviarMensaje(db, { con, txt }) {
  const c = db.chats[con];
  c.mensajes.push({ de: 'yo', txt });
  const r = RESPUESTAS[con] || ['👍'];
  c.mensajes.push({ de: con, txt: r[c.mensajes.length % r.length] });
  return {};
}

function leerChat(db, { con }) { if (db.chats[con]) db.chats[con].sinLeer = false; return {}; }

function pedirApp(db, { id, detalle }) {
  const app = db.apps.find(a => a.id === id);
  if (!app || app.estado !== 'disponible') return { error: 'No se puede pedir' };
  app.estado = 'pendiente';
  db.solicitudes.unshift({ id: nuevoId(), tipo: 'app', ref: id, titulo: app.nombre, detalle: detalle || `${app.que}. Julio la quiere usar.`, estado: 'pendiente' });
  return { di: `Pedido. Laura decide sobre ${app.nombre}.` };
}

function pedirMonedero(db) {
  if (db.solicitudes.some(s => s.tipo === 'monedero' && s.estado === 'pendiente')) return {};
  db.solicitudes.unshift({ id: nuevoId(), tipo: 'monedero', ref: 'monedero', titulo: 'Activar su tarjeta Bro · Twelve', detalle: 'Para pagar con el móvil en tiendas físicas. Tú pones la paga y el tope por compra. Nunca apuestas, cajas de botín ni suscripciones.', estado: 'pendiente' });
  return { di: 'Se lo he pedido a Laura.' };
}

function decidir(db, { id, si, condicion, motivo }) {
  const s = db.solicitudes.find(x => x.id === id);
  if (!s) return { error: 'No existe' };
  s.estado = si ? 'si' : 'no';
  if (condicion) s.condicion = condicion;
  if (s.tipo === 'plan') db.planes.find(p => p.id === s.ref).estado = si ? 'aprobado' : 'rechazado';
  if (motivo) s.motivo = motivo;
  if (s.tipo === 'app') {
    const app = db.apps.find(a => a.id === s.ref);
    app.estado = si ? 'instalada' : 'denegada';
    app.tiempo = condicion || null;
    app.motivo = motivo || null;
  }
  if (s.tipo === 'monedero' && si) db.monedero = { ...db.monedero, activo: true, saldo: 20, paga: '5 € los domingos', tope: '15 € por compra', movimientos: [{ t: 'Primera paga de mamá', f: 'Hoy', v: 20 }] };
  return {};
}

function sumarLogro(db, { id }) {
  const l = db.logros.find(x => x.id === id);
  if (l && l.progreso < l.meta) l.progreso++;
  if (l) l.nuevo = false;
  return { completado: l && l.progreso >= l.meta };
}

// ============================================================
// REWARDS: sin puntos ni rankings. Resultado concreto + condiciones.
// origen: familia | bro | comunidad | marca | proyecto
// condición: bro (lo marca Julio) · mama (Julio marca, mamá valida)
//            test (prueba con Bro AI) · aura (datos de Aura)
// Marcas: Bro join → mamá/papá aprueba → contrato firmado → la promesa se cumple.
// ============================================================
const WM = f => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + f;
function rewardsIniciales() {
  return [
    { id: 'mates', outcome: 'Pizza el viernes', titulo: 'Aprobar el examen de mates', origen: 'familia', de: 'Mamá', validacion: 'Tú lo marcas, mamá lo valida', conds: [
      { t: 'Repasar fracciones 3 tardes', tipo: 'bro', hecho: true },
      { t: 'Aprobar el examen de mañana', tipo: 'mama', hecho: false }] },
    { id: 'principito', outcome: '1 h extra de consola el sábado', titulo: 'Leer «El principito» esta semana', origen: 'bro', de: 'Propuesto por ti · aceptado por mamá', validacion: 'Prueba: test de Bro AI', conds: [
      { t: 'Terminar el libro', tipo: 'bro', hecho: true },
      { t: 'Pasar el test de Bro AI', tipo: 'test', hecho: false }] },
    { id: 'descanso', outcome: 'Cine con papá el domingo', titulo: 'Descansar bien esta semana', origen: 'familia', de: 'Papá', validacion: 'Prueba: lo valida Aura', conds: [
      { t: 'Dormir 9 h cinco noches', tipo: 'aura', hecho: false, detalle: '4 de 5 noches' }] },
    { id: 'avion', outcome: 'Visita al Museo del Aire para toda la comunidad', titulo: 'Un avión de papel que vuele 15 m', origen: 'comunidad', de: 'Comunidad Aviones de papel', comun: 'Reward común · 4 Bros', validacion: 'Prueba: vídeo del vuelo, lo valida mamá', conds: [
      { t: 'Construir tu avión', tipo: 'bro', hecho: false },
      { t: 'Vuelo de 15 m grabado en vídeo', tipo: 'mama', hecho: false }] },

    { id: 'cdl', origen: 'marca', marca: 'Casa del Libro', logo: 'logo-casadellibro.svg', fondo: '#FFFFFF', acento: '#00866B', estado: 'propuesta',
      titulo: 'Lee 3 libros este mes', outcome: 'Bro discount en tus próximos 3 libros online', vigencia: 'Hasta el 31 de octubre', codigo: 'BRO-CDL-3L27',
      validacion: 'Prueba: un test de Bro AI por libro', conds: [
      { t: 'Libro 1 · test de Bro AI', tipo: 'test', hecho: false },
      { t: 'Libro 2 · test de Bro AI', tipo: 'test', hecho: false },
      { t: 'Libro 3 · test de Bro AI', tipo: 'test', hecho: false }] },
    { id: 'ea', origen: 'marca', marca: 'EA SPORTS FC', logo: 'logo-easportsfc.svg', fondo: '#0B0B0F', acento: '#00E08F', estado: 'propuesta',
      titulo: 'Lee, escribe y dibuja', outcome: 'EA SPORTS FC 27 con Bro discount (lo compran tus padres)', vigencia: 'Hasta el 30 de noviembre', codigo: 'BRO-EAFC-27J',
      validacion: 'Tú lo marcas, mamá lo valida', conds: [
      { t: 'Leer 2 libros (test de Bro AI)', tipo: 'test', hecho: false },
      { t: 'Escribir un relato de 2 páginas', tipo: 'mama', hecho: false },
      { t: 'Dibujar 3 láminas', tipo: 'mama', hecho: false }] },
    { id: 'mcd', origen: 'marca', marca: "McDonald's", logo: 'logo-mcdonalds.svg', fondo: '#DA291C', acento: '#FFC72C', estado: 'propuesta',
      titulo: '40.000 pasos esta semana', outcome: 'Big Mac con Bro discount', vigencia: 'Esta semana · lunes a domingo', codigo: 'BRO-MCD-40K',
      validacion: 'Prueba: lo valida Aura', conds: [
      { t: '40.000 pasos en 7 días', tipo: 'aura', hecho: false, detalle: 'Empieza al firmar' }] },

    { id: 'comic', outcome: 'Salida en bici con mamá', titulo: 'Dibujar un cómic de 4 páginas', origen: 'bro', de: 'Propuesto por ti', estado: 'conseguido', fecha: '12 sep', conds: [] },
    { id: 'cohete', outcome: '', titulo: 'Proyecto Cohete de agua', origen: 'proyecto', de: 'Proyecto', estado: 'conseguido', fecha: '3 sep', conds: [] }
  ];
}

// ---------- Partido: de la idea al cartel ----------
function COMUNIDAD_BARRIO() {
  return { id: 'barrio', ic: '⚽', nombre: 'Fútbol La Colonia', para: 'Los del barrio', dirige: '24 Bros', muro: [
    { de: 'Mateo', txt: '¿Alguien juega esta semana? Tengo balón nuevo.', cuando: 'ayer' }] };
}
function compartirPartido(db) {
  const c = db.comunidades.find(x => x.id === 'barrio'), d = db.partido;
  if (!c || !d) return { error: 'Nada que compartir' };
  c.muro = c.muro || [];
  if (!c.muro.some(m => m.tipo === 'partido')) c.muro.push({ de: 'Julio', tipo: 'partido', txt: '¡Organizo partido! ¿Quién se apunta?', cuando: 'ahora' });
  d.compartido = true;
  return {};
}
function compartirPrivado(db, { con = [] }) {
  const d = db.partido; if (!d) return { error: 'Nada que compartir' };
  con.forEach(n => {
    db.chats[n] = db.chats[n] || { sinLeer: false, mensajes: [] };
    db.chats[n].mensajes.push({ de: 'yo', txt: `Te invito a «${d.nombre}» · ${d.dia} · ${d.hora} · ${d.lugar}. Te paso el cartel.`, partido: true });
  });
  d.enviadoA = [...new Set([...(d.enviadoA || []), ...con])];
  return { enviados: con.length };
}
function respuestaAmigo(db) {
  const c = db.comunidades.find(x => x.id === 'barrio');
  if (c && !c.muro.some(m => m.de === 'Hugo' && m.respuesta)) c.muro.push({ de: 'Hugo', txt: '¡Planazo! Ahí estaré.', cuando: 'ahora', respuesta: true });
  return {};
}

const LUGARES = {
  'polideportivo el pradillo': { nombre: 'Polideportivo El Pradillo', dir: 'Camino de las Huertas · Pozuelo (La Colonia)', lat: 40.4415, lon: -3.8155 },
  'parque de la colonia': { nombre: 'Parque de La Colonia', dir: 'La Colonia · Pozuelo de Alarcón', lat: 40.4435, lon: -3.8122 }
};
const JUGADORES = ['Julio', 'Hugo', 'Lucía', 'Mateo', 'Álex', 'Sara', 'Dani', 'Nico', 'Marta', 'Pablo', 'Iker', 'Leo', 'Noa', 'Bruno', 'Irene', 'Marcos', 'Carla', 'Gael', 'Vega', 'Diego', 'Lola'];
function datosPartido(r, tri) {
  const L = LUGARES[limpiar(r[1])] || { nombre: r[1], dir: 'Pozuelo de Alarcón', lat: 40.4415, lon: -3.8155 };
  const [dia, hora] = r[2].includes('·') ? r[2].split('·').map(x => x.trim()) : [r[2], '18:00'];
  const hh = (hora.match(/(\d{1,2})[:.h]?(\d{2})?/) || []);
  const horaFin = hh[1] ? `${String((+hh[1] + 1) % 24).padStart(2, '0')}:${hh[2] ? String(+hh[2] + 30).padStart(2, '0').replace('60', '30') : '30'}` : '';
  const nombres = r[3].split(/·|,| y /).map(x => x.trim()).filter(Boolean);
  const n = tri ? 3 : 2, por = limpiar(r[0]).includes('5') ? 5 : 7;
  const COL = ['#3068ED', '#E56648', '#82B94F'];
  const equipos = Array.from({ length: n }, (_, i) => ({ nombre: nombres[i] || `Equipo ${i + 1}`, color: COL[i], jugadores: JUGADORES.slice(i * por, i * por + por) }));
  return { idea: r[0], nombre: r[6], formato: tri ? 'Triangular · Fútbol 7' : (por === 5 ? 'Fútbol 5' : 'Fútbol 7'), lugar: L.nombre, dir: L.dir, lat: L.lat, lon: L.lon,
    dia, hora, horaFin, equipos, jugadores: r[4], llevar: r[5].split(/,| y /).map(x => x.trim()).filter(Boolean), precio: '36 € · 1 h 30' };
}

function pedirReserva(db) { if (db.partido && db.partido.reserva === 'sin_pedir') db.partido.reserva = 'esperando'; return {}; }

function actualizarReward(rw) {
  if (['propuesta', 'pide_unirse', 'conseguido'].includes(rw.estado)) return;
  if (rw.conds.length && rw.conds.every(c => c.hecho)) { rw.estado = 'conseguido'; rw.fecha = 'Hoy'; return; }
  rw.estado = rw.conds.some(c => c.esperando && !c.hecho) ? 'por_validar' : 'en_marcha';
}

function pendientesReward(db) {
  const p = [];
  (db.rewards || []).forEach(rw => {
    if (rw.estado === 'pide_unirse') p.push({ rw, unirse: true });
    rw.conds.forEach((c, i) => { if (c.esperando && !c.hecho) p.push({ rw, c, i }); });
  });
  return p;
}

function marcarCondicion(db, { id, i }) {
  const rw = db.rewards.find(x => x.id === id), c = rw && rw.conds[i];
  if (!c || c.hecho) return {};
  if (c.tipo === 'bro') c.hecho = true;
  else if (c.tipo === 'mama') c.esperando = true;
  actualizarReward(rw);
  return { conseguido: rw.estado === 'conseguido', esperando: !!c.esperando, outcome: rw.outcome };
}

// Demo: valida la siguiente condición de prueba (test o Aura)
function aprobarPrueba(db, { id }) {
  const rw = db.rewards.find(x => x.id === id);
  const c = rw && rw.conds.find(x => (x.tipo === 'test' || x.tipo === 'aura') && !x.hecho);
  if (c) c.hecho = true;
  if (rw) actualizarReward(rw);
  return { conseguido: rw && rw.estado === 'conseguido', outcome: rw && rw.outcome };
}

function pedirUnirse(db, { id }) {
  const rw = db.rewards.find(x => x.id === id);
  if (rw && rw.estado === 'propuesta') rw.estado = 'pide_unirse';
  return {};
}

function crearAcuerdo(db, { titulo, meta, premio }) {
  if (!titulo) return { error: 'Falta el acuerdo' };
  (db.rewards = db.rewards || []).unshift({ id: nuevoId(), outcome: premio || 'Lo habláis juntos', titulo, origen: 'familia', de: 'Mamá', validacion: 'Tú lo marcas, mamá lo valida', nuevo: true, conds: [{ t: titulo, tipo: 'mama', hecho: false }] });
  db.logros.unshift({ id: nuevoId(), titulo, progreso: 0, meta: Math.max(1, +meta || 1), premio: premio || 'Lo habláis juntos', de: 'Laura', nuevo: true });
  return {};
}

function marcarColegio(db, { id }) { const c = db.colegio.find(x => x.id === id); if (c) c.hecho = true; return {}; }
function leerAvisos(db) { db.avisos.forEach(a => (a.leido = true)); return {}; }

// ============================================================
// LEARNING MODE: Bro no hace los deberes. Da contenido propio para elegir,
// pregunta y corrige faltas. Nunca da contenido del libro de texto.
// ============================================================
const TEMAS_APRENDER = {
  paleolitico: { tema: 'El Paleolítico', claves: ['paleolitic', 'prehistoria', 'cavernicol', 'edad de piedra'], tarjetas: [
    { id: 'que', t: '¿Qué fue el Paleolítico?', txt: 'La etapa más larga de la historia humana: desde hace unos 2,5 millones de años hasta hace unos 10.000. Su nombre significa «piedra antigua».', q: '¿Cómo le explicarías a tu clase qué fue el Paleolítico?' },
    { id: 'nomadas', t: 'Nómadas', txt: 'No tenían casa fija. Se movían siguiendo a los animales y las estaciones, y vivían en cuevas, abrigos de roca o cabañas de ramas y pieles.', q: '¿Por qué crees que no se quedaban siempre en el mismo sitio?' },
    { id: 'caza', t: 'Cazadores y recolectores', txt: 'Comían lo que cazaban, pescaban y recogían: frutos, raíces, semillas y marisco. Todavía no existían la agricultura ni la ganadería.', q: '¿Cómo conseguían la comida? Cuéntalo con tus palabras.' },
    { id: 'herramientas', t: 'Herramientas de piedra', txt: 'Golpeaban piedras como el sílex para conseguir filos. Del canto tallado pasaron al bifaz y, más tarde, a puntas, raspadores y arpones de hueso.', q: '¿Qué herramienta te parece más útil y para qué la usaban?' },
    { id: 'fuego', t: 'El fuego', txt: 'Dominarlo lo cambió todo: daba calor y luz, protegía de los animales y permitía cocinar. Hay pruebas de su uso de hace cientos de miles de años.', q: '¿Por qué crees que el fuego fue tan importante?' },
    { id: 'arte', t: 'Arte rupestre', txt: 'Pintaban animales como bisontes, caballos y ciervos en las paredes de las cuevas, con pigmentos de minerales y carbón. La cueva de Altamira (Cantabria) es la más famosa.', q: '¿Qué pintaban y por qué crees que lo hacían?' },
    { id: 'atapuerca', t: 'Atapuerca', txt: 'Yacimiento de Burgos donde se han encontrado algunos de los restos humanos más antiguos de Europa, de más de un millón de años. Es Patrimonio de la Humanidad.', q: '¿Qué se ha descubierto en Atapuerca y por qué es especial?' },
    { id: 'especies', t: 'Especies humanas', txt: 'En el Paleolítico vivieron varias especies humanas, como el Homo erectus, los neandertales y el Homo sapiens, que somos nosotros.', q: '¿Qué especies humanas vivieron entonces?' }
  ] }
};
const LIBRO = / (pagina|paginas|libro|sm|166|167|tema \d+) /;
function temaAprender(db, { texto }) {
  const t = normal(texto);
  if (LIBRO.test(t)) return { libro: true, di: 'No puedo darte contenido de tu libro. Puedes pedirme contenido específico.' };
  const tm = Object.values(TEMAS_APRENDER).find(x => x.claves.some(k => t.includes(k)));
  if (!tm) return { sinTema: true, di: '¿De qué tema es? Dímelo y te doy ideas para elegir.' };
  return { tema: tm.tema, tarjetas: tm.tarjetas, di: `Te dejo ${tm.tarjetas.length} ideas sobre ${tm.tema.toLowerCase()}. Léelas y elige las que quieras contar.` };
}
// Solo faltas: Bro no cambia lo que Julio dice
const FALTAS = { tambien: 'también', despues: 'después', asta: 'hasta', aver: 'a ver', haci: 'así', asi: 'así', xq: 'porque', pq: 'porque', porqe: 'porque', q: 'que', k: 'que', xa: 'para', mas: 'más', havia: 'había', abia: 'había', habia: 'había', hera: 'era', vivian: 'vivían', tenian: 'tenían', comian: 'comían', hacian: 'hacían', cazavan: 'cazaban', pintavan: 'pintaban', usavan: 'usaban', ivan: 'iban', ombre: 'hombre', ombres: 'hombres', umanos: 'humanos', cueba: 'cueva', cuebas: 'cuevas', fuejo: 'fuego', silex: 'sílex', paleolitico: 'Paleolítico', altamira: 'Altamira', atapuerca: 'Atapuerca', burgos: 'Burgos', cantabria: 'Cantabria', europa: 'Europa', neardentales: 'neandertales', neandertal: 'neandertal', herramietas: 'herramientas', animals: 'animales', tambn: 'también', tb: 'también', tmb: 'también', dificil: 'difícil', facil: 'fácil', util: 'útil', utiles: 'útiles', segun: 'según', ademas: 'además', aqui: 'aquí', ahi: 'ahí', alli: 'allí' };
function corregirTexto(db, { texto }) {
  const cambios = [];
  let out = (texto || '').replace(/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+/g, w => {
    const k = w.toLowerCase(), a = FALTAS[k];
    if (!a || a === w) return w;
    const r = w[0] === w[0].toUpperCase() && w.length > 1 ? a.charAt(0).toUpperCase() + a.slice(1) : a;
    cambios.push({ de: w, a: r });
    return r;
  }).replace(/\s+/g, ' ').trim();
  if (out) {
    if (out[0] !== out[0].toUpperCase()) out = out[0].toUpperCase() + out.slice(1);
    if (!/[.!?…]$/.test(out)) out += '.';
  }
  return { texto: out, cambios };
}

// ---------- Puerta de entrada: el front llama por nombre ----------
const RUTAS = { estado: () => ({}), actualizarLimite, dormir, despertar, consentir, esAdecuado, temaWeb, pedirMonedero, temaAprender, corregirTexto, buscarContenido, temasContenido: () => ({ temas: temasContenido() }), interpretar, elegirOpcion, verVideo, avanzarProyecto, flujo, enviarMensaje, leerChat, pedirApp, pedirMonedero, decidir, sumarLogro, crearAcuerdo, marcarCondicion, aprobarPrueba, pedirUnirse, pedirReserva, compartirPartido, compartirPrivado, respuestaAmigo, marcarColegio, leerAvisos };

export function ejecutar(db, ruta, datos = {}) {
  const base = datosIniciales();
  for (const k in base) if (!(k in db)) db[k] = base[k]; // datos nuevos para demos ya guardadas
  if (!db.comunidades.some(c => c.id === 'barrio')) db.comunidades.unshift(COMUNIDAD_BARRIO());
  if (!db.apps.some(a => a.id === 'wallet')) { const i = db.apps.findIndex(a => a.id === 'subway'); db.apps.splice(i < 0 ? 0 : i, 0, base.apps.find(a => a.id === 'wallet')); }
  if (!db.monedero.tarjeta) db.monedero.tarjeta = base.monedero.tarjeta;
  if (!db.consentimientos.revisado && !db.consentimientos.registro.length) demoConsentimientos(db);
  const fn = RUTAS[ruta];
  if (!fn) return { error: 'Ruta desconocida: ' + ruta };
  const res = fn(db, datos) || {};
  return { ...res, estado: { ...db, ahora: ahoraMismo(db), sugerenciasPadre: sugerenciasPadre(db) } };
}
