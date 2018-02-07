<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();

     $id_user = $_POST["id_user"];
     $title = $_POST["title"];
     $description = $_POST["description"];
     $is_done = false;
     $now = time();


     $query = "INSERT INTO defects (id_user, title, description, is_done, date)
      VALUES ('{$_SESSION['id_user']}', '$title', '$description', '$is_done', FROM_UNIXTIME($now))";

     if(mysqli_query($mysqli, $query) or die(mysqli_error($mysqli)))
     {
       echo '{"status":true}';
     }
     else
     {
       echo '{"status":false}';
     }
?>
