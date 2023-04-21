<?php
    $_SESSION = [];
    session_start();
    $_SESSION['logMessage'] = "";
    header('Location: http://localhost/cs355/login.php');
?>