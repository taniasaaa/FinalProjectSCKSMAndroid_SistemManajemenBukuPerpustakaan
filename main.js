import readline from "readline";
import {
  tambahBuku,
  tampilkanSemuaBuku,
  cariBuku,
  updateBuku,
  hapusBuku,
  hitungJumlahBuku,
  filterBukuTahun,
} from "./function.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("=== SISTEM MANAJEMEN BUKU PERPUSTAKAAN ===\n");

function tampilkanMenu() {
  console.log(`
1. Tampilkan semua buku
2. Tambah buku
3. Cari buku
4. Update buku
5. Hapus buku
6. Hitung jumlah buku
7. Filter buku berdasarkan tahun
8. Keluar
  `);

  rl.question("Pilih menu (1-8): ", (pilihan) => {
    switch (pilihan) {
      case "1":
        tampilkanSemuaBuku();
        kembaliKeMenu();
        break;

      case "2":
        rl.question("Masukkan judul buku: ", (judul) => {
          rl.question("Masukkan nama penulis: ", (penulis) => {
            rl.question("Masukkan tahun terbit: ", (tahun) => {
              tambahBuku(judul, penulis, parseInt(tahun));
              kembaliKeMenu();
            });
          });
        });
        break;

      case "3":
        rl.question("Masukkan kata kunci pencarian: ", (keyword) => {
          cariBuku(keyword);
          kembaliKeMenu();
        });
        break;

      case "4":
        rl.question("Masukkan ID buku yang akan diupdate: ", (id) => {
          rl.question("Masukkan judul baru (kosongkan jika tidak diubah): ", (judul) => {
            rl.question("Masukkan penulis baru (kosongkan jika tidak diubah): ", (penulis) => {
              rl.question("Masukkan tahun baru (kosongkan jika tidak diubah): ", (tahun) => {
                updateBuku(parseInt(id), judul || null, penulis || null, tahun ? parseInt(tahun) : null);
                kembaliKeMenu();
              });
            });
          });
        });
        break;

      case "5":
        rl.question("Masukkan ID buku yang akan dihapus: ", (id) => {
          hapusBuku(parseInt(id));
          kembaliKeMenu();
        });
        break;

      case "6":
        hitungJumlahBuku();
        kembaliKeMenu();
        break;

      case "7":
        rl.question("Masukkan tahun awal: ", (min) => {
          rl.question("Masukkan tahun akhir: ", (max) => {
            filterBukuTahun(parseInt(min), parseInt(max));
            kembaliKeMenu();
          });
        });
        break;

      case "8":
        console.log("Terima kasih telah mengoperasikan hasil mini project saya! 👋");
        rl.close();
        break;

      default:
        console.log("Pilihan tidak valid, silahkan coba lagi!");
        kembaliKeMenu();
        break;
    }
  });
}

function kembaliKeMenu() {
  console.log("\n-----------------------------------------");
  tampilkanMenu();
}

tampilkanMenu();