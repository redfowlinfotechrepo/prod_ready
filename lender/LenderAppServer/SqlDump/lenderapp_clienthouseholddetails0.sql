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
-- Table structure for table `clienthouseholddetails`
--

DROP TABLE IF EXISTS `clienthouseholddetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clienthouseholddetails` (
  `id` varchar(50) NOT NULL,
  `Loan` decimal(10,2) DEFAULT NULL,
  `Education` decimal(10,2) DEFAULT NULL,
  `Rent` decimal(10,2) DEFAULT NULL,
  `Medical` decimal(10,2) DEFAULT NULL,
  `Others` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `TotalIncome` decimal(10,2) DEFAULT NULL,
  `TotalExpenses` decimal(10,2) DEFAULT NULL,
  `Balance` decimal(10,2) DEFAULT NULL,
  `customerId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `clienthouseholddetails_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `clientpersonal` (`CustomerId`),
  CONSTRAINT `clienthouseholddetails_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `clientpersonal` (`CustomerId`),
  CONSTRAINT `clienthouseholddetails_ibfk_3` FOREIGN KEY (`customerId`) REFERENCES `clientpersonal` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienthouseholddetails`
--

LOCK TABLES `clienthouseholddetails` WRITE;
/*!40000 ALTER TABLE `clienthouseholddetails` DISABLE KEYS */;
INSERT INTO `clienthouseholddetails` VALUES ('CQxCl1SKZ6CG0FlBTldW8',NULL,123123.00,123123.00,123123.00,123121.00,123121.00,NULL,NULL,NULL,'CLB9liA'),('eUjC0vLuZcRvom3wc5g1e',NULL,1234.00,12345.00,654321.00,543212.00,654318.00,NULL,NULL,NULL,'CLb-AJn'),('sjwQHD6QSQ_P5LVTxRRxR',NULL,123123.00,123123.00,NULL,312311.00,NULL,NULL,NULL,NULL,'CLB9liA');
/*!40000 ALTER TABLE `clienthouseholddetails` ENABLE KEYS */;
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
