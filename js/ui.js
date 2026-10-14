// Trivia Colombia · js/ui.js
// Renderizado en el DOM. REGLA: no contiene reglas de juego (puntos, racha,
// temporizador); solo lee el estado global de juego.js y pinta. app.js conecta eventos.
// Todo texto de usuario se asigna con textContent (nunca innerHTML).

const LETRAS = ['A', 'B', 'C', 'D'];

const MASCOTAS_FEEDBACK = {
  acierto: { src: 'assets/img/mascota/capibara-celebrando.png', alt: 'Capibara celebrando un acierto' },
  fallo: { src: 'assets/img/mascota/capibara-triste.png', alt: 'Capibara triste por el fallo' },
  tiempo: { src: 'assets/img/mascota/capibara-dormido.png', alt: 'Capibara dormido: se agotó el tiempo' }
};

// Alterna secciones y gestiona foco + anuncio para lectores de pantalla.
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach((seccion) => {
    seccion.hidden = seccion.id !== id;
  });
  const activa = document.getElementById(id);
  const titulo = activa.querySelector('h1, h2');
  if (titulo) {
    titulo.focus({ preventScroll: false });
  }
  const anuncio = document.getElementById('anuncio');
  if (anuncio) {
    anuncio.textContent = activa.getAttribute('aria-label') || '';
  }
}

// Pinta la pregunta actual: encabezado, barras, enunciado y opciones.
// No inicia el temporizador (lo hace app.js con iniciarTemporizador).
function mostrarPregunta() {
  const pregunta = estado.preguntas[estado.indiceActual];
  const numero = estado.indiceActual + 1;

  const etiquetaPregunta = document.getElementById('juego-pregunta');
  etiquetaPregunta.textContent = `PREGUNTA ${numero}/${TOTAL_PREGUNTAS}`;
  document.getElementById('juego-puntaje').textContent = `PUNTAJE: ${estado.puntaje}`;

  const barraProgreso = document.getElementById('barra-progreso');
  barraProgreso.setAttribute('aria-valuenow', String(numero));
  document.getElementById('relleno-progreso').style.width = `${(numero / TOTAL_PREGUNTAS) * 100}%`;

  document.getElementById('juego-enunciado').textContent = pregunta.enunciado;

  // Opciones A-D como botones (las mezcla ya las hizo obtenerPreguntas).
  const contenedor = document.getElementById('juego-opciones');
  contenedor.replaceChildren();
  pregunta.opciones.forEach((texto, indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'opcion';
    boton.dataset.indice = String(indice);
    const letra = document.createElement('span');
    letra.className = 'opcion__letra';
    letra.textContent = LETRAS[indice];
    const etiqueta = document.createElement('span');
    etiqueta.textContent = texto;
    boton.append(letra, etiqueta);
    boton.setAttribute('aria-label', `Opción ${LETRAS[indice]}: ${texto}`);
    contenedor.append(boton);
  });

  pintarRacha();
  pintarComodines();
  actualizarTiempo(estado.tiempoRestante);
  document.getElementById('retroalimentacion').hidden = true;
}

// Actualiza chip y barra de tiempo cada segundo (la llama app.js).
// El anuncio para lectores se actualiza cada 5 s para no saturarlos.
function actualizarTiempo(segundos) {
  const chip = document.getElementById('juego-tiempo');
  chip.textContent = `${segundos}s`;
  chip.classList.toggle('is-bajo', segundos < 6);
  const barra = document.getElementById('barra-tiempo');
  barra.classList.toggle('is-baja', segundos < 6);
  document.getElementById('relleno-tiempo').style.width = `${Math.min(100, (segundos / SEGUNDOS_POR_PREGUNTA) * 100)}%`;
  if (segundos % 5 === 0 || segundos < 6) {
    const anuncio = document.getElementById('tiempo-anuncio');
    if (anuncio) {
      anuncio.textContent = `Quedan ${segundos} segundos`;
    }
  }
}

// Barra "RACHA n/3": muestra racha % 3 (o 3 al completarla).
function pintarRacha() {
  const n = estado.racha === 0 ? 0 : estado.racha % 3 === 0 ? 3 : estado.racha % 3;
  document.getElementById('racha').textContent = `RACHA ${n}/3 🔥`;
}

// Deshabilita el botón del comodín ya usado.
function pintarComodines() {
  document.getElementById('comodin-cincuenta').disabled = !estado.comodines.cincuenta;
  document.getElementById('comodin-tiempo').disabled = !estado.comodines.tiempo;
}

