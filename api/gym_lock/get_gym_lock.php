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

$ds_number = $_GET["ds_number"];
$floor = $_GET["floor"];

$gym->ds_number = $ds_number;
$gym->hours = $actual_hours;

$gym->days = array();
$days->hours = array();

for ($day_index = 0; $day_index < 7; $day_index++) {
  if ($day_index != 0) {
    $actual_date = date('Y-m-d', strtotime('+1 day', strtotime($actual_date)));
  }
  $day = date('l', strtotime($actual_date));

  $days->name = $day;
  $days->date = $actual_date;
  $days->hours = array();

  foreach ($actual_hours as $hour) {
    $hour = parseHourToMYSQL($hour);

    $query = "SELECT id_lock, id_user FROM gym_lock
      WHERE date='{$actual_date}' AND floor={$floor} AND ds_number={$ds_number}";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

    $id_lock = mysqli_fetch_assoc($result)["id_lock"];
    $id_user = mysqli_fetch_assoc($result)["id_user"];
    print var_dump($id_user) . '<br/>';
    if ($id_user == NULL) {
      $room_number = NULL;
      print $id_user;
    } else {
      print "nie ma nulla";
      $query = "SELECT room_number FROM users WHERE id_user={$id_user}";
      $result_2 = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

      $room_number = mysqli_fetch_assoc($result_2)["room_number"];
    }

    $hours->id = $id_lock;
    $hours->user_room = $room_number;
    $hours->user_id = $id_user;

    if($_SESSION["id_user"] == $id_user && $id_user != NULL) {
      $hours->editable= true;
    } else {
      $hours->editable = false;
    }

    array_push($days->hours, $hours);
  }
  array_push($gym->days, $days);
}

$json_encoded = json_encode($gym);
// var_dump($json_encoded);
print $json_encoded;

 ?>
