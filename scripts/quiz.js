const $startGameButton = document.querySelector(".iniciar")
const $nextQuestionButton = document.querySelector(".proxima-pergunta")
const $questionsContainer = document.querySelector(".perguntas-container")
const $questionText = document.querySelector(".pergunta")
const $answersContainer = document.querySelector(".respostas-container")
const $respostas = document.querySelectorAll(".resposta")

let currentQuestionIndex = 0
let totalcorreto = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("esconder")
  $questionsContainer.classList.remove("esconder")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].pergunta
  questions[currentQuestionIndex].respostas.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "resposta")
    newAsnwer.textContent = answer.text
    if (answer.correto) {
      newAsnwer.dataset.correto = answer.correto
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("esconder")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correto) {
    document.body.classList.add("correto")
    totalcorreto++
  } else {
    document.body.classList.add("incorreto") 
  }

  document.querySelectorAll(".resposta").forEach(button => {
    button.disabled = true

    if (button.dataset.correto) {
      button.classList.add("correto")
    } else {
      button.classList.add("incorreto")
    }
  })
  
  $nextQuestionButton.classList.remove("esconder")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalcorreto * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente!"
      break
    case (performance >= 70):
      message = "Muito bom!"
      break
    case (performance >= 50):
      message = "Bom!"
      break
    default:
      message = "Pode melhorar."
  }

  $questionsContainer.innerHTML = 
  `<p class="final-message">
      Acertou em ${totalcorreto} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Repetir o teste
    </button>`
}


const questions = [
  {
    pergunta: "Há quantos anos existem os Pokémons?",
    respostas: [
      { text: "25", correto: false },
      { text: "15", correto: false },
      { text: "35", correto: true },
      { text: "10", correto: false }
    ]
  },
  {
    pergunta: "Quem criou os Pokémons?",
    respostas: [
      { text: "Satoshi Tajiri", correto: true },
      { text: "Seed Pokémon", correto: false },
      { text: "Mouse Pokémon", correto: false },
      { text: "Satoshi Pokémon", correto: false }
    ]
  },
  {
    pergunta: "Qual é a espécie do Pikachu?",
    respostas: [
      { text: "Mouse Pokémon", correto: true },
      { text: "Seed Pokémon", correto: false },
      { text: "Water Pokémon", correto: false },
      { text: "Ice Pokémon", correto: false }
    ]
  },
  {
    pergunta: 'Chikorita, Pupitar e Slugma são Pokémos da 1.ª geração?',
    respostas: [
      { text: "Verdadeiro", correto: false },
      { text: "Falso", correto: true }
    ]
  },
  
  {
    pergunta: "Qual a habilidade do Bulbasaur?",
    respostas: [
      { text: 'Static', correto: false },
      { text: 'Overgrow', correto: true },
    ]
  },
]