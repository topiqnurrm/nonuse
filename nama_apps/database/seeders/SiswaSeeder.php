<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Siswa;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tambahkan data siswa dengan kelas yang sesuai
        Siswa::create([
            'kelas_id' => 1, // Pastikan ID ini valid di tabel kelas
            'nis' => '1234567',
            'nama' => 'Ahmad Fauzi',
            'gender' => 'laki-laki',
            'alamat' => 'Jl. Merdeka No. 10, Jakarta',
        ]);

        Siswa::create([
            'kelas_id' => 1, // Pastikan ID ini valid di tabel kelas
            'nis' => '2345678',
            'nama' => 'Siti Aisyah',
            'gender' => 'perempuan',
            'alamat' => 'Jl. Diponegoro No. 5, Surabaya',
        ]);

        Siswa::create([
            'kelas_id' => 2, // Pastikan ID ini valid di tabel kelas
            'nis' => '3456789',
            'nama' => 'Budi Santoso',
            'gender' => 'laki-laki',
            'alamat' => 'Jl. Sudirman No. 8, Bandung',
        ]);

        Siswa::create([
            'kelas_id' => 2, // Pastikan ID ini valid di tabel kelas
            'nis' => '4567890',
            'nama' => 'Dewi Fitriani',
            'gender' => 'perempuan',
            'alamat' => 'Jl. Pahlawan No. 3, Yogyakarta',
        ]);

        Siswa::create([
            'kelas_id' => 3, // Pastikan ID ini valid di tabel kelas
            'nis' => '5678901',
            'nama' => 'Taufiq',
            'gender' => 'laki-laki',
            'alamat' => 'Jl. Raya No. 15, Malang',
        ]);

        // Tambahkan lebih banyak data siswa sesuai kebutuhan...
    }
}