// Marca las opciones eliminadas por el 50/50 (conservan el espacio).
function pintarEliminadas(indices) {
  const botones = document.getElementById('juego-opciones').children;
  indices.forEach((i) => botones[i].classList.add('is-eliminada'));
}

// Estados 5A/5B/5C: bloquea opciones, pinta correcta/incorrecta,
// muestra explicación + mascota y el botón SIGUIENTE (o VER RESULTADO).
function mostrarRetroalimentacion(resultado) {
  const pregunta = estado.preguntas[estado.indiceActual];
  const fallo = estado.fallos[estado.fallos.length - 1];
  const elegida = fallo ? fallo.elegida : null;
  const botones = document.getElementById('juego-opciones').children;

  for (const boton of botones) {
    boton.classList.add('bloqueada');
    boton.disabled = true;
  }
  botones[pregunta.correcta].classList.add('is-correcta');

  const panel = document.getElementById('panel-feedback');
  panel.classList.remove('panel--exito');
  const mascota = document.getElementById('mascota-feedback');

  if (resultado.acierto) {
    // 5A Acierto.
    botones[pregunta.correcta].classList.remove('bloqueada');
    panel.classList.add('panel--exito');
    panel.replaceChildren();
    const titulo = document.createElement('strong');
    titulo.textContent = `¡CORRECTO! +${resultado.puntos} PTS`;
    const explicacion = document.createElement('p');
    explicacion.textContent = pregunta.explicacion;
    panel.append(titulo, explicacion);
    fijarMascota(mascota, MASCOTAS_FEEDBACK.acierto);
  } else if (elegida === null) {
    // 5C Tiempo agotado: ninguna en rojo, barra vacía en rojo.
    actualizarTiempo(0);
    panel.replaceChildren();
    const titulo = document.createElement('strong');
    titulo.textContent = '¡TIEMPO AGOTADO! 0 PTS';
    const explicacion = document.createElement('p');
    explicacion.textContent = pregunta.explicacion;
    panel.append(titulo, explicacion);
    fijarMascota(mascota, MASCOTAS_FEEDBACK.tiempo);
  } else {
    // 5B Fallo.
    botones[elegida].classList.add('is-incorrecta');
    panel.replaceChildren();
    const titulo = document.createElement('strong');
    titulo.textContent = 'INCORRECTO: 0 PTS';
    const explicacion = document.createElement('p');
    explicacion.textContent = pregunta.explicacion;
    panel.append(titulo, explicacion);
    fijarMascota(mascota, MASCOTAS_FEEDBACK.fallo);
  }

  pintarComodines();
  document.getElementById('comodin-cincuenta').disabled = true;
  document.getElementById('comodin-tiempo').disabled = true;

  const esUltima = estado.indiceActual === estado.preguntas.length - 1;
  const siguiente = document.getElementById('btn-siguiente');
  siguiente.textContent = esUltima ? 'VER RESULTADO' : 'SIGUIENTE';
  document.getElementById('retroalimentacion').hidden = false;
  siguiente.focus();
}

// Cambia la mascota del feedback (el respaldo con emoji está en el HTML).
function fijarMascota(img, datos) {
  const respaldo = img.nextElementSibling;
  img.hidden = false;
  if (respaldo) {
    respaldo.hidden = true;
  }
  img.alt = datos.alt;
  img.src = datos.src;
}

// Pinta el resumen final. posicion es 1-based o null si no entró al top 10.
// El récord solo se muestra si es posición #1.
function mostrarResultado(posicion = null) {
  const pos = posicion ?? '—';
  document.getElementById('resultado-puntos').textContent = String(estado.puntaje);
  document.getElementById('resultado-aciertos').textContent = `${estado.aciertos}/${estado.preguntas.length}`;
  document.getElementById('resultado-tiempo').textContent = formatearTiempo(estado.tiempoTotal);
  document.getElementById('resultado-posicion').textContent = pos === '—' ? '—' : `#${pos}`;
  document.getElementById('etiqueta-record').hidden = pos !== 1;
  document.getElementById('mensaje-desempeno').textContent = mensajeDesempeno(estado.aciertos);

  const perfecta = estado.fallos.length === 0;
  document.getElementById('partida-perfecta').hidden = !perfecta;
  document.getElementById('btn-revisar').hidden = perfecta;
  if (!perfecta) {
    pintarFallos();
  }
  generarConfeti();
}

