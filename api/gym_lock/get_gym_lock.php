<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();

///////////////////////////////////////////
// $_GET["ds_number"] = 2;
// $_GET["floor"] = 3;
///////////////////////////////////////////

$actual_date = date('Y-m-d');
$actual_hours = getHours();

$ds_number = $_SESSION["ds_number"];
$floor = $_GET["floor"];

$gym->ds_number = $ds_number;
$gym->hours = $actual_hours;

$gym->days = array();
$days->hours = array();

// $days = array();
$day = [];

for ($day_index = 0; $day_index < 7; $day_index++) {
  if ($day_index != 0) {
    $actual_date = date('Y-m-d', strtotime('+1 day', strtotime($actual_date)));
  }
  $day_name = date('l', strtotime($actual_date));

  $day["name"] = $day_name;
  $day["date"] = $actual_date;
  $day["hours"] = [];

  foreach ($actual_hours as $hour) {
    $hours = [];

    $parsed_hour = parseHourToMYSQL($hour);
    $hour_dbFormat = date('H:i:s', strtotime($parsed_hour));

    $query = "SELECT id_lock, id_user FROM gym_lock
      WHERE date='{$actual_date}' AND floor={$floor} AND ds_number={$ds_number} AND time='{$hour_dbFormat}'";
    
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $parsed_result = mysqli_fetch_assoc($result);


    $id_user = $parsed_result["id_user"];
    $id_lock = $parsed_result["id_lock"];

    if ($id_user == NULL) {
      $room_number = NULL;
    } else {
      $query = "SELECT room_number FROM users WHERE id_user={$id_user}";
      $result_2 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
      $parsed_result_2 = mysqli_fetch_assoc($result_2);

      $room_number = $parsed_result_2["room_number"];
      $parsed_result->room = $room_number;
    }

    $hours["id"] = $id_lock;
    $hours["user_room"] = $room_number;
    $hours["user_id"] = $id_user;

    if($_SESSION["id_user"] == $id_user && $id_user != NULL) {
      $hours["editable"] = true;
    } else {
      $hours["editable"] = false;
    }
    array_push($day["hours"], $hours);
  }
  array_push($gym->days, $day);
}

// var_dump($days->hours);
$json_encoded = json_encode($gym);
// var_dump($json_encoded);
print $json_encoded;

 ?>
