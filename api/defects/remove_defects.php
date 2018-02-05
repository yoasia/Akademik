<?php
//By wykonać ten skrypt należy podać parametry: $_POST["title"], $_POST["description"]
include '../utils.php';
require('../includes/dbconn.php');

$query = "DELETE FROM defects WHERE title='kran' AND description='zepsul sie kran' AND id_user='2'";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
if($result > 0) {
  echo "true";
} else {
  echo "false";
}

?>
