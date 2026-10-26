const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rute Autentikasi
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rute Tambahan (Opsional, untuk masa depan)
// router.get('/users', authController.getAllUsers); 

module.exports = router;