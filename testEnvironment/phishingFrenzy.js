var pf_userName = "Ryan" //this will change depending on PHP

let pf_score = 0;
var pf_emails, pf_difficulty, pf_gameOverMessage, pf_startTime, pf_timerInterval, pf_subtractInterval, pf_scoreMultiplier;
const pf_gameTime = 60, pf_points = 10;
var pf_easy = 1, pf_medium = 2, pf_hard = 3, pf_endGame = false, pf_scoreSubtractor = 0, pf_lives = 3;
const pf_win = "win", pf_lose = "lose", pf_reload = "reload";

var pf_scoreDisplay = document.getElementById("pf_scoreDisplay");
var pf_timeDisplay = document.getElementById("pf_timeDisplay");
var pf_emailDisplay = document.getElementById("pf_emailDisplay");
var pf_addrDisplay = document.getElementById("pf_addrDisplay");
var pf_phishingButton = document.getElementById("pf_phishBtn");
var pf_legitButton = document.getElementById("pf_legitBtn");
var pf_easyButton = document.getElementById("pf_easy");
var pf_mediumButton = document.getElementById("pf_medium");
var pf_hardButton = document.getElementById("pf_hard");
var pf_playGame = document.getElementById('pf_inGame');
var pf_difficultySelector = document.getElementById('pf_difficultySelector');
var pf_playerMessage = document.getElementById('pf_playerMessage');

var pf_life1 = document.getElementById('pf_life1');
var pf_life2 = document.getElementById('pf_life2');
var pf_life3 = document.getElementById('pf_life3');

var pf_legit1D = document.getElementById('pf_dot_legit_line1');
var pf_legit1A = document.getElementById('pf_addrInbox_legit_line1');
var pf_legit1M = document.getElementById('pf_LmsgInbox_1');
var pf_legit1E = document.getElementById('pf_explanationInbox_legit_line1');

var pf_legit2D = document.getElementById('pf_dot_legit_line2');
var pf_legit2A = document.getElementById('pf_addrInbox_legit_line2');
var pf_legit2M = document.getElementById('pf_LmsgInbox_2');
var pf_legit2E = document.getElementById('pf_explanationInbox_legit_line2');

var pf_legit3D = document.getElementById('pf_dot_legit_line3');
var pf_legit3A = document.getElementById('pf_addrInbox_legit_line3');
var pf_legit3M = document.getElementById('pf_LmsgInbox_3');
var pf_legit3E = document.getElementById('pf_explanationInbox_legit_line3');

var pf_legit4D = document.getElementById('pf_dot_legit_line4');
var pf_legit4A = document.getElementById('pf_addrInbox_legit_line4');
var pf_legit4M = document.getElementById('pf_LmsgInbox_4');
var pf_legit4E = document.getElementById('pf_explanationInbox_legit_line4');

var pf_legit5D = document.getElementById('pf_dot_legit_line5');
var pf_legit5A = document.getElementById('pf_addrInbox_legit_line5');
var pf_legit5M = document.getElementById('pf_LmsgInbox_5');
var pf_legit5E = document.getElementById('pf_explanationInbox_legit_line5');

var pf_legit6D = document.getElementById('pf_dot_legit_line6');
var pf_legit6A = document.getElementById('pf_addrInbox_legit_line6');
var pf_legit6M = document.getElementById('pf_LmsgInbox_6');
var pf_legit6E = document.getElementById('pf_explanationInbox_legit_line6');

var pf_legit7D = document.getElementById('pf_dot_legit_line7');
var pf_legit7A = document.getElementById('pf_addrInbox_legit_line7');
var pf_legit7M = document.getElementById('pf_LmsgInbox_7');
var pf_legit7E = document.getElementById('pf_explanationInbox_legit_line7');

var pf_legit8D = document.getElementById('pf_dot_legit_line8');
var pf_legit8A = document.getElementById('pf_addrInbox_legit_line8');
var pf_legit8M = document.getElementById('pf_LmsgInbox_8');
var pf_legit8E = document.getElementById('pf_explanationInbox_legit_line8');

