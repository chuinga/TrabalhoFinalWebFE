// Selecting DOM elements
const $startGameButton = document.querySelector(".iniciar");
const $nextQuestionButton = document.querySelector(".proxima-pergunta");
const $questionsContainer = document.querySelector(".perguntas-container");
const $questionText = document.querySelector(".pergunta");
const $answersContainer = document.querySelector(".respostas-container");
const $respostas = document.querySelectorAll(".resposta");

// Initializing game state variables
let currentQuestionIndex = 0;
let totalcorreto = 0;

// Adding event listeners to buttons
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

// Function to start the game
function startGame() {
  $startGameButton.classList.add("esconder");
  $questionsContainer.classList.remove("esconder");
  displayNextQuestion();
}

// Function to display the next question
function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].pergunta;
  questions[currentQuestionIndex].respostas.forEach((answer) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "resposta");
    newAnswer.textContent = answer.text;
    if (answer.correto) {
      newAnswer.dataset.correto = answer.correto;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

// Function to reset the state for a new question
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("esconder");
}

// Function to handle answer selection
function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correto) {
    document.body.classList.add("correto");
    totalcorreto++;
  } else {
    document.body.classList.add("incorreto");
  }

  document.querySelectorAll(".resposta").forEach((button) => {
    button.disabled = true;

    if (button.dataset.correto) {
      button.classList.add("correto");
    } else {
      button.classList.add("incorreto");
    }
  });

  $nextQuestionButton.classList.remove("esconder");
  currentQuestionIndex++;
}

// Function to finish the game and display the result
function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalcorreto * 100) / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Excellent!";
      break;
    case performance >= 70:
      message = "Very good!";
      break;
    case performance >= 50:
      message = "Good!";
      break;
    default:
      message = "Needs improvement.";
  }

  $questionsContainer.innerHTML = `<p class="final-message">
      You got ${totalcorreto} out of ${totalQuestions} questions right!
      <span>Result: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Retake the test
    </button>`;
}

/* function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalcorreto * 100) / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Excelente!";
      break;
    case performance >= 70:
      message = "Muito bom!";
      break;
    case performance >= 50:
      message = "Bom!";
      break;
    default:
      message = "Pode melhorar.";
  }

  $questionsContainer.innerHTML = `<p class="final-message">
      Acertou em ${totalcorreto} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Repetir o teste
    </button>`;
} */

