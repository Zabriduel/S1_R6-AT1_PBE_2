CREATE DATABASE S1_R1_AT1;

USE S1_R1_AT1;

CREATE TABLE categorias (
	idCategoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    descricaoCategoria VARCHAR (100) NOT NULL,
    dataCad DATETIME DEFAULT CURRENT_TIMESTAMP
	
);

CREATE TABLE produtos(
	idProduto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idCategoria INT NOT NULL,
    nomeProduto VARCHAR(100) NOT NULL,
    valorProduto DECIMAL(10,2) NOT NULL,
    vinculoImagem VARCHAR(150) NOT NULL,
    dataCad DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_categoria_produto FOREIGN KEY(idCategoria) REFERENCES categorias(idCategoria)
    
);