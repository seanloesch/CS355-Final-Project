var kh_elements = [];
var kh_add_value = [];
var kh_rank = 1;
const kh_totalQuestions = 1;
var kh_questionBoxArray = new Array(4);
var kh_answers = [];
var kh_buzz =0;
var kh_clearing;
var kh_count =0;
var kh_numMinutes = 5;
var i = 0;
var correctButton;
var textbox = document.getElementById('kh_question');
var cipherSelecter =0;
var remainingAttempts =5;
var playerSccore = 100;
var kh_duration;
var kh_check_minutes;
var kh_seconds;
var kh_displayedMinutes;
var firstGame = true;
var kh_ciphers_completed = 0;


let kh_panelActive = false;
let kh_dictActive = false;
let kh_msgActive = false;
let kh_noteActive = false;
let kh_helpActive = false;

let isCaeser = false;
let isPigPen = false;
let isTransposition = false;
let isZigZag = false;
let caeserDone = false;
let pigPenDone = false;
let transpositionDone = false;
const randomCaesarCipherVal = Math.floor(Math.random() * 5) + 1; // Random caeser between 1 and 6
var randomCipherChosenValue = 0;
var previousCipherChosenValue = 0;
let easyMode = false;
let mediumMode = false;
let hardMode = false;


var plainTextPrompt;

kh_timer_display = document.querySelector('#kh_timer');

const kh_easyButton = document.getElementById('kh_easy_btn');
const kh_mediumButton = document.getElementById('kh_medium_btn');
const kh_hardButton = document.getElementById('kh_hard_btn');

const kh_notebook = document.getElementById('kh_note_textarea');

const kh_homeButton = document.getElementById('kh_home_btn');
const kh_inGame = document.getElementById('kh_inGame');
const kh_tabsContainer = document.getElementById('kh_tabs_container');
const kh_msg = document.getElementById('kh_msg');
const kh_startScreen = document.getElementById('kh_startScreen');
const kh_panelContainer = document.getElementById('kh_panel_container');
const kh_dictPanel = document.getElementById('kh_dict_panel');
const kh_msgPanel = document.getElementById('kh_msg_panel');
const kh_notePanel = document.getElementById('kh_note_panel');
const kh_helpPanel = document.getElementById('kh_help_panel');

const kh_dictButton = document.getElementById('kh_dict_button');
const kh_msgButton = document.getElementById('kh_msg_button');
const kh_noteButton = document.getElementById('kh_note_button');
const kh_helpButton = document.getElementById('kh_help_button');

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'kh_css_test.css';



const easyOrder = [1,2,3];
var shuffledEasyOrder = easyOrder.sort(()=>Math.random()-.5);
kh_easyButton.addEventListener('click', randomEasyCipherChosen);
function randomEasyCipherChosen(){
  easyMode = true;
  kh_startGame();
  firstGame = false;
  console.log("the shuffled order is " + easyOrder)

  randomCipherChosenValue = easyOrder[cipherSelecter];
  switch(randomCipherChosenValue){
    case 1:
      
      
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 2:      
      console.log("random chosen cipher value is " + randomCipherChosenValue); 
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 3:
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
  }
  
  
  
}


const mediumOrder = [4,5,6];
var shuffledMediumOrder = mediumOrder.sort(()=>Math.random()-.5);
kh_mediumButton.addEventListener('click', randomMediumCipherChosen);
function randomMediumCipherChosen(){
  mediumMode = true;
  kh_startGame();
  firstGame = false;
  
  console.log("the shuffled order is " +mediumOrder)

  randomCipherChosenValue = mediumOrder[cipherSelecter];
  switch(randomCipherChosenValue){
    case 4:
      
      
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 5:      
      console.log("random chosen cipher value is " + randomCipherChosenValue); 
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 6:
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
  }
}

