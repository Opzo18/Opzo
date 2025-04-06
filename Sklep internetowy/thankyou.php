<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MEOW YOU 🐾</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="shortcut icon" href="./images/kotek.jpg" type="image/x-icon">
</head>

<body>

</body>
<script>
    const button = document.getElementById('ok');

    const body = document.querySelector('body');

    if (document.cookie.includes('checkout')) {
        let x = document.cookie.split("=")[3];
        x = parseInt(x) + 2;
        document.cookie = "checkout=" + x;
        if (x > 500) {
            document.cookie = "checkout=1";
        }
    } else {
        document.cookie = "checkout=1";
    }

    let x = document.cookie.split("=")[3];

    body.innerHTML = `<a href="shop.php"><h1 style="font-size: calc(50px + ${x}px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ">Twoje zamówienie zostało złożone!</h1></a>`;
</script>

</html>