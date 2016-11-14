-- MySQL Script generated by MySQL Workbench
-- 09/12/16 00:06:58
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
puto
-- -----------------------------------------------------
-- Schema CATI
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `CATI` ;

-- -----------------------------------------------------
-- Schema CATI
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CATI` DEFAULT CHARACTER SET latin7 ;
USE `CATI` ;

-- -----------------------------------------------------
-- Table `CATI`.`Administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Administrador` (
  `idAdministrador` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NULL,
  `nro_telefono` INT NULL,
  PRIMARY KEY (`idAdministrador`, `username`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idAdministrador_UNIQUE` ON `CATI`.`Administrador` (`idAdministrador` ASC);


-- -----------------------------------------------------
-- Table `CATI`.`Entrevistador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Entrevistador` (
  `idEntrevistador` INT NOT NULL,
  `administrador` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NULL,
  `nro_telefono` INT NULL,
  PRIMARY KEY (`idEntrevistador`, `administrador`, `username`),
  CONSTRAINT `administrador`
    FOREIGN KEY (`administrador`)
    REFERENCES `CATI`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idAdministrador_UNIQUE` ON `CATI`.`Entrevistador` (`idEntrevistador` ASC);

CREATE INDEX `administrador_idx` ON `CATI`.`Entrevistador` (`administrador` ASC);


-- -----------------------------------------------------
-- Table `CATI`.`Entrevistado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Entrevistado` (
  `idEntrevistado` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `nro_fono` INT NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATETIME NOT NULL,
  `edad` INT NULL,
  `direccion` VARCHAR(45) NULL,
  PRIMARY KEY (`idEntrevistado`, `username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CATI`.`Entrevista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Entrevista` (
  `idEntrevista` INT NOT NULL,
  `urlEntrevista` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idEntrevista`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CATI`.`RealizarLlamada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`RealizarLlamada` (
  `entrevistador` INT NOT NULL,
  `entrevistado` INT NOT NULL,
  `entrevista` INT NOT NULL,
  PRIMARY KEY (`entrevistador`, `entrevistado`, `entrevista`),
  CONSTRAINT `realizarLlamadaEr`
    FOREIGN KEY (`entrevistador`)
    REFERENCES `CATI`.`Entrevistador` (`idEntrevistador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `realizarLlamadaEo`
    FOREIGN KEY (`entrevistado`)
    REFERENCES `CATI`.`Entrevistado` (`idEntrevistado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `realizarLlamadaEa`
    FOREIGN KEY (`entrevista`)
    REFERENCES `CATI`.`Entrevista` (`idEntrevista`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `realizarLlamadaEo_idx` ON `CATI`.`RealizarLlamada` (`entrevistado` ASC);

CREATE INDEX `realizarLlamadaEa_idx` ON `CATI`.`RealizarLlamada` (`entrevista` ASC);


-- -----------------------------------------------------
-- Table `CATI`.`Llamada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Llamada` (
  `idllamada` INT NOT NULL,
  `entrevistador` INT NOT NULL,
  `entrevistado` INT NOT NULL,
  `entrevista` INT NOT NULL,
  `fecha_hora` DATETIME NOT NULL,
  PRIMARY KEY (`idllamada`),
  CONSTRAINT `llamadaEr`
    FOREIGN KEY (`entrevistador`)
    REFERENCES `CATI`.`Entrevistador` (`idEntrevistador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `llamadaEo`
    FOREIGN KEY (`entrevistado`)
    REFERENCES `CATI`.`Entrevistado` (`idEntrevistado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `llamadaEa`
    FOREIGN KEY (`entrevista`)
    REFERENCES `CATI`.`Entrevista` (`idEntrevista`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `llamadaEr_idx` ON `CATI`.`Llamada` (`entrevistador` ASC);

CREATE INDEX `llamadaEo_idx` ON `CATI`.`Llamada` (`entrevistado` ASC);

CREATE INDEX `llamadaEa_idx` ON `CATI`.`Llamada` (`entrevista` ASC);


-- -----------------------------------------------------
-- Table `CATI`.`Grabacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CATI`.`Grabacion` (
  `idGrabacion` INT NOT NULL,
  `llamadaGrabacion` INT NOT NULL,
  `duracion` INT NOT NULL,
  PRIMARY KEY (`idGrabacion`),
  CONSTRAINT `llamadaGrabacion`
    FOREIGN KEY (`llamadaGrabacion`)
    REFERENCES `CATI`.`Llamada` (`idllamada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `llamadaGrabacion_idx` ON `CATI`.`Grabacion` (`llamadaGrabacion` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
