import express from 'express';
import { createAnggota, getAllAnggota } from '../controllers/anggotaController.js'; 

const router = express.Router();

router.get('/', getAllAnggota); 
router.post('/', createAnggota); 

export default router;