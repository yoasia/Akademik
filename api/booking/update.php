<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();

$tablename = $_POST["tablename"];
$id = $_POST["id"];
$user_id = $_POST["user_id"];
$action = $_POST["action"];

if ($action == "book") {
  $query = "UPDATE {$tablename}
    SET id_user={$_SESSION['id_user']}
      WHERE id_lock={$id}";
}
else if ($action == "cancel") {
  $query = "UPDATE {$tablename}
    SET id_user=NULL
      WHERE id_lock={$id}";
}
else {
  die('{"status":false}');
}

$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
if ($result) {
  print '{"status":true}';
} else {
  print '{"status":false}';
}

 ?>
