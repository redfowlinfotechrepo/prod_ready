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
-- Table structure for table `clientverificationid`
--

DROP TABLE IF EXISTS `clientverificationid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientverificationid` (
  `id` varchar(50) NOT NULL,
  `GrSmartCard` varchar(255) DEFAULT NULL,
  `GrAadharCard` varchar(255) DEFAULT NULL,
  `GrVoterId` varchar(255) DEFAULT NULL,
  `GrOthers1` varchar(255) DEFAULT NULL,
  `GrOthers2` varchar(255) DEFAULT NULL,
  `ClSmartCard` varchar(255) DEFAULT NULL,
  `ClAadharCard` varchar(255) DEFAULT NULL,
  `ClVoterId` varchar(255) DEFAULT NULL,
  `ClPanCard` varchar(255) DEFAULT NULL,
  `ClOthers1` varchar(255) DEFAULT NULL,
  `ClOthers2` varchar(255) DEFAULT NULL,
  `customerId` varchar(255) DEFAULT NULL,
  `GrPanCard` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `clientverificationid_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `clientpersonal` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientverificationid`
--

LOCK TABLES `clientverificationid` WRITE;
/*!40000 ALTER TABLE `clientverificationid` DISABLE KEYS */;
INSERT INTO `clientverificationid` VALUES ('fVJdcRPaObSgEK23M0yGB','','234234','234234','','234234','','23423423','234234','234234','','234234','CLB9liA',''),('NEZ_GRZx9I9MJFM9GeSnm','','123123423','2342342','23423423','3423423','','213123','2342342','','234234234','234234','CLB9liA',''),('Pw6rAVnep2l0e1a7eZp4T','','','234567876543','','456765432','','123456765','234567876543','234567654','2345676543','','CLb-AJn','234567');
/*!40000 ALTER TABLE `clientverificationid` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-29 21:45:57
