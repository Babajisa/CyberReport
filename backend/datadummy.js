const db = require('./config/db');

// Daftar nama user (dummy)
const users = [
    { nama: 'Budi Santoso', email: 'budi@dummy.com' },
    { nama: 'Siti Aminah', email: 'siti@dummy.com' },
    { nama: 'Andi Wijaya', email: 'andi@dummy.com' }
];

// Daftar kategori dan lokasi untuk variasi data
const kategoriList = ['Penipuan Online', 'Phishing', 'Peretasan Akun', 'Sebar Data Pribadi'];
const lokasiList = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 
    'Sumatera Utara', 'Sulawesi Selatan', 'Bali'
];

// Target penipu (nomor HP dan link palsu)
const targetList = [
    '081234567890', '089988776655', '085711223344', 
    'www.link-phishing-palsu.com', 'www.undian-berhadiah.net', 
    '081399998888', 'www.rekening-baru.xyz', '087788889999'
];

// Fungsi untuk menghasilkan angka acak
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

db.serialize(() => {
    // 1. Pastikan ada 1 user dummy agar laporan punya pelapor
    let userId = 1;

    // Cek apakah user dummy sudah ada, jika belum, buat
    db.get(`SELECT id FROM users WHERE email = 'budi@dummy.com'`, (err, row) => {
        if (!row) {
            // Jika belum ada, buat user dummy
            db.run(`INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)`, 
                ['Budi Santoso', 'budi@dummy.com', 'password123', 'user'], 
                function(err) {
                    if (err) return console.log(err.message);
                    userId = this.lastID;
                    generateLaporan(userId);
                }
            );
        } else {
            userId = row.id;
            generateLaporan(userId);
        }
    });
});

function generateLaporan(userId) {
    console.log("⏳ Sedang memasukkan 25 data laporan dummy...");

    for (let i = 0; i < 25; i++) {
        // Buat ID tiket acak
        const tiket_id = `LP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
        
        // Pilih data acak
        const kategori = random(kategoriList);
        const target_insiden = random(targetList);
        const lokasi = random(lokasiList);
        const deskripsi = `Laporan simulasi untuk pengujian sistem. Pelaku mencoba melakukan ${kategori.toLowerCase()} melalui ${target_insiden}. Mohon segera ditindaklanjuti.`;
        
        // Acak status (70% Menunggu, 30% Selesai)
        const status = Math.random() > 0.7 ? 'Selesai' : 'Menunggu';

        // Masukkan ke database
        const query = `INSERT INTO laporan (tiket_id, user_id, kategori, target_insiden, deskripsi, lokasi, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        db.run(query, [tiket_id, userId, kategori, target_insiden, deskripsi, lokasi, status], (err) => {
            if (err) console.log("Gagal insert:", err.message);
        });
    }

    // Beri jeda 1 detik agar proses insert selesai, lalu tutup database
    setTimeout(() => {
        console.log("✅ Berhasil! 25 Data Dummy telah ditambahkan ke database.");
        db.close();
    }, 1000);
}