<?php
include_once 'db_connect.php';
include_once 'functions.php';

sec_session_start(); // Our custom secure way of starting a PHP session.

if (isset($_GET['email'], $_GET['p'])) {
    $email = $_GET['email'];
    $password = $_GET['p']; // The hashed password.

    if (login($email, $password, $mysqli) == true) {
        // Login success
        header('Location: ./index.php');
    } else {
        // Login failed
        header('Location: ./?error=1');
    }
} else {
    // The correct POST variables were not sent to this page.
    echo 'Invalid Request';
}

?>
