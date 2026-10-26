const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rute untuk User
router.post('/', authMiddleware, laporanController.buatLaporan);
router.get('/user', authMiddleware, laporanController.getLaporanUser);

// Rute Cek Waspada (Bisa diakses publik tanpa login)
router.get('/cek', laporanController.cekWaspada); 

// Rute untuk Admin
router.get('/admin', authMiddleware, laporanController.getAllLaporan);
router.put('/:id/status', authMiddleware, laporanController.updateStatus);

module.exports = router;