import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/product", createProduct);
router.get("/product", getProducts);
router.get("/product/:productoId", getProductById);
router.patch("/product/:productoId", updateProduct);
router.delete("/product/:productoId", deleteProduct);

export default router;