const hardOrder = [1,2,3,4,5,6];
var shuffledHardORder = hardOrder.sort(()=>Math.random()-.5);
kh_hardButton.addEventListener('click', randomHardCipherChosen);
function randomHardCipherChosen(){
  hardMode = true;
  kh_startGame();
  firstGame = false;
  console.log("the shuffled order is " +hardOrder);

  randomCipherChosenValue = hardOrder[cipherSelecter];
  switch(randomCipherChosenValue){
    case 1:
      
      
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 2:      
      console.log("random chosen cipher value is " + randomCipherChosenValue); 
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 3:
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 4:
      
      
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 5:      
      console.log("random chosen cipher value is " + randomCipherChosenValue); 
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
    case 6:
      console.log("random chosen cipher value is " + randomCipherChosenValue);
      correctButton = setCorrectButton(randomCipherChosenValue);
      console.log(`Correct button: row ${correctButton[0]}, column ${String.fromCharCode(64 + correctButton[1])}`);

      break;
  }
}



kh_homeButton.addEventListener('click', kh_goHome);
kh_dictButton.addEventListener('click', kh_toggleDict);
kh_msgButton.addEventListener('click', kh_toggleMsg);
kh_noteButton.addEventListener('click', kh_toggleNote);
kh_helpButton.addEventListener('click', kh_toggleHelp);



function kh_startGame() {
  
  kh_clearNotebook();

  document.getElementById('numberOfGuesses').innerHTML = remainingAttempts + " attempts left";
  document.getElementById('kh_score_keeper').innerHTML = "Score: " + playerSccore;
  if (easyMode || mediumMode) {
    document.getElementById('kh_ciphers_completed').innerHTML = "You have completed " + kh_ciphers_completed + "/3 ciphers";

  }
  if (hardMode) {
    document.getElementById('kh_ciphers_completed').innerHTML = "You have completed " + kh_ciphers_completed + "/6 ciphers";

  }
  kh_easyButton.classList.add('hide');
  kh_homeButton.classList.add('hide');
  kh_msg.classList.add('hide');
  kh_startScreen.classList.add('hide');
  kh_inGame.classList.remove('hide');
  // kh_tabsContainer.remove('hide');
  kh_dictPanel.classList.add('hide');
  kh_msgPanel.classList.add('hide');
  kh_notePanel.classList.add('hide');
  kh_helpPanel.classList.add('hide');
  
  if (firstGame){
    var kh_timed = 60 * kh_numMinutes;
    kh_startTimer(kh_timed, kh_timer_display);
  }
  
  
  

  table_create();
  

  kh_running();
}





// toggling the notepad functions


function kh_toggleDict() {
  if (kh_panelActive == false) {
    kh_turnOnDict();
  } 
  else if (kh_panelActive == true && kh_dictActive == true) {
    kh_turnOffDict();
  }   
}

function kh_turnOnDict() {
  kh_dictPanel.classList.remove('hide');
  kh_dictButton.style.backgroundColor = "rgb(150,200,255)";
  kh_dictButton.classList.add('new-pos');
  kh_panelActive = true;
  kh_dictActive = true;
}

function kh_turnOffDict() {
  kh_dictPanel.classList.add('hide');
  kh_dictButton.style.backgroundColor = 'white';
  kh_dictButton.classList.remove('new-pos');
  kh_panelActive = false;
  kh_dictActive = false;
}

function kh_toggleMsg() {
  if (kh_panelActive == false) {
    kh_turnOnMsg();
  } 
  else if (kh_panelActive == true && kh_msgActive == true) {
    kh_turnOffMsg();
  }    
}

function kh_turnOnMsg() {
  kh_msgPanel.classList.remove('hide');
  kh_msgButton.style.backgroundColor = "rgb(150,200,255)";
  kh_msgButton.classList.add('new-pos');
  kh_panelActive = true;
  kh_msgActive = true;
}

function kh_turnOffMsg() {
  kh_msgPanel.classList.add('hide');
  kh_msgButton.style.backgroundColor = 'white';
  kh_msgButton.classList.remove('new-pos');
  kh_panelActive = false;
  kh_msgActive = false;
}

function kh_toggleNote() {
  if (kh_panelActive == false) {
    kh_turnOnNote();
  } 
  else if (kh_panelActive == true && kh_noteActive == true) {
    kh_turnOffNote();
  }    
}

