-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2022 a las 04:59:05
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `geomap`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Remove sesion` ()   DELETE FROM `sesion-location` WHERE date < (CURRENT_TIMESTAMP - INTERVAL 1 DAY)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Remove share` ()   DELETE FROM `share-location` WHERE date < (CURRENT_TIMESTAMP - INTERVAL 1 DAY)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion-location`
--

CREATE TABLE `sesion-location` (
  `id` int(11) NOT NULL,
  `sesion` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lat1` double NOT NULL,
  `lat2` double NOT NULL,
  `lon1` double NOT NULL,
  `lon2` double NOT NULL,
  `location` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `share-location`
--

CREATE TABLE `share-location` (
  `id` int(11) NOT NULL,
  `share` varchar(20) NOT NULL,
  `lat1` double NOT NULL,
  `lat2` double NOT NULL,
  `lon1` double NOT NULL,
  `lon2` double NOT NULL,
  `location` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sesion-location`
--
ALTER TABLE `sesion-location`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `share-location`
--
ALTER TABLE `share-location`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesion-location`
--
ALTER TABLE `sesion-location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=553;

--
-- AUTO_INCREMENT de la tabla `share-location`
--
ALTER TABLE `share-location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `Remove sesion` ON SCHEDULE EVERY 1 WEEK STARTS '2022-09-18 21:57:05' ON COMPLETION NOT PRESERVE ENABLE DO CALL `Remove sesion`$$

CREATE DEFINER=`root`@`localhost` EVENT `Remove share` ON SCHEDULE EVERY 1 MONTH STARTS '2022-09-18 21:57:54' ON COMPLETION NOT PRESERVE ENABLE DO CALL `Remove share`$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
