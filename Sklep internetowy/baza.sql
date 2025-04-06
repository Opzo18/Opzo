-- Table users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(50) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(15) NOT NULL,
    haslo VARCHAR(255) NOT NULL
);

-- Table categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(50) NOT NULL
);

-- Table products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(100) NOT NULL,
    opis TEXT,
    cena DECIMAL(10,2) NOT NULL,
    category_id INT,
    data_dodania TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Table cart
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert categories
INSERT INTO categories (nazwa) VALUES
('Karma'),
('Zabawki'),
('Drapaki'),
('Legowiska'),
('Akcesoria');

-- Insert products
INSERT INTO products (nazwa, opis, cena, category_id) VALUES
('Karma sucha Whiskas', 'Pyszna sucha karma dla dorosłych kotów z kurczakiem.', 29.99, 1),
('Karma mokra Felix', 'Soczyste kawałki mięsa w galaretce – ulubione danie każdego kota!', 3.49, 1),
('Piłeczka', 'Zabawka, która sprawi, że Twój kot będzie szczekał z radości!', 7.99, 2),
('Wędka z piórkami', 'Idealna do wspólnej zabawy z kotem. Piórka i sznurek – miau!', 14.99, 2),
('Drapak wieża XL', 'Wielopoziomowy drapak z miejscem do spania. Koci raj!', 199.99, 3),
('Kocyk z motywem rybek', 'Mięciutki kocyk do legowiska lub transportera.', 24.99, 4),
('Obroża', 'Stylowa obroża w kocie łapki z regulacją długości.', 11.49, 5),
('Fontanna na wodę', 'Automatyczna fontanna do świeżej wody. Twój kot pokocha ją!', 89.99, 5);
