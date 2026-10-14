// Trivia Colombia · js/app.js
// Punto de entrada: conecta eventos con juego.js (lógica) y ui.js (DOM).
// No contiene reglas de juego ni pinta directamente (salvo textos simples).
import {
  estado,
  iniciarPartida,
  iniciarTemporizador,
  limpiarTemporizador,
  responder,
  siguientePregunta,
  usarComodin
} from './juego.js';
import {
  mostrarPantalla,
  mostrarPregunta,
  actualizarTiempo,
  mostrarRetroalimentacion,
  mostrarResultado,
  pintarEliminadas,
  pintarComodines,
  pintarRanking,
  pintarStats
} from './ui.js';
import {
  guardarEnRanking,
  actualizarEstadisticas,
  obtenerRanking,
  obtenerStats,
  borrarRanking,
  obtenerMejorPuntaje
} from './almacenamiento.js';

// Selección actual de Configuración (en el HTML: Todas + Medio por defecto).
let categoriaElegida = 'todas';
let dificultadElegida = 'medio';

// Cambia de pantalla limpiando el temporizador si se sale del juego.
// El engranaje de ajustes solo se muestra en Inicio.
function irAPantalla(id) {
  if (id !== 'pantalla-juego') {
    limpiarTemporizador();
  }
  document.getElementById('btn-ajustes').hidden = id !== 'pantalla-inicio';
  mostrarPantalla(id);
}

// Muestra la pregunta y arranca su cuenta regresiva.
function arrancarPregunta() {
  mostrarPregunta();
  iniciarTemporizador(
    (segundos) => actualizarTiempo(segundos),
    () => {
      const resultado = responder(null); // tiempo agotado
      if (resultado) {
        mostrarRetroalimentacion(resultado);
      }
    }
  );
}

// Responde con la opción elegida (clic o teclado). Tras responder, CP-07:
// responder() devuelve null y no ocurre nada.
function alResponder(indice) {
  const resultado = responder(indice);
  if (!resultado) {
    return;
  }
  mostrarRetroalimentacion(resultado);
}

// Avanza o termina la partida al pulsar SIGUIENTE / VER RESULTADO.
function alSiguiente() {
  const siguiente = siguientePregunta();
  if (siguiente) {
    irAPantalla('pantalla-juego');
    arrancarPregunta();
  } else {
    terminarPartida();
  }
}

// Cierra la partida: guarda ranking y estadísticas, muestra el resumen.
function terminarPartida() {
  limpiarTemporizador();
  const partida = {
    nombre: estado.jugador,
    puntaje: estado.puntaje,
    categoria: estado.categoria,
    dificultad: estado.dificultad,
    fecha: new Date().toISOString()
  };
  const posicion = guardarEnRanking(partida); // 1-based o null
  actualizarEstadisticas({
    aciertos: estado.aciertos,
    respondidas: estado.preguntas.length,
    puntaje: estado.puntaje,
    categoria: estado.categoria,
    dificultad: estado.dificultad
  });
  mostrarResultado(posicion);
  refrescarRanking(posicion === null ? -1 : posicion - 1);
  irAPantalla('pantalla-resultado');
}

// Repinta la tabla y las estadísticas con lo guardado.
function refrescarRanking(indiceResaltado = -1) {
  pintarRanking(obtenerRanking(), indiceResaltado);
  pintarStats(obtenerStats());
}

// "Tu mejor puntaje: N" para la combinación elegida (o "Aún sin partidas").
function actualizarMejorPuntaje() {
  const mejor = obtenerMejorPuntaje(categoriaElegida, dificultadElegida);
  document.getElementById('mejor-puntaje').textContent =
    mejor === 0 ? 'Tu mejor puntaje: Aún sin partidas' : `Tu mejor puntaje: ${mejor}`;
}

// CP-01: el nombre es obligatorio (vacío o solo espacios no avanza).
function validarNombre() {
  const campo = document.getElementById('nombre-jugador');
  const error = document.getElementById('error-nombre');
  const nombre = campo.value.trim();
  if (nombre === '') {
    error.hidden = false;
    campo.classList.add('is-error');
    campo.focus();
    return null;
  }
  error.hidden = true;
  campo.classList.remove('is-error');
  return nombre;
}

