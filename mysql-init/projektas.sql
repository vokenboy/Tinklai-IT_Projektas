-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 11:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projektas`
--

-- --------------------------------------------------------

--
-- Table structure for table `knyga`
--

CREATE TABLE `knyga` (
  `id` int(11) NOT NULL,
  `pavadinimas` varchar(100) NOT NULL,
  `autorius` varchar(100) NOT NULL,
  `zanras_id` int(11) DEFAULT NULL,
  `kopiju_kiekis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `knyga`
--

INSERT INTO `knyga` (`id`, `pavadinimas`, `autorius`, `zanras_id`, `kopiju_kiekis`) VALUES
(21, 'The Great Gatsby', 'F. Scott Fitzgerald', 1, 4),
(22, 'To Kill a Mockingbird', 'Harper Lee', 1, 2),
(23, '1984', 'George Orwell', 3, 4),
(24, 'The Catcher in the Rye', 'J.D. Salinger', 1, 2),
(25, 'Moby Dick', 'Herman Melville', 1, 0),
(26, 'The Da Vinci Code', 'Dan Brown', 4, 7),
(27, 'Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 2, 6),
(28, 'The Hobbit', 'J.R.R. Tolkien', 2, 8),
(29, 'The Lord of the Rings', 'J.R.R. Tolkien', 2, 3),
(30, 'A Brief History of Time', 'Stephen Hawking', 7, 5),
(31, 'The Theory of Everything', 'Stephen Hawking', 7, 4),
(32, 'A Game of Thrones', 'George R.R. Martin', 3, 5),
(33, 'The Shining', 'Stephen King', 5, 3),
(34, 'Pride and Prejudice', 'Jane Austen', 1, 6),
(35, 'War and Peace', 'Leo Tolstoy', 1, 2),
(36, 'Anna Karenina', 'Leo Tolstoy', 1, 3),
(37, 'The Science of Interstellar', 'Kip Thorne', 7, 4),
(38, 'Fairy Tales', 'Hans Christian Andersen', 9, 10),
(39, 'The Book of Fairy Poetry', 'Cicely Mary Barker', 9, 2),
(40, 'The Chronicles of Narnia', 'C.S. Lewis', 2, 5),
(43, 'a', 'a', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `naudotojas`
--

CREATE TABLE `naudotojas` (
  `id` int(11) NOT NULL,
  `vardas` varchar(50) NOT NULL,
  `pavarde` varchar(50) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `epastas` varchar(100) NOT NULL,
  `slaptazodis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `naudotojas`
--

INSERT INTO `naudotojas` (`id`, `vardas`, `pavarde`, `role_id`, `epastas`, `slaptazodis`) VALUES
(17, 'Vilius', 'Tamašauskas', 2, 'viliustam36@gmail.com', '$2b$10$xIsX21lFjH8brqEXX6nX7enay5RLNRNj1Hdl7UBGBGAF6RG7.5tGW'),
(18, 'admin', 'admin', 4, 'admin@admin.com', '$2b$10$GigQH2hAgn0Lmj7/0MXG3eDQVAsB5BzWpBZjTT551PlOwBL/l5rWq'),
(19, 'Simas', 'Jankunas', 3, 'viliustam53@gmail.com', '$2b$10$nugqjE.X/9lhBgwRMxYImuZVEDIQVMMLARPdKiz4P2cT2zS7GfFem'),
(22, 'Simas', 'Loxas', 2, 'viliustam@gmail.com', '$2b$10$z/6JFd8l4.n5dQNuU.kTrexekoETPlkskBh9Wka6gqahcFWsibprG'),
(23, 'Lol', 'DidelisLol', 3, 'pideras@gmail.com', '$2b$10$3/4bhSStvhoNxKLXL0ImrusaLUqOTyfviWEGlBoXB82Ngw/P2xLOu');

-- --------------------------------------------------------

--
-- Table structure for table `paskolinta_knyga`
--

CREATE TABLE `paskolinta_knyga` (
  `id` int(11) NOT NULL,
  `knyga_id` int(11) DEFAULT NULL,
  `naudotojas_id` int(11) DEFAULT NULL,
  `data_nuo` date DEFAULT NULL,
  `data_iki` date DEFAULT NULL,
  `grazinta` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `paskolinta_knyga`
--

INSERT INTO `paskolinta_knyga` (`id`, `knyga_id`, `naudotojas_id`, `data_nuo`, `data_iki`, `grazinta`) VALUES
(1, 43, 17, '2024-11-05', '2024-11-12', 0),
(2, 21, 17, '2024-11-05', '2024-11-12', 0),
(3, 22, 22, '2024-11-05', '2024-11-12', 0),
(4, 25, 22, '2024-11-05', '2024-11-12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pranesimas`
--

CREATE TABLE `pranesimas` (
  `id` int(11) NOT NULL,
  `zinute` text NOT NULL,
  `naudotojas_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` enum('Naudotojas','Svecias','Bibliotekininkas','Administratorius') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'Svecias'),
(2, 'Naudotojas'),
(3, 'Bibliotekininkas'),
(4, 'Administratorius');

-- --------------------------------------------------------

--
-- Table structure for table `zanras`
--

CREATE TABLE `zanras` (
  `id` int(11) NOT NULL,
  `zanras_name` enum('Drama','Istorine grozine literatura','Moksline fantastika','Detektyvas','Trileris','Romansas','Memuaras','Moksline literatura','Pasakos','Vaiku literatura','Religine literatura') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `zanras`
--

INSERT INTO `zanras` (`id`, `zanras_name`) VALUES
(1, 'Drama'),
(2, 'Istorine grozine literatura'),
(3, 'Moksline fantastika'),
(4, 'Detektyvas'),
(5, 'Trileris'),
(6, 'Romansas'),
(7, 'Moksline literatura'),
(8, 'Pasakos'),
(9, 'Vaiku literatura'),
(10, 'Religine literatura');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knyga`
--
ALTER TABLE `knyga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zanras_id` (`zanras_id`);

--
-- Indexes for table `naudotojas`
--
ALTER TABLE `naudotojas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `epastas` (`epastas`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `paskolinta_knyga`
--
ALTER TABLE `paskolinta_knyga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `knyga_id` (`knyga_id`),
  ADD KEY `naudotojas_id` (`naudotojas_id`);

--
-- Indexes for table `pranesimas`
--
ALTER TABLE `pranesimas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `naudotojas_id` (`naudotojas_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zanras`
--
ALTER TABLE `zanras`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knyga`
--
ALTER TABLE `knyga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `naudotojas`
--
ALTER TABLE `naudotojas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `paskolinta_knyga`
--
ALTER TABLE `paskolinta_knyga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pranesimas`
--
ALTER TABLE `pranesimas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `zanras`
--
ALTER TABLE `zanras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `knyga`
--
ALTER TABLE `knyga`
  ADD CONSTRAINT `knyga_ibfk_1` FOREIGN KEY (`zanras_id`) REFERENCES `zanras` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `naudotojas`
--
ALTER TABLE `naudotojas`
  ADD CONSTRAINT `naudotojas_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `paskolinta_knyga`
--
ALTER TABLE `paskolinta_knyga`
  ADD CONSTRAINT `paskolinta_knyga_ibfk_1` FOREIGN KEY (`knyga_id`) REFERENCES `knyga` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `paskolinta_knyga_ibfk_2` FOREIGN KEY (`naudotojas_id`) REFERENCES `naudotojas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pranesimas`
--
ALTER TABLE `pranesimas`
  ADD CONSTRAINT `pranesimas_ibfk_1` FOREIGN KEY (`naudotojas_id`) REFERENCES `naudotojas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
