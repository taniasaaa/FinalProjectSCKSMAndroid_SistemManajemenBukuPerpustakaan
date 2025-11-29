# Final Project: Sistem Manajemen Buku Perpustakaan API

Proyek *backend* ini merupakan implementasi API untuk sistem manajemen perpustakaan yang mengelola data anggota, buku, dan transaksi peminjaman. Proyek ini dibangun menggunakan **Node.js** dan *framework* **Express.js**.

### Arsitektur dan Data Storage

Untuk memenuhi persyaratan modularisasi proyek dan efisiensi, proyek ini menggunakan arsitektur **Local JavaScript Array** (`data.js`) sebagai *data storage* utama. Artinya, semua data (buku, anggota, peminjaman) disimpan dalam variabel *array* lokal. Logika bisnis inti diimplementasikan dalam *folder* `controllers/`, dengan *file* `peminjamanController.js` yang bertanggung jawab langsung memanipulasi stok di `data.js`. Untuk menjalankan server setelah instalasi *dependencies* (`npm install`), gunakan perintah **`npm start`**, dan server akan aktif di **`http://localhost:3000`**.

### Fungsionalitas Endpoint API

Semua *endpoint* diakses melalui *Base URL*: `http://localhost:3000/api/v1`.

**1. Manajemen Data Utama (CRUD):**
Proyek ini menyediakan fungsionalitas CRUD lengkap untuk dua entitas utama: **Buku** (`/buku`) dan **Anggota** (`/anggota`). Setiap entitas mendukung **Method GET, POST, PUT /:id, dan DELETE /:id**. Endpoint `/buku` juga diperkuat dengan fitur *filtering* menggunakan **Query Parameter** (`?keyword=...`) untuk memudahkan pencarian.

**2. Logika Bisnis Transaksi (`/peminjaman`):**
Endpoint `/peminjaman` merupakan pusat logika bisnis:
* **Peminjaman Baru (POST):** Saat transaksi baru dicatat, *controller* secara otomatis akan **mengurangi** nilai `stok_tersedia` buku yang dipinjam sebanyak satu, memastikan buku tidak dipinjam jika stok habis.
* **Pengembalian (PUT /:id/return):** Saat buku dikembalikan, *controller* akan **menambah** nilai `stok_tersedia` buku tersebut sebanyak satu. Selain itu, sistem juga menghitung potensi **denda** jika tanggal pengembalian melewati batas `tanggal_tempo`.