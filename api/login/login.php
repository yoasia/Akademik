<?php
  include_once '../includes/dbconn.php';
  include_once '../includes/functions.php';
  include_once '../utils.php';

  sec_session_start(); // Our custom secure way of starting a PHP session.

  if (isset($_GET['email'], $_GET['p'])) {

      if (login($email, $password) == true) {
          // Login success
          $query = "SELECT room_number from users where email='$email'";
          $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

          if ($result > 0) {
            $room_number = mysqli_fetch_assoc($result)["room_number"];

            $_SESSION["status"] = true;
            $_SESSION["floor"] = getFloorNumber($room_number);
            $_SESSION["mail"] = $email;
            $_SESSION["nickname"] = getNicknameByMail($email);
            $_SESSION["type"] = "student";
            $_SESSION["room"] = $room_number;

            $query = "SELECT ds_number from users where email='$email'";
            $result_2 = mysqli_query($connection, $query) or die(mysqli_error($connection));
            $_SESSION["ds_number"] = mysqli_fetch_assoc($result_2)["ds_number"];

            $query = "SELECT id_user from users where email='$email'";
            $result_3 = mysqli_query($connection, $query) or die(mysqli_error($connection));
            $_SESSION["id_user"] = mysqli_fetch_assoc($result_3)["id_user"];

            include_once './get_login_status.php';

          } else {
            echo "Login ERROR: failed to parse the room number";
          }

      } else {
          // Login failed
          echo "Login ERROR";
      }
  } else {
      // The correct POST variables were not sent to this page.
      echo 'Invalid Request';
  }
?>
