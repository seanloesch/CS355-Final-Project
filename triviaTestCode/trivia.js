const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const finishButton = document.getElementById('finish-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var rank;
var questions = [];

document.getElementById("rank").addEventListener("input", changeRank);
function changeRank(){
    questions = [];
    rank = document.getElementById('rank').value;
    retrieveJSONArray();
    console.log(rank)
}




let shuffledQuestions, currentQuestionIndex



var answered = 0;
var right = 0;
var wrong = 0;



startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});
finishButton.addEventListener('click', scores)

function startGame() {
    answered = 0;
    right = 0;
    wrong = 0;
    document.getElementById('qnum').innerHTML = answered;
    document.getElementById('total_correct').innerHTML = right;
    document.getElementById('total_wrong').innerHTML = wrong;
    document.getElementById('total_score').innerHTML = "";
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  document.getElementById('score').style.display = "block";
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  
  answered = answered+1;
  if(correct){
    right = right+1;
  }
  else{
    wrong = wrong+1;
  }
  document.getElementById('qnum').innerHTML = answered;
  document.getElementById('total_correct').innerHTML = right;
  document.getElementById('total_wrong').innerHTML = wrong;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    finishButton.classList.remove('hide');
  }
}
function scores(){
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide')
    finishButton.classList.add('hide')
    var txt1 = "Your total score was: ";
    var finalScore = (right/answered)*100;

    console.log(finalScore);

    let result = txt1.concat(right.toString(), "/", answered.toString(), " which is ", finalScore.toString(),"%");

    document.getElementById('total_score').innerHTML = result;
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  
  if (correct) {
    element.classList.add('correct');   
  } else {
    element.classList.add('wrong');
  }
  
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//-------------------------------------------------------------------------------------------------
var questions = [];
function retrieveJSONArray(){
    var obj = [];
    var jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./trivia.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {        
        if (oXHR.readyState == 4) {		// Check if request is complete.
            obj = JSON.parse(this.responseText);            
            jsonArray = Object.values(obj);
            createQuestionList(jsonArray);
            // console.log(jsonArray);
            // console.log(jsonArray[0]);
            // console.log(jsonArray[0][0]);
        }
    }
}
function createQuestionList(jsonArray){
//Here is where we would determine the rankings and set questions

    var questionlength = jsonArray[rank].length;
    console.log("Array Length is: " + questionlength);
    var oneDimensionalArray = [];
    for(var i = 0; i<questionlength; i++){
        oneDimensionalArray.push(jsonArray[rank][i]);
    }

    const shuffledArray = oneDimensionalArray.sort((a, b) => 0.5 - Math.random());

    //Since there will be more questions than what we will be giving users, here is where we set
    //limit on the number of questions, so instead of 5 being here itll be something else.
    for(var i = 0; i< 5; i++){
        questions.push(shuffledArray[i]);
    }
    for(var i = 0; i<questionlength; i++){
        console.log(questions[i]);
    }
}

//-------------------------------------------------------------------------------------------------

// const questions = [
//   {
//     question: 'What is 2 + 2?',
//     answers: [
//       { text: '4', correct: true },
//       { text: '22', correct: false }
//     ]
//   },
//   {
//     question: 'Who is the best YouTuber?',
//     answers: [
//       { text: 'Web Dev Simplified', correct: true },
//       { text: 'Traversy Media', correct: true },
//       { text: 'Dev Ed', correct: true },
//       { text: 'Fun Fun Function', correct: true }
//     ]
//   },
//   {
//     question: 'Is web development fun?',
//     answers: [
//       { text: 'Kinda', correct: false },
//       { text: 'YES!!!', correct: true },
//       { text: 'Um no', correct: false },
//       { text: 'IDK', correct: false }
//     ]
//   },
//   {
//     question: 'What is 4 * 2?',
//     answers: [
//       { text: '6', correct: false },
//       { text: '8', correct: true }
//     ]
//   }
// ]
// for(var i in questions){console.log(questions[i]);}

//-------------------------------------------------------------------------------------------------
// var questions = [];
// var st;
// var obj = fetch('./trivia1.json');
// console.log("This is our string: " + obj);

// questions = JSON.stringify(obj)

//-------------------------------------------------------------------------------------------------
// async function loadNames() {
//     const response = await fetch('./trivia1.json', {
//         method: 'GET'
//       })
//     const names = await response.json();
//     //var obj = Promise.resolve(JSON.parse(JSON.stringify(names)));
//     var st = JSON.stringify(names);
//     return st;
//   }

// var str = loadNames();
// let obj = Promise.resolve(str);
// var final = obj.then(function(val) {
//     console.log(val);
//     });
// console.log(final);
//-------------------------------------------------------------------------------------------------
// var trivia1=fetch('./trivia1.json')
//     .then((response1) => response1.json())
//     .then((json1) => console.log(json1));

//-------------------------------------------------------------------------------------------------