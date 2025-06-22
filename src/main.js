import { itQuiz } from "/src/data.js";

const questionElement = document.getElementById("questions");
const answersElement = document.getElementById("answerBtns");
const nextElement = document.getElementById("nextBtn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
};

function showQuestion(){
    resetState();
    const currentQuestion = itQuiz[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.className = "Btn border-1 p-3 rounded-md hover:bg-neutral-300 text-left";
        answersElement.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextElement.style.display = "none";
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild);
    }
};

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("bg-green-400");
        score++;
    } else{
        selectedBtn.classList.add("bg-red-400");
        score--;
    };
    Array.from(answersElement.children).forEach(button => {
        if (button.dataset.correct == "true"){
            button.classList.add("bg-green-400")
        }
        button.classList.remove("hover:bg-neutral-300")
        button.disabled = true;
        
    });
    nextElement.style.display = "block";
};

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${itQuiz.length}`;
    nextElement.innerHTML = "Play Again!";
    nextElement.style.display = "block";
};

function handleNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < itQuiz.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextElement.addEventListener("click", ()=>{
    if (currentQuestionIndex < itQuiz.length){
        handleNextBtn();
    } else {
        startQuiz();
    }  
});

startQuiz();