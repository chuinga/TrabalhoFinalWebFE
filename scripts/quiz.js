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
    pergunta: "What is the main square of Setúbal called?",
    respostas: [
      { text: "Praça da Liberdade", correto: false },
      { text: "Praça da República", correto: false },
      { text: "Praça do Bocage", correto: true },
      { text: "Praça do Comércio", correto: false }
    ]
  },
  {
    pergunta: "Which famous Portuguese poet is commemorated with a statue in Setúbal?",
    respostas: [
      { text: "Manuel Maria Barbosa du Bocage", correto: true },
      { text: "Luís de Camões", correto: false },
      { text: "Fernando Pessoa", correto: false },
      { text: "Antero de Quental", correto: false }
    ]
  },
  {
    pergunta: "What is the Arrábida Natural Park best known for?",
    respostas: [
      { text: "Coastal cliffs and biodiversity", correto: true },
      { text: "Desert landscapes", correto: false },
      { text: "Snow sports", correto: false },
      { text: "Volcanic activity", correto: false }
    ]
  },
  {
    pergunta: 'Is snowboarding a common activity at Praia dos Coelhos?',
    respostas: [
      { text: "False", correto: true },
      { text: "True", correto: false }
    ]
  },
  
  {
    pergunta: "Is Moscatel a local wine from Setúbal?",
    respostas: [
      { text: 'False', correto: false },
      { text: 'True', correto: true },
    ]
  },
]