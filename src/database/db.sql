CREATE DATABASE Negocio;

CREATE TABLE Producto (
    CodProducto VARCHAR(20) NOT NULL,
    NomProducto VARCHAR(100) NOT NULL,
    Activo BOOLEAN NOT NULL,
    PRIMARY KEY (CodProducto)
);

CREATE TABLE Cliente (
    CodCliente VARCHAR(10) NOT NULL,
    NomCliente VARCHAR(100) NOT NULL,
    Ciudad VARCHAR(60) NOT NULL,
    PRIMARY KEY (CodCliente)
);

CREATE TABLE Venta (
    VentaID INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    CodProducto VARCHAR(20) NOT NULL,
    CodCliente VARCHAR(10) NOT NULL,
    Cantidad DECIMAL(10, 2) NOT NULL,
    ValorUnitario DECIMAL(10, 2) NOT NULL,
    ValorTotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CodProducto) REFERENCES Producto(CodProducto),
    FOREIGN KEY (CodCliente) REFERENCES Cliente(CodCliente)
);
