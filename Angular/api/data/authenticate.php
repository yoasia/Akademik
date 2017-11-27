<?php
include_once 'includes/dbconn.php';
include_once 'includes/functions.php';

sec_session_start();


if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password']; // The hashed password.
 
    // Using prepared statements means that SQL injection is not possible.
    if ($stmt = $mysqli->prepare("SELECT id, email, password, nickname, ds_number, index_number, room_number, user_type  FROM users
    WHERE email = ?
     LIMIT 1")) {
        $stmt->bind_param('s', $email);  // Bind "$email" to parameter.
        $stmt->execute();    // Execute the prepared query.
        $stmt->store_result();

     // get variables from result.
        $stmt->bind_result($user_id, $email, $db_password, $nickname, $ds_number, $index_number, $room_number, $user_type);
        $stmt->fetch();

    

        if ($result->num_rows == 1) {
            // If the user exists we check if the account is locked
            // from too many login attempts
            if (checkbrute($user_id, $mysqli) == true) {
                // Account is locked
                // Send an email to user saying their account is locked
                return false;
            } else {
                // Check if the password in the database matches
                // the password the user submitted. We are using
                // the password_verify function to avoid timing attacks.
                if (password_verify($password, $db_password)) {
                    // Password is correct!
                    // Get the user-agent string of the user.
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // XSS protection as we might print this value
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // XSS protection as we might print this value
                    $username = preg_replace("/[^a-zA-Z0-9_\-]+/",
                                                             "",
                                                             $username);
                    $_SESSION['username'] = $username;
                    $_SESSION['login_string'] = hash('sha512',
                           $db_password . $user_browser);

                    $data = null;
                    $data->user_id = $user_id;
                    $data->email = $email;
                    $data->db_password = $db_password;
                    $data->nickname = $nickname;
                    $data->ds_number = $ds_number;
                    $data->index_number = $index_number;
                    $data->room_number = $room_number;
                    $data->user_type = $user_type;

                    // Login successful.
                    echo json_encode($data);
                    return true;
                } else {
                    // Password is not correct
                    // We record this attempt in the database
                    $now = time();
                    $data = null;
                    $data->status = false;
                    $data->msg = "Incorect password";
                    
                    echo json_encode($data);
                    return false;
                }
            }
        } else {
            // No user exists.
            return false;
        }
    } else {
        // Login failed
        $data = null;
        $data->status = false;
        $data->msg = "Could not connect to database";
        
        echo json_encode($data);
        return false;
    }
}
