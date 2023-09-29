import { pool } from "../db.js";

const PATH = "src/contollers/sale.controller.js";

// Create Sale
export const createSale = async (req, res) => {
  try {
    const {
      fecha,
      codProducto,
      codCliente,
      cantidad,
      valorUnitario,
      valorTotal,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO venta (fecha, codProducto, codCliente, cantidad, valorUnitario, valorTotal) VALUES (?, ?, ?, ?, ?, ?)",
      [fecha, codProducto, codCliente, cantidad, valorUnitario, valorTotal]
    );
    res.status(201).json({
      ventaId: rows.insertId,
      fecha,
      codProducto,
      codCliente,
      cantidad,
      valorUnitario,
      valorTotal,
    });
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/creacteSale`, error: error });
  }
};

// Get Sales
export const getSales = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM venta");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/getSales`, error: error });
  }
};

// Get Sale By Id
export const getSaleById = async (req, res) => {
  try {
    const { ventaId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM venta WHERE VentaID = ?",
      [ventaId]
    );
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Sale Not Found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/getSaleById`, error: error });
  }
};
