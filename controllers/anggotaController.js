import { anggotaData, getNextId } from '../data.js';

export const getAllAnggota = (req, res) => {
    try {
        const { keyword } = req.query;
        let hasil = [...anggotaData];

        if (keyword) {
            const keywordLower = keyword.toLowerCase();
            hasil = hasil.filter(anggota => 
                anggota.nama.toLowerCase().includes(keywordLower) ||
                anggota.nomor_hp.includes(keywordLower)
            );
        }
        
        if (hasil.length === 0) {
            return res.status(404).json({ message: "Tidak ada anggota yang ditemukan berdasarkan kriteria." });
        }

        return res.status(200).json(hasil);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengambil data anggota.", error: error.message });
    }
};

export const createAnggota = (req, res) => {
    const { nama, alamat, nomor_hp } = req.body;
    
    try {
        if (!nama || !nomor_hp) {
             return res.status(400).json({ message: "Nama dan Nomor HP harus diisi." });
        }
        
        const anggotaBaru = { 
            id: getNextId('anggota'), 
            nama, 
            alamat, 
            nomor_hp,
            tanggal_daftar: new Date().toISOString().split('T')[0] 
        };
        
        anggotaData.push(anggotaBaru); 

        return res.status(201).json({ message: "Anggota berhasil ditambahkan.", data: anggotaBaru });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menambahkan anggota.", error: error.message });
    }
};

export const updateAnggota = (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    try {
        const index = anggotaData.findIndex(anggota => anggota.id === id);

        if (index === -1) {
            return res.status(404).json({ message: `Anggota dengan ID ${id} tidak ditemukan.` });
        }
        
        const anggotaLama = anggotaData[index];
        anggotaData[index] = { 
            ...anggotaLama,
            ...updates,
            id: anggotaLama.id
        };
        
        return res.status(200).json({ message: "Anggota berhasil diperbarui.", data: anggotaData[index] });
    } catch (error) {
        return res.status(500).json({ message: "Gagal memperbarui anggota.", error: error.message });
    }
};

export const deleteAnggota = (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        const index = anggotaData.findIndex(anggota => anggota.id === id);

        if (index === -1) {
            return res.status(404).json({ message: `Anggota dengan ID ${id} tidak ditemukan.` });
        }
        
        anggotaData.splice(index, 1);
        
        return res.status(200).json({ message: `Anggota dengan ID ${id} berhasil dihapus.` });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menghapus anggota.", error: error.message });
    }
};
