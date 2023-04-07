var Cm = 0
function updateStatus() {
    // Update the status div minus connections made
    var connection = Math.floor(Math.random() * 101);
    document.getElementById("connection").innerHTML = connection + "%";
    document.getElementById("download-speed").innerHTML = speeds() + " KB/s";
    document.getElementById("upload-speed").innerHTML = speeds() + " KB/s";

    // Array of sample data for each table cell
    const requestMethods = ["GET", "POST", "PUT", "DELETE"];
    const urls = ["/home", "/about", "/services", "/contact"];
    const statusCodes = ["200", "404", "500"];
    const systemCalls = ["450", "500", "600", "800"];

    // Function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function speeds() {
        return Math.floor(Math.random() * 10001);
    }
    function finalIPvalue() {
        var first = Math.floor(Math.random() * 192);
        var second = Math.floor(Math.random() * 99);
        var third = Math.floor(Math.random() * 256)
        var ip = first + "." + second + "." + third
        return ip;
    }
    function returnDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function returnTime(i) {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()+i}`;
    }

    // Loop through each table row and generate random data for each cell
    const table = document.getElementById("log-table");
    const rows = table.getElementsByTagName("tr");
    if (Math.random() < 0.3) {
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            cells[0].textContent = returnDate();
            cells[1].textContent = returnTime(i);
            cells[2].textContent = finalIPvalue();
            cells[3].textContent = requestMethods[getRandomInt(0, requestMethods.length - 1)];
            cells[4].textContent = urls[getRandomInt(0, urls.length - 1)];
            cells[5].textContent = statusCodes[getRandomInt(0, statusCodes.length - 1)];
            cells[6].textContent = speeds() + " KB/s";
            cells[7].textContent = speeds() + " KB/s";
            cells[8].textContent = systemCalls[getRandomInt(0, systemCalls.length - 1)];
        }
        Cm = Cm + (Math.floor(Math.random() * 4))
        document.getElementById("connections-made").innerHTML = Cm;
    }
}
setInterval(updateStatus, 250);
