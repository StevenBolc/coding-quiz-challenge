var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert = document.getElementById("alert");
var title = document.getElementById("title");
var info = document.getElementById("info");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));

//adds functionality to start quiz button
btnStart.addEventListener("click", startQuiz);


function startQuiz() {
    //adds score tally    
    if (storedScores !== null) {
        allScores = storedScores;
    }
    //keeps info from displaying on seperate pages
    title.classList.add("d-none");
    info.classList.add("d-none");
    btnStart.classList.add("d-none");
    timecounter.classList.remove("d-none");
    quizQuestions.classList.remove("d-none");
    // pulls info from questions.js
    nextQuestions = questions[currentindex];
    console.log(nextQuestions.title);
    // displays questions.js  
    displayQuestion(nextQuestions);

    gametime();
}

// adds functionality to the submit score button
btnScore.addEventListener("click", function () {
    let name = document.getElementById("inputScore").value
    scorePage(name, count);
});

// Time set
function gametime() {

    var timeinterval = setInterval(function () {
        timer.innerText = count
        count--;
    }, 1000);

}

// sets scores
function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}
// pulls styling from HTML and displays on questions page
function displayQuestion(question) {
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}

// gives questions functionality
function displaynextQuestion(next) {
    currentindex++
    if (currentindex < questions.length) {
        correction(next.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex]
            displayQuestion(nextQuestions)
        } else {
            currentindex = 0
            displayQuestion(nextQuestions)
        }

    } else {
        console.log("endgame")
        endgame()


    }

    // adds responses for question answers
}
function correction(response) {

    if (response) {
        alert.innerText = "Correct!"
        console.log("Correct!")
    } else {
        alert.innerText = "Wrong!"
        count = count - 15
        timer.innerHTML = count
        console.log("Wrong!")

    }
    setTimeout(function () {
        alert.innerText = ""

    }, 1000);

}
function endgame() {
    myScore.innaText = count
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


}