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
    const newAsnwer = document.createElement("button");
    newAsnwer.classList.add("button", "answer");
    newAsnwer.textContent = answer.text;
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAsnwer);

    newAsnwer.addEventListener("click", selectAnswer);
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
      Acertou em ${totalcorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Repetir o teste
    </button>`;
}

// Questions array containing the quiz questions and answers
const questions = [
  // Multiple-choice questions
  {
    question: "Como se chama a praça principal de Setúbal?",
    answers: [
      { text: "Praça da Liberdade", correct: false },
      { text: "Praça da República", correct: false },
      { text: "Praça do Bocage", correct: true },
      { text: "Praça do Comércio", correct: false },
    ],
  },
  {
    question: "Qual famoso poeta português é comemorado com uma estátua em Setúbal?",
    answers: [
      { text: "Manuel Maria Barbosa du Bocage", correct: true },
      { text: "Luís de Camões", correct: false },
      { text: "Fernando Pessoa", correct: false },
      { text: "Antero de Quental", correct: false },
    ],
  },
  {
    question: "Qual é o nome do rio que atravessa Setúbal?",
    answers: [
      { text: "Douro", correct: false },
      { text: "Mondego", correct: false },
      { text: "Sado", correct: true },
      { text: "Tejo", correct: false },
    ],
  },
  {
    question: "Qual edifício histórico em Setúbal foi outrora um mosteiro jesuíta?",
    answers: [
      { text: "Convento de Jesus", correct: true },
      { text: "Convento de São Francisco", correct: false },
      { text: "Convento de Santa Clara", correct: false },
      { text: "Convento do Carmo", correct: false },
    ],
  },
  {
    question: "Qual ponte de Setúbal liga a cidade à Península de Troia?",
    answers: [
      { text: "Ponte 25 de Abril", correct: false },
      { text: "Ponte Vasco da Gama", correct: false },
      { text: "Ponte de São Francisco", correct: false },
      { text: "Ponte da Doca", correct: true },
    ],
  },
  {
    question: "Qual é o pico mais alto da Serra da Arrábida?",
    answers: [
      { text: "Serra do Risco", correct: false },
      { text: "Serra da Arrábida", correct: true },
      { text: "Serra da Estrela", correct: false },
      { text: "Serra de Sintra", correct: false },
    ],
  },
  {
    question: "Qual flora única é comum no Parque Natural da Arrábida?",
    answers: [
      { text: "Pinheiros", correct: false },
      { text: "Sobreiros", correct: false },
      { text: "Mato mediterrânico", correct: true },
      { text: "Oliveiras", correct: false },
    ],
  },
  {
    question: "Qual sítio histórico está localizado na Serra da Arrábida?",
    answers: [
      { text: "Convento de Cristo", correct: false },
      { text: "Convento da Arrábida", correct: true },
      { text: "Convento de Mafra", correct: false },
      { text: "Convento de Belém", correct: false },
    ],
  },
  {
    question: "Pelo que é mais conhecido o Parque Natural da Arrábida?",
    answers: [
      { text: "Falésias costeiras e biodiversidade", correct: true },
      { text: "Paisagens desérticas", correct: false },
      { text: "Desportos de neve", correct: false },
      { text: "Actividade vulcânica", correct: false },
    ],
  },
  {
    question: "Qual actividade ao ar livre é comum na Serra da Arrábida?",
    answers: [
      { text: "Surf", correct: false },
      { text: "Escalada", correct: true },
      { text: "Esqui", correct: false },
      { text: "Parapente", correct: false },
    ],
  },
  {
    question: "Qual praia é conhecida pelas suas águas límpidas e está localizada na Arrábida?",
    answers: [
      { text: "Praia da Rocha", correct: false },
      { text: "Praia da Figueirinha", correct: true },
      { text: "Praia de Carcavelos", correct: false },
      { text: "Praia da Nazaré", correct: false },
    ],
  },
  {
    question: "Qual praia é famosa pela sua vista da Península de Troia?",
    answers: [
      { text: "Praia da Adraga", correct: false },
      { text: "Praia da Ribeira", correct: false },
      { text: "Praia de Galápos", correct: true },
      { text: "Praia da Manta Rota", correct: false },
    ],
  },
  {
    question: "Qual é uma actividade comum na Praia dos Coelhos?",
    answers: [
      { text: "Mergulho", correct: true },
      { text: "Snowboard", correct: false },
      { text: "Windsurf", correct: false },
      { text: "Pesca", correct: false },
    ],
  },
  {
    question: "Qual praia é conhecida pelo seu ambiente isolado e tranquilo na Arrábida?",
    answers: [
      { text: "Praia da Comporta", correct: false },
      { text: "Praia de Albarquel", correct: true },
      { text: "Praia do Guincho", correct: false },
      { text: "Praia da Amoreira", correct: false },
    ],
  },
  {
    question: "Qual praia faz parte do Parque Natural da Arrábida e tem acesso limitado?",
    answers: [
      { text: "Praia da Rocha", correct: false },
      { text: "Praia do Portinho da Arrábida", correct: true },
      { text: "Praia da Foz do Arelho", correct: false },
      { text: "Praia de São Pedro de Moel", correct: false },
    ],
  },
  // questions de verdadeiro ou falso
  {
    question: "O Choco Frito é um prato tradicional de Setúbal?",
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false },
    ],
  },
  {
    question: "As Tortas de Azeitão são um tipo de queijo?",
    answers: [
      { text: "Falso", correct: true },
      { text: "Verdadeiro", correct: false },
    ],
  },
  {
    question: "O Queijo de Azeitão é um queijo suave e cremoso feito de leite de vaca?",
    answers: [
      { text: "Falso", correct: true },
      { text: "Verdadeiro", correct: false },
    ],
  },
  {
    question: "O Moscatel de Setúbal é um vinho doce e fortificado feito de uvas Muscat?",
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false },
    ],
  },
  {
    question: "As Sardinhas Assadas são um prato comum em Setúbal?",
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false },
    ],
  },
];
