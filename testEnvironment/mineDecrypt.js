var mine_elements = [];
var mine_add_value = [];
var mine_rank = 1;
const mine_totalQuestions = 1;
var mine_questionBoxArray = new Array(4);
var mine_answers = [];
var mine_shuffledArray = [];
var mine_buzz;
var mine_clearing;
var mine_count;
var mine_numMinutes = 5;
var table

mine_display = document.querySelector('#mine_time');

const mine_startButton = document.getElementById('mine_start_btn');
const mine_homeButton = document.getElementById('mine_home_btn');
const mine_inGame = document.getElementById('mine_inGame');
const mine_msg = document.getElementById('mine_msg');
const mine_startScreen = document.getElementById('mine_startScreen');



for (let i = 0; i < 576; i++) {
    var button_String = i.toString;
    mine_add_value = [i];
    mine_elements.push(mine_add_value)
}

mine_startButton.addEventListener('click', mine_startGame);
mine_homeButton.addEventListener('click', mine_goHome);

function mine_startGame() {
    mine_startButton.classList.add('hide');
    mine_homeButton.classList.add('hide');
    mine_msg.classList.add('hide');
    mine_startScreen.classList.add('hide');
    mine_inGame.classList.remove('hide');
    var mine_timed = 60 * mine_numMinutes;
    mine_buzz = 0;
    mine_count = 0;
    mine_startTimer(mine_timed, mine_display);
    table_create();
    mine_retrieveJSONArray();
    mine_createButtons();
    mine_running();
    
}


//draw our table

function table_create() {
    const tableArray = document.getElementById('mine_table');
    
    for (let i = 0; i <= 24; i++) {
        if (i == 0){
            let mineRow = document.createElement('tr');
            tableArray.appendChild(mineRow);
            continue;
        }
        let mineRow = document.createElement('tr');
        tableArray.appendChild(mineRow);
        for (let j = 0; j <= 24; j++){
            if (j == 0){
                let mineCol = document.createElement('td');
                mineRow.appendChild(mineCol);
                continue;
            } 
                let mineCol = document.createElement('td');
                mineRow.appendChild(mineCol)
                let mineBtn = document.createElement('button');
                mineBtn.classList.add('mineBtn')
                mineBtn.innerHTML = '';
                mineBtn.value = i + 1;
                mineCol.appendChild(mineBtn);
            
        }
        
    }
  }


