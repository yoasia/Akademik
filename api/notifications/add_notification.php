<?php
include '../utils.php';
require('../includes/dbconn.php');

    $id_user = $_POST["id_user"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $now = time();

    $query = "INSERT INTO notifications (id_user, content, date, time, title, ds_number)
    VALUES ('$id_user', '$content', FROM_UNIXTIME($now), NOW(), '$title', $_SESSION["ds_number"])";

    if(mysqli_query($connection, $query) or die(mysqli_error($connection)))
    {
      echo "true";
    }
    else
    {
      echo "false";
    }
 ?>
