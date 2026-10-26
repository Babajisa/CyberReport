# LaporAman

LaporAman adalah aplikasi web untuk membuat dan memantau laporan terkait insiden digital. Proyek ini terdiri dari frontend statis dan backend REST API berbasis Express dengan database SQLite.

## Fitur

- Registrasi dan login pengguna.
- Pengiriman laporan insiden dan pemantauan status laporan.
- Pemeriksaan publik berdasarkan nomor telepon atau tautan yang pernah dilaporkan.
- Halaman admin untuk melihat laporan dan memperbarui statusnya.

## Teknologi

- **Frontend:** HTML, CSS, dan JavaScript; Tailwind CSS digunakan melalui CDN.
- **Backend:** Node.js, Express, dan JSON Web Token.
- **Database:** SQLite.

## Persiapan

Pastikan [Node.js](https://nodejs.org/) dan npm sudah terpasang.

1. Pasang dependensi dari direktori utama proyek:

   ```bash
   npm install
   ```

2. Buat file `.env` di direktori utama proyek dan isi secret untuk token:

   ```env
   JWT_SECRET=ganti_dengan_secret_yang_acak_dan_aman
   PORT=5000
   ```

   `PORT` bersifat opsional; backend menggunakan port `5000` jika nilainya tidak diatur.

## Menjalankan aplikasi

### Backend

Jalankan dari direktori utama proyek:

```bash
node backend/server.js
```

API akan tersedia di `http://localhost:5000`. Buka alamat tersebut untuk memeriksa endpoint dasar API.

Database SQLite berada di `backend/database.sqlite`. Jika file atau tabel belum tersedia, backend akan membuatnya saat pertama kali dijalankan.

### Frontend

Jalankan frontend menggunakan server file statis, misalnya ekstensi **Live Server** di VS Code, lalu buka `frontend/index.html`. Frontend mengirim permintaan ke `http://127.0.0.1:5000`, jadi backend harus berjalan pada alamat dan port tersebut.

## Endpoint API

Semua endpoint menggunakan prefiks `/api`.

| Metode | Endpoint | Keterangan |
| --- | --- | --- |
| `POST` | `/auth/register` | Membuat akun pengguna |
| `POST` | `/auth/login` | Login dan memperoleh token |
| `POST` | `/laporan` | Membuat laporan; memerlukan token |
| `GET` | `/laporan/user` | Melihat laporan milik pengguna; memerlukan token |
| `GET` | `/laporan/cek?keyword=<kata-kunci>` | Memeriksa laporan berdasarkan kata kunci |
| `GET` | `/laporan/admin` | Melihat semua laporan; memerlukan token |
| `PUT` | `/laporan/:id/status` | Memperbarui status laporan; memerlukan token |

Untuk endpoint yang memerlukan token, kirim token login pada header:

```http
Authorization: Bearer TOKEN_LOGIN
```

## Struktur proyek

```text
backend/
  config/       Koneksi dan inisialisasi database
  controllers/  Logika autentikasi dan laporan
  middlewares/  Middleware autentikasi
  models/       Model data
  routes/       Rute API
  server.js     Titik masuk backend
frontend/
  assets/       CSS, JavaScript, dan gambar
  *.html        Halaman aplikasi
```
