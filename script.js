var backStatus = quizBody.dataset.status;
var questionEl = document.querySelector("#question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");

var score = 0;
var currentQuestion = 0;

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 60;
var secondsElapsed = 0;

quizBackground();

var q1 = {
    "question":"What does 'DOM' stand for?",
    "a1": "Document Object Model",
    "a2": "Direct Object Model",
    "a3": "Document Obstruct Method",
    "a4": "Document Object Method",
    "correct": "a1"
}

var q2 = {
    "question":"Which is NOT considered to be one of the three major front-end programming languages?",
    "a1": "JavaScript",
    "a2": "HTML",
    "a3":"Python",
    "a4": "CSS",
    "correct":"a3"
}

var q3 = {
    "question":"Which is NOT one of GitHub's major functions?",
    "a1": "Version Control",
    "a2": "Code Editor",
    "a3": "Collaboration",
    "a4": "Professional Portfolio",
    "correct": "a2"
}

var questions = [q1, q2, q3];

// QUIZ FUNCTIONALITY

function renderQuestion() {
    
    questionEl.textContent = questions[currentQuestion]["question"];
    answer1.textContent = questions[currentQuestion]["a1"];
    answer2.textContent = questions[currentQuestion]["a2"];
    answer3.textContent = questions[currentQuestion]["a3"];
    answer4.textContent = questions[currentQuestion]["a4"];

}

function startQuiz() {
    renderQuestion();
    startTimer();
}

function quizBackground() {
    var color1 = "#D79922"
    var color2 = "#EFE2BA"

    if (backStatus == "start") {
        document.body.style.background = color1;
        document.body.style.color = color2; 
    } if (backStatus == "quiz") {
        document.body.style.background = color2;
        document.body.style.color = color1;
    };
}

startQuiz();

// TIMER FUNCTIONALITY

function setMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft/60);
    var formattedMinutes;
  
    if (minutesLeft < 10) {
      formattedMinutes = "0" + minutesLeft;
    } else {
      formattedMinutes = minutesLeft;
    }
    return formattedMinutes;
  }
  
  function setSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
  }
  
  function renderTime() {
    minutesDisplay.textContent = setMinutes();
    secondsDisplay.textContent = setSeconds();
  
    if (secondsElapsed >= totalSeconds) {
        alert("Time's Up!");
        stopTimer();
    }
  }
  
  function startTimer() {
    if (totalSeconds > 0) {
  
      interval = setInterval(function () {
        secondsElapsed++;
        renderTime();
      }, 1000)
  
    } 
  }