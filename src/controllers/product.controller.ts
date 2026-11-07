import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getProducts(_req: Request, res: Response): void {
  void prisma.product
    .findMany()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil data produk" });
    });
}

export function getProductById(req: Request, res: Response): void {
  const productId = Number(req.params.id);

  void prisma.product
    .findUnique({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Produk tidak ditemukan" });
        return;
      }

      res.status(200).json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Gagal mengambil data produk" });
    });
}
