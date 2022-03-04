// 1. create start button
// 2. timer starts and question presented
// 3. new question after answering 
// 4. inccorect answer = time subtracted
// 5. game over when all questions answered or timer reaches 0
// 6. save scores


var timeLeft = 60;
var score = 0;
var startQuizButton = document.getElementById("start-quiz-button");
var timeScoreContainer = document.getElementById("time-score-container");
var startQuizContainer = document.getElementById("start-quiz-container");


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




startQuizButton.addEventListener("click", startQuiz)