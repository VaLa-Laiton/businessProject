import { pool } from "../db.js";

const doesClientExist = async (req) => {
  const { CodCliente } = req.body;
  const CodClienteExist = await pool.query(
    "SELECT * FROM cliente WHERE CodCliente = ?",
    [CodCliente]
  );

  if (CodClienteExist[0].length >= 1) {
    return true;
  } else {
    return false;
  }
};

export default doesClientExist;