// Get parent div in which you want to add buttons
const mine_parent = document.getElementById('mine_buttons_container');
// function mine_createButtons(){
//     // Creates buttons
//     for (let i = 0; i < mine_elements.length; i++) {
//         let mineBtn = document.createElement('button');
//         mineBtn.classList.add('mineBtn')
//         mineBtn.innerHTML = '';
//         mineBtn.value = i + 1;
//         mine_parent.appendChild(mineBtn);
//     }
// }
function mine_running(){
const mine_buttons = document.getElementsByTagName("button");
const mine_buttonPressed = mine_e => {
    var mine_classname = mine_e.target.classList[0];
    if(mine_classname == "mineBtn"){
    var mine_pressed = mine_e.target.value;
    var mine_classname = mine_e.target.classList[0];

    var mine_c = Math.ceil(mine_pressed / 26);
    var mine_r = ((mine_pressed % 26) + 9).toString(36).toUpperCase();

    if (mine_r == 9) { mine_r = 'Z'; }

    var mine_txt = "You Pressed: "
    var mine_gridVal = mine_r.toString() + mine_c.toString()
    let mine_btnVal = mine_txt.concat(mine_r.toString(), " ", mine_c.toString());
    document.getElementById('mine_btnVal').innerHTML = mine_btnVal;
    var mine_findIn = mine_answers.includes(mine_gridVal);
    mine_e.target.disabled = true;
    if (mine_findIn == true) {
        mine_e.target.classList.add('mine_correct');
        mine_count = mine_count + 1;
        if (mine_count == mine_totalQuestions) {
            mine_finished();
        }
    }
    else {
        mine_e.target.classList.add('mine_incorrect');
        mine_buzz++;
    }
}
}
for (let mine_button of mine_buttons) {
    mine_button.addEventListener("click", mine_buttonPressed);
}
}
var mine_questions = [];
function mine_retrieveJSONArray() {
    var mine_obj = [];
    var mine_jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./mineDecrypt.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            mine_obj = JSON.parse(this.responseText);
            mine_jsonArray = Object.values(mine_obj);
            mine_createQuestionList(mine_jsonArray);
        }
    }
}
function mine_createQuestionList(mine_jsonArray) {
    //Here is where we would determine the rankings and set questions

    var mine_questionlength = mine_jsonArray[mine_rank].length;
    var mine_oneDimensionalArray = [];
    for (var i = 0; i < mine_questionlength; i++) {
        mine_oneDimensionalArray.push(mine_jsonArray[mine_rank][i]);
    }


    mine_shuffledArray = mine_oneDimensionalArray.sort((a, b) => 0.5 - Math.random());

    for (let i = 0; i < mine_totalQuestions; i++) {
        var mine_q = mine_shuffledArray[i].question;
        var mine_a = mine_shuffledArray[i].answer;
        mine_questionBoxArray[i] = mine_q;
        mine_answers.push(mine_a);
    }
    mine_loadQuestions();
}
function mine_loadQuestions() {
    document.getElementById('mine_mdQ1').innerHTML = mine_questionBoxArray[0];
    // document.getElementById('mine_mdQ2').innerHTML = mine_questionBoxArray[1];
    // document.getElementById('mine_mdQ3').innerHTML = mine_questionBoxArray[2];
    // document.getElementById('mine_mdQ4').innerHTML = mine_questionBoxArray[3];
    // document.getElementById('mine_mdQ5').innerHTML = mine_questionBoxArray[4];
}


function mine_startTimer(mine_duration, mine_display) {
    var mine_timer = mine_duration, mine_minutes, mine_seconds, mine_displayedMinutes;

    mine_clearing = setInterval(function () {
        mine_minutes = parseInt(mine_timer / 60, 10);
        mine_seconds = parseInt(mine_timer % 60, 10);

        mine_minutes = mine_minutes < 10 ? "0" + mine_minutes : mine_minutes;
        mine_seconds = mine_seconds < 10 ? "0" + mine_seconds : mine_seconds;

        mine_displayedMinutes = mine_minutes - mine_buzz;

        if (mine_displayedMinutes < 0 || (mine_displayedMinutes == 0 && mine_seconds == 0)) {
            mine_timerRanOut();
        }
        else {
            mine_display.textContent = mine_displayedMinutes + ":" + mine_seconds;
        }

        if (--mine_timer < 0) {
            mine_timer = mine_duration;
        }
    }, 1000);
}
function mine_timerRanOut() {
    mine_startButton.innerHTML = "Retry";
    mine_msg.innerHTML = "You ran out of time!";
    clearInterval(mine_clearing);
    mine_promptPlayAgain();
}
function mine_finished() {
    clearInterval(mine_clearing);
    mine_startButton.innerHTML = "Again";
    mine_msg.innerHTML = "You did it!";
    mine_promptPlayAgain();
}
function mine_promptPlayAgain() {
    mine_questionBoxArray = [];
    mine_answers = [];
    mine_shuffledArray = [];
    mine_buttonReset();
    mine_startScreen.classList.remove('hide');
    mine_startButton.classList.remove('hide');
    mine_startButton.disabled = false;
    mine_msg.classList.remove('hide');
    mine_homeButton.classList.remove('hide');
    mine_inGame.classList.add('hide');
}
function mine_buttonReset() {
    var mine_div = document.getElementById('mine_buttons_container');
    while (mine_div.firstChild) {
        mine_div.removeChild(mine_div.firstChild);
    }
}
function mine_goHome(){
    mine_startButton.innerHTML = "Start";
    document.getElementById("mine").classList.add("hide");
    document.getElementById("homepage").classList.remove("hide");
}