import express from 'express';

import { 
    getAllBuku, 
    createBuku, 
    updateBuku, 
    deleteBuku 
} from '../controllers/bukuController.js'; 

const router = express.Router();

router.get('/', getAllBuku);
router.post('/', createBuku); 
router.put('/:id', updateBuku);
router.delete('/:id', deleteBuku);

export default router;