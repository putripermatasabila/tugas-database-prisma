import express from "express";
import productRouter from "./routes/product.routes";

const app = express();

app.use(express.json());
app.use("/products", productRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

export default app;
