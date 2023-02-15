<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}

//Retrieve data from the HTML form
$fname = $_POST['fname'];
$email = $_POST['email'];
$user = $_POST['user'];
$pwd = $_POST['pwd'];
$rpwd = $_POST['rpwd'];
$secSelect = $_POST['secSelect'];
$secAnswer = $_POST['secAnswer'];

$fname = stripcslashes($fname);
$email = stripcslashes($email);
$user = stripcslashes($user);
$pwd = stripcslashes($pwd);
$rpwd = stripcslashes($rpwd);
$secSelect = stripcslashes($secSelect);
$secAnswer = stripcslashes($secAnswer);

$conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($fname==null||$email==null||$user==null||$pwd==null||$rpwd==null||$secSelect==0||$secAnswer==null){
    session_start();
    $_SESSION['registrationMessage'] = "Please Fill out all Fields";
    header('Location: http://localhost/cs355/register.php');
    echo "Please Fill out all Fields";
    $conn->close();
}

$hashed_password = md5($pwd);
$hashed_username = md5($user);


if($pwd != $rpwd){
    session_start();
    $_SESSION['registrationMessage'] = "Your passwords do not match!";
    header('Location: http://localhost/cs355/register.php');
    echo "Your passwords do not match!";
}
else{
    

    $result = $conn->prepare("Select * from login where user = '$hashed_username'");
    $result->execute();
    $result->store_result();
    $result->bind_result($username,$pass);
    $result->fetch();

    if($username != null){
        session_start();
        $_SESSION['registrationMessage'] = "This username is already taken!";
        header('Location: http://localhost/cs355/register.php');
        echo "This username is already taken!";
    }
    else{
        $result = $conn->prepare("Select * from user where email = '$email'");
        $result->execute();
        $result->store_result();
        $result->bind_result($user_id,$nickname,$e,$userN,$role);
        $result->fetch();
        if($e == null){
            $role="player";
            $initialStats="0";

            $stmt = $conn->prepare("insert into login(user, pwd) VALUES (?,?)");
	    	$stmt->bind_param("ss", $hashed_username,$hashed_password);
	    	$execval = $stmt->execute();
	    	$stmt = $conn->prepare("insert into user(nickname, email, user, role) VALUES (?,?,?,?)");
	    	$stmt->bind_param("ssss", $fname, $email, $user,$role);
	    	$execval = $stmt->execute();
	    	echo $execval;

            $hashed_email = md5($email);
            $hashed_answer = md5($secAnswer);
            
            $stmt = $conn->prepare("insert into recover(email, user, choice, answer) VALUES (?,?,?,?)");
	    	$stmt->bind_param("ssis", $hashed_email, $hashed_username, $secSelect,$hashed_answer);
	    	$execval = $stmt->execute();
	    	echo $execval;

            $result = $conn->prepare("Select * from user where nickname = '$fname'");
            $result->execute();
            $result->store_result();
            $result->bind_result($user_id,$nickname,$e,$userN,$role);
            $result->fetch();
	    	
            $stmt = $conn->prepare("insert into stats(user_id, social, crypt, server, intruder, score) VALUES (?,?,?,?,?,?)");
	    	$stmt->bind_param("iiiiii", $user_id, $initialStats, $initialStats, $initialStats, $initialStats, $initialStats);
	    	$execval = $stmt->execute();
	    	echo $execval;

	    	echo " update successful...";
            header('Location: http://localhost/cs355/login.php');
            
            $conn->close();
            
        }
        else{
            session_start();
            $_SESSION['registrationMessage'] = "There is already an account with this email!";
            header('Location: http://localhost/cs355/register.php');
            echo "There is already an account with this email";
    }
}}
$conn->close();
?>