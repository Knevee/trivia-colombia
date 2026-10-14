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
// El temporizador, la respuesta y el puntaje llegan en las fases 9 y 10.
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
  return estado.preguntas[0];
}
