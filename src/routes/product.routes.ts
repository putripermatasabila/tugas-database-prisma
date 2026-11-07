import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);

export default productRouter;
