<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}
session_start(); // this NEEDS TO BE AT THE TOP of the page before any output etc
$forgotMessage = $_SESSION['forgotMessage'];
$femail = $_SESSION['femail'];
$recoverQuestion = $_SESSION['recoverQuestion'];
$fe = $_SESSION['fe'];
?>
<html lang="en">

<head>
    <title>Secure Arcade New Log</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="loginPage.css">
</head>

<body>

    <div class="header">
        <h1>Forgot Login Information:</h1>
        <br>
        <p>
            <?php echo $forgotMessage; ?>
        </p>
    </div>

    <div class="content">

        <div class="loginForm">
            <form action="verify.php" method="post">
                <input class="hide" type="text" id="femail" name="femail" value="<?php echo $femail; ?>">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" value="">
                <div id="verified">
                    <p>Security Question:
                        <?php echo $recoverQuestion; ?>
                    </p>
                    <label for="ans">Answer:</label>
                    <input type="text" id="ans" name="ans">
                </div>
                <script>
                    var exists = <?php echo $femail; ?>;
                    if (exists == 0) {
                        document.getElementById('verified').style.display = "none";
                    }
                    else {
                        document.getElementById('verified').style.display = "block";
                        document.getElementById('email').value="<?php echo $fe; ?>";
                    }
                </script>
                <br>

                <input type="submit" value="Submit">
            </form>

        </div>
        
</body>

</html>