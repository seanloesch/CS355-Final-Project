let person = prompt("Please enter your name");
document.getElementById('nickname').innerText = person;

var dd_ss1 = parseInt(document.getElementById('dd_ss1_init').innerText);
var dd_hs1 = parseInt(document.getElementById('dd_hs1_init').innerText);
var dd_ss2 = parseInt(document.getElementById('dd_ss2_init').innerText);
var dd_hs2 = parseInt(document.getElementById('dd_hs2_init').innerText);
var dd_ss3 = parseInt(document.getElementById('dd_ss3_init').innerText);
var dd_hs3 = parseInt(document.getElementById('dd_hs3_init').innerText);
var dd_ss4 = parseInt(document.getElementById('dd_ss4_init').innerText);
var dd_hs4 = parseInt(document.getElementById('dd_hs4_init').innerText);


dd_totalSpace = dd_ss1 + dd_ss2 + dd_ss3 + dd_ss4;
document.getElementById('hs_dataDefTotalSpace').innerText = dd_totalSpace;

dd_totalHost = dd_hs1 + dd_hs2 + dd_hs3 + dd_hs4;
document.getElementById('hs_dataDefTotalHosting').innerText = dd_totalHost;
function playTrivia(){
    document.getElementById("homepage").classList.add("hide");
    document.getElementById("trivia").classList.remove("hide");
    document.body.style.overflow = "hidden"
}
function playkeyHunters(){
    document.getElementById("homepage").classList.add("hide");
    document.getElementById("kh").classList.remove("hide");
}
function playPhishingFrenzy(){
    document.getElementById("homepage").classList.add("hide");
    document.getElementById("phishingFrenzy").classList.remove("hide");
    document.body.style.overflow = "hidden"
}
function playDataDefenders(){
    document.getElementById("homepage").classList.add("hide");
    document.getElementById("datadefenders").classList.remove("hide");
    document.body.style.overflow = "hidden"
}

document.getElementById('trivRankUpdate').value = parseInt(document.getElementById('hs_trivRank').innerText);
document.getElementById('khHighscoreUpdate').value = parseInt(document.getElementById('hs_khHighscore').innerText);
document.getElementById('pfHighscoreUpdate').value = parseInt(document.getElementById('hs_pfHighscore').innerText);
document.getElementById('ddDayUpdate').value = parseInt(document.getElementById('dd_day').innerText);
document.getElementById('ddBalanceUpdate').value = parseInt(document.getElementById('dd_bal').innerText);
document.getElementById('ddFixUpdate').value = parseInt(document.getElementById('dd_fix').innerText);
document.getElementById('ddRepUpdate').value = parseInt(document.getElementById('dd_rep').innerText);
document.getElementById('ddSS1Update').value = dd_ss1;
document.getElementById('ddHS1Update').value = dd_hs1;
document.getElementById('ddSS2Update').value = dd_ss2;
document.getElementById('ddHS2Update').value = dd_hs2;
document.getElementById('ddSS3Update').value = dd_ss3;
document.getElementById('ddHS3Update').value = dd_hs3;
document.getElementById('ddSS4Update').value = dd_ss4;
document.getElementById('ddHS4Update').value = dd_hs4;