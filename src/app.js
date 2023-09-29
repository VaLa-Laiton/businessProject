import express from "express";
import cors from "cors";
import morgan from "morgan";

import clientRouter from "./routers/client.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to BusinessProject" });
});

app.use("/api", clientRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
