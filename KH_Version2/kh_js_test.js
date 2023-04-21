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
var i =0;
var correctButton;
var textbox = document.getElementById('kh_question');

let isCaeser = false;
let isPigPen = false;
let isTransposition = false;
let caeserDone = false;
let pigPenDone = false;
let transpositionDone = false;
const randomCaesarCipherVal = Math.floor(Math.random() * 5) + 1; // Random caeser between 1 and 6
var randomCipherChosen = Math.floor(Math.random() * 3) + 1; // random cipher between 1 and 3
var plainTextPrompt;

kh_display = document.querySelector('#kh_time');

const kh_startButton = document.getElementById('kh_start_btn');
const kh_homeButton = document.getElementById('kh_home_btn');
const kh_inGame = document.getElementById('kh_inGame');
const kh_msg = document.getElementById('kh_msg');
const kh_startScreen = document.getElementById('kh_startScreen');



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
    // kh_startTimer(kh_timed, kh_display);

    table_create();
    correctButton = setCorrectButton();
    console.log(`Correct button: row ${correctButton[0]}, column ${correctButton[1]}`); 

    kh_running();
}





//draw our table
function table_create() {
    const tableArray = document.getElementById('kh_table');
    for ( i = 0; i < 28; i++) {
      const tableRow = document.createElement('tr');
      tableArray.appendChild(tableRow);
  
      // add row label
      const rowLabel = document.createElement('td');
      if (i === 0 || i === 27) {
        rowLabel.innerText = ':)';
      } else {
        rowLabel.innerText = i;
      }
      tableRow.appendChild(rowLabel);
  
      for (let j = 0; j < 27; j++) {
        const tableCol = document.createElement('td');
        if (i === 0 || i ===27) {
          // add column label
          if ( j === 26) {
            tableCol.innerText = ':) ';
          } else {
            tableCol.innerText = String.fromCharCode(64 + j +1);
          }
        } 
        else {
          const khBtn = document.createElement('button');
          khBtn.classList.add('khBtn');
          khBtn.innerHTML = '';
          khBtn.value = i + 1;
          tableCol.appendChild(khBtn);
          if (j === 26) {
            tableCol.innerText = i;
          }
        }
        tableRow.appendChild(tableCol);
      }
    }
  }

  function setCorrectButton() {
  const randomRow = Math.floor(Math.random() * 25) + 1; // Random row between 1 and 26
  const randomCol = Math.floor(Math.random() * 25) + 1; // Random column between 1 and 26

  
  // Set the correct button
  const table = document.getElementById('kh_table');
  const button = table.rows[randomRow].cells[randomCol].querySelector('.khBtn');
  button.dataset.correct = 'true'; // Mark the button as correct
  switch (randomCipherChosen){
    case (1):
      isCaeser = true;
      document.getElementById('kh_question').innerHTML = " a Caeser Cipher shift by " + randomCaesarCipherVal + " The column is " +  ((randomCaesarCipherVal+randomCol) +9).toString(36).toUpperCase() + " The row is "+  randomRow;
      break;
    case 2:
      isPigPen = true;
      plainTextPrompt = " a PigPen Cipher! The answer is row " + spellOutNumber(randomRow) + " and the column is " +  spellOutNumber(randomCol);
      generatePigPen(plainTextPrompt);
      break;
    case 3: 
      isTransposition = true;
      plainTextPrompt = " A basic transposition Cipher the answer is row " + spellOutNumber(randomRow) + " and the column is " +  spellOutNumber(randomCol);

      document.getElementById('kh_question').innerHTML = shiftBackwardByValue(plainTextPrompt, randomCaesarCipherVal);
  }
  // Return the coordinates of the correct button
 
  return [randomRow, randomCol];
  }

  

  
  function kh_running() {
    const kh_buttons = document.getElementsByClassName("khBtn");
    const kh_buttonPressed = kh_e => {
        const kh_btn = kh_e.target;
        const kh_row = kh_btn.parentElement.parentElement.rowIndex;
        const kh_col = kh_btn.parentElement.cellIndex;
        const kh_gridVal = String.fromCharCode(kh_col + 64) + kh_row;
        const kh_btnVal = "You Pressed: " + kh_gridVal;
        document.getElementById('kh_btnVal').innerHTML = kh_btnVal;
        
        kh_btn.disabled = true;
       console.log(kh_row, '+', kh_col);
        if (kh_row === correctButton[0] && kh_col === correctButton[1]) {
            kh_btn.classList.add('kh_correct');
            kh_count++;
            // if (kh_count == kh_totalQuestions) {
            //     kh_finished();
            // }
        } else {
            kh_btn.classList.add('kh_incorrect');
            kh_buzz++;
        }
    }
    for (let kh_button of kh_buttons) {
        kh_button.addEventListener("click", kh_buttonPressed);
    }
}

function generatePigPen(plaintext) {
  
  for (var i = 0; i < plaintext.length; i++) {
      if (plaintext.charAt(i) == " ") {
          //var spaceChar = document.createElement('span');
          var spaceChar = document.createTextNode("\u2003");
          textbox.appendChild(spaceChar);


      }
      else {
          var char = plaintext.charAt(i).toLowerCase();
          var img = document.createElement('img');
          var imgTitle = 'PigPenImg/pigpen' + char.toUpperCase() + '.png';
          img.src = imgTitle;
          img.alt = char;
          img.classList.add('picBack');
          textbox.appendChild(img);
      }
  }
}

function shiftBackwardByValue(plaintext, shiftBy) {
  // Split the plaintext into an array of words
  const words = plaintext.split(' ');

  // Shift each letter within each word by two characters to the left
  const shiftedWords = words.map(word => {
    const chars = word.split('');
    const shiftedChars = chars.slice(shiftBy).concat(chars.slice(0, shiftBy));
    return shiftedChars.join('');
  });

  // Join the shifted words back into a string and return it
  return shiftedWords.join(' ');
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

function spellOutNumber(num) {
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = [null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  if (num < 0 || num > 9999) {
    return 'Number out of range';
  }

  let words = '';

  let tensAndOnes = num % 100;

  if (tensAndOnes >= 10 && tensAndOnes < 20) {
    words += teens[tensAndOnes - 10];
  } else {
    let tensDigit = Math.floor(tensAndOnes / 10);
    let onesDigit = tensAndOnes % 10;

    if (tensDigit > 0) {
      words += tens[tensDigit] + ' ';
    }

    if (onesDigit > 0) {
      words += ones[onesDigit];
    }
  }

  return words.trim();
}