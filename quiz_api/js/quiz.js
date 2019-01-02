let correctAnswer,
    correctNumber = localStorage.getItem("quiz_game_correct") ? localStorage.getItem("quiz_game_correct") : 0 ,
    incorrectNumber = localStorage.getItem("quiz_game_incorrect") ? localStorage.getItem("quiz_game_incorrect") : 0;

document.addEventListener("DOMContentLoaded", e => {
    loadQuestion();

    eventListeners();
});

function eventListeners() {
    document.getElementById("check-answer").addEventListener("click", validateAnswer);
    document.getElementById("clear-storage").addEventListener("click", clearStorage);
}

function loadQuestion() {
    getQuestion()
    .then(question => {
        displayQuestion(question);
    });
} 

async function getQuestion() {
    const response = await fetch("https://opentdb.com/api.php/?amount=1");
    const data = await response.json();
    return data.results[0];
}

function displayQuestion(question) {
    const questionHTML = document.createElement("div");
    questionHTML.classList.add("col-12");
    
    //construct the array with all the answers
    const answers = question.incorrect_answers;
    correctAnswer = question.correct_answer;
    answers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);

    //generate the html for the question
    questionHTML.innerHTML =
        `
        <div class="row justify-content-between heading>
            <p class="category">Category: ${question.category}</p>
            <div class="totals">
                <span class="badge badge-success">${correctNumber}</span>
                <span class="badge badge-danger">${incorrectNumber}</span>
            </div>
        </div>
        <h2 class="text-center">${question.question}</h2>
        `;

    //generate the HTML for the answers
    const answersDiv = document.createElement("div");
    answersDiv.className = "questions row justify-content-around mt-4";
    answers.forEach(answer => {
        const answerHTML = document.createElement("li");
        answerHTML.className = "col-12 col-md-5";
        answerHTML.textContent = answer;
        //event listener, listening to clicks on an answer
        answerHTML.onclick = selectAnswer;
        answersDiv.appendChild(answerHTML);
    });

    questionHTML.appendChild(answersDiv);
    document.querySelector("#app").appendChild(questionHTML);
}

function selectAnswer(e) {
    if(document.querySelector("#app .questions .active")) {
        const activeAnswer = document.querySelector("#app .questions .active");
        activeAnswer.classList.remove("active");
    }

    e.target.classList.add("active");
}

function validateAnswer() {
    if(document.querySelector("#app .questions .active")) {
        const answer = document.querySelector("#app .questions .active").textContent;
        checkAnswer(answer === correctAnswer);
    }
    else {
        const errorDiv = document.createElement("div");
        errorDiv.className = "col-6 alert alert-danger text-center";
        errorDiv.textContent = "Please select an answer";
        document.querySelector(".questions").appendChild(errorDiv);
        setTimeout( () => {
            errorDiv.remove();
        }, 3000);
    }
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        correctNumber++;
    }
    else {
        incorrectNumber++;
    }

    saveIntoStorage()

    const app = document.querySelector("#app");
    while(app.firstChild) {
        app.removeChild(app.firstChild);
    }

    loadQuestion();
} 

function saveIntoStorage() {
    localStorage.setItem("quiz_game_correct", correctNumber);
    localStorage.setItem("quiz_game_incorrect", incorrectNumber);
}

function clearStorage() {
    localStorage.clear();
    
    setTimeout(() => {
        window.location.reload();
    }, 200);

}