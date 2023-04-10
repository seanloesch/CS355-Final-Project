<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

$logMessage= "";

session_start();
$_SESSION['registrationMessage'] = "";
$_SESSION['forgotMessage'] = "";
$_SESSION['femail'] = 0;
$_SESSION['recoverQuestion']="";
$_SESSION['fe']="";
$_SESSION['adminMessage']="";

$logMessage = $_SESSION['logMessage'];
?>

<html lang="en">

<head>
    <title>Secure Arcade Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="loginPage.css">
</head>

<body>

        <div class="header">
            <h1>Secure Arcade</h1>
            <h1>Login Page</h1>
            <p><?php echo $logMessage; ?></p>
        </div>

        <div class="content">
        <div class="loginForm">
            <form action="authorize.php" method="post">

                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <?php
                    require_once('recaptchalib.php');
                    $publickey = "6LfTChAkAAAAAJxSxfk5VnU1-epZF4VAPFtsf9qS"; // you got this from the signup page
                    echo recaptcha_get_html($publickey);
                ?>
                <script src='https://www.google.com/recaptcha/api.js'></script>
                <div class="g-recaptcha" data-sitekey="6LfTChAkAAAAAJxSxfk5VnU1-epZF4VAPFtsf9qS"></div>
                <input type="submit" value="Submit">
                
            </form>
            <div class=loginLink>
                <a class="logLink" href="forgotLogin.php"> Forgot  Username or Password?</a>
                <br>
                <a class="logLink" href="register.php"> Register</a>
                
            </div>
            <br>
        </div>
        
    </div>

</body>

</html>