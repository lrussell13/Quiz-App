const store = {
    view: "start",
    currentQuestion: 1,
    score: 0,
    rightOrWrong: "",
    currentSelectedAnswer: "",
    reviewMessage: "",
    wrongMessage: "",
    quizArr: [{
        question: "What is the name of Thor’s hammer?",
        answer: "Mjolnir",
        options: [
            "Vanir", 
            "Aesir",
            "Mjolnir",
            "Balder"
        ]
    },{
        question: "Where did Scott Lang work before becoming Ant-Man?",
        answer: "Baskin Robbins",
        options: [
            "Jamba Juice", 
            "Chipotle",
            "Mcdonald’s",
            "Baskin Robbins"
        ]
    },{
        question: "What is the name of the tape that Peter Quill listens to on his Walkman?",
        answer: "Awesome Mix Vol. 1",
        options: [
            "Awesome Mix Vol. 1", 
            "Great Tunes Vol. 1",
            "Pump Up Mix Vol. 2",
            "Awesome Songs Vol. 1"
        ]
    },{
        question: "What type of Giants appear in Thor?",
        answer: "Frost Giants",
        options: [
            "Storm Giants", 
            "Frost Giants",
            "Ice Giants",
            "Mountain Giants"
        ]
    },{
        question: "What Movie did Thanos first appear in?",
        answer: "Avengers",
        options: [
            "Thor Ragnarock", 
            "Captain America: Civil War",
            "Avengers",
            "Iron Man"
        ]
    },{
        question: "What is the name of the Super Soldier project that created Captain America?",
        answer: "Project Rebirth",
        options: [
            "Project Peagasus", 
            "Project Rebirth",
            "Project Avenger",
            "Project Zero Day"
        ]
    },{
        question: "What is the name of Star-Lords ship in Guardians of the Galaxy?",
        answer: "Milano",
        options: [
            "Milano", 
            "Jefferson Starship",
            "Freebird",
            "Starpath"
        ]
    },{
        question: "What is Agent Coulson’s real first name?",
        answer: "Phil",
        options: [
            "Agent", 
            "Paul",
            "Steve",
            "Phil"
        ]
    },{
        question: "What type of radiation turned Bruce Banner into the Hulk?",
        answer: "Gamma Radiation",
        options: [
            "Delta Radiation", 
            "Sigma Radiation",
            "Gamma Radiation",
            "Alpha Radiation"
        ]
    },{
        question: "What year did Captain America come out of his icey coma?",
        answer: "2011",
        options: [
            "2009", 
            "2010",
            "2011",
            "2012"
        ]
    },]
}

function handleStart(store) {
    $(".startQuiz").on("submit", function(event){
        event.preventDefault();
        store.view = "quiz";
        renderView(store);
    });
}

function handleSubmitAnswer(store) {
    $(".quiz").on("submit", function(event){
        event.preventDefault();
        getAnswer(store);
        checkAnswer(store);
        store.view = "quizAnswerReview";
        renderView(store);
    });
}

function handleSubmitNextQuestion(store){
    $(".submitNextQuestion").on("submit", function(event){
        if(store.currentQuestion < store.quizArr.length){
            console.log(store.currentQuestion)
            event.preventDefault();
            store.view = "quiz";
            incrementCurrentQuestion();
            renderView(store);
        } else {
            event.preventDefault();
            store.view = "review";
            checkScoreForReviewMessage(store);
            renderView(store);
        }
    });
}

function checkScoreForReviewMessage(store){
    if (store.score < 3){
        store.reviewMessage = "You should probably stick to the sidelines";
    } else if (store.score < 7){
        store.reviewMessage = "Maybe the sidekick life is the life for you";
    } else if (store.score < 10){
        store.reviewMessage = "You're becoming a powerful hero";
    } else {
        store.reviewMessage = "You are a true Avenger";
    }
}

function incrementCurrentQuestion(){
    store.currentQuestion++;
}

