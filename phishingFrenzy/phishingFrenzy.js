let score = 0;
let time = 0;
var emails;
var scoreDisplay;
var timeDisplay;
var emailDisplay;
var reportButton;
var timerInterval;
var emailInterval;
var pointInterval;
const gameTime = 60;
var easy = 3000;
var medium = 2000;
var hard = 1000;
var difficulty;
var gameOverMessage;
const win = "win"
const lose = "lose"
const reload = "reload"

var startTime;

var endGame = false;

scoreDisplay = document.getElementById("scoreDisplay");
timeDisplay = document.getElementById("timeDisplay");
emailDisplay = document.getElementById("emailDisplay");
reportButton = document.getElementById("report_button");
easyButton = document.getElementById("easy");
mediumButton = document.getElementById("medium");
hardButton = document.getElementById("hard");
playGame = document.getElementById('inGame')
difficultySelector = document.getElementById('difficultySelector')
playerMessage = document.getElementById('playerMessage')

easyButton.addEventListener('click', () => {
    difficulty = easy;
    startGame();
});

mediumButton.addEventListener('click', () => {
    difficulty = medium;
    startGame();
});

hardButton.addEventListener('click', () => {
    difficulty = hard;
    startGame();
});

function startGame() {
    difficultySelector.classList.add('hide');
    playGame.classList.remove('hide');
    point = difficulty;
    score = 0;
    time = 0;
    endGame = false;
    emailInterval = null;
    email = null;
    startTime = Math.floor(Date.now() / 1000);
    phishingFrenzy()
}

function phishingFrenzy() {

    updateGame(reload);
    function updateGame(x) {
        clearInterval(emailInterval);
        clearInterval(pointInterval);
        if (x === reload) {
            generateEmail();
            console.log(emails);
            emailDisplay.innerText = emails.text
            emailInterval = setInterval(function () {
                checkEmail(false);
            }, difficulty);
            point = difficulty;
            pointInterval = setInterval(function () {
                lowerScore();
            }, 100);
        }
        else if (x === lose) {
            gameOver();
        }
        else {
            gameWin();
        }
    }

    reportButton.addEventListener('click', reportButtonClick);
    function reportButtonClick() { checkEmail(true); }

    function checkEmail(reported) {
        if (reported) {
            if (emails.phishing) {
                score = score + point;
                updateGame(reload);
            }
            else {
                gameOverMessage = "That was a real Email"
                endGame = true;
                updateGame(lose);
            }
        }
        else {
            if (emails.phishing) {
                gameOverMessage = "You have been phished!!!";
                updateGame(lose);
            }
            else {
                score = score + 1000;
                updateGame(reload);
            }
        }
    }
    function lowerScore() {
        if (point <= 0) {
            clearInterval(pointInterval);
        }
        else {
            point = point - 100;
        }
    }

    function gameWin() {
        restartGame();
        playerMessage.innerText = `Congratulations! You've won! Final Score: ${score}`;
    }

    function gameOver() {
        restartGame();
        playerMessage.innerText = gameOverMessage;
    }

    function restartGame() {
        clearInterval(timerInterval);
        playGame.classList.add('hide');
        difficultySelector.classList.remove('hide')
        reportButton.removeEventListener('click', reportButtonClick);
    }

    let timerInterval = setInterval(updateScoreAndTime, 1000);
    function updateScoreAndTime() {
        var elapsedTime = Math.floor(Date.now() / 1000) - startTime;
        var timeRemaining = gameTime - elapsedTime;
        if (timeRemaining <= 0) {
            endGame = true;
            updateGame(win);
        }
        scoreDisplay.innerText = score;
        timeDisplay.innerText = timeRemaining;
    }
    function generateEmail() {

        const emailTexts = [
            {
                phishing: false,
                text: "Hello [Your Name], I hope this email finds you well. We are excited to announce a new product that we think you will love. Check it out at the link below.",
            },
            {
                phishing: true,
                text: "Important notice: Your Apple ID has been suspended due to suspicious activity. Click this link to restore your account and prevent further damage.",
            },
            {
                phishing: false,
                text: "Dear [Recipient Name], thank you for your recent purchase. Your order has been shipped and should arrive within 2-3 business days. You can track your package at the link below.",
            },
            {
                phishing: true,
                text: "URGENT: Your Google account has been hacked! Click this link to reset your password and secure your account immediately.",
            },
            {
                phishing: false,
                text: "Hi [Recipient Name], I wanted to touch base and see how things are going with the project. Let me know if there's anything I can do to help.",
            },
            {
                phishing: true,
                text: "Security alert: Your Facebook account has been compromised! Click this link to verify your account information and prevent unauthorized access.",
            },
            {
                phishing: false,
                text: "Hello [Your Name], I hope this email finds you well. I wanted to share an interesting article I came across that I thought you might enjoy. Check it out at the link below.",
            },
            {
                phishing: true,
                text: "Attention: Your Microsoft account has been breached! Click this link to change your password and protect your sensitive information.",
            },
            {
                phishing: false,
                text: "Good morning, I wanted to follow up on the job application you submitted. Can you please provide your availability for an interview?"
            },
            {
                phishing: true,
                text: "Your Facebook account has been flagged for suspicious activity! Click this link to secure your account before it's too late."
            },
            {
                phishing: false,
                text: "Dear [Name], I hope this email finds you well. I wanted to touch base with you about the upcoming conference. Are you planning to attend?"
            },
            {
                phishing: true,
                text: "Your Netflix subscription has been canceled! Click this link to reactivate your account and avoid any additional charges."
            },
            {
                phishing: false,
                text: "Hi [Name], just wanted to let you know that the team is making great progress on the project. We should be able to meet our deadline without any issues."
            },
            {
                phishing: true,
                text: "Your Apple ID has been locked for security reasons! Click this link to unlock your account and avoid permanent suspension."
            },
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
        emails = {
            text: emailTexts[randomIndex].text,
            phishing: emailTexts[randomIndex].phishing,
        };
    }
}