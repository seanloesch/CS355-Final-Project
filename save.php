<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

//Retrieve data from the HTML form
$user = $_POST['user_id'];
$valSE = $_POST['valSE'];
$valCG = $_POST['valCG'];
$valSP = $_POST['valSP'];
$valIP = $_POST['valIP'];
$valS = $_POST['valS'];

$conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("UPDATE stats SET social='$valSE', crypt='$valCG', server='$valSP', intruder='$valIP',score='$valS' WHERE user_id='$user'");
$execval = $stmt->execute();
echo $execval;
session_start();
            $_SESSION['user_id'] = $user;
            header('Location: http://localhost/cs355/game.php');

$conn->close();
?>