# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: database_development
# Generation Time: 2018-06-29 00:13:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Items`;

CREATE TABLE `Items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_category` enum('toiletries','clothing','electronics','accessories') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;

INSERT INTO `Items` (`id`, `item_name`, `item_category`)
VALUES
	(1,'Toothbrush','toiletries'),
	(2,'Toothpaste','toiletries'),
	(3,'Jacket','clothing'),
	(4,'Pajamas','clothing'),
	(5,'Hat','accessories');

/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Locales
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Locales`;

CREATE TABLE `Locales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale_city` varchar(255) NOT NULL,
  `locale_admin` varchar(255) NOT NULL,
  `locale_country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Locales` WRITE;
/*!40000 ALTER TABLE `Locales` DISABLE KEYS */;

INSERT INTO `Locales` (`id`, `locale_city`, `locale_admin`, `locale_country`)
VALUES
	(1,'seattle','wa','usa'),
	(2,'chicago','il','usa'),
	(3,'austin','tx','usa'),
	(4,'washington','dc','usa'),
	(5,'bangkok','thailand','thailand'),
	(6,'sydney nsw','australia','australia'),
	(7,'santa monica','ca','usa'),
	(8,'istanbul','turkey','turkey'),
	(9,'cairo','egypt','egypt'),
	(10,'cappadocia','province_of_l\'aquila','italy');

/*!40000 ALTER TABLE `Locales` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table suitcase_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `suitcase_items`;

CREATE TABLE `suitcase_items` (
  `item_id` int(11) NOT NULL,
  `suitcase_id` int(11) NOT NULL,
  PRIMARY KEY (`item_id`,`suitcase_id`),
  KEY `suitcase_id` (`suitcase_id`),
  CONSTRAINT `suitcase_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `Items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `suitcase_items_ibfk_2` FOREIGN KEY (`suitcase_id`) REFERENCES `Suitcases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `suitcase_items` WRITE;
/*!40000 ALTER TABLE `suitcase_items` DISABLE KEYS */;

INSERT INTO `suitcase_items` (`item_id`, `suitcase_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(2,2),
	(3,2),
	(4,2),
	(3,3),
	(4,3),
	(5,3),
	(1,4),
	(2,4),
	(5,4),
	(1,5),
	(2,5),
	(5,5),
	(3,8),
	(4,8),
	(5,8),
	(1,9),
	(2,9),
	(3,9),
	(1,13),
	(2,13),
	(4,13),
	(5,13),
	(1,14),
	(2,14),
	(3,14),
	(4,14),
	(5,14);

/*!40000 ALTER TABLE `suitcase_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Suitcases
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Suitcases`;

CREATE TABLE `Suitcases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `travel_category` enum('business','leisure','adventure','vacation') NOT NULL,
  `notes` text,
  `locale_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locale_id` (`locale_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `suitcases_ibfk_1` FOREIGN KEY (`locale_id`) REFERENCES `Locales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `suitcases_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Suitcases` WRITE;
/*!40000 ALTER TABLE `Suitcases` DISABLE KEYS */;

INSERT INTO `Suitcases` (`id`, `start_date`, `end_date`, `travel_category`, `notes`, `locale_id`, `user_id`)
VALUES
	(1,'2018-05-04','2018-05-14','adventure','Packing this all in one backpack.',1,1),
	(2,'2018-05-04','2018-05-14','adventure','Packing this all in one backpack.',2,2),
	(3,'2018-06-04','2018-06-14','business','Packing this all in one backpack.',3,1),
	(4,'2018-06-04','2018-06-14','vacation','Bachelorette weekend!',3,2),
	(5,'2018-05-22','2018-05-26','business',NULL,3,1),
	(6,'2018-05-27','2018-06-02','adventure',NULL,4,1),
	(7,'2018-05-27','2018-06-02','adventure',NULL,5,3),
	(8,'2018-05-22','2018-05-25','business',NULL,3,3),
	(9,'2018-05-22','2018-05-24','leisure',NULL,1,3),
	(10,'2018-05-22','2018-05-22','business',NULL,3,3),
	(11,'2018-05-22','2018-05-22','vacation',NULL,6,3),
	(12,'2018-05-23','2018-05-22','adventure',NULL,7,3),
	(13,'2018-05-22','2018-05-22','adventure',NULL,8,3),
	(14,'2018-05-22','2018-05-22','adventure',NULL,9,4),
	(15,'2018-06-23','2018-06-24','leisure',NULL,3,4);

/*!40000 ALTER TABLE `Suitcases` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL DEFAULT 'no choice',
  `user_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `gender`, `user_image`)
VALUES
	(1,'JohnDoe','false@gmail.com','password','male','/assets/img/faces/raccoon.png'),
	(2,'JaneDoe','true@gmail.com','password','female','/assets/img/faces/toucan.png'),
	(3,'justb','fakeemail@email.com','$2b$08$ZYPYpNYYbtiHSAgfHtCCRuekdb9NiH30rgTXZLKKhAXkmey7yl1CS','female','/assets/img/faces/elephant.png'),
	(4,'justb','justb@inkery.com','$2b$08$qoOeOl6zrPZGEDCu4cbHluNjVk6ECIpZE/nTQEgJDr2NdtzD.zqMW','female','/assets/img/faces/elephant.png'),
	(5,'bbarnett','bb@bb.com','$2b$08$8v/lYkv0kdYTVg80EbNfx.1PUoXU4xPjBzE79y084cp4ZUeqcwfZe','female','/assets/img/faces/pig.png'),
	(6,'justb','justb@gmail.com','$2b$08$mnUkTGkAzPzU2i2u3h282OfaTQ5gDdisZUmHCJtckY9TDodGyhCZ6','female','/assets/img/faces/elephant.png');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