function kh_turnOnNote() {
  kh_notePanel.classList.remove('hide');
  kh_noteButton.style.backgroundColor = "rgb(150,200,255)";
  kh_noteButton.classList.add('new-pos');
  kh_panelActive = true;
  kh_noteActive = true;
}

function kh_turnOffNote() {
  kh_notePanel.classList.add('hide');
  kh_noteButton.style.backgroundColor = 'white';
  kh_noteButton.classList.remove('new-pos');
  kh_panelActive = false;
  kh_noteActive = false;
}

function kh_toggleHelp() {
  if (kh_panelActive == false) {
    kh_turnOnHelp();
  } 
  else if (kh_panelActive == true && kh_helpActive == true) {
    kh_turnOffHelp();
  }    
}

function kh_turnOnHelp() {
  kh_helpPanel.classList.remove('hide');
  kh_helpButton.style.backgroundColor = "rgb(150,200,255)";
  kh_helpButton.classList.add('new-pos');
  kh_panelActive = true;
  kh_helpActive = true;
}

function kh_turnOffHelp() {
  kh_helpPanel.classList.add('hide');
  kh_helpButton.style.backgroundColor = 'white';
  kh_helpButton.classList.remove('new-pos');
  kh_panelActive = false;
  kh_helpActive = false;
}

function kh_clearNotebook() {
  var kh_notebook = document.getElementById('kh_note_textarea');
  kh_notebook.value=''
}

