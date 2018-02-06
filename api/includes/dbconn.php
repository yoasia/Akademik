<?php

include_once 'config.php';
global $mysqli;

$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);

if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

?>
