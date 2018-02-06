<?php

require('../includes/dbconn.php');
session_start();

$id_defect = $_POST["id"];
$new_title = $_POST["title"];
$new_description = $_POST["description"];
$new_status = $_POST["status"];
$new_date = time();


$query = "SELECT id_user FROM defects WHERE id_defect='$id_defect'";
$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

$id_user = mysqli_fetch_array($result)["id_user"];

if ($id_user == $_SESSION["id_user"]) {
  $query = "UPDATE defects
    SET title='$new_title', description='$new_description',
      is_done='$new_status', date=FROM_UNIXTIME($new_date)
        WHERE id_defect='$id_defect'";
  if(mysqli_query($mysqli, $query) or die(mysqli_error($mysqli))) {
    echo "true";
  } else {
    echo "false";
  }
} else {
  echo "false";
}


// edytuj defekt

 ?>
