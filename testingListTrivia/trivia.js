//Initializing trivia HTML
const trivia_startButton = document.getElementById('trivia_start_btn');
const trivia_nextButton = document.getElementById('trivia_next_btn');
const trivia_finishButton = document.getElementById('trivia_finish_btn');
const trivia_resetButton = document.getElementById('trivia_reset_btn');
const trivia_submitButton = document.getElementById('trivia_submitList_btn');

const trivia_practiceButton = document.getElementById('trivia_prac_btn');
const trivia_rankedButton = document.getElementById('trivia_ranked_btn');
const trivia_homeButton = document.getElementById('trivia_home_btn');
const trivia_pracByR = document.getElementById('trivia_PracByR_btn');
const trivia_pracByT = document.getElementById('trivia_PracByT_btn');

const trivia_rankedForm = document.getElementById('trivia_rank_select');

const trivia_pracOrRank = document.getElementById('trivia_pracOrRank');
const trivia_triv = document.getElementById('trivia_triv');
const trivia_questionContainerElement = document.getElementById('trivia_question_container');
const trivia_questionElement = document.getElementById('trivia_question');
const trivia_answerButtonsElement = document.getElementById('trivia_answer_buttons');
const trivia_pracByRorT_btns = document.getElementById('trivia_PracByRorT');
const trivia_pracByRForm = document.getElementById('trivia_pracByRForm');
const trivia_pracByTForm = document.getElementById('trivia_pracByTForm');
const trivia_initScreen = document.getElementById('trivia_initScreen');

var trivia_timer = document.getElementById('trivia_timer');
//--------------------------------------------------------------------------------------
//Initializing all global variables
var trivia_totalQuestions;
const trivia_rankup = 15000;

var trivia_userRank = 0;//This will be fed through the SQL but right now it is changed in the code
var trivia_rank = 0;
var trivia_highestRank = 2;//If a user reaches this level, they are a god among plebs

var trivia_rankedGame;

var trivia_answered = 0;
var trivia_right = 0;
var trivia_wrong = 0;
var trivia_time = 0;
var trivia_finalTime;
let trivia_shuffledQuestions, trivia_currentQuestionIndex

var trivia_listTotal = 0;
var trivia_numCorrectAnswers=1;
var trivia_listPercentScore;

var trivia_questions = [];
var trivia_byTopic = false;
var trivia_topic;
//--------------------------------------------------------------------------------------
//Even listeners for Trivia
document.getElementById("trivia_rank").addEventListener("input", trivia_changeRank);
function trivia_changeRank() {
    trivia_questions = [];
    trivia_rank = document.getElementById('trivia_rank').value;
    trivia_retrieveJSONArray();
}
document.getElementById("trivia_topic").addEventListener("input", trivia_changeTopic);
function trivia_changeTopic() {
    trivia_questions = [];
    trivia_topic = document.getElementById('trivia_topic').value;
    trivia_retrieveJSONArray();
}
document.getElementById("trivia_numPracQuestions").addEventListener("input", trivia_totalPracQuestions);
function trivia_totalPracQuestions() {
    trivia_questions = [];
    trivia_totalQuestions = document.getElementById('trivia_numPracQuestions').value;
    trivia_retrieveJSONArray();
}
trivia_practiceButton.addEventListener('click', trivia_initPractice);
trivia_rankedButton.addEventListener('click', trivia_initRanked);
trivia_pracByR.addEventListener('click', trivia_initPracByR);
trivia_pracByT.addEventListener('click', trivia_initPracByT);
trivia_startButton.addEventListener('click', trivia_startGame);
trivia_resetButton.addEventListener('click', trivia_resetGame);
trivia_nextButton.addEventListener('click', () => {
    trivia_currentQuestionIndex++
    trivia_setNextQuestion()
});
trivia_finishButton.addEventListener('click', trivia_scores);
trivia_homeButton.addEventListener('click', trivia_gohome);
//--------------------------------------------------------------------------------------
//Determines whether practice mode or ranked mode then starts game
function trivia_initPractice() {
    trivia_pracByRorT_btns.classList.remove('hide');
    trivia_initScreen.classList.add('hide');
}
function trivia_initPracByR() {
    trivia_pracByRForm.classList.remove('hide');
    trivia_triv.style.display = "block";
    trivia_rankedForm.style.display = "block";
    trivia_pracOrRank.style.display = "none";
    trivia_rankedGame = false;
    trivia_startButton.classList.remove('hide');
    trivia_rank = document.getElementById('trivia_rank').value;
    trivia_totalQuestions = document.getElementById('trivia_numPracQuestions').value;
    trivia_retrieveJSONArray();
}
function trivia_initPracByT() {
    trivia_topic = document.getElementById('trivia_topic').value;
    console.log(trivia_topic);
    trivia_pracByTForm.classList.remove('hide');
    trivia_triv.style.display = "block";
    trivia_rankedForm.style.display = "block";
    trivia_pracOrRank.style.display = "none";
    trivia_rankedGame = false;
    trivia_startButton.classList.remove('hide');
    trivia_rank = document.getElementById('trivia_rank').value; //this should be removed
    trivia_totalQuestions = document.getElementById('trivia_numPracQuestions').value;
    trivia_byTopic = true;
    trivia_retrieveJSONArray();
}

