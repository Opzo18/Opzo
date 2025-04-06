<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8" />
    <title>Meow Contact 🐾</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<style>

</style>

<body>
    <div class="container">
        <nav>
            <a href="shop.php"><button><i class="fas fa-store"></i> Sklep</button></a>
            <a href="cart.php"><button><i class="fas fa-shopping-cart"></i> Koszyk</button></a>
            <a href="about.html"><button><i class="fas fa-users"></i> O nas</button></a>
            <a href="#"><button><i class="fas fa-envelope"></i> Kontakt</button></a>
            <a href="logout.php"><button><i class="fas fa-sign-out-alt"></i> Wyloguj</button></a>
        </nav>
        <h1>Skontatkuj się z nami 🐱</h1>
        <form action="mailto:meowMail@gmail.com" method="post">
            <label for="name">Imię:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Wiadomość:</label>
            <textarea id="message" name="message" required></textarea>

            <input type="submit" value="Wyslij" class="contactSumbit">
        </form>
    </div>
</body>

<script>
    const textarea = document.getElementById('message');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });


    textarea.addEventListener('focus', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
</script>

</html>