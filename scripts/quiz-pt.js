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
      { texto: "Praça da Liberdade", correcto: false },
      { texto: "Praça da República", correcto: false },
      { texto: "Praça do Bocage", correcto: true },
      { texto: "Praça do Comércio", correcto: false },
    ],
  },
  {
    pergunta: "Qual famoso poeta português é comemorado com uma estátua em Setúbal?",
    respostas: [
      { texto: "Manuel Maria Barbosa du Bocage", correcto: true },
      { texto: "Luís de Camões", correcto: false },
      { texto: "Fernando Pessoa", correcto: false },
      { texto: "Antero de Quental", correcto: false },
    ],
  },
  {
    pergunta: "Qual é o nome do rio que atravessa Setúbal?",
    respostas: [
      { texto: "Douro", correcto: false },
      { texto: "Mondego", correcto: false },
      { texto: "Sado", correcto: true },
      { texto: "Tejo", correcto: false },
    ],
  },
  {
    pergunta: "Qual edifício histórico em Setúbal foi outrora um mosteiro jesuíta?",
    respostas: [
      { texto: "Convento de Jesus", correcto: true },
      { texto: "Convento de São Francisco", correcto: false },
      { texto: "Convento de Santa Clara", correcto: false },
      { texto: "Convento do Carmo", correcto: false },
    ],
  },
  {
    pergunta: "Qual ponte de Setúbal liga a cidade à Península de Troia?",
    respostas: [
      { texto: "Ponte 25 de Abril", correcto: false },
      { texto: "Ponte Vasco da Gama", correcto: false },
      { texto: "Ponte de São Francisco", correcto: false },
      { texto: "Ponte da Doca", correcto: true },
    ],
  },
  {
    pergunta: "Qual é o pico mais alto da Serra da Arrábida?",
    respostas: [
      { texto: "Serra do Risco", correcto: false },
      { texto: "Serra da Arrábida", correcto: true },
      { texto: "Serra da Estrela", correcto: false },
      { texto: "Serra de Sintra", correcto: false },
    ],
  },
  {
    pergunta: "Qual flora única é comum no Parque Natural da Arrábida?",
    respostas: [
      { texto: "Pinheiros", correcto: false },
      { texto: "Sobreiros", correcto: false },
      { texto: "Mato mediterrânico", correcto: true },
      { texto: "Oliveiras", correcto: false },
    ],
  },
  {
    pergunta: "Qual sítio histórico está localizado na Serra da Arrábida?",
    respostas: [
      { texto: "Convento de Cristo", correcto: false },
      { texto: "Convento da Arrábida", correcto: true },
      { texto: "Convento de Mafra", correcto: false },
      { texto: "Convento de Belém", correcto: false },
    ],
  },
  {
    pergunta: "Pelo que é mais conhecido o Parque Natural da Arrábida?",
    respostas: [
      { texto: "Falésias costeiras e biodiversidade", correcto: true },
      { texto: "Paisagens desérticas", correcto: false },
      { texto: "Desportos de neve", correcto: false },
      { texto: "Actividade vulcânica", correcto: false },
    ],
  },
  {
    pergunta: "Qual actividade ao ar livre é comum na Serra da Arrábida?",
    respostas: [
      { texto: "Surf", correcto: false },
      { texto: "Escalada", correcto: true },
      { texto: "Esqui", correcto: false },
      { texto: "Parapente", correcto: false },
    ],
  },
  {
    pergunta: "Qual praia é conhecida pelas suas águas límpidas e está localizada na Arrábida?",
    respostas: [
      { texto: "Praia da Rocha", correcto: false },
      { texto: "Praia da Figueirinha", correcto: true },
      { texto: "Praia de Carcavelos", correcto: false },
      { texto: "Praia da Nazaré", correcto: false },
    ],
  },
  {
    pergunta: "Qual praia é famosa pela sua vista da Península de Troia?",
    respostas: [
      { texto: "Praia da Adraga", correcto: false },
      { texto: "Praia da Ribeira", correcto: false },
      { texto: "Praia de Galápos", correcto: true },
      { texto: "Praia da Manta Rota", correcto: false },
    ],
  },
  {
    pergunta: "Qual é uma actividade comum na Praia dos Coelhos?",
    respostas: [
      { texto: "Mergulho", correcto: true },
      { texto: "Snowboard", correcto: false },
      { texto: "Windsurf", correcto: false },
      { texto: "Pesca", correcto: false },
    ],
  },
  {
    pergunta: "Qual praia é conhecida pelo seu ambiente isolado e tranquilo na Arrábida?",
    respostas: [
      { texto: "Praia da Comporta", correcto: false },
      { texto: "Praia de Albarquel", correcto: true },
      { texto: "Praia do Guincho", correcto: false },
      { texto: "Praia da Amoreira", correcto: false },
    ],
  },
  {
    pergunta: "Qual praia faz parte do Parque Natural da Arrábida e tem acesso limitado?",
    respostas: [
      { texto: "Praia da Rocha", correcto: false },
      { texto: "Praia do Portinho da Arrábida", correcto: true },
      { texto: "Praia da Foz do Arelho", correcto: false },
      { texto: "Praia de São Pedro de Moel", correcto: false },
    ],
  },
  // Perguntas de verdadeiro ou falso
  {
    pergunta: "O Choco Frito é um prato tradicional de Setúbal?",
    respostas: [
      { texto: "Verdadeiro", correcto: true },
      { texto: "Falso", correcto: false },
    ],
  },
  {
    pergunta: "As Tortas de Azeitão são um tipo de queijo?",
    respostas: [
      { texto: "Falso", correcto: true },
      { texto: "Verdadeiro", correcto: false },
    ],
  },
  {
    pergunta: "O Queijo de Azeitão é um queijo suave e cremoso feito de leite de vaca?",
    respostas: [
      { texto: "Falso", correcto: true },
      { texto: "Verdadeiro", correcto: false },
    ],
  },
  {
    pergunta: "O Moscatel de Setúbal é um vinho doce e fortificado feito de uvas Muscat?",
    respostas: [
      { texto: "Verdadeiro", correcto: true },
      { texto: "Falso", correcto: false },
    ],
  },
  {
    pergunta: "As Sardinhas Assadas são um prato comum em Setúbal?",
    respostas: [
      { texto: "Verdadeiro", correcto: true },
      { texto: "Falso", correcto: false },
    ],
  },
];


/* // Questions array containing the quiz questions and answers
const questions = [
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
    pergunta:
      "Que famoso poeta português é comemorado com uma estátua em Setúbal?",
    respostas: [
      { text: "Manuel Maria Barbosa du Bocage", correto: true },
      { text: "Luís de Camões", correto: false },
      { text: "Fernando Pessoa", correto: false },
      { text: "Antero de Quental", correto: false },
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
    pergunta: "O snowboard é uma actividade comum na Praia dos Coelhos?",
    respostas: [
      { text: "Falso", correto: true },
      { text: "Verdadeiro", correto: false },
    ],
  },

  {
    pergunta: "O Moscatel é um vinho local de Setúbal?",
    respostas: [
      { text: "Falso", correto: false },
      { text: "Verdadeiro", correto: true },
    ],
  },
];
 */