function trivia_initRanked() {
    trivia_questions = [];
    trivia_rank = trivia_userRank;
    trivia_pracOrRank.style.display = "none";
    trivia_rankedForm.style.display = "none";
    trivia_triv.style.display = "block";
    trivia_rankedGame = true;
    trivia_startButton.classList.remove('hide');
    trivia_totalQuestions = 25;
    trivia_retrieveJSONArray();
}
function trivia_resetClassList() {
    if (trivia_pracByRForm.classList.contains('hide') == false) {
        trivia_pracByRForm.classList.add('hide');
    }
    if (trivia_pracByTForm.classList.contains('hide') == false) {
        trivia_pracByTForm.classList.add('hide');
    }
}
//--------------------------------------------------------------------------------------
function trivia_startGame() {
    trivia_resetClassList;
    trivia_byTopic = false;
    trivia_rankedForm.style.display = "none";
    document.getElementById('trivia_user_rank').innerHTML = trivia_rank + 1;
    var trivia_interval = setInterval(function () {
        if (trivia_answered == trivia_totalQuestions) {
            trivia_finalTime = trivia_time;
            clearInterval(trivia_interval);
        }
        trivia_time++;
        trivia_timer.innerHTML = trivia_time;
    }, 1000);

    trivia_startButton.classList.add('hide');
    trivia_shuffledQuestions = trivia_questions.sort(() => Math.random() - .5);
    trivia_currentQuestionIndex = 0;
    trivia_questionContainerElement.classList.remove('hide');
    document.getElementById('trivia_score').style.display = "block";

    //Creating the new trivia score divisor values

    var trivia_division = "/"
    let trivia_divisor_text = trivia_division.concat(trivia_totalQuestions);
    document.getElementById('trivia_scoreboard1').innerHTML = trivia_divisor_text;
    document.getElementById('trivia_scoreboard2').innerHTML = trivia_divisor_text;
    document.getElementById('trivia_scoreboard3').innerHTML = trivia_divisor_text;

    trivia_setNextQuestion()
}

function trivia_setNextQuestion() {
    trivia_resetState()
    trivia_showQuestion(trivia_shuffledQuestions[trivia_currentQuestionIndex])
}

function trivia_showQuestion(trivia_question) {
    trivia_questionElement.innerText = trivia_question.question
    trivia_question.answers.forEach(answer => {
        const trivia_button = document.createElement('button')
        trivia_button.innerText = answer.text;
        trivia_button.classList.add('trivia_btn')
        if (answer.correct) {
            trivia_button.dataset.correct = answer.correct;
        }
        if (trivia_question.numCorrect != 1) {
            trivia_numCorrectAnswers = trivia_question.numCorrect
            trivia_submitButton.classList.remove('hide');
            trivia_listTotal = 0;
            trivia_button.addEventListener('click', trivia_selectMultipleAnswers);
            trivia_answerButtonsElement.appendChild(trivia_button);
        }
        else {
            trivia_numCorrectAnswers = 1;
            trivia_button.addEventListener('click', trivia_selectAnswer);
            trivia_answerButtonsElement.appendChild(trivia_button);
        }
    })
}

function trivia_resetState() {
    trivia_clearStatusClass(document.body);
    trivia_nextButton.classList.add('hide');    
    while (trivia_answerButtonsElement.firstChild) {
        trivia_answerButtonsElement.removeChild(trivia_answerButtonsElement.firstChild)
    }
}

