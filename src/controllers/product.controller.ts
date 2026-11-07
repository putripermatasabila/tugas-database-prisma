import { Request, Response } from "express";
import { products, Product } from "../data/products";

export function getProducts(_req: Request, res: Response): void {
  res.status(200).json(products);
}

export function getProductById(req: Request, res: Response): void {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    res.status(404).json({ message: "Produk tidak ditemukan" });
    return;
  }

  res.status(200).json(product);
}

export function createProduct(req: Request, res: Response): void {
  const { name, price } = req.body as Partial<Product>;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    res.status(400).json({
      message: "Nama produk dan harga valid wajib diisi"
    });
    return;
  }

  const newProduct: Product = {
    id: products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1,
    name: name.trim(),
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
}
