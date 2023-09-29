import { pool } from "../db.js";
import doesProductExist from "../utils/doesProductExist.js";

const PATH = "src/contollers/product.controller.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    if (await doesProductExist(req)) {
      return res.status(400).json({ message: "The product already exists" });
    }
    const { codProducto, nomProducto, activo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO producto (codProducto, nomProducto, activo) VALUES (?, ?, ?)",
      [codProducto, nomProducto, activo]
    );
    res.status(201).json({ codProducto, nomProducto, activo });
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/creacteProduct`, error: error });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM producto");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/getProducts`, error: error });
  }
};

// Get Product By Id
export const getProductById = async (req, res) => {
  try {
    const { productoId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE CodProducto = ?",
      [productoId]
    );
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/getProductById`, error: error });
  }
};

// Update Prodcuct
export const updateProduct = async (req, res) => {
  try {
    const { productoId } = req.params;
    const { codProducto, nomProducto, activo } = req.body;
    const [result] = await pool.query(
      "UPDATE producto SET codProducto = IFNULL(?, codProducto), nomProducto = IFNULL(?, nomProducto), activo = IFNULL(?, activo) WHERE codProducto = ?",
      [codProducto, nomProducto, activo, productoId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE codProducto = ?",
      [productoId]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/updateProduct`, error: error });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { productoId } = req.params;
    const [rows] = await pool.query(
      "DELETE FROM producto WHERE codProducto = ?",
      [productoId]
    );
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const [result] = await pool.query(
      'SELECT "The product is already deleted" AS message'
    );
    res.status(200).json(result[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/deleteProduct`, error: error });
  }
};