var pf_legit9D = document.getElementById('pf_dot_legit_line9');
var pf_legit9A = document.getElementById('pf_addrInbox_legit_line9');
var pf_legit9M = document.getElementById('pf_LmsgInbox_9');
var pf_legit9E = document.getElementById('pf_explanationInbox_legit_line9');

var pf_legit10D = document.getElementById('pf_dot_legit_line10');
var pf_legit10A = document.getElementById('pf_addrInbox_legit_line10');
var pf_legit10M = document.getElementById('pf_LmsgInbox_10');
var pf_legit10E = document.getElementById('pf_explanationInbox_legit_line10');

var pf_legit11D = document.getElementById('pf_dot_legit_line11');
var pf_legit11A = document.getElementById('pf_addrInbox_legit_line11');
var pf_legit11M = document.getElementById('pf_LmsgInbox_11');
var pf_legit11E = document.getElementById('pf_explanationInbox_legit_line11');

var pf_phish1D = document.getElementById('pf_dot_phish_line1');
var pf_phish1A = document.getElementById('pf_addrInbox_phish_line1');
var pf_phish1M = document.getElementById('pf_PmsgInbox_1');
var pf_phish1E = document.getElementById('pf_explanationInbox_phish_line1');

var pf_phish2D = document.getElementById('pf_dot_phish_line2');
var pf_phish2A = document.getElementById('pf_addrInbox_phish_line2');
var pf_phish2M = document.getElementById('pf_PmsgInbox_2');
var pf_phish2E = document.getElementById('pf_explanationInbox_phish_line2');

var pf_phish3D = document.getElementById('pf_dot_phish_line3');
var pf_phish3A = document.getElementById('pf_addrInbox_phish_line3');
var pf_phish3M = document.getElementById('pf_PmsgInbox_3');
var pf_phish3E = document.getElementById('pf_explanationInbox_phish_line3');

var pf_phish4D = document.getElementById('pf_dot_phish_line4');
var pf_phish4A = document.getElementById('pf_addrInbox_phish_line4');
var pf_phish4M = document.getElementById('pf_PmsgInbox_4');
var pf_phish4E = document.getElementById('pf_explanationInbox_phish_line4');

var pf_phish5D = document.getElementById('pf_dot_phish_line5');
var pf_phish5A = document.getElementById('pf_addrInbox_phish_line5');
var pf_phish5M = document.getElementById('pf_PmsgInbox_5');
var pf_phish5E = document.getElementById('pf_explanationInbox_phish_line5');

var pf_phish6D = document.getElementById('pf_dot_phish_line6');
var pf_phish6A = document.getElementById('pf_addrInbox_phish_line6');
var pf_phish6M = document.getElementById('pf_PmsgInbox_6');
var pf_phish6E = document.getElementById('pf_explanationInbox_phish_line6');

var pf_phish7D = document.getElementById('pf_dot_phish_line7');
var pf_phish7A = document.getElementById('pf_addrInbox_phish_line7');
var pf_phish7M = document.getElementById('pf_PmsgInbox_7');
var pf_phish7E = document.getElementById('pf_explanationInbox_phish_line7');

var pf_phish8D = document.getElementById('pf_dot_phish_line8');
var pf_phish8A = document.getElementById('pf_addrInbox_phish_line8');
var pf_phish8M = document.getElementById('pf_PmsgInbox_8');
var pf_phish8E = document.getElementById('pf_explanationInbox_phish_line8');

var pf_phish9D = document.getElementById('pf_dot_phish_line9');
var pf_phish9A = document.getElementById('pf_addrInbox_phish_line9');
var pf_phish9M = document.getElementById('pf_PmsgInbox_9');
var pf_phish9E = document.getElementById('pf_explanationInbox_phish_line9');

var pf_phish10D = document.getElementById('pf_dot_phish_line10');
var pf_phish10A = document.getElementById('pf_addrInbox_phish_line10');
var pf_phish10M = document.getElementById('pf_PmsgInbox_10');
var pf_phish10E = document.getElementById('pf_explanationInbox_phish_line10');

var pf_phish11D = document.getElementById('pf_dot_phish_line11');
var pf_phish11A = document.getElementById('pf_addrInbox_phish_line11');
var pf_phish11M = document.getElementById('pf_PmsgInbox_11');
var pf_phish11E = document.getElementById('pf_explanationInbox_phish_line11');

