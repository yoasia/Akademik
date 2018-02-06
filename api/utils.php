<?php

function getNickname($id) {
  require('includes/dbconn.php');

  if($id == NULL) {
    return 'null';
  }

  $query = "SELECT nickname FROM users WHERE id_user=$id";
  $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
  $nickname = mysqli_fetch_array($result)["nickname"];

  return $nickname;
}

function getNicknameByMail($mail) {
  require('includes/dbconn.php');

  if($mail == NULL) {
    return 'null';
  }

  $query = "SELECT nickname FROM users WHERE email=$mail";
  $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
  $nickname = mysqli_fetch_array($result)["nickname"];

  return $nickname;
}

function getFloorNumber($room_number) {
  if($room_number == NULL) {
    return 0;
  }

  return intval($room_number[0]);
}
?>
