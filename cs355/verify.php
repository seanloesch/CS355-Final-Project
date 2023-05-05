<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

$conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Retrieve data from the HTML form
$email = $_POST['email'];
$femail = $_POST['femail'];
$ans = $_POST['ans'];
$pathing = $_POST['route'];

$femail = stripcslashes($femail);
$email = stripcslashes($email);
$ans = stripcslashes($ans);

$hashed_email = md5($email);
$hashed_ans = md5($ans);

$result = $conn->prepare("Select * from recover where email = '$hashed_email'");
$result->execute();
$result->store_result();
$result->bind_result($e,$u,$c,$a);
$result->fetch();

if($femail==0){
    

    if($e==null){
        session_start();
        $_SESSION['forgotMessage'] = "There is no account with this email!";
        $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
        header($newURL);
    }
    else{
        
        if($c==1){
            session_start();
            $_SESSION['femail'] = 1;
            $_SESSION['forgotMessage'] = "";
            $_SESSION['recoverQuestion'] = "First Pets Name";
            $_SESSION['fe']=$email;
            $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
            header($newURL);
        }
        else if($c==2){
            session_start();
            $_SESSION['femail'] = 1;
            $_SESSION['forgotMessage'] = "";
            $_SESSION['recoverQuestion'] = "City where you were Born";
            $_SESSION['fe']=$email;
            $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
            header($newURL);
        }
        else if($c==3){
            session_start();
            $_SESSION['femail'] = 1;
            $_SESSION['forgotMessage'] = "";
            $_SESSION['recoverQuestion'] = "Mothers Maiden Name";
            $_SESSION['fe']=$email;
            $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
            header($newURL);
        }
        else{
        session_start();
        $_SESSION['femail'] = 0;
        $_SESSION['forgotMessage'] = "There was an error please try again";
        }
    }
}
else if($femail==1){

    if($e==null){
        session_start();
        $_SESSION['forgotMessage'] = "There is no account with this email!";
        $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
        header($newURL);
    }
    else if($a != $hashed_ans){
        session_start();
        $_SESSION['forgotMessage'] = "Your answer was wrong";
        $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
        header($newURL);
    }
    else if($a == $hashed_ans){
        session_start();
        $_SESSION['chngEmail'] = $email;
        $_SESSION['hu'] = $u;
        $_SESSION['chngMessage'] = "";
        $newURL = 'Location: http://'.$pathing.'/cs355/changepwd.php';
        header($newURL);
    }

}
else{
        session_start();
        $_SESSION['femail'] = 0;
        $_SESSION['forgotMessage'] = "There was an error please try again";
        $newURL = 'Location: http://'.$pathing.'/cs355/forgotLogin.php';
        header($newURL);
}
$conn->close();
?>