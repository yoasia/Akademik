?php

function Login_check($_SESSION) {
        if (!$_SESSION['user_id'])
        {
                return false;
        }

        else
        {
                return $_SESSION;
        }
}
?>


