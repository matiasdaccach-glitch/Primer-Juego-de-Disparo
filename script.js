// Pega entre las comillas el enlace público de tu Google Form.
// Ejemplo: const ENLACE_FORMULARIO = "https://forms.gle/abc123";
const ENLACE_FORMULARIO = "";

const preguntas = [
  {
    categoria: "Ecosistemas",
    texto: "¿Qué describe mejor a un ecosistema?",
    opciones: [
      "Un grupo de animales de la misma especie",
      "Los seres vivos y los elementos no vivos que interactúan en un lugar",
      "Una región que solo tiene plantas"
    ],
    correcta: 1,
    explicacion: "Un ecosistema incluye seres vivos, agua, suelo, aire y las relaciones entre ellos."
  },
  {
    categoria: "Cadenas alimentarias",
    texto: "¿Qué papel cumplen las plantas en una cadena alimentaria?",
    opciones: [
      "Productores: fabrican su alimento usando la luz solar",
      "Consumidores: cazan otros organismos",
      "Descomponedores: transforman rocas en nutrientes"
    ],
    correcta: 0,
    explicacion: "Las plantas son productores y usan la luz solar para fabricar su alimento."
  },
  {
    categoria: "Energía",
    texto: "¿Qué ocurre con la energía al subir de nivel en una cadena alimentaria?",
    opciones: [
      "Aumenta en cada nivel",
      "Se mantiene exactamente igual",
      "Disminuye: solo una parte pasa al siguiente nivel"
    ],
    correcta: 2,
    explicacion: "En cada nivel se pierde energía, por ejemplo en forma de calor."
  },
  {
    categoria: "Biodiversidad",
    texto: "¿Por qué la biodiversidad puede ayudar a un ecosistema?",
    opciones: [
      "Porque todas las especies hacen lo mismo",
      "Porque variedad de especies y funciones ayuda a sostener el sistema",
      "Porque elimina cualquier cambio ambiental"
    ],
    correcta: 1,
    explicacion: "La variedad de especies y funciones puede ayudar al ecosistema a responder ante cambios."
  },
  {
    categoria: "Ciclos naturales",
    texto: "¿Qué hacen los descomponedores, como hongos y bacterias?",
    opciones: [
      "Reciclan nutrientes al descomponer restos de seres vivos",
      "Producen luz para las plantas",
      "Impiden que los animales respiren"
    ],
    correcta: 0,
    explicacion: "Los descomponedores devuelven nutrientes al suelo y al agua."
  },
  {
    categoria: "Redes tróficas",
    texto: "Si desaparece un depredador, ¿qué efecto podría ocurrir?",
    opciones: [
      "Ninguno: las especies no se relacionan",
      "Su presa podría aumentar y afectar a otras poblaciones",
      "Todas las plantas se vuelven depredadoras"
    ],
    correcta: 1,
    explicacion: "Las especies están conectadas; un cambio puede afectar a otras poblaciones."
  },
  {
    categoria: "Impacto humano",
    texto: "¿Cuál es un ejemplo de fragmentación del hábitat?",
    opciones: [
      "Un bosque queda dividido por una carretera",
      "Una semilla germina después de la lluvia",
      "Un ave construye un nido"
    ],
    correcta: 0,
    explicacion: "Una carretera puede dividir un hábitat y dificultar el movimiento de las especies."
  },
  {
    categoria: "Conservación",
    texto: "¿Qué acción ayuda a cuidar una cuenca cercana?",
    opciones: [
      "Arrojar residuos lejos de la orilla",
      "Proteger la vegetación junto al agua y reducir la contaminación",
      "Retirar todas las plantas acuáticas"
    ],
    correcta: 1,
    explicacion: "La vegetación de las orillas protege hábitats y ayuda a cuidar el agua."
  },
  {
    categoria: "Cambio climático",
    texto: "¿Qué significa que una especie sea vulnerable al cambio climático?",
    opciones: [
      "Podría tener dificultades para adaptarse a cambios de temperatura o lluvia",
      "No necesita un hábitat",
      "Puede vivir en cualquier condición"
    ],
    correcta: 0,
    explicacion: "Los cambios rápidos pueden superar la capacidad de adaptación de algunas especies."
  },
  {
    categoria: "Pensamiento sistémico",
    texto: "¿Cómo conviene estudiar un problema ambiental?",
    opciones: [
      "Mirar una sola causa y decidir de inmediato",
      "Observar causas, efectos y conexiones antes de decidir",
      "Ignorar los datos y elegir lo más popular"
    ],
    correcta: 1,
    explicacion: "Analizar causas, efectos y relaciones ayuda a proponer mejores soluciones."
  }
];

