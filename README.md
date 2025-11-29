# Judul Proyek
Sistem Manajemen Buku Perpustakaan  

# Gambaran Umum File
Proyek ini memiliki beberapa file utama, yaitu `data.js` untuk menyimpan data buku, `function.js` untuk menjalankan fungsi CRUD serta fitur tambahan seperti menghitung dan memfilter buku, `main.js` sebagai program utama dengan menu interaktif menggunakan `readline`, dan `package.json` sebagai konfigurasi Node.js agar mendukung penggunaan `import` dan `export`

# Format Data
Struktur data utama disimpan dalam file `data.js` menggunakan **array of object** seperti berikut:
```js
[
  { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun: 2005 },
  { id: 2, judul: "Bumi", penulis: "Tere Liye", tahun: 2014 },
  { id: 3, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", tahun: 2009 }
]

# Penjelasan Masing-masing Function
## tambahBuku()
Fungsi ini digunakan untuk menambahkan data buku baru ke dalam daftar. Buku yang ditambahkan akan otomatis mendapatkan ID baru dan dimasukkan ke array data

## tampilkanSemuaBuku()
Berfungsi untuk menampilkan seluruh data buku yang tersimpan dalam sistem secara berurutan agar pengguna dapat melihat daftar lengkap buku di perpustakaan

## cariBuku()
Fungsi ini memungkinkan pengguna mencari buku berdasarkan kata kunci tertentu, baik dari judul maupun nama penulis. Hasil pencarian akan menampilkan semua buku yang sesuai

## updateBuku()
Digunakan untuk memperbarui informasi buku tertentu berdasarkan ID-nya. Pengguna dapat mengubah sebagian atau seluruh informasi dari buku tersebut

## hapusBuku()
Berfungsi untuk menghapus data buku berdasarkan ID yang dimasukkan. Jika ID ditemukan, buku akan dihapus dari daftar; jika tidak, akan muncul pesan peringatan

## hitungJumlahBuku()
Fungsi tambahan ini menghitung dan menampilkan jumlah total buku yang saat ini tersimpan dalam sistem. Fungsi ini tidak mengubah data, hanya membaca isi array

## filterBukuTahun()
Fungsi tambahan yang menampilkan buku-buku yang diterbitkan dalam rentang tahun tertentu. Jika tidak ada buku yang sesuai, sistem akan memberikan notifikasi