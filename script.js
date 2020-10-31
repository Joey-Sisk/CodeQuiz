let questions = [
    ["question 1", "This is where the question will live", ["answer 1", "answer 2", "answer 3", "answer 4"]],
    ["question 2", "This is where the question will live", ["answer 1", "answer 2", "answer 3", "answer 4"]],
    ["question 3", "This is where the question will live", ["answer 1", "answer 2", "answer 3", "answer 4"]],
    ["question 4", "This is where the question will live", ["answer 1", "answer 2", "answer 3", "answer 4"]]
  ]

  /* var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
]; */
  
  let startButton = document.querySelector("#startQuiz");
  
  let finalScore;
  
  let displayQuestion = document.createElement();
  
  function quizTimer() {
    let timeLeft = 75;
  
    let timeInterval = setInterval(function() {
      timerEl.textContent = timeLeft;
      timeLeft--;
  
      if (timeLeft === 0) {
        timerEl.textContent = "";
        speedRead();
        clearInterval(timeInterval);
      }
  
    }, 1000);
  }
  
  startButton.addEventListener("click", function() {
      timeInterval();  
  })