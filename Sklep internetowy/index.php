<!DOCTYPE html>

<?php
session_start();

if (isset($_SESSION['log'])) {
  header('location: shop.php');
}

if (!isset($_COOKIE['odwiedz'])) {
  $odwiedzono = 1;
} else {
  $odwiedzono = intval(($_COOKIE['odwiedz'])) + 1;
}

setcookie('odwiedz', $odwiedzono, time() + (60 * 60 * 24 * 365));
$wyraz = ($odwiedzono == 1) ? 'raz' : 'razy';

?>

<html lang="pl">

<head>
  <meta charset="UTF-8" />
  <title>Meow Meow Meow 🐾</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
</head>

<body>
  <div class="container">
    <h1>Meow Meow Meow! 🐱</h1>

    <p>W tym roku odwiedziłeś nas <?= $odwiedzono ?> <?= $wyraz ?>!</p>

    <a href="login.php" class="btn">Zaloguj się</a>
    <a href="register.php" class="btn">Zarejestruj się</a> <br>
    <img alt="random cat" id="catImage">
  </div>
</body>

<script>
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => {
      const catImage = document.getElementById('catImage');
      catImage.src = data[0].url
    })
</script>

</html>