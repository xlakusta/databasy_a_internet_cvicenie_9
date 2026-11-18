-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Лис 18 2026 р., 06:15
-- Версія сервера: 10.4.32-MariaDB
-- Версія PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: ` kniznica_db`
--

-- --------------------------------------------------------

--
-- Структура таблиці `zadanie`
--

CREATE TABLE `zadanie` (
  `id` int(11) NOT NULL,
  `nazov` varchar(150) NOT NULL,
  `autor` varchar(120) NOT NULL,
  `rok` int(11) NOT NULL,
  `cena` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `zadanie`
--

INSERT INTO `zadanie` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES
(1, 'heart', 'vania', 21, 10012.50),
(3, 'Duna', 'Herbert', 1996, 9.90),
(4, 'Pride and Prejudice', 'Jane Austen', 1970, 10.01),
(5, 'To Kill a Mockingbird', 'Harper Lee', 1930, 12.10),
(7, 'The Call of the Wild', 'Jack London', 1903, 7.21),
(8, 'Verity', 'Colleen Hoover', 2020, 100.00);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `zadanie`
--
ALTER TABLE `zadanie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `zadanie`
--
ALTER TABLE `zadanie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
