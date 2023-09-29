import { Router } from "express";
import {
  createSale,
  getSales,
  getSaleById,
} from "../controllers/sale.controller.js";

const router = Router();

router.post("/sale", createSale);
router.get("/sale", getSales);
router.get("/sale/:ventaId", getSaleById);

export default router;
