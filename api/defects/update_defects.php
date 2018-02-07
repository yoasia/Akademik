<?php

require('../includes/dbconn.php');
session_start();
$new_status = '';
$id_defect = $_POST["id"];
$new_title = $_POST["title"];
$new_description = $_POST["description"];
if(isset($_POST["status"]))
  $new_status = " is_done='{$_POST["status"]}', ";
$new_date = time();

$query = "SELECT id_user FROM defects WHERE id_defect='$id_defect'";
$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

$id_user = mysqli_fetch_array($result)["id_user"];

if ($id_user == $_SESSION["id_user"]) {
  $query = "UPDATE defects
    SET title='{$new_title}', description='{$new_description}',
      {$new_status} date=FROM_UNIXTIME({$new_date})
        WHERE id_defect='$id_defect'";
  if(mysqli_query($mysqli, $query) or die(mysqli_error($mysqli))) {
    echo '{"status":true}';
  } else {
    echo '{"status":false}';
  }
} else {
  echo '{"status":false}';
}


// edytuj defekt

 ?>
