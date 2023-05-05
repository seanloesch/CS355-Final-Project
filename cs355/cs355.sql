-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2023 at 09:05 PM
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
('4c2a904bafba06591225113ad17b5cec', 'aa478acb058b1fd8cb57803519a7fe7c'),
('7fe4771c008a22eb763df47d19e2c6aa', '06a9bd4c1ffd5ecd9a281ab873c3be33'),
('a1a9299d6ec5e1fde5be9eab2fdeeb3c', '9dca48c988baef2449cfd3c09ffed968'),
('c2deb8f8d8675d4421dbc6dc9f5497ea', '8d8c841a5a26705c870fa03b6cc0944a'),
('d107428c2bec35bce35855cd3502e4a4', '8f3a37be1db1a595c4cf4b2f8a1a3b33'),
('d16d377af76c99d27093abc22244b342', '9c204f0b606914d0750bf061dc971a22'),
('d964340d2be48f76e1263b29ad2c6a56', 'f6757ccb448e5211de1df245458a78cd'),
('f457d7941137acf3b53b2d98ac43d530', '9d5b9a9e84651c5a1928ebdb0ab8749c');

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
('039252495cb70a75bf6a6f8c30e3034a', '7fe4771c008a22eb763df47d19e2c6aa', 1, '06a9bd4c1ffd5ecd9a281ab873c3be33'),
('0eb1e635cda51b40d76f0637ac8d648c', 'd16d377af76c99d27093abc22244b342', 2, '9cdfb439c7876e703e307864c9167a15'),
('21554928055aa254912f9c0c30bd16d7', 'd107428c2bec35bce35855cd3502e4a4', 1, '7e5b9d097d6d6dae17fa3838a05193d6'),
('4b7a7ec3bc5343185cd8931ce119126f', '0da6f6b032c49d25dbc467e8f03fc740', 2, 'cab98f16acacdea50dbd91a389d0624d'),
('6917101742de4a445eeb0ae1f955d118', 'd964340d2be48f76e1263b29ad2c6a56', 2, 'ada53304c5b9e4a839615b6e8f908eb6'),
('70cd873f2991d29279d572ad8dc35bd6', 'a1a9299d6ec5e1fde5be9eab2fdeeb3c', 1, '7e5b9d097d6d6dae17fa3838a05193d6'),
('b20554d83ab77d34859b1a944a19e4cf', '4c2a904bafba06591225113ad17b5cec', 1, '48b5ae95d9abc2701bd2c590234121ba'),
('b90ff7716201ea07a5048f0081f84ed0', 'f457d7941137acf3b53b2d98ac43d530', 3, '3b346b22286168d4797532e5b11d4e71'),
('cd47bcef54cc4a6f6d7db9b844c8b877', 'c2deb8f8d8675d4421dbc6dc9f5497ea', 3, '3f90e0238358ef31df2733270aabb0ba');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `user_id` int(11) NOT NULL,
  `triviaRank` int(11) NOT NULL DEFAULT 1,
  `keyHunterHighScore` int(11) NOT NULL DEFAULT 0,
  `phishingFrenzyHighScore` int(11) NOT NULL DEFAULT 0,
  `dataDefDay` int(11) NOT NULL DEFAULT 1,
  `dataDefBalance` int(11) NOT NULL DEFAULT 0,
  `dataDefFixes` int(11) NOT NULL DEFAULT 0,
  `dataDefReputation` int(11) NOT NULL DEFAULT 0,
  `dd_ss1` int(11) NOT NULL DEFAULT 1,
  `dd_hs1` int(11) NOT NULL DEFAULT 1,
  `dd_ss2` int(11) NOT NULL DEFAULT 1,
  `dd_hs2` int(11) NOT NULL DEFAULT 1,
  `dd_ss3` int(11) NOT NULL DEFAULT 1,
  `dd_hs3` int(11) NOT NULL DEFAULT 1,
  `dd_ss4` int(11) NOT NULL DEFAULT 1,
  `dd_hs4` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`user_id`, `triviaRank`, `keyHunterHighScore`, `phishingFrenzyHighScore`, `dataDefDay`, `dataDefBalance`, `dataDefFixes`, `dataDefReputation`, `dd_ss1`, `dd_hs1`, `dd_ss2`, `dd_hs2`, `dd_ss3`, `dd_hs3`, `dd_ss4`, `dd_hs4`) VALUES
(2, 2, 0, 714, 2, 5138, 2, 75, 1, 1, 2, 2, 1, 1, 3, 1),
(3, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
(5, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
(6, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
(7, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
(8, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1),
(9, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1);

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
(4, 'Admin', 'admin@cs355.com', 'cs355admin', 'admin'),
(5, 'Ben', 'something.gmail.com', 'ben', 'player'),
(6, 'celeritas', 'seanloesch2002@gmail.com', 'celeritas', 'player'),
(7, 'jordan', 'hebertj4194@uwec.edu', 'jordan', 'player'),
(8, 'Johnny', 'midterm@uwec.edu', 'John Doe', 'player'),
(9, 'RyanH', 'RyanH@gmail.com', 'Raddish', 'player');

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
