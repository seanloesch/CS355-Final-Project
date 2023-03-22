let score = 0;
let time = 0;
var emails = null;
var messageDisplay;
var scoreDisplay;
var timeDisplay;
var emailDisplay;
var reportButton;
var emailInterval;
const gameTime = 60;
point=2000;

var gameOverMessage;

var startTime = Math.floor(Date.now() / 1000)

messageDisplay = document.getElementById("messageDisplay");
scoreDisplay = document.getElementById("scoreDisplay");
timeDisplay = document.getElementById("timeDisplay");
emailDisplay = document.getElementById("emailDisplay");
reportButton = document.getElementById("report_button");
response = document.getElementById("response");
function generateEmail() {

    const emailTexts = [
        {
            phishing: false,
            text: "Dear valued customer, we have an exciting offer just for you! Click the link to learn more.",
        },
        {
            phishing: true,
            text: "Your bank account has been frozen! Click this link to verify your identity and unlock your account.",
        },
        {
            phishing: false,
            text: "Hi there, just following up on the proposal we discussed last week. Can you give me a call to discuss further?",
        },
        {
            phishing: true,
            text: "Your Amazon account has been hacked! Click this link to reset your password and secure your account.",
        },
        {
            phishing: false,
            text: "Greetings, I wanted to touch base with you about the project timeline. Are we still on track for the end of the month?",
        },
        {
            phishing: true,
            text: "Your PayPal account has been compromised! Click this link to verify your account information and prevent further damage.",
        },
        {
            phishing: false,
            text: "Hello, please review the attached document and let me know your thoughts. Thank you!",
        },
        {
            phishing: true,
            text: "Your account has been compromised! Click this link to reset your password immediately!",
        },
    ];

    var randomIndex = Math.floor(Math.random() * emailTexts.length)

    const randomText = emailTexts[randomIndex].text;
    const randomphishing = emailTexts[randomIndex].phishing;
    return {
        text: randomText,
        phishing: randomphishing,
    };
}

reportButton.addEventListener('click', () => {
    if (emails.phishing) {
        score=score+point;
        clearInterval(emailInterval)
        emailInt();
        updateGame();
    }
    else {
        gameOverMessage = "That was a real Email"
        gameOver();
    }
});

function updateScoreAndTime() {
    var elapsedTime = Math.floor(Date.now() / 1000) - startTime;
    var timeRemaining = gameTime - elapsedTime;
    if (timeRemaining <= 0) {
        clearInterval(emailInterval);
        clearInterval(timerInterval);
        gameWin();
    }
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeRemaining;
}

function checkEmail(){
    if(emails == null){
        updateGame();
    }
    else if(emails.phishing){
        gameOverMessage = "You have been phished!!!";
        gameOver();
    }
    else{
        score = score + 1000;
        updateGame();
    }    
}
function updateGame() {
    clearInterval(pointInterval);
    pointInt();
    point=2000;
    emails = generateEmail();
    console.log(emails.phishing);
    emailDisplay.innerText = emails.text
}

function gameWin() {
    messageDisplay.innerText = "Congratulations! You've won!";
    scoreDisplay.innerText = `Final Score: ${score}`;
    clearInterval(emailInterval);
    clearInterval(pointInterval);
    clearInterval(timerInterval);
    reportButton.disabled = true;
}

function gameOver() {
    messageDisplay.innerText = gameOverMessage;
    scoreDisplay.innerText = `Final Score: ${score}`;
    clearInterval(emailInterval);
    clearInterval(pointInterval);
    clearInterval(timerInterval);
    reportButton.disabled = true;
}
let timerInterval = setInterval(updateScoreAndTime, 1000);

function emailInt() { emailInterval = setInterval(checkEmail, 2000); }
emailInt();


function pointInt() { pointInterval = setInterval(lowerScore, 100); }
pointInt();

function lowerScore(){
    point=point-100
}
