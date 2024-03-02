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
-- Table structure for table `familydetails`
--

DROP TABLE IF EXISTS `familydetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familydetails` (
  `member1` varchar(255) DEFAULT NULL,
  `relation1` varchar(255) DEFAULT NULL,
  `age1` int DEFAULT NULL,
  `occupation1` varchar(255) DEFAULT NULL,
  `education1` varchar(255) DEFAULT NULL,
  `income1` decimal(10,2) DEFAULT NULL,
  `member2` varchar(255) DEFAULT NULL,
  `relation2` varchar(255) DEFAULT NULL,
  `age2` int DEFAULT NULL,
  `occupation2` varchar(255) DEFAULT NULL,
  `education2` varchar(255) DEFAULT NULL,
  `income2` decimal(10,2) DEFAULT NULL,
  `member3` varchar(255) DEFAULT NULL,
  `relation3` varchar(255) DEFAULT NULL,
  `age3` int DEFAULT NULL,
  `occupation3` varchar(255) DEFAULT NULL,
  `education3` varchar(255) DEFAULT NULL,
  `income3` decimal(10,2) DEFAULT NULL,
  `member4` varchar(255) DEFAULT NULL,
  `relation4` varchar(255) DEFAULT NULL,
  `age4` int DEFAULT NULL,
  `occupation4` varchar(255) DEFAULT NULL,
  `education4` varchar(255) DEFAULT NULL,
  `income4` decimal(10,2) DEFAULT NULL,
  `member5` varchar(255) DEFAULT NULL,
  `relation5` varchar(255) DEFAULT NULL,
  `age5` int DEFAULT NULL,
  `occupation5` varchar(255) DEFAULT NULL,
  `education5` varchar(255) DEFAULT NULL,
  `income5` decimal(10,2) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `clientId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familydetails`
--

LOCK TABLES `familydetails` WRITE;
/*!40000 ALTER TABLE `familydetails` DISABLE KEYS */;
INSERT INTO `familydetails` VALUES ('John Doe','Father',45,'Engineer','Bachelor\'s Degree',75000.00,'Jane Doe','Mother',42,'Doctor','Doctorate',90000.00,'Alice Doe','Daughter',18,'Student','High School',0.00,'Bob Doe','Son',16,'Student','High School',0.00,'Charlie Doe','Son',14,'Student','Middle School',0.00,'FAM5Asiy','CL0vwJJ'),('asdfasdf','asdfasdf',12,'asdfsdf','',121.00,'asdfasdf','asdfasdf',12,'asdfsdf','',121.00,'asdfasdf','asdfasdf',12,'asdfsdf','',121.00,'asdfasdf','asdfasdf',12,'asdfsdf','',121.00,'asdfasdf','asdfasdf',12,'asdfsdf','',121.00,'FAMaPUi4','CLB9liA');
/*!40000 ALTER TABLE `familydetails` ENABLE KEYS */;
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
