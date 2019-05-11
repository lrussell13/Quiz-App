const store = {
    view: "start",
    currentQuestion: 1,
    score: 0,
    rightOrWrong: "",
    currentSelectedAnswer: "",
    reviewMessage: "",
    ifWrongMessage: "",
    quizArr: [{
        question: "What is the name of Thor’s hammer?",
        answer: "Mjolnir",
        fact: "Mjolnir was made out of Asgardian metal in a magical forge at the heart of a dying star.",
        options: [
            "Vanir", 
            "Aesir",
            "Mjolnir",
            "Balder"
        ]
    },{
        question: "Where did Scott Lang work before becoming Ant-Man?",
        answer: "Baskin Robbins",
        fact: "Following his release from San Quentin, Scott Lang searched for a job in order to provide financially for his family, only to have his criminal record preventing him from finding one. Adopting the fake identity of Jack, he obtained a job at a Baskin-Robbins shop in San Francisco.",
        options: [
            "Jamba Juice", 
            "Chipotle",
            "Mcdonald’s",
            "Baskin Robbins"
        ]
    },{
        question: "What is the name of the tape that Peter Quill listens to on his Walkman?",
        answer: "Awesome Mix Vol. 1",
        fact: "As he explains it, the songs on Awesome Mix Vol. 1 are a collection of his mother’s favorite tunes from growing up in the 1970s.",
        options: [
            "Awesome Mix Vol. 1", 
            "Great Tunes Vol. 1",
            "Pump Up Mix Vol. 2",
            "Awesome Songs Vol. 1"
        ]
    },{
        question: "What type of Giants appear in Thor?",
        answer: "Frost Giants",
        fact: `"From a realm of cold and darkness came the Frost Giants. Threatening to plunge the mortal world into a new ice age."
        ―Odin`,
        options: [
            "Storm Giants", 
            "Frost Giants",
            "Ice Giants",
            "Mountain Giants"
        ]
    },{
        question: "What Movie did Thanos first appear in?",
        answer: "The Avengers",
        fact: "Thanos first appears during the end credits of The Avengers as Loki's mysterious benefactor.",
        options: [
            "Thor Ragnarock", 
            "Captain America: Civil War",
            "The Avengers",
            "Iron Man"
        ]
    },{
        question: "What is the name of the Super Soldier project that created Captain America?",
        answer: "Project Rebirth",
        fact: `"Peg, all I've done my whole life is create destruction. Project Rebirth was... He was the one thing I've done... that brought good into this world."
        ―Howard Stark to Peggy Carter`,
        options: [
            "Project Peagasus", 
            "Project Rebirth",
            "Project Avenger",
            "Project Zero Day"
        ]
    },{
        question: "What is the name of Star-Lords ship in Guardians of the Galaxy?",
        answer: "Milano",
        fact: "According to Director James Gunn, the Milano is named after Peter Quill's childhood crush Alyssa Milano.",
        options: [
            "Milano", 
            "Jefferson Starship",
            "Freebird",
            "Starpath"
        ]
    },{
        question: "What is Agent Coulson’s real first name?",
        answer: "Phil",
        fact: `"You want a symbol? You are the symbol. There's no S.H.I.E.L.D. without you. There's nothing without you."
        ―Daisy Johnson to Phil Coulson`,
        options: [
            "Agent", 
            "Paul",
            "Steve",
            "Phil"
        ]
    },{
        question: "What type of radiation turned Bruce Banner into the Hulk?",
        answer: "Gamma Radiation",
        fact: "Bruce Banner experimented with gamma radiation in hopes of making soldiers immune to radiation poisoning, as per his agreement with Thaddeus Ross, and accidentally turned himself into the Hulk in the process.",
        options: [
            "Delta Radiation", 
            "Sigma Radiation",
            "Gamma Radiation",
            "Alpha Radiation"
        ]
    },{
        question: "What year did Captain America come out of his icey coma?",
        answer: "2011",
        fact: "At the end of The First Avenger, Steve Rogers is thawed from the Arctic ice and wakes up in 2011. It’s too bad: He had a date.",
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
        store.ifWrongMessage = "";
    } else {
        store.rightOrWrong = "You were wrong.";
        store.ifWrongMessage = `The correct answer is ${store.quizArr[(store.currentQuestion) - 1].answer}`
    }
}

function handleRetakeQuiz() {
    $(".retakeQuiz").on("submit", function(event){
        store.view = "start";
        renderView(store);
    }); 
}

function getFieldset(arr) {
    let eachOptionArr = arr.map(x => 
    `
    <input type="radio" id="radio${x}" value="${x}" name="answer" role="radio" required></input>
    <label for="radio${x}" class="answerOption">${x}</label>
    `);

    return eachOptionArr.join("");
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
        `;
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
                <fieldset role="radiogroup">
                        ${getFieldset(store.quizArr[store.currentQuestion - 1].options)}
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
            <h2 class="question">${store.ifWrongMessage}</h2>
            <h3>${store.quizArr[store.currentQuestion - 1].fact}</h3>
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