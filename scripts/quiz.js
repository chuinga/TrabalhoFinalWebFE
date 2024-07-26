// Selecting DOM elements
const $startGameButton = document.querySelector(".start");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $answers = document.querySelectorAll(".answer");

// Initializing game state variables
let currentQuestionIndex = 0;
let totalcorrect = 0;

// Adding event listeners to buttons
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

// Function to start the game
function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

// Function to display the next question
function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach((answer) => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
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
  $nextQuestionButton.classList.add("hide");
}

// Function to handle answer selection
function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalcorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach((button) => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

// Function to finish the game and display the result
function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalcorrect * 100) / totalQuestions);

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
      You got ${totalcorrect} out of ${totalQuestions} questions right!
      <span>Result: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Retake the test
    </button>`;
}

// Questions array containing the quiz questions and answers
const questions = [
  // Multiple-choice questions
  {
    question: "What is the main square of Setúbal called?",
    answers: [
      { text: "Praça da Liberdade", correct: false },
      { text: "Praça da República", correct: false },
      { text: "Praça do Bocage", correct: true },
      { text: "Praça do Comércio", correct: false },
    ],
  },
  {
    question: "Which famous Portuguese poet is commemorated with a statue in Setúbal?",
    answers: [
      { text: "Manuel Maria Barbosa du Bocage", correct: true },
      { text: "Luís de Camões", correct: false },
      { text: "Fernando Pessoa", correct: false },
      { text: "Antero de Quental", correct: false },
    ],
  },
  {
    question: "What is the name of the river that flows through Setúbal?",
    answers: [
      { text: "Douro", correct: false },
      { text: "Mondego", correct: false },
      { text: "Sado", correct: true },
      { text: "Tejo", correct: false },
    ],
  },
  {
    question: "Which historical building in Setúbal was once a Jesuit monastery?",
    answers: [
      { text: "Convento de Jesus", correct: true },
      { text: "Convento de São Francisco", correct: false },
      { text: "Convento de Santa Clara", correct: false },
      { text: "Convento do Carmo", correct: false },
    ],
  },
  {
    question: "Which Setúbal bridge connects the city to the Troia Peninsula?",
    answers: [
      { text: "Ponte 25 de Abril", correct: false },
      { text: "Ponte Vasco da Gama", correct: false },
      { text: "Ponte de São Francisco", correct: false },
      { text: "Ponte da Doca", correct: true },
    ],
  },
  {
    question: "What is the highest peak in the Arrábida mountains?",
    answers: [
      { text: "Serra do Risco", correct: false },
      { text: "Serra da Arrábida", correct: true },
      { text: "Serra da Estrela", correct: false },
      { text: "Serra de Sintra", correct: false },
    ],
  },
  {
    question: "Which unique flora is commonly found in the Arrábida Natural Park?",
    answers: [
      { text: "Pine trees", correct: false },
      { text: "Cork oaks", correct: false },
      { text: "Mediterranean scrubland", correct: true },
      { text: "Olive trees", correct: false },
    ],
  },
  {
    question: "Which historical site is located within the Arrábida mountains?",
    answers: [
      { text: "Convento de Cristo", correct: false },
      { text: "Convento da Arrábida", correct: true },
      { text: "Convento de Mafra", correct: false },
      { text: "Convento de Belém", correct: false },
    ],
  },
  {
    question: "What is the Arrábida Natural Park best known for?",
    answers: [
      { text: "Coastal cliffs and biodiversity", correct: true },
      { text: "Desert landscapes", correct: false },
      { text: "Snow sports", correct: false },
      { text: "Volcanic activity", correct: false },
    ],
  },
  {
    question: "Which popular outdoor activity is common in the Arrábida mountains?",
    answers: [
      { text: "Surfing", correct: false },
      { text: "Rock climbing", correct: true },
      { text: "Skiing", correct: false },
      { text: "Paragliding", correct: false },
    ],
  },
  {
    question: "Which beach is renowned for its clear waters and is located in Arrábida?",
    answers: [
      { text: "Praia da Rocha", correct: false },
      { text: "Praia da Figueirinha", correct: true },
      { text: "Praia de Carcavelos", correct: false },
      { text: "Praia da Nazaré", correct: false },
    ],
  },
  {
    question: "Which beach is famous for its view of the Troia Peninsula?",
    answers: [
      { text: "Praia da Adraga", correct: false },
      { text: "Praia da Ribeira", correct: false },
      { text: "Praia de Galápos", correct: true },
      { text: "Praia da Manta Rota", correct: false },
    ],
  },
  {
    question: "What is a common activity at Praia dos Coelhos?",
    answers: [
      { text: "Scuba diving", correct: true },
      { text: "Snowboarding", correct: false },
      { text: "Windsurfing", correct: false },
      { text: "Fishing", correct: false },
    ],
  },
  {
    question: "Which beach is known for its secluded and tranquil environment in Arrábida?",
    answers: [
      { text: "Praia da Comporta", correct: false },
      { text: "Praia de Albarquel", correct: true },
      { text: "Praia do Guincho", correct: false },
      { text: "Praia da Amoreira", correct: false },
    ],
  },
  {
    question: "Which beach is part of the Arrábida Natural Park and has limited access?",
    answers: [
      { text: "Praia da Rocha", correct: false },
      { text: "Praia do Portinho da Arrábida", correct: true },
      { text: "Praia da Foz do Arelho", correct: false },
      { text: "Praia de São Pedro de Moel", correct: false },
    ],
  },
  // True or false questions
  {
    question: "Is Choco Frito a traditional dish from Setúbal?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "Is Tortas de Azeitão a type of cheese?",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    question: "Is Queijo de Azeitão a soft, creamy cheese made from cow's milk?",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    question: "Is Moscatel de Setúbal a sweet, fortified wine made from Muscat grapes?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "Is Sardinhas Assadas a common dish in Setúbal?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
];
