import { peminjamanData, bukuData, anggotaData, getNextId } from '../data.js';

const calculateDenda = (tanggalTempo, tanggalPengembalian) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const dateTempo = new Date(tanggalTempo);
    const dateKembali = new Date(tanggalPengembalian);

    if (dateKembali > dateTempo) {
        const diffDays = Math.round(Math.abs((dateKembali - dateTempo) / oneDay));
        return diffDays * 1000;
    }
    return 0;
};

export const getAllPeminjaman = (req, res) => {
    try {
        const hasil = peminjamanData.map(p => {
            const buku = bukuData.find(b => b.id === p.id_buku);
            const anggota = anggotaData.find(a => a.id === p.id_anggota);
            return {
                ...p,
                detail_buku: buku ? buku.judul : 'Buku Tidak Ditemukan',
                detail_anggota: anggota ? anggota.nama : 'Anggota Tidak Ditemukan'
            };
        });

        return res.status(200).json(hasil);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengambil data peminjaman.", error: error.message });
    }
};

export const createPeminjaman = (req, res) => {
    const { id_buku, id_anggota, tanggal_peminjaman, tanggal_tempo } = req.body;
    
    try {

        if (!id_buku || !id_anggota || !tanggal_peminjaman || !tanggal_tempo) {
            return res.status(400).json({ message: "Semua field peminjaman wajib diisi." });
        }

        const bukuIndex = bukuData.findIndex(b => b.id === parseInt(id_buku));
        const anggota = anggotaData.find(a => a.id === parseInt(id_anggota));

        if (bukuIndex === -1 || !anggota) {
            return res.status(404).json({ message: "Buku atau Anggota tidak ditemukan." });
        }
        
        const buku = bukuData[bukuIndex];

        if (buku.stok_tersedia <= 0) {
            return res.status(400).json({ message: `Stok buku '${buku.judul}' sedang kosong.` });
        }

        bukuData[bukuIndex].stok_tersedia -= 1; 

        const peminjamanBaru = {
            id: getNextId('peminjaman'),
            id_buku: buku.id,
            id_anggota: anggota.id,
            tanggal_peminjaman,
            tanggal_tempo,
            tanggal_pengembalian: null,
            jumlah_denda: 0
        };

        peminjamanData.push(peminjamanBaru);

        return res.status(201).json({ message: "Peminjaman berhasil dicatat.", data: peminjamanBaru });

    } catch (error) {
        return res.status(500).json({ message: "Gagal mencatat peminjaman.", error: error.message });
    }
};

export const returnPeminjaman = (req, res) => {
    const id = parseInt(req.params.id);
    const { tanggal_pengembalian } = req.body;

    try {
        if (!tanggal_pengembalian) {
            return res.status(400).json({ message: "Tanggal pengembalian wajib diisi." });
        }

        const indexPeminjaman = peminjamanData.findIndex(p => p.id === id);

        if (indexPeminjaman === -1) {
            return res.status(404).json({ message: `Transaksi peminjaman ID ${id} tidak ditemukan.` });
        }

        const peminjaman = peminjamanData[indexPeminjaman];

        if (peminjaman.tanggal_pengembalian !== null) {
            return res.status(400).json({ message: "Buku ini sudah dikembalikan sebelumnya." });
        }

        const bukuIndex = bukuData.findIndex(b => b.id === peminjaman.id_buku);
        if (bukuIndex !== -1) {
            bukuData[bukuIndex].stok_tersedia += 1;
        }

        const denda = calculateDenda(peminjaman.tanggal_tempo, tanggal_pengembalian);

        peminjamanData[indexPeminjaman].tanggal_pengembalian = tanggal_pengembalian;
        peminjamanData[indexPeminjaman].jumlah_denda = denda;

        return res.status(200).json({ 
            message: "Pengembalian berhasil dicatat.", 
            denda: denda,
            data: peminjamanData[indexPeminjaman]
        });

    } catch (error) {
        return res.status(500).json({ message: "Gagal mencatat pengembalian.", error: error.message });
    }
};