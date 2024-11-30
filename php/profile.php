<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $session_id = $_POST['session_id'];
    $session_data = json_decode($redis->get($session_id), true);

    if ($session_data) {
        if ($_POST['action'] === 'get') {
            $profile = $profilesCollection->findOne(['user_id' => $session_data['id']]);
            echo json_encode($profile);
        } elseif ($_POST['action'] === 'update') {
            $profilesCollection->updateOne(
                ['user_id' => $session_data['id']],
                ['$set' => [
                    'age' => $_POST['age'],
                    'dob' => $_POST['dob'],
                    'contact' => $_POST['contact']
                ]]
            );
            echo json_encode(['success' => true]);
        }
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
