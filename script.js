// Array - Questions

var questions = [
    {
      title: "What gas makes voices sound higher when inhaled?",
      choices: ["Oxigen", "Nitrogen", "Helium", "Sulfur Hexafluoride"],
      answer: "Helium"
    },
    {
      title: "Who was the first woman to fly solo across the Atlantic?",
      choices: ["Geraldine Ferraro", "Sally Ride", "Amelia Earhart", "Bessie Coleman"],
      answer: "Amelia Earhart"
    },
    {
      title: "What is the first letter of the Greek alphabet?",
      choices: ["Alpha", "Omega", "Zed", "E"],
      answer: "Alpha"
    },
    {
      title: "Which biblical figure built an ark?",
      choices: ["Moses", "Abraham", "David", "Noah"],
      answer: "Noah"
    },
    {
      title:"Which instrument does not have strings?",
      choices: ["Guitar", "Trombone", "Bass", "Cello"],
      answer: "Trombone"
    }
  ];

// DOM
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Timer 5 Question by 10 = 50sec
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// Functions
// Start Quiz
function startQuiz() {

    var startScreenEl = document.getElementById("start-screen");
    //Hide Start Screen
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
  
    getQuestion();
  }


  // Get Quetsions from Array
  function getQuestion() {
    
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    
    titleEl.textContent = currentQuestion.title;
  
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }


  // Time > Answers, correct or wrong?
  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
    
      if (time < 0) {
        time = 0;
      }
  
      // New time on page
      timerEl.textContent = time;
  
    feedbackEl.textContent = "Nope!";
    } else {  
      feedbackEl.textContent = "Yes!";
    }
  
    // Feedback Text Time
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 800);
  
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }


  // Quiz End
  function quizEnd() {
  
    clearInterval(timerId);
  
    // Show End Screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      quizEnd();
    }
  }

  // Save Score Local storage and User
  function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: time,
        initials: initials
      };
  
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "highscores.html";
    }
  }
  
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  

  submitBtn.onclick = saveHighscore;
  
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;