// Selección de tarjeta de categoría (radiogroup con roving tabindex).
function elegirCategoria(boton) {
  categoriaElegida = boton.dataset.categoria;
  document.querySelectorAll('.tarjeta').forEach((tarjeta) => {
    const activa = tarjeta === boton;
    tarjeta.classList.toggle('is-seleccionada', activa);
    tarjeta.setAttribute('aria-checked', String(activa));
    tarjeta.tabIndex = activa ? 0 : -1;
  });
}

function moverCategoria(direccion) {
  const tarjetas = [...document.querySelectorAll('.tarjeta')];
  const actual = tarjetas.indexOf(document.activeElement);
  const siguiente = (actual + direccion + tarjetas.length) % tarjetas.length;
  tarjetas[siguiente].focus();
  elegirCategoria(tarjetas[siguiente]);
}

// Selección de dificultad (botones con aria-pressed).
function elegirDificultad(boton) {
  dificultadElegida = boton.dataset.dificultad;
  document.querySelectorAll('.grupo-dificultad .btn').forEach((otro) => {
    const activo = otro === boton;
    otro.classList.toggle('is-seleccionado', activo);
    otro.classList.toggle('btn--crema', !activo);
    otro.setAttribute('aria-pressed', String(activo));
  });
}

// Pestañas de Ranking / Estadísticas (clic + flechas).
function elegirPestana(boton) {
  const esRanking = boton.id === 'tab-btn-ranking';
  document.getElementById('tab-btn-ranking').setAttribute('aria-selected', String(esRanking));
  document.getElementById('tab-btn-stats').setAttribute('aria-selected', String(!esRanking));
  document.getElementById('tab-btn-ranking').classList.toggle('btn--crema', !esRanking);
  document.getElementById('tab-btn-stats').classList.toggle('btn--crema', esRanking);
  document.getElementById('tab-btn-ranking').tabIndex = esRanking ? 0 : -1;
  document.getElementById('tab-btn-stats').tabIndex = esRanking ? -1 : 0;
  document.getElementById('tab-ranking').hidden = !esRanking;
  document.getElementById('tab-stats').hidden = esRanking;
}

