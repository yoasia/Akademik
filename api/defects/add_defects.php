<?php
include '../utils.php';
require('../includes/dbconn.php');

     $id_user = $_POST["id_user"];
     $title = $_POST["title"];
     $description = $_POST["description"];
     $is_done = false;

     $query = "INSERT INTO defects (id_user, title, description, is_done)
      VALUES ('$id_user', '$title', '$description', '$is_done')";

     if(mysqli_query($connection, $query) or die(mysqli_error($connection)))
     {
       echo "true";
     }
     else
     {
       echo "false";
     }
?>