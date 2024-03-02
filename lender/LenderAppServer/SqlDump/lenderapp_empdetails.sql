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
-- Table structure for table `empdetails`
--

DROP TABLE IF EXISTS `empdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empdetails` (
  `id` varchar(12) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `EmailAddr` varchar(255) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `GovtID` varchar(50) DEFAULT NULL,
  `Role` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `AmountLended` decimal(10,2) DEFAULT NULL,
  `centerId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empdetails`
--

LOCK TABLES `empdetails` WRITE;
/*!40000 ALTER TABLE `empdetails` DISABLE KEYS */;
INSERT INTO `empdetails` VALUES ('el48q5','Admin','1234567890','admin@gmail.com',NULL,'Sahara City, Adityapur',NULL,'Admin','$2a$10$mi8WPaYDe9XWJT78nRhEy.YEN/NMyGbiC5Hn3NgbQPFNBArw4pqji',NULL,NULL),('EMP1JIRX','Sales5','1234567895','sales2@gmail.com',NULL,'Sahara City, Adityapur',NULL,'SalesExec','$2a$10$hQs46sGJTcGtbUM0Yxgg4OXYp1OKg9yPPQXv471yJYAARmEWO5Kle',NULL,'CENONLNs'),('EMPfU1Fo','Sales3','1234567893','sales2@gmail.com',NULL,'Sahara City, Adityapur',NULL,'SalesExec','$2a$10$E9OemtLhfyKDM4cxyGr6k.97dNu2rugLio0Y64RQmDvUvxG2wUbti',NULL,'CENONLNs'),('EMPiQrDQ','Sales2','1234567892','sales2@gmail.com',NULL,'Sahara City, Adityapur',NULL,'SalesExec','$2a$10$aXPrE395jXZpxDC2ZszcTuX6fXjD9SrDDObCDbFkv8qSPFxL5eXk2',NULL,'CENYXX2f'),('EMPLlaFC','Sales4','1234567894','sales2@gmail.com',NULL,'Sahara City, Adityapur',NULL,'SalesExec','$2a$10$mXGKwYq1QKv1jR2FufKGD.8u2KpUqW9CPp4gwsLFTEIRpNUWVDKce',NULL,'CENONLNs'),('EMPUJghU','Sales1','1234567891','sales2@gmail.com',NULL,'Sahara City, Adityapur',NULL,'SalesExec','$2a$10$3EqoWpuH0AMXcJl5EJSHvetn9IDlA.0.TIpqA3FPOT1YYpP.rp.MS',NULL,'CENYXX2f');
/*!40000 ALTER TABLE `empdetails` ENABLE KEYS */;
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