function getAnswer(store){
    store.currentSelectedAnswer = $("input[name='answer']:checked").val();
}

function checkAnswer(store){
    if(store.currentSelectedAnswer === store.quizArr[(store.currentQuestion) - 1].answer){
        store.score++;
        store.rightOrWrong = "You were right!";   
        store.wrongMessage = "";
    } else {
        store.rightOrWrong = "You were wrong.";
        store.wrongMessage = `The correct answer is ${store.quizArr[(store.currentQuestion) - 1].answer}`
    }
}

function handleRetakeQuiz() {
    $(".retakeQuiz").on("submit", function(event){
        store.view = "start";
        renderView(store);
    }); 
}

function determineTemplate(store){
    let template = "";
    if(store.view === "start"){
        template = 
        `<div class="containerStart">
            <h1>The Ultimate Marvel Cinematic Universe Quiz</h1>
            <h2>*No Avengers: Endgame Spoilers*</h2>
            <form class="startQuiz">
                <label>
                    <button type="submit" class="submit">Start Quiz</input>
                </label>
            </form>
        </div>
        <footer>
        </footer>`;
    } else if (store.view === "quiz"){
        template = 
        `
        <header role="banner"> 
        <ul>
            <li>Question: <span class="questionNumber">${store.currentQuestion}</span>/${store.quizArr.length}</li>
            <li>Score: <span class="score">${store.score}</span></li>
        </ul>
        </header>
        <div class="container">
            <h2 class="question">${store.quizArr[store.currentQuestion - 1].question}</h2>
            <form class="quiz">
                <fieldset>
                        <input type="radio" id="radio1" value="${store.quizArr[store.currentQuestion - 1].options[0]}" name="answer" required></input>
                        <label for="radio1" class="answerOption">${store.quizArr[store.currentQuestion - 1].options[0]}</label>
                        <input type="radio" id="radio2" value="${store.quizArr[store.currentQuestion - 1].options[1]}" name="answer" required></input>
                        <label for="radio2" class="answerOption">${store.quizArr[store.currentQuestion - 1].options[1]}</label>
                        <input type="radio" id="radio3" value="${store.quizArr[store.currentQuestion - 1].options[2]}" name="answer" required></input>
                        <label for="radio3" class="answerOption">${store.quizArr[store.currentQuestion - 1].options[2]}</label>
                        <input type="radio" id="radio4" value="${store.quizArr[store.currentQuestion - 1].options[3]}" name="answer" required></input>
                        <label for="radio4" class="answerOption">${store.quizArr[store.currentQuestion - 1].options[3]}</label>
                </fieldset>
                <label>
                    <input type="submit" class="quizSubmit"></input>
                </label>
            </form>
        </div>
        `;
    } else if (store.view === "quizAnswerReview"){
        template = 
        `
        <header role="banner"> 
        <ul>
            <li>Question: <span class="questionNumber">${store.currentQuestion}</span>/${store.quizArr.length}</li>
            <li>Score: <span class="score">${store.score}</span></li>
        </ul>
        </header>
        <div class="container">
            <h1>${store.rightOrWrong}</h1>
            <h2 class="question">${store.wrongMessage}</h2>
            <form class="submitNextQuestion">
                <label>
                    <input type="submit" class="quizSubmit"></input>
                </label>
            </form>
        </div>
        `;
    } else if (store.view === "review"){
        template = 
        `
        <div class="containerStart">
            <h1>${store.reviewMessage}</h1>
            <h2>You got ${store.score}/${store.quizArr.length} right</h2>
            <form class="retakeQuiz">
                <label>
                    <button type="submit" class="submit">Retake</input>
                </label>
            </form>
        </div>
        <footer>
        </footer>
        `;
    }
    return template;
}

function renderView(store) {
    $("body").html(determineTemplate(store));
    handleStart(store);
    handleSubmitAnswer(store);
    handleSubmitNextQuestion(store);
}

$(renderView(store));