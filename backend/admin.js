const db = require('./config/db');

db.run("UPDATE users SET role = 'admin' WHERE email = 'budi@gmail.com'", function(err) {
    if (err) {
        console.log("Gagal:", err.message);
    } else {
        console.log("✅ Berhasil! Budi sekarang Admin.");
    }
    db.close();
});