# API Daftar Produk

Proyek ini adalah REST API sederhana menggunakan Express.js, TypeScript, dan Prisma ORM dengan SQLite sebagai database. Data produk disimpan di database SQLite melalui Prisma.

## Cara Menjalankan

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

Server berjalan pada `http://localhost:3000`. Untuk menjalankan versi hasil build:

```bash
npm run build
npm start
```

## Struktur Proyek

```text
src/
├── app.ts
├── index.ts
├── controllers/
│   └── product.controller.ts
└── routes/
    └── product.routes.ts
prisma/
├── schema.prisma
├── seed.ts
└── migrations/
```

- `prisma/schema.prisma` — definisi model database (Product)
- `prisma/seed.ts` — data awal (seed) untuk database
- `prisma/migrations/` — riwayat migrasi database

Route hanya memasangkan method dan URL ke controller. Controller menangani request, memanggil Prisma Client untuk berinteraksi dengan database, status HTTP, dan JSON response.

## Daftar Endpoint

| Method | Endpoint | Status berhasil | Keterangan |
|---|---|---:|---|
| GET | `/products` | 200 | Mengambil semua produk |
| GET | `/products/:id` | 200 | Mengambil satu produk berdasarkan ID |
| GET | `/products/:id` | 404 | ID produk tidak ditemukan |
| POST | `/products` | 201 | Menambahkan produk baru |
| POST | `/products` | 400 | Validasi input gagal |
| PUT | `/products/:id` | 200 | Mengupdate produk berdasarkan ID |
| PUT | `/products/:id` | 404 | ID produk tidak ditemukan |
| PUT | `/products/:id` | 400 | Validasi input gagal |
| DELETE | `/products/:id` | 200 | Menghapus produk berdasarkan ID |
| DELETE | `/products/:id` | 404 | ID produk tidak ditemukan |

### Contoh POST

Request:

```json
{
  "name": "Pensil",
  "price": 3000
}
```

Response `201 Created`:

```json
{
  "id": 3,
  "name": "Pensil",
  "price": 3000
}
```

### Contoh PUT

Request (body sama dengan POST, tambahan id di URL):

```json
{
  "name": "Pensil Updated",
  "price": 5000
}
```

Response `200 OK`:

```json
{
  "id": 3,
  "name": "Pensil Updated",
  "price": 5000
}
```

Jika `name` atau `price` tidak valid, API mengembalikan `400 Bad Request`.

## Bukti Pengujian

Pembuktian dilakukan menggunakan aplikasi pengujian API (curl/Postman). Hasil uji disimpan di folder `output` sebagai file teks.

### 1. GET seluruh produk

Endpoint: `GET /products`

Hasil: `200 OK`

![Bukti GET seluruh produk](output/01-get-produk.txt)

### 2. GET produk yang tidak ditemukan

Endpoint: `GET /products/999`

Hasil JSON: `{"message":"Produk tidak ditemukan"}`

Status yang diharapkan: `404 Not Found`

![Bukti GET produk tidak ditemukan](output/02-get-produk-404.txt)

### 3. POST produk baru (berhasil)

Endpoint: `POST /products`

Data yang dikirim:

```json
{
  "name": "Pensil",
  "price": 3000
}
```

Hasil: `201 Created`

![Bukti POST produk](output/03-post-produk.txt)

### 4. POST produk baru (validasi gagal - nama kosong)

Endpoint: `POST /products`

Hasil: `400 Bad Request`

![Bukti POST invalid](output/04-post-invalid-nama-kosong.txt)

### 5. POST produk baru (validasi gagal - harga negatif)

Endpoint: `POST /products`

Hasil: `400 Bad Request`

![Bukti POST invalid harga](output/05-post-invalid-harga-negatif.txt)

### 6. GET setelah POST

Endpoint: `GET /products`

Produk baru `Pensil` berhasil tersimpan di database.

![Bukti GET setelah POST](output/06-get-setelah-post.txt)

### 7. PUT update produk (berhasil)

Endpoint: `PUT /products/:id`

Data yang dikirim:

```json
{
  "name": "Pensil Updated",
  "price": 5000
}
```

Hasil: `200 OK`

![Bukti PUT update](output/07-put-update-produk.txt)

### 8. PUT produk tidak ditemukan

Endpoint: `PUT /products/99999`

Hasil: `404 Not Found`

![Bukti PUT 404](output/08-put-produk-404.txt)

### 9. PUT validasi gagal

Endpoint: `PUT /products/:id`

Hasil: `400 Bad Request`

![Bukti PUT invalid](output/09-put-invalid-nama-kosong.txt)

### 10. DELETE produk (berhasil)

Endpoint: `DELETE /products/:id`

Hasil: `200 OK`

![Bukti DELETE produk](output/10-delete-produk.txt)

### 11. DELETE produk tidak ditemukan

Endpoint: `DELETE /products/99999`

Hasil: `404 Not Found`

![Bukti DELETE 404](output/11-delete-produk-404.txt)

### 12. GET setelah DELETE

Endpoint: `GET /products`

Produk yang dihapus tidak lagi muncul dalam daftar.

![Bukti GET setelah DELETE](output/12-get-setelah-delete.txt)

## Perubahan pada Database

Sebelum migrasi, tidak ada database. Setelah menjalankan `npx prisma migrate dev`, database SQLite (`dev.db`) dibuat dengan tabel `Product` yang memiliki kolom `id`, `name`, dan `price`. Data awal (seed) berisi produk "Buku" dan "Pulpen". Setiap operasi CRUD (POST, PUT, DELETE) mencerminkan perubahan langsung pada database melalui Prisma Client.
