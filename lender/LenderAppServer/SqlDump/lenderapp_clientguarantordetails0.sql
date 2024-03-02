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
-- Table structure for table `clientguarantordetails`
--

DROP TABLE IF EXISTS `clientguarantordetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientguarantordetails` (
  `GuarentorID` varchar(50) NOT NULL,
  `CustomerID` varchar(255) DEFAULT NULL,
  `GuarantorName` varchar(255) DEFAULT NULL,
  `SpouseName` varchar(255) DEFAULT NULL,
  `FatherName` varchar(255) DEFAULT NULL,
  `MotherName` varchar(255) DEFAULT NULL,
  `Relation` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `GrMobileNo1` varchar(20) DEFAULT NULL,
  `GrMobileNo2` varchar(20) DEFAULT NULL,
  `GrAddress` varchar(255) DEFAULT NULL,
  `GrIsOwned` tinyint(1) DEFAULT '0',
  `GrIsRented` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`GuarentorID`),
  KEY `CutomerID` (`CustomerID`),
  CONSTRAINT `clientguarantordetails_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `clientpersonal` (`CustomerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientguarantordetails`
--

LOCK TABLES `clientguarantordetails` WRITE;
/*!40000 ALTER TABLE `clientguarantordetails` DISABLE KEYS */;
INSERT INTO `clientguarantordetails` VALUES ('8OqBUsJL6b','CLb-AJn','asdfasdf','','asdfasdf','','dfasdf',NULL,NULL,'1234567890','','asdf',0,1),('Fv2UEaYgsm','CLB9liA','AsdASD','','sadfasdf','dsfasdfasd','asdSAD',NULL,123,'2134234','','',0,1),('ME89gLP_Lb','CLB9liA','asdfasdf','asdfasdf','sdf','','sdaff',NULL,NULL,'12312341234','','asdfasdf',0,0);
/*!40000 ALTER TABLE `clientguarantordetails` ENABLE KEYS */;
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
