let quizData = [];
let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const quiz = document.getElementById("quiz");

fetch("quiz-data.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data.quizData;
    loadQuiz();
  });

  function loadQuiz() {
  deselectAnswers();
  const current = quizData[currentQuiz];

  questionEl.innerText = current.question;
  a_text.innerText = current.a;
  b_text.innerText = current.b;
  c_text.innerText = current.c;
  d_text.innerText = current.d;
}

function deselectAnswers() {
  answersEls.forEach((el) => (el.checked = false));
}

function getSelected() {
  let answer;
  answersEls.forEach((el) => {
    if (el.checked) answer = el.id;
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      launchConfetti()
      quiz.innerHTML = `
        <h5>You answered ${score} out of ${quizData.length} questions correctly 🎉</h5>
        <button class='restart' onclick="location.reload()">Restart Quiz</button>
      `;
    }
  }
});

function launchConfetti() {
  var duration = 2 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}