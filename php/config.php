<?php
// Mysql Configuration
$host = '127.0.0.1';
$db = 'user_management'; 
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Mongodb Configuration
require 'vendor/autoload.php'; 
$client = new MongoDB\Client('mongodb://127.0.0.1/');
$userManagementDb = $client->user_management; 
$profilesCollection = $userManagementDb->profiles;

// Redis Configuration
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
?>
