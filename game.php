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

$result = $conn->prepare("Select * from stats where user_id = '$user_id'");
$result->execute();
$result->store_result();
$result->bind_result($u_id,$social,$crypt,$server,$intruder,$score);
$result->fetch();

if($nickname == null){
  session_start();
  $_SESSION['logMessage'] = "An error occured please try logging in again";
  header('Location: http://localhost/cs355/login.php');
}

?>

<html lang="en">

<head>
    <title>Cyphr</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="game.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

    <div class="header">
        <h1>Cyphr</h1>
        <p>Login successfull!!! Welcome
            <?php echo $nickname; ?>
        </p>
    </div>

    <div class="navbar">
        <a href="logout.php">Log Out</a>

    </div>

    <div class="content">
        <div class="info">
            <p>Database:</p>
            <ul class=list>
                <li><span>Social Engineering Skill:</span>
                    <span id="skillSE_inDB">
                        <?php echo $social; ?>
                    </span>
                </li>
                <li><span>Cryptography Skill:</span>
                    <span id="skillCG_inDB">
                        <?php echo $crypt; ?>
                    </span>
                </li>
                <li><span>Server Protection:</span>
                    <span id="skillSP_inDB">
                        <?php echo $server; ?>
                    </span>
                </li>
                <li><span>Intruder Protection:</span>
                    <span id="skillIP_inDB">
                        <?php echo $intruder; ?>
                    </span>
                </li>
                <li><span>Score:</span>
                    <span id="skillS_inDB">
                        <?php echo $score; ?>
                    </span>
                </li>
            </ul>
            <p>Update in game (save would change database)</p>
            <ul class=list>
                <li><span>Social Engineering Skill:</span>
                    <span id="skillSE_inGame"></span>
                </li>
                <li><span>Cryptography Skill:</span>
                    <span id="skillCG_inGame"></span>
                </li>
                <li><span>Server Protection:</span>
                    <span id="skillSP_inGame"></span>
                </li>
                <li><span>Intruder Protection:</span>
                    <span id="skillIP_inGame"></span>
                </li>
                <li><span>Score:</span>
                    <span id="skillS_inGame"></span>
                </li>
            </ul>
            <script>
                document.getElementById('skillSE_inGame').innerHTML = document.getElementById('skillSE_inDB').innerHTML;
                document.getElementById('skillCG_inGame').innerHTML = document.getElementById('skillCG_inDB').innerHTML;
                document.getElementById('skillSP_inGame').innerHTML = document.getElementById('skillSP_inDB').innerHTML;
                document.getElementById('skillIP_inGame').innerHTML = document.getElementById('skillIP_inDB').innerHTML;
                document.getElementById('skillS_inGame').innerHTML = document.getElementById('skillS_inDB').innerHTML;
            </script>
            <p>These buttons are in place of gameplay <br>(they call the function to update your skills stat)</p>
            <span>
                Social Engineering
                <button onclick="addSE()">+</button>
                <button onclick="subSE()">-</button>
            </span>
            <br>
            <span>
                Cryptography Skill:
                <button onclick="addCG()">+</button>
                <button onclick="subCG()">-</button>
            </span>
            <br>
            <span>
                &nbsp;&nbsp;Server Protection:
                <button onclick="addSP()">+</button>
                <button onclick="subSP()">-</button>
            </span>
            <br>
            <span>
                Intruder Protection:
                <button onclick="addIP()">+</button>
                <button onclick="subIP()">-</button>
            </span>
            <br>
            <span>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;Score:
                <button onclick="addS()">+</button>
                <button onclick="subS()">-</button>
            </span>
            <script>
                function addSE() {
                    let orig = parseInt(document.getElementById('skillSE_inGame').innerHTML);
                    val = orig + 1;
                    document.getElementById('skillSE_inGame').innerHTML = val;
                    document.getElementById('valSE').value = val;
                }
                function subSE() {
                    let orig = parseInt(document.getElementById('skillSE_inGame').innerHTML);
                    val = orig - 1;
                    document.getElementById('skillSE_inGame').innerHTML = val;
                    document.getElementById('valSE').value = val;
                }
                function addCG() {
                    let orig = parseInt(document.getElementById('skillCG_inGame').innerHTML);
                    val = orig + 1;
                    document.getElementById('skillCG_inGame').innerHTML = val;
                    document.getElementById('valCG').value = val;
                }
                function subCG() {
                    let orig = parseInt(document.getElementById('skillCG_inGame').innerHTML);
                    val = orig - 1;
                    document.getElementById('skillCG_inGame').innerHTML = val;
                    document.getElementById('valCG').value = val;
                }
                function addSP() {
                    let orig = parseInt(document.getElementById('skillSP_inGame').innerHTML);
                    val = orig + 1;
                    document.getElementById('skillSP_inGame').innerHTML = val;
                    document.getElementById('valSP').value = val;
                }
                function subSP() {
                    let orig = parseInt(document.getElementById('skillSP_inGame').innerHTML);
                    val = orig - 1;
                    document.getElementById('skillSP_inGame').innerHTML = val;
                    document.getElementById('valSP').value = val;
                }
                function addIP() {
                    let orig = parseInt(document.getElementById('skillIP_inGame').innerHTML);
                    val = orig + 1;
                    document.getElementById('skillIP_inGame').innerHTML = val;
                    document.getElementById('valIP').value = val;
                }
                function subIP() {
                    let orig = parseInt(document.getElementById('skillIP_inGame').innerHTML);
                    val = orig - 1;
                    document.getElementById('skillIP_inGame').innerHTML = val;
                    document.getElementById('valIP').value = val;
                }
                function addS() {
                    let orig = parseInt(document.getElementById('skillS_inGame').innerHTML);
                    val = orig + 100;
                    document.getElementById('skillS_inGame').innerHTML = val;
                    document.getElementById('valS').value = val;
                }
                function subS() {
                    let orig = parseInt(document.getElementById('skillS_inGame').innerHTML);
                    val = orig - 100;
                    document.getElementById('skillS_inGame').innerHTML = val;
                    document.getElementById('valS').value = val;
                }
            </script>

        </div>

    </div>
    <form action="save.php" method="post">
        <div class="hide">
            <input type="text" id="user_id" name="user_id" value="<?php echo $user_id; ?>">
            <input type="number" id="valSE" name="valSE">
            <input type="number" id="valCG" name="valCG">
            <input type="number" id="valSP" name="valSP">
            <input type="number" id="valIP" name="valIP">
            <input type="number" id="valS" name="valS">            
        </div>
        <input type="submit" id="save" value="Save!">
        <script>
            let origSE = parseInt(document.getElementById('skillSE_inGame').innerHTML);
            let origCG = parseInt(document.getElementById('skillCG_inGame').innerHTML);
            let origSP = parseInt(document.getElementById('skillSP_inGame').innerHTML);
            let origIP = parseInt(document.getElementById('skillIP_inGame').innerHTML);
            let origS = parseInt(document.getElementById('skillS_inGame').innerHTML);
                
            document.getElementById('valSE').value = origSE;
            document.getElementById('valCG').value = origCG;
            document.getElementById('valSP').value = origSP;
            document.getElementById('valIP').value = origIP;
            document.getElementById('valS').value = origS;
        </script>
        
    </form>
    </div>

</body>

</html>