// Questions array containing the quiz questions and answers
const questions = [
  // Multiple-choice questions
  {
    pergunta: "What is the main square of Setúbal called?",
    respostas: [
      { text: "Praça da Liberdade", correto: false },
      { text: "Praça da República", correto: false },
      { text: "Praça do Bocage", correto: true },
      { text: "Praça do Comércio", correto: false },
    ],
  },
  {
    pergunta: "Which famous Portuguese poet is commemorated with a statue in Setúbal?",
    respostas: [
      { text: "Manuel Maria Barbosa du Bocage", correto: true },
      { text: "Luís de Camões", correto: false },
      { text: "Fernando Pessoa", correto: false },
      { text: "Antero de Quental", correto: false },
    ],
  },
  {
    pergunta: "What is the name of the river that flows through Setúbal?",
    respostas: [
      { text: "Douro", correto: false },
      { text: "Mondego", correto: false },
      { text: "Sado", correto: true },
      { text: "Tejo", correto: false },
    ],
  },
  {
    pergunta: "Which historical building in Setúbal was once a Jesuit monastery?",
    respostas: [
      { text: "Convento de Jesus", correto: true },
      { text: "Convento de São Francisco", correto: false },
      { text: "Convento de Santa Clara", correto: false },
      { text: "Convento do Carmo", correto: false },
    ],
  },
  {
    pergunta: "Which Setúbal bridge connects the city to the Troia Peninsula?",
    respostas: [
      { text: "Ponte 25 de Abril", correto: false },
      { text: "Ponte Vasco da Gama", correto: false },
      { text: "Ponte de São Francisco", correto: false },
      { text: "Ponte da Doca", correto: true },
    ],
  },
  {
    pergunta: "What is the highest peak in the Arrábida mountains?",
    respostas: [
      { text: "Serra do Risco", correto: false },
      { text: "Serra da Arrábida", correto: true },
      { text: "Serra da Estrela", correto: false },
      { text: "Serra de Sintra", correto: false },
    ],
  },
  {
    pergunta: "Which unique flora is commonly found in the Arrábida Natural Park?",
    respostas: [
      { text: "Pine trees", correto: false },
      { text: "Cork oaks", correto: false },
      { text: "Mediterranean scrubland", correto: true },
      { text: "Olive trees", correto: false },
    ],
  },
  {
    pergunta: "Which historical site is located within the Arrábida mountains?",
    respostas: [
      { text: "Convento de Cristo", correto: false },
      { text: "Convento da Arrábida", correto: true },
      { text: "Convento de Mafra", correto: false },
      { text: "Convento de Belém", correto: false },
    ],
  },
  {
    pergunta: "What is the Arrábida Natural Park best known for?",
    respostas: [
      { text: "Coastal cliffs and biodiversity", correto: true },
      { text: "Desert landscapes", correto: false },
      { text: "Snow sports", correto: false },
      { text: "Volcanic activity", correto: false },
    ],
  },
  {
    pergunta: "Which popular outdoor activity is common in the Arrábida mountains?",
    respostas: [
      { text: "Surfing", correto: false },
      { text: "Rock climbing", correto: true },
      { text: "Skiing", correto: false },
      { text: "Paragliding", correto: false },
    ],
  },
  {
    pergunta: "Which beach is renowned for its clear waters and is located in Arrábida?",
    respostas: [
      { text: "Praia da Rocha", correto: false },
      { text: "Praia da Figueirinha", correto: true },
      { text: "Praia de Carcavelos", correto: false },
      { text: "Praia da Nazaré", correto: false },
    ],
  },
  {
    pergunta: "Which beach is famous for its view of the Troia Peninsula?",
    respostas: [
      { text: "Praia da Adraga", correto: false },
      { text: "Praia da Ribeira", correto: false },
      { text: "Praia de Galápos", correto: true },
      { text: "Praia da Manta Rota", correto: false },
    ],
  },
  {
    pergunta: "What is a common activity at Praia dos Coelhos?",
    respostas: [
      { text: "Scuba diving", correto: true },
      { text: "Snowboarding", correto: false },
      { text: "Windsurfing", correto: false },
      { text: "Fishing", correto: false },
    ],
  },
  {
    pergunta: "Which beach is known for its secluded and tranquil environment in Arrábida?",
    respostas: [
      { text: "Praia da Comporta", correto: false },
      { text: "Praia de Albarquel", correto: true },
      { text: "Praia do Guincho", correto: false },
      { text: "Praia da Amoreira", correto: false },
    ],
  },
  {
    pergunta: "Which beach is part of the Arrábida Natural Park and has limited access?",
    respostas: [
      { text: "Praia da Rocha", correto: false },
      { text: "Praia do Portinho da Arrábida", correto: true },
      { text: "Praia da Foz do Arelho", correto: false },
      { text: "Praia de São Pedro de Moel", correto: false },
    ],
  },
  // True or false questions
  {
    pergunta: "Is Choco Frito a traditional dish from Setúbal?",
    respostas: [
      { text: "True", correto: true },
      { text: "False", correto: false },
    ],
  },
  {
    pergunta: "Is Tortas de Azeitão a type of cheese?",
    respostas: [
      { text: "False", correto: true },
      { text: "True", correto: false },
    ],
  },
  {
    pergunta: "Is Queijo de Azeitão a soft, creamy cheese made from cow's milk?",
    respostas: [
      { text: "False", correto: true },
      { text: "True", correto: false },
    ],
  },
  {
    pergunta: "Is Moscatel de Setúbal a sweet, fortified wine made from Muscat grapes?",
    respostas: [
      { text: "True", correto: true },
      { text: "False", correto: false },
    ],
  },
  {
    pergunta: "Is Sardinhas Assadas a common dish in Setúbal?",
    respostas: [
      { text: "True", correto: true },
      { text: "False", correto: false },
    ],
  },
];


/* // Questions array containing the quiz questions and answers
const questions = [
  {
    pergunta: "What is the main square of Setúbal called?",
    respostas: [
      { text: "Praça da Liberdade", correto: false },
      { text: "Praça da República", correto: false },
      { text: "Praça do Bocage", correto: true },
      { text: "Praça do Comércio", correto: false },
    ],
  },
  {
    pergunta:
      "Which famous Portuguese poet is commemorated with a statue in Setúbal?",
    respostas: [
      { text: "Manuel Maria Barbosa du Bocage", correto: true },
      { text: "Luís de Camões", correto: false },
      { text: "Fernando Pessoa", correto: false },
      { text: "Antero de Quental", correto: false },
    ],
  },
  {
    pergunta: "What is the Arrábida Natural Park best known for?",
    respostas: [
      { text: "Coastal cliffs and biodiversity", correto: true },
      { text: "Desert landscapes", correto: false },
      { text: "Snow sports", correto: false },
      { text: "Volcanic activity", correto: false },
    ],
  },
  {
    pergunta: "Is snowboarding a common activity at Praia dos Coelhos?",
    respostas: [
      { text: "False", correto: true },
      { text: "True", correto: false },
    ],
  },

  {
    pergunta: "Is Moscatel a local wine from Setúbal?",
    respostas: [
      { text: "False", correto: false },
      { text: "True", correto: true },
    ],
  },
]; */
