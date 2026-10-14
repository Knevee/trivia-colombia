// Trivia Colombia · js/almacenamiento.js
// Ranking, estadísticas y preferencias en localStorage.
// Todas las lecturas usan try/catch + validación: si el JSON está corrupto,
// se reinicia a valores por defecto sin romper la app.
import { CATEGORIAS } from './preguntas.js';

const CLAVE_RANKING = 'trivia_ranking';
const CLAVE_STATS = 'trivia_stats';
const CLAVE_PREFS = 'trivia_prefs';

const PREFS_DEFECTO = { sonido: true, tema: 'oscuro', nombre: '' };

function leerJSON(clave) {
  try {
    const texto = localStorage.getItem(clave);
    if (texto === null) {
      return undefined;
    }
    return JSON.parse(texto);
  } catch {
    return undefined; // JSON corrupto: se usan los valores por defecto
  }
}

function escribirJSON(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Almacenamiento lleno o no disponible: el juego sigue sin persistencia.
  }
}

function entradaValida(e) {
  return (
    e !== null &&
    typeof e === 'object' &&
    typeof e.nombre === 'string' &&
    typeof e.puntaje === 'number' &&
    typeof e.categoria === 'string' &&
    typeof e.dificultad === 'string' &&
    typeof e.fecha === 'string'
  );
}

// ---------- Ranking (top 10) ----------

// Devuelve el ranking validado y ordenado de mayor a menor puntaje.
export function obtenerRanking() {
  const datos = leerJSON(CLAVE_RANKING);
  if (!Array.isArray(datos)) {
    return [];
  }
  return datos.filter(entradaValida).sort(compararEntradas).slice(0, 10);
}

// Mayor puntaje primero; en empate, la partida más antigua primero.
function compararEntradas(a, b) {
  if (b.puntaje !== a.puntaje) {
    return b.puntaje - a.puntaje;
  }
  return a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0;
}

// Agrega la partida, ordena y conserva el top 10.
// Devuelve la posición (1-based) o null si no entró al top 10.
export function guardarEnRanking(partida) {
  const ranking = obtenerRanking();
  ranking.push({
    nombre: partida.nombre,
    puntaje: partida.puntaje,
    categoria: partida.categoria,
    dificultad: partida.dificultad,
    fecha: partida.fecha
  });
  ranking.sort(compararEntradas);
  const top = ranking.slice(0, 10);
  escribirJSON(CLAVE_RANKING, top);
  const indice = top.findIndex(
    (e) => e.nombre === partida.nombre && e.puntaje === partida.puntaje && e.fecha === partida.fecha
  );
  return indice === -1 ? null : indice + 1;
}

// Borra solo el ranking. Las estadísticas se conservan (ver README).
export function borrarRanking() {
  try {
    localStorage.removeItem(CLAVE_RANKING);
  } catch {
    // Sin almacenamiento: nada que borrar.
  }
}

// ---------- Estadísticas ----------

function statsDefecto() {
  const porCategoria = {};
  Object.keys(CATEGORIAS).forEach((cat) => {
    porCategoria[cat] = { respondidas: 0, aciertos: 0 };
  });
  return { partidas: 0, respondidas: 0, aciertos: 0, mejorPuntaje: 0, mejores: {}, porCategoria };
}

export function obtenerStats() {
  const base = statsDefecto();
  const datos = leerJSON(CLAVE_STATS);
  if (datos === null || typeof datos !== 'object' || Array.isArray(datos)) {
    return base;
  }
  const stats = {
    partidas: Number(datos.partidas) || 0,
    respondidas: Number(datos.respondidas) || 0,
    aciertos: Number(datos.aciertos) || 0,
    mejorPuntaje: Number(datos.mejorPuntaje) || 0,
    mejores: datos.mejores !== null && typeof datos.mejores === 'object' ? datos.mejores : {},
    porCategoria: base.porCategoria
  };
  if (datos.porCategoria !== null && typeof datos.porCategoria === 'object') {
    Object.keys(base.porCategoria).forEach((cat) => {
      const vieja = datos.porCategoria[cat];
      if (vieja !== null && typeof vieja === 'object') {
        stats.porCategoria[cat] = {
          respondidas: Number(vieja.respondidas) || 0,
          aciertos: Number(vieja.aciertos) || 0
        };
      }
    });
  }
  return stats;
}

// Acumula una partida: { aciertos, respondidas, puntaje, categoria, dificultad }.
export function actualizarEstadisticas(partida) {
  const stats = obtenerStats();
  stats.partidas += 1;
  stats.respondidas += partida.respondidas;
  stats.aciertos += partida.aciertos;
  stats.mejorPuntaje = Math.max(stats.mejorPuntaje, partida.puntaje);
  const clave = `${partida.categoria}|${partida.dificultad}`;
  stats.mejores[clave] = Math.max(stats.mejores[clave] || 0, partida.puntaje);
  if (stats.porCategoria[partida.categoria]) {
    stats.porCategoria[partida.categoria].respondidas += partida.respondidas;
    stats.porCategoria[partida.categoria].aciertos += partida.aciertos;
  }
  escribirJSON(CLAVE_STATS, stats);
  return stats;
}

// Mejor puntaje para una combinación categoría + dificultad (0 si no hay partidas).
export function obtenerMejorPuntaje(categoria, dificultad) {
  return obtenerStats().mejores[`${categoria}|${dificultad}`] || 0;
}

// ---------- Preferencias (sonido, tema y nombre; la UI llega en la fase 13) ----------

export function obtenerPrefs() {
  const datos = leerJSON(CLAVE_PREFS);
  if (datos === null || typeof datos !== 'object' || Array.isArray(datos)) {
    return { ...PREFS_DEFECTO };
  }
  return {
    sonido: datos.sonido !== false,
    tema: datos.tema === 'claro' ? 'claro' : 'oscuro',
    nombre: typeof datos.nombre === 'string' ? datos.nombre : ''
  };
}

export function guardarPrefs(prefs) {
  escribirJSON(CLAVE_PREFS, prefs);
}
