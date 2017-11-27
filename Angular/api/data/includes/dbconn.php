<?php
include_once 'config.php';   // As functions.php is not included
$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);


if (!$mysqli) {
    die("Couldn't connect to database");
}
