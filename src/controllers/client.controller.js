import { pool } from "../db.js";
import doesClientExist from "../utils/doesClientExist.js";

const PATH = "src/contollers/client.controller.js";

// Create Client
export const createClient = async (req, res) => {
  try {
    if (await doesClientExist(req)) {
      return res.status(400).json({ message: "The client already exists" });
    }
    const { codCliente, nomCliente, ciudad } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO cliente (codCliente, nomCliente, ciudad) VALUES (?, ?, ?)",
      [codCliente, nomCliente, ciudad]
    );
    res.status(201).json({ codCliente, nomCliente, ciudad });
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/creacteClient`, error: error });
  }
};

// Get Client
export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cliente");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/getClient`, error: error });
  }
};

// get Client By Id
export const getClientById = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE CodCliente = ?",
      [clienteId]
    );
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Client Not Found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/getClientById`, error: error });
  }
};

// Update Client
export const updateClient = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { codCliente, nomCliente, ciudad } = req.body;
    const [result] = await pool.query(
      "UPDATE cliente SET codCliente = IFNULL(?, codCliente), nomCliente = IFNULL(?, nomCliente), ciudad = IFNULL(?, ciudad) WHERE codCliente = ?",
      [codCliente, nomCliente, ciudad, clienteId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client Not Found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE codCliente = ?",
      [clienteId]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ path: `${PATH}/updateClient`, error: error });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [rows] = await pool.query(
      "DELETE FROM cliente WHERE codCliente = ?",
      [clienteId]
    );
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Client Not Found" });
    }
    const [result] = await pool.query(
      'SELECT "The client is already deleted" AS message'
    );
    res.status(200).json(result[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ path: `${PATH}/creacteClient`, error: error });
  }
};
