<?php
include '../utils.php';
require('../includes/dbconn.php');

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
 print $json_array;

?>