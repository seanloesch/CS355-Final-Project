<?php
if ($_SERVER['HTTPS'] != "on") {
  $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
  header("Location: $url");
  exit;
}
session_start(); // this NEEDS TO BE AT THE TOP of the page before any output etc
$user_id = $_SESSION['user_id'];

$conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->prepare("Select * from user where user_id = '$user_id'");

$result->execute();
$result->store_result();
$result->bind_result($id,$nickname,$email,$user,$role);
$result->fetch();

 if($nickname == null||$role!="admin"){
  session_start();
  $_SESSION['logMessage'] = "An error occured please try logging in again";
  header('Location: http://localhost/cs355/login.php');
}

?>

<html lang="en">

<head>
    <title>Cypher Admin</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="admin.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

    <div class="header">
        <h1>Cyphr</h1>
        <p>Welcome
            <?php echo $nickname; ?>
        </p>
    </div>

    <div class="navbar">
        <a href="login.php">Log Out</a>
    </div>

    <div class="content">
        <div class="addAdmin">
            <p>New admin:</p>
            <form action="addAdmin.php" method="post">
                <label for="fname">Full Name:</label>
                <input type="text" id="fname" name="fname">
                <br>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email">
                <br>
                <label for="user">Username:</label>
                <input type="text" id="user" name="user">
                <br>

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
                        if (pass.length == 0) {
                            document.getElementById('strength').innerHTML = "";
                        }

                        var p2 = document.getElementById('rpwd').value;
                        var score = scorePassword(pass);

                        if (score > 80) {
                            document.getElementById('strength').style.color = "green";
                            document.getElementById('strength').innerHTML = "Strong";
                            if (p2.length >= 1) {
                                passwordsMatch();
                            }
                            return "strong";
                        }
                        if (score > 60) {
                            document.getElementById('strength').style.color = "orange";
                            document.getElementById('strength').innerHTML = "Good";
                            document.getElementById('change').style.display = "none";
                            document.getElementById('secHeader').style.display = "none";
                            document.getElementById('secAlable').style.display = "none";
                            document.getElementById('secAnswer').style.display = "none";
                            document.getElementById('secSelection').style.display = "none";
                            if (p2.length >= 1) {
                                passwordsMatch();
                            }
                            return "strong";
                        }
                        if (score >= 30) {
                            document.getElementById('strength').style.color = "red";
                            document.getElementById('strength').innerHTML = "Weak";
                            if (p2.length >= 1) {
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
                        if (pass == p2) {
                            document.getElementById('match').style.color = "green";
                            document.getElementById('match').innerHTML = "The Passwords match!";

                            let rule = document.getElementById("strength").innerHTML;
                            if (rule == "Strong") {
                                document.getElementById('change').style.display = "block";
                                document.getElementById('secHeader').style.display = "block";
                                document.getElementById('secAlable').style.display = "block";
                                document.getElementById('secAnswer').style.display = "block";
                                document.getElementById('secSelection').style.display = "block";
                            }
                        }
                        else {
                            document.getElementById('change').style.display = "none";
                            document.getElementById('secHeader').style.display = "none";
                            document.getElementById('secAlable').style.display = "none";
                            document.getElementById('secSelection').style.display = "none";
                            document.getElementById('secAnswer').style.display = "none";
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
                        if (p1 == p2) {
                            document.getElementById('match').style.color = "green";
                            document.getElementById('match').innerHTML = "The Passwords match!";

                            let rule = document.getElementById("strength").innerHTML;
                            if (rule == "Strong") {
                                document.getElementById('change').style.display = "block";
                                document.getElementById('secHeader').style.display = "block";
                                document.getElementById('secAlable').style.display = "block";
                                document.getElementById('secAnswer').style.display = "block";
                                document.getElementById('secSelection').style.display = "block";
                            }
                        }
                        else {
                            document.getElementById('change').style.display = "none";
                            document.getElementById('secHeader').style.display = "none";
                            document.getElementById('secAlable').style.display = "none";
                            document.getElementById('secSelection').style.display = "none";
                            document.getElementById('secAnswer').style.display = "none";
                            document.getElementById('match').style.color = "red";
                            document.getElementById('match').innerHTML = "The Passwords do not match!";
                        }
                    }
                </script>
                <div class="secQ">
                    <p class="cent" id="secHeader">Security Question:</p>
                    <p class="regSel" id="secSelection"> <select id="secSelect" name="secSelect">
                            <option value="0">-----</option>
                            <option value="1">First Pets Name</option>
                            <option value="2">City where you were Born</option>
                            <option value="3">Mothers Maiden Name</option>
                        </select></p>

                    <label id="secAlable" for="secAnswer">Answer: </label>
                    <input type="text" id="secAnswer" name="secAnswer">
                    <br>
                    <input type="submit" id="change" value="Create Account!">
                </div>
        </div>
        <div class="addChallenge">
            <h3>Maybe here we add a form that adds challenges to JSON file</h3>
            <h6>(Not attatched to anything yet...)</h6>
            <form action="" method="post">
                <label for="skillChallenge">Skill Challenge:</label>
                <input type="text" id="skillChallenge" name="skillChallenge">
                <br>
                <label for="question">Question:</label>
                <input type="text" id="question" name="question">
                <br>
                <label for="answer">Answer:</label>
                <input type="text" id="answer" name="answer">
                <br>
                <label for="hint1">Hint 1:</label>
                <input type="text" id="hint1" name="hint1">
                <br>
                <label for="hint2">Hint 2:</label>
                <input type="text" id="hint2" name="hint2">
                <br>
                <input type="submit" id="addc" value="ADD CHALLENGE!">
        </div>
    </div>


</body>

</html>