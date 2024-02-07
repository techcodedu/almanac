-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2024 at 05:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `almanac`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `name`) VALUES
(6, 'Berlin'),
(10, 'Canberra'),
(4, 'London'),
(8, 'Madrid'),
(3, 'Mexico City'),
(2, 'Ottawa'),
(5, 'Paris'),
(7, 'Rome'),
(9, 'Tokyo'),
(1, 'Washington, D.C.');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `capital_city_id` int(11) DEFAULT NULL,
  `flag_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`country_id`, `name`, `capital_city_id`, `flag_id`) VALUES
(1, 'United States', 1, 1),
(2, 'Canada', 2, 2),
(3, 'Mexico', 3, 3),
(4, 'United Kingdom', 4, 4),
(5, 'France', 5, 5),
(6, 'Germany', 6, 6),
(7, 'Italy', 7, 7),
(8, 'Spain', 8, 8),
(9, 'Japan', 9, 9),
(10, 'Australia', 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `flags`
--

CREATE TABLE `flags` (
  `flag_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flags`
--

INSERT INTO `flags` (`flag_id`, `image_path`) VALUES
(2, '/static/images/flags/canada.png'),
(5, '/static/images/flags/france.png'),
(6, '/static/images/flags/germany.png'),
(7, '/static/images/flags/italy.png'),
(9, '/static/images/flags/japan.png'),
(3, '/static/images/flags/mexico.png'),
(8, '/static/images/flags/spain.png'),
(4, '/static/images/flags/united-kingdom.png'),
(1, '/static/images/flags/united-states.png'),
(10, 'images/flags/australia.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idx_country_name` (`name`),
  ADD KEY `idx_capital_city_id` (`capital_city_id`),
  ADD KEY `idx_flag_id` (`flag_id`);

--
-- Indexes for table `flags`
--
ALTER TABLE `flags`
  ADD PRIMARY KEY (`flag_id`),
  ADD UNIQUE KEY `image_path` (`image_path`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `flags`
--
ALTER TABLE `flags`
  MODIFY `flag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `fk_capital_city` FOREIGN KEY (`capital_city_id`) REFERENCES `cities` (`city_id`),
  ADD CONSTRAINT `fk_flag` FOREIGN KEY (`flag_id`) REFERENCES `flags` (`flag_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
