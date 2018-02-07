<?php
//By wykonać ten skrypt należy podać parametry: $_POST["title"], $_POST["description"]
include '../utils.php';
require('../includes/dbconn.php');
session_start();

$query = "DELETE FROM defects WHERE title='$_POST["title"]'
  AND description='{$_POST["description"]}'
    AND id_user='{$_SESSION["id_user"]}'";

$result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
if($result > 0) {
  echo "true";
} else {
  echo "false";
}

?>
