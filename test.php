<?php
date_default_timezone_set("America/Los_Angeles");

// sleep(2);

// http://stackoverflow.com/questions/10780055/how-can-i-iterate-php-files-array
if (isset($_FILES["images"])) {
    $files = $_FILES["images"]["name"];
    $count = 0;
    foreach ($files as $file) {
         $file_name = $file;
         $file_type = $_FILES["images"]["type"][$count];
         $file_size = $_FILES["images"]["size"][$count];
         echo $file_name . "<br>";
         $count++;
    }

    echo "<br><br> " . $_GET["files"];
}

if (isset($_POST["msg"])) {
    echo "Hello World!";
}

if (isset($_GET["verified"])) {
    if ($_GET["verified"] == "true") {
        echo "Yay! You are verified! :)";
    } else {
        echo "Sorry, but you are not verified. :(";
    }
}