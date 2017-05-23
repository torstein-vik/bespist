SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Database of bespist
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `bespist` DEFAULT CHARACTER SET utf8 ;
USE `bespist` ;

-- User table
CREATE TABLE IF NOT EXISTS `users` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `passhash` BINARY(32) NOT NULL,
  `passsalt` BINARY(32) NOT NULL,
  `privilege` ENUM('user', 'admin') NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;

-- Plate table
CREATE TABLE IF NOT EXISTS `plates` (
  `plateid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  `previewimg` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `category` ENUM('starter', 'main', 'dessert') NOT NULL,
  PRIMARY KEY (`plateid`))
ENGINE = InnoDB;

-- Orders table
CREATE TABLE IF NOT EXISTS `orders` (
  `orderid` INT NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` TEXT NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`orderid`),
  FOREIGN KEY (`userid`)
    REFERENCES `users` (`userid`))
ENGINE = InnoDB;

-- Order lines table
CREATE TABLE IF NOT EXISTS `orderlines` (
  `orderlineid` INT NOT NULL AUTO_INCREMENT,
  `orderid` INT NOT NULL,
  `plateid` INT NOT NULL,
  `amount` INT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`orderlineid`),
  FOREIGN KEY (`orderid`)
    REFERENCES `orders` (`orderid`),
  FOREIGN KEY (`plateid`)
    REFERENCES `plates` (`plateid`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
