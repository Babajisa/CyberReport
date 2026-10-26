// Ambil token dan data user dari localStorage
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

// 1. Proteksi Halaman: Jika tidak ada token, tendang ke login
if (!token || !userStr) {
    alert('Anda belum login. Silakan masuk terlebih dahulu.');
    window.location.href = 'login.html';
} else {
    // 2. Tampilkan nama user
    const user = JSON.parse(userStr);
    document.getElementById('namaUser').innerText = user.nama;
}

// 3. Logika Tombol Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        // Hapus token dan data user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Kembali ke halaman login
        window.location.href = 'login.html';
    });
}