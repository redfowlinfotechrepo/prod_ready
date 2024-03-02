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
-- Table structure for table `transactionlogs`
--

DROP TABLE IF EXISTS `transactionlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactionlogs` (
  `TransId` varchar(50) NOT NULL,
  `Date` date DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `TypeOfTrans` varchar(255) DEFAULT NULL,
  `InvestorId` varchar(50) DEFAULT NULL,
  `CenterId` varchar(50) DEFAULT NULL,
  `SalesExecId` varchar(50) DEFAULT NULL,
  `ClientId` varchar(50) DEFAULT NULL,
  `ModeOfTrans` varchar(255) DEFAULT NULL,
  `isInvestment` tinyint(1) DEFAULT NULL,
  `isLoanPayment` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`TransId`),
  KEY `CenterId` (`CenterId`),
  KEY `SalesExecId` (`SalesExecId`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `transactionlogs_ibfk_1` FOREIGN KEY (`CenterId`) REFERENCES `centerdetails` (`id`),
  CONSTRAINT `transactionlogs_ibfk_2` FOREIGN KEY (`SalesExecId`) REFERENCES `empdetails` (`id`),
  CONSTRAINT `transactionlogs_ibfk_3` FOREIGN KEY (`ClientId`) REFERENCES `clientpersonal` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionlogs`
--

LOCK TABLES `transactionlogs` WRITE;
/*!40000 ALTER TABLE `transactionlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactionlogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-29 21:43:44
