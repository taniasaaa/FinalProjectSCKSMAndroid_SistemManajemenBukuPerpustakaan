import express from 'express';
import bukuRoutes from './routes/bukuRoutes.js';
import anggotaRoutes from './routes/anggotaRoutes.js';
import peminjamanRoutes from './routes/peminjamanRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/v1/buku', bukuRoutes); 
app.use('/api/v1/anggota', anggotaRoutes); 
app.use('/api/v1/peminjaman', peminjamanRoutes); 

app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
});
