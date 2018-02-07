<?php
include '../utils.php';
require('../includes/dbconn.php');
session_start();
    $query = "SELECT * FROM notifications WHERE ds_number='{$_SESSION["ds_number"]}' ORDER BY date DESC";
    $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));
    $json_array = array();
    if($result > 0)
    {
      while($row = mysqli_fetch_assoc($result))
      {
        $row["nickname"] = getNickname($row["id_user"]);
        array_push($json_array, $row);
      }
      $json_array = json_encode($json_array);
    }
    else
    {
      echo '{"status":false}';
    }
    print $json_array;
 ?>