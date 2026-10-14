// Trivia Colombia · js/juego.js
// Lógica del juego: preguntas, tiempo, puntaje y comodines.
// REGLA DE ARQUITECTURA: este módulo NO toca el DOM. Solo importa datos
// (preguntas.js) y expone estado + funciones puras. ui.js renderiza, app.js conecta.
import { PREGUNTAS } from './preguntas.js';

// Número de preguntas por partida y segundos por pregunta.
export const TOTAL_PREGUNTAS = 10;
export const SEGUNDOS_POR_PREGUNTA = 20;

// Estado de la partida (§6 de AGENTS.md). Se reinicia en iniciarPartida().
export const estado = {
  jugador: '',
  categoria: 'todas',
  dificultad: 'medio',
  preguntas: [], // 10 preguntas con opciones ya mezcladas y correcta recalculada
  indiceActual: 0,
  aciertos: 0,
  racha: 0,
  puntaje: 0,
  tiempoRestante: SEGUNDOS_POR_PREGUNTA,
  tiempoTotal: 0,
  comodines: { cincuenta: true, tiempo: true },
  respondida: false,
  fallos: [] // { pregunta, elegida (índice o null), correcta }
};

// Mezcla Fisher-Yates. Devuelve una COPIA (no muta el arreglo original ni el banco).
export function mezclar(arreglo) {
  const copia = [...arreglo];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Devuelve una pregunta con sus opciones mezcladas y la correcta recalculada.
// No muta la pregunta original del banco.
function conOpcionesMezcladas(pregunta) {
  const orden = mezclar([0, 1, 2, 3]);
  return {
    ...pregunta,
    opciones: orden.map((indice) => pregunta.opciones[indice]),
    correcta: orden.indexOf(pregunta.correcta)
  };
}

// Filtra el banco, mezcla y devuelve 10 preguntas con opciones mezcladas.
// Si la combinación categoría + dificultad tiene menos de 10, completa con
// otras dificultades de la misma categoría (y con otras categorías si es "Todas").
// Nunca repite preguntas dentro de la misma partida.
export function obtenerPreguntas(categoria, dificultad) {
  const esTodas = categoria === 'todas';
  const base = esTodas ? PREGUNTAS : PREGUNTAS.filter((p) => p.categoria === categoria);

  // 1. Las que cumplen filtros exactos, mezcladas.
  const exactas = mezclar(base.filter((p) => p.dificultad === dificultad));
  const seleccion = [...exactas];

  // 2. Completar con otras dificultades de la misma categoría.
  if (seleccion.length < TOTAL_PREGUNTAS) {
    const otrasDificultades = mezclar(
      base.filter((p) => p.dificultad !== dificultad && !seleccion.includes(p))
    );
    seleccion.push(...otrasDificultades);
  }

  // 3. Si aún faltan (caso "Todas" con banco pequeño), completar con el resto.
  if (seleccion.length < TOTAL_PREGUNTAS) {
    const resto = mezclar(PREGUNTAS.filter((p) => !seleccion.includes(p)));
    seleccion.push(...resto);
  }

  // 4. Tomar 10 y mezclar sus opciones (sin mutar el banco).
  return seleccion.slice(0, TOTAL_PREGUNTAS).map(conOpcionesMezcladas);
}

// Reinicia el estado, obtiene las preguntas y deja lista la primera.
// Devuelve la primera pregunta para que ui.js la muestre (fase 11).
export function iniciarPartida(categoria, dificultad) {
  // El nombre del jugador lo fija app.js en estado.jugador antes de llamar.
  estado.categoria = categoria;
  estado.dificultad = dificultad;
  estado.preguntas = obtenerPreguntas(categoria, dificultad);
  estado.indiceActual = 0;
  estado.aciertos = 0;
  estado.racha = 0;
  estado.puntaje = 0;
  estado.tiempoRestante = SEGUNDOS_POR_PREGUNTA;
  estado.tiempoTotal = 0;
  estado.comodines = { cincuenta: true, tiempo: true };
  estado.respondida = false;
  estado.fallos = [];
  marcaInicio = Date.now(); // respaldo por si se responde sin temporizador
  return estado.preguntas[0];
}

// ---------- Puntaje (§5 de AGENTS.md) ----------

// Multiplicador por dificultad.
export const MULTIPLICADORES = { facil: 1, medio: 1.5, dificil: 2 };

// Función pura con la fórmula (fácil de probar).
// Correcta: base 100 + rapidez (5 por segundo restante, máx. 100)
// + racha 50 (si la racha tras esta respuesta es múltiplo de 3),
// todo multiplicado por la dificultad. Incorrecta o tiempo agotado: 0.
export function calcularPuntos(segundosRestantes, rachaNueva, dificultad) {
  const base = 100;
  const rapidez = Math.min(100, 5 * segundosRestantes);
  const racha = rachaNueva > 0 && rachaNueva % 3 === 0 ? 50 : 0;
  return Math.round((base + rapidez + racha) * MULTIPLICADORES[dificultad]);
}

// ---------- Temporizador ----------
// Usa setInterval de 1 s pero calcula con Date.now() para no desfasarse
// si la pestaña queda en segundo plano. Avisa por callbacks (sin DOM):
// alTick(segundosRestantes) cada segundo, alAgotar() al llegar a 0.
let intervaloId = null;
let marcaFin = 0; // momento (Date.now) en que se agota el tiempo
let marcaInicio = 0; // momento en que empezó la pregunta (para tiempoTotal)

export function iniciarTemporizador(alTick, alAgotar) {
  limpiarTemporizador();
  marcaInicio = Date.now();
  marcaFin = marcaInicio + estado.tiempoRestante * 1000;
  intervaloId = setInterval(() => {
    const restante = Math.max(0, Math.round((marcaFin - Date.now()) / 1000));
    estado.tiempoRestante = restante;
    if (restante <= 0) {
      limpiarTemporizador();
      alAgotar();
    } else {
      alTick(restante);
    }
  }, 1000);
}

// Detiene el intervalo sin intervalos huérfanos. Se llama al responder,
// al cambiar de pantalla y al terminar la partida.
export function limpiarTemporizador() {
  if (intervaloId !== null) {
    clearInterval(intervaloId);
    intervaloId = null;
  }
}

// Suma segundos al tiempo restante (comodín +10s, fase 10).
// Recalcula la marca de fin para que el intervalo siga exacto.
export function agregarTiempo(segundos) {
  estado.tiempoRestante += segundos;
  marcaFin += segundos * 1000;
}

// ---------- Respuesta ----------

// Valida la respuesta, calcula puntos y actualiza la racha.
// indiceOpcion null = tiempo agotado. Si ya se respondió (CP-07),
// no hace nada y devuelve null. Siempre detiene el temporizador.
export function responder(indiceOpcion) {
  if (estado.respondida) {
    return null;
  }
  limpiarTemporizador();
  estado.respondida = true;
  // Segundos empleados en esta pregunta (tiempo real, con o sin +10s).
  estado.tiempoTotal += Math.max(0, Math.round((Date.now() - marcaInicio) / 1000));

  const pregunta = estado.preguntas[estado.indiceActual];
  const acierto = indiceOpcion !== null && indiceOpcion === pregunta.correcta;

  if (!acierto) {
    estado.racha = 0;
    estado.fallos.push({ pregunta, elegida: indiceOpcion, correcta: pregunta.correcta });
    return { acierto: false, puntos: 0, racha: 0 };
  }

  estado.aciertos += 1;
  estado.racha += 1;
  const puntos = calcularPuntos(estado.tiempoRestante, estado.racha, estado.dificultad);
  estado.puntaje += puntos;
  return { acierto: true, puntos, racha: estado.racha };
}

// Avanza a la siguiente pregunta y la devuelve, o null si terminó la partida.
// Reinicia tiempo y bloqueo para la nueva pregunta.
export function siguientePregunta() {
  estado.indiceActual += 1;
  if (estado.indiceActual >= estado.preguntas.length) {
    return null;
  }
  estado.tiempoRestante = SEGUNDOS_POR_PREGUNTA;
  estado.respondida = false;
  return estado.preguntas[estado.indiceActual];
}
