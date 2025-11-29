# Final Project SC KSM Android_Sistem Manajemen Buku Perpustakaan 

Proyek *backend* ini adalah implementasi API untuk mengelola data anggota, buku, dan transaksi peminjaman. Proyek dibangun menggunakan **Node.js** dan **Express.js** dengan arsitektur **Modular Array** (`data.js`).

### Status dan Arsitektur Proyek

* **Arsitektur:** Node.js dan Express.js (Modular).
* **Data Storage:** Menggunakan **Local JavaScript Array** (`data.js`) sebagai penyimpanan data utama (menggantikan database).
* **Logika Bisnis Inti:** Semua *logic* stok peminjaman dan pengembalian diimplementasikan dalam **`peminjamanController.js`** dengan memanipulasi *array* di `data.js`.

### 🛠️ Cara Menjalankan Server

1.  **Instalasi Dependencies:** `npm install`
2.  **Menjalankan Server:** `npm start`
    *(Server akan berjalan di: **http://localhost:3000**)*

---

## Endpoint API (Base URL: http://localhost:3000/api/v1)

Berikut adalah daftar lengkap *endpoint* beserta **Method** (CRUD) dan fungsionalitasnya:

### 1. Data Buku (`/buku`)

| Method | Endpoint | Fungsionalitas / Penjelasan Method |
| :--- | :--- | :--- |
| **GET** | `/buku` | **READ ALL:** Mengambil daftar semua buku. Mendukung **Query Parameter** `?keyword=` untuk mencari berdasarkan judul atau penulis. |
| **POST** | `/buku` | **CREATE:** Menambah data buku baru ke dalam *array* `bukuData`. |
| **PUT** | `/buku/:id` | **UPDATE:** Memperbarui satu atau lebih *field* data buku berdasarkan ID. |
| **DELETE** | `/buku/:id` | **DELETE:** Menghapus data buku dari *array* berdasarkan ID. |

### 2. Data Anggota (`/anggota`)

| Method | Endpoint | Fungsionalitas / Penjelasan Method |
| :--- | :--- | :--- |
| **GET** | `/anggota` | **READ ALL:** Mengambil daftar semua anggota. |
| **POST** | `/anggota` | **CREATE:** Menambah data anggota baru ke dalam *array* `anggotaData`. |
| **PUT** | `/anggota/:id` | **UPDATE:** Memperbarui data anggota berdasarkan ID. |
| **DELETE** | `/anggota/:id` | **DELETE:** Menghapus data anggota dari *array* berdasarkan ID. |

### 3. Logika Transaksi Peminjaman (`/peminjaman`)

| Method | Endpoint | Logika Bisnis Utama (CRUD Method) |
| :--- | :--- | :--- |
| **GET** | `/peminjaman` | **READ ALL:** Mengambil semua data transaksi peminjaman yang pernah terjadi. |
| **POST** | `/peminjaman` | **CREATE Transaksi:** Mencatat peminjaman baru. **Logika:** **Mengurangi** `stok_tersedia` buku yang dipinjam sebanyak 1. |
| **PUT** | `/peminjaman/:id/return` | **UPDATE Pengembalian:** Mencatat tanggal pengembalian buku. **Logika:** **Menambah** `stok_tersedia` buku yang dikembalikan sebanyak 1, dan menghitung denda jika terlambat. |
