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
$email = $_POST['cEmail'];
$user = $_POST['user'];
$pwd = $_POST['pwd'];
$rpwd = $_POST['rpwd'];

//prevent mySQL injection
$username = stripcslashes($user);
$password = stripcslashes($pwd);
$email = stripcslashes($email);
$rpwd = stripcslashes($rpwd);

//hash lookup
$hashed_password = md5($pwd);
$hashed_username = md5($user);
$hashed_email = md5($email);

if($password != $rpwd){
    echo "Your passwords do not match!";
}
else{
    //for checking there is nobody else with the same username
    $result = $conn->prepare("Select * from user where user = '$user'");
    $result->execute();
    $result->store_result();
    $result->bind_result($u_id,$n,$e,$u,$r);
    $result->fetch();
    //for getting all the current players information
    $result = $conn->prepare("Select * from user where email = '$email'");
    $result->execute();
    $result->store_result();
    $result->bind_result($cu_id,$cn,$ce,$cu,$cr);
    $result->fetch();
    //grabbing the data from login table
    $result = $conn->prepare("Select * from login where user = '$hashed_username'");
    $result->execute();
    $result->store_result();
    $result->bind_result($db_hu,$db_pwd);
    $result->fetch();
    //grabbing the data from recover
    $result = $conn->prepare("Select * from recover where email = '$hashed_email'");
    $result->execute();
    $result->store_result();
    $result->bind_result($re,$ru,$rc,$ra);
    $result->fetch();
    if($hashed_password == $db_pwd){
        session_start();
        $_SESSION['chngMessage'] = "The new password is the same as the old one! Please make a new password";
        header('Location: http://localhost/cs355/changepwd.php');
    }

    else if($u!=null){
        if($e==$email){//the person logging in is using the same username
            $stmt = $conn->prepare("UPDATE login SET pwd='$hashed_password' WHERE user='$hashed_username'");
            $execval = $stmt->execute();
	        echo $execval;
            echo "the person logging in is using the same username";
            header('Location: http://localhost/cs355/login.php');
            }

        else{//the person logging in is using a new username thats taken
            session_start();
            $_SESSION['chngMessage'] = "That username is already taken!";
            header('Location: http://localhost/cs355/changepwd.php');
        }
    }
    else{//the person logging in is using a new username
        $hash_old_username = md5($cu);

        $stmt = $conn->prepare("UPDATE recover SET user='$hashed_username' WHERE email='$re'");
        $execval = $stmt->execute();
	    echo $execval;
        $stmt = $conn->prepare("UPDATE user SET user='$user' WHERE email='$email'");
        $execval = $stmt->execute();
	    echo $execval;
        $stmt = $conn->prepare("UPDATE login SET user='$hashed_username' WHERE user='$hash_old_username'");
        $execval = $stmt->execute();
	    echo $execval;
        $stmt = $conn->prepare("UPDATE login SET pwd='$hashed_password' WHERE user='$hashed_username'");
        $execval = $stmt->execute();
	    echo $execval;
        
        header('Location: http://localhost/cs355/login.php');
    }
}
$conn->close();
?>