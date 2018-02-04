<?php
include 'utils.php';

  function getDefects() {
     require('db_connect.php');

     $query = "SELECT * FROM defects";
     $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
     $json_array = array();
     if($result > 0) {
       //$result = json_encode($result);
       while($row = mysqli_fetch_assoc($result)) {
         $row["nickname"] = getNickname($row["id_user"]);
         array_push($json_array, $row);
       }
       $json_array = json_encode($json_array);

     } else {
       echo "blad";
     }
     // $test = json_decode($json_array, true); //testing decoding for future purposes
     // var_dump($test);
     // print $test[0]["description"];
     return $json_array;
   }

   function addDefects() {
     require('db_connect.php');

     $id_user = $_POST["id_user"];
     $title = $_POST["title"];
     $description = $_POST["description"];
     $is_done = false;

     $query = "INSERT INTO defects (id_user, title, description, is_done)
      VALUES ('$id_user', '$title', '$description', '$is_done')";

     if(mysqli_query($connection, $query) or die(mysqli_error($connection)))
     {
       return true;
     }
     else
     {
       return false;
     }

     return true;
   }
   
 ?>
