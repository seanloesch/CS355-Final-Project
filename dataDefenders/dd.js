// Define an array of server objects with their properties
let servers = [
    {
      id: 1,
      name: "Server 1",
      status: "OK",
      cpuUsage: 10,
      memoryUsage: 30,
      diskUsage: 50,
    },
    {
      id: 2,
      name: "Server 2",
      status: "OK",
      cpuUsage: 20,
      memoryUsage: 40,
      diskUsage: 60,
    },
    {
      id: 3,
      name: "Server 3",
      status: "OK",
      cpuUsage: 30,
      memoryUsage: 50,
      diskUsage: 70,
    },
  ];
  
  // Define a function to randomly choose a server and update its properties
  function updateServer() {
    let randomServer = Math.floor(Math.random() * servers.length);
    let randomProperty = Math.floor(Math.random() * 3) + 1;
    switch (randomProperty) {
      case 1:
        servers[randomServer].cpuUsage += Math.floor(Math.random() * 30);
        break;
      case 2:
        servers[randomServer].memoryUsage += Math.floor(Math.random() * 30);
        break;
      case 3:
        servers[randomServer].diskUsage += Math.floor(Math.random() * 30);
        break;
    }
    if (
      servers[randomServer].cpuUsage > 80 ||
      servers[randomServer].memoryUsage > 80 ||
      servers[randomServer].diskUsage > 80
    ) {
      servers[randomServer].status = "Critical";
    } else if (
      servers[randomServer].cpuUsage > 50 ||
      servers[randomServer].memoryUsage > 50 ||
      servers[randomServer].diskUsage > 50
    ) {
      servers[randomServer].status = "Warning";
    } else {
      servers[randomServer].status = "OK";
    }
  }
  
  // Define a function to check if any servers are in critical state
  function checkServers() {
    for (let i = 0; i < servers.length; i++) {
      if (servers[i].status === "Critical") {
        return servers[i];
      }
    }
    return null;
  }
  
  // Define a function to update the UI with server status
  function updateUI() {
    let serverList = document.getElementById("server-list");
    serverList.innerHTML = "";
    for (let i = 0; i < servers.length; i++) {
      let serverItem = document.createElement("li");
      serverItem.textContent =
        servers[i].name +
        " - CPU: " +
        servers[i].cpuUsage +
        "%, Memory: " +
        servers[i].memoryUsage +
        "%, Disk: " +
        servers[i].diskUsage +
        "%, Status: " +
        servers[i].status;
      serverList.appendChild(serverItem);
    }
  }
  
  // Start the game loop
  setInterval(function () {
    updateServer();
    updateUI();
    let criticalServer = checkServers();
    if (criticalServer) {
      alert(
        "Server " +
          criticalServer.name +
          " is in critical state! Please report the issue."
      );
    }
  }, 5000);
  