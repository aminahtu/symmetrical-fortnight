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

}

loadQuestion();