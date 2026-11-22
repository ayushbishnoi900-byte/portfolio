// ===================================
// 1. DARK / LIGHT THEME TOGGLE
// ===================================

const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    // Change button text
    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "Dark Mode";
    } else {
        themeButton.textContent = "Light Mode";
    }

});


// ===================================
// 2. QUIZ QUESTIONS
// ===================================

const questions = [

    {
        question: "Which language is used for web development?",
        options: ["Python", "JavaScript", "C", "Java"],
        answer: "JavaScript"
    },

    {
        question: "Which HTML tag creates a heading?",
        options: ["p", "h1", "div", "img"],
        answer: "h1"
    },

    {
        question: "Which CSS property changes text color?",
        options: ["font", "background", "color", "size"],
        answer: "color"
    },

    {
        question: "Which keyword declares a variable?",
        options: ["let", "print", "echo", "display"],
        answer: "let"
    },

    {
        question: "Which method selects an HTML element?",
        options: ["getElementById", "console.log", "alert", "push"],
        answer: "getElementById"
    }

];


// ===================================
// 3. QUIZ VARIABLES
// ===================================

let currentQuestion = 0;
let score = 0;
let answered = false;


// Get HTML elements

const questionElement = document.getElementById("question");

const optionsElement = document.getElementById("options");

const nextButton = document.getElementById("nextBtn");

const resultElement = document.getElementById("result");


// ===================================
// 4. DISPLAY QUESTION
// ===================================

function showQuestion() {

    answered = false;

    resultElement.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent = "Next Question";

    // Display question
    questionElement.textContent =
        `${currentQuestion + 1}. ${questions[currentQuestion].question}`;

    // Clear previous options
    optionsElement.innerHTML = "";

    // Create answer buttons
    questions[currentQuestion].options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("quiz-option");

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);

    });

}


// ===================================
// 5. CHECK ANSWER
// ===================================

function checkAnswer(selectedButton, selectedAnswer) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions = document.querySelectorAll(".quiz-option");

    // Check selected answer
    if (selectedAnswer === correctAnswer) {

        score++;

        selectedButton.classList.add("correct");

        resultElement.textContent = "Correct Answer! 🎉";

    } else {

        selectedButton.classList.add("incorrect");

        resultElement.textContent = "Wrong Answer! ❌";

    }

    // Highlight correct answer
    allOptions.forEach(button => {

        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

    });

    nextButton.disabled = false;

}


// ===================================
// 6. NEXT QUESTION
// ===================================

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

}


// ===================================
// 7. SHOW FINAL RESULT
// ===================================

function showResult() {

    questionElement.textContent = "Quiz Completed! 🎉";

    optionsElement.innerHTML = "";

    resultElement.textContent =
        `Your Score: ${score} / ${questions.length}`;

    nextButton.textContent = "Restart Quiz";

}


// ===================================
// 8. RESTART QUIZ
// ===================================

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    showQuestion();

}


// ===================================
// 9. NEXT BUTTON EVENT
// ===================================

nextButton.addEventListener("click", () => {

    if (currentQuestion === questions.length - 1 && answered) {

        restartQuiz();

    } else {

        nextQuestion();

    }

});


// ===================================
// 10. START QUIZ
// ===================================

showQuestion();