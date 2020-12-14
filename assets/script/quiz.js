const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const soundCorrect = new Audio("assets/sounds/yes.mp3");
const soundIncorrect = new Audio("assets/sounds/no.mp3");


/* 
 *  Declare Variables
 */
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

/* 
 *  Declare Questions
 */
let questions = [
    {
        question: "What Island does Father Ted live on?",
        option1: "Craggy",
        option2: "Rugged",
        option3: "Crabby",
        option4: "Ragged",
        answer: 1,
    },
    {
        question: "What drink does Mrs. Doyle like to make?",
        option1: "Coffee",
        option2: "Bloody Marys",
        option3: "Tea",
        option4: "Smoothies",
        answer: 3,
    },
    {
        question: "What big attraction did Funland have?",
        option1: "Rollercoaster",
        option2: "Water Slide",
        option3: "Haunted House",
        option4: "A Spider-Baby",
        answer: 4,
    },
    {
        question: "What did the 3 Priests all dress up as for the “All Priests Stars in Their Eyes Lookalike Competition”?",
        option1: "Mother Teresa",
        option2: "Elvis",
        option3: "The Pope",
        option4: "Boy George",
        answer: 2,
    },
    {
        question: "What was the winning number for the raffle to win the car?",
        option1: "22",
        option2: "33",
        option3: "44",
        option4: "11",
        answer: 4,
    },
    {
        question: "What does Jack drink before the over 75’s football match?",
        option1: "Windolene",
        option2: "Whiskey",
        option3: "Floor polish",
        option4: "Dreamy Sleepy Nighty Snoozy Snooze",
        answer: 4,
    },
    {
        question: "What song do Ted and Dougal sing in “Song for Ireland”?",
        option1: "My Lovely Horse",
        option2: "The Drums of Africa are calling me Home",
        option3: "The Miracle is Mine",
        option4: "Sha la la la la la la la la",
        answer: 1,
    },
    {
        question: "What was the name of Fargo Boyles sheep?",
        option1: "Chops",
        option2: "Chris",
        option3: "Wooly",
        option4: "The Beast",
        answer: 2,
    },
    {
        question: "Bishop Brennan's first name was?",
        option1: "Len",
        option2: "John Paul",
        option3: "Ben",
        option4: "Frank",
        answer: 1,
    },
    {
        question: "What does Dougal try to give up for lent?",
        option1: "Mass",
        option2: "Cigarettes",
        option3: "Alcohol",
        option4: "Rollerblading",
        answer: 4,
    },
    {
        question: "The Bomb will explode if the milk float goes under?",
        option1: "6mph",
        option2: "4mph",
        option3: "5mph",
        option4: "3mph",
        answer: 2,
    },
    {
        question: "Who does Noel Furlong add to his “List of Enemies”?",
        option1: "Nuala Ryan ",
        option2: "Gerry Fields",
        option3: "Tony Lynch",
        option4: "Janine Reilly",
        answer: 3,
    },
    {
        question: "Who is the hairy baby maker?",
        option1: "Pat Mustard",
        option2: "Eoin McLove",
        option3: "Dick Byrne ",
        option4: "Henry Sellers",
        answer: 1,
    },
    {
        question: "What does Dougal say the 'beast' has instead of a mouth?",
        option1: "5 Noses",
        option2: "A trunk",
        option3: "4 Arses",
        option4: "6 Eyes",
        answer: 3,
    },
    {
        question: "Which historical event did not happen on July 19th?",
        option1: "The Ice Age Ended",
        option2: "Galway liberated from Indians",
        option3: "The first priest on the moon",
        option4: "Marathon became snickers",
        answer: 3,
    },
];

/* 
 *  Declare Const
 */
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};


/* 
 *  Gets new random question from selection 
 */
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("results.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach((option) => {
        const number = option.dataset["number"];
        option.innerText = currentQuestion["option" + number];
    });


    /* 
 *  Removes used Question from next selection
 */
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

options.forEach((option) => {
    option.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];
/* 
 *  Applies class depending on result
 */
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedOption.parentElement.classList.add(classToApply);
/* 
 *  Applies class depending on result and plays sound
 */
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
            soundCorrect.play();
        } else if (classToApply === "incorrect") {
            soundIncorrect.play();
        }

/* 
 *  Allows time for sound to play before next answer can be pressed
 */
        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

/* 
 *  Adds to score
 */
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
