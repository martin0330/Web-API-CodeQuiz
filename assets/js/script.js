// 1. create start button
// 2. timer starts and question presented
// 3. new question after answering 
// 4. inccorect answer = time subtracted
// 5. game over when all questions answered or timer reaches 0
// 6. save scores


var timeLeft = 60;
var timeMinus = 5;
var score = 0;
var startQuizButton = document.getElementById("start-quiz-button");
var timeScoreContainer = document.getElementById("time-score-container");
var startQuizContainer = document.getElementById("start-quiz-container");

var questions = [
    {
        title: "Which built-in method combines the text of two strings and returns a new string?",
        choices: ["Append()", "Concat()", "Attach()", "None"],
        answer: "Concat()"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", "<JavaScript>", "none"],
        answer: "<script>"
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "JavaScript is the same as Java",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "How can you add a comment in a JavaScript?",
        choices: ["'This is a comment'", "<!This is a comment>!", "#This is a comment", "//This is a comment"],
        answer: "//This is a comment"
    },
]


function startTimer() {
    var timer = setInterval(() => {
        document.getElementById("display-time-left").textContent= "Time Left: " + timeLeft + " sec"; 
        timeLeft--
    }, 1000);
}













function startQuiz() {
    startQuizContainer.className="hide";
    timeScoreContainer.classList.remove("hide");
    startTimer()

}

var getQuestions = function() {
    
}




startQuizButton.addEventListener("click", startQuiz)