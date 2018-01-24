<?php

include_once './config.php';   
$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);


if (!$mysqli) {
    die("Couldn't connect to database");
}

?>
