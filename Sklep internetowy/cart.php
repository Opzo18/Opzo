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

$product_id = $_POST["product_id"] ?? null;
$user_id = $_SESSION['id'];

if ($product_id !== null) {
    $stmt = $dbConnect->prepare("INSERT INTO cart (cart_id, user_id, product_id, quantity) VALUES (NULL, ?, ?, 1)");
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();

    header("Location: cart.php");
    exit;
}

$product_id = $_GET['product_id'] ?? null;

if ($product_id !== null) {
    $stmt = $dbConnect->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
}

$stmt2 = $dbConnect->prepare("SELECT products.product_id,
products.nazwa AS nazwaProduktu,
products.opis,
products.cena,
categories.nazwa,
cart.product_id
FROM products, categories, cart WHERE products.category_id = categories.category_id AND user_id = ? AND cart.product_id = products.product_id ");
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$cart = $stmt2->get_result();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meow Cart 🐾</title>
    <link rel="stylesheet" href="./css/shop.css">
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>

<body>
    <div class="container">
        <nav>
            <a href="shop.php"><button><i class="fas fa-store"></i> Sklep</button></a>
            <a href="#"><button><i class="fas fa-shopping-cart"></i> Koszyk</button></a>
            <a href="about.html"><button><i class="fas fa-users"></i> O nas</button></a>
            <a href="contact.php"><button><i class="fas fa-envelope"></i> Kontakt</button></a>
            <a href="logout.php"><button><i class="fas fa-sign-out-alt"></i> Wyloguj</button></a>
        </nav>

        <?php foreach ($cart as $item): ?>
            <div class="product">
                <p><strong>Nazwa:</strong> <?= $item['nazwaProduktu']; ?></p>
                <p><strong>Opis:</strong> <?= $item['opis']; ?></p>
                <p><strong>Cena:</strong> <?= $item['cena']; ?> zł</p>
                <p><strong>Kategoria:</strong> <?= $item['nazwa']; ?></p>
                <a href="cart.php?product_id=<?= $item['product_id']; ?>" class="deleteBtn"><i class="fas fa-trash"></i>
                    Usuń</a> <br>
                <img style="width: 200px; height: auto;" src="./images/<?= $item['product_id']; ?>.png" alt="Zdjęcie">
            </div>
        <?php endforeach; ?>
        <?php if ($cart->num_rows == 0) {
            echo "<h2>Twoj koszyk jest pusty</h2>";
        } else {
            echo "
            <form action='checkout.php' method='post'>
            <input class='checkout' type='submit' value='Zakończ zamówienie'>
            <input type='hidden' name='user_id' value='" . $user_id . "'>
        </form>";
        }
        ?>
    </div>
</body>

</html>