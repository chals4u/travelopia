-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 22, 2022 at 07:53 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelopiaDb`
--

-- --------------------------------------------------------

--
-- Table structure for table `trip_booking`
--

CREATE TABLE `trip_booking` (
  `id` int(111) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `destination` int(111) NOT NULL,
  `qty` int(11) NOT NULL,
  `net_amt` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trip_booking`
--

INSERT INTO `trip_booking` (`id`, `name`, `email`, `destination`, `qty`, `net_amt`) VALUES
(1, 'charles', 'chals4u@yahoo.in', 1, 5, 1200),
(4, 'alex', 'alex@gmail.com', 2, 5, 25),
(5, 'suresh', 'suresh@gmail.com', 3, 6, 180),
(6, 'jjj', 'jjj@gmail.com', 2, 4, 120);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `trip_booking`
--
ALTER TABLE `trip_booking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trip_booking`
--
ALTER TABLE `trip_booking`
  MODIFY `id` int(111) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
