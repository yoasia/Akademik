<?php
  include_once '../includes/dbconn.php';
  include_once '../includes/functions.php';
  include_once '../utils.php';
  
  sec_session_start(); // Our custom secure way of starting a PHP session.

  if (isset($_GET['email'], $_GET['p'])) {

      $email = $_GET['email'];
      $password = $_GET['p']; // The hashed password.

      if ((login($email, $password, $mysqli)) == true) {
          // Login success
          $query = "SELECT room_number from users where email='$email'";
          $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
          
          if ($result > 0) {
              $room_number = mysqli_fetch_assoc($result)["room_number"];
              
              $_SESSION["status"] = true;
              $_SESSION["floor"] = getFloorNumber($room_number);
              $_SESSION["email"] = $email;
              $_SESSION["nickname"] = getNicknameByMail($email);
              $_SESSION["type"] = "student";
              $_SESSION["room"] = $room_number;
              
              $query = "SELECT ds_number from users where email='$email'";
              $result_2 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
              $_SESSION["ds"] = mysqli_fetch_assoc($result_2)["ds_number"];
              
              $query = "SELECT id_user from users where email='$email'";
              $result_3 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
              $_SESSION["id"] = mysqli_fetch_assoc($result_3)["id_user"];
              
              if(session_status() === PHP_SESSION_ACTIVE) {
                echo "success";
                print json_encode($_SESSION);
              } else {
                print json_encode(array("status" => false));
              }
            
          } else {
            echo "Login ERROR: failed to parse the room number";
          }

      } else {
          // Login failed
          //echo $msg;
      }
  } else {
      // The correct POST variables were not sent to this page.
      echo 'Invalid Request';
  }
?>