function trivia_selectAnswer(trivia_e) {
    const trivia_selectedButton = trivia_e.target
    const trivia_correct = trivia_selectedButton.dataset.correct
    trivia_setStatusClass(document.body, trivia_correct)
    Array.from(trivia_answerButtonsElement.children).forEach(trivia_button => {
        trivia_setStatusClass(trivia_button, trivia_button.dataset.correct);
        trivia_button.disabled = true;
    })

    trivia_answered = trivia_answered + 1;
    if (trivia_correct) {
        trivia_right = trivia_right + 1;
    }
    else {
        trivia_wrong = trivia_wrong + 1;
    }
    document.getElementById('trivia_qnum').innerHTML = trivia_answered;
    document.getElementById('trivia_total_correct').innerHTML = trivia_right;
    document.getElementById('trivia_total_wrong').innerHTML = trivia_wrong;
    if (trivia_questions.length > trivia_currentQuestionIndex + 1) {
        trivia_nextButton.classList.remove('hide');
    } else {
        trivia_finishButton.classList.remove('hide');
        trivia_clearStatusClass(document.body)
    }

}
function trivia_selectMultipleAnswers(trivia_e) {
    const trivia_selectedButton = trivia_e.target
    const trivia_correct = trivia_selectedButton.dataset.correct
    console.log(trivia_correct);
    if (trivia_selectedButton.classList.contains('selectedCorrect') || trivia_selectedButton.classList.contains('selectedWrong')) {
        if (trivia_selectedButton.classList.contains('selectedCorrect')) {
            trivia_selectedButton.classList.remove('selectedCorrect');
            trivia_listTotal = trivia_listTotal - 1;
        }
        else {
            trivia_selectedButton.classList.remove('selectedWrong');
            trivia_listTotal = trivia_listTotal + 1;
        }
    }
    else {
        if (trivia_correct && trivia_selectedButton.classList.contains('selectedCorrect') != true) {
            trivia_selectedButton.classList.add('selectedCorrect');
            trivia_listTotal = trivia_listTotal + 1;
        }
        else {
            trivia_selectedButton.classList.add('selectedWrong');
            trivia_listTotal = trivia_listTotal - 1;
        }
    }
}
trivia_submitButton.addEventListener('click', () => {
    Array.from(trivia_answerButtonsElement.children).forEach(trivia_button => {
        trivia_removeSelectedListClass(trivia_button);
    })
    Array.from(trivia_answerButtonsElement.children).forEach(trivia_button => {
        trivia_setStatusClass(trivia_button, trivia_button.dataset.correct);
        trivia_button.disabled = true;
    });
    trivia_submitButton.classList.add('hide');

    trivia_answered = trivia_answered + 1;

    trivia_listPercentScore = Math.round((trivia_listTotal/trivia_numCorrectAnswers)*Math.pow(10,2))/Math.pow(10,2);
    trivia_listPercentScore2 = Math.round((1-trivia_listPercentScore)*Math.pow(10,2))/Math.pow(10,2);

    if(trivia_listTotal <= 0){
        trivia_wrong = trivia_wrong + 1;
    }
    else{
        trivia_right = trivia_right + trivia_listPercentScore;
        trivia_wrong = trivia_wrong + trivia_listPercentScore2;
    }

    

    document.getElementById('trivia_qnum').innerHTML = trivia_answered;
    document.getElementById('trivia_total_correct').innerHTML = trivia_right;
    document.getElementById('trivia_total_wrong').innerHTML = trivia_wrong;
    if (trivia_questions.length > trivia_currentQuestionIndex + 1) {
        trivia_nextButton.classList.remove('hide');
    } else {
        trivia_finishButton.classList.remove('hide');
        trivia_clearStatusClass(document.body)
    }
});

function trivia_scores() {
    trivia_resetButton.classList.remove('hide');
    trivia_questionContainerElement.classList.add('hide');
    trivia_finishButton.classList.add('hide');
    var trivia_txt1 = "Your total score was: ";
    var trivia_finalScore = (trivia_right / trivia_answered) * 100;
    let trivia_result = trivia_txt1.concat(trivia_right.toString(), "/", trivia_answered.toString(), " which is ", trivia_finalScore.toString(), "%");
    document.getElementById('trivia_total_score').innerHTML = trivia_result;
    var trivia_txt2 = "Your total points where: "
    var trivia_p = (trivia_right * 10000) / trivia_time;
    let trivia_points = Math.trunc(trivia_p);
    if (trivia_rankedGame == true) {
        if (trivia_points >= 1500) {
            if (trivia_userRank == trivia_highestRank) {
                let trivia_resultRank = trivia_txt2.concat(trivia_points.toString(), ". You passed! You are already the highest rank! Congrats on being a Comp. Sci. SuperStar!!!!");
                document.getElementById('trivia_alg_score').innerHTML = trivia_resultRank;
            }
            else {
                let trivia_resultRank = trivia_txt2.concat(trivia_points.toString(), ". You passed! You will be ranked up");
                document.getElementById('trivia_alg_score').innerHTML = trivia_resultRank;
                trivia_userRank++;
            }
        }
        else {
            let trivia_resultRank = trivia_txt2.concat(trivia_points.toString(), ". You were so Close! Try again!");
            document.getElementById('trivia_alg_score').innerHTML = trivia_resultRank;
        }
    }
    else {
        if (trivia_points >= 1500) {
            let trivia_resultRank = trivia_txt2.concat(trivia_points.toString(), ". You passed!!! Maybe try a ranked game!");
            document.getElementById('trivia_alg_score').innerHTML = trivia_resultRank;
        }
        else {
            let trivia_resultRank = trivia_txt2.concat(trivia_points.toString(), ". So Close!!! Maybe try another practice ame!");
            document.getElementById('trivia_alg_score').innerHTML = trivia_resultRank;
        }

    }

}

