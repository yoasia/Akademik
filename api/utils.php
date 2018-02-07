<?php

function getNickname($id) {
  require('includes/dbconn.php');

  if($id == NULL) {
    return 'null';
  }

  $query = "SELECT nickname FROM users WHERE id_user='{$id}'";
  $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
  $nickname = mysqli_fetch_array($result)["nickname"];

  return $nickname;
}

function getNicknameByMail($mail) {
  require('includes/dbconn.php');

  if($mail == NULL) {
    return 'null';
  }

  $query = "SELECT nickname FROM users WHERE email='{$mail}'";
  $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
  $nickname = mysqli_fetch_array($result)["nickname"];

  return $nickname;
}

function getFloorNumber($room_number) {
  if($room_number == NULL) {
    return 0;
  }

  return intval($room_number[0]);
}

function getHours() {
  $hours = [];

  $hours[0] = "6:00";
  $hours[1] = "7:00";
  $hours[2] = "8:00";
  $hours[3] = "9:00";
  $hours[4] = "10:00";
  $hours[5] = "11:00";
  $hours[6] = "12:00";
  $hours[7] = "13:00";
  $hours[8] = "14:00";
  $hours[9] = "15:00";
  $hours[10] = "16:00";
  $hours[11] = "17:00";
  $hours[12] = "18:00";
  $hours[13] = "19:00";
  $hours[14] = "20:00";
  $hours[15] = "21:00";
  $hours[16] = "22:00";
  $hours[17] = "23:00";
  $hours[18] = "24:00";

  return $hours;
}

function parseHourToMYSQL($hour) {
  return $hour . ":00";
}
?>
