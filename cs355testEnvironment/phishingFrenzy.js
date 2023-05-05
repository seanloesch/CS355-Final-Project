var pf_userName = "nickname" //this will change depending on PHP

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
var pf_topHome = document.getElementById('pf_topHome');
var pf_topHomeText = document.getElementById('pf_topHomeText');
var pf_life1 = document.getElementById('pf_life1');
var pf_life2 = document.getElementById('pf_life2');
var pf_life3 = document.getElementById('pf_life3');
const pf_legitInbox = document.getElementById('pf_legitInbox');
const pf_pishInbox = document.getElementById('pf_phishInbox');
const pf_explanContainer = document.getElementById('pf_explanContainer');
const pf_emp = { answered: 'empty', addr: '[Empty]', msg: '[Empty]', explanation: 'There is no email', }
var pf_legitArray = [pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp];
var pf_phishArray = [pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp];

var pf_monitorMouseOver = 0;

pf_generateArray();
function pf_generateArray() {
    while (pf_legitInbox.firstChild) {
        pf_legitInbox.removeChild(pf_legitInbox.firstChild);
    }
    while (pf_pishInbox.firstChild) {
        pf_pishInbox.removeChild(pf_pishInbox.firstChild);
    }
    while (pf_explanContainer.firstChild) {
        pf_explanContainer.removeChild(pf_explanContainer.firstChild);
    }
    createInbox();
}
function createInbox() {
    pf_legitArray.reverse()
    pf_phishArray.reverse()
    pf_legitArray = pf_legitArray.slice(0, 11)
    pf_phishArray = pf_phishArray.slice(0, 11)
    for (let i = 0; i <= 10; i++) {
        var pf_Laddress = pf_legitArray[i].addr
        var pf_Paddress = pf_phishArray[i].addr
        var pf_Ldot = pf_legitArray[i].answered
        var pf_Pdot = pf_phishArray[i].answered
        const pf_Ldiv = pf_createDiv('pf_inboxItem', `pf_dot_legit_line${i}`, `pf_addrInbox_legit_line${i}`, pf_Laddress, pf_Ldot);
        const pf_Pdiv = pf_createDiv('pf_inboxItem', `pf_dot_phish_line${i}`, `pf_addrInbox_phish_line${i}`, pf_Paddress, pf_Pdot);
        pf_legitInbox.appendChild(pf_Ldiv);
        pf_pishInbox.appendChild(pf_Pdiv);
        addListeners(pf_Ldiv, i, 'pf_LmsgInbox', 'pf_LexpInbox', 'pf_messagpf_eheader', 'pf_messageHr', 'pf_explanationHr', 'pf_explanationHeader', true);
        addListeners(pf_Pdiv, i, 'pf_PmsgInbox', 'pf_PexpInbox', 'pf_messagpf_eheader', 'pf_messageHr', 'pf_explanationHr', 'pf_explanationHeader', false);
    }
    addMessageAndExplanation(pf_explanContainer, 10, 'pf_LmsgInbox', 'pf_LexpInbox', 'pf_explanationInbox', true);
    addMessageAndExplanation(pf_explanContainer, 10, 'pf_PmsgInbox', 'pf_PexpInbox', 'pf_explanationInbox', false);
    pf_legitArray.reverse()
    pf_phishArray.reverse()
}

function pf_createDiv(pf_className, pf_dotId, pf_addrId, pf_item, pf_dotBack) {
    const pf_div = document.createElement('div');
    pf_div.classList.add(pf_className);
    const pf_dot = document.createElement('div');
    pf_dot.id = pf_dotId;
    pf_dot.classList.add('pf_dot');
    if (pf_dotBack == "cL") { pf_dot.classList.add('pf_correctL') }
    if (pf_dotBack == "wL") { pf_dot.classList.add('pf_wrongL') }
    if (pf_dotBack == "cP") { pf_dot.classList.add('pf_correctP') }
    if (pf_dotBack == "wP") { pf_dot.classList.add('pf_wrongP') }
    pf_div.appendChild(pf_dot);
    const pf_addr = document.createElement('div');
    pf_addr.id = pf_addrId;
    pf_addr.classList.add('pf_addrInbox');
    pf_addr.innerText = pf_item;
    pf_div.appendChild(pf_addr);
    return pf_div;
}

function addListeners(pf_div, pf_index, pf_msgPrefix, pf_expPrefix, pf_mhe, pf_mhr, pf_ehe, pf_ehr, pf_boolean) {
    const pf_msgId = `${pf_msgPrefix}${pf_index}`;
    const pf_expId = `${pf_expPrefix}${pf_index}`;
    var pf_PorL = pf_index;
    if (!pf_boolean) { pf_PorL = pf_index + 11 }
    const pf_mheader = `${pf_mhe}${pf_PorL}`;
    const pf_mhrspan = `${pf_mhr}${pf_PorL}`;
    const pf_eheader = `${pf_ehe}${pf_PorL}`;
    const pf_ehrspan = `${pf_ehr}${pf_PorL}`;
    if (pf_div.innerText != "[Empty]") {
        pf_div.addEventListener('mouseover', () => {
            pf_explanContainer.classList.remove('hide');
            if (pf_playGame.classList.contains('hide')) {
                pf_difficultySelector.classList.add('hide');
                pf_monitorMouseOver = 1;
            }
            else {
                pf_playGame.classList.add('hide');
                pf_monitorMouseOver = 2;
            }
            document.getElementById(pf_msgId).classList.remove('hide');
            document.getElementById(pf_expId).classList.remove('hide');
            document.getElementById(pf_mheader).classList.remove('hide');
            document.getElementById(pf_mhrspan).classList.remove('hide');
            document.getElementById(pf_eheader).classList.remove('hide');
            document.getElementById(pf_ehrspan).classList.remove('hide');
        });
        pf_div.addEventListener('mouseout', () => {
            pf_explanContainer.classList.add('hide');
            if (pf_monitorMouseOver == 1) { pf_difficultySelector.classList.remove('hide'); }
            else { pf_playGame.classList.remove('hide'); }
            document.getElementById(pf_msgId).classList.add('hide');
            document.getElementById(pf_expId).classList.add('hide');
            document.getElementById(pf_mheader).classList.add('hide');
            document.getElementById(pf_mhrspan).classList.add('hide');
            document.getElementById(pf_eheader).classList.add('hide');
            document.getElementById(pf_ehrspan).classList.add('hide');
        });
    }
}