function trivia_setStatusClass(element, correct) {
    trivia_clearStatusClass(element)

    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }

}
function trivia_removeSelectedListClass(element) {
    element.classList.remove('selectedCorrect');
    element.classList.remove('selectedWrong');
}

function trivia_clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
function trivia_resetGame() {
    trivia_pracOrRank.style.display = "block";
    trivia_triv.style.display = "none";
    trivia_answered = 0;
    trivia_right = 0;
    trivia_wrong = 0;
    trivia_time = 0;

    trivia_resetButton.classList.add('hide');

    document.getElementById('trivia_qnum').innerHTML = trivia_answered;
    document.getElementById('trivia_total_correct').innerHTML = trivia_right;
    document.getElementById('trivia_total_wrong').innerHTML = trivia_wrong;

    document.getElementById('trivia_total_score').innerHTML = "";
    document.getElementById('trivia_alg_score').innerHTML = "";

    trivia_pracByRorT_btns.classList.add('hide');
    trivia_initScreen.classList.remove('hide');
}
//--------------------------------------------------------------------------------------
//Questions
var trivia_questions = [];
function trivia_retrieveJSONArray() {
    var trivia_obj = [];
    var trivia_jsonArray = [];

    var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", "./test2_triviaQuestions.json", true);  // get json file.
    oXHR.send();
    function reportStatus() {
        if (oXHR.readyState == 4) {		// Check if request is complete.
            trivia_obj = JSON.parse(this.responseText);
            trivia_jsonArray = Object.values(trivia_obj);
            trivia_createQuestionList(trivia_jsonArray);
            // console.log(jsonArray);
            // console.log(jsonArray[0]);
            // console.log(jsonArray[0][0]);
        }
    }
}
function trivia_createQuestionList(trivia_jsonArray) {
    //Here is where we would determine the rankings and set questions
    if (trivia_byTopic == false) {
        var trivia_questionlength = trivia_jsonArray[trivia_rank].length;
        var trivia_oneDimensionalArray = [];
        trivia_questions = [];
        for (var i = 0; i < trivia_questionlength; i++) {
            trivia_oneDimensionalArray.push(trivia_jsonArray[trivia_rank][i]);
        }
        const trivia_shuffledArray = trivia_oneDimensionalArray.sort((a, b) => 0.5 - Math.random());
        for (var i = 0; i < trivia_totalQuestions; i++) {
            trivia_questions.push(trivia_shuffledArray[i]);
            trivia_questions[i] = trivia_shuffledArray[i];
        }
    }
    if (trivia_byTopic == true) {
        var trivia_oneDimensionalArray = [];
        trivia_questions = [];
        for (let k = 0; k <= 9; k++) {
            var trivia_questionlength = trivia_jsonArray[k].length;
            for (var i = 0; i < trivia_questionlength; i++) {
                trivia_oneDimensionalArray.push(trivia_jsonArray[k][i]);
            }
        }
        const trivia_shuffledArray = trivia_oneDimensionalArray.sort((a, b) => 0.5 - Math.random());
        var i = 0;
        var j = 0;
        while (j != trivia_totalQuestions) {
            var trivia_ArrayItemTopic = trivia_shuffledArray[i].topic
            if (trivia_ArrayItemTopic == trivia_topic) {
                trivia_questions[j] = trivia_shuffledArray[i];
                j++;
            }
            i++;
        }
    }
    //console.log(trivia_questions)
}
function trivia_gohome() {
    document.getElementById("trivia").classList.add("hide");
    document.getElementById("homepage").classList.remove("hide");
}