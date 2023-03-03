var elements = [];
var add_value = [];
var rank = 1;
const totalQuestions = 5;
var questionBoxArray = new Array(4);
var answers = [];
var shuffledArray = [];
var buzz;
var clearing;
var count;
var numMinutes = 5;

display = document.querySelector('#time');

const startButton = document.getElementById('start-btn');
const homeButton = document.getElementById('home-btn');
const inGame = document.getElementById('inGame');
const msg = document.getElementById('msg');
const startScreen = document.getElementById('startScreen');


for (let i = 0; i < 676; i++) {
    var button_String = i.toString;
    add_value = [i];
    elements.push(add_value)
}

startButton.addEventListener('click', startGame);
function startGame() {
    startButton.classList.add('hide');
    homeButton.classList.add('hide');
    msg.classList.add('hide');
    startScreen.classList.add('hide');
    inGame.classList.remove('hide');
    var timed = 60 * numMinutes;
    buzz = 0;
    count = 0;
    startTimer(timed, display);
    retrieveJSONArray();
    createButtons();
    running();
}

// Get parent div in which you want to add buttons
const parent = document.getElementById('buttons-container');
function createButtons(){
    // Creates buttons
    for (let i = 0; i < elements.length; i++) {
        let mineBtn = document.createElement('button');
        mineBtn.classList.add('mineBtn')
        mineBtn.innerHTML = '';
        mineBtn.value = i + 1;
        parent.appendChild(mineBtn);
    }
}
function running(){
const buttons = document.getElementsByTagName("button");
const buttonPressed = e => {
    var classname = e.target.classList[0];
    if(classname == "mineBtn"){
    var pressed = e.target.value;
    var classname = e.target.classList[0];

    var c = Math.ceil(pressed / 26);
    var r = ((pressed % 26) + 9).toString(36).toUpperCase();

    if (r == 9) { r = 'Z'; }

    var txt = "You Pressed: "
    var gridVal = r.toString() + c.toString()
    let btnVal = txt.concat(r.toString(), " ", c.toString());
    document.getElementById('btnVal').innerHTML = btnVal;
    var findIn = answers.includes(gridVal);
    e.target.disabled = true;
    if (findIn == true) {
        e.target.classList.add('correct');
        count = count + 1;
        if (count == totalQuestions) {
            finished();
        }
    }
    else {
        e.target.classList.add('incorrect');
        buzz++;
    }
}
}
for (let button of buttons) {
    button.addEventListener("click", buttonPressed);
}
}
var questions = [];
function retrieveJSONArray() {
    var obj = [];
    var jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./mineDecrypt.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            obj = JSON.parse(this.responseText);
            jsonArray = Object.values(obj);
            createQuestionList(jsonArray);
        }
    }
}
function createQuestionList(jsonArray) {
    //Here is where we would determine the rankings and set questions

    var questionlength = jsonArray[rank].length;
    var oneDimensionalArray = [];
    for (var i = 0; i < questionlength; i++) {
        oneDimensionalArray.push(jsonArray[rank][i]);
    }


    shuffledArray = oneDimensionalArray.sort((a, b) => 0.5 - Math.random());

    for (let i = 0; i < totalQuestions; i++) {
        var q = shuffledArray[i].question;
        var a = shuffledArray[i].answer;
        questionBoxArray[i] = q;
        answers.push(a);
    }
    loadQuestions();
}
function loadQuestions() {
    document.getElementById('mdQ1').innerHTML = questionBoxArray[0];
    document.getElementById('mdQ2').innerHTML = questionBoxArray[1];
    document.getElementById('mdQ3').innerHTML = questionBoxArray[2];
    document.getElementById('mdQ4').innerHTML = questionBoxArray[3];
    document.getElementById('mdQ5').innerHTML = questionBoxArray[4];
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds, displayedMinutes;

    clearing = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayedMinutes = minutes - buzz;

        if (displayedMinutes < 0 || (displayedMinutes == 0 && seconds == 0)) {
            timerRanOut();
        }
        else {
            display.textContent = displayedMinutes + ":" + seconds;
        }

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
function timerRanOut() {
    startButton.innerHTML = "Retry";
    msg.innerHTML = "You ran out of time!";
    clearInterval(clearing);
    promptPlayAgain();
}
function finished() {
    clearInterval(clearing);
    startButton.innerHTML = "Again";
    msg.innerHTML = "You did it!";
    promptPlayAgain();
}
function promptPlayAgain() {
    questionBoxArray = [];
    answers = [];
    shuffledArray = [];
    buttonReset();
    startScreen.classList.remove('hide');
    startButton.classList.remove('hide');
    startButton.disabled = false;
    msg.classList.remove('hide');
    homeButton.classList.remove('hide');
    inGame.classList.add('hide');
}
function buttonReset() {
    var div = document.getElementById('buttons-container');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

}