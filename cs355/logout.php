<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}
session_destroy();
session_start();
$_SESSION['logMessage'] = "";
header('Location: http://localhost/cs355/login.php');
?>