var ddhourDisplay = document.getElementById('ddhour');
var ddminDisplay = document.getElementById('ddminute');
var ddDayHalf = document.getElementById('ddDayHalf');
var ddDayCount = document.getElementById('ddDayCount');

const ddWIcons = ['ddSunny', 'ddCloudy', 'ddRainy'];
const ddWeatherConditions = ['Sunny', 'Cloudy', 'Rainy'];
const ddWeatherIcons = ddWIcons.map(id => document.getElementById(id));

var ddTemp = document.getElementById('ddTemp');
var ddWeatherDesc = document.getElementById('ddWeatherDesc');

var hourCount = 9;
var minuteCount = 0;
var dayhalf = "AM"
var dayCount = 1;

var daySpeed = 1000;
var boolFast = false

var ddDayInterval;

function fastForward(){
    console.log(boolFast)
    if(boolFast){
        boolFast=false
        daySpeed = 1000;
    }
    else{
        boolFast=true
        daySpeed = 50;
    }
    dayInt();
}
dayInt();

function dayInt(){
    clearInterval(ddDayInterval)
    ddDayInterval = setInterval(function () {
        minuteCount++;
        if (minuteCount == 60) {
            minuteCount = 0;
            hourCount++;
            if (hourCount == 12) { dayhalf = "PM" }
            if (hourCount == 13) { hourCount = 1; }
            if (hourCount == 5) {
                hourCount = 9
                dayCount++;
                dayhalf = "AM"
                ddDisplayNewWeatherReport();
            }
        }
        ddSetDateAndTime();
    }, daySpeed);
}

function ddSetDateAndTime() {
    ddhourDisplay.innerText = hourCount;
    if (minuteCount < 10) { ddminDisplay.innerText = "0" + minuteCount; }
    else { ddminDisplay.innerText = minuteCount; }
    ddDayHalf.innerText = dayhalf;
    if (dayCount < 10) { ddDayCount.innerText = "00" + dayCount; }
    else if (dayCount < 100) { ddDayCount.innerText = "0" + dayCount; }
    else { ddDayCount.innerText = dayCount; }
}

function ddDisplayNewWeatherReport() {
    console.log('Weather icons:', ddWeatherIcons);
    ddWeatherIcons.forEach(icon => { if (icon.classList.contains('hide')) { icon.classList.remove('hide') } });
    ddTemp.innerText = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
    let ddrandomWeather = Math.floor(Math.random() * 3);
    ddWeatherDesc.innerText = ddWeatherConditions[ddrandomWeather];
    ddWeatherIcons.forEach((icon, index) => { if (index != ddrandomWeather) { icon.classList.add('hide') } });
}

// Store the IDs of the elements in arrays
const circleIds = ['circleServer1', 'circleServer2', 'circleServer3', 'circleServer4'];
const runIds = ['runServer1', 'runServer2', 'runServer3', 'runServer4'];
const dfIds = ['dataFlowServer1', 'dataFlowServer2', 'dataFlowServer3', 'dataFlowServer4'];
const scIds = ['sysCallsServer1', 'sysCallsServer2', 'sysCallsServer3', 'sysCallsServer4'];
const ipIds = ['IPServer1', 'IPServer2', 'IPServer3', 'IPServer4'];
const serverIds = ['server1', 'server2', 'server3', 'server4'];
const ddconnectionHP = ['connectionHP1', 'connectionHP2', 'connectionHP3', 'connectionHP4'];
const dddownloadSpeedHP = ['downloadSpeedHP1', 'downloadSpeedHP2', 'downloadSpeedHP3', 'downloadSpeedHP4'];
const dduploadSpeedHP = ['uploadSpeedHP1', 'uploadSpeedHP2', 'uploadSpeedHP3', 'uploadSpeedHP4']

// Get the elements using loops
const servers = serverIds.map(id => document.getElementById(id));
const circles = circleIds.map(id => document.getElementById(id));
const runs = runIds.map(id => document.getElementById(id));
const dfs = dfIds.map(id => document.getElementById(id));
const scs = scIds.map(id => document.getElementById(id));
const ips = ipIds.map(id => document.getElementById(id));
const ddHPconnection = ddconnectionHP.map(id => document.getElementById(id));
const ddHPdownloadSpeed = dddownloadSpeedHP.map(id => document.getElementById(id));
const ddHPuploadSpeed = dduploadSpeedHP.map(id => document.getElementById(id));

