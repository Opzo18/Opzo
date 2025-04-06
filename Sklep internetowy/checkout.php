<?php

session_start();

if (!isset($_SESSION['log'])) {
    header('location: index.php');
}

$host = "localhost";
$dbname = "Meow";
$username = "root";
$password = "";

$dbConnect = new mysqli($host, $username, $password, $dbname);

if ($dbConnect->connect_error) {
    die("Błąd połączenia z baza danych: " . $dbConnect->connect_error);
}

$stmt = $dbConnect->prepare("SELECT products.product_id,
products.nazwa AS nazwaProduktu,
products.cena
FROM products WHERE products.product_id = ?;");

$stmt->bind_param("i", $_POST['product_id']);
$stmt->execute();
$result = $stmt->get_result();

$user_id = $_POST['user_id'] ?? null;

if ($user_id) {
    $stmt = $dbConnect->prepare("SELECT products.product_id,
products.nazwa AS nazwaProduktu,
products.cena,
cart.user_id
FROM products, cart WHERE cart.user_id = ? AND  products.product_id = cart.product_id;");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
}

?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Meow Checkout 🐾</title>
    <link rel="stylesheet" href="./css/shop.css">
</head>

<body style="display: flex; flex-direction: row;">
    <div class="container" style="width: 50%;">
        <nav>
            <a href="shop.php"><button><i class="fas fa-store"></i> Sklep</button></a>
            <a href="cart.php"><button><i class="fas fa-shopping-cart"></i> Koszyk</button></a>
            <a href="#"><button><i class="fas fa-users"></i> O nas</button></a>
            <a href="contact.php"><button><i class="fas fa-envelope"></i> Kontakt</button></a>
            <a href="logout.php"><button><i class="fas fa-sign-out-alt"></i> Wyloguj</button></a>
        </nav>

        <h1>Meow Checkout 🐾</h1>
        <p>Podsumowanie zamówienia:</p>

        <?php foreach ($result as $item): ?>
            <div class="product">
                <p><strong>Nazwa:</strong> <?= $item['nazwaProduktu']; ?></p>
                <p><strong>Cena:</strong> <?= $item['cena']; ?> zł</p>
            </div>
        <?php endforeach; ?>
        <p><strong>Wartość zamówienia:</strong> <?php
        $total = 0;

        foreach ($result as $item) {
            $total += $item['cena'];
        }

        echo $total . " zł"; ?></p>
    </div>
    <div class="container2" style="width: 50%;">
        <form style="width: 100%; height: 100%;" method="POST" action="clear.php" id="checkoutForm">
            <input type="hidden" name="user_id" value="<?= htmlspecialchars($user_id); ?>">
            <button type="submit" class="checkout" id="ok"
                style="width: 100%; height: 100%; font-size: calc(3vw);">Zakończ zamówienie</button>
        </form>
    </div>
</body>

</html>