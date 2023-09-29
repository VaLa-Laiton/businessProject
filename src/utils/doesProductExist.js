import { pool } from "../db.js";

const doesProductExist = async (req) => {
  const { codProducto } = req.body;
  const CodClienteExist = await pool.query(
    "SELECT * FROM producto WHERE CodProducto = ?",
    [codProducto]
  );

  if (CodClienteExist[0].length >= 1) {
    return true;
  } else {
    return false;
  }
};

export default doesProductExist;
