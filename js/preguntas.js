// Trivia Colombia · js/preguntas.js
// Banco de preguntas: SOLO DATOS, sin lógica (la mezcla y selección están en juego.js).
// 50 preguntas (10 por categoría: 4 fáciles, 4 medias, 2 difíciles).
// Solo datos verificados con certeza; incluye las 6 preguntas de ejemplo del documento.

const PREGUNTAS = [
  // ---------- GEOGRAFÍA (ids 1-10) ----------
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Medellín', 'Cúcuta', 'Bucaramanga', 'Barranquilla'],
    correcta: 2,
    explicacion: 'Bucaramanga, la Ciudad Bonita, es la capital de Santander.'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de Colombia?',
    opciones: ['Medellín', 'Cali', 'Cartagena', 'Bogotá'],
    correcta: 3,
    explicacion: 'Bogotá, en la sabana cundiboyacense, es la capital del país.'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Qué dos océanos bañan las costas de Colombia?',
    opciones: ['Océano Índico y Pacífico', 'Mar Caribe y mar Mediterráneo', 'Océano Pacífico y océano Atlántico', 'Océano Atlántico e Índico'],
    correcta: 2,
    explicacion: 'Colombia es el único país de Suramérica con costas en el Pacífico y en el Atlántico.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Antioquia?',
    opciones: ['Barranquilla', 'Bucaramanga', 'Manizales', 'Medellín'],
    correcta: 3,
    explicacion: 'Medellín, la Ciudad de la Eterna Primavera, es la capital de Antioquia.'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia, que la recorre de sur a norte?',
    opciones: ['Río Magdalena', 'Río Cauca', 'Río Atrato', 'Río Orinoco'],
    correcta: 0,
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
    opciones: ['Tolima', 'Cesar', 'La Guajira', 'Huila'],
    correcta: 3,
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
    opciones: ['1810', '1808', '1819', '1821'],
    correcta: 0,
    explicacion: 'El Acta se firmó en Santa Fe el 20 de julio de 1810.'
  },
  {
    id: 12,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué hecho del 20 de julio de 1810 inició la Independencia?',
    opciones: ['La Batalla de Boyacá', 'El Pantano de Vargas', 'El Florero de Llorente', 'La Toma de Cartagena'],
    correcta: 2,
    explicacion: 'La ruptura del Florero de Llorente provocó el Grito de Independencia.'
  },
  {
    id: 13,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es conocido como el Libertador de Colombia?',
    opciones: ['Francisco de Paula Santander', 'Antonio Nariño', 'José María Córdova', 'Simón Bolívar'],
    correcta: 3,
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
    opciones: ['Antonia Santos', 'Mercedes Ábrego', 'Manuela Beltrán', 'Policarpa Salavarrieta'],
    correcta: 3,
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
  },
  // ---------- CULTURA (ids 21-30) ----------
  {
    id: 21,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿De qué región es originario el sombrero vueltiao?',
    opciones: ['Córdoba', 'Nariño', 'Santander', 'Boyacá'],
    correcta: 0,
    explicacion: 'Es herencia del pueblo zenú, de Córdoba y Sucre.'
  },
  {
    id: 22,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿De qué región es típica la bandeja paisa?',
    opciones: ['Tolima', 'Huila', 'Antioquia', 'Cundinamarca'],
    correcta: 2,
    explicacion: 'La bandeja paisa es el plato típico de Antioquia.'
  },
  {
    id: 23,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es uno de los ritmos más representativos de Colombia?',
    opciones: ['El tango', 'La cumbia', 'El merengue', 'La bachata'],
    correcta: 1,
    explicacion: 'La cumbia, de origen caribeño, es símbolo musical del país.'
  },
  {
    id: 24,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Quién escribió Cien años de soledad?',
    opciones: ['Álvaro Mutis', 'Jorge Isaacs', 'Rafael Pombo', 'Gabriel García Márquez'],
    correcta: 3,
    explicacion: 'García Márquez, Nobel de Literatura, escribió esta obra en 1967.'
  },
  {
    id: 25,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra el carnaval declarado Patrimonio de la Humanidad por la UNESCO?',
    opciones: ['Cartagena', 'Santa Marta', 'Barranquilla', 'Valledupar'],
    correcta: 2,
    explicacion: 'El Carnaval de Barranquilla es Patrimonio Oral e Inmaterial de la Humanidad.'
  },
  {
    id: 26,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra la Feria de las Flores?',
    opciones: ['Cali', 'Medellín', 'Manizales', 'Pereira'],
    correcta: 1,
    explicacion: 'La Feria de las Flores, con su Desfile de Silleteros, es de Medellín.'
  },
  {
    id: 27,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿De qué ciudad es típico el ajiaco?',
    opciones: ['Bogotá', 'Cali', 'Medellín', 'Bucaramanga'],
    correcta: 0,
    explicacion: 'El ajiaco, sopa de papa con pollo y guascas, es típico de Bogotá.'
  },
  {
    id: 28,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra el Carnaval de Negros y Blancos?',
    opciones: ['Popayán', 'Tunja', 'Neiva', 'Pasto'],
    correcta: 3,
    explicacion: 'El Carnaval de Negros y Blancos se celebra en Pasto cada mes de enero.'
  },
  {
    id: 29,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿En qué ciudad se celebra el Festival de la Leyenda Vallenata?',
    opciones: ['Valledupar', 'Riohacha', 'Sincelejo', 'Montería'],
    correcta: 0,
    explicacion: 'Valledupar, capital del Cesar, es la cuna del vallenato.'
  },
  {
    id: 30,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿De qué ciudad es originaria la champeta?',
    opciones: ['Barranquilla', 'Cartagena', 'Santa Marta', 'Quibdó'],
    correcta: 1,
    explicacion: 'La champeta nació en los barrios populares de Cartagena.'
  },
  // ---------- DEPORTES (ids 31-40) ----------
  {
    id: 31,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cuál es el deporte nacional de Colombia?',
    opciones: ['El fútbol', 'El ciclismo', 'El tejo', 'El boxeo'],
    correcta: 2,
    explicacion: 'El tejo (turmequé) fue declarado deporte nacional por ley.'
  },
  {
    id: 32,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué Mundial ganó James Rodríguez la Bota de Oro?',
    opciones: ['Sudáfrica 2010', 'Rusia 2018', 'Catar 2022', 'Brasil 2014'],
    correcta: 3,
    explicacion: 'James fue el goleador del Mundial de Brasil 2014 con 6 goles.'
  },
  {
    id: 33,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cómo se llama el estadio de Barranquilla donde juega la Selección Colombia?',
    opciones: ['El Campín', 'Atanasio Girardot', 'Metropolitano', 'Pascual Guerrero'],
    correcta: 2,
    explicacion: 'El Metropolitano Roberto Meléndez es la casa de la Selección.'
  },
  {
    id: 34,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué deporte brilla Mariana Pajón?',
    opciones: ['Patinaje', 'Ciclismo de ruta', 'Atletismo', 'BMX'],
    correcta: 3,
    explicacion: 'La reina del BMX ganó el oro olímpico en Londres 2012 y Río 2016.'
  },
  {
    id: 35,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué ciclista colombiano ganó el Tour de Francia en 2019?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Rigoberto Urán', 'Miguel Ángel López'],
    correcta: 1,
    explicacion: 'Egan Bernal fue el primer colombiano en ganar el Tour de Francia.'
  },
  {
    id: 36,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué gran vuelta ganó Nairo Quintana en 2014?',
    opciones: ['El Tour de Francia', 'El Giro de Italia', 'La Vuelta a España', 'La París-Niza'],
    correcta: 1,
    explicacion: 'Nairo ganó el Giro de Italia 2014.'
  },
  {
    id: 37,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Quién es el máximo goleador histórico de la Selección Colombia?',
    opciones: ['James Rodríguez', 'Faustino Asprilla', 'Radamel Falcao García', 'Carlos Bacca'],
    correcta: 2,
    explicacion: 'El Tigre Falcao es el máximo artillero de la Selección.'
  },
  {
    id: 38,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué prueba ganó el oro Caterine Ibargüen en Río 2016?',
    opciones: ['Salto triple', 'Salto largo', '400 metros', 'Jabalina'],
    correcta: 0,
    explicacion: 'Caterine ganó el oro olímpico en salto triple en Río 2016.'
  },
  {
    id: 39,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué Mundial debutó la Selección Colombia?',
    opciones: ['Chile 1962', 'México 1970', 'Italia 1990', 'EE. UU. 1994'],
    correcta: 0,
    explicacion: 'Colombia debutó en los mundiales en Chile 1962.'
  },
  {
    id: 40,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué equipo colombiano ganó la Copa Libertadores en 2004?',
    opciones: ['Atlético Nacional', 'Once Caldas', 'América de Cali', 'Millonarios'],
    correcta: 1,
    explicacion: 'El Once Caldas de Manizales ganó la Libertadores 2004.'
  },
  // ---------- NATURALEZA (ids 41-50) ----------
  {
    id: 41,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el ave nacional de Colombia?',
    opciones: ['Cóndor de los Andes', 'Guacamaya', 'Colibrí', 'Tucán'],
    correcta: 0,
    explicacion: 'El cóndor de los Andes aparece en el escudo nacional.'
  },
  {
    id: 42,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es la flor nacional de Colombia?',
    opciones: ['La rosa', 'El girasol', 'El clavel', 'La orquídea'],
    correcta: 3,
    explicacion: 'La orquídea Cattleya trianae es la flor nacional.'
  },
  {
    id: 43,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Por cuál producto agrícola es famosa Colombia en el mundo?',
    opciones: ['El arroz', 'El café', 'El maíz', 'La papa'],
    correcta: 1,
    explicacion: 'El café colombiano, de la zona cafetera, es famoso en todo el mundo.'
  },
  {
    id: 44,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Qué selva cubre el sur del país?',
    opciones: ['El Darién', 'El Chocó', 'La Amazonía', 'La Orinoquía'],
    correcta: 2,
    explicacion: 'La selva amazónica cubre el sur de Colombia.'
  },
  {
    id: 45,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué oso habita en los Andes colombianos?',
    opciones: ['Oso pardo', 'Oso polar', 'Oso de anteojos', 'Oso panda'],
    correcta: 2,
    explicacion: 'El oso de anteojos (oso andino) es el único oso de Suramérica.'
  },
  {
    id: 46,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Cómo se llama el roedor más grande del mundo, que vive en los Llanos?',
    opciones: ['El ñeque', 'El capibara (chigüiro)', 'La guagua', 'El armadillo'],
    correcta: 1,
    explicacion: 'El capibara, llamado chigüiro en los Llanos, es el roedor más grande del mundo.'
  },
  {
    id: 47,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿A qué costa colombiana llegan cada año las ballenas jorobadas?',
    opciones: ['Costa Caribe', 'Costa Pacífica', 'Isla de San Andrés', 'Golfo de Morrosquillo'],
    correcta: 1,
    explicacion: 'Las ballenas jorobadas llegan al Pacífico a tener sus crías.'
  },
  {
    id: 48,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿En qué ecosistema crecen los frailejones?',
    opciones: ['En el desierto', 'En la selva', 'En los manglares', 'En los páramos'],
    correcta: 3,
    explicacion: 'Los frailejones, que guardan el agua, crecen en los páramos.'
  },
  {
    id: 49,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el páramo más grande del mundo?',
    opciones: ['Sumapaz', 'Chingaza', 'Santurbán', 'Cocuy'],
    correcta: 0,
    explicacion: 'El Sumapaz, al sur de Bogotá, es el páramo más extenso del planeta.'
  },
  {
    id: 50,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Dónde crece la palma de cera, árbol nacional de Colombia?',
    opciones: ['Valle de Cocora', 'Desierto de la Tatacoa', 'Sierra Nevada', 'Llanos Orientales'],
    correcta: 0,
    explicacion: 'La palma de cera crece en el Valle de Cocora, en el Quindío.'
  }
];

const CATEGORIAS = {
  geografia: 'Geografía',
  historia: 'Historia',
  cultura: 'Cultura',
  deportes: 'Deportes',
  naturaleza: 'Naturaleza'
};
