var kh_elements = [];
var kh_add_value = [];
var kh_rank = 1;
const kh_totalQuestions = 1;
var kh_questionBoxArray = new Array(4);
var kh_answers = [];
var kh_shuffledArray = [];
var kh_buzz;
var kh_clearing;
var kh_count;
var kh_numMinutes = 5;


kh_display = document.querySelector('#kh_time');

const kh_startButton = document.getElementById('kh_start_btn');
const kh_homeButton = document.getElementById('kh_home_btn');
const kh_inGame = document.getElementById('kh_inGame');
const kh_msg = document.getElementById('kh_msg');
const kh_startScreen = document.getElementById('kh_startScreen');



for (let i = 0; i < 676; i++) {
    var button_String = i.toString;
    kh_add_value = [i];
    kh_elements.push(kh_add_value)
}

kh_startButton.addEventListener('click', kh_startGame);
kh_homeButton.addEventListener('click', kh_goHome);

function kh_startGame() {
    kh_startButton.classList.add('hide');
    kh_homeButton.classList.add('hide');
    kh_msg.classList.add('hide');
    kh_startScreen.classList.add('hide');
    kh_inGame.classList.remove('hide');
    var kh_timed = 60 * kh_numMinutes;
    kh_buzz = 0;
    kh_count = 0;
    kh_startTimer(kh_timed, kh_display);
    table_create();
    kh_retrieveJSONArray();
    //kh_createButtons();
    kh_running();

}


//draw our table

function table_create() {
    const tableArray = document.getElementById('kh_table');
    var colIncrement = 0;
    for (let i = 0; i <= 26; i++) {
        if(i==0){
            let tableRow = document.createElement('tr');
            tableArray.appendChild(tableRow);
            for (let c = 0; c <= 26; c++) {

                var str = c.toString();

                if (c<10) {
                    str = "";
                    str = str.concat("0",c.toString());
                }
                let tableCol = document.createElement('td');
                tableCol.innerText = str;
                tableRow.appendChild(tableCol);
            }
        }

        let tableRow = document.createElement('tr');
        tableArray.appendChild(tableRow);
        
        for (let j = 0; j <= 26; j++) {
            if (j == 0) {

                var str = colIncrement.toString();

                if (colIncrement<10) {
                    str = "";
                    str = str.concat("0",colIncrement.toString());
                }
                let tableCol = document.createElement('td');
                tableRow.appendChild(tableCol);
                tableCol.innerText = str;
                colIncrement++;
                continue;
            }
            let tableCol = document.createElement('td');
            tableRow.appendChild(tableCol)
            let khBtn = document.createElement('button');
            khBtn.classList.add('khBtn')
            khBtn.innerHTML = '';
            khBtn.value = i + 1;
            tableCol.appendChild(khBtn);

        }

    }
}


