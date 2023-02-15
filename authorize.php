<?php
if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit;
}
  if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response']))
  {
        $secret = '6LfTChAkAAAAAJxSxfk5VnU1-epZF4VAPFtsf9qS';
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
        $responseData = json_decode($verifyResponse);
        if($responseData==true)
        {
            echo "Your contact request have submitted successfully.";
            $conn = new mysqli('localhost','root','','cs355');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Retrieve data from the HTML form
$username = $_POST['username'];
$password = $_POST['password'];

//prevent mySQL injection
$username = stripcslashes($username);
$password = stripcslashes($password);

//code to get rid of md5
//-----------------------------------------------------------------------------------------------------------------
//  $options = [
//      'cost' => 12,
//  ];
// $hashed_password = password_hash($password, PASSWORD_BCRYPT, $options);
// $hashed_username = md5($username);
// echo "Password: ";
// echo $hashed_password;
// echo "    Username: ";
// echo $hashed_username;

// $stmt = $conn->prepare("UPDATE logins SET username = '$hashed_username' WHERE username = '$username'");

// $stmt->execute();
// $stmt = $conn->prepare("UPDATE logins SET password = '$hashed_password' WHERE username = '$hashed_username'");
// $stmt->execute();

//$hashed_password = password_hash($password, PASSWORD_DEFAULT);
//$hashed_username = password_hash($username, PASSWORD_DEFAULT);
//-----------------------------------------------------------------------------------------------------------------
$hashed_password = md5($password);
$hashed_username = md5($username);


$result = $conn->prepare("Select * from login where user = '$hashed_username'");
    $result->execute();
    $result->store_result();
    $result->bind_result($user,$pwd);
    $result->fetch();
    

if ($hashed_password == $pwd){
    $result = $conn->prepare("Select * from user where user = '$username'");
    $result->execute();
    $result->store_result();
    $result->bind_result($user_id,$nickname,$email,$user,$role);
    $result->fetch();
    echo $role;
    if($role == "player"){      
            session_start();
            $_SESSION['user_id'] = $user_id;
            header('Location: http://localhost/cs355/game.php');
        }
    
    else if($role == "admin"){
        session_start();
        $_SESSION['user_id'] = $user_id;
        header('Location: http://localhost/cs355/admin.php');
    }
    else{
        session_start();
        $_SESSION['logMessage'] = "An error occured please try logging in again";
        header('Location: http://localhost/cs355/login.php');
    }
}
    
else{
    session_start();
    $_SESSION['logMessage'] = "Incorrect username or password";
    header('Location: http://localhost/cs355/login.php');
    echo "Incorrect username or password";
}
$conn->close();
        }
        else if($responseData==false){
            session_start();
            $_SESSION['logMessage'] = "Robot verification failed, please try again.";
            header('Location: http://localhost/cs355/login.php');
            echo "Robot verification failed, please try again.";
        }
        
   }
   else{
    session_start();
    $_SESSION['logMessage'] = "Please fill out robot verification.";
    header('Location: http://localhost/cs355/login.php');
    echo "Please fill out robot verification.";
   }
?>