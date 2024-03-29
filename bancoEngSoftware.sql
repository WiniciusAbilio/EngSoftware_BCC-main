-- MySQL Script generated by MySQL Workbench
-- Sun Nov  5 18:29:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema engsoftware
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema engsoftware
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `engsoftware` DEFAULT CHARACTER SET utf8 ;
USE `engsoftware` ;

-- -----------------------------------------------------
-- Table `engsoftware`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `engsoftware`.`Usuario` (
  `email` VARCHAR(150) NOT NULL,
  `nomeUsuario` VARCHAR(150) NOT NULL,
  `senha` CHAR(88) NOT NULL,
  `tipoUsuario` ENUM('normal', 'especialista', 'admin') NULL DEFAULT 'normal',
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `engsoftware`.`Relatorio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `engsoftware`.`Relatorio` (
  `idRelatorio` INT NOT NULL AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(45) NOT NULL,
  `dataEmissao` VARCHAR(45) NOT NULL,
  `acuracia` VARCHAR(45) NOT NULL,
  `urlFoto` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `filial` VARCHAR(45) NOT NULL,
  `silo` VARCHAR(45) NOT NULL,
  `Usuario_email` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idRelatorio`, `Usuario_email`),
  INDEX `fk_Relatorio_Usuario1_idx` (`Usuario_email` ASC) VISIBLE,
  CONSTRAINT `fk_Relatorio_Usuario1`
    FOREIGN KEY (`Usuario_email`)
    REFERENCES `engsoftware`.`Usuario` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `engsoftware`.`Filial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `engsoftware`.`Filial` (
  `idFilial` INT NOT NULL AUTO_INCREMENT,
  `nomeFilial` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFilial`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `engsoftware`.`Silo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `engsoftware`.`Silo` (
  `idSilo` INT NOT NULL AUTO_INCREMENT,
  `nomeSilo` VARCHAR(45) CHARACTER SET 'armscii8' NOT NULL,
  `Filial_idFilial` INT NOT NULL,
  PRIMARY KEY (`idSilo`, `Filial_idFilial`),
  INDEX `fk_Silo_Filial1_idx` (`Filial_idFilial` ASC) VISIBLE,
  CONSTRAINT `fk_Silo_Filial1`
    FOREIGN KEY (`Filial_idFilial`)
    REFERENCES `engsoftware`.`Filial` (`idFilial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
