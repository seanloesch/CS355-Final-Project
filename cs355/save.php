<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

//Retrieve data from the HTML form
$user = $_POST['user_id'];
$trivRankUpdate = $_POST['trivRankUpdate'];
$khHighscoreUpdate = $_POST['khHighscoreUpdate'];
$pfHighscoreUpdate = $_POST['pfHighscoreUpdate'];
$ddDayUpdate = $_POST['ddDayUpdate'];
$ddBalanceUpdate = $_POST['ddBalanceUpdate'];
$ddFixUpdate = $_POST['ddFixUpdate'];
$ddRepUpdate = $_POST['ddRepUpdate'];
$ddSS1Update = $_POST['ddSS1Update'];
$ddHS1Update = $_POST['ddHS1Update'];
$ddSS2Update = $_POST['ddSS2Update'];
$ddHS2Update = $_POST['ddHS2Update'];
$ddSS3Update = $_POST['ddSS3Update'];
$ddHS3Update = $_POST['ddHS3Update'];
$ddSS4Update = $_POST['ddSS4Update'];
$ddHS4Update = $_POST['ddHS4Update'];

echo $user;
echo $trivRankUpdate;
echo $khHighscoreUpdate;
echo $pfHighscoreUpdate;

$conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("UPDATE stats SET 
    triviaRank='$trivRankUpdate', 
    keyHunterHighScore='$khHighscoreUpdate', 
    phishingFrenzyHighScore='$pfHighscoreUpdate', 
    dataDefDay='$ddDayUpdate',
    dataDefBalance='$ddBalanceUpdate',
    dataDefFixes='$ddFixUpdate',
    dataDefReputation='$ddRepUpdate',
    dd_ss1='$ddSS1Update',
    dd_hs1='$ddHS1Update',
    dd_ss2='$ddSS2Update',
    dd_hs2='$ddHS2Update',
    dd_ss3='$ddSS3Update',
    dd_hs3='$ddHS3Update',
    dd_ss4='$ddSS4Update',
    dd_hs4='$ddHS4Update'
    WHERE user_id='$user'");
$execval = $stmt->execute();
echo $execval;
session_start();
            $_SESSION['user_id'] = $user;
            echo $user;
            header('Location: http://localhost/cs355/game.php');

$conn->close();
?>