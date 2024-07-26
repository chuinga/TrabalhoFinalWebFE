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
    const newAsnwer = document.createElement("button");
    newAsnwer.classList.add("button", "resposta");
    newAsnwer.textContent = answer.text;
    if (answer.correto) {
      newAsnwer.dataset.correto = answer.correto;
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
}

// Questions array containing the quiz questions and answers
const questions = [
  // Multiple-choice questions
  {
    pergunta: "Como se chama a praça principal de Setúbal?",
    respostas: [
      { text: "Praça da Liberdade", correto: false },
      { text: "Praça da República", correto: false },
      { text: "Praça do Bocage", correto: true },
      { text: "Praça do Comércio", correto: false },
    ],
  },
  {
    pergunta: "Qual famoso poeta português é comemorado com uma estátua em Setúbal?",
    respostas: [
      { text: "Manuel Maria Barbosa du Bocage", correto: true },
      { text: "Luís de Camões", correto: false },
      { text: "Fernando Pessoa", correto: false },
      { text: "Antero de Quental", correto: false },
    ],
  },
  {
    pergunta: "Qual é o nome do rio que atravessa Setúbal?",
    respostas: [
      { text: "Douro", correto: false },
      { text: "Mondego", correto: false },
      { text: "Sado", correto: true },
      { text: "Tejo", correto: false },
    ],
  },
  {
    pergunta: "Qual edifício histórico em Setúbal foi outrora um mosteiro jesuíta?",
    respostas: [
      { text: "Convento de Jesus", correto: true },
      { text: "Convento de São Francisco", correto: false },
      { text: "Convento de Santa Clara", correto: false },
      { text: "Convento do Carmo", correto: false },
    ],
  },
  {
    pergunta: "Qual ponte de Setúbal liga a cidade à Península de Troia?",
    respostas: [
      { text: "Ponte 25 de Abril", correto: false },
      { text: "Ponte Vasco da Gama", correto: false },
      { text: "Ponte de São Francisco", correto: false },
      { text: "Ponte da Doca", correto: true },
    ],
  },
  {
    pergunta: "Qual é o pico mais alto da Serra da Arrábida?",
    respostas: [
      { text: "Serra do Risco", correto: false },
      { text: "Serra da Arrábida", correto: true },
      { text: "Serra da Estrela", correto: false },
      { text: "Serra de Sintra", correto: false },
    ],
  },
  {
    pergunta: "Qual flora única é comum no Parque Natural da Arrábida?",
    respostas: [
      { text: "Pinheiros", correto: false },
      { text: "Sobreiros", correto: false },
      { text: "Mato mediterrânico", correto: true },
      { text: "Oliveiras", correto: false },
    ],
  },
  {
    pergunta: "Qual sítio histórico está localizado na Serra da Arrábida?",
    respostas: [
      { text: "Convento de Cristo", correto: false },
      { text: "Convento da Arrábida", correto: true },
      { text: "Convento de Mafra", correto: false },
      { text: "Convento de Belém", correto: false },
    ],
  },
  {
    pergunta: "Pelo que é mais conhecido o Parque Natural da Arrábida?",
    respostas: [
      { text: "Falésias costeiras e biodiversidade", correto: true },
      { text: "Paisagens desérticas", correto: false },
      { text: "Desportos de neve", correto: false },
      { text: "Actividade vulcânica", correto: false },
    ],
  },
  {
    pergunta: "Qual actividade ao ar livre é comum na Serra da Arrábida?",
    respostas: [
      { text: "Surf", correto: false },
      { text: "Escalada", correto: true },
      { text: "Esqui", correto: false },
      { text: "Parapente", correto: false },
    ],
  },
  {
    pergunta: "Qual praia é conhecida pelas suas águas límpidas e está localizada na Arrábida?",
    respostas: [
      { text: "Praia da Rocha", correto: false },
      { text: "Praia da Figueirinha", correto: true },
      { text: "Praia de Carcavelos", correto: false },
      { text: "Praia da Nazaré", correto: false },
    ],
  },
  {
    pergunta: "Qual praia é famosa pela sua vista da Península de Troia?",
    respostas: [
      { text: "Praia da Adraga", correto: false },
      { text: "Praia da Ribeira", correto: false },
      { text: "Praia de Galápos", correto: true },
      { text: "Praia da Manta Rota", correto: false },
    ],
  },
  {
    pergunta: "Qual é uma actividade comum na Praia dos Coelhos?",
    respostas: [
      { text: "Mergulho", correto: true },
      { text: "Snowboard", correto: false },
      { text: "Windsurf", correto: false },
      { text: "Pesca", correto: false },
    ],
  },
  {
    pergunta: "Qual praia é conhecida pelo seu ambiente isolado e tranquilo na Arrábida?",
    respostas: [
      { text: "Praia da Comporta", correto: false },
      { text: "Praia de Albarquel", correto: true },
      { text: "Praia do Guincho", correto: false },
      { text: "Praia da Amoreira", correto: false },
    ],
  },
  {
    pergunta: "Qual praia faz parte do Parque Natural da Arrábida e tem acesso limitado?",
    respostas: [
      { text: "Praia da Rocha", correto: false },
      { text: "Praia do Portinho da Arrábida", correto: true },
      { text: "Praia da Foz do Arelho", correto: false },
      { text: "Praia de São Pedro de Moel", correto: false },
    ],
  },
  // Perguntas de verdadeiro ou falso
  {
    pergunta: "O Choco Frito é um prato tradicional de Setúbal?",
    respostas: [
      { text: "Verdadeiro", correto: true },
      { text: "Falso", correto: false },
    ],
  },
  {
    pergunta: "As Tortas de Azeitão são um tipo de queijo?",
    respostas: [
      { text: "Falso", correto: true },
      { text: "Verdadeiro", correto: false },
    ],
  },
  {
    pergunta: "O Queijo de Azeitão é um queijo suave e cremoso feito de leite de vaca?",
    respostas: [
      { text: "Falso", correto: true },
      { text: "Verdadeiro", correto: false },
    ],
  },
  {
    pergunta: "O Moscatel de Setúbal é um vinho doce e fortificado feito de uvas Muscat?",
    respostas: [
      { text: "Verdadeiro", correto: true },
      { text: "Falso", correto: false },
    ],
  },
  {
    pergunta: "As Sardinhas Assadas são um prato comum em Setúbal?",
    respostas: [
      { text: "Verdadeiro", correto: true },
      { text: "Falso", correto: false },
    ],
  },
];
