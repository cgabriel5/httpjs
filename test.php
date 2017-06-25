<?php
date_default_timezone_set("America/Los_Angeles");

// sleep(2);

// pretty print the provided data
function pre($data) {
	echo "<br>";
	echo "[data]:<br>";
	echo '<pre>' . print_r($data, true) . '</pre>';
}

// Simple XHR Post Request
if (isset($_POST["simple_post"])) {
	echo "This is a simple XHR POST request.";
	pre($_POST);
}

// Simple XHR Get Request
if (isset($_GET["simple_get"])) {
	echo "This is a simple XHR GET request.";
	pre($_GET);
}

// JSON post and decode example
if (isset($_GET["json"])) {
	echo "This request was provided JSON data.";
	// get the JSON data
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	echo "<br>";
	var_dump($data);
}

// Parse JSON Test Example
// [https://stackoverflow.com/questions/7064391/php-returning-json-to-jquery-ajax-call/7064478#7064478]
if (isset($_GET["return_json"])) {
	header("Content-Type: application/json");
	// return some random JSON formated data
	echo json_encode(array("car" => "lambo"));
}

// Multiple File Upload Example
// [http://stackoverflow.com/questions/10780055/how-can-i-iterate-php-files-array]
if (isset($_FILES["images"])) {
	echo "FILES!<br>";
	$files = $_FILES["images"]["name"];
	$count = 0;
	foreach ($files as $file) {
		$file_name = $file;
		$file_type = $_FILES["images"]["type"][$count];
		$file_size = $_FILES["images"]["size"][$count];
		echo $file_name . "<br>";
		$count++;
	}
	echo "<br><br>" . $_GET["files"];
}