const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- PROSES REGISTER ---
exports.register = async (req, res) => {
    try {
        const { nama, email, password, kode_admin } = req.body; // Tambah kode_admin

        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }

        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
            if (err) return res.status(500).json({ message: err.message });
            if (user) return res.status(400).json({ message: 'Email sudah terdaftar!' });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // LOGIKA BARU: Cek apakah kode adminnya benar
            let role = 'user';
            if (kode_admin === 'LAPORAMAN_ADMIN') {
                role = 'admin';
            }

            const query = `INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)`;
            db.run(query, [nama, email, hashedPassword, role], function(err) {
                if (err) return res.status(500).json({ message: err.message });
                res.status(201).json({ message: `Registrasi berhasil sebagai ${role}! Silakan login.` });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};
// --- PROSES LOGIN ---
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    // Cari user berdasarkan email
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!user) return res.status(400).json({ message: 'Email atau password salah!' });

        // Cocokkan password yang diketik dengan yang ada di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Email atau password salah!' });

        // Buat Token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } // Token berlaku 1 hari
        );

        res.json({
            message: 'Login berhasil!',
            token: token,
            user: { id: user.id, nama: user.nama, email: user.email, role: user.role }
        });
    });
};