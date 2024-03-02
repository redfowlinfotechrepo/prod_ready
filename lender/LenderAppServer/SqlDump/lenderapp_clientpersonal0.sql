-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: lenderapp
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientpersonal`
--

DROP TABLE IF EXISTS `clientpersonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientpersonal` (
  `centerId` varchar(255) DEFAULT NULL,
  `CustomerId` varchar(255) NOT NULL,
  `CustomerName` varchar(255) DEFAULT NULL,
  `SpouseName` varchar(255) DEFAULT NULL,
  `FatherName` varchar(255) DEFAULT NULL,
  `MotherName` varchar(255) DEFAULT NULL,
  `DateOfBirth` varchar(255) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `ResidenceCustYr` varchar(255) DEFAULT NULL,
  `MobileNo1` varchar(255) DEFAULT NULL,
  `MobileNo2` varchar(255) DEFAULT NULL,
  `isTatchedHouse` tinyint(1) DEFAULT '0',
  `isRoofTiles` tinyint(1) DEFAULT '0',
  `isMetalsheets` tinyint(1) DEFAULT '0',
  `isCementSheetsRoof` tinyint(1) DEFAULT '0',
  `isCementConcreteCeil` tinyint(1) DEFAULT '0',
  `isHindu` tinyint(1) DEFAULT '0',
  `isMuslim` tinyint(1) DEFAULT '0',
  `isChristian` tinyint(1) DEFAULT '0',
  `isOthers` tinyint(1) DEFAULT '0',
  `isMarried` tinyint(1) DEFAULT '0',
  `isSingle` tinyint(1) DEFAULT '0',
  `isWidow` tinyint(1) DEFAULT '0',
  `isDivorced` tinyint(1) DEFAULT '0',
  `isSeparate` tinyint(1) DEFAULT '0',
  `isOwned` tinyint(1) DEFAULT '0',
  `isRented` tinyint(1) DEFAULT '0',
  `SalesExecID` varchar(50) DEFAULT NULL,
  `new_DateOfBirth` date DEFAULT NULL,
  PRIMARY KEY (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientpersonal`
--

LOCK TABLES `clientpersonal` WRITE;
/*!40000 ALTER TABLE `clientpersonal` DISABLE KEYS */;
INSERT INTO `clientpersonal` VALUES ('CENFS3tc','CL0T6Tm','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,'EMPiQrDQ',NULL),('CENFS3tc','CL0vwJJ','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,'EMPiQrDQ',NULL),(NULL,'CL7rC2_','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('Example Center','CLb-AJn','Ankush Choudhary','','','','','','225-E, Aditya syndicate colony, Adityapur','','07360094882','',1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,'EMPUJghU',NULL),('Example Center','CLB9liA','Ankush Choudhary','','','','','','225-E, Aditya syndicate colony, Adityapur','','7360094831','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'EMPUJghU',NULL),('CENFS3tc','CLc4nja','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('CENFS3tc','CLoMB3T','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),(NULL,'CLPpr-c','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),(NULL,'CLSDH95','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('CENFS3tc','CLUHXSN','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('CENFS3tc','CLVL9CA','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('CENFS3tc','CLX8L8z','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,'EMPiQrDQ',NULL),('CENFS3tc','CLxWhV7','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,NULL,NULL),('CENFS3tc','CLZbcU1','John Doe','Jane Doe','Bob Doe','Alice Doe','1990-01-01','32','123 Main Street, City','5','1234567890','9876543210',1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,'EMPUJghU',NULL);
/*!40000 ALTER TABLE `clientpersonal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-29 21:45:56
