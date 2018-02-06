<?php
  include_once '../includes/dbconn.php';
  include_once '../includes/functions.php';
  include_once '../utils.php';

  sec_session_start(); // Our custom secure way of starting a PHP session.

  if (isset($_GET['email'], $_GET['p'])) {
        $email = $_GET['email'];
        $password = $_GET['p'];

      if (login($email, $password) == true) {
          // Login success
          $query = "SELECT nickname, room_number, ds_number, id_user, user_type from users where email='".$email."';";
          $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
          if ($result > 0) {
              $room_number = mysqli_fetch_assoc($result)["room_number"];
              $_SESSION["ds_number"] = mysqli_fetch_assoc($result)["ds_number"];
              $_SESSION["id_user"] =  mysqli_fetch_assoc($result)["id_user"];
              $_SESSION["nickname"] =  mysqli_fetch_assoc($result)["nickname"];
              $_SESSION["type"] =  mysqli_fetch_assoc($result)["user_type"];
              
              $_SESSION["status"] = true;
              $_SESSION["floor"] = getFloorNumber($room_number);
              $_SESSION["mail"] = $email;
              $_SESSION["room"] = $room_number;
              
            //   $query = "SELECT ds_number from users where email='".$email."';";
            //   $result_2 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
            //   $_SESSION["ds_number"] = mysqli_fetch_assoc($result_2)["ds_number"];
              
            //     $query = "SELECT id_user from users where email='".$email."';";
            //     $result_3 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
            //     $_SESSION["id_user"] mysqli_fetch_assoc($result_3)["id_user"];
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