const inicio = document.getElementById("pantalla-inicio");
const juego = document.getElementById("pantalla-juego");
const final = document.getElementById("pantalla-final");

let indice = 0;
let puntaje = 0;
let yaRespondio = false;

function mostrarPantalla(pantalla) {
  inicio.classList.add("hidden");
  juego.classList.add("hidden");
  final.classList.add("hidden");
  pantalla.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function iniciarJuego() {
  indice = 0;
  puntaje = 0;
  document.getElementById("puntaje").textContent = puntaje;
  mostrarPantalla(juego);
  mostrarPregunta();
}

function mostrarPregunta() {
  yaRespondio = false;
  const pregunta = preguntas[indice];

  document.getElementById("numero").textContent = indice + 1;
  document.getElementById("categoria").textContent = pregunta.categoria;
  document.getElementById("pregunta").textContent = pregunta.texto;
  document.getElementById("progreso").style.width =
    `${((indice + 1) / preguntas.length) * 100}%`;

  const retro = document.getElementById("retroalimentacion");
  retro.textContent = "";
  retro.className = "feedback";

  const botonSiguiente = document.getElementById("siguiente");
  botonSiguiente.disabled = true;
  botonSiguiente.textContent =
    indice === preguntas.length - 1 ? "VER RESULTADO →" : "SIGUIENTE RETO →";

  const contenedor = document.getElementById("respuestas");
  contenedor.replaceChildren();

  pregunta.opciones.forEach((opcion, numeroOpcion) => {
    const boton = document.createElement("button");
    boton.className = "answer";
    boton.textContent = `${String.fromCharCode(65 + numeroOpcion)}. ${opcion}`;
    boton.addEventListener("click", () => elegirRespuesta(numeroOpcion));
    contenedor.appendChild(boton);
  });
}

function elegirRespuesta(seleccion) {
  if (yaRespondio) return;
  yaRespondio = true;

  const pregunta = preguntas[indice];
  const botones = document.querySelectorAll(".answer");
  const esCorrecta = seleccion === pregunta.correcta;

  if (esCorrecta) {
    puntaje += 10;
    document.getElementById("puntaje").textContent = puntaje;
  }

  botones.forEach((boton, numero) => {
    boton.disabled = true;

    if (numero === pregunta.correcta) {
      boton.classList.add("correct");
    } else if (numero === seleccion) {
      boton.classList.add("incorrect");
    }
  });

  const retro = document.getElementById("retroalimentacion");
  retro.textContent = `${esCorrecta ? "¡Correcto! " : "Casi. "}${pregunta.explicacion}`;
  retro.classList.add(esCorrecta ? "good" : "bad");
  document.getElementById("siguiente").disabled = false;
}

function mostrarResultado() {
  document.getElementById("puntaje-final").textContent = puntaje;
  document.getElementById("resumen-final").textContent =
    `Respondiste los 10 retos y obtuviste ${puntaje} puntos.`;

  let titulo;
  let mensaje;

  if (puntaje === 100) {
    titulo = "¡Misión perfecta!";
    mensaje = "¡Excelente trabajo! Tienes una gran comprensión de los ecosistemas.";
  } else if (puntaje >= 70) {
    titulo = "¡Gran trabajo, explorador!";
    mensaje = "Ya tienes una buena base para entender cómo se conectan los ecosistemas.";
  } else if (puntaje >= 40) {
    titulo = "¡Vas por buen camino!";
    mensaje = "Repasa las explicaciones y vuelve a intentarlo para seguir aprendiendo.";
  } else {
    titulo = "¡Cada reto enseña algo nuevo!";
    mensaje = "Puedes jugar de nuevo y aprender más sobre nuestro planeta.";
  }

  document.getElementById("titulo-final").textContent = titulo;
  document.getElementById("mensaje-final").textContent = mensaje;

  const enlace = document.getElementById("enlace-formulario");
  const nota = document.getElementById("nota-formulario");

  if (ENLACE_FORMULARIO.startsWith("https://")) {
    enlace.href = ENLACE_FORMULARIO;
    nota.textContent = "Tu opinión ayuda a mejorar el juego.";
  } else {
    enlace.href = "#";
    enlace.onclick = (evento) => evento.preventDefault();
    nota.textContent =
      "Para activar la evaluación, pega el enlace de tu Google Form al inicio de app.js.";
  }

  mostrarPantalla(final);
}

document.getElementById("iniciar").addEventListener("click", iniciarJuego);
document.getElementById("jugar-de-nuevo").addEventListener("click", iniciarJuego);

document.getElementById("siguiente").addEventListener("click", () => {
  if (indice < preguntas.length - 1) {
    indice += 1;
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});