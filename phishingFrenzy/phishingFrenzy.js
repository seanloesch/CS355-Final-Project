var pf_userName = "Ryan" //this will change depending on PHP

let pf_score = 0;
var pf_emails, pf_difficulty, pf_gameOverMessage, pf_startTime, pf_timerInterval, pf_subtractInterval, pf_scoreMultiplier;
const pf_gameTime = 60, pf_points = 10;
var pf_easy = 1, pf_medium = 2, pf_hard = 3, pf_endGame = false, pf_scoreSubtractor = 0;
const pf_win = "win", pf_lose = "lose", pf_reload = "reload";

var pf_scoreDisplay = document.getElementById("pf_scoreDisplay");
var pf_timeDisplay = document.getElementById("pf_timeDisplay");
var pf_emailDisplay = document.getElementById("pf_emailDisplay");
var pf_phishingButton = document.getElementById("pf_phishBtn");
var pf_legitButton = document.getElementById("pf_legitBtn");
var pf_easyButton = document.getElementById("pf_easy");
var pf_mediumButton = document.getElementById("pf_medium");
var pf_hardButton = document.getElementById("pf_hard");
var pf_playGame = document.getElementById('pf_inGame')
var pf_difficultySelector = document.getElementById('pf_difficultySelector')
var pf_playerMessage = document.getElementById('pf_playerMessage')

pf_easyButton.addEventListener('click', () => {
    pf_difficulty = pf_easy;
    pf_scoreMultiplier = pf_easy;
    pf_startGame();
});

pf_mediumButton.addEventListener('click', () => {
    pf_difficulty = pf_medium;
    pf_scoreMultiplier = pf_medium
    pf_startGame();
});

pf_hardButton.addEventListener('click', () => {
    pf_difficulty = pf_hard;
    pf_scoreMultiplier = pf_hard
    pf_startGame();
});

function pf_startGame() {
    pf_difficultySelector.classList.add('hide');
    pf_playGame.classList.remove('hide');
    pf_score = 0;
    pf_endGame = false;
    pf_startTime = Math.floor(Date.now() / 1000);
    phishingFrenzy()
}

function phishingFrenzy() {
    var pf_emailTexts = [];
    pf_retrieveJSONArray();

    function pf_updateGame(x) {
        pf_scoreSubtractor = 0;
        pf_scoreDisplay.innerText = pf_score;
        clearInterval(pf_subtractInterval);
        if (x === pf_reload) {
            pf_generateEmail();
            pf_emailDisplay.innerText = pf_emails.text
            pf_subtractInterval = setInterval(function () { if (pf_scoreSubtractor < 10) { pf_scoreSubtractor++ } }, 1000);
        }
        else if (x === pf_lose) {
            pf_gameOver();
        }
        else {
            pf_gameWin();
        }
    }

    pf_phishingButton.addEventListener('click', pf_phishingButtonClick);
    function pf_phishingButtonClick() { pf_checkEmail(true); }

    pf_legitButton.addEventListener('click', pf_legitButtonClick);
    function pf_legitButtonClick() { pf_checkEmail(false); }

    function pf_checkEmail(pf_reported) {
        if (pf_reported) {
            if (pf_emails.phishing) {
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
            else {
                pf_gameOverMessage = "That was a real Email"
                pf_endGame = true;
                pf_updateGame(pf_lose);
            }
        }
        else {
            if (pf_emails.phishing) {
                pf_gameOverMessage = "You have been phished!!!";
                pf_updateGame(pf_lose);
            }
            else {
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
        }
    }
    function pf_scoreAlgorithm() { pf_score = pf_score + ((pf_points - pf_scoreSubtractor) * pf_scoreMultiplier); }

    function pf_generateEmail() {
        var pf_randomIndex = Math.floor(Math.random() * pf_emailTexts.length)
        var pf_eText =pf_emailTexts[pf_randomIndex].text;
        if(pf_eText.includes('[Name]')){pf_eText=pf_eText.replace('[Name]', pf_userName)}
        pf_emails = {
            text: pf_eText,
            phishing: pf_emailTexts[pf_randomIndex].phishing,
        };
    }

    function pf_gameWin() {
        pf_restartGame();
        pf_playerMessage.innerText = `Congratulations! You've won! Final Score: ${pf_score}`;
    }

    function pf_gameOver() {
        pf_restartGame();
        pf_playerMessage.innerText = pf_gameOverMessage;
    }

    function pf_restartGame() {
        clearInterval(pf_timerInterval);
        pf_playGame.classList.add('hide');
        pf_difficultySelector.classList.remove('hide')
        pf_phishingButton.removeEventListener('click', pf_phishingButtonClick);
        pf_legitButton.removeEventListener('click', pf_legitButtonClick);
    }

    let pf_timerInterval = setInterval(pf_updateScoreAndTime, 1000);
    function pf_updateScoreAndTime() {
        var pf_elapsedTime = Math.floor(Date.now() / 1000) - pf_startTime;
        var pf_timeRemaining = pf_gameTime - pf_elapsedTime;
        pf_timeDisplay.innerText = pf_timeRemaining;
        if (pf_timeRemaining <= 0) {
            pf_endGame = true;
            pf_updateGame(pf_win);
        }
    }
    function pf_retrieveJSONArray() {
        var pf_obj = [];
        var pf_jsonArray = [];

        var oXHR = new XMLHttpRequest();
        // Initiate request.
        oXHR.onreadystatechange = reportStatus;
        oXHR.open("GET", "./phishingFrenzy.json", true);  // get json file.
        oXHR.send();
        function reportStatus() {
            if (oXHR.readyState == 4) {		// Check if request is complete.
                pf_obj = JSON.parse(this.responseText);
                pf_jsonArray = Object.values(pf_obj);
                pf_createEmailList(pf_jsonArray);
            }
        }
    }
    function pf_createEmailList(pf_jsonArray) {
        var pf_questionlength = pf_jsonArray[0].length;
        var pf_oneDimensionalArray = [];
        for (var i = 0; i < pf_questionlength; i++) {
            if (pf_jsonArray[0][i].dif == pf_difficulty) {
                pf_oneDimensionalArray.push(pf_jsonArray[0][i]);
            }
        }
        for (var i = 0; i < pf_oneDimensionalArray.length; i++) {
            pf_emailTexts[i] = pf_oneDimensionalArray[i];
        }
        console.log(pf_emailTexts.length)
        pf_updateGame(pf_reload);
    }
}
