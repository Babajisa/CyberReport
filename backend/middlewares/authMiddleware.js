const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Ambil token dari header 'Authorization'
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Akses ditolak. Silakan login terlebih dahulu.' });
    }

    const token = authHeader.split(' ')[1]; // Ambil teks tokennya saja

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Simpan data user ke request agar bisa dipakai di controller
        next(); // Lanjutkan ke proses berikutnya
    } catch (error) {
        res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
    }
};