// thse constants get the location of the divs to show or hide in the html 
const startScreen = document.getElementById("startDiv");
const questionScreen = document.getElementById("quizDiv");
const leaderboardScreen = document.getElementById("leaderboardDiv");

// this locates the start button from the html
const startButton = document.getElementById("startBtn");

// this locates areas where we will load questions and answers onto the screen in the html 
const questionPlace = document.getElementById("questionLocation");
const answerOption1 = document.getElementById("answerA");
const answerOption2 = document.getElementById("answerB");
const answerOption3 = document.getElementById("answerC");
const answerOption4 = document.getElementById("answerD");

// this locates where the user will enter their name and where it will be loaded
const usernameForm = document.getElementById("usersNameContainer");
const usernameInput = document.getElementById("usersNameInput");
const scoresPlace = document.getElementById("scoresList");

// this locates where the timer will be displayed for the user
const clock = document.getElementById("timer");

// this defines the total number of questions
const totalQuestionsNumber = questions.length;

// this sets the countdown timer based on how long of a quiz the user will be completeing
let countdownTimer = ((questions.length * 20) + 1);

// this is how much the timer will be reduced when a wrong answer is picked
let penalty = (questions.length * 3);

// this is where the final score will be loaded
let finalScore;

// this is how the program keeps track of what question the user is on
let currentQuestionNumber = 0;

// this holds all the usernames that should be loaded to the leaderboard, **replace with local storage**
let usersNames = [];

// this holds the winning score
let winScore;

let stopClock;

let playerScore = 0;

function startQuiz() {
  // resets the score for new runs
  winScore = 0;

  playerScore = 0;

  // this will hide the initial starting div
  startScreen.setAttribute("class", "hide");

  // this will uhide the questions div and keep the positiong
  questionScreen.classList.remove("hide");
  
  // this will start the function to populate the questions and answers
  askQuestions();
  
  // this will begin the function that counts down and moves the user to the leaderboard screen
  startTimer();
}

function startTimer() {
  let timerInterval = setInterval(function() {
    countdownTimer--;
    clock.textContent = countdownTimer;
    
    // if the timer hits 0 the player looses and is sent to the leaderboards screen
    if (countdownTimer <= 0) {
      clearInterval(timerInterval);
      leaderboardPageLoad();
    }

    if (stopClock === true) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// this function is what actually loads questions onto the screen
function askQuestions() {
  // this is how I know which question the user is currently on
  let currentQuestion = questions[currentQuestionNumber];

  // the title is pulled from the questions variable
  questionPlace.textContent = currentQuestion.questionTitle;
  
  // the answer buttons are loaded up individually with answers from the questions variable
  answerOption1.textContent = currentQuestion.answerOptions[0];
  answerOption2.textContent = currentQuestion.answerOptions[1];
  answerOption3.textContent = currentQuestion.answerOptions[2];
  answerOption4.textContent = currentQuestion.answerOptions[3];
}

// this function checks whether the answer picked was correct or not
function checkAnswer() {
  // the text in between the button tags will be loaded into this variable
  let buttonContents = this.innerHTML;
  
  // the correct answer is pulled from the questions object
  let realAnswer = questions[currentQuestionNumber].correctAnswer;

  // the button and actual answer is compared here
  if (buttonContents === realAnswer) {
    
    // if they match we and we arent on the last question load up the next question
    currentQuestionNumber ++;
    if (currentQuestionNumber < totalQuestionsNumber) {
      askQuestions();
    }
    
    // if they match and we are on the last question we go to the leaderbpard page
    else {
      currentQuestionNumber = 0;
      playerScore = clock.innerHTML;
      stopClock = true;
      leaderboardPageLoad();
    }
  }
  
  // if its the wrong question we reduce the timer and set the color of the timer to #red
  else {
    countdownTimer -= penalty;
    clock.setAttribute("class", "redAlert")
    turnRed();
  }
}

// this sets the color of the timer back to #black after 2 seconds
function turnRed() {
  setTimeout(function(){
    clock.classList.remove("redAlert");
  }, 1200);
}

// this hides the questions div and shows the leaderboard div
function leaderboardPageLoad() {

  

  questionScreen.setAttribute("class", "hide")

  leaderboardScreen.classList.remove("hide");  
}

// this fills out the leaderboard with the users name and current score and shows all previous scores
function leaderboardLoad() {
  

  for (var i = 0; i < usersNames.length; i ++) {
    let usersName = usersNames[i];
	
    let storedUsers = JSON.parsel(localStorage.getItem("scores"));
    
    let li = document.createElement("li");
    li.textContent = (storedUsers.userName + ": " + storedUsers.winningscore);
    scoresPlace.appendChild(li);
  }
}

// this listens for if the user has filled in the top score form
usernameForm.addEventListener("submit", function(event) {
  // this keeps the form from defaulting to its base html functionality
  event.preventDefault();

  // this is where we temporarily keep the users input
  let usernameText = usernameInput.value.trim();

  // this stops the user from being able to enter an empty string into the input
  if (usernameText === "") {
    return;
  }

  clock.innerHTML = "0";
  
  // this adds the input into the previous variable
  usersNames.push{
    usersName: usernameText,
  	winningScore: winScore
  };
  
  localStorage.setItem("scores", JSON.stringify(usersName));
  
  usernameInput.nodeValue = "";

  // this calls the function to add the name to the list
  leaderboardLoad();
  
  // after the user inputs their name we send them back to the start screen
  leaderboardScreen.setAttribute("class", "hide");

  startScreen.classList.remove("hide")
});

// these watch for the user to click on an answer button
answerOption1.addEventListener("click", checkAnswer);
answerOption2.addEventListener("click", checkAnswer);
answerOption3.addEventListener("click", checkAnswer);
answerOption4.addEventListener("click", checkAnswer);

// this watches for the user to click on the start button
startButton.addEventListener("click", startQuiz);
