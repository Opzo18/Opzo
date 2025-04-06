<?php
session_start();

if (!isset($_SESSION['log'])) {
    header('Location: shop.php');
    exit;
}

$host = "localhost";
$dbname = "Meow";
$username = "root";
$password = "";

$dbConnect = new mysqli($host, $username, $password, $dbname);

if ($dbConnect->connect_error) {
    die("Błąd połączenia: " . $dbConnect->connect_error);
}

if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];
    $stmt = $dbConnect->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    // Możesz przekierować na stronę z potwierdzeniem
    header('Location: thankyou.php');
    exit;
}
?>