<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();

$tablename = $_GET["tablename"];
$id = $_GET["id"];
$action = $_GET["action"];

$query = "SELECT id_user FROM {$tablename} WHERE id_lock={$id}";
$id_result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
$id_user = mysqli_fetch_assoc($id_result)["id_user"];

if ($_SESSION["id_user"] == $id_user) {
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
} else {
  print "User is not authorized";
}

 ?>