// Confeti de celebración: cuadrados con colores de la bandera + verde y crema,
// repartidos al azar (posición y retardo). Es decorativo (aria-hidden en el HTML).
const COLORES_CONFETI = ['#FCD116', '#003893', '#CE1126', '#2E9E5B', '#FFF3D6'];

function generarConfeti() {
  const contenedor = document.getElementById('confeti');
  if (!contenedor) {
    return;
  }
  contenedor.replaceChildren();
  for (let i = 0; i < 24; i++) {
    const pieza = document.createElement('span');
    pieza.className = 'confeti__pieza';
    pieza.style.left = `${Math.floor(Math.random() * 100)}%`;
    pieza.style.background = COLORES_CONFETI[i % COLORES_CONFETI.length];
    pieza.style.animationDelay = `${(Math.random() * 2.8).toFixed(2)}s`;
    contenedor.append(pieza);
  }
}

// m:ss con la suma de los segundos empleados.
function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${minutos}:${String(resto).padStart(2, '0')}`;
}

function mensajeDesempeno(aciertos) {
  if (aciertos >= 9) {
    return '¡EXCELENTE!';
  }
  if (aciertos >= 7) {
    return '¡MUY BIEN!';
  }
  if (aciertos >= 5) {
    return '¡BUEN INTENTO!';
  }
  return '¡SIGUE PRACTICANDO!';
}

// Llena el dialog de revisión con enunciado, tu respuesta y la correcta.
function pintarFallos() {
  const lista = document.getElementById('lista-fallos');
  lista.replaceChildren();
  estado.fallos.forEach((fallo) => {
    const caja = document.createElement('div');
    caja.className = 'fallo';
    const enunciado = document.createElement('p');
    const fuerte = document.createElement('strong');
    fuerte.textContent = fallo.pregunta.enunciado;
    enunciado.append(fuerte);
    const tuya = document.createElement('p');
    tuya.textContent = `Tu respuesta: ${fallo.elegida === null ? 'Sin responder' : fallo.pregunta.opciones[fallo.elegida]}`;
    const correcta = document.createElement('p');
    correcta.className = 'fallo-correcta';
    correcta.textContent = `Correcta: ${fallo.pregunta.opciones[fallo.correcta]}`;
    const explicacion = document.createElement('p');
    explicacion.textContent = fallo.pregunta.explicacion;
    caja.append(enunciado, tuya, correcta, explicacion);
    lista.append(caja);
  });
}

// Pinta el top 10 (fecha en formato dd/mm/aaaa). Resalta en amarillo
// la fila indicada (la partida recién jugada) con .is-actual.
function pintarRanking(ranking, indiceResaltado = -1) {
  const cuerpo = document.getElementById('ranking-cuerpo');
  cuerpo.replaceChildren();
  ranking.forEach((entrada, i) => {
    const fila = document.createElement('tr');
    if (i === indiceResaltado) {
      fila.classList.add('is-actual');
    }
    const celdas = [
      String(i + 1),
      entrada.nombre,
      String(entrada.puntaje),
      CATEGORIAS[entrada.categoria] ?? entrada.categoria,
      formatearFecha(entrada.fecha)
    ];
    celdas.forEach((texto) => {
      const celda = document.createElement('td');
      celda.textContent = texto;
      fila.append(celda);
    });
    cuerpo.append(fila);
  });
  document.getElementById('ranking-vacio').hidden = ranking.length > 0;
}

function formatearFecha(iso) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) {
    return '—';
  }
  const dia = String(fecha.getUTCDate()).padStart(2, '0');
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${fecha.getUTCFullYear()}`;
}

// Pinta las cuatro cajas de estadísticas. Sin datos muestra "—".
function pintarStats(stats) {
  document.getElementById('stats-partidas').textContent = String(stats.partidas);
  document.getElementById('stats-aciertos').textContent =
    stats.respondidas === 0 ? '—' : `${Math.round((stats.aciertos / stats.respondidas) * 100)}%`;
  document.getElementById('stats-mejor').textContent =
    stats.mejorPuntaje === 0 ? '—' : String(stats.mejorPuntaje);
  let mejorCategoria = null;
  let mejorPorcentaje = -1;
  Object.entries(stats.porCategoria).forEach(([categoria, datos]) => {
    if (datos.respondidas > 0) {
      const porcentaje = datos.aciertos / datos.respondidas;
      if (porcentaje > mejorPorcentaje) {
        mejorPorcentaje = porcentaje;
        mejorCategoria = categoria;
      }
    }
  });
  document.getElementById('stats-categoria').textContent =
    mejorCategoria === null ? '—' : CATEGORIAS[mejorCategoria];
}
