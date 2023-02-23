//Initializing trivia HTML
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const finishButton = document.getElementById('finish-btn');
const resetButton = document.getElementById('reset-btn');

const practiceButton = document.getElementById('prac-btn');
const rankedButton = document.getElementById('ranked-btn');

const rankedForm = document.getElementById('rank');
const rLable = document.getElementById('rank_lable');

const pracOrRank = document.getElementById('pracOrRank');
const triv = document.getElementById('triv');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
var timer = document.getElementById('timer');
//-------------------------------------------------------------------------------------------------
//Initializing all global variables
retrieveJSONArray();

const totalQuestions = 5;
const rankup = 15000;

var userRank = 0;//This will be fed through the SQL but right now it is changed in the code
var rank = 0;
var highestRank = 2;//If a user reaches this level, they are a god among plebs

var answered = 0;
var right = 0;
var wrong = 0;
var time = 0;
var finalTime;
let shuffledQuestions, currentQuestionIndex

var questions = [];
//-------------------------------------------------------------------------------------------------
//Even listeners for Trivia
document.getElementById("rank").addEventListener("input", changeRank);
function changeRank() {
    questions = [];
    rank = document.getElementById('rank').value;
    retrieveJSONArray();
    console.log(rank)
}
practiceButton.addEventListener('click', initPractice);
rankedButton.addEventListener('click', initRanked);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});
finishButton.addEventListener('click', scores)
//-------------------------------------------------------------------------------------------------
//Determines whether practice mode or ranked mode then starts game
function initPractice(){
    triv.style.display = "block";
    rankedForm.style.display = "block";
    rLable.style.display = "block";
    pracOrRank.style.display = "none";
    startButton.classList.remove('hide');
}

function initRanked(){
    questions = [];
    rank = userRank;
    pracOrRank.style.display = "none";
    rankedForm.style.display = "none";
    rLable.style.display = "none";
    triv.style.display = "block";
    startButton.classList.remove('hide');
    retrieveJSONArray();
}
//-------------------------------------------------------------------------------------------------
function startGame() {
    rankedForm.style.display = "none";
    rLable.style.display = "none";

    var interval = setInterval(function () {
        if (answered == totalQuestions) {
            finalTime = time;
            clearInterval(interval);
        }
        time++;
        timer.innerHTML = time;
    }, 1000);

    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    document.getElementById('score').style.display = "block";
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    answered = answered + 1;
    if (correct) {
        right = right + 1;
    }
    else {
        wrong = wrong + 1;
    }
    document.getElementById('qnum').innerHTML = answered;
    document.getElementById('total_correct').innerHTML = right;
    document.getElementById('total_wrong').innerHTML = wrong;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        finishButton.classList.remove('hide');
    }
}
function scores() {
    resetButton.classList.remove('hide');
    questionContainerElement.classList.add('hide')
    finishButton.classList.add('hide')
    var txt1 = "Your total score was: ";
    var finalScore = (right / answered) * 100;

    let result = txt1.concat(right.toString(), "/", answered.toString(), " which is ", finalScore.toString(), "%");

    document.getElementById('total_score').innerHTML = result;

    var txt2 = "Your total points where: "
    var p = (right * 10000) / time;
    let points = Math.trunc(p);

    if (points >= 1500) {
        if(userRank==highestRank){
            let resultRank = txt2.concat(points.toString(), ". You passed! You are already the highest rank! Congrats on being a Comp. Sci. SuperStar!!!!");
            document.getElementById('alg_score').innerHTML = resultRank;
        }
        else{
            let resultRank = txt2.concat(points.toString(), ". You passed! You will be ranked up");
            document.getElementById('alg_score').innerHTML = resultRank;            
            userRank++;
        }
        
    }
    else {
        let resultRank = txt2.concat(points.toString(), ". You were so Close! Try again!");
        document.getElementById('alg_score').innerHTML = resultRank;
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)

    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }

}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
function resetGame(){
    pracOrRank.style.display = "block";
    triv.style.display = "none";
    answered = 0;
    right = 0;
    wrong = 0;
    time = 0;

    resetButton.classList.add('hide');

    document.getElementById('qnum').innerHTML = answered;
    document.getElementById('total_correct').innerHTML = right;
    document.getElementById('total_wrong').innerHTML = wrong;

    document.getElementById('total_score').innerHTML = "";
    document.getElementById('alg_score').innerHTML = "";
}
//-------------------------------------------------------------------------------------------------
//Questions
var questions = [];
function retrieveJSONArray() {
    var obj = [];
    var jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./trivia.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            obj = JSON.parse(this.responseText);
            jsonArray = Object.values(obj);
            createQuestionList(jsonArray);
            // console.log(jsonArray);
            // console.log(jsonArray[0]);
            // console.log(jsonArray[0][0]);
        }
    }
}
function createQuestionList(jsonArray) {
    //Here is where we would determine the rankings and set questions

    var questionlength = jsonArray[rank].length;
    console.log("Array Length is: " + questionlength);
    var oneDimensionalArray = [];
    for (var i = 0; i < questionlength; i++) {
        oneDimensionalArray.push(jsonArray[rank][i]);
    }

    const shuffledArray = oneDimensionalArray.sort((a, b) => 0.5 - Math.random());

    //Since there will be more questions than what we will be giving users, here is where we set
    //limit on the number of questions, so instead of 5 being here itll be something else.
    for (var i = 0; i < totalQuestions; i++) {
        questions.push(shuffledArray[i]);
    }

    // if you want to see what array is being created, Uncomment below
    // for (var i = 0; i < questionlength; i++) {
    //     console.log(questions[i]);
    // }
}

//-------------------------------------------------------------------------------------------------
// var questions = [];
// var st;
// var obj = fetch('./trivia1.json');
// console.log("This is our string: " + obj);

// questions = JSON.stringify(obj)

//-------------------------------------------------------------------------------------------------
// async function loadNames() {
//     const response = await fetch('./trivia1.json', {
//         method: 'GET'
//       })
//     const names = await response.json();
//     //var obj = Promise.resolve(JSON.parse(JSON.stringify(names)));
//     var st = JSON.stringify(names);
//     return st;
//   }

// var str = loadNames();
// let obj = Promise.resolve(str);
// var final = obj.then(function(val) {
//     console.log(val);
//     });
// console.log(final);
//-------------------------------------------------------------------------------------------------
// var trivia1=fetch('./trivia1.json')
//     .then((response1) => response1.json())
//     .then((json1) => console.log(json1));

//-------------------------------------------------------------------------------------------------
