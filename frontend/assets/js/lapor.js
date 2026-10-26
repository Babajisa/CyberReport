// Ambil token dari localStorage
const token = localStorage.getItem('token');

// Proteksi: Jika tidak ada token, tendang ke login
if (!token) {
    alert('Anda harus login untuk membuat laporan!');
    window.location.href = 'login.html';
}

const laporForm = document.getElementById('laporForm');

if (laporForm) {
    laporForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Ambil nilai dari form
        const kategori = document.getElementById('kategori').value;
        const target_insiden = document.getElementById('target_insiden').value;
        const deskripsi = document.getElementById('deskripsi').value;

        try {
            // Kirim request ke backend
            const response = await fetch('http://127.0.0.1:5000/api/laporan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Kirim token sebagai "Authorization Bearer"
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ kategori, target_insiden, deskripsi })
            });

            const data = await response.json();

            if (response.ok) {
                // Jika berhasil, tampilkan Tiket ID
                alert(`Laporan Berhasil Dikirim!\n\nSimpan ID Tiket ini untuk melacak laporan Anda:\n${data.tiket_id}`);
                window.location.href = 'dashboard.html'; // Kembali ke dashboard
            } else {
                // Jika gagal (misal token expired), tampilkan pesan error
                alert(data.message);
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan koneksi saat mengirim laporan.');
        }
    });
}