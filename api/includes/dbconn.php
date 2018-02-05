<?php

include_once 'config.php';
$connection = new mysqli(HOST, USER, PASSWORD, DATABASE);


if (!$connection) {
    die("Couldn't connect to database");
}

?>
