<?php
include '../utils.php';
require('../includes/dbconn.php');

    $query = "SELECT * FROM notifications";
    $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
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
      echo "false";
    }

    print $json_array;
 ?>