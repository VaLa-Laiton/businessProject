import { pool } from "../db.js";
import doesClientExist from "../utils/doesClientExist.js";

const PATH = "src/contollers/client.controller.js";

// Create Client
export const createClient = async (req, res) => {
  try {
    if (await doesClientExist(req)) {
      return res.status(200).json({ message: "The client already exists" });
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
export const getClient = 0;

// Update Client
export const updateClient = 0;

// Delete Client
export const deleteClient = 0;
