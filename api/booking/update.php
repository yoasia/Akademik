<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();

$tablename = $_GET["tablename"];
$id = $_GET["id"];
$user_id = $_GET["user_id"];
$action = $_GET["action"];

if ($action == "book") {
  $query = "UPDATE {$tablename}
    SET id_user={$_SESSION['id_user']}
      WHERE id_lock={$id}";
}
elseif ($action == "cancel") {
  $query = "UPDATE {$tablename}
    SET id_user=NULL
      WHERE id_lock={$id}";
}
else {
  die("Error");
}

$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
if ($result) {
  print true;
} else {
  print false;
}

 ?>
