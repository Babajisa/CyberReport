const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Tentukan lokasi file database
const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Gagal membuka database', err.message);
    } else {
        console.log('Terhubung ke database SQLite.');
    }
});

// Buat tabel otomatis saat server pertama kali jalan
db.serialize(() => {
    // 1. Tabel Users
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Tabel Laporan (PERHATIKAN BARIS 'lokasi' DI BAWAH INI)
    db.run(`CREATE TABLE IF NOT EXISTS laporan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tiket_id TEXT UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        kategori TEXT NOT NULL,
        target_insiden TEXT NOT NULL, 
        deskripsi TEXT NOT NULL,
        lokasi TEXT NOT NULL,
        status TEXT DEFAULT 'Menunggu',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
    
    console.log('Tabel database siap digunakan.');
});

module.exports = db;