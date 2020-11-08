// location of the divs to show or hide in the html 
const startScreen = document.getElementById("startDiv");
const questionScreen = document.getElementById("quizDiv");
const leaderboardScreen = document.getElementById("leaderboardDiv");

// start button from the html
const startButton = document.getElementById("startBtn");

// areas where we will load questions and answers onto the screen in the html 
const questionPlace = document.getElementById("questionLocation");
const answerOption1 = document.getElementById("answerA");
const answerOption2 = document.getElementById("answerB");
const answerOption3 = document.getElementById("answerC");
const answerOption4 = document.getElementById("answerD");

// input and output locations
const usernameForm = document.getElementById("usersNameContainer");
const usernameInput = document.getElementById("usersNameInput");
const scoresPlace = document.getElementById("scoresList");

// where the timer will be displayed for the user
const clock = document.getElementById("timer");

// total number of questions
const totalQuestionsNumber = questions.length;

// set the countdown timer based on how long of a quiz the user will be completeing
let countdownTimer = ((questions.length * 20) + 1);

// how much the timer will be reduced when a wrong answer is picked
let penalty = (questions.length * 3);

// where the final score will be loaded
let finalScore;

// how the program keeps track of what question the user is on
let currentQuestionNumber = 0;

// all the usernames that should be loaded before local storage
let usersNames = [];

// this holds the winning score
let winScore;

// tracks whether the clock is stopped or not
let stopClock;

// temporary storage for user input
let currentStorage = [];

function startQuiz() {
  // resets the score for new runs
  winScore = 0;

  // hide the initial starting div
  startScreen.setAttribute("class", "hide");

  // uhide the questions div and keep the positiong
  questionScreen.classList.remove("hide");
  
  //start the function to populate the questions and answers
  askQuestions();

  // begin the function that counts down and moves the user to the leaderboard screen
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

// this actually loads questions onto the screen
function askQuestions() {
  // how we know which question the user is currently on
  let currentQuestion = questions[currentQuestionNumber];

  // title is pulled from the questions variable
  questionPlace.textContent = currentQuestion.questionTitle;
  
  // answer buttons are loaded up individually with answers from the questions variable
  answerOption1.textContent = currentQuestion.answerOptions[0];
  answerOption2.textContent = currentQuestion.answerOptions[1];
  answerOption3.textContent = currentQuestion.answerOptions[2];
  answerOption4.textContent = currentQuestion.answerOptions[3];
}

// check whether the answer picked was correct or not
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
      winScore = clock.innerHTML;
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

// set the color of the timer back to #black after 2 seconds
function turnRed() {
  setTimeout(function(){
    clock.classList.remove("redAlert");
  }, 1200);
}

// hide the questions div and shows the leaderboard div
function leaderboardPageLoad() {

  questionScreen.setAttribute("class", "hide")

  leaderboardScreen.classList.remove("hide");  
}

// fill out the leaderboard with the users name and current score and shows all previous scores
function leaderboardLoad() {
  while (scoresPlace.firstChild) {
        scoresPlace.removeChild(scoresPlace.firstChild);
  }
  
  // convert the local memory to an object
  let storedUsers = JSON.parse(localStorage.getItem("scores"));

  // run through the objects in storage and print to the storedUsers ul
  for (var i = 0; i < storedUsers.length; i ++) {
    let li = document.createElement("li");
    
    // builds the list items
    li.textContent = (storedUsers[i].usersName + ": " + storedUsers[i].winningScore);
    scoresPlace.appendChild(li);
  }
}

// listen for if the user has filled in the top score form
usernameForm.addEventListener("submit", function(event) {
  // keep the form from defaulting to its base html functionality
  event.preventDefault();

  // we temporarily keep the users input
  let usernameText = usernameInput.value.trim();

  // stop the user from being able to enter an empty string into the input
  if (usernameText === "") {
    return;
  }

  // reset the timer display
  clock.innerHTML = "0";

  // add the input into the previous variable
  usersNames = {
    usersName: usernameText,
  	winningScore: winScore
  };
  
  // either create a local storage place or load the one thats already there
  currentStorage = JSON.parse(localStorage.getItem("scores")) || [];

  // add the new user inputs to the list
  currentStorage.push(usersNames);

  // replace the storage with the old list plus the new input
  localStorage.setItem("scores", JSON.stringify(currentStorage));
  
  // clear out usernameInput
  usernameInput.nodeValue = "";

  // reset the timer
  countdownTimer = ((questions.length * 20) + 1);

  // reset the question number
  currentQuestionNumber = 0;

  // allow the clock to start again
  stopClock = false;

  // this calls the function to add the name to the list
  leaderboardLoad();

  // go back to the start screen
  startScreenLoad();
});

function startScreenLoad() {

  leaderboardScreen.setAttribute("class", "hide");

  startScreen.classList.remove("hide");
}

// these watch for the user to click on an answer button
answerOption1.addEventListener("click", checkAnswer);
answerOption2.addEventListener("click", checkAnswer);
answerOption3.addEventListener("click", checkAnswer);
answerOption4.addEventListener("click", checkAnswer);

// this watches for the user to click on the start button
startButton.addEventListener("click", startQuiz);
