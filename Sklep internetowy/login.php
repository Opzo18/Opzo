<?php
session_start();
$komunikat = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST["email"];
    $haslo = $_POST["haslo"];


    if (!$email || !$haslo) {
        header("Location: login.php");
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

    if ($result->num_rows > 0 || $result !== null) {
        $user = $result->fetch_assoc();
        if ($user && password_verify($haslo, $user["haslo"])) {
            $_SESSION['log'] = true;
            $_SESSION['email'] = $email;
            $_SESSION['id'] = $user["user_id"];
            header("Location: index.php");
            exit;
        } else {
            $komunikat = "Nieprawidłowy email lub hasło!";
        }
    }

    $stmt->close();
    $dbConnect->close();
}

?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meow Logowanie! 🐾</title>
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon" />
</head>

<body>
    <div class="container">
        <form action="login.php" method="post">
            <h1>Zaloguj się</h1>
            <label>Email: <input type="email" name="email" required placeholder="meow@example.com" /> </label>
            <label> Hasło: <input type="password" name="haslo" required placeholder="••••••••" /> </label>
            <div class="buttons-container">
                <input type="submit" value="Login" class="btn" />
                <a href="register.php" class="btn">Rejestracja</a>
            </div>
        </form>
        <?php if ($komunikat) {
            echo $komunikat;
        } ?>
    </div>
</body>

</html>