const pf_empty = { "answered": "empty", "addr": "[Empty]", "msg": "[Empty]", "explanation": "There is no email" }

var pf_legitList = [pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty];
var pf_phishList = [pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty];

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
    pf_scoreDisplay.innerHTML = pf_score;
    pf_timeDisplay.innerHTML = pf_gameTime
    pf_endGame = false;
    pf_lives = 3;
    pf_startTime = Math.floor(Date.now() / 1000);
    phishingFrenzy()
}

function phishingFrenzy() {
    var pf_emailTexts = [];
    pf_retrieveJSONArray();
    livesDisplay(pf_lives);

    function pf_updateGame(x) {
        pf_scoreSubtractor = 0;
        pf_scoreDisplay.innerText = pf_score;
        clearInterval(pf_subtractInterval);
        if (x === pf_reload) {
            pf_generateEmail();
            pf_emailDisplay.innerText = pf_emails.text;
            pf_addrDisplay.innerText = pf_emails.addr;
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
                pf_phishDisplayArray('cP')
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
            else {
                pf_legitDisplayArray("wL");
                pf_loseLife();
            }
        }
        else {
            if (pf_emails.phishing) {
                pf_phishDisplayArray('wP');
                pf_loseLife();
            }
            else {
                pf_legitDisplayArray("cL");
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
        }
    }

    function pf_loseLife() {
        pf_lives = pf_lives - 1
        livesDisplay(pf_lives)
        if (pf_lives == 0) {
            pf_endGame = true;
            pf_updateGame(pf_lose);
        }
        else {
            pf_updateGame(pf_reload);
        }
    }
    function livesDisplay(pf_livescount) {
        if (pf_livescount == 2) { pf_life1.classList.add('pf_lostLife'); }
        else if (pf_livescount == 1) { pf_life2.classList.add('pf_lostLife'); }
        else if (pf_livescount == 0) { pf_life3.classList.add('pf_lostLife'); }
        else {
            if (pf_life1.classList.contains('pf_lostLife')) { pf_life1.classList.remove('pf_lostLife'); }
            if (pf_life2.classList.contains('pf_lostLife')) { pf_life2.classList.remove('pf_lostLife'); }
            if (pf_life3.classList.contains('pf_lostLife')) { pf_life3.classList.remove('pf_lostLife'); }
        }
    }

    function pf_legitDisplayArray(pressed) {
        var pf_newItem = { "answered": pressed, "addr": pf_emails.addr, "msg": pf_emails.text, "explanation": pf_emails.explanation }
        pf_legitList.push(pf_newItem)
        pf_legitList.reverse();
        pf_legitList = pf_legitList.slice(0, 11)
        console.log(pf_legitList);
        pf_legit1A.innerText = pf_legitList[0].addr;
        pf_legit2A.innerText = pf_legitList[1].addr;
        pf_legit3A.innerText = pf_legitList[2].addr;
        pf_legit4A.innerText = pf_legitList[3].addr;
        pf_legit5A.innerText = pf_legitList[4].addr;
        pf_legit6A.innerText = pf_legitList[5].addr;
        pf_legit7A.innerText = pf_legitList[6].addr;
        pf_legit8A.innerText = pf_legitList[7].addr;
        pf_legit9A.innerText = pf_legitList[8].addr;
        pf_legit10A.innerText = pf_legitList[9].addr;
        pf_legit11A.innerText = pf_legitList[10].addr;
        pf_legit1M.innerText = pf_legitList[0].msg;
        pf_legit2M.innerText = pf_legitList[1].msg;
        pf_legit3M.innerText = pf_legitList[2].msg;
        pf_legit4M.innerText = pf_legitList[3].msg;
        pf_legit5M.innerText = pf_legitList[4].msg;
        pf_legit6M.innerText = pf_legitList[5].msg;
        pf_legit7M.innerText = pf_legitList[6].msg;
        pf_legit8M.innerText = pf_legitList[7].msg;
        pf_legit9M.innerText = pf_legitList[8].msg;
        pf_legit10M.innerText = pf_legitList[9].msg;
        pf_legit11M.innerText = pf_legitList[10].msg;
        pf_legit1E.innerText = pf_legitList[0].explanation;
        pf_legit2E.innerText = pf_legitList[1].explanation;
        pf_legit3E.innerText = pf_legitList[2].explanation;
        pf_legit4E.innerText = pf_legitList[3].explanation;
        pf_legit5E.innerText = pf_legitList[4].explanation;
        pf_legit6E.innerText = pf_legitList[5].explanation;
        pf_legit7E.innerText = pf_legitList[6].explanation;
        pf_legit8E.innerText = pf_legitList[7].explanation;
        pf_legit9E.innerText = pf_legitList[8].explanation;
        pf_legit10E.innerText = pf_legitList[9].explanation;
        pf_legit11E.innerText = pf_legitList[10].explanation;
        pf_clearClassForDot(pf_legit1D);
        pf_clearClassForDot(pf_legit2D);
        pf_clearClassForDot(pf_legit3D);
        pf_clearClassForDot(pf_legit4D);
        pf_clearClassForDot(pf_legit5D);
        pf_clearClassForDot(pf_legit6D);
        pf_clearClassForDot(pf_legit7D);
        pf_clearClassForDot(pf_legit8D);
        pf_clearClassForDot(pf_legit9D);
        pf_clearClassForDot(pf_legit10D);
        pf_clearClassForDot(pf_legit11D);
        pf_addClassForDot(pf_legit1D, pf_legitList[0].answered);
        pf_addClassForDot(pf_legit2D, pf_legitList[1].answered);
        pf_addClassForDot(pf_legit3D, pf_legitList[2].answered);
        pf_addClassForDot(pf_legit4D, pf_legitList[3].answered);
        pf_addClassForDot(pf_legit5D, pf_legitList[4].answered);
        pf_addClassForDot(pf_legit6D, pf_legitList[5].answered);
        pf_addClassForDot(pf_legit7D, pf_legitList[6].answered);
        pf_addClassForDot(pf_legit8D, pf_legitList[7].answered);
        pf_addClassForDot(pf_legit9D, pf_legitList[8].answered);
        pf_addClassForDot(pf_legit10D, pf_legitList[9].answered);
        pf_addClassForDot(pf_legit11D, pf_legitList[10].answered);
        pf_legitList.reverse()
    }
    function pf_phishDisplayArray(pressed) {
        var pf_newItem = { "answered": pressed, "addr": pf_emails.addr, "msg": pf_emails.text, "explanation": pf_emails.explanation }
        pf_phishList.push(pf_newItem)
        pf_phishList.reverse();
        pf_phishList = pf_phishList.slice(0, 11)
        pf_phish1A.innerText = pf_phishList[0].addr;
        pf_phish2A.innerText = pf_phishList[1].addr;
        pf_phish3A.innerText = pf_phishList[2].addr;
        pf_phish4A.innerText = pf_phishList[3].addr;
        pf_phish5A.innerText = pf_phishList[4].addr;
        pf_phish6A.innerText = pf_phishList[5].addr;
        pf_phish7A.innerText = pf_phishList[6].addr;
        pf_phish8A.innerText = pf_phishList[7].addr;
        pf_phish9A.innerText = pf_phishList[8].addr;
        pf_phish10A.innerText = pf_phishList[9].addr;
        pf_phish11A.innerText = pf_phishList[10].addr;
        pf_phish1M.innerText = pf_phishList[0].msg;
        pf_phish2M.innerText = pf_phishList[1].msg;
        pf_phish3M.innerText = pf_phishList[2].msg;
        pf_phish4M.innerText = pf_phishList[3].msg;
        pf_phish5M.innerText = pf_phishList[4].msg;
        pf_phish6M.innerText = pf_phishList[5].msg;
        pf_phish7M.innerText = pf_phishList[6].msg;
        pf_phish8M.innerText = pf_phishList[7].msg;
        pf_phish9M.innerText = pf_phishList[8].msg;
        pf_phish10M.innerText = pf_phishList[9].msg;
        pf_phish11M.innerText = pf_phishList[10].msg;
        pf_phish1E.innerText = pf_phishList[0].explanation;
        pf_phish2E.innerText = pf_phishList[1].explanation;
        pf_phish3E.innerText = pf_phishList[2].explanation;
        pf_phish4E.innerText = pf_phishList[3].explanation;
        pf_phish5E.innerText = pf_phishList[4].explanation;
        pf_phish6E.innerText = pf_phishList[5].explanation;
        pf_phish7E.innerText = pf_phishList[6].explanation;
        pf_phish8E.innerText = pf_phishList[7].explanation;
        pf_phish9E.innerText = pf_phishList[8].explanation;
        pf_phish10E.innerText = pf_phishList[9].explanation;
        pf_phish11E.innerText = pf_phishList[10].explanation;
        pf_clearClassForDot(pf_phish1D);
        pf_clearClassForDot(pf_phish2D);
        pf_clearClassForDot(pf_phish3D);
        pf_clearClassForDot(pf_phish4D);
        pf_clearClassForDot(pf_phish5D);
        pf_clearClassForDot(pf_phish6D);
        pf_clearClassForDot(pf_phish7D);
        pf_clearClassForDot(pf_phish8D);
        pf_clearClassForDot(pf_phish9D);
        pf_clearClassForDot(pf_phish10D);
        pf_clearClassForDot(pf_phish11D);
        pf_addClassForDot(pf_phish1D, pf_phishList[0].answered);
        pf_addClassForDot(pf_phish2D, pf_phishList[1].answered);
        pf_addClassForDot(pf_phish3D, pf_phishList[2].answered);
        pf_addClassForDot(pf_phish4D, pf_phishList[3].answered);
        pf_addClassForDot(pf_phish5D, pf_phishList[4].answered);
        pf_addClassForDot(pf_phish6D, pf_phishList[5].answered);
        pf_addClassForDot(pf_phish7D, pf_phishList[6].answered);
        pf_addClassForDot(pf_phish8D, pf_phishList[7].answered);
        pf_addClassForDot(pf_phish9D, pf_phishList[8].answered);
        pf_addClassForDot(pf_phish10D, pf_phishList[9].answered);
        pf_addClassForDot(pf_phish11D, pf_phishList[10].answered);
        pf_phishList.reverse()
    }

    function pf_clearClassForDot(pf_dotPic) {
        if (pf_dotPic.classList.contains('pf_correctL')) { pf_dotPic.classList.remove('pf_correctL') }
        if (pf_dotPic.classList.contains('pf_wrongL')) { pf_dotPic.classList.remove('pf_wrongL') }
        if (pf_dotPic.classList.contains('pf_correctP')) { pf_dotPic.classList.remove('pf_correctP') }
        if (pf_dotPic.classList.contains('pf_wrongP')) { pf_dotPic.classList.remove('pf_wrongP') }
    }
    function pf_addClassForDot(pf_dot, pf_addClass) {
        if (pf_addClass == "cL") { pf_dot.classList.add('pf_correctL') }
        else if (pf_addClass == "wL") { pf_dot.classList.add('pf_wrongL') }
        else if (pf_addClass == "cP") { pf_dot.classList.add('pf_correctP') }
        else if (pf_addClass == "wP") { pf_dot.classList.add('pf_wrongP') }
    }

    function pf_scoreAlgorithm() { pf_score = pf_score + ((pf_points - pf_scoreSubtractor) * pf_scoreMultiplier); }

    function pf_generateEmail() {
        var pf_randomIndex = Math.floor(Math.random() * pf_emailTexts.length)
        var pf_eText = pf_emailTexts[pf_randomIndex].text;
        if (pf_eText.includes('[Name]')) { pf_eText = pf_eText.replace('[Name]', pf_userName) }
        pf_emails = {
            text: pf_eText,
            phishing: pf_emailTexts[pf_randomIndex].phishing,
            addr: pf_emailTexts[pf_randomIndex].addr,
            explanation: pf_emailTexts[pf_randomIndex].explanation
        };
    }

    function pf_gameWin() {
        pf_restartGame();
        pf_score = pf_score + (pf_lives * 20);
        pf_scoreDisplay.innerText = pf_score
        pf_playerMessage.innerText = `URGENT!!!! Congratulations! You've won ${pf_score} points Click the link below to redeem your ReWaRdS and adjust your DiFfIcUlTy settings:`;
    }

    function pf_gameOver() {
        pf_restartGame();
        pf_gameOverMessage = "URGENT!!!! You have been baited! So your account is no longer safe. Click the link below to adjust your DiFfIcUlTy settings: You have been baited!!!";
        pf_scoreDisplay.innerText = "---"
        pf_playerMessage.innerText = pf_gameOverMessage;
    }

    function pf_restartGame() {
        clearInterval(pf_timerInterval);
        pf_addrDisplay.innerText = "legitOrPhish@lorp.com"
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
var pf_explanContainer = document.getElementById('pf_explanContainer')
function pf_explanShow(pf_inbox1, pf_inbox2) {
    if (pf_inbox2.innerHTML != "[Empty]") {
        pf_inbox1.classList.remove('hide');
        pf_inbox2.classList.remove('hide');
        pf_explanContainer.classList.remove('hide');
    }
}
function pf_explanHide(pf_inbox1, pf_inbox2) {
    if (pf_inbox2.innerHTML != "[Empty]") {
        pf_inbox1.classList.add('hide');
        pf_inbox2.classList.add('hide');
        pf_explanContainer.classList.add('hide');
    }
}

const pf_homeBtn = document.getElementById('pf_home');
pf_homeBtn.addEventListener('click', () => {
    pf_legitList = [pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty];
    pf_phishList = [pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty, pf_empty];
    pf_legit1A.innerText = pf_legitList[0].addr;
    pf_legit2A.innerText = pf_legitList[1].addr;
    pf_legit3A.innerText = pf_legitList[2].addr;
    pf_legit4A.innerText = pf_legitList[3].addr;
    pf_legit5A.innerText = pf_legitList[4].addr;
    pf_legit6A.innerText = pf_legitList[5].addr;
    pf_legit7A.innerText = pf_legitList[6].addr;
    pf_legit8A.innerText = pf_legitList[7].addr;
    pf_legit9A.innerText = pf_legitList[8].addr;
    pf_legit10A.innerText = pf_legitList[9].addr;
    pf_legit11A.innerText = pf_legitList[10].addr;
    pf_legit1M.innerText = pf_legitList[0].msg;
    pf_legit2M.innerText = pf_legitList[1].msg;
    pf_legit3M.innerText = pf_legitList[2].msg;
    pf_legit4M.innerText = pf_legitList[3].msg;
    pf_legit5M.innerText = pf_legitList[4].msg;
    pf_legit6M.innerText = pf_legitList[5].msg;
    pf_legit7M.innerText = pf_legitList[6].msg;
    pf_legit8M.innerText = pf_legitList[7].msg;
    pf_legit9M.innerText = pf_legitList[8].msg;
    pf_legit10M.innerText = pf_legitList[9].msg;
    pf_legit11M.innerText = pf_legitList[10].msg;
    pf_legit1E.innerText = pf_legitList[0].explanation;
    pf_legit2E.innerText = pf_legitList[1].explanation;
    pf_legit3E.innerText = pf_legitList[2].explanation;
    pf_legit4E.innerText = pf_legitList[3].explanation;
    pf_legit5E.innerText = pf_legitList[4].explanation;
    pf_legit6E.innerText = pf_legitList[5].explanation;
    pf_legit7E.innerText = pf_legitList[6].explanation;
    pf_legit8E.innerText = pf_legitList[7].explanation;
    pf_legit9E.innerText = pf_legitList[8].explanation;
    pf_legit10E.innerText = pf_legitList[9].explanation;
    pf_legit11E.innerText = pf_legitList[10].explanation;
    pf_clearClassForDot(pf_legit1D);
    pf_clearClassForDot(pf_legit2D);
    pf_clearClassForDot(pf_legit3D);
    pf_clearClassForDot(pf_legit4D);
    pf_clearClassForDot(pf_legit5D);
    pf_clearClassForDot(pf_legit6D);
    pf_clearClassForDot(pf_legit7D);
    pf_clearClassForDot(pf_legit8D);
    pf_clearClassForDot(pf_legit9D);
    pf_clearClassForDot(pf_legit10D);
    pf_clearClassForDot(pf_legit11D);
    pf_phish1A.innerText = pf_phishList[0].addr;
    pf_phish2A.innerText = pf_phishList[1].addr;
    pf_phish3A.innerText = pf_phishList[2].addr;
    pf_phish4A.innerText = pf_phishList[3].addr;
    pf_phish5A.innerText = pf_phishList[4].addr;
    pf_phish6A.innerText = pf_phishList[5].addr;
    pf_phish7A.innerText = pf_phishList[6].addr;
    pf_phish8A.innerText = pf_phishList[7].addr;
    pf_phish9A.innerText = pf_phishList[8].addr;
    pf_phish10A.innerText = pf_phishList[9].addr;
    pf_phish11A.innerText = pf_phishList[10].addr;
    pf_phish1M.innerText = pf_phishList[0].msg;
    pf_phish2M.innerText = pf_phishList[1].msg;
    pf_phish3M.innerText = pf_phishList[2].msg;
    pf_phish4M.innerText = pf_phishList[3].msg;
    pf_phish5M.innerText = pf_phishList[4].msg;
    pf_phish6M.innerText = pf_phishList[5].msg;
    pf_phish7M.innerText = pf_phishList[6].msg;
    pf_phish8M.innerText = pf_phishList[7].msg;
    pf_phish9M.innerText = pf_phishList[8].msg;
    pf_phish10M.innerText = pf_phishList[9].msg;
    pf_phish11M.innerText = pf_phishList[10].msg;
    pf_phish1E.innerText = pf_phishList[0].explanation;
    pf_phish2E.innerText = pf_phishList[1].explanation;
    pf_phish3E.innerText = pf_phishList[2].explanation;
    pf_phish4E.innerText = pf_phishList[3].explanation;
    pf_phish5E.innerText = pf_phishList[4].explanation;
    pf_phish6E.innerText = pf_phishList[5].explanation;
    pf_phish7E.innerText = pf_phishList[6].explanation;
    pf_phish8E.innerText = pf_phishList[7].explanation;
    pf_phish9E.innerText = pf_phishList[8].explanation;
    pf_phish10E.innerText = pf_phishList[9].explanation;
    pf_phish11E.innerText = pf_phishList[10].explanation;
    pf_clearClassForDot(pf_phish1D);
    pf_clearClassForDot(pf_phish2D);
    pf_clearClassForDot(pf_phish3D);
    pf_clearClassForDot(pf_phish4D);
    pf_clearClassForDot(pf_phish5D);
    pf_clearClassForDot(pf_phish6D);
    pf_clearClassForDot(pf_phish7D);
    pf_clearClassForDot(pf_phish8D);
    pf_clearClassForDot(pf_phish9D);
    pf_clearClassForDot(pf_phish10D);
    pf_clearClassForDot(pf_phish11D);
    pf_score = 0;
    pf_scoreDisplay.innerHTML = pf_score;
    pf_timeDisplay.innerHTML = pf_gameTime
    if (pf_life1.classList.contains('pf_lostLife')) { pf_life1.classList.remove('pf_lostLife'); }
    if (pf_life2.classList.contains('pf_lostLife')) { pf_life2.classList.remove('pf_lostLife'); }
    if (pf_life3.classList.contains('pf_lostLife')) { pf_life3.classList.remove('pf_lostLife'); }
    document.getElementById("phishingFrenzy").classList.add("hide");
    document.getElementById("homepage").classList.remove("hide");
});
function pf_clearClassForDot(pf_dotPic) {
    if (pf_dotPic.classList.contains('pf_correctL')) { pf_dotPic.classList.remove('pf_correctL') }
    if (pf_dotPic.classList.contains('pf_wrongL')) { pf_dotPic.classList.remove('pf_wrongL') }
    if (pf_dotPic.classList.contains('pf_correctP')) { pf_dotPic.classList.remove('pf_correctP') }
    if (pf_dotPic.classList.contains('pf_wrongP')) { pf_dotPic.classList.remove('pf_wrongP') }
}
