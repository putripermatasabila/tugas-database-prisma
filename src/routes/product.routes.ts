import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);

export default productRouter;