//draw our table
function table_create() {
  const tableArray = document.getElementById('kh_table');
  for (i = 0; i < 28; i++) {
    const tableRow = document.createElement('tr');
    tableRow.id = 'kh_tr';
    tableRow.class = 'kh_tr';

    tableArray.appendChild(tableRow);

    // add row label
    const cellLabel = document.createElement('td');
    cellLabel.id = 'kh_td';
    cellLabel.class = 'kh_td';

    if (i === 0 || i === 27) {
      cellLabel.innerText = ':)';
    } else {
      cellLabel.innerText = i;
    }
    tableRow.appendChild(cellLabel);

    for (let j = 0; j < 27; j++) {
      const tableCol = document.createElement('td');
      tableCol.id = 'kh_td';
      tableCol.class = 'kh_td';

      if (i === 0 || i === 27) {
        // add column label
        if (j === 26) {
          tableCol.innerText = ':) ';
        } else {
          tableCol.innerText = String.fromCharCode(64 + j + 1);
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

//*----------- sets the correct button in each grid while also displaying the appropriate cipher chosen from easy-hard arrays----*

function setCorrectButton(ranValue) {
  const randomRow = Math.floor(Math.random() * 25) + 1; // Random row between 1 and 26
  const randomCol = Math.floor(Math.random() * 25) + 1; // Random column between 1 and 26
  // Set the correct button
  const table = document.getElementById('kh_table');
  const button = table.rows[randomRow].cells[randomCol].querySelector('.khBtn');
  button.dataset.correct = 'true'; // Mark the button as correct
  
  switch (ranValue) {
    case 1:
      isCaeser = true;
      
      document.getElementById('kh_question').innerHTML = "A Caesar Cipher shift by " + randomCaesarCipherVal + ". The column is " + ((randomCaesarCipherVal + randomCol) + 9).toString(36).toUpperCase() + ". The row is " + randomRow + ".";
      //document.getElementById('question_box').innerHTML = "3";
      break;
    case 2:
      isPigPen = true;
      document.getElementById('kh_question').innerHTML = ""
      plainTextPrompt = " a PigPen Cipher The answer is row " + spellOutNumber(randomRow) + " and the column is " + spellOutNumber(randomCol);
      generatePigPen(plainTextPrompt);
      document.getElementById('kh_dict_panel').insertAdjacentHTML('beforeend', "<img src=\"img\\pigpen\\pigpencipheralphabet.png\" width=\"350px\" height=\"350px\">");
      break;
    case 3:
      isTransposition = true;
      plainTextPrompt = " A basic transposition cipher the answer is row " + spellOutNumber(randomRow) + " and the column is " + spellOutNumber(randomCol);
      document.getElementById('kh_question').innerHTML = shiftBackwardByValue(plainTextPrompt, randomCaesarCipherVal);
      document.getElementById('kh_dict_panel').insertAdjacentHTML('beforeend', "the alphabet here is your standard alphabet! A=A and so forth :)");
      break;
    case 4:
      isAtbash = true;
      plainTextPrompt = "atbash cipher, the answer you are looking for is " + spellOutNumber(randomRow) + " and the column is " + spellOutNumber(randomCol);
      document.getElementById('kh_question').innerHTML = atbashCipher(plainTextPrompt);
      break;
    case 5:
      isZigZag = true;
      plainTextPrompt = "zigzag cipher, row: " + spellOutNumber(randomRow) + " column: " + spellOutNumber(randomCol);
      document.getElementById('kh_question').innerHTML = zigzagCipher(plainTextPrompt,3);
      document.getElementById('kh_dict_panel').innerHTML = "<img src=\"img\\dict_images\\zigzag.png\" width=\"250px\" height=\"200px\">";
      break;
    case 6:
      
      plainTextPrompt = "polybius cipher, the answer you are looking for is " + spellOutNumber(randomRow) + " and the column is " + spellOutNumber(randomCol);
      document.getElementById('kh_question').innerHTML = GeneratePolybiusCipher(plainTextPrompt);
      

      const table = document.createElement('table');

      // Array of letters to use in the table
      const letters = "abcdefghiklmnopqrstuvwxyz".split("");

      // Create rows and columns
      for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 6; j++) {
          const cell = document.createElement('td');
          
          if (i === 0 && j > 0) {
            // Set column labels
            //cell.textContent = j;
          } else if (j === 0 && i > 0) {
            // Set row labels
            //cell.textContent = i;
          } else if (i > 0 && j > 0) {
            // Encode letters using the Polybius cipher
            const index = (i - 1) * 5 + j - 1;
            cell.textContent = `${i}${j} ${letters[index].toUpperCase()}`;
          }
          
          row.appendChild(cell);
        }
        
        table.appendChild(row);
      }
      document.getElementById('kh_dict_panel').appendChild(table); // add table to the document
      break;
  }
  // Return the coordinates of the correct button
  
  return [randomRow, randomCol];
}


function GeneratePolybiusCipher(plainTextPrompt){
  const square = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I/J', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ];
  
  // Convert the message to uppercase and remove any characters that aren't letters or spaces
  plainTextPrompt = plainTextPrompt.toUpperCase().replace(/[^A-Z\s]/g, '');
  
  // Replace each letter in the plainTextPrompt with its corresponding Polybius square coordinates
  let result = '';
  for (let i = 0; i < plainTextPrompt.length; i++) {
    const letter = plainTextPrompt.charAt(i);
    if (letter === ' ') {
      result += ' ';
    } else {
      for (let row = 0; row < square.length; row++) {
        const col = square[row].indexOf(letter);
        if (col !== -1) {
          result += (row + 1) + '' + (col + 1);
          break;
        }
      }
    }
  }
  
  return result;
}


// ---------------------------- main game loop for  guessing write or wrong answer ---------------------- //
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
      console.log("kh_count value is " + kh_count);
      if (easyMode || mediumMode) {
        if (kh_count == 1 || kh_count ==2) {
          if (easyMode){
            kh_ciphers_completed = kh_count;
            kh_buttonReset();
            cipherSelecter++;
            var correctButtonToAddMessage = String.fromCharCode(64 + correctButton[1]);
            document.getElementById('kh_note_panel').innerHTML += correctButtonToAddMessage;
            randomEasyCipherChosen();
          } else if (mediumMode) {
            kh_buttonReset();
            cipherSelecter++;
            var correctButtonToAddMessage = String.fromCharCode(64 + correctButton[1]);
            document.getElementById('kh_note_panel').innerHTML += correctButtonToAddMessage;
            randomMediumCipherChosen();
          } 
        } else if(kh_count == 3) {
          kh_finished();
        }
      } else if (hardMode){
        if (kh_count ==1 || kh_count == 2 || kh_count ==3 || kh_count == 4 || kh_count ==5){
          kh_buttonReset();
          cipherSelecter++;
          var correctButtonToAddMessage = String.fromCharCode(64+correctButton[1]);
          document.getElementById('kh_note_panel').innerHTML += correctButtonToAddMessage;
          randomHardCipherChosen();
        } else if (kh_count ==6) {
          kh_finished();
        }

      }
      
      
    } else {
      var kh_text_msg = document.createElement("p");
      kh_msgPanel.appendChild(kh_text_msg);
      if (isCaeser) {
        kh_text_msg.innerHTML = "A Caeser cipher is when you take the selected coordinate and shift it by the given value";
        isCaeser = false;
      }
      if (isTransposition) {
        kh_text_msg.innerHTML = "A transposition cipher rearranges the letters of a message to create an encoded message without replacing the letters themselves. To identify a transposition cipher in JavaScript, look for similar frequency distributions in the ciphertext and plaintext or repeating character sequences. To decrypt a transposition cipher, use a known method like columnar transposition or rail fence cipher to rearrange the letters. For example, a message like \"HELLO WORLD\" could be transposed by reversing the order of the letters to create the encoded message \"DLROW OLLEH\".";
        isTransposition = false;
      }
      remainingAttempts--;
      playerSccore -= 20;
      if (remainingAttempts == 0) {
        kh_finished();
       
      }
      
      document.getElementById('kh_score_keeper').innerHTML = "Score: " + playerSccore;
      
      document.getElementById('numberOfGuesses').innerHTML = remainingAttempts + " attempts left";
      kh_btn.classList.add('kh_incorrect');
      kh_buzz++;
    }
  }
  for (let kh_button of kh_buttons) {
    kh_button.addEventListener("click", kh_buttonPressed);
  }
}

