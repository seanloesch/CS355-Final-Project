<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}
$conn = new mysqli('localhost','root','','cs355');

session_start(); // this NEEDS TO BE AT THE TOP of the page before any output etc
$email = $_SESSION['chngEmail'];
$h_u = $_SESSION['hu'];
$chngMessage = $_SESSION['chngMessage'];

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$result = $conn->prepare("Select * from user where email = '$email'");
$result->execute();
$result->store_result();
$result->bind_result($u_id,$n,$e,$u,$r);
$result->fetch();
?>
<html lang="en">

<head>
    <title>Cypher Change Cred</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="loginPage.css">
</head>

<body>

    <div class="header">
        <h1>Welcome <?php echo $u; ?></h1>
        <h3>Change your Username and/or Password!</h3>
        <p><?php echo $chngMessage; ?></p>
    </div>

    <div class="content">

        <div class="loginForm">
            <form action="checkDatabase.php" method="post">
                <input class="hide" type="text" id="cEmail" name="cEmail" value="<?php echo $e; ?>">
                <p class="gray">You may keep your current username</p>
                <label for="user">New Username:</label>
                <input type="text" id="user" name="user">
                <br><br>

                <p class="gray">Password must be strong</p>
                <label for="user">New Password:</label>
                <input type="password" id="pass" name="pwd" />
                <p class="cent" id="strength"></p>
                <script>
                    document.getElementById("pass").addEventListener("input", checkPassStrength);
                    

                    function checkPassStrength() {
                        document.getElementById('strength').style.color = "red";
                        document.getElementById('strength').innerHTML = "Weak";                       
                        var pass = document.getElementById('pass').value;
                        if(pass.length == 0){
                            document.getElementById('strength').innerHTML = "";
                        }

                        var p2 = document.getElementById('rpwd').value;                 
                        
                        

                        
                        var score = scorePassword(pass);
                        if (score > 80) {
                            document.getElementById('strength').style.color = "green";
                            document.getElementById('strength').innerHTML = "Strong";
                            if(p2.length >= 1){
                            passwordsMatch();
                        }
                            return "strong";
                        }
                        if (score > 60) {
                            document.getElementById('strength').style.color = "orange";
                            document.getElementById('strength').innerHTML = "Good";
                            document.getElementById('change').style.display = "none";
                            if(p2.length >= 1){
                            passwordsMatch();
                        }
                            return "strong";
                        }
                        if (score >= 30) {
                            document.getElementById('strength').style.color = "red";
                            document.getElementById('strength').innerHTML = "Weak";
                            if(p2.length >= 1){
                            passwordsMatch();
                        }
                            return "weak";
                        }

                        return "";
                    }

                    function scorePassword(pass) {
                        var score = 0;
                        if (!pass)
                            return score;

                        // award every unique letter until 5 repetitions
                        var letters = new Object();
                        for (var i = 0; i < pass.length; i++) {
                            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
                            score += 5.0 / letters[pass[i]];
                        }

                        // bonus points for mixing it up
                        var variations = {
                            digits: /\d/.test(pass),
                            lower: /[a-z]/.test(pass),
                            upper: /[A-Z]/.test(pass),
                            nonWords: /\W/.test(pass),
                        }

                        var variationCount = 0;
                        for (var check in variations) {
                            variationCount += (variations[check] == true) ? 1 : 0;
                        }
                        score += (variationCount - 1) * 10;

                        return parseInt(score);
                    }
                    function passwordsMatch() {
                        if(pass == p2){
                            document.getElementById('match').style.color = "green";
                            document.getElementById('match').innerHTML = "The Passwords match!";

                            let rule = document.getElementById("strength").innerHTML;
                            if(rule == "Strong"){
                                document.getElementById('change').style.display = "block";
                            }
                        }
                        else{
                            document.getElementById('change').style.display = "none";
                            document.getElementById('match').style.color = "red";
                            document.getElementById('match').innerHTML = "The Passwords do not match!";
                        }
                    }
                </script>
                <label for="rpwd">Retype Password:</label>
                <input type="password" id="rpwd" name="rpwd"><br><br>
                <p class="cent" id="match"></p>
                <script>
                    document.getElementById("rpwd").addEventListener("input", passwordsMatch);

                    function passwordsMatch() {
                        var p1 = document.getElementById('pass').value;
                        var p2 = document.getElementById('rpwd').value;
                        if(p1 == p2){
                            document.getElementById('match').style.color = "green";
                            document.getElementById('match').innerHTML = "The Passwords match!";

                            let rule = document.getElementById("strength").innerHTML;
                            if(rule == "Strong"){
                                document.getElementById('change').style.display = "block";
                            }
                        }
                        else{
                            document.getElementById('change').style.display = "none";
                            document.getElementById('match').style.color = "red";
                            document.getElementById('match').innerHTML = "The Passwords do not match!";
                        }
                    }
                </script>

                <input type="submit" id="change" value="change">


        </div>
</body>

</html>