var startScreen;
var endScreen;
var displayedScreen;
var hiddenScreen;
var white = [255,255,255];
var green = [0,255,0];
var firstColor = [];
var secondColor = [];
var i = 22;
var init = 10;

document.addEventListener('DOMContentLoaded', function() {
    startScreen = document.getElementById("startScreen");
    endScreen = document.getElementById("endScreen");
});

function transition(screenid){
    document.getElementById('strtBtn').classList.add('hide');
    document.getElementById('endBtn').classList.add('hide');
    if(screenid=='startScreen'){
        displayedScreen = startScreen;
        hiddenScreen = endScreen;
        firstColor=white;
        secondColor=green;
    }
    else{
        displayedScreen = endScreen;
        hiddenScreen = startScreen;
        firstColor=green;
        secondColor=white;
    }
    fade = setInterval(function () {
        alpha = init/10
        if(i>12){
            displayedScreen.style.backgroundColor = `rgba(${firstColor[0]},${firstColor[1]},${firstColor[2]},${alpha})`;
            init = init - 1;
        }
        else if (i==12){
            displayedScreen.classList.add('hide')
            hiddenScreen.classList.remove('hide')
            hiddenScreen.style.backgroundColor = `rgba(${secondColor[0]},${secondColor[1]},${secondColor[2]},${alpha})`;
        }
        else{
            hiddenScreen.style.backgroundColor = `rgba(${secondColor[0]},${secondColor[1]},${secondColor[2]},${alpha})`;
            init = init + 1;
        }
        if(i==0){
            hiddenScreen.style.backgroundColor = `rgba(${secondColor[0]},${secondColor[1]},${secondColor[2]},1)`;
            endInt();
        }
        i--;
    }, 50);

    function endInt(){
        clearInterval(fade)
        init=10;
        i=22;
        document.getElementById('strtBtn').classList.remove('hide');
        document.getElementById('endBtn').classList.remove('hide');
    }
}