<?php
$komunikat = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $imie = $_POST["imie"];
    $nazwisko = $_POST["nazwisko"];
    $email = $_POST["email"];
    $telefon = $_POST["telefon"];
    $haslo = $_POST["haslo"];
    $haslo_potwierdzenie = $_POST["haslo_potwierdzenie"];

    $hasloHash = password_hash($haslo, PASSWORD_DEFAULT);

    if (!$imie || !$nazwisko || !$email || !$telefon || !$haslo || !$haslo_potwierdzenie) {
        header("Location: register.php");
        exit;
    }
    $host = "localhost";
    $dbname = "Meow";
    $username = "root";
    $password = "";

    $dbConnect = new mysqli($host, $username, $password, $dbname);

    if ($dbConnect->connect_error) {
        die("Błąd połączenia z baza danych: " . $dbConnect->connect_error);
    }

    $stmt = $dbConnect->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $komunikat = "Użytkownik o podanym adresie email już istnieje.";
    } else {

        $stmt = $dbConnect->prepare("INSERT INTO users (imie, nazwisko, email, telefon, haslo) VALUES (?, ?, ?, ?, ?)");

        // string string string string string
        $stmt->bind_param("sssss", $imie, $nazwisko, $email, $telefon, $hasloHash);

        if ($stmt->execute()) {
            header("Location: login.php");
            exit;
        } else {
            echo "<p class='error'>Błąd rejestracji: " . $stmt->error . "</p>";
        }

        $stmt->close();
        $dbConnect->close();
    }
}
?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meow Rejestracja 🐾</title>
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon" />
</head>

<body>
    <div class="container">
        <form action="register.php" method="post">
            <h1>Rejestracja</h1>

            <label> Imię: <input type="text" name="imie" required placeholder="Meowek" /> </label>

            <label> Nazwisko: <input type="text" name="nazwisko" required placeholder="Kociak" /> </label>

            <label> Email: <input type="email" name="email" required placeholder="meow@example.com" /> </label>

            <label> Telefon: <input type="tel" name="telefon" required placeholder="123 456 789" /> </label>

            <label> Hasło: <input type="password" name="haslo" required placeholder="••••••••" /> </label>

            <label> Powtórz hasło: <input type="password" name="haslo_potwierdzenie" required
                    placeholder="Wpisz ponownie hasło" /> </label>

            <input type="submit" value="Zarejestruj" class="btn" />
            <p>Masz już konto? <a href="login.php">Zaloguj się</a></p>
        </form>
        <?php if ($komunikat) {
            echo $komunikat;
        } ?>
    </div>
</body>

<script>
    const passwordInput = document.querySelector('input[name="haslo"]');
    const confirmPasswordInput = document.querySelector('input[name="haslo_potwierdzenie"]');

    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function () {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Hasła nie pasują do siebie.');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }
</script>

</html>