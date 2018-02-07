<?php
//By wykonać ten skrypt należy podać parametry: $_POST["title"], $_POST["description"]
include '../utils.php';
require('../includes/dbconn.php');
session_start();

$query = "DELETE FROM notifications WHERE id_notification='{$_POST["id"]}' 
AND id_user='{$_SESSION["id_user"]}'";

$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
if($result > 0) {
  echo '{"status":true}';
}
else
{
  echo '{"status":false}';
}

?>
