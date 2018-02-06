<?php
  include_once '../includes/dbconn.php';
  include_once '../includes/functions.php';
  include_once '../utils.php';
  
  sec_session_start(); // Our custom secure way of starting a PHP session.

  if (isset($_GET['email'], $_GET['p'])) {

      $email = $_GET['email'];
      $password = $_GET['p']; // The hashed password.

      if (($msg = login($email, $password, $mysqli)) == true) {
          // Login success

          $query = "select room_number from users where email='$email'";
          $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

          if ($result > 0) {
            $room_number = mysqli_fetch_assoc($result)["room_number"];

            $_SESSION["status"] = true;
            $_SESSION["floor"] = getFloorNumber($room_number);            
            $_SESSION["mail"] = $email;
            $_SESSION["nickname"] = getNickname($email);
            $_SESSION["type"] = "student";
            $_SESSION["room"] = $room_number;
            
            $return["status"] = true;
            $return["floor"] = getFloorNumber($room_number);            
            $return["mail"] = $email;
            $return["nickname"] = getNickname($email);
            $return["type"] = "student";
            $return["room"] = $room_number;
        
            print json_encode($return, JSON_PRETTY_PRINT);

          } else {
            echo "Login ERROR: failed to parse the room number";
          }

      } else {
          // Login failed
          echo $msg;
      }
  } else {
      // The correct POST variables were not sent to this page.
      echo 'Invalid Request';
  }
?>
