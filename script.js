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

var answerChoice;
var correctAnswer;

var initials;
var prevInit;
var prevScore;

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
    },
    {
        "question":"Inside which HTML element do we put the JavaScript?",
        "choices": ["<scripting>","<script>","<javascript>", "<js>"],
        "correct": "<script>"
    },
    {
        "question":"Where is the correct place to insert a JavaScript",
        "choices": ["The <head> section","The <body> section","Both are correct", "Neither are correct"],
        "correct": "The <body> section"
    }
];

// QUIZ FUNCTIONALITY

function renderQuestion() {
    var activeQuestion = questions[currentQuestion];  

    questionNum.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
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

function checkAnswer() {

    if (correctAnswer !== answerChoice) {
        totalSeconds -=5;  
        alert(`Oops - Wrong Answer. The correct answer is ${correctAnswer}.`);
        
    } else {
        score++;
        alert("Correct - Nice Job!");
        
    }

    nextQuestion();
}

function getPreviousScore() {
    var scoreData = JSON.parse(localStorage.getItem("scoreData"));

    if (scoreData) {
        if (scoreData.previousInitials) {
            prevInit.textContent = "Previous Score: " + scoreData.previousInitials;
        }

        if (scoreData.previousScore) {
            prevScore.textContent = scoreData.previousScore;
        }
    } else {
        prevInit.textContent = "Previous Score: ---";
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

    var finalScore = document.createElement("h2");
    var space1 = document.createElement("div");
    space1.classList.add("col-md-4");

    var finalText = document.createElement("h2");
    finalText.classList.add("col-md-4");
    finalScore.classList.add("col-md-4");
    finalText.textContent = "GAME OVER";
    finalScore.textContent = `Final Score: ${score}`;

    scoreDiv.appendChild(finalText);
    scoreDiv.appendChild(space1);
    scoreDiv.appendChild(finalScore);

    var prevDiv = document.createElement("div");
    prevDiv.classList.add("row");
    
    newCont.appendChild(prevDiv);

    var space2 = document.createElement("div")
    space2.classList.add("col-md-4");

    prevInit = document.createElement("h3");
    prevScore = document.createElement("h3");
    prevInit.classList.add("col-md-6");
    prevScore.classList.add("col-md-2");

    prevDiv.appendChild(prevInit);
    prevDiv.appendChild(space2);
    prevDiv.appendChild(prevScore);

    getPreviousScore();

    var buttonDiv = document.createElement("div");
    buttonDiv.classList.add("row");
    newCont.append(buttonDiv);

    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.classList.add("btn", "btn-success", "col-md-12");
    buttonEl.setAttribute("href", "");
    buttonEl.textContent = "Submit Score";

    buttonDiv.appendChild(buttonEl);
    
    buttonDiv.addEventListener("click", getPreviousScore);
    buttonDiv.addEventListener("click", function() {
        buttonDiv.remove()
        
        var initDiv = document.createElement("div");
        initDiv.classList.add("row");
        newCont.append(initDiv);

        var space3 = document.createElement("div");
        var space4 = document.createElement("div");
        space3.classList.add("col-md-1");
        space4.classList.add("col-md-1");

        initials = document.createElement("input");
        initials.classList.add("col-md-10");
        initials.setAttribute("type", "text");
        initials.setAttribute("id", "name");
        initials.setAttribute("name", "user-initials");
        initials.setAttribute("minlength", "1");
        initials.setAttribute("maxlength", "3");
        initials.setAttribute("placeholder", "Input Initials");

        initDiv.appendChild(space3);
        initDiv.appendChild(initials);
        initDiv.appendChild(space4);

        initials.addEventListener("keyup", setPreviousScore);
        initials.addEventListener("change", setPreviousScore);

        var reloadDiv = document.createElement("div");
        reloadDiv.classList.add("row");
        newCont.append(reloadDiv);

        var space5 = document.createElement("div");
        var space6 = document.createElement("div");
        space5.classList.add("col-md-1");
        space6.classList.add("col-md-1");

        var linkEl = document.createElement("a")
        linkEl.setAttribute("href", "./index.html");
        linkEl.classList.add("col-md-10");

        var reloadBut = document.createElement("button");
        reloadBut.classList.add("btn", "btn-success", "col-md-10")
        reloadBut.setAttribute("type", "button");
        reloadBut.textContent = "Replay";

        reloadDiv.appendChild(space5);
        reloadDiv.appendChild(linkEl);
        linkEl.appendChild(reloadBut);
        reloadDiv.appendChild(space6);
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
    answerChoice = event.target.textContent
    correctAnswer = questions[currentQuestion]["correct"];
    
    checkAnswer(answerChoice, correctAnswer);
})


