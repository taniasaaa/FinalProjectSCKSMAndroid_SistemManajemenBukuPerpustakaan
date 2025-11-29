import express from 'express';
import { createPeminjaman, returnPeminjaman } from '../controllers/peminjamanController.js'; 

const router = express.Router();

router.post('/', createPeminjaman); 
router.put('/:id/return', returnPeminjaman); 

export default router;