function iniciar() {
  // --- Inicio ---
  document.getElementById('btn-jugar').addEventListener('click', () => {
    const nombre = validarNombre();
    if (nombre === null) {
      return;
    }
    estado.jugador = nombre;
    actualizarMejorPuntaje();
    irAPantalla('pantalla-config');
  });
  document.getElementById('nombre-jugador').addEventListener('input', (evento) => {
    document.getElementById('error-nombre').hidden = true;
    evento.target.classList.remove('is-error');
  });
  document.getElementById('btn-ir-instrucciones').addEventListener('click', () => irAPantalla('pantalla-instrucciones'));
  document.getElementById('btn-ir-ranking').addEventListener('click', () => {
    refrescarRanking();
    irAPantalla('pantalla-ranking');
  });
  document.getElementById('btn-volver-inicio').addEventListener('click', () => irAPantalla('pantalla-inicio'));

  // --- Ajustes (la lógica de sonido/tema llega en la fase 13) ---
  const ajustes = document.getElementById('modal-ajustes');
  document.getElementById('btn-ajustes').addEventListener('click', () => ajustes.showModal());
  document.getElementById('btn-cerrar-ajustes').addEventListener('click', () => ajustes.close());

  // --- Configuración ---
  document.querySelectorAll('.tarjeta').forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      elegirCategoria(tarjeta);
      actualizarMejorPuntaje();
    });
    tarjeta.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
        evento.preventDefault();
        moverCategoria(1);
      } else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
        evento.preventDefault();
        moverCategoria(-1);
      }
    });
  });
  document.querySelectorAll('.grupo-dificultad .btn').forEach((boton) => {
    boton.addEventListener('click', () => {
      elegirDificultad(boton);
      actualizarMejorPuntaje();
    });
  });
  document.getElementById('btn-comenzar').addEventListener('click', () => {
    iniciarPartida(categoriaElegida, dificultadElegida);
    irAPantalla('pantalla-juego');
    arrancarPregunta();
  });

  // --- Juego ---
  document.getElementById('juego-opciones').addEventListener('click', (evento) => {
    const boton = evento.target.closest('.opcion');
    if (!boton) {
      return;
    }
    alResponder(Number(boton.dataset.indice));
  });
  document.getElementById('comodin-cincuenta').addEventListener('click', () => {
    const uso = usarComodin('cincuenta');
    if (!uso) {
      return;
    }
    pintarEliminadas(uso.eliminadas);
    pintarComodines();
    document.getElementById('juego-puntaje').textContent = `PUNTAJE: ${estado.puntaje}`;
  });
  document.getElementById('comodin-tiempo').addEventListener('click', () => {
    const uso = usarComodin('tiempo');
    if (!uso) {
      return;
    }
    pintarComodines();
    actualizarTiempo(uso.segundos);
    document.getElementById('juego-puntaje').textContent = `PUNTAJE: ${estado.puntaje}`;
  });
  document.getElementById('btn-siguiente').addEventListener('click', alSiguiente);

  // Atajos 1-4 / A-D para responder (Enter en SIGUIENTE ya es nativo).
  document.addEventListener('keydown', (evento) => {
    if (document.getElementById('pantalla-juego').hidden || estado.respondida) {
      return;
    }
    if (evento.target.matches('input, dialog')) {
      return;
    }
    const tecla = evento.key.toUpperCase();
    const mapa = { 1: 0, 2: 1, 3: 2, 4: 3, A: 0, B: 1, C: 2, D: 3 };
    if (tecla in mapa) {
      alResponder(mapa[tecla]);
    }
  });

  // --- Resultado ---
  document.getElementById('btn-revisar').addEventListener('click', () => {
    document.getElementById('dialog-fallos').showModal();
  });
  document.getElementById('btn-cerrar-fallos').addEventListener('click', () => {
    document.getElementById('dialog-fallos').close();
  });
  document.getElementById('btn-jugar-nuevo').addEventListener('click', () => {
    categoriaElegida = estado.categoria;
    dificultadElegida = estado.dificultad;
    iniciarPartida(estado.categoria, estado.dificultad);
    irAPantalla('pantalla-juego');
    arrancarPregunta();
  });
  document.getElementById('btn-ver-ranking').addEventListener('click', () => {
    refrescarRanking();
    irAPantalla('pantalla-ranking');
  });
  document.getElementById('btn-ir-inicio').addEventListener('click', () => irAPantalla('pantalla-inicio'));

  // --- Ranking ---
  document.getElementById('tab-btn-ranking').addEventListener('click', (e) => elegirPestana(e.target));
  document.getElementById('tab-btn-stats').addEventListener('click', (e) => elegirPestana(e.target));
  document.querySelector('.tabs').addEventListener('keydown', (evento) => {
    if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') {
      return;
    }
    evento.preventDefault();
    const otra = document.activeElement.id === 'tab-btn-ranking'
      ? document.getElementById('tab-btn-stats')
      : document.getElementById('tab-btn-ranking');
    otra.focus();
    elegirPestana(otra);
  });
  document.getElementById('btn-borrar').addEventListener('click', () => {
    document.getElementById('dialog-borrar').showModal();
  });
  document.getElementById('btn-confirmar-borrar').addEventListener('click', () => {
    borrarRanking(); // las estadísticas se conservan
    refrescarRanking();
    document.getElementById('dialog-borrar').close();
  });
  document.getElementById('btn-cancelar-borrar').addEventListener('click', () => {
    document.getElementById('dialog-borrar').close();
  });
  document.getElementById('btn-ranking-volver').addEventListener('click', () => irAPantalla('pantalla-inicio'));

  // Estado inicial: Inicio visible con el engranaje.
  document.getElementById('btn-ajustes').hidden = false;
}

iniciar();
