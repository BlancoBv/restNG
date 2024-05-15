-- MySQL Script generated by MySQL Workbench
-- mar 14 may 2024 09:11:39
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ventaND
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ventaND` ;

-- -----------------------------------------------------
-- Schema ventaND
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ventaND` ;
USE `ventaND` ;

-- -----------------------------------------------------
-- Table `ventaND`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventaND`.`categorias` ;

CREATE TABLE IF NOT EXISTS `ventaND`.`categorias` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventaND`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventaND`.`productos` ;

CREATE TABLE IF NOT EXISTS `ventaND`.`productos` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precioUnitario` DECIMAL(3,2) NOT NULL,
  `idcategoria` INT NOT NULL,
  `existencias` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `img` LONGTEXT NOT NULL,
  PRIMARY KEY (`idproducto`),
  INDEX `fk_producto_categoria1_idx` (`idcategoria` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`idcategoria`)
    REFERENCES `ventaND`.`categorias` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventaND`.`carritos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventaND`.`carritos` ;

CREATE TABLE IF NOT EXISTS `ventaND`.`carritos` (
  `idcarritos` INT NOT NULL AUTO_INCREMENT,
  `num_tel` INT(10) NOT NULL,
  `entregado` TINYINT(0) NOT NULL,
  `total` DECIMAL(3,2) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `autorizadoPor` INT NULL,
  `productos` LONGTEXT NOT NULL,
  `cantidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcarritos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ventaND`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ventaND`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `ventaND`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