// Access the elements using loops
circles.forEach(circle => circle.classList.add('off'));

var runCount = 1
setInterval(function () {
    circles.forEach(circle => circle.classList.toggle('off'));
    runs.forEach(run => {
        switch (runCount) {
            case 1:
                run.innerText = "running.";
                break;
            case 2:
                run.innerText = "running..";
                break;
            case 3:
                run.innerText = "running...";
                break;
            default:
                run.innerText = "running";
        }
    });
    runCount = (runCount + 1) % 4;
}, 500);

var syscalls = [0, 0, 0, 0];
setInterval(function () {
    updateMonitor();
    const random_sys = Math.random() < 0.4;
    const random_ip = Math.random() < 0.2;
    const random_bit = Math.random() < 0.5;
    if (random_ip) {
        ips.forEach(ip => ip.innerText = generateRandomIP());
    }
    if (random_sys) {
        for (let i = 0; i < scs.length; i++) {
            if (rand50()) {
                syscalls[i]++;
                scs[i].innerText = syscalls[i];
            }
        }
    }
    dfs.forEach((df, i) => {
        const bits = df.innerHTML;
        const newBit = random_bit ? '1' : '0';
        df.innerHTML = bits.substring(1) + newBit;
        if (i % 2 == 0) {
            df.innerHTML = dfs[0].innerHTML;
        } else {
            df.innerHTML = dfs[1].innerHTML;
        }
    });
}, 250);

function rand50() {
    return Math.random() < 0.5;
}

function generateRandomIP() {
    const IPAddresses = ["192.168.1.0", "192.132.9.1", "192.168.4.2", "192.168.1.3",
        "182.168.1.4", "154.17.1.0", "102.162.1.0", "192.18.10.0", "172.128.1.13"];
    IP = IPAddresses[Math.floor(Math.random() * IPAddresses.length)];
    return IP;
}

setInterval(function () {
    servers.forEach(servers => randomizeServer(servers));
}, 5000);

function randomizeServer(serv) {
    if (rand50()) {
        if (serv.classList.contains('error1')) {
            serv.classList.remove('error1')
            circles[servers.indexOf(serv)].classList.remove('Lighterror1')
        }
        else if (serv.classList.contains('error2')) {
            serv.classList.remove('error2')
            circles[servers.indexOf(serv)].classList.remove('Lighterror2')
        }
        else {
            if (rand50()) {
                serv.classList.add('error1');
                circles[servers.indexOf(serv)].classList.add('Lighterror1')
            }
            else {
                serv.classList.add('error2');
                circles[servers.indexOf(serv)].classList.add('Lighterror2')
            }
        }
    }
}
function updateMonitor() {
    ddHPconnection.forEach(connSpeed => { connSpeed.innerText = Math.floor(Math.random() * 101); });
    ddHPdownloadSpeed.forEach(downSpeed => { downSpeed.innerHTML = Math.floor(Math.random() * 10001); + " KB/s"; });
    ddHPuploadSpeed.forEach(upSpeed => { upSpeed.innerHTML = Math.floor(Math.random() * 10001); + " KB/s"; });
}

var ddOpenScreen = document.getElementById('ddOpenScreen');
const ddtabList = ['ddwebsitesList', 'ddServerRoom', 'ddcams', 'ddreport', 'ddperform'];
const ddTabs = ddtabList.map(id => document.getElementById(id));
var placeholder;

function ddOpenTab(tab) {
    if (placeholder == tab) {
        ddOpenScreen.classList.remove('hide');
        placeholder = ddOpenScreen;
    }
    else {
        ddOpenScreen.classList.add('hide');
        ddTabs.forEach(tabs => { if (!tabs.classList.contains('hide')) { tabs.classList.add('hide') } });
        ddTabs.forEach(tabs => {
            if (tabs.classList.contains(tab)) {
                tabs.classList.remove('hide');
                placeholder = tab;
            }
        });
    }
}