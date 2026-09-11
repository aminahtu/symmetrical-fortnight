const quizData = [
    {
        question:"What does DOM stand for?",
        options:[
            "Document Object Model",
            "Data Object Management",
            "Digital Outline Method",
            "Dynamic Operation Matrix"
        ],
        answer: 0
    },
    {
        question:"Which method selects by ID in JavaScript?",
        options:[
            "querySelector()",
            "getElementsByClassName()",
            "getElementById()",
            "getElementsByTagName()"
        ],
        answer: 2
    },
    {
        question:"Which of the following is NOT a JavaScript data type?",
        options:[
            "String",
            "Number",
            "Boolean",
            "Character"
        ],
        answer: 3
    }
];

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtnElement = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(index){
    const q = questions[currentQuestions];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach( btn => btn.disabled = true);

    if(index === q.correct) {
        score++;
        buttons[index].classList.add("correct");
    
    } else {
        buttons[index].classList.add("incorrect");
        buttons[q.correct].classList.add("correct");

     nextBtn.style.display = "inline-block";
    }

    nextBtn.addEventListener("click", () => {
        currentQuestion++;

        if(currentQuestion < question.length) {
            loadQuestion();
        } else {
            showResult();
        }
    })

    function showResult() {
        nextBtn.style.display = "none";
        const highScore = localStorage.getItem("quizHighScore") || 0;

        const isNew = score > highScore;

        if(isNew) {
            localStorage.setItem("quizHighScore", score);
        }

        resultElement.innerHTML = `
        <h2>Hurray!!! Quiz Completed</h2>
        <p>You have scored ${score} out of ${questions.length}</p>
        <p>Highest score: ${Math.max(score, highScore)}</p>
        ${isNew ? `<p>Hey, New High Score!</p>` : ""}
        <button onclick="location.reload()">Restart</button>
        `
    }
}


loadQuestion();