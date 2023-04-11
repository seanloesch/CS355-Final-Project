// Store the IDs of the elements in arrays
const circleIds = ['circleServer1', 'circleServer2', 'circleServer3', 'circleServer4'];
const runIds = ['runServer1', 'runServer2', 'runServer3', 'runServer4'];
const dfIds = ['dataFlowServer1', 'dataFlowServer2', 'dataFlowServer3', 'dataFlowServer4'];
const scIds = ['sysCallsServer1', 'sysCallsServer2', 'sysCallsServer3', 'sysCallsServer4'];
const ipIds = ['IPServer1', 'IPServer2', 'IPServer3', 'IPServer4'];
const serverIds = ['server1', 'server2', 'server3', 'server4'];

// Get the elements using loops
const servers = serverIds.map(id => document.getElementById(id));
const circles = circleIds.map(id => document.getElementById(id));
const runs = runIds.map(id => document.getElementById(id));
const dfs = dfIds.map(id => document.getElementById(id));
const scs = scIds.map(id => document.getElementById(id));
const ips = ipIds.map(id => document.getElementById(id));

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

function randomizeServer(serv){       
    if(rand50()){
        if(serv.classList.contains('error1')){
            serv.classList.remove('error1')
            circles[servers.indexOf(serv)].classList.remove('Lighterror1')
        }
        else if(serv.classList.contains('error2')){
            serv.classList.remove('error2')
            circles[servers.indexOf(serv)].classList.remove('Lighterror2')
        }
        else{
            if(rand50()){
                serv.classList.add('error1');
                circles[servers.indexOf(serv)].classList.add('Lighterror1')
            }
            else{
                serv.classList.add('error2');
                circles[servers.indexOf(serv)].classList.add('Lighterror2')
            }
        }
    }
}