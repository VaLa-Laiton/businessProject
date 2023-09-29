import { Router } from "express";
import { createClient } from "../controllers/client.controller.js";

const router = Router();

router.post("/client", createClient);

export default router;
