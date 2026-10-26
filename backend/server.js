require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import koneksi database
require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Dasar (Testing)
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API LaporAman' });
});

// --- DAFTARKAN SEMUA ROUTES DI SINI ---
const authRoutes = require('./routes/authRoutes');
const laporanRoutes = require('./routes/laporanRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/laporan', laporanRoutes); 
// --------------------------------------

// Jalankan Server (HARUS DI PALING BAWAH)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server LaporAman berjalan di http://localhost:${PORT}`);
});