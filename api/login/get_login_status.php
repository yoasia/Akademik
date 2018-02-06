<?php

session_start();
if(session_status() === PHP_SESSION_ACTIVE) {
  print json_encode($_SESSION);
} else {
  print json_encode(array("status" => false));
}

?>
