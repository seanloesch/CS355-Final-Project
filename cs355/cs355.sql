-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2023 at 03:33 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs355`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `fullName`, `email`) VALUES
(1, 'Ryan Hrastich', 'ryanhrastich@yahoo.com'),
(4, 'Admin', 'admin@cs355.com');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user`, `pwd`) VALUES
('0da6f6b032c49d25dbc467e8f03fc740', '9dca48c988baef2449cfd3c09ffed968'),
('a1a9299d6ec5e1fde5be9eab2fdeeb3c', '9dca48c988baef2449cfd3c09ffed968'),
('c2deb8f8d8675d4421dbc6dc9f5497ea', '8d8c841a5a26705c870fa03b6cc0944a'),
('d964340d2be48f76e1263b29ad2c6a56', 'f6757ccb448e5211de1df245458a78cd');

-- --------------------------------------------------------

--
-- Table structure for table `recover`
--

CREATE TABLE `recover` (
  `email` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `choice` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recover`
--

INSERT INTO `recover` (`email`, `user`, `choice`, `answer`) VALUES
('4b7a7ec3bc5343185cd8931ce119126f', '0da6f6b032c49d25dbc467e8f03fc740', 2, 'cab98f16acacdea50dbd91a389d0624d'),
('6917101742de4a445eeb0ae1f955d118', 'd964340d2be48f76e1263b29ad2c6a56', 2, 'ada53304c5b9e4a839615b6e8f908eb6'),
('70cd873f2991d29279d572ad8dc35bd6', 'a1a9299d6ec5e1fde5be9eab2fdeeb3c', 1, '7e5b9d097d6d6dae17fa3838a05193d6'),
('cd47bcef54cc4a6f6d7db9b844c8b877', 'c2deb8f8d8675d4421dbc6dc9f5497ea', 3, '3f90e0238358ef31df2733270aabb0ba');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `user_id` int(11) NOT NULL,
  `social` int(11) NOT NULL,
  `crypt` int(11) NOT NULL,
  `server` int(11) NOT NULL,
  `intruder` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`user_id`, `social`, `crypt`, `server`, `intruder`, `score`) VALUES
(2, 4, 8, 3, 0, 2300),
(3, 2, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nickname`, `email`, `user`, `role`) VALUES
(1, 'Ryan Hrastich', 'ryanhrastich@yahoo.com', 'rhrastich', 'admin'),
(2, 'Ryan', 'ryanhrastich@gmail.com', 'rhrastich2', 'player'),
(3, 'Moop', 'weberjr1507@gmail.com', 'jweber75', 'player'),
(4, 'Admin', 'admin@cs355.com', 'cs355admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user`);

--
-- Indexes for table `recover`
--
ALTER TABLE `recover`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
