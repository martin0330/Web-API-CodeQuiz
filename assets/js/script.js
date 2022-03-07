// 1. create start button
// 2. timer starts and question presented
// 3. new question after answering 
// 4. inccorect answer = time subtracted
// 5. game over when all questions answered or timer reaches 0
// 6. save scores


var timerEl = document.getElementById('countdown');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer');
var checkEl = document.getElementById('check-display');
var formDiv = document.getElementById('score-entry');
var formEl = document.getElementById('hs-form');
var submitBtn = document.getElementById('submit-btn');
var scoreDiv = document.getElementById('high-scores');
var timeLeft = 60;
timerEl.textContent = timeLeft;
var questionCount = 0;

// questions
var questionsArr = [
    {
        question: "Which built-in method combines the text of two strings and returns a new string?",
        answer: ["Append()", "Concat()", "Attach()", "None"],
        correct: "Concat()"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: ["'< script >'", "'< js >'", "'< JavaScript >'", "none"],
        correct: "'< script >'"
    },
    {
        question: "What can go in an array?",
        answer: ["Numbers", "Strings", "Objects", "All of the above"],
        correct: "All of the above"
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answer: ["'This is a comment'", "< !This is a comment >!", "#This is a comment", "//This is a comment"],
        correct: "//This is a comment"
    },
    {
        question: "JavaScript is the same as Java",
        answer: ["True", "False"],
        correct: "False"
    }
];

// array to store high scores
var highScores = [];

// timer function
function countdown() {
    if (!timer) {
        var timer = setInterval(function() {
            timerEl.textContent = timeLeft;
            timeLeft--;
            if (timeLeft < 1) {
                clearInterval(timer);
                timerEl.textContent = 0;
                endGame();
            }
            // stop count down if game over
            if (questionCount > questionsArr.length - 1) {
                clearInterval(timer);
            }
        }, 1000)
    }
}

// start the game
function startGame() {
    // start count down
    countdown();
    // call for next (first) question
    nextQuestion();
}

// next question
function nextQuestion() {
    // set make variables easier
    var currentQ = questionsArr[questionCount];
    // check if questioncount less than questions array.length
    if (questionCount < questionsArr.length) {
        // push question into q div
        questionEl.textContent = currentQ.question
        // set up for answers array
        answerEl.textContent = "";
        var answerList = document.createElement("ul");
        answerEl.appendChild(answerList);
        // show answers as buttons
        for (var i = 0; i < currentQ.answer.length; i++) {
            var answerListItem = document.createElement("li");

            var answerButton = document.createElement("button");
            answerButton.className = "answer"
            answerButton.setAttribute("name", "answer");
            answerButton.setAttribute("value", currentQ.answer[i]);
            answerButton.innerHTML = currentQ.answer[i];
       
            answerListItem.appendChild(answerButton);
            answerList.appendChild(answerListItem); 
        }
    } else {
        // ends game when there are no more questions
        endGame();
    }
}

// check if answer is correct
function checkAnswer(answer) {
    var currentQ = questionsArr[questionCount];
    // if correct, say correct & call next question
    if (answer.value == currentQ.correct) {
        checkEl.textContent = "Correct!";
    } else if (answer.value !== currentQ.correct) {
    // if incorrect, deduct 10s, say wrong, call next question
        checkEl.textContent = "Wrong!";
        timeLeft -= 10;
    }
}

// end the game
function endGame() {
    var score = timeLeft;
    answerEl.textContent = "";
    checkEl.textContent = "";
    questionEl.textContent = "Game over! Your score was: " + score;
    // display the form to get name for score
    formDiv.style.display = "block";
}

// save scores -- push to array, save to local
function saveHighScores() {
    formDiv.style.display = "none";
    //get name somehow?
    var name = formEl.value;
    var score = timeLeft;

    if (!name) {
        alert("Please enter a name first!");
        return endGame();
    }

    // saves name & score to an object & pushes to array
    var hsObject = {
        name: name,
        score: score
    }
    highScores.push(hsObject);

    // change to string & save to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
}

// show the high scores
function displayHighScores() {
    checkScores();
    questionEl.textContent = "High Scores";
    answerEl.textContent = "";
    var scoreList = document.createElement("ul");
    answerEl.appendChild(scoreList);
    for (var i = 0; i < highScores.length; i++) {
        var currentScore = highScores[i];
        var currentScoreItem = document.createElement("li");
        currentScoreItem.textContent = currentScore.name + " ..... " + currentScore.score;
        scoreList.appendChild(currentScoreItem);
    }
    // resets defaults for replays
    timeLeft = 60;
    questionCount = 0;

    var againBtn = document.createElement("button");
    againBtn.className = "start-btn";
    againBtn.textContent = "Play again";
    answerEl.appendChild(againBtn);
}

// figures out what was clicked
var answerButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        // starts game if it's the start button
        startGame();
    } else if (targetEl.matches(".answer")) {
        // checks answer and moves to next question if it was an answer
        checkAnswer(targetEl);
        questionCount++;
        nextQuestion();
    }
}

// checks to see if any scores exist in local storage
function checkScores() {
    var savedScores = localStorage.getItem("highScores");
    if (!savedScores) {
        return false;
    }
    highScores = JSON.parse(savedScores);
}

checkScores();

// event listeners
answerEl.addEventListener("click", answerButtonHandler);
submitBtn.addEventListener("click", saveHighScores);
scoreDiv.addEventListener("click", displayHighScores);