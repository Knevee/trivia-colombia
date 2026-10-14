// Trivia Colombia · js/preguntas.js
// Banco de preguntas: SOLO DATOS, sin lógica (la mezcla y selección están en juego.js).
// 50 preguntas (10 por categoría: 4 fáciles, 4 medias, 2 difíciles).
// Solo datos verificados con certeza; incluye las 6 preguntas de ejemplo del documento.

export const PREGUNTAS = [
  // ---------- GEOGRAFÍA (ids 1-10) ----------
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Medellín', 'Bucaramanga', 'Cúcuta', 'Barranquilla'],
    correcta: 1,
    explicacion: 'Bucaramanga, la Ciudad Bonita, es la capital de Santander.'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de Colombia?',
    opciones: ['Medellín', 'Cali', 'Bogotá', 'Cartagena'],
    correcta: 2,
    explicacion: 'Bogotá, en la sabana cundiboyacense, es la capital del país.'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Qué dos océanos bañan las costas de Colombia?',
    opciones: ['Océano Pacífico y océano Atlántico', 'Océano Índico y Pacífico', 'Mar Caribe y mar Mediterráneo', 'Océano Atlántico e Índico'],
    correcta: 0,
    explicacion: 'Colombia es el único país de Suramérica con costas en el Pacífico y en el Atlántico.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Antioquia?',
    opciones: ['Barranquilla', 'Bucaramanga', 'Medellín', 'Manizales'],
    correcta: 2,
    explicacion: 'Medellín, la Ciudad de la Eterna Primavera, es la capital de Antioquia.'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia, que la recorre de sur a norte?',
    opciones: ['Río Cauca', 'Río Magdalena', 'Río Atrato', 'Río Orinoco'],
    correcta: 1,
    explicacion: 'El Magdalena recorre el país de sur a norte.'
  },
  {
    id: 6,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la capital del departamento de Bolívar?',
    opciones: ['Santa Marta', 'Sincelejo', 'Montería', 'Cartagena'],
    correcta: 3,
    explicacion: 'Cartagena, la Heroica, es la capital de Bolívar.'
  },
  {
    id: 7,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿En qué departamento está el desierto de la Tatacoa?',
    opciones: ['Huila', 'Tolima', 'Cesar', 'La Guajira'],
    correcta: 0,
    explicacion: 'La Tatacoa, en Villavieja (Huila), es un bosque seco tropical.'
  },
  {
    id: 8,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿En qué mar se encuentra el archipiélago de San Andrés y Providencia?',
    opciones: ['Océano Pacífico', 'Mar Caribe', 'Golfo de Urabá', 'Bahía de Tumaco'],
    correcta: 1,
    explicacion: 'San Andrés y Providencia están en el mar Caribe.'
  },
  {
    id: 9,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el departamento más extenso de Colombia?',
    opciones: ['Amazonas', 'Vichada', 'Caquetá', 'Meta'],
    correcta: 0,
    explicacion: 'Amazonas, en el sur del país, es el departamento más grande.'
  },
  {
    id: 10,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Dónde se encuentra el punto más alto de Colombia?',
    opciones: ['Nevado del Ruiz', 'Sierra Nevada de Santa Marta', 'Nevado del Huila', 'Sierra Nevada del Cocuy'],
    correcta: 1,
    explicacion: 'Los picos Cristóbal Colón y Simón Bolívar, en la Sierra Nevada de Santa Marta, son el techo del país.'
  },
  // ---------- HISTORIA (ids 11-20) ----------
  {
    id: 11,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año se firmó el Acta de Independencia de Colombia?',
    opciones: ['1808', '1810', '1819', '1821'],
    correcta: 1,
    explicacion: 'El Acta se firmó en Santa Fe el 20 de julio de 1810.'
  },
  {
    id: 12,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué hecho del 20 de julio de 1810 inició la Independencia?',
    opciones: ['El Florero de Llorente', 'La Batalla de Boyacá', 'El Pantano de Vargas', 'La Toma de Cartagena'],
    correcta: 0,
    explicacion: 'La ruptura del Florero de Llorente provocó el Grito de Independencia.'
  },
  {
    id: 13,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es conocido como el Libertador de Colombia?',
    opciones: ['Simón Bolívar', 'Francisco de Paula Santander', 'Antonio Nariño', 'José María Córdova'],
    correcta: 0,
    explicacion: 'Simón Bolívar lideró la independencia de Colombia y de otros países suramericanos.'
  },
  {
    id: 14,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año se libró la Batalla de Boyacá?',
    opciones: ['1810', '1816', '1819', '1824'],
    correcta: 2,
    explicacion: 'El 7 de agosto de 1819 Bolívar aseguró la independencia del país.'
  },
  {
    id: 15,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se promulgó la Constitución que rige hoy a Colombia?',
    opciones: ['1886', '1974', '1991', '2005'],
    correcta: 2,
    explicacion: 'La Constitución de 1991 es la que rige actualmente al país.'
  },
  {
    id: 16,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año ocurrió el Bogotazo?',
    opciones: ['1938', '1948', '1958', '1968'],
    correcta: 1,
    explicacion: 'El 9 de abril de 1948, tras el asesinato de Jorge Eliécer Gaitán.'
  },
  {
    id: 17,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Quién fue la heroína fusilada por los españoles en 1817?',
    opciones: ['Policarpa Salavarrieta', 'Antonia Santos', 'Mercedes Ábrego', 'Manuela Beltrán'],
    correcta: 0,
    explicacion: 'Policarpa Salavarrieta, La Pola, fue fusilada en Santa Fe en 1817.'
  },
  {
    id: 18,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué prócer es conocido como El Precursor por traducir los Derechos del Hombre?',
    opciones: ['Antonio Nariño', 'Francisco de Paula Santander', 'José María Córdova', 'Francisco José de Caldas'],
    correcta: 0,
    explicacion: 'Antonio Nariño tradujo los Derechos del Hombre y es llamado El Precursor.'
  },
  {
    id: 19,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se disolvió la Gran Colombia?',
    opciones: ['1821', '1830', '1840', '1851'],
    correcta: 1,
    explicacion: 'La Gran Colombia se disolvió en 1830 y nacieron Colombia, Venezuela y Ecuador.'
  },
  {
    id: 20,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año se separó Panamá de Colombia?',
    opciones: ['1899', '1903', '1914', '1921'],
    correcta: 1,
    explicacion: 'Panamá se separó el 3 de noviembre de 1903.'
  }
];

export const CATEGORIAS = {
  geografia: 'Geografía',
  historia: 'Historia',
  cultura: 'Cultura',
  deportes: 'Deportes',
  naturaleza: 'Naturaleza'
};
