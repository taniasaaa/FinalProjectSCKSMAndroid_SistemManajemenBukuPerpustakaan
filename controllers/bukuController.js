import { bukuData, getNextId } from '../data.js';

export const getAllBuku = (req, res) => {
    try {
        const { keyword } = req.query;
        let hasil = [...bukuData];

        if (keyword) {
            const keywordLower = keyword.toLowerCase();
            hasil = hasil.filter(buku => 
                buku.judul.toLowerCase().includes(keywordLower) ||
                buku.penulis.toLowerCase().includes(keywordLower)
            );
        }
        
        if (hasil.length === 0) {
            return res.status(404).json({ message: "Tidak ada buku yang ditemukan berdasarkan kriteria." });
        }

        return res.status(200).json(hasil);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengambil data buku.", error: error.message });
    }
};

export const createBuku = (req, res) => {
    const { judul, penulis, tahun_terbit, isbn, penerbit, stok_total, stok_tersedia } = req.body;
    
    try {
        if (!judul || !penulis || !stok_total) {
             return res.status(400).json({ message: "Judul, Penulis, dan Stok Total harus diisi." });
        }
        
        const bukuBaru = { 
            id: getNextId('buku'), 
            judul, penulis, tahun_terbit, isbn, penerbit,
            stok_total: parseInt(stok_total),
            stok_tersedia: parseInt(stok_tersedia || stok_total),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        
        bukuData.push(bukuBaru);
        
        return res.status(201).json({ message: "Buku berhasil ditambahkan.", data: bukuBaru });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menambahkan buku.", error: error.message });
    }
};

export const updateBuku = (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    try {
        const index = bukuData.findIndex(buku => buku.id === id);

        if (index === -1) {
            return res.status(404).json({ message: `Buku dengan ID ${id} tidak ditemukan.` });
        }
 
        const bukuLama = bukuData[index];
        bukuData[index] = { 
            ...bukuLama,
            ...updates,
            id: bukuLama.id, 
            updated_at: new Date().toISOString()
        };
        
        return res.status(200).json({ message: "Buku berhasil diperbarui.", data: bukuData[index] });
    } catch (error) {
        return res.status(500).json({ message: "Gagal memperbarui buku.", error: error.message });
    }
};

export const deleteBuku = (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        const index = bukuData.findIndex(buku => buku.id === id);

        if (index === -1) {
            return res.status(404).json({ message: `Buku dengan ID ${id} tidak ditemukan.` });
        }

        bukuData.splice(index, 1);
        
        return res.status(200).json({ message: `Buku dengan ID ${id} berhasil dihapus.` });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menghapus buku.", error: error.message });
    }
};