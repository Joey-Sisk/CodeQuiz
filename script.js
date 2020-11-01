const startScreen = document.getElementById("startDiv");
const questionScreen = document.getElementById("quizDiv");
const leaderboardScreen = document.getElementById("leaderboardDiv");

const startButton = document.getElementById("startBtn");

const questionPlace = document.getElementById("questionLocation");
const answerOption1 = document.getElementById("answerA");
const answerOption2 = document.getElementById("answerB");
const answerOption3 = document.getElementById("answerC");
const answerOption4 = document.getElementById("answerD");

const usernameForm = document.getElementById("usersNameContainer");
const usernameInput = document.getElementById("usersNameInput");
const scoresPlace = document.getElementById("scoresList");

const startOverButton = document.getElementById("returnToStart");

const totalQuestionsNumber = questions.length;

let countdownTimer = 0;

let finalScore;

let currentQuestionNumber = 0;

let usersNames = []

function startQuiz() {
  // this will hide the initial starting div
  startScreen.setAttribute("class", "hide");

  // this will uhide the questions div and keep the positiong
  questionScreen.removeAttribute("class", "hide");
  questionScreen.setAttribute("class", "positioning")

  // this will start the function to populate the questions and answers
  askQuestions();
}

function askQuestions() {
  // this is how I know which question the user is currently on
  let currentQuestion = questions[currentQuestionNumber];

  questionPlace.textContent = currentQuestion.questionTitle;

  answerOption1.textContent = currentQuestion.answerOptions[0];
  answerOption2.textContent = currentQuestion.answerOptions[1];
  answerOption3.textContent = currentQuestion.answerOptions[2];
  answerOption4.textContent = currentQuestion.answerOptions[3];

  
}

function checkAnswer() {
  let buttonContents = this.innerHTML;
  let realAnswer = questions[currentQuestionNumber].correctAnswer;

  if (buttonContents === realAnswer) {
    currentQuestionNumber ++;
    if (currentQuestionNumber < totalQuestionsNumber) {
      askQuestions();
    }
    else {
      currentQuestionNumber = 0;
      leaderboardLoad();
    }
  }
  else {
    alert("Wrong answer, try again");
  }

}

function leaderboardLoad() {
  questionScreen.setAttribute("class", "hide")

  leaderboardScreen.removeAttribute("class", "hide");
  leaderboardScreen.setAttribute("class", "positioning");

  scoresPlace.innerHTML = "";

  for (var i = 0; i < usersNames.length; i ++) {
    let usersName = usersNames[i];

    let li = document.createElement("li");
    li.textContent = usersName;
    scoresPlace.appendChild(li);
  }
}

function startOver() {
  leaderboardScreen.setAttribute("class", "hide");

  startScreen.removeAttribute("class", "hide")
  startScreen.setAttribute("class", "positioning")
}

usernameForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let usernameText = usernameInput.value.trim();

  if (usernameText === "") {
    return;
  }

  usersNames.push(usernameText);
  usernameInput.nodeValue = "";

  leaderboardLoad();
});

answerOption1.addEventListener("click", checkAnswer);
answerOption2.addEventListener("click", checkAnswer);
answerOption3.addEventListener("click", checkAnswer);
answerOption4.addEventListener("click", checkAnswer);

startOverButton.addEventListener("click", startOver);

startButton.addEventListener("click", startQuiz);









// function quizTimer() {
//   let timeLeft = 75;

//   let timeInterval = setIntervalZ(function () {
//     timerEl.textContent = timeLeft;
//     timeLeft--;

//     if (timeLeft === 0) {
//       timerEl.textContent = "";
//       speedRead();
//       clearInterval(timeInterval);
//     }

//   }, 1000);
// }

// startButton.addEventListener("click", function () {
//   timeInterval();
// })

