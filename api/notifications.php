<?php
  include 'utils.php';

  function getNotifications()
  {
    require('db_connect.php');

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
      echo "blad";
    }

    return $json_array;
  }


  function addNotification()
  {
    require('db_connect.php');

    $id_user = $_POST["id_user"];
    $content = $_POST["content"];

    $query = "INSERT INTO notifications (id_user, content) VALUES ('$id_user', '$content')";

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