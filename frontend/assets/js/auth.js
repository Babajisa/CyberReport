// Pastikan menggunakan 127.0.0.1
const API_URL = 'http://127.0.0.1:5000/api/auth';

// ==========================================
// --- LOGIKA REGISTER (DAFTAR) ---
// ==========================================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // "Registrasi berhasil! Silakan login."
                window.location.href = 'login.html'; 
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan koneksi saat mendaftar.');
        }
    });
}

// ==========================================
// --- LOGIKA LOGIN (MASUK) ---
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Simpan data token & user
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                alert('Login Berhasil!');
                
                // Arahkan ke dashboard.html (BUKAN admin.html)
                window.location.href = 'dashboard.html';
                
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan koneksi saat login.');
        }
    });
}