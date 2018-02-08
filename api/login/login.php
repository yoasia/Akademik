<?php
  include_once '../includes/dbconn.php';
  include_once '../includes/functions.php';
  include_once '../utils.php';

  // sec_session_start(); // Our custom secure way of starting a PHP session.
  session_start();

  if (isset($_GET['email'], $_GET['p'])) {
      $email = $_GET['email'];
      $password = $_GET['p'];
      if(chechIfUserExists($email) == true) {
            if(login($email, $password) == true){ 
                // Login success
                $query = "SELECT room_number FROM users WHERE email='{$email}'";
                $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
                $row_cnt = mysqli_num_rows($result);
            
                if ($row_cnt > 0) {
                    $room_number = mysqli_fetch_assoc($result)["room_number"];

                    $_SESSION["status"] = true;
                    $_SESSION["floor"] = getFloorNumber($room_number);
                    $_SESSION["mail"] = $email;
                    $_SESSION["nickname"] = getNicknameByMail($email);
                    $_SESSION["type"] = "student";
                    $_SESSION["room"] = $room_number;

                    $query = "SELECT ds_number FROM users WHERE email='{$email}'";
                    $result_2 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
                    $_SESSION["ds_number"] = mysqli_fetch_assoc($result_2)["ds_number"];

                    $query = "SELECT id_user FROM users WHERE email='{$email}'";
                    $result_3 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
                    $_SESSION["id_user"] = mysqli_fetch_assoc($result_3)["id_user"];

                    $query = "SELECT user_type FROM users WHERE email='{$email}'";
                    $result_4 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
                    $_SESSION["user_type"] = mysqli_fetch_assoc($result_4)["user_type"];

                    include_once './get_login_status.php';

                } else {
                    echo '{"status":false, "msg": "Could not find user."}';
                }
            }
            else {
                echo '{"status":false, "msg": "Incorrect password"}';
            }
      } else {
          // User doesnt exists
          echo '{"status":false, "msg": "User doesn\'t exists"}';
      }
    
  } else {
      // The correct POST variables were not sent to this page.
      echo '{"status":false,
        "msg": "Email od password not set"}';;
  }
?>
