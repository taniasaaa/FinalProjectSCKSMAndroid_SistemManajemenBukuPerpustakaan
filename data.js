let nextBukuId = 6;
let nextAnggotaId = 103;
let nextPeminjamanId = 3;

export const bukuData = [
    { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", tahun_terbit: 2005, isbn: "978-979-3062-79-1", penerbit: "Bentang Pustaka", stok_total: 10, stok_tersedia: 8, created_at: "2025-11-29 17:06:57", updated_at: "2025-11-29 17:06:57" },
    { id: 2, judul: "Bumi", penulis: "Tere Liye", tahun_terbit: 2014, isbn: "978-602-0312-42-1", penerbit: "Gramedia Pustaka Utama", stok_total: 8, stok_tersedia: 8, created_at: "2025-11-29 17:06:57", updated_at: "2025-11-29 17:06:57" },
    { id: 3, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", tahun_terbit: 2009, isbn: "978-979-22-4876-0", penerbit: "Gramedia Pustaka Utama", stok_total: 12, stok_tersedia: 12, created_at: "2025-11-29 17:06:57", updated_at: "2025-11-29 17:06:57" },
    { id: 4, judul: "Pulang Pergi", penulis: "Tere Liye", tahun_terbit: 2021, isbn: "978-623-9469-80-8", penerbit: "Sabak Grip", stok_total: 5, stok_tersedia: 5, created_at: "2025-11-29 17:06:57", updated_at: "2025-11-29 17:06:57" },
    { id: 5, judul: "Cantik Itu Luka", penulis: "Eka Kurniawan", tahun_terbit: 2002, isbn: "978-979-9985-81-2", penerbit: "Gramedia Pustaka Utama", stok_total: 7, stok_tersedia: 7, created_at: "2025-11-29 17:06:57", updated_at: "2025-11-29 17:06:57" },
];

export const anggotaData = [
    { id: 101, nama: "Tania Syarofina", alamat: "Jakarta", nomor_hp: "081111111111", tanggal_daftar: "2025-11-29" },
    { id: 102, nama: "Aliyah", alamat: "Depok", nomor_hp: "081122222222", tanggal_daftar: "2025-11-29" },
];

export const peminjamanData = [
    { id: 1, id_buku: 1, id_anggota: 101, tanggal_peminjaman: "2025-11-20", tanggal_tempo: "2025-11-27", tanggal_pengembalian: null, denda: 0 },
    { id: 2, id_buku: 2, id_anggota: 102, tanggal_peminjaman: "2025-11-25", tanggal_tempo: "2025-12-02", tanggal_pengembalian: "2025-11-28", denda: 0 },
];

export const getNextId = (dataType) => {
    if (dataType === 'buku') return nextBukuId++;
    if (dataType === 'anggota') return nextAnggotaId++;
    if (dataType === 'peminjaman') return nextPeminjamanId++;
};