// Get parent div in which you want to add buttons
const kh_parent = document.getElementById('kh_buttons_container');
// function kh_createButtons(){
//     // Creates buttons
//     for (let i = 0; i < kh_elements.length; i++) {
//         let khBtn = document.createElement('button');
//         khBtn.classList.add('khBtn')
//         khBtn.innerHTML = '';
//         khBtn.value = i + 1;
//         kh_parent.appendChild(khBtn);
//     }
// }
function kh_running() {
    const kh_buttons = document.getElementsByTagName("button");
    const kh_buttonPressed = kh_e => {
        var kh_classname = kh_e.target.classList[0];
        if (kh_classname == "khBtn") {
            var kh_pressed = kh_e.target.value;
            var kh_classname = kh_e.target.classList[0];
            kh_e.target.classList.add('wrong');
            var kh_c = Math.ceil(kh_pressed / 26);
            var kh_r = ((kh_pressed % 26) + 9).toString(36).toUpperCase();

            if (kh_r == 9) { kh_r = 'Z'; }

            var kh_txt = "You Pressed: "
            var kh_gridVal = kh_r.toString() + kh_c.toString()
            let kh_btnVal = kh_txt.concat(kh_r.toString(), " ", kh_c.toString());
            document.getElementById('kh_btnVal').innerHTML = kh_btnVal;
            var kh_findIn = kh_answers.includes(kh_gridVal);
            kh_e.target.disabled = true;
            if (kh_findIn == true) {
                kh_e.target.classList.add('kh_correct');
                kh_count = kh_count + 1;
                if (kh_count == kh_totalQuestions) {
                    kh_finished();
                }
            }
            else {
                kh_e.target.classList.add('kh_incorrect');
                kh_buzz++;
            }
        }
    }
    for (let kh_button of kh_buttons) {
        kh_button.addEventListener("click", kh_buttonPressed);
    }
}
var kh_questions = [];
function kh_retrieveJSONArray() {
    var kh_obj = [];
    var kh_jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./keyhunter.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            kh_obj = JSON.parse(this.responseText);
            kh_jsonArray = Object.values(kh_obj);
            kh_createQuestionList(kh_jsonArray);
        }
    }
}
function kh_createQuestionList(kh_jsonArray) {
    //Here is where we would determine the rankings and set questions
    var kh_Gamerank = kh_rank-1;
    var kh_questionlength = kh_jsonArray[kh_Gamerank].length;
    var kh_oneDimensionalArray = [];
    for (var i = 0; i < kh_questionlength; i++) {
        kh_oneDimensionalArray.push(kh_jsonArray[kh_Gamerank][i]);
    }

    for (let i = 0; i < kh_totalQuestions; i++) {
        var kh_q = kh_oneDimensionalArray[i].question;
        var kh_a = kh_oneDimensionalArray[i].answer;
        kh_questionBoxArray[i] = kh_q;
        console.log(kh_questionBoxArray[i]);
        kh_answers.push(kh_a);
    }
    kh_loadQuestions();
}
function kh_loadQuestions() {
    document.getElementById('kh_mdQ1').innerHTML = kh_questionBoxArray[0];
    // document.getElementById('kh_mdQ2').innerHTML = kh_questionBoxArray[1];
    // document.getElementById('kh_mdQ3').innerHTML = kh_questionBoxArray[2];
    // document.getElementById('kh_mdQ4').innerHTML = kh_questionBoxArray[3];
    // document.getElementById('kh_mdQ5').innerHTML = kh_questionBoxArray[4];
}


function kh_startTimer(kh_duration, kh_display) {
    var kh_timer = kh_duration, kh_minutes, kh_seconds, kh_displayedMinutes;

    kh_clearing = setInterval(function () {
        kh_minutes = parseInt(kh_timer / 60, 10);
        kh_seconds = parseInt(kh_timer % 60, 10);

        kh_minutes = kh_minutes < 10 ? "0" + kh_minutes : kh_minutes;
        kh_seconds = kh_seconds < 10 ? "0" + kh_seconds : kh_seconds;

        kh_displayedMinutes = kh_minutes - kh_buzz;

        if (kh_displayedMinutes < 0 || (kh_displayedMinutes == 0 && kh_seconds == 0)) {
            kh_timerRanOut();
        }
        else {
            kh_display.textContent = kh_displayedMinutes + ":" + kh_seconds;
        }

        if (--kh_timer < 0) {
            kh_timer = kh_duration;
        }
    }, 1000);
}
function kh_timerRanOut() {
    kh_startButton.innerHTML = "Retry";
    kh_msg.innerHTML = "You ran out of time!";
    clearInterval(kh_clearing);
    kh_promptPlayAgain();
}
function kh_finished() {
    clearInterval(kh_clearing);
    kh_startButton.innerHTML = "Again";
    kh_msg.innerHTML = "You did it!";
    kh_promptPlayAgain();
}
function kh_promptPlayAgain() {
    kh_questionBoxArray = [];
    kh_answers = [];
    kh_shuffledArray = [];
    kh_buttonReset();
    kh_startScreen.classList.remove('hide');
    kh_startButton.classList.remove('hide');
    kh_startButton.disabled = false;
    kh_msg.classList.remove('hide');
    kh_homeButton.classList.remove('hide');
    kh_inGame.classList.add('hide');
}
function kh_buttonReset() {
    var kh_div = document.getElementById('kh_table');
    while (kh_div.firstChild) {
        kh_div.removeChild(kh_div.firstChild);
    }
}
function kh_goHome() {
    kh_startButton.innerHTML = "Start";
    document.getElementById("kh").classList.add("hide");
    document.getElementById("homepage").classList.remove("hide");
}