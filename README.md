# Trivia Colombia

Juego web de preguntas sobre Colombia (UDES, Desarrollo Full Stack). El jugador escribe su nombre, elige categoría y dificultad, responde 10 preguntas con 20 segundos cada una, usa comodines y guarda su puntaje en el ranking local. Estilo pixel art retro de 16 bits.

## Tecnologías

HTML5, CSS3 y JavaScript vanilla con scripts clásicos (sin módulos ES, para que funcione también con doble clic). Sin frameworks, sin npm, sin bundlers, sin TypeScript, sin librerías de UI (salvo Google Fonts). Sin servidor: todo corre en el navegador y la persistencia usa `localStorage`.

> **Decisión documentada:** el AGENTS.md pedía módulos ES, pero estos no cargan con `file://` (el navegador los bloquea por CORS) y el juego quedaba muerto al abrirlo con doble clic. Se usan scripts clásicos en orden de dependencia (`preguntas → juego → almacenamiento → ui → app`), manteniendo la separación datos/lógica/UI y la estructura de archivos.

## Cómo ejecutarlo localmente

Funciona con **doble clic en `index.html`** y también con servidor local:

- **Opción 1 — doble clic:** abre `index.html` en Chrome, Firefox, Edge o Safari.
- **Opción 2 — Live Server (VS Code):** extensión Live Server, clic derecho en `index.html` → "Open with Live Server".
- **Opción 3 — npx serve:** en la raíz ejecuta `npx serve .` y abre la URL indicada.

## Estructura del proyecto

```
├── index.html                  # Estructura de todas las pantallas
├── css/
│   ├── styles.css              # Variables, base, componentes, pantallas
│   └── responsive.css          # Media queries (360 px, tableta, escritorio)
├── js/
│   ├── app.js                  # Punto de entrada y navegación
│   ├── juego.js                # Lógica: preguntas, tiempo, puntaje (sin DOM)
│   ├── preguntas.js            # Banco de preguntas (solo datos)
│   ├── ui.js                   # Renderizado en el DOM (sin reglas de juego)
│   └── almacenamiento.js       # Ranking y estadísticas (localStorage)
├── assets/
│   ├── img/categorias/         # Íconos de las 6 tarjetas
│   ├── img/mascota/            # Oso de anteojos y capibara
│   └── sonidos/                # (Vacía: los efectos se generan con Web Audio API)
├── docs/
│   ├── diseno/                 # Referencia visual de las 10 pantallas
│   └── referencia/             # Enunciado del parcial (PDF)
└── README.md
```

## Reglas de puntaje

Respuesta correcta: `base 100 + rapidez (+5 por segundo restante, máx. +100) + racha (+50 si la racha queda en múltiplo de 3)`, todo multiplicado por la dificultad (Fácil x1, Medio x1.5, Difícil x2, con `Math.round`). Incorrecta o tiempo agotado: 0 puntos y la racha vuelve a 0.

**Decisiones de interpretación:** el multiplicador aplica a base + rapidez + racha; el −30 de cada comodín se resta aparte del total; el total nunca baja de 0; `segundosRestantes` es el entero mostrado al responder (con +10s puede pasar de 20, pero el tope de +100 lo limita). Ejemplo: correcta con 12 s en Fácil → 100 + 60 = **160**.

**Nota sobre el borrado:** BORRAR RANKING elimina `trivia_ranking`, pero las estadísticas (`trivia_stats`) se conservan.

## Capturas

Ver `docs/diseno/diseno-final.png` (referencia de las 10 pantallas).

## Enlaces

- Diseño (Figma/MockFlow): PENDIENTE
- Despliegue (Vercel): PENDIENTE
- Video explicativo: PENDIENTE

## Estudiante

[completar]
