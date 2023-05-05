<?php
    $_SESSION = [];
    session_start();
    $_SESSION['logMessage'] = "";
    $newURL = 'Location: http://localhost/cs355/login.php';
        header($newURL);

?>