function generatePigPen(plaintext) {
  
  var kh_alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  for (var i = 0; i < plaintext.length; i++) {
    var currentChar = plaintext.charAt(i).toLowerCase();
    if (kh_alphabet.includes(currentChar)) {
      var img = document.createElement('img');
      var imgTitle = 'img/pigpen/pigpen' + currentChar.toUpperCase() + '.png';
      img.src = imgTitle;
      img.alt = currentChar;
      img.classList.add('picBack');
      textbox.appendChild(img);
    }
    else {
      var spaceChar = document.createTextNode("\u2003");
      textbox.appendChild(spaceChar);
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

function atbashCipher(plaintext) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < plaintext.length; i++) {
    const letter = plaintext[i].toLowerCase();
    const index = letters.indexOf(letter);
    
    if (index !== -1) {
      const reverseIndex = letters.length - index - 1;
      const reverseLetter = letters[reverseIndex];
      result += (plaintext[i] === letter) ? reverseLetter : reverseLetter.toUpperCase();
    } else {
      result += plaintext[i];
    }
  }

  return result;
}

function zigzagCipher(text, key) {
  // create the matrix to cipher plain text
  // key = rows , text.length = columns
  let rail = new Array(key).fill().map(() => new Array(text.length).fill(''));
 
  // filling the rail matrix to distinguish filled
  // spaces from blank ones
  let dir_down = false;
  let row = 0, col = 0;
 
  for (let i = 0; i < text.length; i++) {
    // check the direction of flow
    // reverse the direction if we've just
    // filled the top or bottom rail
    if (row == 0 || row == key - 1) dir_down = !dir_down;
 
    // fill the corresponding alphabet
    rail[row][col++] = text[i];
 
    // find the next row using direction flag
    dir_down ? row++ : row--;
  }
 
  // now we can construct the cipher using the rail matrix
  let result = '';
  for (let i = 0; i < key; i++)
    for (let j = 0; j < text.length; j++)
      if (rail[i][j] != '') result += rail[i][j];
 
  return result;
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



function kh_startTimer(kh_duration, kh_display) {
  var countingTimer =1;
  console.log("timer is " + countingTimer);
  var kh_timer = kh_duration, kh_minutes, kh_seconds, kh_displayedMinutes;
  kh_clearing = setInterval(function () {
    kh_minutes = parseInt(kh_timer / 60, 10);
    kh_seconds = parseInt(kh_timer % 60, 10);

    kh_minutes = kh_minutes < 10 ? "0" + kh_minutes : kh_minutes;
    kh_seconds = kh_seconds < 10 ? "0" + kh_seconds : kh_seconds;

    // kh_displayedMinutes = kh_minutes - kh_buzz;

    if ((kh_minutes == 0 && kh_seconds == 0)) {
      kh_timerRanOut();
    }
    else {
      document.getElementById("kh_timer").textContent = kh_minutes + ":" + kh_seconds;
      
    }

    if (--kh_timer < 0) {
      kh_timer = kh_duration;
      
    }
  }, 1000);
}
function kh_timerRanOut() {
  if (easyMode){
    kh_mediumButton.innerHTML = "Medium";
    kh_easyButton.innerHTML = "Again";
    kh_hardButton.innerHTML = "Hard";
    easyMode = false
  }
  
  if (mediumMode){
    kh_mediumButton.innerHTML = "Again";
    kh_easyButton.innerHTML = "Easy";
    kh_hardButton.innerHTML = "Hard";
    mediumMode = false;
  }
    
  if (hardMode) {
    kh_mediumButton.innerHTML = "Medium";
    kh_easyButton.innerHTML = "Easy";
    kh_hardButton.innerHTML = "Again";
    hardMode = false;
  }
  kh_msg.innerHTML = "You ran out of `time`!";
  remainingAttempts = 5;
  clearInterval(kh_clearing);
  kh_promptPlayAgain();
}
function kh_finished() {
  clearInterval(kh_clearing);
  if (easyMode){
    kh_mediumButton.innerHTML = "Medium";
  kh_easyButton.innerHTML = "Again";
  kh_hardButton.innerHTML = "Hard";
    easyMode = false
  }
  
  if (mediumMode){
    kh_mediumButton.innerHTML = "Again";
    kh_easyButton.innerHTML = "Easy";
    kh_hardButton.innerHTML = "Hard";
    mediumMode = false;
  }
    
  if (hardMode) {
    kh_mediumButton.innerHTML = "Medium";
    kh_easyButton.innerHTML = "Easy";
    kh_hardButton.innerHTML = "Again";
    hardMode = false;
  }
  

  if (remainingAttempts == 0) {
    kh_msg.innerHTML = "You're out of tries! Play Again?";
    remainingAttempts = 5;
  } else if (kh_count == 3 || kh_count == 6){
    kh_msg.innerHTML = "You did it! You found the key! '\n'" + "hello";

  }
  clearInterval(kh_clearing);
  kh_promptPlayAgain();
}
function kh_promptPlayAgain() {
  kh_count = 0;
  cipherSelecter = 0;
  playerSccore = 100;
  kh_buttonReset();
  kh_startScreen.classList.remove('hide');
  kh_easyButton.classList.remove('hide');
  kh_easyButton.disabled = false;
  kh_msg.classList.remove('hide');
  kh_homeButton.classList.remove('hide');
  kh_inGame.classList.add('hide');

  
  kh_turnOffDict();
  kh_turnOffMsg();
  kh_turnOffNote();
  kh_turnOffHelp();

  firstGame = true;
  
}
function kh_buttonReset() {
  var kh_div = document.getElementById('kh_table');
  kh_msg.innerHTML = "";
  document.getElementById('kh_dict_panel').innerHTML = "<h1>Dictionary</h1>";
  if (easyMode || mediumMode) {
    document.getElementById('kh_ciphers_completed').innerHTML = "You have completed " + kh_ciphers_completed + "/3 ciphers";

  }
  if (hardMode) {
    document.getElementById('kh_ciphers_completed').innerHTML = "You have completed " + kh_ciphers_completed + "/6 ciphers";

  }
  
  isCaeser = false;
  isPigPen = false;
  isTransposition = false;
  while (kh_div.firstChild) {
    kh_div.removeChild(kh_div.firstChild);
  }
}
function kh_goHome() {
  kh_easyButton.innerHTML = "Start";
  document.getElementById("kh").classList.add("hide");
  document.getElementById("homepage").classList.remove("hide");

}
