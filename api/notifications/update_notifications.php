<?php
  require('../includes/dbconn.php');
  session_start();
  $new_status = '';
  $id_notification = $_POST["id"];
  $new_title = $_POST["title"];
  $new_content = $_POST["content"];
  $new_date = time();

  $query = "SELECT id_user FROM notifications WHERE id_notification={$id_notification}";

  $result = mysqli_query($mysqli, $query) or die(mysqli_error($mysqli));

  $id_user = mysqli_fetch_array($result)["id_user"];

  if ($id_user == $_SESSION["id_user"]) {
    $query = "UPDATE notifications
      SET title='{$new_title}', content='{$new_content}'
          WHERE id_notification={$id_notification}";
    if(mysqli_query($mysqli, $query) or die(mysqli_error($mysqli))) {
      echo '{"status":true}';
    } else {
      echo '{"status":false}';
    }
  } else {
    echo '{"status":false}';
  }
 ?>