function addMessageAndExplanation(pf_container, pf_inboxCount, pf_msgPrefix, pf_expPrefix, pf_explClassName, pf_boolean) {
    for (let i = 0; i <= pf_inboxCount; i++) {
        var pf_whichArray = i;
        if (!pf_boolean) { pf_whichArray = i + 11 }
        const pf_mheader = pf_createheader('Message:');
        pf_mheader.id = `pf_messagpf_eheader${pf_whichArray}`;
        pf_mheader.classList.add('hide');
        const pf_messageHr = document.createElement('hr');
        pf_messageHr.id = `pf_messageHr${pf_whichArray}`;
        pf_messageHr.classList.add('hide');
        const pf_msgBox = document.createElement('div');
        pf_msgBox.id = `${pf_msgPrefix}${i}`;
        pf_msgBox.classList.add(pf_explClassName, 'hide');
        pf_msgBox.innerText = pf_phishArray[i].msg
        if (pf_boolean) { pf_msgBox.innerText = pf_legitArray[i].msg }
        const pf_explanationHeader = pf_createheader('Explanation:');
        pf_explanationHeader.id = `pf_explanationHeader${pf_whichArray}`;
        pf_explanationHeader.classList.add('hide');
        const pf_explanationHr = document.createElement('hr');
        pf_explanationHr.id = `pf_explanationHr${pf_whichArray}`;
        pf_explanationHr.classList.add('hide');
        const pf_expBox = document.createElement('div');
        pf_expBox.id = `${pf_expPrefix}${i}`;
        pf_expBox.classList.add(pf_explClassName, 'hide');
        pf_expBox.innerText = pf_phishArray[i].explanation
        if (pf_boolean) { pf_expBox.innerText = pf_legitArray[i].explanation }
        pf_container.appendChild(pf_mheader);
        pf_container.appendChild(pf_messageHr);
        pf_container.appendChild(pf_msgBox);
        pf_container.appendChild(pf_explanationHeader);
        pf_container.appendChild(pf_explanationHr);
        pf_container.appendChild(pf_expBox);
    }
}
function pf_createheader(text) {
    const pf_header = document.createElement('p');
    pf_header.innerHTML = `<b>${text}</b>`;
    return pf_header;
}
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
    pf_topHome.classList.remove('hide');
    pf_topHomeText.classList.remove('hide');
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
        else if( x === "home"){

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
                addLegitPhish("cP", true);
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
            else {
                addLegitPhish("wL", false);
                pf_loseLife();
            }
        }
        else {
            if (pf_emails.phishing) {
                addLegitPhish('wP', true);
                pf_loseLife();
            }
            else {
                addLegitPhish("cL", false);
                pf_scoreAlgorithm();
                pf_updateGame(pf_reload);
            }
        }
    }
    function addLegitPhish(CorL, bool) {
        const pf_newObj = {
            answered: CorL,
            addr: pf_emails.addr,
            msg: pf_emails.text,
            explanation: pf_emails.explanation,
        }
        if (bool) { pf_phishArray.push(pf_newObj) }
        else { pf_legitArray.push(pf_newObj) }
        pf_generateArray();
    };
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
    document.getElementById('pf_topHome').addEventListener('click', pf_homeSelected);
    function pf_homeSelected(){
        pf_updateGame("home");
        pf_restartGame();
        pf_gameOverMessage = "URGENT!!! Click a link below to adjust your DiFfIcUlTy settings!!!";
        pf_scoreDisplay.innerText = "---"
        pf_playerMessage.innerText = pf_gameOverMessage;

    }
    function pf_restartGame() {
        clearInterval(pf_timerInterval);
        pf_topHome.classList.add('hide')
        pf_topHomeText.classList.add('hide');
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
        pf_updateGame(pf_reload);
    }
}
document.getElementById('pf_home').addEventListener('click', pf_gohome);
function pf_gohome() {
    pf_legitArray = [pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp];
    pf_phishArray = [pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp, pf_emp];
    pf_generateArray();
    pf_score = 0;
    pf_scoreDisplay.innerHTML = pf_score;
    pf_timeDisplay.innerHTML = pf_gameTime
    if (pf_life1.classList.contains('pf_lostLife')) { pf_life1.classList.remove('pf_lostLife'); }
    if (pf_life2.classList.contains('pf_lostLife')) { pf_life2.classList.remove('pf_lostLife'); }
    if (pf_life3.classList.contains('pf_lostLife')) { pf_life3.classList.remove('pf_lostLife'); }
    document.getElementById("phishingFrenzy").classList.add("hide");
    document.getElementById("homepage").classList.remove("hide");
    document.body.style.overflowY = "scroll"
}
