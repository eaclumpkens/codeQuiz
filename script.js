var backStatus = quizBody.dataset.status;
var bodyEl = document.body;
var scriptEl = document.querySelector("script");
var containerEl = document.querySelector(".container-fluid");

var questionNum = document.querySelector("#question-number");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector('#answer-container');

var score = 0;
var currentQuestion = 0;

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 60;
var secondsElapsed = 0;
var interval;
var initials;


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
    console.log(`Score: ${score}`);
    nextQuestion();
}

function getPreviousScore() {
    var scoreData = JSON.parse(localStorage.getItem("scoreData"));

    if (scoreData) {
        if (scoreData.previousInitials) {
            prevName.textContent = "Previous Score: " + scoreData.previousInitials;
        }

        if (scoreData.previousScore) {
            prevScore.textContent = scoreData.previousScore;
        }
    } else {
        prevName.textContent = "no data";
        prevScore.textContent = "-";
    }
}

function setPreviousScore() {
    localStorage.setItem(
        "scoreData",
        JSON.stringify({
            previousInitials: initials.value.trim(),
            previousScore: score
        })
    );
}

function gameOver() {
    clearInterval(interval);
    containerEl.remove();

    // MODAL BUTTON ELEMENTS
    var newCont = document.createElement("main");
    newCont.classList.add("container-fluid");
    bodyEl.insertBefore(newCont,scriptEl);

    var scoreDiv = document.createElement("div");
    scoreDiv.classList.add("row");
    newCont.appendChild(scoreDiv);

    var finalText = document.createElement("h2");
    var finalScore = document.createElement("h3");
    finalText.classList.add("col-md-6");
    finalScore.classList.add("col-md-6");
    finalText.textContent = "GAME OVER";
    finalScore.textContent = `Final Score: ${score}`;

    scoreDiv.appendChild(finalText);
    scoreDiv.appendChild(finalScore);

    var buttonDiv = document.createElement("div");
    buttonDiv.classList.add("row");
    newCont.append(buttonDiv);

    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.classList.add("btn", "btn-warning", "col-md-12");
    buttonEl.setAttribute("href", "");
    buttonEl.textContent = "Submit Score";

    buttonDiv.appendChild(buttonEl);

    buttonDiv.addEventListener("click", function() {
        
        buttonDiv.remove()
        
        var initDiv = document.createElement("div");
        initDiv.classList.add("row");
        newCont.append(initDiv);

        var space1 = document.createElement("div");
        var space2 = document.createElement("div");
        space1.classList.add("col-md-4");
        space2.classList.add("col-md-4");

        initials = document.createElement("input");
        initials.classList.add("col-md-4");
        initials.setAttribute("type", "text");
        initials.setAttribute("id", "name");
        initials.setAttribute("name", "user-initials");
        initials.setAttribute("minlength", "1");
        initials.setAttribute("maxlength", "3");
        initials.setAttribute("placeholder", "Input Initials");

        initDiv.appendChild(space1);
        initDiv.appendChild(initials);
        initDiv.appendChild(space2);

        initials.addEventListener("keyup", setPreviousScore);
        initials.addEventListener("change", setPreviousScore);

    });

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

// CALL FUNCTIONS

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
  
  function renderTime() {
    minutesDisplay.textContent = setMinutes();
    secondsDisplay.textContent = setSeconds();
  
    if (secondsElapsed >= totalSeconds) {
        gameOver();
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

//   EVENT LISTENER
answerEl.addEventListener("click", function(event) {   
    var answerChoice = event.target.textContent
    var correctAnswer = questions[currentQuestion]["correct"];

    console.log(answerChoice);
    checkAnswer(answerChoice, correctAnswer);
})


