var backStatus = quizBody.dataset.status;

var questionNum = document.querySelector("#question-number");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector('#answer-container');

var score = 0;
var currentQuestion = 0;

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 60;
var secondsElapsed = 0;


var questions = [
    {
        "question":"What does 'DOM' stand for?",
        "choices": ["Document Object Model","Direct Object Mode","Document Obstruct Method","Document Object Method"],
        "correct": "Document Object Model"
    }, 
    {
        "question":"Which is NOT considered to be one of the three major front-end programming languages?",
        "choices": ["JavaScript", "HTML", "Python","CSS"],
        "correct":"Python"
    }, 
    {
        "question":"Which is NOT one of GitHub's major functions?",
        "choices": ["Version Control","Code Editor","Collaboration", "Professional Portfolio"],
        "correct": "Code Editor"
    }];






// QUIZ FUNCTIONALITY

function renderQuestion() {
    var activeQuestion = questions[currentQuestion];  

    questionNum.textContent = `Question ${currentQuestion + 1}`;
    questionEl.textContent = activeQuestion["question"];
    
    for (var i = 0; i < activeQuestion.choices.length; i++) {
        if (currentQuestion === 0) {
            var newBut = document.createElement("button");

            newBut.classList.add("answer", "btn", "btn-choice", "col-md-12");
            newBut.setAttribute("id", `answer-${i}`)
            newBut.textContent = activeQuestion.choices[i];
            answerEl.append(newBut);
        } else {
            answerEl.children[i].textContent = activeQuestion.choices[i];
        }    
    }
    
}

function nextQuestion() {
    if (currentQuestion < questions.length-1) {
        currentQuestion++;
        renderQuestion();
    } else {
        gameOver();
    }
}

function checkAnswer(answerChoice, correctAnswer) {

    if (correctAnswer !== answerChoice) {
        totalSeconds -=5;  
        
    } else {
        score++;
    }
    console.log(score);
    nextQuestion();
}

function quizBackground() {
    var color1 = "#D79922"
    var color2 = "#EFE2BA"

    if (backStatus == "home") {
        document.body.style.background = color1;
        document.body.style.color = color2; 
    } if (backStatus == "quiz") {
        document.body.style.background = color2;
        document.body.style.color = color1;
    };
}

function startQuiz() {
    renderQuestion();
    startTimer();
}

quizBackground();
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

  function gameOver() {

  }
  
  function renderTime() {
    minutesDisplay.textContent = setMinutes();
    secondsDisplay.textContent = setSeconds();
  
    if (secondsElapsed >= totalSeconds) {
        // alert("Time's Up!");
        gameOver();
    }
  }
  
  function startTimer() {
    if (totalSeconds > 0) {
      interval = setInterval(function () {
        secondsElapsed++;
        renderTime();
      }, 1000)
    } else {
        gameOver();
    }
  }

//   EVENT LISTENERS

answerEl.addEventListener("click", function(event) {   
    var answerChoice = event.target.textContent
    var correctAnswer = questions[currentQuestion]["correct"];

    console.log(answerChoice);
    checkAnswer(answerChoice, correctAnswer);
})