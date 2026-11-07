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

export function createProduct(req: Request, res: Response): void {
  const { name, price } = req.body as { name?: unknown; price?: unknown };

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

  void prisma.product
    .create({
      data: {
        name: name.trim(),
        price: price
      }
    })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Gagal membuat produk baru" });
    });
}

export function updateProduct(req: Request, res: Response): void {
  const productId = Number(req.params.id);
  const { name, price } = req.body as { name?: unknown; price?: unknown };

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

  void prisma.product
    .findUnique({ where: { id: productId } })
    .then((existing) => {
      if (!existing) {
        res.status(404).json({ message: "Produk tidak ditemukan" });
        return;
      }

      return prisma.product.update({
        where: { id: productId },
        data: {
          name: name.trim(),
          price: price
        }
      });
    })
    .then((product) => {
      if (!product) {
        return;
      }

      res.status(200).json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Gagal memperbarui produk" });
    });
}

export function deleteProduct(req: Request, res: Response): void {
  const productId = Number(req.params.id);

  void prisma.product
    .findUnique({ where: { id: productId } })
    .then((existing) => {
      if (!existing) {
        res.status(404).json({ message: "Produk tidak ditemukan" });
        return;
      }

      return prisma.product.delete({
        where: { id: productId }
      });
    })
    .then((product) => {
      if (!product) {
        return;
      }

      res.status(200).json({ message: "Produk berhasil dihapus", data: product });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Gagal menghapus produk" });
    });
}
