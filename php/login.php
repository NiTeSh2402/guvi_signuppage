<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Fetching the  user credentials from Mysql
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $session_id = uniqid();
        $redis->set($session_id, json_encode($user));
        echo json_encode(['success' => true, 'session_id' => $session_id]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
