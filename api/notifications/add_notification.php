<?php
include '../utils.php';
require('../includes/dbconn.php');

    $id_user = $_POST["id_user"];
    $content = $_POST["content"];

    $query = "INSERT INTO notifications (id_user, content) VALUES ('$id_user', '$content')";

    if(mysqli_query($connection, $query) or die(mysqli_error($connection)))
    {
      echo "true";
    }
    else
    {
      echo "false";
    }
 ?>