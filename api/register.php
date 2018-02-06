<?php

  function register() {
    require('db_connect.php');

    $query = "SELECT COUNT(*) FROM users WHERE email='$_SESSION['email']' AND user_type='portierka'";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

    if ($result > 0) {
      $name = $_POST["name"];
      $surname = $_POST["surname"];
      $email = $_POST["email"];
      $ds_number = $_POST["ds_number"];
      $nickname = $_POST["nickname"];
      $password = md5($_POST['password']);
      $user_type = $_POST["user_type"];
      $room_number = $_POST["room_number"];
      $index_number = $_POST["index_number"];

      if (empty($name) || empty($surname) || empty($email) || empty($ds_number) || empty($nickname) || empty($password)) {
        echo "Error: Fullfil all values. No value should be empty";
      }
      if (ctype_digit(internal_post['ds_number'])) {
        echo "Error: Ds number should be digit value.";
      }
      if (ctype_digit(internal_post['index_number'])) {
        echo "Error: Ds number should be digit value.";
      }
      if (ctype_digit(internal_post['room_number'])) {
        echo "Error: Room number should be digit value.";
      }

      $select_db = mysqli_select_db($mysqli, 'project_1');
      if (!$select_db){
          die("Database Selection Failed" . mysqli_error($mysqli));
      }

      $query = "INSERT INTO `users` (name, surname, email, user_type, ds_number, room_number, nickname, password)
      VALUES ('$name', '$surname', '$email', '$user_type', '$ds_number', '$room_number', '$nickname', '$password')";

      $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    } else {
      // Redirect to login page with notification of failure
    }

    $returnArray = array();
    $returnArray["new_user"]["status"] = "OK";
    $returnArray["new_user"]["message"] = "OK";
    $returnArray["new_user"]["nickname"] = $nickname;
    $returnArray["new_user"]["password"] = $password;
    $returnArray["new_user"]["ds_number"] = $ds_number;
    $returnArray["new_user"]["room_number"] = $room_number;
    $returnArray["new_user"]["user_type"] = $user_type;
    $returnArray["new_user"]["email"] = $email;
    $returnArray["new_user"]["index_number"] = $index_number;

    return json_encode($returnArray);
  }
 ?>

