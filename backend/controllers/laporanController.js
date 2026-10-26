const db = require('../config/db');

// 1. Fungsi Buat Laporan (User)
exports.buatLaporan = (req, res) => {
    const { kategori, target_insiden, deskripsi, lokasi } = req.body; 
    const user_id = req.user.id; 

    if (!kategori || !target_insiden || !deskripsi || !lokasi) {
        return res.status(400).json({ message: 'Semua kolom laporan harus diisi!' });
    }

    const tiket_id = `LP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
    const query = `INSERT INTO laporan (tiket_id, user_id, kategori, target_insiden, deskripsi, lokasi) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [tiket_id, user_id, kategori, target_insiden, deskripsi, lokasi], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Laporan berhasil dibuat!', tiket_id: tiket_id });
    });
};

// 2. Fungsi Ambil Laporan Milik User Sendiri
exports.getLaporanUser = (req, res) => {
    const user_id = req.user.id;
    db.all(`SELECT * FROM laporan WHERE user_id = ? ORDER BY created_at DESC`, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// 3. Fungsi Ambil SEMUA Laporan (Admin)
exports.getAllLaporan = (req, res) => {
    db.all(`SELECT laporan.*, users.nama FROM laporan JOIN users ON laporan.user_id = users.id ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
};

// 4. Fungsi Ubah Status Laporan (Admin)
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    db.run(`UPDATE laporan SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Status laporan berhasil diubah!' });
    });
};

// 5. Fungsi Cek Waspada (Pencarian nomor/link) - FITUR BARU
exports.cekWaspada = (req, res) => {
    const { keyword } = req.query; 

    if (!keyword) {
        return res.status(400).json({ message: 'Kata kunci pencarian tidak boleh kosong!' });
    }

    const query = `SELECT COUNT(*) as total, kategori FROM laporan WHERE target_insiden LIKE ? GROUP BY kategori`;
    
    db.all(query, [`%${keyword}%`], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        
        let totalLaporan = 0;
        rows.forEach(row => {
            totalLaporan += row.total;
        });

        res.json({
            keyword: keyword,
            total_laporan: totalLaporan,
            detail: rows
        });
    });
};