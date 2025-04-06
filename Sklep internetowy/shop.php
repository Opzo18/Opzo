<!DOCTYPE html>

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
products.opis,
products.cena,
categories.nazwa
FROM products, categories WHERE products.category_id = categories.category_id");

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

?>

<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meow Shop 🐾</title>
    <link rel="stylesheet" href="./css/shop.css" />
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>

<body>
    <div class="container">
        <nav>
            <a href="#"><button><i class="fas fa-store"></i> Sklep</button></a>
            <a href="cart.php"><button><i class="fas fa-shopping-cart"></i> Koszyk</button></a>
            <a href="about.html"><button><i class="fas fa-users"></i> O nas</button></a>
            <a href="contact.php"><button><i class="fas fa-envelope"></i> Kontakt</button></a>
            <a href="logout.php"><button><i class="fas fa-sign-out-alt"></i> Wyloguj</button></a>
        </nav>

        <div class="filter-box">
            <input type="text" id="productFilter" placeholder="Szukaj produktu...">
        </div>


        <?php foreach ($products as $product): ?>
            <div class="product">
                <p><strong>Nazwa:</strong> <?= $product['nazwaProduktu']; ?></p>
                <p><strong>Opis:</strong> <?= $product['opis']; ?></p>
                <p><strong>Cena:</strong> <?= $product['cena']; ?> zł</p>
                <p><strong>Kategoria:</strong> <?= $product['nazwa']; ?></p>
                <img style="width: 200px; height: 200px;" src="./images/<?= $product['product_id']; ?>.png" alt="Zdjęcie">
                <form action="cart.php" method="post">
                    <input type="hidden" name="product_id" value="<?= $product['product_id']; ?>">
                    <input type="submit" value="Dodaj do koszyka">
                </form>
                <form action="checkout.php" method="post">
                    <input type="hidden" name="product_id" value="<?= $product['product_id']; ?>">
                    <input type="submit" value="Kup teraz">
                </form>
            </div>
        <?php endforeach; ?>
    </div>
</body>

<script>
    const productFilter = document.getElementById("productFilter");
    productFilter.addEventListener("input", function () {
        const filterValue = productFilter.value.toLowerCase();
        const products = document.getElementsByClassName("product");
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productName = product.querySelector("p").textContent.toLowerCase();
            if (productName.includes(filterValue)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        }
    });
</script>

</html>