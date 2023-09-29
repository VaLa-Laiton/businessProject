import { Router } from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/client.controller.js";

const router = Router();

router.post("/client", createClient);
router.get("/client", getClients);
router.get("/client/:clienteId", getClientById);
router.patch("/client/:clienteId", updateClient);
router.delete("/client/:clienteId", deleteClient);

export default router;
